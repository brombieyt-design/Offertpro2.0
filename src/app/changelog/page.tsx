import type { Metadata } from "next";
import { Sparkles, Wrench, Bug } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { getChangelog, type ChangeType } from "@/content/changelog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Ändringslogg – Produktuppdateringar från Offert Pro",
  description:
    "Se vad som är nytt i Offert Pro. Nya funktioner, förbättringar och buggfixar — månad för månad.",
  alternates: {
    canonical: `${SITE_URL}/changelog`,
    languages: {
      "sv-SE": `${SITE_URL}/changelog`,
      en: `${SITE_URL}/en/changelog`,
      de: `${SITE_URL}/de/changelog`,
      "x-default": `${SITE_URL}/changelog`,
    },
  },
  openGraph: {
    title: "Ändringslogg – Offert Pro",
    description: "Nya funktioner, förbättringar och buggfixar i Offert Pro.",
    url: `${SITE_URL}/changelog`,
    locale: "sv_SE",
    alternateLocale: ["en", "de"],
    type: "website",
  },
};

const typeMeta: Record<ChangeType, { label: string; icon: typeof Sparkles; classes: string }> = {
  added: { label: "Nytt", icon: Sparkles, classes: "text-emerald-700 bg-emerald-50" },
  changed: { label: "Förbättrat", icon: Wrench, classes: "text-indigo-700 bg-indigo-50" },
  fixed: { label: "Fixat", icon: Bug, classes: "text-amber-700 bg-amber-50" },
};

export default function ChangelogPage() {
  const entries = getChangelog();
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Ändringslogg
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Det här är nytt
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Nya funktioner, förbättringar och fixar — månad för månad.
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
                  {new Date(entry.date).toLocaleDateString("sv-SE", {
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
                        {item.sv}
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
            Saknar du en funktion? Mejla oss på{" "}
            <a
              href="mailto:hej@offertpro.se"
              className="text-indigo-600 hover:underline"
            >
              hej@offertpro.se
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
