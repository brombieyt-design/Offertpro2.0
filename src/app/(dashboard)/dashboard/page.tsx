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
  Send,
  Eye,
  TrendingUp,
  Banknote,
  Activity,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
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

/* ── skeleton ──────────────────────────────────── */

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-gray-100 ${className}`} />;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-14 w-72" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[120px]" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Skeleton className="lg:col-span-3 h-[420px]" />
        <Skeleton className="lg:col-span-2 h-[420px]" />
      </div>
    </div>
  );
}

/* ── page ──────────────────────────────────────── */

export default function DashboardPage() {
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

  /* derived metrics */
  const accepted = quotes.filter((q) => q.status === "accepted");
  const activeQuotes = quotes.filter(
    (q) => q.status === "sent" || q.status === "opened",
  );
  const totalQuoteValue = quotes.reduce((s, q) => s + q.total, 0);
  const paidTotal = invoices
    .filter((i) => i.status === "paid")
    .reduce((s, i) => s + i.total, 0);
  const pendingTotal = invoices
    .filter((i) => i.status === "sent")
    .reduce((s, i) => s + i.total, 0);
  const overdueTotal = invoices
    .filter((i) => i.status === "overdue")
    .reduce((s, i) => s + i.total, 0);
  const overdue = invoices.filter((i) => i.status === "overdue");
  const winRate = pct(accepted.length, quotes.length);

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
  };

  /* pipeline segments (for stacked bar) */
  const barTotal = paidTotal + pendingTotal + overdueTotal || 1;
  const segments = [
    { key: "paid", label: "Betalt", value: paidTotal, bg: "bg-success-500" },
    { key: "pending", label: "Väntar", value: pendingTotal, bg: "bg-brand-400" },
    { key: "overdue", label: "Förfallet", value: overdueTotal, bg: "bg-danger-500" },
  ];

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
            })}
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

      {/* ── overdue alert ──────────────────────── */}
      {overdue.length > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-danger-200 bg-danger-50 px-4 py-3">
          <AlertTriangle className="w-4 h-4 text-danger-600 shrink-0" />
          <p className="flex-1 text-[13px] text-danger-700">
            <span className="font-medium">
              {overdue.length} förfallen{overdue.length > 1 ? "a" : ""} faktur
              {overdue.length > 1 ? "or" : "a"}
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

      {/* ── KPI row ────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* revenue */}
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-gray-500 mb-3">
            <Banknote className="w-4 h-4" />
            <span className="text-[13px] font-medium">Intäkter</span>
          </div>
          <p className="text-2xl font-semibold tabular-nums text-gray-900 tracking-tight">
            {formatCurrency(paidTotal)}
          </p>
          <p className="text-[12px] text-gray-400 mt-1">Betalda fakturor</p>
        </div>

        {/* pipeline */}
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-gray-500 mb-3">
            <Activity className="w-4 h-4" />
            <span className="text-[13px] font-medium">Pipeline</span>
          </div>
          <p className="text-2xl font-semibold tabular-nums text-gray-900 tracking-tight">
            {formatCurrency(totalQuoteValue)}
          </p>
          <p className="text-[12px] text-gray-400 mt-1">
            {quotes.length} offert{quotes.length !== 1 ? "er" : ""}
          </p>
        </div>

        {/* win rate */}
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-gray-500 mb-3">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[13px] font-medium">Vinstfrekvens</span>
          </div>
          <p className="text-2xl font-semibold tabular-nums text-gray-900 tracking-tight">
            {winRate}
            <span className="text-base font-normal text-gray-400">%</span>
          </p>
          <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-success-500 transition-all duration-500"
              style={{ width: `${Math.max(winRate, 2)}%` }}
            />
          </div>
        </div>

        {/* active */}
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-gray-500 mb-3">
            <Clock className="w-4 h-4" />
            <span className="text-[13px] font-medium">Aktiva offerter</span>
          </div>
          <p className="text-2xl font-semibold tabular-nums text-gray-900 tracking-tight">
            {activeQuotes.length}
          </p>
          <p className="text-[12px] text-gray-400 mt-1">
            {formatCurrency(
              activeQuotes.reduce((s, q) => s + q.total, 0),
            )}{" "}
            värde
          </p>
        </div>
      </div>

      {/* ── revenue bar ────────────────────────── */}
      <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-medium text-gray-700">
            Fakturastatus
          </span>
          <span className="text-[12px] text-gray-400 tabular-nums">
            {formatCurrency(paidTotal + pendingTotal + overdueTotal)}
          </span>
        </div>
        <div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
          {segments.map(
            (s) =>
              s.value > 0 && (
                <div
                  key={s.key}
                  className={`${s.bg} transition-all duration-500`}
                  style={{
                    width: `${Math.max((s.value / barTotal) * 100, 1)}%`,
                  }}
                />
              ),
          )}
        </div>
        <div className="flex gap-5 mt-2.5">
          {segments.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <span className={`inline-block w-2 h-2 rounded-full ${s.bg}`} />
              <span className="text-[12px] text-gray-500">{s.label}</span>
              <span className="text-[12px] font-medium text-gray-700 tabular-nums">
                {formatCurrency(s.value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── main grid: feed + customers ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* activity feed */}
        <section className="lg:col-span-3 rounded-lg border border-gray-200 bg-white shadow-xs">
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

          <ul className="divide-y divide-gray-50">
            {feed.slice(0, 7).map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-gray-50/60 transition-colors"
              >
                {/* status dot */}
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${statusDot[item.status] ?? "bg-gray-300"}`}
                />
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
                    {item.name} &middot; {formatDate(item.date)}
                  </p>
                </div>
                {/* amount */}
                <span className="text-[13px] font-medium tabular-nums text-gray-900 shrink-0">
                  {formatCurrency(item.amount)}
                </span>
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
                  Skapa din första offert
                </Link>
              </li>
            )}
          </ul>
        </section>

        {/* customers */}
        <section className="lg:col-span-2 rounded-lg border border-gray-200 bg-white shadow-xs flex flex-col">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
            <h2 className="text-[13px] font-semibold text-gray-900">Kunder</h2>
            <Link
              href="/clients"
              className="text-[12px] font-medium text-gray-400 hover:text-gray-700 transition-colors"
            >
              Visa alla
            </Link>
          </div>

          <ul className="flex-1 divide-y divide-gray-50">
            {customers.slice(0, 5).map((c) => {
              const cQuotes = quotes.filter((q) => q.customer.id === c.id);
              const cTotal = cQuotes.reduce((s, q) => s + q.total, 0);
              const initials = c.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2);
              return (
                <li
                  key={c.id}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/60 transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-[11px] font-semibold text-brand-600 shrink-0 uppercase">
                    {initials}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-gray-900 truncate">
                      {c.name}
                    </p>
                    <p className="text-[12px] text-gray-400 truncate">
                      {c.company || c.email}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[13px] font-medium tabular-nums text-gray-900">
                      {formatCurrency(cTotal)}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {cQuotes.length} offert{cQuotes.length !== 1 ? "er" : ""}
                    </p>
                  </div>
                </li>
              );
            })}
            {customers.length === 0 && (
              <li className="px-5 py-14 text-center">
                <Users className="w-6 h-6 text-gray-200 mx-auto mb-2" />
                <p className="text-[13px] text-gray-400">Inga kunder ännu</p>
              </li>
            )}
          </ul>

          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[12px] text-gray-400">Totalt</span>
            <span className="text-[12px] font-semibold text-gray-700 tabular-nums">
              {customers.length} kunder
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
