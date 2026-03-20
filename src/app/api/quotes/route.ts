import { readDB, writeDB, generateId, nextQuoteNumber } from "@/lib/db";
import type { NextRequest } from "next/server";

export async function GET() {
  const db = readDB();
  return Response.json(db.quotes);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const db = readDB();

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
  writeDB(db);

  return Response.json(quote, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const db = readDB();

  const idx = db.quotes.findIndex((q) => q.id === body.id);
  if (idx === -1) {
    return Response.json({ error: "Quote not found" }, { status: 404 });
  }

  db.quotes[idx] = { ...db.quotes[idx], ...body };
  writeDB(db);

  return Response.json(db.quotes[idx]);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const db = readDB();

  db.quotes = db.quotes.filter((q) => q.id !== id);
  writeDB(db);

  return Response.json({ ok: true });
}
