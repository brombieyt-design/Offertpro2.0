import { readDB } from "@/lib/db";

function escapeCsv(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function formatAmount(amount: number): string {
  return amount.toFixed(2).replace(".", ",");
}

const statusLabels: Record<string, string> = {
  draft: "Utkast",
  sent: "Skickad",
  opened: "Oppnad",
  accepted: "Accepterad",
  rejected: "Avvisad",
};

export async function GET() {
  try {
    const db = await readDB();
    const quotes = db.quotes;

    const headers = [
      "Offertnr",
      "Kund",
      "Foretag",
      "Belopp",
      "Status",
      "Skapad",
      "Giltig t.o.m.",
    ];

    const BOM = "\uFEFF";
    const rows = quotes.map((q) =>
      [
        escapeCsv(q.number),
        escapeCsv(q.customer.name),
        escapeCsv(q.customer.company ?? ""),
        formatAmount(q.total),
        statusLabels[q.status] ?? q.status,
        q.createdAt,
        q.validUntil,
      ].join(",")
    );

    const csv = BOM + headers.join(",") + "\n" + rows.join("\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="offerter.csv"',
      },
    });
  } catch (err) {
    return Response.json({ error: "Kunde inte exportera", details: String(err) }, { status: 500 });
  }
}
