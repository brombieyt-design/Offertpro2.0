"use client";

import { useState, useEffect } from "react";
import { Plus, Package, Trash2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/Toast";
import { useSettings } from "@/lib/settings-context";
import EmptyState from "@/components/EmptyState";
import type { SavedItem } from "@/types";

const COMMON_CATEGORIES = ["Tjänst", "Produkt", "Konsultation", "Material", "Frakt", "Övrigt"];

export default function SavedItemsPage() {
  const { formatMoney: formatCurrency } = useSettings();
  const [items, setItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [form, setForm] = useState({ description: "", unitPrice: 0, category: "Tjänst" });
  const { toast } = useToast();

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/saved-items");
      if (!res.ok) throw new Error();
      setItems(await res.json());
    } catch {
      toast("Kunde inte ladda artiklar", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.description.trim()) return;
    try {
      const res = await fetch("/api/saved-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast("Artikel sparad", "success");
      setForm({ description: "", unitPrice: 0, category: "Tjänst" });
      setShowForm(false);
      load();
    } catch {
      toast("Kunde inte spara artikel", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Vill du ta bort denna artikel?")) return;
    try {
      await fetch("/api/saved-items", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast("Artikel borttagen", "success");
      load();
    } catch {
      toast("Kunde inte ta bort artikel", "error");
    }
  }

  const categories = Array.from(new Set(items.map((i) => i.category).filter(Boolean))) as string[];

  const filtered = items.filter((item) => {
    if (filterCategory && item.category !== filterCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.description.toLowerCase().includes(q) ||
        (item.category || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sparade artiklar</h1>
          <p className="text-sm text-gray-500 mt-1">
            Återanvändbara rader för dina offerter och fakturor.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ny artikel
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Ny artikel</h2>
            <button
              onClick={() => setShowForm(false)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Beskrivning *
              </label>
              <input
                type="text"
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="t.ex. Webbutveckling per timme"
                className="form-input"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">À-pris (kr) *</label>
              <input
                type="number"
                required
                min={0}
                value={form.unitPrice}
                onChange={(e) => setForm({ ...form, unitPrice: Number(e.target.value) })}
                className="form-input"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Kategori</label>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_CATEGORIES.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setForm({ ...form, category: cat })}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
                      form.category === cat
                        ? "bg-brand-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-3 flex gap-2">
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-xl hover:bg-brand-700"
              >
                Spara artikel
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200"
              >
                Avbryt
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search + filters */}
      {items.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Sök artiklar..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-colors"
            />
          </div>
          {categories.length > 0 && (
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setFilterCategory("")}
                className={cn(
                  "px-3 py-2 text-xs font-medium rounded-full transition-colors whitespace-nowrap",
                  !filterCategory
                    ? "bg-brand-600 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                )}
              >
                Alla
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={cn(
                    "px-3 py-2 text-xs font-medium rounded-full transition-colors whitespace-nowrap",
                    filterCategory === cat
                      ? "bg-brand-600 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Items grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 shimmer rounded-2xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Inga sparade artiklar"
          description="Skapa återanvändbara rader för att snabba upp arbetet med offerter och fakturor."
          actionLabel="Skapa din första artikel"
          onAction={() => setShowForm(true)}
        />
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-12 px-6 text-center">
          <p className="text-sm text-gray-500">Inga artiklar matchar dina filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-4 card relative"
            >
              {item.category && (
                <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-700 bg-brand-50 rounded-full mb-2">
                  {item.category}
                </span>
              )}
              <p className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                {item.description}
              </p>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(item.unitPrice)}
              </p>
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                aria-label="Ta bort artikel"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
