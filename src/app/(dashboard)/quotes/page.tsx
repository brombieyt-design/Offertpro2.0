"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, RefreshCw, Download, Mail, Search, ArrowRightLeft, Copy, CheckSquare, FileText } from "lucide-react";
import { quoteStatusLabels, quoteStatusColors } from "@/lib/constants";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { useToast } from "@/components/Toast";
import EmptyState from "@/components/EmptyState";
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
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [activeTab, setActiveTab] = useState<QuoteStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [converting, setConverting] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  async function fetchQuotes() {
    setLoading(true);
    try {
      const res = await fetch("/api/quotes");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setQuotes(Array.isArray(data) ? data : []);
    } catch {
      setQuotes([]);
      toast("Kunde inte ladda offerter. Försök igen.", "error");
    } finally {
      setLoading(false);
    }
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
    toast(data.message, res.ok ? "success" : "error");
    fetchQuotes();
  }

  async function deleteQuote(id: string) {
    if (!confirm("Vill du ta bort denna offert?")) return;
    try {
      const res = await fetch("/api/quotes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      toast("Offert borttagen", "success");
      fetchQuotes();
    } catch {
      toast("Kunde inte ta bort offert.", "error");
    }
  }

  async function convertToInvoice(quote: Quote) {
    if (!confirm(`Skapa faktura från offert ${quote.number}?`)) return;
    setConverting(quote.id);
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: quote.customer,
          items: quote.items,
          status: "draft",
          paymentTerms: "30 dagar netto",
        }),
      });
      if (!res.ok) throw new Error();
      toast("Faktura skapad från offert", "success");
      router.push("/invoices");
    } catch {
      toast("Kunde inte skapa faktura.", "error");
    } finally {
      setConverting(null);
    }
  }

  async function duplicateQuote(quote: Quote) {
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: quote.customer,
          items: quote.items,
          status: "draft",
        }),
      });
      if (!res.ok) throw new Error();
      toast("Offert duplicerad", "success");
      fetchQuotes();
    } catch {
      toast("Kunde inte duplicera offert.", "error");
    }
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((q) => q.id)));
    }
  }

  async function bulkDelete() {
    if (selected.size === 0) return;
    if (!confirm(`Vill du ta bort ${selected.size} offert(er)?`)) return;
    await Promise.all(
      Array.from(selected).map((id) =>
        fetch("/api/quotes", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        })
      )
    );
    setSelected(new Set());
    toast(`${selected.size} offert(er) borttagna`, "success");
    fetchQuotes();
  }

  function countByStatus(status: QuoteStatus | "all") {
    if (status === "all") return quotes.length;
    return quotes.filter((q) => q.status === status).length;
  }

  const filtered = quotes.filter((q) => {
    const matchesTab = activeTab === "all" || q.status === activeTab;
    if (!matchesTab) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      q.number.toLowerCase().includes(query) ||
      q.customer.name.toLowerCase().includes(query) ||
      (q.customer.company?.toLowerCase().includes(query) ?? false)
    );
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
            Offerter
          </h1>
          <p className="text-sm text-gray-500 mt-1.5">
            {quotes.length} offerter totalt
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={fetchQuotes}
            className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </button>
          <Link
            href="/quotes/new"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Ny offert</span>
          </Link>
        </div>
      </div>

      {/* Search + Filter tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            className="pl-11 pr-4 py-2.5 text-sm bg-white border border-gray-200/80 rounded-full w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all"
            placeholder="Sök offert, kund..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-1 bg-gray-100/60 p-1.5 rounded-full overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const count = countByStatus(tab.value);
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap shrink-0",
                  tab.value === activeTab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {tab.label}
                <span className="ml-1 sm:ml-1.5 text-xs text-gray-400">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 bg-indigo-50 border border-indigo-200 rounded-xl">
          <CheckSquare className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-700">
            {selected.size} markerad(e)
          </span>
          <button
            onClick={bulkDelete}
            className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Ta bort valda
          </button>
          <button
            onClick={() => setSelected(new Set())}
            className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
          >
            Avmarkera
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm overflow-hidden">
        {loading ? (
          <div className="px-4 sm:px-7 py-16 text-center text-sm text-gray-400">
            Laddar offerter...
          </div>
        ) : quotes.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="Inga offerter ännu"
            description="Skapa din första offert på under en minut och vinn fler affärer med professionell design."
            actionLabel="Skapa din första offert"
            actionHref="/quotes/new"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100/80">
                  <th className="px-4 sm:px-5 py-3 sm:py-4 w-10">
                    <input
                      type="checkbox"
                      checked={filtered.length > 0 && selected.size === filtered.length}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 sm:px-7 py-3 sm:py-4">
                    Offert#
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 sm:px-7 py-3 sm:py-4">
                    Kund
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 sm:px-7 py-3 sm:py-4">
                    Belopp
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 sm:px-7 py-3 sm:py-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 sm:px-7 py-3 sm:py-4 hidden md:table-cell">
                    Skapad
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 sm:px-7 py-3 sm:py-4 hidden lg:table-cell">
                    Giltig t.o.m.
                  </th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 sm:px-7 py-3 sm:py-4">
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
                    <td className="px-4 sm:px-5 py-4 sm:py-5">
                      <input
                        type="checkbox"
                        checked={selected.has(quote.id)}
                        onChange={() => toggleSelect(quote.id)}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-4 sm:px-7 py-4 sm:py-5 text-sm font-medium text-indigo-600">
                      <Link href={`/quotes/${quote.id}`} className="hover:underline">
                        {quote.number}
                      </Link>
                    </td>
                    <td className="px-4 sm:px-7 py-4 sm:py-5">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-[140px] sm:max-w-none">
                        {quote.customer.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 truncate max-w-[140px] sm:max-w-none">
                        {quote.customer.company}
                      </div>
                    </td>
                    <td className="px-4 sm:px-7 py-4 sm:py-5 text-sm font-semibold text-gray-900 whitespace-nowrap">
                      {formatCurrency(quote.total)}
                    </td>
                    <td className="px-4 sm:px-7 py-4 sm:py-5">
                      <select
                        value={quote.status}
                        onChange={async (e) => {
                          await fetch("/api/quotes", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: quote.id, status: e.target.value }),
                          });
                          fetchQuotes();
                        }}
                        className={cn(
                          "appearance-none cursor-pointer px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-indigo-200",
                          quoteStatusColors[quote.status]
                        )}
                      >
                        <option value="draft">Utkast</option>
                        <option value="sent">Skickad</option>
                        <option value="opened">Öppnad</option>
                        <option value="accepted">Accepterad</option>
                        <option value="rejected">Avvisad</option>
                      </select>
                    </td>
                    <td className="px-4 sm:px-7 py-4 sm:py-5 text-sm text-gray-500 hidden md:table-cell whitespace-nowrap">
                      {formatDate(quote.createdAt)}
                    </td>
                    <td className="px-4 sm:px-7 py-4 sm:py-5 text-sm text-gray-500 hidden lg:table-cell whitespace-nowrap">
                      {formatDate(quote.validUntil)}
                    </td>
                    <td className="px-4 sm:px-7 py-4 sm:py-5 text-right">
                      <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                        {quote.status === "accepted" && (
                          <button
                            onClick={() => convertToInvoice(quote)}
                            disabled={converting === quote.id}
                            className="p-1.5 sm:p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300"
                            title="Skapa faktura från offert"
                          >
                            <ArrowRightLeft className={cn("w-4 h-4", converting === quote.id && "animate-spin")} />
                          </button>
                        )}
                        <button
                          onClick={() => duplicateQuote(quote)}
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 hidden sm:block"
                          title="Duplicera offert"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => sendQuoteEmail(quote.id)}
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hidden sm:block"
                          title="Skicka via e-post"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <a
                          href={`/api/quotes/pdf?id=${quote.id}`}
                          download
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300"
                          title="Ladda ner PDF"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => deleteQuote(quote.id)}
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
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
                      colSpan={8}
                      className="px-4 sm:px-7 py-12 text-center text-sm text-gray-400"
                    >
                      {searchQuery
                        ? "Inga offerter matchar din sökning."
                        : "Inga offerter med denna status."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
