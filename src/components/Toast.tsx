"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import clsx from "clsx";

/* ── Types ────────────────────────────────────── */

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  leaving: boolean;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

/* ── Context ──────────────────────────────────── */

const ToastContext = createContext<ToastContextValue | null>(null);

/* ── Constants ────────────────────────────────── */

const AUTO_DISMISS_MS = 4_000;
const EXIT_ANIMATION_MS = 300;

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />,
  error: <XCircle className="h-5 w-5 shrink-0 text-red-400" />,
  info: <Info className="h-5 w-5 shrink-0 text-blue-400" />,
};

const bgMap: Record<ToastType, string> = {
  success: "border-green-500/30 bg-green-950/80",
  error: "border-red-500/30 bg-red-950/80",
  info: "border-blue-500/30 bg-blue-950/80",
};

/* ── Single toast ─────────────────────────────── */

function ToastCard({
  item,
  onClose,
}: {
  item: ToastItem;
  onClose: (id: number) => void;
}) {
  return (
    <div
      className={clsx(
        "pointer-events-auto flex w-80 items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-300",
        bgMap[item.type],
        item.leaving
          ? "translate-x-full opacity-0"
          : "translate-x-0 opacity-100 animate-in slide-in-from-right"
      )}
      role="alert"
    >
      {iconMap[item.type]}
      <p className="flex-1 text-sm text-white/90">{item.message}</p>
      <button
        onClick={() => onClose(item.id)}
        className="shrink-0 rounded-lg p-0.5 text-white/50 transition-colors hover:text-white"
        aria-label="Stäng"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ── Provider ─────────────────────────────────── */

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, leaving: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, EXIT_ANIMATION_MS);
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, message, type, leaving: false }]);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast container — fixed top-right */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 top-4 z-[9999] flex flex-col gap-3"
      >
        {toasts.map((item) => (
          <AutoDismiss key={item.id} id={item.id} dismiss={dismiss}>
            <ToastCard item={item} onClose={dismiss} />
          </AutoDismiss>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* ── Auto-dismiss wrapper ─────────────────────── */

function AutoDismiss({
  id,
  dismiss,
  children,
}: {
  id: number;
  dismiss: (id: number) => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const timer = setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [id, dismiss]);

  return <>{children}</>;
}

/* ── Hook ─────────────────────────────────────── */

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}
