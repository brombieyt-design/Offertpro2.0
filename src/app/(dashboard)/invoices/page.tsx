"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, RefreshCw, Download, Mail } from "lucide-react";
import { invoiceStatusLabels, invoiceStatusColors } from "@/lib/constants";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
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

  async function fetchInvoices() {
    setLoading(true);
    const res = await fetch("/api/invoices");
    const data = await res.json();
    setInvoices(data);
    setLoading(false);
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
    alert(data.message);
    fetchInvoices();
  }

  async function deleteInvoice(id: string) {
    if (!confirm("Vill du ta bort denna faktura?")) return;
    await fetch("/api/invoices", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
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

  const filtered =
    activeTab === "all"
      ? invoices
      : invoices.filter((inv) => inv.status === activeTab);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Fakturor</h1>
          <p className="text-sm text-gray-500 mt-1.5">
            {invoices.length} fakturor totalt
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchInvoices}
            className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </button>
          <Link
            href="/invoices/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            Ny faktura
          </Link>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm hover:shadow-md p-7 transition-all duration-300">
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
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm hover:shadow-md p-7 transition-all duration-300">
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
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm hover:shadow-md p-7 transition-all duration-300">
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
            Laddar fakturor...
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100/80">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-7 py-4.5">Fakturanr</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-7 py-4.5">Kund</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-7 py-4.5">Belopp</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-7 py-4.5">Utfärdad</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-7 py-4.5">Förfaller</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-7 py-4.5">Status</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-7 py-4.5">Åtgärder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50/50 transition-all duration-300">
                  <td className="px-7 py-5 text-sm font-medium text-indigo-600">{invoice.number}</td>
                  <td className="px-7 py-5">
                    <div className="text-sm font-medium text-gray-900">{invoice.customer.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{invoice.customer.company}</div>
                  </td>
                  <td className="px-7 py-5 text-sm font-semibold text-gray-900">{formatCurrency(invoice.total)}</td>
                  <td className="px-7 py-5 text-sm text-gray-500">{formatDate(invoice.issuedAt)}</td>
                  <td className="px-7 py-5 text-sm text-gray-500">{formatDate(invoice.dueDate)}</td>
                  <td className="px-7 py-5">
                    <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", invoiceStatusColors[invoice.status])}>
                      {invoiceStatusLabels[invoice.status]}
                    </span>
                  </td>
                  <td className="px-7 py-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => sendInvoiceEmail(invoice.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
                        title="Skicka via e-post"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <a
                        href={`/api/invoices/pdf?id=${invoice.id}`}
                        download
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300"
                        title="Ladda ner PDF"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => deleteInvoice(invoice.id)}
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
                  <td colSpan={7} className="px-7 py-12 text-center text-sm text-gray-400">
                    Inga fakturor med denna status.
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
