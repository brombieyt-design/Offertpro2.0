import { readDB, writeDB, generateId, nextQuoteNumber } from "@/lib/db";
import type { NextRequest } from "next/server";
import crypto from "crypto";
import type { LineItem } from "@/types";

function generateShareToken(): string {
  // URL-safe base64, ~22 chars of entropy
  return crypto.randomBytes(16).toString("base64url");
}

/** Sum line items, respecting the customer's opt-in for optional add-ons */
function calcTotal(items: LineItem[]): number {
  return items.reduce((sum, item) => {
    // Optional items default to included (selected !== false)
    if (item.optional && item.selected === false) return sum;
    const lineTotal = item.quantity * item.unitPrice;
    const discount = item.discount ? lineTotal * (item.discount / 100) : 0;
    return sum + lineTotal - discount;
  }, 0);
}

export async function GET(request: NextRequest) {
  try {
    const db = await readDB();
    const id = request.nextUrl.searchParams.get("id");
    if (id) {
      const quote = db.quotes.find((q) => q.id === id);
      if (!quote) {
        return Response.json({ error: "Quote not found" }, { status: 404 });
      }
      return Response.json(quote);
    }
    return Response.json(db.quotes);
  } catch (err) {
    return Response.json({ error: "Serverfel", details: String(err) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await readDB();

    const items: LineItem[] = (body.items ?? []).map((item: Record<string, unknown>) => ({
      ...item,
      id: (item.id as string) || generateId(),
      // Normalize optional/selected flags
      optional: Boolean(item.optional),
      selected: item.optional ? (item.selected ?? true) : true,
    }));
    const total = calcTotal(items);

    const quote = {
      id: generateId(),
      number: nextQuoteNumber(db),
      customer: body.customer,
      items,
      status: body.status ?? "draft",
      createdAt: new Date().toISOString().split("T")[0],
      validUntil:
        body.validUntil ??
        new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      total,
      coverImage: body.coverImage || undefined,
      introText: body.introText || undefined,
      termsText: body.termsText || undefined,
      taxDeduction: body.taxDeduction,
      laborCost: body.laborCost,
      shareToken: generateShareToken(),
    };

    db.quotes.push(quote);
    await writeDB(db);

    return Response.json(quote, { status: 201 });
  } catch (err) {
    return Response.json({ error: "Kunde inte skapa offert", details: String(err) }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await readDB();

    const idx = db.quotes.findIndex((q) => q.id === body.id);
    if (idx === -1) {
      return Response.json({ error: "Quote not found" }, { status: 404 });
    }

    const updated = { ...db.quotes[idx], ...body };

    if (body.items) {
      updated.total = calcTotal(updated.items as LineItem[]);
    }

    // Backfill a share token for legacy quotes edited in-place
    if (!updated.shareToken) {
      updated.shareToken = generateShareToken();
    }

    db.quotes[idx] = updated;
    await writeDB(db);

    return Response.json(db.quotes[idx]);
  } catch (err) {
    return Response.json({ error: "Kunde inte uppdatera offert", details: String(err) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const db = await readDB();

    db.quotes = db.quotes.filter((q) => q.id !== id);
    await writeDB(db);

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: "Kunde inte ta bort offert", details: String(err) }, { status: 500 });
  }
}
