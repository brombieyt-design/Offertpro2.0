import Link from "next/link";
import { Plus, MoreHorizontal } from "lucide-react";
import { invoices } from "@/lib/mock-data";
import { invoiceStatusLabels, invoiceStatusColors } from "@/lib/constants";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import type { InvoiceStatus } from "@/types";

const tabs: { label: string; value: InvoiceStatus | "all" }[] = [
  { label: "Alla", value: "all" },
  { label: "Utkast", value: "draft" },
  { label: "Skickad", value: "sent" },
  { label: "Betald", value: "paid" },
  { label: "Förfallen", value: "overdue" },
  { label: "Delvis betald", value: "partially_paid" },
];

function countByStatus(status: InvoiceStatus | "all") {
  if (status === "all") return invoices.length;
  return invoices.filter((inv) => inv.status === status).length;
}

function sumByStatus(status: InvoiceStatus) {
  return invoices
    .filter((inv) => inv.status === status)
    .reduce((sum, inv) => sum + inv.total, 0);
}

export default function InvoicesPage() {
  const paidAmount = sumByStatus("paid");
  const pendingAmount = sumByStatus("sent") + sumByStatus("draft");
  const overdueAmount = sumByStatus("overdue");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fakturor</h1>
          <p className="text-sm text-gray-500 mt-1">
            {invoices.length} fakturor totalt
          </p>
        </div>
        <Link
          href="/invoices/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ny faktura
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Betalda</p>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              {countByStatus("paid")}
            </span>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {formatCurrency(paidAmount)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Väntande</p>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              {countByStatus("sent") + countByStatus("draft")}
            </span>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {formatCurrency(pendingAmount)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Förfallna</p>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
              {countByStatus("overdue")}
            </span>
          </div>
          <p className="text-2xl font-bold text-red-600 mt-2">
            {formatCurrency(overdueAmount)}
          </p>
        </div>
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
                Fakturanr
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Kund
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Belopp
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Utfärdad
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Förfaller
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Status
              </th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Åtgärder
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-indigo-600">
                  {invoice.number}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {invoice.customer.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {invoice.customer.company}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {formatCurrency(invoice.total)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(invoice.issuedAt)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(invoice.dueDate)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      invoiceStatusColors[invoice.status]
                    )}
                  >
                    {invoiceStatusLabels[invoice.status]}
                  </span>
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
