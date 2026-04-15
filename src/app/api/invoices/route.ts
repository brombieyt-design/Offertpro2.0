import { readDB, writeDB, generateId, nextInvoiceNumber } from "@/lib/db";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const db = await readDB();
    const id = request.nextUrl.searchParams.get("id");
    if (id) {
      const invoice = db.invoices.find((inv) => inv.id === id);
      if (!invoice) {
        return Response.json({ error: "Invoice not found" }, { status: 404 });
      }
      return Response.json(invoice);
    }
    return Response.json(db.invoices);
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
    await writeDB(db);

    return Response.json(invoice, { status: 201 });
  } catch (err) {
    return Response.json({ error: "Kunde inte skapa faktura", details: String(err) }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await readDB();

    const idx = db.invoices.findIndex((inv) => inv.id === body.id);
    if (idx === -1) {
      return Response.json({ error: "Invoice not found" }, { status: 404 });
    }

    const updated = { ...db.invoices[idx], ...body };

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
    await writeDB(db);

    return Response.json(db.invoices[idx]);
  } catch (err) {
    return Response.json({ error: "Kunde inte uppdatera faktura", details: String(err) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const db = await readDB();

    db.invoices = db.invoices.filter((inv) => inv.id !== id);
    await writeDB(db);

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: "Kunde inte ta bort faktura", details: String(err) }, { status: 500 });
  }
}
