import Link from "next/link";
import { Plus, MoreHorizontal } from "lucide-react";
import { quotes } from "@/lib/mock-data";
import { quoteStatusLabels, quoteStatusColors } from "@/lib/constants";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import type { QuoteStatus } from "@/types";

const tabs: { label: string; value: QuoteStatus | "all" }[] = [
  { label: "Alla", value: "all" },
  { label: "Utkast", value: "draft" },
  { label: "Skickad", value: "sent" },
  { label: "Öppnad", value: "opened" },
  { label: "Accepterad", value: "accepted" },
  { label: "Avvisad", value: "rejected" },
];

function countByStatus(status: QuoteStatus | "all") {
  if (status === "all") return quotes.length;
  return quotes.filter((q) => q.status === status).length;
}

export default function QuotesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Offerter</h1>
          <p className="text-sm text-gray-500 mt-1">
            {quotes.length} offerter totalt
          </p>
        </div>
        <Link
          href="/quotes/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ny offert
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map((tab) => {
          const count = countByStatus(tab.value);
          return (
            <button
              key={tab.value}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                tab.value === "all"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab.label}
              <span className="ml-1.5 text-xs text-gray-400">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Offert#
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Kund
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Belopp
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Status
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Skapad
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Giltig t.o.m.
              </th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Åtgärder
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {quotes.map((quote) => (
              <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-indigo-600">
                  {quote.number}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {quote.customer.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {quote.customer.company}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {formatCurrency(quote.total)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      quoteStatusColors[quote.status]
                    )}
                  >
                    {quoteStatusLabels[quote.status]}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(quote.createdAt)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(quote.validUntil)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
