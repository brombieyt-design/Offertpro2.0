"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Receipt,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  Eye,
  TrendingUp,
  Banknote,
  Activity,
  CalendarClock,
  CircleDollarSign,
  Target,
  BarChart3,
  ChevronRight,
  Percent,
  Zap,
  FileCheck,
  FileClock,
  FileX,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useSettings } from "@/lib/settings-context";
import {
  quoteStatusLabels,
  quoteStatusColors,
  invoiceStatusLabels,
  invoiceStatusColors,
} from "@/lib/constants";
import type { Quote, Invoice, Customer } from "@/types";

/* ── helpers ───────────────────────────────────── */

function greeting(): string {
  const h = new Date().getHours();
  if (h < 5) return "God natt";
  if (h < 10) return "God morgon";
  if (h < 13) return "God förmiddag";
  if (h < 18) return "God eftermiddag";
  return "God kväll";
}

function pct(part: number, whole: number) {
  return whole > 0 ? Math.round((part / whole) * 100) : 0;
}

function daysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function daysAgo(dateStr: string): string {
  const days = Math.abs(daysUntil(dateStr));
  if (days === 0) return "Idag";
  if (days === 1) return "Igår";
  if (days < 7) return `${days} dagar sedan`;
  if (days < 30) return `${Math.floor(days / 7)} veckor sedan`;
  return formatDate(dateStr);
}

