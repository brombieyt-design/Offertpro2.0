"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, Search, Bell, HelpCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onMenuToggle: () => void;
}

interface SearchResult {
  label: string;
  href: string;
  type: string;
}

const quickLinks: SearchResult[] = [
  { label: "Ny offert", href: "/quotes/new", type: "Åtgärd" },
  { label: "Ny faktura", href: "/invoices/new", type: "Åtgärd" },
  { label: "Alla offerter", href: "/quotes", type: "Sida" },
  { label: "Alla fakturor", href: "/invoices", type: "Sida" },
  { label: "Kunder", href: "/clients", type: "Sida" },
  { label: "Mallar", href: "/templates", type: "Sida" },
  { label: "Analys", href: "/analytics", type: "Sida" },
  { label: "Inställningar", href: "/settings", type: "Sida" },
  { label: "Dashboard", href: "/dashboard", type: "Sida" },
];

export default function Header({ onMenuToggle }: HeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [allResults, setAllResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Array<{id: string; text: string; time: string; read: boolean}>>([]);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const [qRes, iRes] = await Promise.all([
          fetch("/api/quotes"),
          fetch("/api/invoices"),
        ]);
        const quotes = qRes.ok ? await qRes.json() : [];
        const invoices = iRes.ok ? await iRes.json() : [];

        const notifs: Array<{id: string; text: string; time: string; read: boolean; date: string}> = [];

        for (const q of (Array.isArray(quotes) ? quotes : [])) {
          if (q.status === "accepted") {
            notifs.push({ id: q.id + "-acc", text: `Offert ${q.number} har accepterats av ${q.customer?.name || "kund"}`, time: q.createdAt, read: true, date: q.createdAt });
          } else if (q.status === "opened") {
            notifs.push({ id: q.id + "-open", text: `Offert ${q.number} har öppnats av ${q.customer?.name || "kund"}`, time: q.createdAt, read: false, date: q.createdAt });
          } else if (q.status === "sent") {
            notifs.push({ id: q.id + "-sent", text: `Offert ${q.number} skickades till ${q.customer?.name || "kund"}`, time: q.createdAt, read: true, date: q.createdAt });
          }
        }

        for (const inv of (Array.isArray(invoices) ? invoices : [])) {
          if (inv.status === "overdue") {
            notifs.push({ id: inv.id + "-overdue", text: `Faktura ${inv.number} har förfallit – ${inv.customer?.name || "kund"}`, time: inv.dueDate, read: false, date: inv.dueDate });
          } else if (inv.status === "paid") {
            notifs.push({ id: inv.id + "-paid", text: `Faktura ${inv.number} har betalats av ${inv.customer?.name || "kund"}`, time: inv.issuedAt, read: true, date: inv.issuedAt });
          }
        }

        // Sort by date descending, take latest 10
        notifs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setNotifications(notifs.slice(0, 10).map(({ id, text, time, read }) => {
          // Format relative time
          const days = Math.round((Date.now() - new Date(time).getTime()) / 86400000);
          const relTime = days === 0 ? "Idag" : days === 1 ? "Igår" : `${days} dagar sedan`;
          return { id, text, time: relTime, read };
        }));
      } catch {}
    }
    loadNotifications();
  }, []);

  useEffect(() => {
    if (!showSearch) return;
    async function loadSearchData() {
      try {
        const [qRes, iRes, cRes] = await Promise.all([
          fetch("/api/quotes"),
          fetch("/api/invoices"),
          fetch("/api/customers"),
        ]);
        const quotes = qRes.ok ? await qRes.json() : [];
        const invoices = iRes.ok ? await iRes.json() : [];
        const customers = cRes.ok ? await cRes.json() : [];

        const results: SearchResult[] = [
          ...quickLinks,
          ...(Array.isArray(quotes) ? quotes : []).map((q: any) => ({
            label: `${q.number} – ${q.customer?.name || ""}`,
            href: "/quotes",
            type: "Offert",
          })),
          ...(Array.isArray(invoices) ? invoices : []).map((i: any) => ({
            label: `${i.number} – ${i.customer?.name || ""}`,
            href: "/invoices",
            type: "Faktura",
          })),
          ...(Array.isArray(customers) ? customers : []).map((c: any) => ({
            label: `${c.name}${c.company ? ` – ${c.company}` : ""}`,
            href: "/clients",
            type: "Kund",
          })),
        ];
        setAllResults(results);
      } catch {
        setAllResults(quickLinks);
      }
    }
    loadSearchData();
  }, [showSearch]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === "Escape") {
        setShowSearch(false);
        setShowNotifications(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const searchSource = allResults.length > 0 ? allResults : quickLinks;
  const filteredResults = searchQuery.trim()
    ? searchSource.filter((link) =>
        link.label.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : quickLinks.slice(0, 5);

  function handleSelect(href: string) {
    setSearchQuery("");
    setShowSearch(false);
    router.push(href);
  }

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile search button */}
        <button
          onClick={() => setShowSearch(true)}
          className="sm:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Search with dropdown */}
        <div ref={searchRef} className="hidden sm:flex flex-1 max-w-md relative">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
              onFocus={() => setShowSearch(true)}
              placeholder="Sök... (⌘K)"
              className="w-full pl-9 pr-4 py-2 text-[13px] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-colors placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setShowSearch(false); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {showSearch && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
              {filteredResults.length > 0 ? (
                <div className="py-1">
                  {filteredResults.map((result) => (
                    <button
                      key={result.href}
                      onClick={() => handleSelect(result.href)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-900">{result.label}</span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {result.type}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-6 text-center text-sm text-gray-400">
                  Inga resultat för &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile search overlay */}
        {showSearch && (
          <div className="sm:hidden fixed inset-0 z-50 bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <div ref={searchRef} className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  placeholder="Sök..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-colors"
                />
              </div>
              <button
                onClick={() => { setShowSearch(false); setSearchQuery(""); }}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[80vh]">
              {filteredResults.map((result) => (
                <button
                  key={result.href + result.label}
                  onClick={() => handleSelect(result.href)}
                  className="w-full flex items-center justify-between px-3 py-3 text-sm hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-gray-900">{result.label}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{result.type}</span>
                </button>
              ))}
              {filteredResults.length === 0 && searchQuery && (
                <p className="text-center text-sm text-gray-400 py-8">Inga resultat</p>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-1">
          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Bell className="w-[18px] h-[18px]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-1 w-[calc(100vw-2rem)] max-w-80 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">Notifikationer</h3>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notif.read ? "bg-indigo-50/30" : ""}`}
                    >
                      <p className="text-sm text-gray-700">{notif.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-gray-100">
                  <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                    Visa alla notifikationer
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <HelpCircle className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
