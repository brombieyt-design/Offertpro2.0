"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const NAV_MAP: Record<string, string> = {
  d: "/dashboard",
  q: "/quotes",
  i: "/invoices",
  c: "/clients",
  s: "/settings",
  t: "/templates",
  a: "/analytics",
};

const NEW_MAP: Record<string, string> = {
  q: "/quotes/new",
  i: "/invoices/new",
};

/**
 * Listens for chord shortcuts: G+letter (go to), N+letter (new).
 * Inactive when typing in inputs.
 */
export default function KeyboardShortcuts() {
  const router = useRouter();
  const prefix = useRef<"g" | "n" | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function isTyping(target: EventTarget | null) {
      const el = target as HTMLElement | null;
      if (!el) return false;
      return (
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.tagName === "SELECT" ||
        el.isContentEditable
      );
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTyping(e.target)) return;

      const key = e.key.toLowerCase();

      if (prefix.current) {
        const map = prefix.current === "g" ? NAV_MAP : NEW_MAP;
        const target = map[key];
        if (target) {
          e.preventDefault();
          router.push(target);
        }
        prefix.current = null;
        if (timer.current) clearTimeout(timer.current);
        return;
      }

      if (key === "g" || key === "n") {
        prefix.current = key;
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          prefix.current = null;
        }, 1200);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [router]);

  return null;
}
