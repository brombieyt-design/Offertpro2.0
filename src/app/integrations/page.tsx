import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  integrations,
  categoryLabel,
  categoryOrder,
  statusLabel,
  type IntegrationCategory,
} from "@/content/integrations";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LOCALE = "sv" as const;

export const metadata: Metadata = {
  title: "Integrationer – Offert Pro",
  description:
    "Koppla Offert Pro till Fortnox, Visma, HubSpot, Stripe, BankID och 15+ andra verktyg. Full REST API, webhooks och Zapier för egna flöden.",
  alternates: {
    canonical: `${SITE_URL}/integrations`,
    languages: {
      "sv-SE": `${SITE_URL}/integrations`,
      en: `${SITE_URL}/en/integrations`,
      de: `${SITE_URL}/de/integrationen`,
      "x-default": `${SITE_URL}/integrations`,
    },
  },
  openGraph: {
    title: "Integrationer – Offert Pro",
    description: "Koppla ihop Offert Pro med din befintliga stack.",
    url: `${SITE_URL}/integrations`,
    locale: "sv_SE",
    alternateLocale: ["en", "de"],
    type: "website",
  },
};

const statusClass: Record<string, string> = {
  available: "text-emerald-700 bg-emerald-50",
  beta: "text-indigo-700 bg-indigo-50",
  planned: "text-gray-500 bg-gray-100",
};

export default function IntegrationsPage() {
  const grouped: Record<IntegrationCategory, typeof integrations> = {
    accounting: [], crm: [], payments: [], esign: [], email: [], automation: [], storage: [],
  };
  for (const i of integrations) grouped[i.category].push(i);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Integrationer
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Koppla ihop med din stack
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Offert Pro pratar med verktygen du redan använder — från bokföring
            och CRM till betalningar, e-signaturer och Zapier.
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
            Saknar du en integration?
          </h2>
          <p className="text-gray-500 mb-8">
            Berätta vilken — vi prioriterar roadmap efter faktiska kundbehov.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all"
            >
              Önska en integration
            </Link>
            <Link
              href="/changelog"
              className="inline-flex items-center px-8 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-full transition-all"
            >
              Se ändringsloggen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
