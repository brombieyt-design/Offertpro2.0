import type { Metadata } from "next";
import { Sparkles, Wrench, Bug } from "lucide-react";
import NavbarDe from "@/components/landing/de/NavbarDe";
import FooterDe from "@/components/landing/de/FooterDe";
import { getChangelog, type ChangeType } from "@/content/changelog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Änderungsprotokoll – Produkt-Updates von Offert Pro",
  description:
    "Sehen Sie, was neu in Offert Pro ist. Neue Funktionen, Verbesserungen und Bugfixes — Monat für Monat.",
  alternates: {
    canonical: `${SITE_URL}/de/changelog`,
    languages: {
      "sv-SE": `${SITE_URL}/changelog`,
      en: `${SITE_URL}/en/changelog`,
      de: `${SITE_URL}/de/changelog`,
      "x-default": `${SITE_URL}/changelog`,
    },
  },
  openGraph: {
    title: "Änderungsprotokoll – Offert Pro",
    description:
      "Neue Funktionen, Verbesserungen und Bugfixes in Offert Pro.",
    url: `${SITE_URL}/de/changelog`,
    locale: "de",
    alternateLocale: ["sv_SE", "en"],
    type: "website",
  },
};

const typeMeta: Record<ChangeType, { label: string; icon: typeof Sparkles; classes: string }> = {
  added: { label: "Neu", icon: Sparkles, classes: "text-emerald-700 bg-emerald-50" },
  changed: { label: "Verbessert", icon: Wrench, classes: "text-indigo-700 bg-indigo-50" },
  fixed: { label: "Behoben", icon: Bug, classes: "text-amber-700 bg-amber-50" },
};

export default function ChangelogPageDe() {
  const entries = getChangelog();
  return (
    <div className="min-h-screen bg-white">
      <NavbarDe />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Änderungsprotokoll
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Das ist neu
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Neue Funktionen, Verbesserungen und Fixes — Monat für Monat.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-12">
          {entries.map((entry) => (
            <article
              key={entry.version}
              className="border-l-2 border-gray-100 pl-8 relative"
            >
              <div className="absolute w-3 h-3 rounded-full bg-indigo-600 -left-[7px] top-1.5" />
              <div className="flex items-baseline gap-4 mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {entry.version}
                </h2>
                <time className="text-sm text-gray-400" dateTime={entry.date}>
                  {new Date(entry.date).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <ul className="space-y-4">
                {entry.items.map((item, i) => {
                  const meta = typeMeta[item.type];
                  return (
                    <li key={i} className="flex items-start gap-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${meta.classes}`}
                      >
                        <meta.icon className="h-3 w-3" />
                        {meta.label}
                      </span>
                      <p className="text-sm text-gray-600 leading-relaxed pt-0.5">
                        {item.de}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm text-gray-500">
            Fehlt eine Funktion? Schreiben Sie uns an{" "}
            <a
              href="mailto:hello@offertpro.se"
              className="text-indigo-600 hover:underline"
            >
              hello@offertpro.se
            </a>
            .
          </p>
        </div>
      </section>

      <FooterDe />
    </div>
  );
}
