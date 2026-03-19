"use client";

import { useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Funktioner", href: "#funktioner" },
  { label: "Priser", href: "#priser" },
  { label: "Om oss", href: "#om-oss" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Offert-pro</span>
          </a>

          {/* Center links – desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right buttons – desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors"
            >
              Logga in
            </a>
            <a
              href="/signup"
              className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
            >
              Kom igång gratis
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Meny"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden border-t border-gray-100 bg-white overflow-hidden transition-all duration-200",
          mobileOpen ? "max-h-80" : "max-h-0"
        )}
      >
        <div className="px-4 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block text-sm font-medium text-gray-600 hover:text-gray-900"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <hr className="border-gray-100" />
          <a
            href="/login"
            className="block text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Logga in
          </a>
          <a
            href="/signup"
            className="block text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
          >
            Kom igång gratis
          </a>
        </div>
      </div>
    </nav>
  );
}
