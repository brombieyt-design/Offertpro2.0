"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Receipt,
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  CircleDollarSign,
  PieChart,
  Send,
  Eye,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { quoteStatusLabels, quoteStatusColors, invoiceStatusLabels, invoiceStatusColors } from "@/lib/constants";
import type { Quote, Invoice, Customer } from "@/types";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return "God natt";
  if (hour < 10) return "God morgon";
  if (hour < 13) return "God förmiddag";
  if (hour < 18) return "God eftermiddag";
  return "God kväll";
}

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-xl bg-gray-100 ${className}`} />
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-16 w-80" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-36 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-28 rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-80 rounded-2xl" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/quotes").then((r) => r.ok ? r.json() : []),
      fetch("/api/invoices").then((r) => r.ok ? r.json() : []),
      fetch("/api/customers").then((r) => r.ok ? r.json() : []),
    ])
      .then(([q, inv, c]) => {
        setQuotes(Array.isArray(q) ? q : []);
        setInvoices(Array.isArray(inv) ? inv : []);
        setCustomers(Array.isArray(c) ? c : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardSkeleton />;

  // -- Derived data --
  const acceptedQuotes = quotes.filter((q) => q.status === "accepted");
  const openQuotes = quotes.filter((q) => q.status === "sent" || q.status === "opened");
  const totalQuoteValue = quotes.reduce((sum, q) => sum + q.total, 0);
  const paidTotal = invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.total, 0);
  const pendingTotal = invoices.filter((i) => i.status === "sent" || i.status === "overdue").reduce((sum, i) => sum + i.total, 0);
  const overdueInvoices = invoices.filter((i) => i.status === "overdue");
  const winRate = quotes.length > 0 ? Math.round((acceptedQuotes.length / quotes.length) * 100) : 0;

  // Pipeline data
  const pipelineTotal = totalQuoteValue || 1;
  const pipelineSegments = [
    { label: "Betalt", value: paidTotal, color: "bg-emerald-500", textColor: "text-emerald-700" },
    { label: "Väntar", value: pendingTotal, color: "bg-amber-400", textColor: "text-amber-700" },
    { label: "Förfallet", value: overdueInvoices.reduce((s, i) => s + i.total, 0), color: "bg-red-400", textColor: "text-red-700" },
  ];

  // Activity feed: merge quotes + invoices, sorted by date
  const activities = [
    ...quotes.map((q) => ({
      id: q.id,
      type: "quote" as const,
      number: q.number,
      customer: q.customer.name,
      company: q.customer.company,
      date: q.createdAt,
      amount: q.total,
      status: q.status,
      statusLabel: quoteStatusLabels[q.status] || q.status,
      statusColor: quoteStatusColors[q.status] || "",
    })),
    ...invoices.map((inv) => ({
      id: inv.id,
      type: "invoice" as const,
      number: inv.number,
      customer: inv.customer.name,
      company: inv.customer.company,
      date: inv.issuedAt,
      amount: inv.total,
      status: inv.status,
      statusLabel: invoiceStatusLabels[inv.status] || inv.status,
      statusColor: invoiceStatusColors[inv.status] || "",
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const statusIcon = (status: string) => {
    switch (status) {
      case "accepted":
      case "paid":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "sent":
        return <Send className="w-4 h-4 text-blue-500" />;
      case "opened":
        return <Eye className="w-4 h-4 text-amber-500" />;
      case "overdue":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Greeting + Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {getGreeting()} <span className="inline-block animate-fade-in">&#128075;</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Här är en sammanfattning av ditt företag idag.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/quotes/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Ny offert
          </Link>
          <Link
            href="/invoices/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Ny faktura
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <CircleDollarSign className="w-5 h-5 opacity-80" />
              <span className="text-sm font-medium opacity-90">Intäkter</span>
            </div>
            <p className="text-2xl font-bold tracking-tight">{formatCurrency(paidTotal)}</p>
            <div className="flex items-center gap-1 mt-2 text-xs opacity-80">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Betalda fakturor</span>
            </div>
          </div>
        </div>

        {/* Pipeline Value */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <PieChart className="w-5 h-5 opacity-80" />
              <span className="text-sm font-medium opacity-90">Pipeline</span>
            </div>
            <p className="text-2xl font-bold tracking-tight">{formatCurrency(totalQuoteValue)}</p>
            <div className="flex items-center gap-1 mt-2 text-xs opacity-80">
              <FileText className="w-3.5 h-3.5" />
              <span>{quotes.length} offerter totalt</span>
            </div>
          </div>
        </div>

        {/* Win Rate */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-amber-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Vinstfrekvens</span>
            </div>
          </div>
          <p className="text-2xl font-bold tracking-tight text-gray-900">{winRate}%</p>
          {/* Mini bar */}
          <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-700"
              style={{ width: `${winRate}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">{acceptedQuotes.length} av {quotes.length} accepterade</p>
        </div>

        {/* Open Quotes */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <Clock className="w-4.5 h-4.5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Aktiva</span>
            </div>
          </div>
          <p className="text-2xl font-bold tracking-tight text-gray-900">{openQuotes.length}</p>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs text-gray-400">{formatCurrency(openQuotes.reduce((s, q) => s + q.total, 0))} i pipeline</span>
          </div>
          {openQuotes.length > 0 && (
            <Link href="/quotes" className="inline-flex items-center gap-1 text-xs text-indigo-600 mt-2 hover:text-indigo-700">
              Visa <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Overdue alert */}
      {overdueInvoices.length > 0 && (
        <div className="flex items-center gap-4 bg-red-50 border border-red-100 rounded-2xl px-6 py-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-red-900">
              {overdueInvoices.length} förfallen{overdueInvoices.length > 1 ? "a" : ""} faktur{overdueInvoices.length > 1 ? "or" : "a"}
            </p>
            <p className="text-xs text-red-600 mt-0.5">
              {formatCurrency(overdueInvoices.reduce((s, i) => s + i.total, 0))} totalt förfallet
            </p>
          </div>
          <Link
            href="/invoices"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-red-700 bg-white border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
          >
            Hantera
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Revenue Pipeline Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900">Intäktspipeline</h2>
          <span className="text-xs text-gray-400">Totalt: {formatCurrency(pipelineSegments.reduce((s, seg) => s + seg.value, 0))}</span>
        </div>
        {/* Bar */}
        <div className="flex h-4 rounded-full overflow-hidden bg-gray-100 gap-0.5">
          {pipelineSegments.map((seg) =>
            seg.value > 0 ? (
              <div
                key={seg.label}
                className={`${seg.color} transition-all duration-700 first:rounded-l-full last:rounded-r-full`}
                style={{ width: `${Math.max((seg.value / pipelineTotal) * 100, 2)}%` }}
              />
            ) : null
          )}
        </div>
        {/* Legend */}
        <div className="flex items-center gap-6 mt-3">
          {pipelineSegments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${seg.color}`} />
              <span className="text-xs text-gray-500">{seg.label}</span>
              <span className={`text-xs font-semibold ${seg.textColor}`}>{formatCurrency(seg.value)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Activity Feed + Customer Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity feed - takes 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Senaste aktivitet</h2>
            <div className="flex items-center gap-2">
              <Link href="/quotes" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">
                Offerter
              </Link>
              <span className="text-gray-200">|</span>
              <Link href="/invoices" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">
                Fakturor
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {activities.slice(0, 8).map((item) => (
              <div key={item.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                {/* Icon */}
                <div className="shrink-0">
                  {statusIcon(item.status)}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{item.number}</span>
                    <span className={`inline-flex px-2 py-0.5 text-[11px] font-medium rounded-full ${item.statusColor}`}>
                      {item.statusLabel}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {item.customer}{item.company ? ` \u2022 ${item.company}` : ""} &middot; {formatDate(item.date)}
                  </p>
                </div>
                {/* Amount */}
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(item.amount)}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {item.type === "quote" ? "Offert" : "Faktura"}
                  </p>
                </div>
              </div>
            ))}
            {activities.length === 0 && (
              <div className="px-6 py-16 text-center">
                <FileText className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gray-400">Ingen aktivitet ännu</p>
                <Link href="/quotes/new" className="inline-flex items-center gap-1 text-xs text-indigo-600 mt-2 hover:text-indigo-700">
                  Skapa din första offert <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Customer sidebar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Kunder</h2>
            <Link href="/clients" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
              Alla
            </Link>
          </div>
          <div className="p-4 space-y-2">
            {customers.slice(0, 6).map((c) => {
              const customerQuotes = quotes.filter((q) => q.customer.id === c.id);
              const customerTotal = customerQuotes.reduce((s, q) => s + q.total, 0);
              const initials = c.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              return (
                <div
                  key={c.id}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                    <span className="text-xs font-semibold text-indigo-600">{initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                    <p className="text-xs text-gray-400 truncate">{c.company || c.email}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold text-gray-700">{formatCurrency(customerTotal)}</p>
                    <p className="text-[11px] text-gray-400">{customerQuotes.length} offert{customerQuotes.length !== 1 ? "er" : ""}</p>
                  </div>
                </div>
              );
            })}
            {customers.length === 0 && (
              <div className="py-10 text-center">
                <Users className="w-7 h-7 text-gray-200 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Inga kunder ännu</p>
              </div>
            )}
          </div>
          {/* Quick stats */}
          <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/50 rounded-b-2xl">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Totalt kunder</span>
              <span className="font-semibold text-gray-700">{customers.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick-access cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/quotes"
          className="group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200"
        >
          <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
            <FileText className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Offerter</p>
            <p className="text-xs text-gray-400">{quotes.length} totalt</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
        </Link>
        <Link
          href="/invoices"
          className="group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-200"
        >
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
            <Receipt className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Fakturor</p>
            <p className="text-xs text-gray-400">{invoices.length} totalt</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" />
        </Link>
        <Link
          href="/clients"
          className="group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-purple-100 transition-all duration-200"
        >
          <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Kunder</p>
            <p className="text-xs text-gray-400">{customers.length} totalt</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500 transition-colors" />
        </Link>
      </div>
    </div>
  );
}
