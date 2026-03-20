"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, RefreshCw, Download, Mail } from "lucide-react";
import { quoteStatusLabels, quoteStatusColors } from "@/lib/constants";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import type { Quote, QuoteStatus } from "@/types";

const tabs: { label: string; value: QuoteStatus | "all" }[] = [
  { label: "Alla", value: "all" },
  { label: "Utkast", value: "draft" },
  { label: "Skickad", value: "sent" },
  { label: "Öppnad", value: "opened" },
  { label: "Accepterad", value: "accepted" },
  { label: "Avvisad", value: "rejected" },
];

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [activeTab, setActiveTab] = useState<QuoteStatus | "all">("all");
  const [loading, setLoading] = useState(true);

  async function fetchQuotes() {
    setLoading(true);
    const res = await fetch("/api/quotes");
    const data = await res.json();
    setQuotes(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function sendQuoteEmail(id: string) {
    const res = await fetch("/api/send-quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    alert(data.message);
    fetchQuotes();
  }

  async function deleteQuote(id: string) {
    if (!confirm("Vill du ta bort denna offert?")) return;
    await fetch("/api/quotes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchQuotes();
  }

  function countByStatus(status: QuoteStatus | "all") {
    if (status === "all") return quotes.length;
    return quotes.filter((q) => q.status === status).length;
  }

  const filtered =
    activeTab === "all"
      ? quotes
      : quotes.filter((q) => q.status === activeTab);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Offerter
          </h1>
          <p className="text-sm text-gray-500 mt-1.5">
            {quotes.length} offerter totalt
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchQuotes}
            className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </button>
          <Link
            href="/quotes/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            Ny offert
          </Link>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-gray-100/60 p-1.5 rounded-full w-fit">
        {tabs.map((tab) => {
          const count = countByStatus(tab.value);
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                tab.value === activeTab
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
      <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm overflow-hidden">
        {loading ? (
          <div className="px-7 py-16 text-center text-sm text-gray-400">
            Laddar offerter...
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100/80">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-7 py-4.5">
                  Offert#
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-7 py-4.5">
                  Kund
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-7 py-4.5">
                  Belopp
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-7 py-4.5">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-7 py-4.5">
                  Skapad
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-7 py-4.5">
                  Giltig t.o.m.
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-7 py-4.5">
                  Åtgärder
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((quote) => (
                <tr
                  key={quote.id}
                  className="hover:bg-gray-50/50 transition-all duration-300"
                >
                  <td className="px-7 py-5 text-sm font-medium text-indigo-600">
                    {quote.number}
                  </td>
                  <td className="px-7 py-5">
                    <div className="text-sm font-medium text-gray-900">
                      {quote.customer.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {quote.customer.company}
                    </div>
                  </td>
                  <td className="px-7 py-5 text-sm font-semibold text-gray-900">
                    {formatCurrency(quote.total)}
                  </td>
                  <td className="px-7 py-5">
                    <span
                      className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                        quoteStatusColors[quote.status]
                      )}
                    >
                      {quoteStatusLabels[quote.status]}
                    </span>
                  </td>
                  <td className="px-7 py-5 text-sm text-gray-500">
                    {formatDate(quote.createdAt)}
                  </td>
                  <td className="px-7 py-5 text-sm text-gray-500">
                    {formatDate(quote.validUntil)}
                  </td>
                  <td className="px-7 py-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => sendQuoteEmail(quote.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
                        title="Skicka via e-post"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <a
                        href={`/api/quotes/pdf?id=${quote.id}`}
                        download
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300"
                        title="Ladda ner PDF"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => deleteQuote(quote.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                        title="Ta bort"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-7 py-12 text-center text-sm text-gray-400"
                  >
                    Inga offerter med denna status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
