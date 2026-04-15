import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
  description: "Du är offline. Kontrollera din internetanslutning.",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-accent-400/20 px-6">
      <div className="max-w-md text-center">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-brand-200 rounded-full blur-3xl opacity-60" />
          <div className="relative w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center shadow-xl shadow-brand-600/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.788m13.788 0c3.808 3.808 3.808 9.98 0 13.788M3 3l18 18"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
          Du är offline
        </h1>
        <p className="text-base text-gray-600 mb-8">
          Det verkar som att din internetanslutning har försvunnit. Kontrollera
          ditt nätverk och försök igen.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20"
          >
            Försök igen
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Till startsidan
          </Link>
        </div>
      </div>
    </div>
  );
}
