"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { locales, localeNames, type Locale } from "@/i18n/config";

/**
 * Derive the current locale from the pathname. Swedish is the default and
 * lives at the root; English lives under /en.
 */
function getCurrentLocale(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "sv";
}

/**
 * Map the current pathname to its equivalent in the target locale.
 * Swedish <-> English paths mirror each other for the supported marketing
 * pages ("/" <-> "/en", "/pricing" <-> "/en/pricing", "/for-ai" <-> "/en/for-ai").
 * For unsupported paths we fall back to the locale root.
 */
function buildHref(pathname: string, target: Locale): string {
  const current = getCurrentLocale(pathname);
  if (current === target) return pathname;

  // Strip existing locale prefix
  const stripped =
    current === "en"
      ? pathname === "/en"
        ? "/"
        : pathname.replace(/^\/en/, "") || "/"
      : pathname;

  if (target === "sv") return stripped === "" ? "/" : stripped;
  // target === "en"
  return stripped === "/" ? "/en" : `/en${stripped}`;
}

interface Props {
  /** Visual variant: compact for navbars, expanded for footers. */
  variant?: "compact" | "inline";
  /** Optional className forwarded to the trigger button. */
  className?: string;
}

export default function LanguageSwitcher({
  variant = "compact",
  className = "",
}: Props) {
  const pathname = usePathname() || "/";
  const current = getCurrentLocale(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (variant === "inline") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Globe className="h-4 w-4 text-gray-400" aria-hidden="true" />
        {locales.map((loc, i) => {
          const active = loc === current;
          return (
            <span key={loc} className="flex items-center">
              {i > 0 && <span className="mx-1 text-gray-400">·</span>}
              <Link
                href={buildHref(pathname, loc)}
                className={
                  active
                    ? "text-sm font-semibold text-gray-900"
                    : "text-sm text-gray-500 hover:text-gray-900 transition-colors"
                }
                lang={loc}
                hrefLang={loc}
                aria-current={active ? "true" : undefined}
              >
                {localeNames[loc]}
              </Link>
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={current === "sv" ? "Byt språk" : "Change language"}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200 px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500/30"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="uppercase tracking-wide text-xs">{current}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-44 rounded-xl bg-white shadow-lg ring-1 ring-black/5 py-1 z-50"
        >
          {locales.map((loc) => {
            const active = loc === current;
            return (
              <li key={loc}>
                <Link
                  href={buildHref(pathname, loc)}
                  onClick={() => setOpen(false)}
                  role="option"
                  aria-selected={active}
                  lang={loc}
                  hrefLang={loc}
                  className={`flex items-center justify-between px-4 py-2 text-sm ${
                    active
                      ? "font-semibold text-gray-900"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{localeNames[loc]}</span>
                  {active && <Check className="h-4 w-4 text-brand-600" />}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
