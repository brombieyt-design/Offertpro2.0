import PDFDocument from "pdfkit";
import type { Quote, Invoice, LineItem } from "@/types";
import type { Settings } from "@/lib/db";
import { formatCurrency as utilsFormatCurrency } from "@/lib/utils";

function makeFormatter(currency: string = "SEK") {
  return (n: number) => utilsFormatCurrency(n, currency);
}

function lineTotal(item: LineItem) {
  const base = item.quantity * item.unitPrice;
  return item.discount ? base - base * (item.discount / 100) : base;
}

function collectPDFBuffer(doc: PDFKit.PDFDocument): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
    doc.end();
  });
}

function dataUrlToBuffer(dataUrl?: string): Buffer | null {
  if (!dataUrl || !dataUrl.startsWith("data:image/")) return null;
  const idx = dataUrl.indexOf(",");
  if (idx < 0) return null;
  try {
    return Buffer.from(dataUrl.slice(idx + 1), "base64");
  } catch {
    return null;
  }
}

function isHexColor(c?: string): c is string {
  return !!c && /^#[0-9a-fA-F]{6}$/.test(c);
}

interface BrandHeader {
  company?: Settings["company"];
  rightTitle: string;
  rightLines: string[];
}

function drawHeader(doc: PDFKit.PDFDocument, brand: BrandHeader): number {
  const c = brand.company ?? {};
  const accent = isHexColor(c.primaryColor) ? c.primaryColor! : "#4F46E5";
  const logoBuf = dataUrlToBuffer(c.logo);
  let leftY = 40;

  if (logoBuf) {
    try {
      doc.image(logoBuf, 50, leftY, { fit: [120, 50] });
      leftY += 56;
    } catch {
      // bad image data – fall back to text logo
      doc.fontSize(22).fillColor(accent).text(c.companyName || "Offert Pro", 50, leftY);
      leftY += 28;
    }
  } else {
    doc.fontSize(22).fillColor(accent).text(c.companyName || "Offert Pro", 50, leftY);
    leftY += 28;
  }

  doc.fontSize(9).fillColor("#888");
  const addressParts = [
    c.address,
    [c.zipCode, c.city].filter(Boolean).join(" "),
    c.email,
    c.phone,
  ].filter(Boolean) as string[];
  for (const part of addressParts) {
    doc.text(part, 50, leftY);
    leftY += 12;
  }

  // Right side title + meta
  doc.fontSize(16).fillColor("#1a1a1a").text(brand.rightTitle, 400, 40, { align: "right" });
  doc.fontSize(10).fillColor("#666");
  let ry = 60;
  for (const line of brand.rightLines) {
    doc.text(line, 400, ry, { align: "right" });
    ry += 14;
  }

  // Divider
  const dividerY = Math.max(leftY, ry) + 8;
  doc.moveTo(50, dividerY).lineTo(545, dividerY).strokeColor("#e5e5e5").stroke();

  return dividerY + 12;
}

function drawTable(
  doc: PDFKit.PDFDocument,
  items: LineItem[],
  startY: number,
  accent: string,
  fmt: (n: number) => string
): number {
  const tableTop = startY + 8;
  doc.rect(50, tableTop - 5, 495, 22).fill("#f8f8fa");
  doc.fontSize(8).fillColor("#888");
  doc.text("BESKRIVNING", 55, tableTop);
  doc.text("ANTAL", 320, tableTop, { align: "right", width: 50 });
  doc.text("PRIS", 380, tableTop, { align: "right", width: 70 });
  doc.text("SUMMA", 460, tableTop, { align: "right", width: 80 });

  let y = tableTop + 24;
  doc.fontSize(9);
  for (const item of items) {
    doc.fillColor("#333").text(item.description, 55, y, { width: 250 });
    doc.fillColor("#666").text(String(item.quantity), 320, y, { align: "right", width: 50 });
    doc.text(fmt(item.unitPrice), 380, y, { align: "right", width: 70 });
    doc.fillColor("#1a1a1a").text(fmt(lineTotal(item)), 460, y, { align: "right", width: 80 });
    y += 22;
  }

  y += 8;
  doc.moveTo(350, y).lineTo(540, y).strokeColor(accent).lineWidth(0.5).stroke();
  return y + 12;
}

