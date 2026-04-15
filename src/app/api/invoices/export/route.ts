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
  paid: "Betald",
  overdue: "Forfallen",
  partially_paid: "Delvis betald",
};

export async function GET() {
  try {
    const db = await readDB();
    const invoices = db.invoices;

    const headers = [
      "Fakturanr",
      "Kund",
      "Foretag",
      "Belopp",
      "Status",
      "Utfardad",
      "Forfaller",
      "Betalningsvillkor",
    ];

    const BOM = "\uFEFF";
    const rows = invoices.map((inv) =>
      [
        escapeCsv(inv.number),
        escapeCsv(inv.customer.name),
        escapeCsv(inv.customer.company ?? ""),
        formatAmount(inv.total),
        statusLabels[inv.status] ?? inv.status,
        inv.issuedAt,
        inv.dueDate,
        escapeCsv(inv.paymentTerms),
      ].join(",")
    );

    const csv = BOM + headers.join(",") + "\n" + rows.join("\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="fakturor.csv"',
      },
    });
  } catch (err) {
    return Response.json({ error: "Kunde inte exportera", details: String(err) }, { status: 500 });
  }
}
