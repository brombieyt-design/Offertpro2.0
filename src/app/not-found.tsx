import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sidan hittades inte · Page not found · Seite nicht gefunden",
  robots: { index: false, follow: true },
};

/**
 * Locale-agnostic 404. The app router mounts this for every unmatched
 * URL regardless of tree, so we surface the "not found" message in all
 * three supported languages and offer a direct way back into each
 * locale tree.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-xl">
        <div className="mb-8">
          <span className="text-8xl font-bold bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
            404
          </span>
        </div>

        <div className="space-y-1.5 mb-10">
          <p className="text-xl font-semibold text-gray-900">
            Sidan hittades inte
          </p>
          <p className="text-xl font-semibold text-gray-600">
            Page not found
          </p>
          <p className="text-xl font-semibold text-gray-500">
            Seite nicht gefunden
          </p>
        </div>

        <p className="text-sm text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
          Sidan finns inte eller har flyttats · The page doesn&rsquo;t exist or
          has moved · Die Seite existiert nicht oder wurde verschoben.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <Link
            href="/"
            hrefLang="sv"
            className="inline-flex flex-col items-center gap-0.5 px-6 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all"
          >
            <span>Svenska</span>
            <span className="text-xs font-normal text-gray-300">Till startsidan</span>
          </Link>
          <Link
            href="/en"
            hrefLang="en"
            className="inline-flex flex-col items-center gap-0.5 px-6 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-full transition-all"
          >
            <span>English</span>
            <span className="text-xs font-normal text-gray-400">Go home</span>
          </Link>
          <Link
            href="/de"
            hrefLang="de"
            className="inline-flex flex-col items-center gap-0.5 px-6 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-full transition-all"
          >
            <span>Deutsch</span>
            <span className="text-xs font-normal text-gray-400">Zur Startseite</span>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
          <Link href="/dashboard" className="hover:text-gray-600 underline-offset-2 hover:underline">
            Dashboard
          </Link>
          <span>·</span>
          <Link href="/faq" className="hover:text-gray-600 underline-offset-2 hover:underline">
            FAQ
          </Link>
          <span>·</span>
          <Link href="/kontakt" className="hover:text-gray-600 underline-offset-2 hover:underline">
            Kontakt
          </Link>
        </div>
      </div>
    </div>
  );
}
