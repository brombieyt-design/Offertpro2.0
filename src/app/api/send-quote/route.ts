import { readDB, writeDB } from "@/lib/db";
import { generateQuotePDF } from "@/lib/pdf";
import { sendEmail } from "@/lib/email";
import type { NextRequest } from "next/server";
import crypto from "crypto";

function generateShareToken(): string {
  return crypto.randomBytes(16).toString("base64url");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getBaseUrl(request: NextRequest): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;
  if (configured) return configured.replace(/\/$/, "");
  const host = request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || "https";
  if (host) return `${proto}://${host}`;
  return "";
}

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    const db = await readDB();
    const idx = db.quotes.findIndex((q) => q.id === id);
    if (idx === -1) return Response.json({ error: "Not found" }, { status: 404 });
    const quote = db.quotes[idx];

    // Make sure we have a share token to link to
    let shareTokenUpdated = false;
    if (!quote.shareToken) {
      quote.shareToken = generateShareToken();
      shareTokenUpdated = true;
    }

    const baseUrl = getBaseUrl(request);
    const offerUrl = `${baseUrl}/q/${quote.shareToken}`;
    const companyName = db.settings?.company?.companyName || "Offert Pro";
    const primaryColor = db.settings?.company?.primaryColor || "#4F46E5";
    const totalFmt = new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: db.settings?.defaults?.currency || "SEK",
      minimumFractionDigits: 0,
    }).format(quote.total);

    const pdfBuffer = await generateQuotePDF(quote, db.settings);

    const result = await sendEmail({
      to: quote.customer.email,
      subject: `Offert ${quote.number} från ${companyName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #111827;">
          <h2 style="margin: 0 0 16px 0; font-size: 20px;">Hej ${escapeHtml(quote.customer.name)},</h2>
          <p style="margin: 0 0 16px 0; line-height: 1.6;">Vi har tagit fram offert <strong>${escapeHtml(quote.number)}</strong> till dig. Öppna den interaktiva offerten för att granska, välja till tillval och signera digitalt.</p>

          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px 20px; margin: 20px 0;">
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Totalt belopp</p>
            <p style="margin: 0; font-size: 22px; font-weight: 700; color: ${primaryColor};">${totalFmt}</p>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #6b7280;">Giltig t.o.m. ${escapeHtml(quote.validUntil)}</p>
          </div>

          <div style="text-align: center; margin: 28px 0;">
            <a href="${offerUrl}" style="display: inline-block; background: ${primaryColor}; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 999px; font-weight: 600; font-size: 15px;">Öppna offerten</a>
          </div>

          <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280;">Eller kopiera länken i din webbläsare:</p>
          <p style="margin: 0 0 24px 0; font-size: 13px; word-break: break-all;"><a href="${offerUrl}" style="color: ${primaryColor};">${offerUrl}</a></p>

          <p style="margin: 24px 0 4px 0; font-size: 13px; color: #6b7280;">En PDF-version finns även bifogad.</p>

          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;">
          <p style="margin: 0; font-size: 13px; color: #6b7280;">Med vänliga hälsningar,<br>${escapeHtml(companyName)}</p>
        </div>
      `,
      attachments: [{ filename: `${quote.number}.pdf`, content: pdfBuffer }],
    });

    let statusUpdated = false;
    if (result.success && quote.status === "draft") {
      quote.status = "sent";
      statusUpdated = true;
    }

    if (shareTokenUpdated || statusUpdated) {
      db.quotes[idx] = quote;
      await writeDB(db);
    }

    return Response.json(result);
  } catch (err) {
    return Response.json({ success: false, message: `Kunde inte skicka offert: ${err}` }, { status: 500 });
  }
}
