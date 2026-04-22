import type { Metadata } from "next";
import {
  Building2,
  Users,
  BarChart3,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Star,
} from "lucide-react";
import NavbarDe from "@/components/landing/de/NavbarDe";
import FooterDe from "@/components/landing/de/FooterDe";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

const benefits = [
  {
    icon: Users,
    title: "Team-Zusammenarbeit",
    description:
      "Das gesamte Team arbeitet in einer Plattform mit rollenbasiertem Zugriff und geteilter Pipeline.",
  },
  {
    icon: BarChart3,
    title: "Fortgeschrittene Analysen",
    description:
      "Detaillierte Statistiken zu Angeboten, Annahmerate und Umsatz. Export nach Excel möglich.",
  },
  {
    icon: Shield,
    title: "Enterprise-Sicherheit",
    description:
      "SSO/SAML-Login, eIDAS-QES-Signaturen und Verschlüsselung in Ruhe und bei der Übertragung.",
  },
  {
    icon: Zap,
    title: "Integrationen",
    description:
      "Anbindung an DATEV, CRM-Systeme, Zapier und über 100 weitere Werkzeuge.",
  },
  {
    icon: Globe,
    title: "Eigene Domain",
    description:
      "Versenden Sie Angebote von Ihrer eigenen Domain mit White-Label-Branding in allen Dokumenten.",
  },
  {
    icon: Building2,
    title: "Dedizierter Support",
    description:
      "Persönliche Ansprechperson, Onboarding-Hilfe und priorisierter Support rund um die Uhr.",
  },
];

const stats = [
  { value: "40 %", label: "Höhere Annahmerate" },
  { value: "2x", label: "Schnellerer Angebotsprozess" },
  { value: "500+", label: "Unternehmenskunden" },
  { value: "98 %", label: "Kundenzufriedenheit" },
];

const caseStudies = [
  {
    company: "Meier Bau GmbH",
    quote:
      "Mit Offert Pro haben wir den gesamten Angebotsprozess zentralisiert. Unsere 15 Außendienstmitarbeitenden sparen im Schnitt 8 Stunden pro Woche.",
    name: "Thomas Meier",
    role: "Geschäftsführer",
    rating: 5,
  },
  {
    company: "Digital Vision Berlin",
    quote:
      "Wir sind von verlorenen Angeboten in E-Mail-Ketten zu voller Kontrolle mit Pipeline und Follow-ups gewechselt.",
    name: "Lisa Schneider",
    role: "COO",
    rating: 5,
  },
  {
    company: "Cleantech Solutions Austria",
    quote:
      "Der Enterprise-Tarif mit SSO und API-Integration passte perfekt zu unseren Sicherheitsanforderungen.",
    name: "Andreas Huber",
    role: "CTO",
    rating: 5,
  },
];

export const metadata: Metadata = {
  title:
    "Für Unternehmen – Skalieren Sie Ihren Angebotsprozess mit dem ganzen Team",
  description:
    "Offert Pro für Unternehmen: 40 % höhere Annahmerate, 2x schnellerer Angebotsprozess. Team-Zusammenarbeit, Rollenverwaltung, API-Integrationen und dedizierter Support.",
  alternates: {
    canonical: `${SITE_URL}/de/fuer-unternehmen`,
    languages: {
      "sv-SE": `${SITE_URL}/for-foretag`,
      de: `${SITE_URL}/de/fuer-unternehmen`,
      "x-default": `${SITE_URL}/for-foretag`,
    },
  },
  openGraph: {
    title: "Für Unternehmen – Offert Pro",
    description:
      "Skalieren Sie Ihren Angebotsprozess. 40 % höhere Annahmerate, Team-Zusammenarbeit, API-Integrationen.",
    url: `${SITE_URL}/de/fuer-unternehmen`,
    locale: "de",
    alternateLocale: ["sv_SE"],
    type: "website",
  },
};

export default function FuerUnternehmenPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarDe />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Für Unternehmen
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Skalieren Sie Ihren Angebotsprozess
            <br />
            <span className="text-gray-400">mit dem ganzen Team</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Offert Pro für Unternehmen bietet Team-Zusammenarbeit, fortgeschrittene
            Analysen und Enterprise-Funktionen, um mehr Aufträge zu gewinnen.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup"
              className="inline-flex items-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
            >
              Demo vereinbaren
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/de/pricing"
              className="inline-flex items-center px-10 py-4 text-base font-medium text-gray-600 bg-white hover:bg-gray-50 rounded-full transition-all duration-300 border border-gray-200"
            >
              Preise ansehen
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Gebaut für wachsende Unternehmen
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Alles, was Ihr Team braucht, um Angebote effizient im großen
              Maßstab zu verwalten.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-gray-50/80 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white mb-5 shadow-sm">
                  <b.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Unternehmen, die uns vertrauen
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Sehen Sie, wie andere Unternehmen ihren Angebotsprozess
              transformiert haben.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <div
                key={cs.company}
                className="bg-white rounded-3xl p-10 border border-gray-100/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: cs.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  &bdquo;{cs.quote}&ldquo;
                </p>
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">
                    {cs.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    {cs.role}, {cs.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-100 px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Bereit zum Skalieren?
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
              Vereinbaren Sie eine kostenlose Demo und sehen Sie, wie Offert Pro
              Ihrem Unternehmen hilft, mehr Aufträge zu gewinnen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/signup"
                className="inline-flex items-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
              >
                Demo vereinbaren
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="/de/pricing"
                className="inline-flex items-center px-10 py-4 text-base font-medium text-gray-600 bg-white hover:bg-gray-50 rounded-full transition-all duration-300 border border-gray-200"
              >
                Alle Tarife ansehen
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterDe />
    </div>
  );
}
