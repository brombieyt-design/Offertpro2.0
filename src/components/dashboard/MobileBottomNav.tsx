"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Users,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Översikt", href: "/dashboard", icon: LayoutDashboard },
  { label: "Offerter", href: "/quotes", icon: FileText },
  { label: "Ny", href: "/quotes/new", icon: Plus, primary: true },
  { label: "Fakturor", href: "/invoices", icon: ClipboardList },
  { label: "Kunder", href: "/clients", icon: Users },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobilnavigering"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 px-2 pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="flex items-center justify-around">
        {items.map(({ label, href, icon: Icon, primary }) => {
          const isActive = pathname === href;
          if (primary) {
            return (
              <li key={href} className="flex-1 flex justify-center">
                <Link
                  href={href}
                  aria-label={label}
                  className="no-min -mt-6 w-14 h-14 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/30 hover:bg-brand-700 transition-colors"
                >
                  <Icon className="w-6 h-6" strokeWidth={2.5} />
                </Link>
              </li>
            );
          }
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "no-min flex flex-col items-center gap-0.5 py-2 px-1 text-[10px] font-medium transition-colors",
                  isActive ? "text-brand-600" : "text-gray-500"
                )}
              >
                <Icon
                  className={cn("w-5 h-5", isActive && "text-brand-600")}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
