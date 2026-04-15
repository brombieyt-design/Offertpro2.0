"use client";

import { useState, useEffect, useRef } from "react";
import { Package, Search, X, Plus } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import type { SavedItem } from "@/types";

interface SavedItemsPickerProps {
  onPick: (item: SavedItem) => void;
}

export default function SavedItemsPicker({ onPick }: SavedItemsPickerProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || items.length > 0) return;
    setLoading(true);
    fetch("/api/saved-items")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [open, items.length]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const filtered = query.trim()
    ? items.filter((i) =>
        (i.description + " " + (i.category || ""))
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : items;

  const grouped = filtered.reduce<Record<string, SavedItem[]>>((acc, item) => {
    const cat = item.category || "Övrigt";
    (acc[cat] = acc[cat] || []).push(item);
    return acc;
  }, {});

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-100 transition-colors"
      >
        <Package className="w-4 h-4" />
        Lägg till från artiklar
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-30 animate-scale-in origin-top-right">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Sök sparade artiklar..."
              autoFocus
              className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none border-0"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto py-2">
            {loading ? (
              <p className="px-4 py-8 text-center text-sm text-gray-400">Laddar...</p>
            ) : items.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-2">
                  Inga sparade artiklar än
                </p>
                <a
                  href="/saved-items"
                  className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
                >
                  <Plus className="w-3 h-3" />
                  Skapa din första
                </a>
              </div>
            ) : filtered.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-gray-400">
                Inga träffar
              </p>
            ) : (
              Object.entries(grouped).map(([cat, list]) => (
                <div key={cat} className="px-2 mb-2">
                  <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    {cat}
                  </div>
                  {list.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        onPick(item);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={cn(
                        "no-min w-full flex items-start justify-between gap-3 px-2 py-2 rounded-lg text-left text-sm hover:bg-brand-50 transition-colors group"
                      )}
                    >
                      <span className="flex-1 text-gray-700 group-hover:text-brand-700 line-clamp-2">
                        {item.description}
                      </span>
                      <span className="text-sm font-semibold text-gray-900 shrink-0">
                        {formatCurrency(item.unitPrice)}
                      </span>
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
