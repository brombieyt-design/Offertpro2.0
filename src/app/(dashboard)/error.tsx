"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function DashboardError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-danger-50 flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-danger-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Något gick fel
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Ett oväntat fel uppstod. Försök igen eller gå tillbaka till
          översikten.
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 mb-6 font-mono">
            Felkod: {error.digest}
          </p>
        )}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={unstable_retry}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-full transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Försök igen
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-full transition-all"
          >
            <Home className="w-4 h-4" />
            Översikt
          </Link>
        </div>
      </div>
    </div>
  );
}
