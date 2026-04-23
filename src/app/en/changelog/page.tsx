import type { Metadata } from "next";
import { Sparkles, Wrench, Bug } from "lucide-react";
import NavbarEn from "@/components/landing/en/NavbarEn";
import FooterEn from "@/components/landing/en/FooterEn";
import { getChangelog, type ChangeType } from "@/content/changelog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Changelog – Product updates from Offert Pro",
  description:
    "See what's new in Offert Pro. New features, improvements and bug fixes — month by month.",
  alternates: {
    canonical: `${SITE_URL}/en/changelog`,
    languages: {
      "sv-SE": `${SITE_URL}/changelog`,
      en: `${SITE_URL}/en/changelog`,
      de: `${SITE_URL}/de/changelog`,
      "x-default": `${SITE_URL}/changelog`,
    },
  },
  openGraph: {
    title: "Changelog – Offert Pro",
    description: "New features, improvements and bug fixes in Offert Pro.",
    url: `${SITE_URL}/en/changelog`,
    locale: "en",
    alternateLocale: ["sv_SE", "de"],
    type: "website",
  },
};

const typeMeta: Record<ChangeType, { label: string; icon: typeof Sparkles; classes: string }> = {
  added: { label: "New", icon: Sparkles, classes: "text-emerald-700 bg-emerald-50" },
  changed: { label: "Improved", icon: Wrench, classes: "text-indigo-700 bg-indigo-50" },
  fixed: { label: "Fixed", icon: Bug, classes: "text-amber-700 bg-amber-50" },
};

export default function ChangelogPageEn() {
  const entries = getChangelog();
  return (
    <div className="min-h-screen bg-white">
      <NavbarEn />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Changelog
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            What&rsquo;s new
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            New features, improvements and fixes — month by month.
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
                  {new Date(entry.date).toLocaleDateString("en-GB", {
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
                        {item.en}
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
            Missing a feature? Email us at{" "}
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

      <FooterEn />
    </div>
  );
}
