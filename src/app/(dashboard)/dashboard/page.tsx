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
import { quotes, invoices, customers } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  quoteStatusLabels,
  quoteStatusColors,
} from "@/lib/constants";

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
  {
    label: "Totalt offerter",
    value: quotes.length.toString(),
    icon: FileText,
    color: "text-indigo-600 bg-indigo-50",
    accent: "border-l-indigo-500",
  },
  {
    label: "Öppna offerter",
    value: openedQuotes.length.toString(),
    icon: Clock,
    color: "text-amber-600 bg-amber-50",
    accent: "border-l-amber-500",
  },
  {
    label: "Accepterade",
    value: acceptedQuotes.length.toString(),
    icon: CheckCircle2,
    color: "text-emerald-600 bg-emerald-50",
    accent: "border-l-emerald-500",
  },
  {
    label: "Totalt offertvärde",
    value: formatCurrency(totalQuoteValue),
    icon: DollarSign,
    color: "text-indigo-600 bg-indigo-50",
    accent: "border-l-indigo-500",
  },
  {
    label: "Betalda fakturor",
    value: formatCurrency(paidInvoiceTotal),
    icon: Receipt,
    color: "text-emerald-600 bg-emerald-50",
    accent: "border-l-emerald-500",
  },
  {
    label: "Väntande fakturor",
    value: formatCurrency(pendingInvoiceTotal),
    icon: TrendingUp,
    color: "text-orange-600 bg-orange-50",
    accent: "border-l-orange-500",
  },
  {
    label: "Genomsnittligt offertvärde",
    value: formatCurrency(avgQuoteValue),
    icon: BarChart3,
    color: "text-blue-600 bg-blue-50",
    accent: "border-l-blue-500",
  },
  {
    label: "Vinstfrekvens",
    value: `${winRate}%`,
    icon: Target,
    color: "text-emerald-600 bg-emerald-50",
    accent: "border-l-emerald-500",
  },
  {
    label: "Unika kunder",
    value: uniqueCustomers.toString(),
    icon: Users,
    color: "text-purple-600 bg-purple-50",
    accent: "border-l-purple-500",
  },
];

const activities = [
  {
    text: "Offert QT-2026-001 accepterades av Erik Johansson",
    time: "2 timmar sedan",
  },
  {
    text: "Sofia Lindström öppnade offert QT-2026-002",
    time: "5 timmar sedan",
  },
  {
    text: "Faktura FAK-2026-003 har förfallit",
    time: "1 dag sedan",
  },
  {
    text: "Ny offert QT-2026-004 skapades",
    time: "2 dagar sedan",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Översikt
        </h1>
        <div className="flex items-center gap-3">
          <Link
            href="/quotes/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <FileText className="w-4 h-4" />
            Ny offert
          </Link>
          <Link
            href="/invoices/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Receipt className="w-4 h-4" />
            Ny faktura
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-md p-6 border-l-4 ${stat.accent} transition-all duration-300`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}
                >
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent quotes */}
        <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100/80">
            <h2 className="text-base font-semibold tracking-tight text-gray-900">
              Senaste offerter
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-all duration-200"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {quote.number}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {quote.customer.name} &middot;{" "}
                    {formatDate(quote.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(quote.total)}
                  </span>
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      quoteStatusColors[quote.status] || ""
                    }`}
                  >
                    {quoteStatusLabels[quote.status] || quote.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100/80">
            <h2 className="text-base font-semibold tracking-tight text-gray-900">
              Senaste aktivitet
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {activities.map((activity, i) => (
              <div
                key={i}
                className="px-6 py-4 flex items-start gap-3 hover:bg-gray-50/50 transition-all duration-200"
              >
                <div className="w-2 h-2 mt-1.5 rounded-full bg-indigo-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-700">{activity.text}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
