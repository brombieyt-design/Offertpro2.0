import { readDB } from "@/lib/db";
import { generateQuotePDF } from "@/lib/pdf";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

  const db = readDB();
  const quote = db.quotes.find((q) => q.id === id);
  if (!quote) return Response.json({ error: "Not found" }, { status: 404 });

  const pdf = await generateQuotePDF(quote);

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${quote.number}.pdf"`,
    },
  });
}
