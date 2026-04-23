import type { Metadata } from "next";
import Link from "next/link";
import NavbarDe from "@/components/landing/de/NavbarDe";
import FooterDe from "@/components/landing/de/FooterDe";
import {
  integrations,
  categoryLabel,
  categoryOrder,
  statusLabel,
  type IntegrationCategory,
} from "@/content/integrations";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LOCALE = "de" as const;

export const metadata: Metadata = {
  title: "Integrationen – Offert Pro",
  description:
    "Offert Pro mit DATEV, Fortnox, HubSpot, Stripe, BankID/D-Trust und 15+ weiteren Tools verbinden. Vollständige REST-API, Webhooks und Zapier für eigene Flows.",
  alternates: {
    canonical: `${SITE_URL}/de/integrationen`,
    languages: {
      "sv-SE": `${SITE_URL}/integrations`,
      en: `${SITE_URL}/en/integrations`,
      de: `${SITE_URL}/de/integrationen`,
      "x-default": `${SITE_URL}/integrations`,
    },
  },
  openGraph: {
    title: "Integrationen – Offert Pro",
    description: "Offert Pro mit Ihrer bestehenden Stack verbinden.",
    url: `${SITE_URL}/de/integrationen`,
    locale: "de",
    alternateLocale: ["sv_SE", "en"],
    type: "website",
  },
};

const statusClass: Record<string, string> = {
  available: "text-emerald-700 bg-emerald-50",
  beta: "text-indigo-700 bg-indigo-50",
  planned: "text-gray-500 bg-gray-100",
};

export default function IntegrationenPage() {
  const grouped: Record<IntegrationCategory, typeof integrations> = {
    accounting: [], crm: [], payments: [], esign: [], email: [], automation: [], storage: [],
  };
  for (const i of integrations) grouped[i.category].push(i);

  return (
    <div className="min-h-screen bg-white">
      <NavbarDe />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Integrationen
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Mit Ihrer Stack verbinden
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Offert Pro spricht mit den Tools, die Sie bereits nutzen — von
            Buchhaltung und CRM bis zu Zahlungen, E-Signaturen und Zapier.
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-5xl space-y-16">
          {categoryOrder.map((cat) => (
            <div key={cat}>
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                {categoryLabel[cat][LOCALE]}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {grouped[cat].map((i) => (
                  <article
                    key={i.id}
                    className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-semibold text-gray-900">
                        {i.name}
                      </h3>
                      <span
                        className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full ${statusClass[i.status]}`}
                      >
                        {statusLabel[i.status][LOCALE]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {i.description[LOCALE]}
                    </p>
                    <p className="text-xs text-gray-400">
                      Region: {i.region.join(", ")}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Integration fehlt?
          </h2>
          <p className="text-gray-500 mb-8">
            Sagen Sie uns, welche — wir priorisieren die Roadmap nach
            tatsächlichem Kundenbedarf.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/de/kontakt"
              className="inline-flex items-center px-8 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all"
            >
              Integration vorschlagen
            </Link>
            <Link
              href="/de/changelog"
              className="inline-flex items-center px-8 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-full transition-all"
            >
              Änderungsprotokoll ansehen
            </Link>
          </div>
        </div>
      </section>

      <FooterDe />
    </div>
  );
}
