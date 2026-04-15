"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Copy,
  Users,
  BarChart3,
  Settings,
  X,
  Check,
  LogOut,
  Moon,
  Sun,
  Package,
} from "lucide-react";
import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/user-context";
import { useTheme } from "@/lib/theme-context";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Copy,
  Users,
  BarChart3,
  Settings,
  Package,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [quoteCount, setQuoteCount] = useState(0);

  useEffect(() => {
    fetch("/api/quotes")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setQuoteCount(Array.isArray(d) ? d.length : 0))
      .catch(() => {});
  }, []);

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "?";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-200 lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center transition-colors group-hover:bg-brand-700">
              <Check className="w-4.5 h-4.5 text-white" strokeWidth={3} />
            </div>
            <span className="text-base font-bold tracking-tight text-gray-900">
              Offert-pro
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn("sidebar-item relative", isActive && "active")}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span>{item.label}</span>
                {isActive && item.href === "/quotes" && (
                  <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-brand-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Plan usage */}
        <div className="mx-4 mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <span className="text-[12px] font-semibold text-gray-900">
            Gratisplan
          </span>
          <p className="text-[12px] text-gray-500 mt-1 mb-2.5">
            {quoteCount} av 5 offerter använda
          </p>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                quoteCount >= 5
                  ? "bg-red-500"
                  : quoteCount >= 4
                    ? "bg-amber-500"
                    : "bg-brand-500"
              )}
              style={{ width: `${Math.min((quoteCount / 5) * 100, 100)}%` }}
            />
          </div>
          <Link
            href="/settings"
            className="inline-block mt-3 text-[12px] font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            Uppgradera &rarr;
          </Link>
        </div>

        {/* Dark mode toggle */}
        <div className="mx-4 mb-3">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4.5 h-4.5 text-amber-500" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-gray-400" />
            )}
            <span>{theme === "dark" ? "Ljust läge" : "Mörkt läge"}</span>
          </button>
        </div>

        {/* User profile */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-2 -m-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-[11px] font-semibold">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-gray-900 truncate">
                {user ? `${user.firstName} ${user.lastName}` : "Laddar..."}
              </p>
              <p className="text-[12px] text-gray-500 truncate">
                {user?.email ?? ""}
              </p>
            </div>
            <button
              onClick={logout}
              title="Logga ut"
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
