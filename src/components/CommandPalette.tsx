"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Copy,
  Users,
  BarChart3,
  Settings,
  Plus,
  Search,
  Moon,
  Sun,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { useUser } from "@/lib/user-context";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  group: "Navigera" | "Skapa" | "Verktyg" | "Konto";
  keywords?: string;
}

export default function CommandPalette() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useUser();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false);
    setQuery("");
    setActive(0);
  };

  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: "go-dashboard",
        label: "Gå till Översikt",
        icon: LayoutDashboard,
        action: () => router.push("/dashboard"),
        group: "Navigera",
        keywords: "hem dashboard översikt start",
      },
      {
        id: "go-quotes",
        label: "Gå till Offerter",
        icon: FileText,
        action: () => router.push("/quotes"),
        group: "Navigera",
        keywords: "offerter quotes",
      },
      {
        id: "go-invoices",
        label: "Gå till Fakturor",
        icon: ClipboardList,
        action: () => router.push("/invoices"),
        group: "Navigera",
        keywords: "fakturor invoices",
      },
      {
        id: "go-templates",
        label: "Gå till Mallar",
        icon: Copy,
        action: () => router.push("/templates"),
        group: "Navigera",
      },
      {
        id: "go-clients",
        label: "Gå till Kunder",
        icon: Users,
        action: () => router.push("/clients"),
        group: "Navigera",
        keywords: "kunder clients customers",
      },
      {
        id: "go-analytics",
        label: "Gå till Analys",
        icon: BarChart3,
        action: () => router.push("/analytics"),
        group: "Navigera",
        keywords: "analys statistik analytics",
      },
      {
        id: "go-settings",
        label: "Gå till Inställningar",
        icon: Settings,
        action: () => router.push("/settings"),
        group: "Navigera",
        keywords: "inställningar settings konfig",
      },
      {
        id: "new-quote",
        label: "Skapa ny offert",
        hint: "Snabbåtgärd",
        icon: Plus,
        action: () => router.push("/quotes/new"),
        group: "Skapa",
      },
      {
        id: "new-invoice",
        label: "Skapa ny faktura",
        hint: "Snabbåtgärd",
        icon: Plus,
        action: () => router.push("/invoices/new"),
        group: "Skapa",
      },
      {
        id: "toggle-theme",
        label: theme === "dark" ? "Byt till ljust läge" : "Byt till mörkt läge",
        icon: theme === "dark" ? Sun : Moon,
        action: () => toggleTheme(),
        group: "Verktyg",
        keywords: "dark mode mörkt ljust tema",
      },
      {
        id: "help",
        label: "Tangentbordsgenvägar",
        hint: "?",
        icon: HelpCircle,
        action: () => {
          window.dispatchEvent(new Event("open-shortcuts"));
        },
        group: "Verktyg",
        keywords: "hjälp help genvägar shortcuts",
      },
      {
        id: "logout",
        label: "Logga ut",
        icon: LogOut,
        action: () => logout(),
        group: "Konto",
        keywords: "sign out exit",
      },
    ],
    [router, theme, toggleTheme, logout]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.keywords?.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Cmd+Shift+P / Ctrl+Shift+P to open command palette (Cmd+K is reserved for content search)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        close();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset active when query changes
  useEffect(() => {
    setActive(0);
  }, [query]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      filtered[active].action();
      close();
    }
  }

  if (!open) return null;

  // Group results
  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, c) => {
    (acc[c.group] = acc[c.group] || []).push(c);
    return acc;
  }, {});

  let runningIndex = -1;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-start justify-center pt-[10vh] px-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Kommandopalett"
      onClick={close}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Sök eller hoppa till..."
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none border-0"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium text-gray-500 bg-gray-100 rounded border border-gray-200">
            ESC
          </kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-12 text-center text-sm text-gray-400">
              Inga resultat för &quot;{query}&quot;
            </div>
          ) : (
            Object.entries(grouped).map(([group, items]) => (
              <div key={group} className="px-2 mb-1">
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  {group}
                </div>
                {items.map((cmd) => {
                  runningIndex++;
                  const isActive = runningIndex === active;
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        close();
                      }}
                      onMouseEnter={() => setActive(runningIndex)}
                      className={cn(
                        "no-min w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-left transition-colors",
                        isActive
                          ? "bg-brand-50 text-brand-700"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-4 h-4 shrink-0",
                          isActive ? "text-brand-600" : "text-gray-400"
                        )}
                      />
                      <span className="flex-1">{cmd.label}</span>
                      {cmd.hint && (
                        <span className="text-[11px] text-gray-400">
                          {cmd.hint}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 border-t border-gray-100 text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200">↑↓</kbd>
            Navigera
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200">↵</kbd>
            Välj
          </span>
          <span className="ml-auto flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200">⌘J</kbd>
            Öppna palett
          </span>
        </div>
      </div>
    </div>
  );
}
