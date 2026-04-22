"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/landing/LanguageSwitcher";

const links = [
  { label: "So funktioniert's", href: "/de#how-it-works" },
  { label: "Funktionen", href: "/de#features" },
  { label: "Preise", href: "/de/pricing" },
  { label: "Blog", href: "/de/blog" },
  { label: "Für KI", href: "/de/for-ai" },
];

export default function NavbarDe() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <Link href="/de" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center group-hover:bg-brand-600 transition-colors duration-300">
              <span className="text-white text-xs font-bold">OP</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Offert Pro
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-gray-100/80 rounded-full px-2 py-1.5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] font-medium text-gray-500 hover:text-gray-900 hover:bg-white rounded-full px-4 py-2 transition-all duration-300"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/login"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300 px-2 py-2"
            >
              Anmelden
            </Link>
            <Link
              href="/signup"
              className="text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md inline-flex items-center gap-2 group"
            >
              Kostenlos starten
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div
        aria-hidden={!mobileOpen}
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-96 bg-white/95 backdrop-blur-sm border-b border-gray-100" : "max-h-0"
        )}
      >
        <div className="px-6 py-6 space-y-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <hr className="border-gray-100" />
          <div className="py-1">
            <LanguageSwitcher />
          </div>
          <Link
            href="/login"
            className="block text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            Anmelden
          </Link>
          <Link
            href="/signup"
            className="block text-center text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-full transition-all duration-300"
          >
            Kostenlos starten
          </Link>
        </div>
      </div>
    </nav>
  );
}
