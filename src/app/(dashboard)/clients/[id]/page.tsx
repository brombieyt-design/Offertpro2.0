"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  User,
  FileText,
  ClipboardList,
  TrendingUp,
  Plus,
  Pencil,
  Save,
  X,
  Tag,
} from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { quoteStatusLabels, quoteStatusColors, invoiceStatusLabels, invoiceStatusColors } from "@/lib/constants";
import { useToast } from "@/components/Toast";
import type { Customer, Quote, Invoice } from "@/types";

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [editingNotes, setEditingNotes] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [cRes, qRes, iRes] = await Promise.all([
          fetch("/api/customers"),
          fetch("/api/quotes"),
          fetch("/api/invoices"),
        ]);
        const customers: Customer[] = cRes.ok ? await cRes.json() : [];
        const allQuotes: Quote[] = qRes.ok ? await qRes.json() : [];
        const allInvoices: Invoice[] = iRes.ok ? await iRes.json() : [];

        const found = customers.find((c) => c.id === id);
        setCustomer(found || null);
        setNotes(found?.notes || "");
        setQuotes(allQuotes.filter((q) => q.customer.id === id || q.customer.email === found?.email));
        setInvoices(allInvoices.filter((inv) => inv.customer.id === id || inv.customer.email === found?.email));
      } catch {
        toast("Kunde inte ladda kunddetaljer.", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, toast]);

  async function saveNotes() {
    if (!customer) return;
    try {
      const res = await fetch("/api/customers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: customer.id, notes }),
      });
      if (!res.ok) throw new Error();
      setCustomer({ ...customer, notes });
      setEditingNotes(false);
      toast("Anteckningar sparade", "success");
    } catch {
      toast("Kunde inte spara anteckningar.", "error");
    }
  }

  async function addTag() {
    if (!customer || !tagInput.trim()) return;
    const newTags = [...(customer.tags || []), tagInput.trim()];
    try {
      const res = await fetch("/api/customers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: customer.id, tags: newTags }),
      });
      if (!res.ok) throw new Error();
      setCustomer({ ...customer, tags: newTags });
      setTagInput("");
    } catch {
      toast("Kunde inte lägga till tagg.", "error");
    }
  }

  async function removeTag(tag: string) {
    if (!customer) return;
    const newTags = (customer.tags || []).filter((t) => t !== tag);
    try {
      await fetch("/api/customers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: customer.id, tags: newTags }),
      });
      setCustomer({ ...customer, tags: newTags });
    } catch {
      toast("Kunde inte ta bort tagg.", "error");
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 shimmer rounded" />
        <div className="h-32 w-full shimmer rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-64 shimmer rounded-2xl" />
          <div className="h-64 shimmer rounded-2xl" />
          <div className="h-64 shimmer rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Kund hittades inte</h2>
        <Link href="/clients" className="text-brand-600 hover:underline text-sm">
          Tillbaka till kunder
        </Link>
      </div>
    );
  }

  const totalQuoted = quotes.reduce((sum, q) => sum + q.total, 0);
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalPaid = invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.total, 0);
  const wonQuotes = quotes.filter((q) => q.status === "accepted").length;
  const winRate = quotes.length > 0 ? Math.round((wonQuotes / quotes.length) * 100) : 0;

  const initials = customer.name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const isPrivate = customer.customerType === "private" || (!customer.company && !customer.orgNr);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Back nav */}
      <button
        onClick={() => router.push("/clients")}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Tillbaka till kunder
      </button>

      {/* Header card */}
      <div className="bg-gradient-to-br from-brand-50 to-accent-400/20 rounded-2xl p-6 border border-brand-100">
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-brand-500/20 shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
              {isPrivate ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  <User className="w-3 h-3" />
                  Privatkund
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                  <Building2 className="w-3 h-3" />
                  Företag
                </span>
              )}
            </div>
            {customer.company && (
              <p className="text-base text-gray-600 mb-3">{customer.company}</p>
            )}
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-gray-600">
              <a href={`mailto:${customer.email}`} className="inline-flex items-center gap-1.5 hover:text-brand-600">
                <Mail className="w-4 h-4" />
                {customer.email}
              </a>
              {customer.phone && (
                <a href={`tel:${customer.phone}`} className="inline-flex items-center gap-1.5 hover:text-brand-600">
                  <Phone className="w-4 h-4" />
                  {customer.phone}
                </a>
              )}
              {customer.city && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {customer.city}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link
              href="/quotes/new"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-brand-700 bg-white hover:bg-brand-50 rounded-lg shadow-sm border border-brand-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ny offert
            </Link>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-gray-400" />
          {(customer.tags || []).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-brand-700 bg-white border border-brand-100 rounded-full"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="hover:text-red-500 transition-colors"
                aria-label={`Ta bort tagg ${tag}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="+ tagg"
            className="px-2.5 py-1 text-xs bg-white/70 border border-dashed border-brand-200 rounded-full focus:outline-none focus:border-brand-400 focus:bg-white w-24"
          />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Totalt offererat"
          value={formatCurrency(totalQuoted)}
          icon={FileText}
          color="text-brand-600 bg-brand-50"
        />
        <StatCard
          label="Totalt fakturerat"
          value={formatCurrency(totalInvoiced)}
          icon={ClipboardList}
          color="text-purple-600 bg-purple-50"
        />
        <StatCard
          label="Totalt betalt"
          value={formatCurrency(totalPaid)}
          icon={TrendingUp}
          color="text-green-600 bg-green-50"
        />
        <StatCard
          label="Vinstgrad"
          value={`${winRate}%`}
          subtitle={`${wonQuotes} av ${quotes.length} offerter`}
          icon={TrendingUp}
          color="text-amber-600 bg-amber-50"
        />
      </div>

      {/* Two column: Quotes + Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-600" />
              Offerter ({quotes.length})
            </h2>
            <Link href="/quotes/new" className="text-xs text-brand-600 hover:underline">
              + Ny
            </Link>
          </div>
          <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
            {quotes.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-gray-400">Inga offerter ännu</p>
            ) : (
              quotes.map((q) => (
                <Link
                  key={q.id}
                  href={`/quotes/${q.id}`}
                  className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">{q.number}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{formatDate(q.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-medium",
                        quoteStatusColors[q.status]
                      )}
                    >
                      {quoteStatusLabels[q.status]}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(q.total)}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-purple-600" />
              Fakturor ({invoices.length})
            </h2>
            <Link href="/invoices/new" className="text-xs text-brand-600 hover:underline">
              + Ny
            </Link>
          </div>
          <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
            {invoices.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-gray-400">Inga fakturor ännu</p>
            ) : (
              invoices.map((inv) => (
                <Link
                  key={inv.id}
                  href={`/invoices/${inv.id}`}
                  className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">{inv.number}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Förfaller {formatDate(inv.dueDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-medium",
                        invoiceStatusColors[inv.status]
                      )}
                    >
                      {invoiceStatusLabels[inv.status]}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(inv.total)}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Anteckningar</h2>
          {!editingNotes ? (
            <button
              onClick={() => setEditingNotes(true)}
              className="inline-flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-700"
            >
              <Pencil className="w-3.5 h-3.5" />
              Redigera
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setNotes(customer.notes || "");
                  setEditingNotes(false);
                }}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Avbryt
              </button>
              <button
                onClick={saveNotes}
                className="inline-flex items-center gap-1 text-xs font-medium text-white bg-brand-600 hover:bg-brand-700 px-3 py-1 rounded-lg"
              >
                <Save className="w-3 h-3" />
                Spara
              </button>
            </div>
          )}
        </div>
        {editingNotes ? (
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Skriv interna anteckningar om kunden..."
            className="form-input"
          />
        ) : (
          <p className="text-sm text-gray-600 whitespace-pre-wrap min-h-[60px]">
            {customer.notes || (
              <span className="text-gray-400 italic">Inga anteckningar ännu</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  subtitle?: string;
}

function StatCard({ label, value, icon: Icon, color, subtitle }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 card">
      <div className="flex items-start justify-between mb-2">
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", color)}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
  );
}
