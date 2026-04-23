import type { Metadata } from "next";
import Link from "next/link";
import NavbarDe from "@/components/landing/de/NavbarDe";
import FooterDe from "@/components/landing/de/FooterDe";
import { faqs, sectionLabel, sectionOrder, type FaqSection } from "@/content/faq";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LOCALE = "de" as const;

export const metadata: Metadata = {
  title: "FAQ – Offert Pro",
  description:
    "Häufig gestellte Fragen zu Offert Pro: Preise, DSGVO, eIDAS-Signaturen, EU-MwSt., SSO, AVV und Abrechnung.",
  alternates: {
    canonical: `${SITE_URL}/de/faq`,
    languages: {
      "sv-SE": `${SITE_URL}/faq`,
      en: `${SITE_URL}/en/faq`,
      de: `${SITE_URL}/de/faq`,
      "x-default": `${SITE_URL}/faq`,
    },
  },
  openGraph: {
    title: "FAQ – Offert Pro",
    description: "Häufig gestellte Fragen zu Offert Pro.",
    url: `${SITE_URL}/de/faq`,
    locale: "de",
    alternateLocale: ["sv_SE", "en"],
    type: "website",
  },
};

export default function FaqPageDe() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question[LOCALE],
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer[LOCALE],
      },
    })),
  };

  const grouped: Record<FaqSection, typeof faqs> = {
    general: [], features: [], security: [], billing: [], legal: [],
  };
  for (const f of faqs) grouped[f.section].push(f);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <NavbarDe />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            FAQ
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Häufig gestellte Fragen
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Kurze Antworten auf das, wonach am häufigsten gefragt wird. Nichts
            gefunden?{" "}
            <Link href="/de/kontakt" className="text-indigo-600 hover:underline">
              Schreiben Sie uns
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-3xl space-y-16">
          {sectionOrder.map((section) => (
            <div key={section}>
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                {sectionLabel[section][LOCALE]}
              </h2>
              <dl className="space-y-5">
                {grouped[section].map((f, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-sm transition-shadow"
                  >
                    <dt className="text-base font-semibold text-gray-900 mb-2">
                      {f.question[LOCALE]}
                    </dt>
                    <dd className="text-sm text-gray-600 leading-relaxed">
                      {f.answer[LOCALE]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Antwort nicht gefunden?
          </h2>
          <p className="text-gray-500 mb-8">
            Wir antworten per E-Mail innerhalb eines Werktags.
          </p>
          <Link
            href="/de/kontakt"
            className="inline-flex items-center px-8 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all"
          >
            Kontakt
          </Link>
        </div>
      </section>

      <FooterDe />
    </div>
  );
}
