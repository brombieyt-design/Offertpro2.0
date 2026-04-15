import { readDB, writeDB } from "@/lib/db";
import { sanitizeText } from "@/lib/sanitize";
import type { NextRequest } from "next/server";
import type { Quote, LineItem } from "@/types";

/** Strip fields we don't want to expose to an unauthenticated visitor */
function toPublicQuote(q: Quote, settings: Awaited<ReturnType<typeof readDB>>["settings"]) {
  return {
    id: q.id,
    number: q.number,
    customer: {
      name: q.customer.name,
      company: q.customer.company,
    },
    items: q.items,
    status: q.status,
    createdAt: q.createdAt,
    validUntil: q.validUntil,
    total: q.total,
    coverImage: q.coverImage,
    introText: q.introText,
    termsText: q.termsText,
    taxDeduction: q.taxDeduction,
    openedAt: q.openedAt,
    acceptedAt: q.acceptedAt,
    rejectedAt: q.rejectedAt,
    signedBy: q.signedBy,
    company: {
      companyName: settings?.company?.companyName,
      logo: settings?.company?.logo,
      primaryColor: settings?.company?.primaryColor,
      email: settings?.company?.email,
      phone: settings?.company?.phone,
      website: settings?.company?.website,
    },
    defaults: {
      currency: settings?.defaults?.currency || "SEK",
    },
  };
}

function recalcTotal(items: LineItem[]): number {
  return items.reduce((sum, item) => {
    if (item.optional && item.selected === false) return sum;
    const lineTotal = item.quantity * item.unitPrice;
    const discount = item.discount ? lineTotal * (item.discount / 100) : 0;
    return sum + lineTotal - discount;
  }, 0);
}

/** GET /api/quotes/public?token=xxx — fetch a quote by its share token */
export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");
    if (!token) return Response.json({ error: "Missing token" }, { status: 400 });

    const db = await readDB();
    const idx = db.quotes.findIndex((q) => q.shareToken === token);
    if (idx === -1) return Response.json({ error: "Not found" }, { status: 404 });

    const quote = db.quotes[idx];

    // Record first open
    if (!quote.openedAt) {
      quote.openedAt = new Date().toISOString();
      if (quote.status === "sent") quote.status = "opened";
      db.quotes[idx] = quote;
      await writeDB(db);
    }

    return Response.json(toPublicQuote(quote, db.settings));
  } catch (err) {
    return Response.json({ error: "Serverfel", details: String(err) }, { status: 500 });
  }
}

/** POST /api/quotes/public — customer actions on the public offer page
 * Body: { token, action: "toggle" | "accept" | "reject", itemId?, selected?, signedBy? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = sanitizeText(body.token, 64);
    if (!token) return Response.json({ error: "Missing token" }, { status: 400 });

    const db = await readDB();
    const idx = db.quotes.findIndex((q) => q.shareToken === token);
    if (idx === -1) return Response.json({ error: "Not found" }, { status: 404 });

    const quote = db.quotes[idx];

    // Don't allow changes on decided quotes
    if (quote.status === "accepted" || quote.status === "rejected") {
      return Response.json(
        { error: "Offerten är redan beslutad och kan inte ändras" },
        { status: 409 }
      );
    }

    const action = sanitizeText(body.action, 20);

    if (action === "toggle") {
      const itemId = sanitizeText(body.itemId, 100);
      const item = quote.items.find((i) => i.id === itemId);
      if (!item) return Response.json({ error: "Artikel hittades ej" }, { status: 404 });
      if (!item.optional) {
        return Response.json({ error: "Artikeln är inte valbar" }, { status: 400 });
      }
      item.selected = Boolean(body.selected);
      quote.total = recalcTotal(quote.items);
    } else if (action === "accept") {
      quote.acceptedAt = new Date().toISOString();
      quote.status = "accepted";
      quote.signedBy = sanitizeText(body.signedBy, 200) || quote.customer.name;
    } else if (action === "reject") {
      quote.rejectedAt = new Date().toISOString();
      quote.status = "rejected";
    } else {
      return Response.json({ error: "Okänd åtgärd" }, { status: 400 });
    }

    db.quotes[idx] = quote;
    await writeDB(db);

    return Response.json(toPublicQuote(quote, db.settings));
  } catch (err) {
    return Response.json(
      { error: "Kunde inte uppdatera offert", details: String(err) },
      { status: 500 }
    );
  }
}
