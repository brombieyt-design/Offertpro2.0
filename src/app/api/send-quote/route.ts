import { readDB, writeDB } from "@/lib/db";
import { generateQuotePDF } from "@/lib/pdf";
import { sendEmail } from "@/lib/email";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    const db = readDB();
    const quote = db.quotes.find((q) => q.id === id);
    if (!quote) return Response.json({ error: "Not found" }, { status: 404 });

    const pdfBuffer = await generateQuotePDF(quote);

    const result = await sendEmail({
      to: quote.customer.email,
      subject: `Offert ${quote.number} från Offert Pro`,
      html: `
        <h2>Hej ${quote.customer.name},</h2>
        <p>Bifogat hittar du offert <strong>${quote.number}</strong>.</p>
        <p>Totalt belopp: <strong>${new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK", minimumFractionDigits: 0 }).format(quote.total)}</strong></p>
        <p>Offerten är giltig till ${quote.validUntil}.</p>
        <br>
        <p>Med vänliga hälsningar,<br>Offert Pro</p>
      `,
      attachments: [{ filename: `${quote.number}.pdf`, content: pdfBuffer }],
    });

    if (result.success && quote.status === "draft") {
      const idx = db.quotes.findIndex((q) => q.id === id);
      db.quotes[idx].status = "sent";
      writeDB(db);
    }

    return Response.json(result);
  } catch (err) {
    return Response.json({ success: false, message: `Kunde inte skicka offert: ${err}` }, { status: 500 });
  }
}
