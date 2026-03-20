import { readDB } from "@/lib/db";
import { generateInvoicePDF } from "@/lib/pdf";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

  const db = readDB();
  const invoice = db.invoices.find((inv) => inv.id === id);
  if (!invoice) return Response.json({ error: "Not found" }, { status: 404 });

  const pdf = await generateInvoicePDF(invoice);

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${invoice.number}.pdf"`,
    },
  });
}
