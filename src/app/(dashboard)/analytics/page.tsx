"use client";

import { useState } from "react";
import {
  TrendingUp,
  FileText,
  Target,
  Send,
} from "lucide-react";
import { analyticsData } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";

const timeFilters = [
  { label: "3 månader", value: 3 },
  { label: "6 månader", value: 6 },
  { label: "12 månader", value: 12 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState(12);

  const data = analyticsData;
  const maxRevenue = Math.max(...data.monthlyRevenue.map((m) => m.value));
  const maxVolume = Math.max(
    ...data.quoteVolume.map((m) => Math.max(m.sent, m.accepted))
  );
  const maxStatus = Math.max(...data.statusDistribution.map((s) => s.count));

  const visibleMonths = data.monthlyRevenue.slice(-timeRange);
  const visibleVolume = data.quoteVolume.slice(-timeRange);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analys</h1>
          <p className="text-sm text-gray-500 mt-1">
            Översikt av din affärsprestation
          </p>
        </div>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {timeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setTimeRange(filter.value)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
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

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Total intäkt</p>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {formatCurrency(data.totalRevenue)}
          </p>
          <p className="text-xs text-green-600 font-medium mt-1">
            +{data.revenueGrowth}%
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              Genomsnittlig offert
            </p>
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {formatCurrency(data.avgQuoteValue)}
          </p>
          <p className="text-xs text-green-600 font-medium mt-1">
            +{data.avgGrowth}%
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Vinstfrekvens</p>
            <div className="p-2 bg-green-50 rounded-lg">
              <Target className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {data.winRate}%
          </p>
          <p className="text-xs text-green-600 font-medium mt-1">
            +{data.winRateGrowth}%
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              Skickade offerter
            </p>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Send className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {data.sentQuotes}
          </p>
          <p className="text-xs text-green-600 font-medium mt-1">
            +{data.sentGrowth}%
          </p>
        </div>
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue chart */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Intäktsutveckling
          </h3>
          <div className="flex items-end gap-2 h-48">
            {visibleMonths.map((m) => (
              <div
                key={m.month}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div className="w-full flex items-end justify-center h-40">
                  <div
                    className="w-full max-w-8 bg-indigo-500 rounded-t-md transition-all hover:bg-indigo-600"
                    style={{
                      height: `${(m.value / maxRevenue) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote volume chart */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Offertvolym
          </h3>
          <div className="flex items-center gap-4 mb-3">
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
            {visibleVolume.map((m) => (
              <div
                key={m.month}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div className="w-full flex items-end justify-center gap-0.5 h-40">
                  <div
                    className="w-1/3 bg-blue-500 rounded-t-sm transition-all"
                    style={{
                      height: `${(m.sent / maxVolume) * 100}%`,
                    }}
                  />
                  <div
                    className="w-1/3 bg-green-500 rounded-t-sm transition-all"
                    style={{
                      height: `${(m.accepted / maxVolume) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status distribution */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Statusfördelning
          </h3>
          <div className="space-y-4">
            {data.statusDistribution.map((s) => (
              <div key={s.status} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{s.status}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {s.count}
                  </span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", s.color)}
                    style={{
                      width: `${(s.count / maxStatus) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top customers */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Topp-kunder
          </h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                  Kund
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                  Offerter
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                  Vinstfrekvens
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                  Totalt värde
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.topCustomers.map((customer) => (
                <tr key={customer.name}>
                  <td className="py-3 text-sm font-medium text-gray-900">
                    {customer.name}
                  </td>
                  <td className="py-3 text-sm text-right text-gray-600">
                    {customer.quotes}
                  </td>
                  <td className="py-3 text-sm text-right text-gray-600">
                    {customer.winRate}%
                  </td>
                  <td className="py-3 text-sm text-right font-semibold text-gray-900">
                    {formatCurrency(customer.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conversion funnel - full width */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-6">
          Konverteringstratt
        </h3>
        <div className="space-y-4 max-w-2xl mx-auto">
          {data.conversionFunnel.map((stage, idx) => (
            <div key={stage.stage} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {stage.stage}
                </span>
                <span className="text-sm text-gray-500">
                  {stage.count}{" "}
                  <span className="text-xs text-gray-400">
                    ({stage.percent}%)
                  </span>
                </span>
              </div>
              <div className="h-8 bg-gray-100 rounded-lg overflow-hidden flex items-center">
                <div
                  className={cn(
                    "h-full rounded-lg transition-all flex items-center justify-center",
                    idx === 0
                      ? "bg-indigo-500"
                      : idx === 1
                        ? "bg-blue-500"
                        : idx === 2
                          ? "bg-yellow-500"
                          : "bg-green-500"
                  )}
                  style={{ width: `${stage.percent}%` }}
                >
                  {stage.percent > 20 && (
                    <span className="text-xs font-medium text-white">
                      {stage.percent}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
