import { readDB, writeDB, generateId, nextInvoiceNumber } from "@/lib/db";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const db = readDB();
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const invoice = db.invoices.find((inv) => inv.id === id);
    if (!invoice) {
      return Response.json({ error: "Invoice not found" }, { status: 404 });
    }
    return Response.json(invoice);
  }
  return Response.json(db.invoices);
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

  const invoice = {
    id: generateId(),
    number: nextInvoiceNumber(db),
    customer: body.customer,
    items: (body.items ?? []).map((item: Record<string, unknown>) => ({
      ...item,
      id: item.id || generateId(),
    })),
    status: body.status ?? "draft",
    issuedAt: new Date().toISOString().split("T")[0],
    dueDate:
      body.dueDate ??
      new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
    total,
    paymentTerms: body.paymentTerms ?? "30 dagar netto",
  };

  db.invoices.push(invoice);
  writeDB(db);

  return Response.json(invoice, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const db = readDB();

  const idx = db.invoices.findIndex((inv) => inv.id === body.id);
  if (idx === -1) {
    return Response.json({ error: "Invoice not found" }, { status: 404 });
  }

  const updated = { ...db.invoices[idx], ...body };

  // Recalculate total if items were updated
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

  db.invoices[idx] = updated;
  writeDB(db);

  return Response.json(db.invoices[idx]);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const db = readDB();

  db.invoices = db.invoices.filter((inv) => inv.id !== id);
  writeDB(db);

  return Response.json({ ok: true });
}
