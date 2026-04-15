"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, RefreshCw, Download, Mail, Search, Copy, CheckSquare, ClipboardList } from "lucide-react";
import { invoiceStatusLabels, invoiceStatusColors } from "@/lib/constants";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { useToast } from "@/components/Toast";
import EmptyState from "@/components/EmptyState";
import type { Invoice, InvoiceStatus } from "@/types";

const tabs: { label: string; value: InvoiceStatus | "all" }[] = [
  { label: "Alla", value: "all" },
  { label: "Utkast", value: "draft" },
  { label: "Skickad", value: "sent" },
  { label: "Betald", value: "paid" },
  { label: "Förfallen", value: "overdue" },
  { label: "Delvis betald", value: "partially_paid" },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [activeTab, setActiveTab] = useState<InvoiceStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  async function fetchInvoices() {
    setLoading(true);
    try {
      const res = await fetch("/api/invoices");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setInvoices(Array.isArray(data) ? data : []);
    } catch {
      setInvoices([]);
      toast("Kunde inte ladda fakturor. Försök igen.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInvoices();
  }, []);

  async function sendInvoiceEmail(id: string) {
    const res = await fetch("/api/send-invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    toast(data.message, res.ok ? "success" : "error");
    fetchInvoices();
  }

  async function deleteInvoice(id: string) {
    if (!confirm("Vill du ta bort denna faktura?")) return;
    try {
      const res = await fetch("/api/invoices", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      toast("Faktura borttagen", "success");
      fetchInvoices();
    } catch {
      toast("Kunde inte ta bort faktura.", "error");
    }
  }

  async function duplicateInvoice(invoice: Invoice) {
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: invoice.customer,
          items: invoice.items,
          status: "draft",
          paymentTerms: invoice.paymentTerms,
        }),
      });
      if (!res.ok) throw new Error();
      toast("Faktura duplicerad", "success");
      fetchInvoices();
    } catch {
      toast("Kunde inte duplicera faktura.", "error");
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
      setSelected(new Set(filtered.map((inv) => inv.id)));
    }
  }

  async function bulkDelete() {
    if (selected.size === 0) return;
    if (!confirm(`Vill du ta bort ${selected.size} faktura(or)?`)) return;
    await Promise.all(
      Array.from(selected).map((id) =>
        fetch("/api/invoices", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        })
      )
    );
    setSelected(new Set());
    toast(`${selected.size} faktura(or) borttagna`, "success");
    fetchInvoices();
  }

  function countByStatus(status: InvoiceStatus | "all") {
    if (status === "all") return invoices.length;
    return invoices.filter((inv) => inv.status === status).length;
  }

  function sumByStatus(status: InvoiceStatus) {
    return invoices
      .filter((inv) => inv.status === status)
      .reduce((sum, inv) => sum + inv.total, 0);
  }

  const paidAmount = sumByStatus("paid");
  const pendingAmount = sumByStatus("sent") + sumByStatus("draft");
  const overdueAmount = sumByStatus("overdue");

  const filtered = invoices.filter((inv) => {
    const matchesTab = activeTab === "all" || inv.status === activeTab;
    if (!matchesTab) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      inv.number.toLowerCase().includes(query) ||
      inv.customer.name.toLowerCase().includes(query) ||
      (inv.customer.company?.toLowerCase().includes(query) ?? false)
    );
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">Fakturor</h1>
          <p className="text-sm text-gray-500 mt-1.5">
            {invoices.length} fakturor totalt
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={fetchInvoices}
            className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </button>
          <Link
            href="/invoices/new"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Ny faktura</span>
          </Link>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm hover:shadow-md p-5 sm:p-7 transition-all duration-300">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Betalda</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              {countByStatus("paid")}
            </span>
          </div>
          <p className="text-2xl font-bold tracking-tight text-green-600 mt-3">
            {formatCurrency(paidAmount)}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm hover:shadow-md p-5 sm:p-7 transition-all duration-300">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Väntande</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              {countByStatus("sent") + countByStatus("draft")}
            </span>
          </div>
          <p className="text-2xl font-bold tracking-tight text-blue-600 mt-3">
            {formatCurrency(pendingAmount)}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm hover:shadow-md p-5 sm:p-7 transition-all duration-300">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Förfallna</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
              {countByStatus("overdue")}
            </span>
          </div>
          <p className="text-2xl font-bold tracking-tight text-red-600 mt-3">
            {formatCurrency(overdueAmount)}
          </p>
        </div>
      </div>

      {/* Search + Filter tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            className="pl-11 pr-4 py-2.5 text-sm bg-white border border-gray-200/80 rounded-full w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all"
            placeholder="Sök faktura, kund..."
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
            Laddar fakturor...
          </div>
        ) : invoices.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="Inga fakturor ännu"
            description="Skapa din första faktura och få betalt snabbare med automatiska påminnelser och Swish/QR-betalning."
            actionLabel="Skapa din första faktura"
            actionHref="/invoices/new"
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
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 sm:px-7 py-3 sm:py-4">Fakturanr</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 sm:px-7 py-3 sm:py-4">Kund</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 sm:px-7 py-3 sm:py-4">Belopp</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 sm:px-7 py-3 sm:py-4 hidden md:table-cell">Utfärdad</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 sm:px-7 py-3 sm:py-4 hidden md:table-cell">Förfaller</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 sm:px-7 py-3 sm:py-4">Status</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 sm:px-7 py-3 sm:py-4">Åtgärder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50/50 transition-all duration-300">
                    <td className="px-4 sm:px-5 py-4 sm:py-5">
                      <input
                        type="checkbox"
                        checked={selected.has(invoice.id)}
                        onChange={() => toggleSelect(invoice.id)}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-4 sm:px-7 py-4 sm:py-5 text-sm font-medium text-indigo-600">
                      <Link href={`/invoices/${invoice.id}`} className="hover:underline">
                        {invoice.number}
                      </Link>
                    </td>
                    <td className="px-4 sm:px-7 py-4 sm:py-5">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-[140px] sm:max-w-none">{invoice.customer.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5 truncate max-w-[140px] sm:max-w-none">{invoice.customer.company}</div>
                    </td>
                    <td className="px-4 sm:px-7 py-4 sm:py-5 text-sm font-semibold text-gray-900 whitespace-nowrap">{formatCurrency(invoice.total)}</td>
                    <td className="px-4 sm:px-7 py-4 sm:py-5 text-sm text-gray-500 hidden md:table-cell whitespace-nowrap">{formatDate(invoice.issuedAt)}</td>
                    <td className="px-4 sm:px-7 py-4 sm:py-5 text-sm text-gray-500 hidden md:table-cell whitespace-nowrap">{formatDate(invoice.dueDate)}</td>
                    <td className="px-4 sm:px-7 py-4 sm:py-5">
                      <select
                        value={invoice.status}
                        onChange={async (e) => {
                          await fetch("/api/invoices", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: invoice.id, status: e.target.value }),
                          });
                          fetchInvoices();
                        }}
                        className={cn(
                          "appearance-none cursor-pointer px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-indigo-200",
                          invoiceStatusColors[invoice.status]
                        )}
                      >
                        <option value="draft">Utkast</option>
                        <option value="sent">Skickad</option>
                        <option value="paid">Betald</option>
                        <option value="overdue">Förfallen</option>
                        <option value="partially_paid">Delvis betald</option>
                      </select>
                    </td>
                    <td className="px-4 sm:px-7 py-4 sm:py-5 text-right">
                      <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                        <button
                          onClick={() => duplicateInvoice(invoice)}
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 hidden sm:block"
                          title="Duplicera faktura"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => sendInvoiceEmail(invoice.id)}
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hidden sm:block"
                          title="Skicka via e-post"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <a
                          href={`/api/invoices/pdf?id=${invoice.id}`}
                          download
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300"
                          title="Ladda ner PDF"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => deleteInvoice(invoice.id)}
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
                    <td colSpan={8} className="px-4 sm:px-7 py-12 text-center text-sm text-gray-400">
                      {searchQuery
                        ? "Inga fakturor matchar din sökning."
                        : "Inga fakturor med denna status."}
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
