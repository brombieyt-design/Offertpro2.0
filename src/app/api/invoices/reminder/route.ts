import { readDB } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    const db = await readDB();
    const invoice = db.invoices.find((inv) => inv.id === id);
    if (!invoice) {
      return Response.json({ success: false, message: "Faktura hittades ej" }, { status: 404 });
    }

    const remaining = Math.max(0, invoice.total - (invoice.paidAmount ?? 0));
    if (remaining <= 0) {
      return Response.json(
        { success: false, message: "Fakturan är redan betald" },
        { status: 400 }
      );
    }

    const company = db.settings?.company?.companyName || "Offert Pro";
    const accent = db.settings?.company?.primaryColor || "#4f46e5";
    const signature = db.settings?.defaults?.emailSignature || `Med vänliga hälsningar,\n${company}`;
    const reminderFee = db.settings?.payment?.reminderFee;
    const lateInterest = db.settings?.payment?.lateInterest;

    const fmt = (n: number) =>
      new Intl.NumberFormat("sv-SE", {
        style: "currency",
        currency: db.settings?.defaults?.currency || "SEK",
        minimumFractionDigits: 0,
      }).format(n);

    const feeLine = reminderFee
      ? `<p style="color:#6b7280;font-size:13px">En påminnelseavgift på <strong>${fmt(Number(reminderFee))}</strong> tillkommer enligt våra villkor.</p>`
      : "";
    const interestLine = lateInterest
      ? `<p style="color:#6b7280;font-size:13px">Dröjsmålsränta debiteras från förfallodag med ${lateInterest}% per år.</p>`
      : "";

    const result = await sendEmail({
      to: invoice.customer.email,
      subject: `Påminnelse: Faktura ${invoice.number}`,
      html: `
        <div style="font-family:system-ui,-apple-system,sans-serif;color:#111827;max-width:560px">
          <h2 style="color:${accent};margin:0 0 12px">Betalningspåminnelse</h2>
          <p>Hej ${invoice.customer.name},</p>
          <p>Enligt våra noteringar är faktura <strong>${invoice.number}</strong> med
          förfallodag <strong>${invoice.dueDate}</strong> ännu inte betald.</p>
          <div style="background:#f9fafb;border-radius:10px;padding:16px 20px;margin:20px 0">
            <p style="margin:0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.06em">Att betala</p>
            <p style="margin:4px 0 0;font-size:22px;font-weight:700;color:${accent}">${fmt(remaining)}</p>
          </div>
          ${feeLine}
          ${interestLine}
          <p>Har betalningen redan skickats, bortse gärna från denna påminnelse.</p>
          <pre style="font-family:inherit;white-space:pre-wrap;margin-top:24px;color:#374151">${signature}</pre>
        </div>
      `,
    });

    return Response.json(result);
  } catch (err) {
    return Response.json(
      { success: false, message: `Kunde inte skicka påminnelse: ${err}` },
      { status: 500 }
    );
  }
}
