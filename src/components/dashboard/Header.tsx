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

const notifications = [
  { id: 1, text: "Offert QT-2026-003 har öppnats av kund", time: "2 tim sedan", read: false },
  { id: 2, text: "Faktura FAK-2026-003 har förfallit", time: "1 dag sedan", read: false },
  { id: 3, text: "Offert QT-2026-001 accepterades", time: "3 dagar sedan", read: true },
];

export default function Header({ onMenuToggle }: HeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const filteredResults = searchQuery.trim()
    ? quickLinks.filter((link) =>
        link.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
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

        {/* Search with dropdown */}
        <div ref={searchRef} className="hidden sm:flex flex-1 max-w-md relative">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
              onFocus={() => setShowSearch(true)}
              placeholder="Sök offerter, kunder, sidor..."
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
              <div className="absolute right-0 top-full mt-1 w-80 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
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