/* ── skeleton ──────────────────────────────────── */

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-gray-100 ${className}`} />;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-16 w-80" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[130px]" />
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[90px]" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Skeleton className="lg:col-span-2 h-[440px]" />
        <Skeleton className="h-[440px]" />
      </div>
    </div>
  );
}

/* ── mini donut for quote status ──────────────── */

function StatusDonut({
  segments,
}: {
  segments: { value: number; color: string }[];
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const size = 56;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#f3f4f6"
        strokeWidth={stroke}
      />
      {segments
        .filter((s) => s.value > 0)
        .map((seg, i) => {
          const pctVal = seg.value / total;
          const dash = pctVal * circumference;
          const gap = circumference - dash;
          const currentOffset = offset;
          offset += dash;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-currentOffset}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          );
        })}
    </svg>
  );
}

/* ── page ──────────────────────────────────────── */

export default function DashboardPage() {
  const { formatMoney: formatCurrency } = useSettings();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/quotes").then((r) => (r.ok ? r.json() : [])),
      fetch("/api/invoices").then((r) => (r.ok ? r.json() : [])),
      fetch("/api/customers").then((r) => (r.ok ? r.json() : [])),
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

  /* ── derived metrics ─────────────────────────── */
  const accepted = quotes.filter((q) => q.status === "accepted");
  const rejected = quotes.filter((q) => q.status === "rejected");
  const drafts = quotes.filter((q) => q.status === "draft");
  const activeQuotes = quotes.filter(
    (q) => q.status === "sent" || q.status === "opened",
  );
  const totalQuoteValue = quotes.reduce((s, q) => s + q.total, 0);
  const paidInvoices = invoices.filter((i) => i.status === "paid");
  const paidTotal = paidInvoices.reduce((s, i) => s + i.total, 0);
  const pendingInvoices = invoices.filter((i) => i.status === "sent");
  const pendingTotal = pendingInvoices.reduce((s, i) => s + i.total, 0);
  const overdueInvoices = invoices.filter((i) => i.status === "overdue");
  const overdueTotal = overdueInvoices.reduce((s, i) => s + i.total, 0);
  const winRate = pct(accepted.length, quotes.length);
  const avgQuoteValue =
    quotes.length > 0
      ? Math.round(quotes.reduce((s, q) => s + q.total, 0) / quotes.length)
      : 0;

  /* expiring quotes (within 7 days) */
  const expiringQuotes = quotes
    .filter(
      (q) =>
        (q.status === "sent" || q.status === "opened") &&
        daysUntil(q.validUntil) >= 0 &&
        daysUntil(q.validUntil) <= 7,
    )
    .sort(
      (a, b) =>
        new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime(),
    );

  /* quote status breakdown */
  const quoteStatuses = [
    { label: "Utkast", count: drafts.length, color: "#9ca3af", icon: FileText },
    {
      label: "Skickade",
      count: activeQuotes.length,
      color: "#6366f1",
      icon: Send,
    },
    {
      label: "Accepterade",
      count: accepted.length,
      color: "#10b981",
      icon: FileCheck,
    },
    {
      label: "Avvisade",
      count: rejected.length,
      color: "#ef4444",
      icon: FileX,
    },
  ];

  /* pipeline segments (for stacked bar) */
  const barTotal = paidTotal + pendingTotal + overdueTotal || 1;
  const segments = [
    { key: "paid", label: "Betalt", value: paidTotal, bg: "bg-success-500", hex: "#10b981" },
    { key: "pending", label: "Väntar", value: pendingTotal, bg: "bg-brand-400", hex: "#818cf8" },
    { key: "overdue", label: "Förfallet", value: overdueTotal, bg: "bg-danger-500", hex: "#ef4444" },
  ];

  /* activity feed – merged & sorted by date desc */
  const feed = [
    ...quotes.map((q) => ({
      id: q.id,
      kind: "quote" as const,
      number: q.number,
      name: q.customer.company || q.customer.name,
      date: q.createdAt,
      amount: q.total,
      status: q.status,
      label: quoteStatusLabels[q.status] ?? q.status,
      color: quoteStatusColors[q.status] ?? "",
      href: `/quotes/${q.id}`,
    })),
    ...invoices.map((i) => ({
      id: i.id,
      kind: "invoice" as const,
      number: i.number,
      name: i.customer.company || i.customer.name,
      date: i.issuedAt,
      amount: i.total,
      status: i.status,
      label: invoiceStatusLabels[i.status] ?? i.status,
      color: invoiceStatusColors[i.status] ?? "",
      href: `/invoices/${i.id}`,
    })),
  ].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const statusDot: Record<string, string> = {
    accepted: "bg-success-500",
    paid: "bg-success-500",
    sent: "bg-brand-500",
    opened: "bg-warning-500",
    overdue: "bg-danger-500",
    draft: "bg-gray-300",
    rejected: "bg-danger-500",
    partially_paid: "bg-warning-500",
  };

  /* top customers by total value */
  const topCustomers = customers
    .map((c) => {
      const cQuotes = quotes.filter((q) => q.customer.id === c.id);
      const cInvoices = invoices.filter((i) => i.customer.id === c.id);
      const quoteTotal = cQuotes.reduce((s, q) => s + q.total, 0);
      const invoiceTotal = cInvoices.reduce((s, i) => s + i.total, 0);
      return { ...c, quoteCount: cQuotes.length, invoiceCount: cInvoices.length, quoteTotal, invoiceTotal, total: quoteTotal + invoiceTotal };
    })
    .sort((a, b) => b.total - a.total);

  return (
    <div className="space-y-6">
      {/* ── header ─────────────────────────────── */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            {greeting()}
          </h1>
          <p className="text-[13px] text-gray-500">
            {new Date().toLocaleDateString("sv-SE", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            {" — "}
            <span className="text-gray-400">
              {quotes.length} offerter, {invoices.length} fakturor, {customers.length} kunder
            </span>
          </p>
        </div>
        <div className="flex gap-2 mt-3 sm:mt-0">
          <Link
            href="/quotes/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-[13px] font-medium text-white shadow-xs hover:bg-brand-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Ny offert
          </Link>
          <Link
            href="/invoices/new"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-[13px] font-medium text-gray-700 shadow-xs hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Ny faktura
          </Link>
        </div>
      </div>

      {/* ── alerts ───────────────────────────────── */}
      {overdueInvoices.length > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-danger-200 bg-danger-50 px-4 py-3">
          <AlertTriangle className="w-4 h-4 text-danger-600 shrink-0" />
          <p className="flex-1 text-[13px] text-danger-700">
            <span className="font-medium">
              {overdueInvoices.length} förfallen{overdueInvoices.length > 1 ? "a" : ""} faktur
              {overdueInvoices.length > 1 ? "or" : "a"}
            </span>{" "}
            &mdash; {formatCurrency(overdueTotal)} att hantera
          </p>
          <Link
            href="/invoices"
            className="text-[13px] font-medium text-danger-700 hover:text-danger-600 whitespace-nowrap"
          >
            Visa&nbsp;&rarr;
          </Link>
        </div>
      )}

      {expiringQuotes.length > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-warning-200 bg-warning-50 px-4 py-3">
          <CalendarClock className="w-4 h-4 text-warning-600 shrink-0" />
          <p className="flex-1 text-[13px] text-warning-700">
            <span className="font-medium">
              {expiringQuotes.length} offert{expiringQuotes.length > 1 ? "er" : ""} går ut inom 7 dagar
            </span>{" "}
            &mdash; {formatCurrency(expiringQuotes.reduce((s, q) => s + q.total, 0))} i pipeline
          </p>
          <Link
            href="/quotes"
            className="text-[13px] font-medium text-warning-700 hover:text-warning-600 whitespace-nowrap"
          >
            Visa&nbsp;&rarr;
          </Link>
        </div>
      )}

      {/* ── KPI row (primary) ────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* revenue */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs relative overflow-hidden group hover:border-success-200 transition-colors">
          <div className="absolute top-0 right-0 w-20 h-20 bg-success-50 rounded-bl-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center gap-2 text-gray-500 mb-3">
              <div className="w-8 h-8 rounded-lg bg-success-50 flex items-center justify-center">
                <Banknote className="w-4 h-4 text-success-600" />
              </div>
              <span className="text-[13px] font-medium">Intäkter</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums text-gray-900 tracking-tight">
              {formatCurrency(paidTotal)}
            </p>
            <p className="text-[12px] text-gray-400 mt-1">
              {paidInvoices.length} betalda fakturor
            </p>
          </div>
        </div>

        {/* pipeline */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs relative overflow-hidden group hover:border-brand-200 transition-colors">
          <div className="absolute top-0 right-0 w-20 h-20 bg-brand-50 rounded-bl-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center gap-2 text-gray-500 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                <Activity className="w-4 h-4 text-brand-600" />
              </div>
              <span className="text-[13px] font-medium">Pipeline</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums text-gray-900 tracking-tight">
              {formatCurrency(totalQuoteValue)}
            </p>
            <p className="text-[12px] text-gray-400 mt-1">
              {activeQuotes.length} aktiva av {quotes.length} offerter
            </p>
          </div>
        </div>

        {/* win rate */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs relative overflow-hidden group hover:border-indigo-200 transition-colors">
          <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50 rounded-bl-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center gap-2 text-gray-500 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Target className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-[13px] font-medium">Vinstfrekvens</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums text-gray-900 tracking-tight">
              {winRate}
              <span className="text-base font-normal text-gray-400">%</span>
            </p>
            <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                style={{ width: `${Math.max(winRate, 2)}%` }}
              />
            </div>
          </div>
        </div>

        {/* pending payments */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs relative overflow-hidden group hover:border-warning-200 transition-colors">
          <div className="absolute top-0 right-0 w-20 h-20 bg-warning-50 rounded-bl-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center gap-2 text-gray-500 mb-3">
              <div className="w-8 h-8 rounded-lg bg-warning-50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-warning-600" />
              </div>
              <span className="text-[13px] font-medium">Väntar betalning</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums text-gray-900 tracking-tight">
              {formatCurrency(pendingTotal + overdueTotal)}
            </p>
            <p className="text-[12px] text-gray-400 mt-1">
              {pendingInvoices.length + overdueInvoices.length} fakturor utestående
            </p>
          </div>
        </div>
      </div>

      {/* ── secondary stats row ──────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-xs">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Snitt offert</p>
          <p className="text-lg font-semibold tabular-nums text-gray-900 mt-0.5">{formatCurrency(avgQuoteValue)}</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-xs">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Aktiva offerter</p>
          <p className="text-lg font-semibold tabular-nums text-gray-900 mt-0.5">
            {activeQuotes.length}
            <span className="text-[13px] font-normal text-gray-400 ml-1">
              ({formatCurrency(activeQuotes.reduce((s, q) => s + q.total, 0))})
            </span>
          </p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-xs">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Totalt fakturerat</p>
          <p className="text-lg font-semibold tabular-nums text-gray-900 mt-0.5">{formatCurrency(invoices.reduce((s, i) => s + i.total, 0))}</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-xs">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Kunder</p>
          <p className="text-lg font-semibold tabular-nums text-gray-900 mt-0.5">
            {customers.length}
            <span className="text-[13px] font-normal text-gray-400 ml-1">registrerade</span>
          </p>
        </div>
      </div>

      {/* ── quote status + invoice bar ───────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* quote status breakdown */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[13px] font-semibold text-gray-900">Offertstatus</h2>
            <Link href="/quotes" className="text-[12px] text-brand-600 hover:text-brand-700 font-medium transition-colors">
              Alla offerter &rarr;
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <StatusDonut
              segments={quoteStatuses.map((s) => ({
                value: s.count,
                color: s.color,
              }))}
            />
            <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-3">
              {quoteStatuses.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                    <div className="min-w-0">
                      <p className="text-[12px] text-gray-500">{s.label}</p>
                      <p className="text-[15px] font-semibold tabular-nums text-gray-900">
                        {s.count}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* invoice status bar */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[13px] font-semibold text-gray-900">Fakturastatus</h2>
            <Link href="/invoices" className="text-[12px] text-brand-600 hover:text-brand-700 font-medium transition-colors">
              Alla fakturor &rarr;
            </Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-semibold tabular-nums text-gray-900">
                {formatCurrency(paidTotal + pendingTotal + overdueTotal)}
              </span>
              <span className="text-[12px] text-gray-400">
                {invoices.length} fakturor totalt
              </span>
            </div>
            <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
              {segments.map(
                (s) =>
                  s.value > 0 && (
                    <div
                      key={s.key}
                      className={`${s.bg} transition-all duration-500 first:rounded-l-full last:rounded-r-full`}
                      style={{
                        width: `${Math.max((s.value / barTotal) * 100, 2)}%`,
                      }}
                    />
                  ),
              )}
            </div>
            <div className="flex gap-5">
              {segments.map((s) => (
                <div key={s.key} className="flex items-center gap-1.5">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${s.bg}`} />
                  <div>
                    <span className="text-[12px] text-gray-500">{s.label}</span>
                    <p className="text-[13px] font-semibold text-gray-700 tabular-nums">
                      {formatCurrency(s.value)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── main grid: feed + customers + deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* activity feed */}
        <section className="lg:col-span-2 rounded-xl border border-gray-200 bg-white shadow-xs flex flex-col">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
            <h2 className="text-[13px] font-semibold text-gray-900">
              Senaste aktivitet
            </h2>
            <div className="flex gap-3 text-[12px]">
              <Link
                href="/quotes"
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                Offerter
              </Link>
              <Link
                href="/invoices"
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                Fakturor
              </Link>
            </div>
          </div>

          <ul className="flex-1 divide-y divide-gray-50">
            {feed.slice(0, 8).map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3.5 px-5 py-3 hover:bg-gray-50/60 transition-colors"
                >
                  {/* icon */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    item.kind === "quote" ? "bg-brand-50" : "bg-success-50"
                  }`}>
                    {item.kind === "quote" ? (
                      <FileText className="w-3.5 h-3.5 text-brand-600" />
                    ) : (
                      <Receipt className="w-3.5 h-3.5 text-success-600" />
                    )}
                  </div>
                  {/* text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-medium text-gray-900">
                        {item.number}
                      </span>
                      <span
                        className={`inline-flex px-1.5 py-px text-[11px] font-medium rounded ${item.color}`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <p className="text-[12px] text-gray-400 truncate mt-0.5">
                      {item.name} &middot; {daysAgo(item.date)}
                    </p>
                  </div>
                  {/* amount */}
                  <span className="text-[13px] font-medium tabular-nums text-gray-900 shrink-0">
                    {formatCurrency(item.amount)}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                </Link>
              </li>
            ))}
            {feed.length === 0 && (
              <li className="px-5 py-14 text-center">
                <FileText className="w-6 h-6 text-gray-200 mx-auto mb-2" />
                <p className="text-[13px] text-gray-400">
                  Ingen aktivitet ännu
                </p>
                <Link
                  href="/quotes/new"
                  className="text-[13px] text-brand-600 hover:underline mt-1 inline-block"
                >
                  Skapa din första offert &rarr;
                </Link>
              </li>
            )}
          </ul>

          {feed.length > 8 && (
            <div className="px-5 py-3 border-t border-gray-100 text-center">
              <Link href="/quotes" className="text-[12px] text-brand-600 hover:text-brand-700 font-medium">
                Visa alla {feed.length} aktiviteter &rarr;
              </Link>
            </div>
          )}
        </section>

        {/* right column: customers */}
        <div className="space-y-4">
          {/* top customers */}
          <section className="rounded-xl border border-gray-200 bg-white shadow-xs flex flex-col">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
              <h2 className="text-[13px] font-semibold text-gray-900">Toppkunder</h2>
              <Link
                href="/clients"
                className="text-[12px] font-medium text-brand-600 hover:text-brand-700 transition-colors"
              >
                Alla &rarr;
              </Link>
            </div>

            <ul className="flex-1 divide-y divide-gray-50">
              {topCustomers.slice(0, 5).map((c, idx) => {
                const initials = c.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2);
                const colors = [
                  "bg-brand-50 text-brand-600",
                  "bg-success-50 text-success-600",
                  "bg-indigo-50 text-indigo-600",
                  "bg-warning-50 text-warning-600",
                  "bg-pink-50 text-pink-600",
                ];
                return (
                  <li
                    key={c.id}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/60 transition-colors"
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 uppercase ${colors[idx % colors.length]}`}>
                      {initials}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-gray-900 truncate">
                        {c.name}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate">
                        {c.company || c.email}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[13px] font-medium tabular-nums text-gray-900">
                        {formatCurrency(c.total)}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {c.quoteCount} offert{c.quoteCount !== 1 ? "er" : ""}
                        {c.invoiceCount > 0 && ` · ${c.invoiceCount} fakt.`}
                      </p>
                    </div>
                  </li>
                );
              })}
              {customers.length === 0 && (
                <li className="px-5 py-10 text-center">
                  <Users className="w-6 h-6 text-gray-200 mx-auto mb-2" />
                  <p className="text-[13px] text-gray-400">Inga kunder ännu</p>
                </li>
              )}
            </ul>
          </section>

          {/* quick nav cards */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/quotes"
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs hover:border-brand-200 hover:bg-brand-50/30 transition-all group"
            >
              <FileText className="w-5 h-5 text-brand-500 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-[13px] font-medium text-gray-900">Offerter</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{quotes.length} totalt</p>
            </Link>
            <Link
              href="/invoices"
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs hover:border-success-200 hover:bg-success-50/30 transition-all group"
            >
              <Receipt className="w-5 h-5 text-success-500 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-[13px] font-medium text-gray-900">Fakturor</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{invoices.length} totalt</p>
            </Link>
            <Link
              href="/clients"
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
            >
              <Users className="w-5 h-5 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-[13px] font-medium text-gray-900">Kunder</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{customers.length} totalt</p>
            </Link>
            <Link
              href="/analytics"
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs hover:border-pink-200 hover:bg-pink-50/30 transition-all group"
            >
              <BarChart3 className="w-5 h-5 text-pink-500 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-[13px] font-medium text-gray-900">Analys</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Rapporter</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
