"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  FileText,
  Target,
  Send,
  RefreshCw,
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import type { Quote, Invoice } from "@/types";

const timeFilters = [
  { label: "3 månader", value: 3 },
  { label: "6 månader", value: 6 },
  { label: "12 månader", value: 12 },
];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

interface MonthlyData {
  month: string;
  revenue: number;
  sent: number;
  accepted: number;
}

interface StatusDist {
  status: string;
  count: number;
  color: string;
}

interface TopCustomer {
  name: string;
  quotes: number;
  winRate: number;
  total: number;
}

function computeAnalytics(quotes: Quote[], invoices: Invoice[]) {
  // Total revenue from paid invoices + accepted quotes
  const paidInvoices = invoices.filter((i) => i.status === "paid");
  const totalRevenue = paidInvoices.reduce((sum, i) => sum + i.total, 0) +
    invoices.filter((i) => i.status === "sent").reduce((sum, i) => sum + i.total, 0);

  const allQuotes = quotes.length;
  const acceptedQuotes = quotes.filter((q) => q.status === "accepted").length;
  const sentQuotes = quotes.filter((q) => q.status !== "draft").length;
  const winRate = sentQuotes > 0 ? Math.round((acceptedQuotes / sentQuotes) * 100) : 0;
  const avgQuoteValue = allQuotes > 0 ? Math.round(quotes.reduce((s, q) => s + q.total, 0) / allQuotes) : 0;

  // Monthly data (last 12 months)
  const now = new Date();
  const monthly: MonthlyData[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const monthLabel = monthNames[d.getMonth()];

    const monthInvoices = invoices.filter((inv) => inv.issuedAt.startsWith(monthKey));
    const monthQuotes = quotes.filter((q) => q.createdAt.startsWith(monthKey));

    monthly.push({
      month: monthLabel,
      revenue: monthInvoices.reduce((s, i) => s + i.total, 0),
      sent: monthQuotes.filter((q) => q.status !== "draft").length,
      accepted: monthQuotes.filter((q) => q.status === "accepted").length,
    });
  }

  // Status distribution
  const statusMap: Record<string, { label: string; color: string }> = {
    accepted: { label: "Accepterade", color: "bg-green-500" },
    rejected: { label: "Avböjda", color: "bg-red-500" },
    opened: { label: "Öppnade", color: "bg-yellow-500" },
    sent: { label: "Skickade", color: "bg-blue-500" },
    draft: { label: "Utkast", color: "bg-gray-400" },
  };

  const statusDist: StatusDist[] = Object.entries(statusMap)
    .map(([key, val]) => ({
      status: val.label,
      count: quotes.filter((q) => q.status === key).length,
      color: val.color,
    }))
    .filter((s) => s.count > 0);

  // Top customers
  const custMap = new Map<string, { name: string; total: number; quotes: number; accepted: number }>();
  for (const q of quotes) {
    const name = q.customer?.company || q.customer?.name || "Okänd";
    const entry = custMap.get(name) || { name, total: 0, quotes: 0, accepted: 0 };
    entry.total += q.total;
    entry.quotes += 1;
    if (q.status === "accepted") entry.accepted += 1;
    custMap.set(name, entry);
  }
  const topCustomers: TopCustomer[] = Array.from(custMap.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, 6)
    .map((c) => ({
      name: c.name,
      quotes: c.quotes,
      winRate: c.quotes > 0 ? Math.round((c.accepted / c.quotes) * 100) : 0,
      total: c.total,
    }));

  // Conversion funnel
  const created = quotes.length;
  const sentCount = quotes.filter((q) => q.status !== "draft").length;
  const openedCount = quotes.filter((q) => ["opened", "accepted", "rejected"].includes(q.status)).length;
  const acceptedCount = quotes.filter((q) => q.status === "accepted").length;

  const funnel = [
    { stage: "Skapade", count: created, percent: 100 },
    { stage: "Skickade", count: sentCount, percent: created > 0 ? Math.round((sentCount / created) * 100) : 0 },
    { stage: "Öppnade", count: openedCount, percent: created > 0 ? Math.round((openedCount / created) * 100) : 0 },
    { stage: "Accepterade", count: acceptedCount, percent: created > 0 ? Math.round((acceptedCount / created) * 100) : 0 },
  ];

  return { totalRevenue, avgQuoteValue, winRate, sentQuotes: sentCount, monthly, statusDist, topCustomers, funnel };
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState(12);
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  async function fetchData() {
    setLoading(true);
    try {
      const [qRes, iRes] = await Promise.all([
        fetch("/api/quotes"),
        fetch("/api/invoices"),
      ]);
      const qData = qRes.ok ? await qRes.json() : [];
      const iData = iRes.ok ? await iRes.json() : [];
      setQuotes(Array.isArray(qData) ? qData : []);
      setInvoices(Array.isArray(iData) ? iData : []);
    } catch {
      setQuotes([]);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const data = computeAnalytics(quotes, invoices);
  const visibleMonths = data.monthly.slice(-timeRange);
  const maxRevenue = Math.max(...visibleMonths.map((m) => m.revenue), 1);
  const maxVolume = Math.max(...visibleMonths.map((m) => Math.max(m.sent, m.accepted)), 1);
  const maxStatus = Math.max(...data.statusDist.map((s) => s.count), 1);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Analys</h1>
          <p className="text-sm text-gray-500 mt-1.5">
            Översikt av din affärsprestation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
            title="Uppdatera"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="flex gap-1 bg-gray-100/60 p-1.5 rounded-full">
            {timeFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setTimeRange(filter.value)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  timeRange === filter.value
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total intäkt", value: formatCurrency(data.totalRevenue), icon: TrendingUp, iconBg: "bg-indigo-50", iconColor: "text-indigo-600" },
          { label: "Genomsnittlig offert", value: formatCurrency(data.avgQuoteValue), icon: FileText, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
          { label: "Vinstfrekvens", value: `${data.winRate}%`, icon: Target, iconBg: "bg-green-50", iconColor: "text-green-600" },
          { label: "Skickade offerter", value: String(data.sentQuotes), icon: Send, iconBg: "bg-purple-50", iconColor: "text-purple-600" },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-white rounded-2xl border border-gray-100/60 shadow-sm hover:shadow-md p-7 transition-all duration-300">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                <div className={cn("p-2.5 rounded-xl", metric.iconBg)}>
                  <Icon className={cn("w-4 h-4", metric.iconColor)} />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight text-gray-900 mt-3">
                {metric.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue chart */}
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-8">
          <h3 className="text-sm font-semibold tracking-tight text-gray-900 mb-6">
            Intäktsutveckling
          </h3>
          <div className="flex items-end gap-2 h-48">
            {visibleMonths.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex items-end justify-center h-40">
                  <div
                    className="w-full max-w-8 bg-indigo-500 rounded-t-md transition-all duration-300 hover:bg-indigo-600"
                    style={{ height: `${Math.max((m.revenue / maxRevenue) * 100, 2)}%` }}
                    title={formatCurrency(m.revenue)}
                  />
                </div>
                <span className="text-xs text-gray-500">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote volume chart */}
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-8">
          <h3 className="text-sm font-semibold tracking-tight text-gray-900 mb-2">
            Offertvolym
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-blue-500 rounded-sm" />
              <span className="text-xs text-gray-500">Skickade</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-green-500 rounded-sm" />
              <span className="text-xs text-gray-500">Accepterade</span>
            </div>
          </div>
          <div className="flex items-end gap-2 h-48">
            {visibleMonths.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex items-end justify-center gap-0.5 h-40">
                  <div
                    className="w-1/3 bg-blue-500 rounded-t-sm transition-all duration-300"
                    style={{ height: `${Math.max((m.sent / maxVolume) * 100, 2)}%` }}
                  />
                  <div
                    className="w-1/3 bg-green-500 rounded-t-sm transition-all duration-300"
                    style={{ height: `${Math.max((m.accepted / maxVolume) * 100, 2)}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status distribution */}
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-8">
          <h3 className="text-sm font-semibold tracking-tight text-gray-900 mb-6">
            Statusfördelning
          </h3>
          {data.statusDist.length > 0 ? (
            <div className="space-y-5">
              {data.statusDist.map((s) => (
                <div key={s.status} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{s.status}</span>
                    <span className="text-sm font-semibold text-gray-900">{s.count}</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-300", s.color)}
                      style={{ width: `${(s.count / maxStatus) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">Ingen data ännu</p>
          )}
        </div>

        {/* Top customers */}
        <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-8">
          <h3 className="text-sm font-semibold tracking-tight text-gray-900 mb-6">
            Topp-kunder
          </h3>
          {data.topCustomers.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-4">Kund</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-4">Offerter</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-4">Vinstfrekvens</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-4">Totalt värde</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.topCustomers.map((customer) => (
                  <tr key={customer.name} className="hover:bg-gray-50/50 transition-all duration-300">
                    <td className="py-4 text-sm font-medium text-gray-900">{customer.name}</td>
                    <td className="py-4 text-sm text-right text-gray-600">{customer.quotes}</td>
                    <td className="py-4 text-sm text-right text-gray-600">{customer.winRate}%</td>
                    <td className="py-4 text-sm text-right font-semibold text-gray-900">{formatCurrency(customer.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">Ingen data ännu</p>
          )}
        </div>
      </div>

      {/* Conversion funnel - full width */}
      <div className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-8">
        <h3 className="text-sm font-semibold tracking-tight text-gray-900 mb-8">
          Konverteringstratt
        </h3>
        {data.funnel[0].count > 0 ? (
          <div className="space-y-5 max-w-2xl mx-auto">
            {data.funnel.map((stage, idx) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                  <span className="text-sm text-gray-500">
                    {stage.count}{" "}
                    <span className="text-xs text-gray-400">({stage.percent}%)</span>
                  </span>
                </div>
                <div className="h-8 bg-gray-100 rounded-xl overflow-hidden flex items-center">
                  <div
                    className={cn(
                      "h-full rounded-xl transition-all duration-300 flex items-center justify-center",
                      idx === 0 ? "bg-indigo-500" : idx === 1 ? "bg-blue-500" : idx === 2 ? "bg-yellow-500" : "bg-green-500"
                    )}
                    style={{ width: `${Math.max(stage.percent, 3)}%` }}
                  >
                    {stage.percent > 20 && (
                      <span className="text-xs font-medium text-white">{stage.percent}%</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-8">Skapa offerter för att se din konverteringstratt</p>
        )}
      </div>
    </div>
  );
}
