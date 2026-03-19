"use client";

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
} from "lucide-react";
import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Copy,
  Users,
  BarChart3,
  Settings,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

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
          "fixed inset-y-0 left-0 z-50 w-[272px] bg-white border-r border-gray-100/80 flex flex-col transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-md group-hover:shadow-indigo-200">
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Offert-pro
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-3 space-y-1 overflow-y-auto">
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
                  <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-indigo-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Plan usage */}
        <div className="px-5 py-5 mx-4 mb-4 bg-gray-50/80 rounded-2xl">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-gray-900">
              Gratisplan
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            3 av 5 offerter använda denna månad
          </p>
          <div className="w-full h-1.5 bg-gray-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: "60%" }}
            />
          </div>
          <Link
            href="/settings"
            className="inline-block mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
          >
            Uppgradera till Pro
          </Link>
        </div>

        {/* User profile */}
        <div className="px-5 py-5 border-t border-gray-100/80">
          <div className="flex items-center gap-3 p-2 -m-2 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
              JD
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Jane Doe
              </p>
              <p className="text-xs text-gray-500 truncate">
                jane@example.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
