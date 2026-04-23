import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { faqs, sectionLabel, sectionOrder, type FaqSection } from "@/content/faq";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LOCALE = "sv" as const;

export const metadata: Metadata = {
  title: "Vanliga frågor – Offert Pro",
  description:
    "Svar på vanliga frågor om Offert Pro: priser, GDPR, eIDAS-signaturer, EU-moms, SSO, DPA och faktureringen.",
  alternates: {
    canonical: `${SITE_URL}/faq`,
    languages: {
      "sv-SE": `${SITE_URL}/faq`,
      en: `${SITE_URL}/en/faq`,
      de: `${SITE_URL}/de/faq`,
      "x-default": `${SITE_URL}/faq`,
    },
  },
  openGraph: {
    title: "Vanliga frågor – Offert Pro",
    description: "Svar på vanliga frågor om Offert Pro.",
    url: `${SITE_URL}/faq`,
    locale: "sv_SE",
    alternateLocale: ["en", "de"],
    type: "website",
  },
};

export default function FaqPage() {
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
      <Navbar />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            FAQ
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Vanliga frågor
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Kortfattade svar på det vi oftast får frågor om. Hittar du inte
            svaret? <Link href="/kontakt" className="text-indigo-600 hover:underline">Hör av dig</Link>.
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
            Hittade du inte svaret?
          </h2>
          <p className="text-gray-500 mb-8">
            Vi svarar på e-post inom en arbetsdag.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center px-8 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all"
          >
            Kontakta oss
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