function drawFooter(
  doc: PDFKit.PDFDocument,
  settings?: Settings
) {
  const note = settings?.defaults?.footerNote;
  if (!note) return;
  doc.fontSize(8).fillColor("#888").text(note, 50, 780, {
    width: 495,
    align: "center",
  });
}

export async function generateQuotePDF(
  quote: Quote,
  settings?: Settings
): Promise<Buffer> {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const accent = isHexColor(settings?.company?.primaryColor)
    ? settings!.company!.primaryColor!
    : "#4F46E5";
  const fmt = makeFormatter(settings?.defaults?.currency);

  const headerEnd = drawHeader(doc, {
    company: settings?.company,
    rightTitle: "OFFERT",
    rightLines: [
      quote.number,
      `Datum: ${quote.createdAt}`,
      `Giltig t.o.m: ${quote.validUntil}`,
    ],
  });

  // Customer block
  doc.fontSize(8).fillColor("#888").text("TILL", 50, headerEnd);
  doc.fontSize(12).fillColor("#1a1a1a").text(quote.customer.name, 50, headerEnd + 12);
  doc.fontSize(9).fillColor("#666");
  let cy = headerEnd + 28;
  if (quote.customer.company) { doc.text(quote.customer.company, 50, cy); cy += 14; }
  if (quote.customer.email) { doc.text(quote.customer.email, 50, cy); cy += 14; }

  const totalsTop = drawTable(doc, quote.items, Math.max(cy, headerEnd + 60), accent, fmt);

  doc.fontSize(10).fillColor("#666").text("Totalt exkl. moms", 350, totalsTop);
  doc.fontSize(14).fillColor(accent).text(fmt(quote.total), 460, totalsTop - 2, { align: "right", width: 80 });

  drawFooter(doc, settings);
  return collectPDFBuffer(doc);
}

export async function generateInvoicePDF(
  invoice: Invoice,
  settings?: Settings
): Promise<Buffer> {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const accent = isHexColor(settings?.company?.primaryColor)
    ? settings!.company!.primaryColor!
    : "#4F46E5";
  const fmt = makeFormatter(settings?.defaults?.currency);

  const headerEnd = drawHeader(doc, {
    company: settings?.company,
    rightTitle: "FAKTURA",
    rightLines: [
      invoice.number,
      `Utfärdad: ${invoice.issuedAt}`,
      `Förfaller: ${invoice.dueDate}`,
      `Villkor: ${invoice.paymentTerms}`,
    ],
  });

  // Customer block
  doc.fontSize(8).fillColor("#888").text("TILL", 50, headerEnd);
  doc.fontSize(12).fillColor("#1a1a1a").text(invoice.customer.name, 50, headerEnd + 12);
  doc.fontSize(9).fillColor("#666");
  let cy = headerEnd + 28;
  if (invoice.customer.company) { doc.text(invoice.customer.company, 50, cy); cy += 14; }
  if (invoice.customer.email) { doc.text(invoice.customer.email, 50, cy); cy += 14; }

  const totalsTop = drawTable(doc, invoice.items, Math.max(cy, headerEnd + 60), accent, fmt);

  doc.fontSize(10).fillColor("#666").text("Att betala", 350, totalsTop);
  doc.fontSize(14).fillColor(accent).text(fmt(invoice.total), 460, totalsTop - 2, { align: "right", width: 80 });

  // Payment details from settings
  const pay = settings?.payment;
  if (pay && (pay.bankgiro || pay.plusgiro || pay.iban)) {
    let py = totalsTop + 40;
    doc.fontSize(8).fillColor("#888").text("BETALNINGSUPPGIFTER", 50, py);
    py += 12;
    doc.fontSize(9).fillColor("#333");
    if (pay.bankgiro) { doc.text(`Bankgiro: ${pay.bankgiro}`, 50, py); py += 12; }
    if (pay.plusgiro) { doc.text(`Plusgiro: ${pay.plusgiro}`, 50, py); py += 12; }
    if (pay.iban) { doc.text(`IBAN: ${pay.iban}`, 50, py); py += 12; }
    if (pay.bic) { doc.text(`BIC: ${pay.bic}`, 50, py); py += 12; }
  }

  drawFooter(doc, settings);
  return collectPDFBuffer(doc);
}
