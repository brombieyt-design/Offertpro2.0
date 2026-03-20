import PDFDocument from "pdfkit";
import type { Quote, Invoice, LineItem } from "@/types";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0,
  }).format(n);
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

export async function generateQuotePDF(quote: Quote): Promise<Buffer> {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  // Header
  doc.fontSize(22).fillColor("#4F46E5").text("Offert Pro", 50, 40);
  doc.fontSize(9).fillColor("#888").text("Storgatan 1, 111 22 Stockholm", 50, 65);

  doc.fontSize(16).fillColor("#1a1a1a").text("OFFERT", 400, 40, { align: "right" });
  doc.fontSize(10).fillColor("#666").text(quote.number, 400, 60, { align: "right" });
  doc.text(`Datum: ${quote.createdAt}`, 400, 74, { align: "right" });
  doc.text(`Giltig t.o.m: ${quote.validUntil}`, 400, 88, { align: "right" });

  // Line
  doc.moveTo(50, 110).lineTo(545, 110).strokeColor("#e5e5e5").stroke();

  // Customer
  doc.fontSize(8).fillColor("#888").text("TILL", 50, 120);
  doc.fontSize(12).fillColor("#1a1a1a").text(quote.customer.name, 50, 132);
  doc.fontSize(9).fillColor("#666");
  let cy = 148;
  if (quote.customer.company) { doc.text(quote.customer.company, 50, cy); cy += 14; }
  if (quote.customer.email) { doc.text(quote.customer.email, 50, cy); cy += 14; }

  // Table header
  const tableTop = Math.max(cy + 20, 180);
  doc.rect(50, tableTop - 5, 495, 20).fill("#f8f8fa");
  doc.fontSize(8).fillColor("#888");
  doc.text("BESKRIVNING", 55, tableTop);
  doc.text("ANTAL", 320, tableTop, { align: "right", width: 50 });
  doc.text("PRIS", 380, tableTop, { align: "right", width: 70 });
  doc.text("SUMMA", 460, tableTop, { align: "right", width: 80 });

  // Items
  let y = tableTop + 22;
  doc.fontSize(9);
  for (const item of quote.items) {
    doc.fillColor("#333").text(item.description, 55, y);
    doc.fillColor("#666").text(String(item.quantity), 320, y, { align: "right", width: 50 });
    doc.text(formatCurrency(item.unitPrice), 380, y, { align: "right", width: 70 });
    doc.fillColor("#1a1a1a").text(formatCurrency(lineTotal(item)), 460, y, { align: "right", width: 80 });
    y += 20;
  }

  // Total
  y += 10;
  doc.moveTo(350, y).lineTo(540, y).strokeColor("#ddd").stroke();
  y += 12;
  doc.fontSize(10).fillColor("#666").text("Totalt exkl. moms", 350, y);
  doc.fontSize(14).fillColor("#1a1a1a").text(formatCurrency(quote.total), 460, y - 2, { align: "right", width: 80 });

  return collectPDFBuffer(doc);
}

export async function generateInvoicePDF(invoice: Invoice): Promise<Buffer> {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  // Header
  doc.fontSize(22).fillColor("#4F46E5").text("Offert Pro", 50, 40);
  doc.fontSize(9).fillColor("#888").text("Storgatan 1, 111 22 Stockholm", 50, 65);

  doc.fontSize(16).fillColor("#1a1a1a").text("FAKTURA", 400, 40, { align: "right" });
  doc.fontSize(10).fillColor("#666").text(invoice.number, 400, 60, { align: "right" });
  doc.text(`Utfärdad: ${invoice.issuedAt}`, 400, 74, { align: "right" });
  doc.text(`Förfaller: ${invoice.dueDate}`, 400, 88, { align: "right" });
  doc.text(`Villkor: ${invoice.paymentTerms}`, 400, 102, { align: "right" });

  // Line
  doc.moveTo(50, 118).lineTo(545, 118).strokeColor("#e5e5e5").stroke();

  // Customer
  doc.fontSize(8).fillColor("#888").text("TILL", 50, 128);
  doc.fontSize(12).fillColor("#1a1a1a").text(invoice.customer.name, 50, 140);
  doc.fontSize(9).fillColor("#666");
  let cy = 156;
  if (invoice.customer.company) { doc.text(invoice.customer.company, 50, cy); cy += 14; }
  if (invoice.customer.email) { doc.text(invoice.customer.email, 50, cy); cy += 14; }

  // Table
  const tableTop = Math.max(cy + 20, 190);
  doc.rect(50, tableTop - 5, 495, 20).fill("#f8f8fa");
  doc.fontSize(8).fillColor("#888");
  doc.text("BESKRIVNING", 55, tableTop);
  doc.text("ANTAL", 320, tableTop, { align: "right", width: 50 });
  doc.text("PRIS", 380, tableTop, { align: "right", width: 70 });
  doc.text("SUMMA", 460, tableTop, { align: "right", width: 80 });

  let y = tableTop + 22;
  doc.fontSize(9);
  for (const item of invoice.items) {
    doc.fillColor("#333").text(item.description, 55, y);
    doc.fillColor("#666").text(String(item.quantity), 320, y, { align: "right", width: 50 });
    doc.text(formatCurrency(item.unitPrice), 380, y, { align: "right", width: 70 });
    doc.fillColor("#1a1a1a").text(formatCurrency(lineTotal(item)), 460, y, { align: "right", width: 80 });
    y += 20;
  }

  // Total
  y += 10;
  doc.moveTo(350, y).lineTo(540, y).strokeColor("#ddd").stroke();
  y += 12;
  doc.fontSize(10).fillColor("#666").text("Att betala", 350, y);
  doc.fontSize(14).fillColor("#1a1a1a").text(formatCurrency(invoice.total), 460, y - 2, { align: "right", width: 80 });

  return collectPDFBuffer(doc);
}
