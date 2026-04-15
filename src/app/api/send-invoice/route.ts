import { readDB, writeDB } from "@/lib/db";
import { generateInvoicePDF } from "@/lib/pdf";
import { sendEmail } from "@/lib/email";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    const db = await readDB();
    const invoice = db.invoices.find((inv) => inv.id === id);
    if (!invoice) return Response.json({ error: "Not found" }, { status: 404 });

    const pdfBuffer = await generateInvoicePDF(invoice, db.settings);

    const result = await sendEmail({
      to: invoice.customer.email,
      subject: `Faktura ${invoice.number} från Offert Pro`,
      html: `
        <h2>Hej ${invoice.customer.name},</h2>
        <p>Bifogat hittar du faktura <strong>${invoice.number}</strong>.</p>
        <p>Att betala: <strong>${new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK", minimumFractionDigits: 0 }).format(invoice.total)}</strong></p>
        <p>Förfallodatum: ${invoice.dueDate}</p>
        <p>Betalningsvillkor: ${invoice.paymentTerms}</p>
        <br>
        <p>Med vänliga hälsningar,<br>Offert Pro</p>
      `,
      attachments: [{ filename: `${invoice.number}.pdf`, content: pdfBuffer }],
    });

    if (result.success && invoice.status === "draft") {
      const idx = db.invoices.findIndex((inv) => inv.id === id);
      db.invoices[idx].status = "sent";
      await writeDB(db);
    }

    return Response.json(result);
  } catch (err) {
    return Response.json({ success: false, message: `Kunde inte skicka faktura: ${err}` }, { status: 500 });
  }
}
