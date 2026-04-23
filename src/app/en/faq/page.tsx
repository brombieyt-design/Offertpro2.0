import type { Metadata } from "next";
import Link from "next/link";
import NavbarEn from "@/components/landing/en/NavbarEn";
import FooterEn from "@/components/landing/en/FooterEn";
import { faqs, sectionLabel, sectionOrder, type FaqSection } from "@/content/faq";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LOCALE = "en" as const;

export const metadata: Metadata = {
  title: "FAQ – Offert Pro",
  description:
    "Frequently asked questions about Offert Pro: pricing, GDPR, eIDAS signatures, EU VAT, SSO, DPA and billing.",
  alternates: {
    canonical: `${SITE_URL}/en/faq`,
    languages: {
      "sv-SE": `${SITE_URL}/faq`,
      en: `${SITE_URL}/en/faq`,
      de: `${SITE_URL}/de/faq`,
      "x-default": `${SITE_URL}/faq`,
    },
  },
  openGraph: {
    title: "FAQ – Offert Pro",
    description: "Frequently asked questions about Offert Pro.",
    url: `${SITE_URL}/en/faq`,
    locale: "en",
    alternateLocale: ["sv_SE", "de"],
    type: "website",
  },
};

export default function FaqPageEn() {
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
      <NavbarEn />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            FAQ
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Frequently asked questions
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Short answers to the things we&rsquo;re asked most often. Can&rsquo;t
            find what you need?{" "}
            <Link href="/en/contact" className="text-indigo-600 hover:underline">
              Get in touch
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
            Didn&rsquo;t find the answer?
          </h2>
          <p className="text-gray-500 mb-8">
            We reply to email within one business day.
          </p>
          <Link
            href="/en/contact"
            className="inline-flex items-center px-8 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all"
          >
            Contact us
          </Link>
        </div>
      </section>

      <FooterEn />
    </div>
  );
}
