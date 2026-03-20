"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Receipt,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  DollarSign,
  BarChart3,
  Target,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { quoteStatusLabels, quoteStatusColors } from "@/lib/constants";
import type { Quote, Invoice, Customer } from "@/types";

export default function DashboardPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/quotes").then((r) => r.json()),
      fetch("/api/invoices").then((r) => r.json()),
      fetch("/api/customers").then((r) => r.json()),
    ]).then(([q, inv, c]) => {
      setQuotes(q);
      setInvoices(inv);
      setCustomers(c);
      setLoading(false);
    });
  }, []);

  const openedQuotes = quotes.filter((q) => q.status === "opened");
  const acceptedQuotes = quotes.filter((q) => q.status === "accepted");
  const totalQuoteValue = quotes.reduce((sum, q) => sum + q.total, 0);
  const paidInvoiceTotal = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.total, 0);
  const pendingInvoiceTotal = invoices
    .filter((i) => i.status === "sent" || i.status === "overdue")
    .reduce((sum, i) => sum + i.total, 0);
  const avgQuoteValue =
    quotes.length > 0 ? Math.round(totalQuoteValue / quotes.length) : 0;
  const winRate =
    quotes.length > 0
      ? Math.round((acceptedQuotes.length / quotes.length) * 100)
      : 0;
  const uniqueCustomers = new Set(quotes.map((q) => q.customer.id)).size;

  const stats = [
    { label: "Totalt offerter", value: quotes.length.toString(), icon: FileText, color: "text-indigo-600 bg-indigo-50", accent: "border-l-indigo-500" },
    { label: "Öppna offerter", value: openedQuotes.length.toString(), icon: Clock, color: "text-amber-600 bg-amber-50", accent: "border-l-amber-500" },
    { label: "Accepterade", value: acceptedQuotes.length.toString(), icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50", accent: "border-l-emerald-500" },
    { label: "Totalt offertvärde", value: formatCurrency(totalQuoteValue), icon: DollarSign, color: "text-indigo-600 bg-indigo-50", accent: "border-l-indigo-500" },
    { label: "Betalda fakturor", value: formatCurrency(paidInvoiceTotal), icon: Receipt, color: "text-emerald-600 bg-emerald-50", accent: "border-l-emerald-500" },
    { label: "Väntande fakturor", value: formatCurrency(pendingInvoiceTotal), icon: TrendingUp, color: "text-orange-600 bg-orange-50", accent: "border-l-orange-500" },
    { label: "Genomsnittligt offertvärde", value: formatCurrency(avgQuoteValue), icon: BarChart3, color: "text-blue-600 bg-blue-50", accent: "border-l-blue-500" },
    { label: "Vinstfrekvens", value: `${winRate}%`, icon: Target, color: "text-emerald-600 bg-emerald-50", accent: "border-l-emerald-500" },
    { label: "Unika kunder", value: uniqueCustomers.toString(), icon: Users, color: "text-purple-600 bg-purple-50", accent: "border-l-purple-500" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-sm text-gray-400">Laddar dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Översikt
        </h1>
        <div className="flex items-center gap-3">
          <Link
            href="/quotes/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <FileText className="w-4 h-4" />
            Ny offert
          </Link>
          <Link
            href="/invoices/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200/80 rounded-full hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Receipt className="w-4 h-4" />
            Ny faktura
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`bg-white rounded-2xl border border-gray-100/60 shadow-sm hover:shadow-md p-7 border-l-4 ${stat.accent} transition-all duration-300`}
            >
              <div className="flex items-center gap-3.5 mb-5">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-500">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold tracking-tight text-gray-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent quotes */}
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm">
          <div className="px-7 py-6 border-b border-gray-100/60 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight text-gray-900">
              Senaste offerter
            </h2>
            <Link href="/quotes" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
              Visa alla
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {quotes.slice(0, 5).map((quote) => (
              <div
                key={quote.id}
                className="px-7 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-all duration-300"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {quote.number}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {quote.customer.name} &middot; {formatDate(quote.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3.5 ml-4">
                  <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(quote.total)}
                  </span>
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${quoteStatusColors[quote.status] || ""}`}
                  >
                    {quoteStatusLabels[quote.status] || quote.status}
                  </span>
                </div>
              </div>
            ))}
            {quotes.length === 0 && (
              <div className="px-7 py-12 text-center text-sm text-gray-400">
                Inga offerter ännu.{" "}
                <Link href="/quotes/new" className="text-indigo-600 hover:underline">
                  Skapa din första
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent invoices */}
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm">
          <div className="px-7 py-6 border-b border-gray-100/60 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight text-gray-900">
              Senaste fakturor
            </h2>
            <Link href="/invoices" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
              Visa alla
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {invoices.slice(0, 5).map((invoice) => (
              <div
                key={invoice.id}
                className="px-7 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-all duration-300"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {invoice.number}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {invoice.customer.name} &middot; {formatDate(invoice.issuedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3.5 ml-4">
                  <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(invoice.total)}
                  </span>
                </div>
              </div>
            ))}
            {invoices.length === 0 && (
              <div className="px-7 py-12 text-center text-sm text-gray-400">
                Inga fakturor ännu.{" "}
                <Link href="/invoices/new" className="text-indigo-600 hover:underline">
                  Skapa din första
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
