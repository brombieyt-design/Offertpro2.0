import { readDB, writeDB, generateId, nextQuoteNumber } from "@/lib/db";
import type { NextRequest } from "next/server";

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

    const total = (body.items ?? []).reduce(
      (sum: number, item: { quantity: number; unitPrice: number; discount?: number }) => {
        const lineTotal = item.quantity * item.unitPrice;
        const discount = item.discount ? lineTotal * (item.discount / 100) : 0;
        return sum + lineTotal - discount;
      },
      0
    );

    const quote = {
      id: generateId(),
      number: nextQuoteNumber(db),
      customer: body.customer,
      items: (body.items ?? []).map((item: Record<string, unknown>) => ({
        ...item,
        id: item.id || generateId(),
      })),
      status: body.status ?? "draft",
      createdAt: new Date().toISOString().split("T")[0],
      validUntil:
        body.validUntil ??
        new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      total,
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
      updated.total = (body.items as { quantity: number; unitPrice: number; discount?: number }[]).reduce(
        (sum: number, item: { quantity: number; unitPrice: number; discount?: number }) => {
          const lineTotal = item.quantity * item.unitPrice;
          const discount = item.discount ? lineTotal * (item.discount / 100) : 0;
          return sum + lineTotal - discount;
        },
        0
      );
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
