import { readDB, writeDB, generateId } from "@/lib/db";
import { sanitizeText, sanitizeNumber } from "@/lib/sanitize";
import type { NextRequest } from "next/server";
import type { Payment } from "@/types";

// POST: record a payment for an invoice
// Body: { invoiceId, amount, paidAt?, method?, reference?, note? }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const invoiceId = sanitizeText(body.invoiceId, 100);
    if (!invoiceId) {
      return Response.json({ error: "invoiceId krävs" }, { status: 400 });
    }

    const db = await readDB();
    const idx = db.invoices.findIndex((inv) => inv.id === invoiceId);
    if (idx === -1) {
      return Response.json({ error: "Faktura hittades ej" }, { status: 404 });
    }

    const invoice = db.invoices[idx];
    const amount = sanitizeNumber(body.amount, { min: 0.01, max: 100_000_000 });
    if (!amount) {
      return Response.json({ error: "Belopp krävs" }, { status: 400 });
    }

    const payment: Payment = {
      id: generateId(),
      amount,
      paidAt:
        sanitizeText(body.paidAt, 30) ||
        new Date().toISOString().split("T")[0],
      method: sanitizeText(body.method, 50) || undefined,
      reference: sanitizeText(body.reference, 100) || undefined,
      note: sanitizeText(body.note, 500) || undefined,
    };

    invoice.payments = [...(invoice.payments ?? []), payment];
    invoice.paidAmount = invoice.payments.reduce((sum, p) => sum + p.amount, 0);

    if (invoice.paidAmount >= invoice.total) {
      invoice.status = "paid";
    } else if (invoice.paidAmount > 0) {
      invoice.status = "partially_paid";
    }

    db.invoices[idx] = invoice;
    await writeDB(db);

    return Response.json(invoice);
  } catch (err) {
    return Response.json(
      { error: "Kunde inte registrera betalning", details: String(err) },
      { status: 500 }
    );
  }
}

// DELETE: remove a payment from an invoice
// Body: { invoiceId, paymentId }
export async function DELETE(request: NextRequest) {
  try {
    const { invoiceId, paymentId } = await request.json();
    const db = await readDB();
    const idx = db.invoices.findIndex((inv) => inv.id === invoiceId);
    if (idx === -1) {
      return Response.json({ error: "Faktura hittades ej" }, { status: 404 });
    }

    const invoice = db.invoices[idx];
    invoice.payments = (invoice.payments ?? []).filter((p) => p.id !== paymentId);
    invoice.paidAmount = invoice.payments.reduce((sum, p) => sum + p.amount, 0);

    if (invoice.paidAmount >= invoice.total) {
      invoice.status = "paid";
    } else if (invoice.paidAmount > 0) {
      invoice.status = "partially_paid";
    } else {
      // Reset to "sent" if there were prior payments and now there are none
      if (invoice.status === "paid" || invoice.status === "partially_paid") {
        invoice.status = "sent";
      }
    }

    db.invoices[idx] = invoice;
    await writeDB(db);

    return Response.json(invoice);
  } catch (err) {
    return Response.json(
      { error: "Kunde inte ta bort betalning", details: String(err) },
      { status: 500 }
    );
  }
}
