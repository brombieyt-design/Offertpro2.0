import type { Metadata } from "next";
import {
  ClipboardEdit,
  MailCheck,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
} from "lucide-react";
import NavbarDe from "@/components/landing/de/NavbarDe";
import FooterDe from "@/components/landing/de/FooterDe";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

const steps = [
  {
    number: "01",
    title: "Bedarf beschreiben",
    description:
      "Tragen Sie in wenigen Minuten ein, wobei Sie Unterstützung brauchen. Kategorie, Anforderungen und Zeitrahmen — fertig.",
    details: [
      "Kategorie und Branche wählen",
      "Projekt im Freitext beschreiben",
      "Budget und Zeitplan angeben",
      "Anhänge hochladen",
    ],
    icon: ClipboardEdit,
  },
  {
    number: "02",
    title: "Passende Angebote erhalten",
    description:
      "Wir matchen Sie mit den passendsten Anbietern basierend auf Ihren Anforderungen. Maßgeschneiderte Angebote landen direkt in Ihrem Posteingang.",
    details: [
      "KI-gestütztes Matching",
      "Qualitätsgeprüfte Anbieter",
      "Angebote innerhalb von 24 Stunden",
      "Vergleichbares Format",
    ],
    icon: MailCheck,
  },
  {
    number: "03",
    title: "Vergleichen und auswählen",
    description:
      "Vergleichen Sie Preise, Bewertungen und Bedingungen nebeneinander. Wählen Sie das passende Angebot und signieren Sie digital — eIDAS-konform.",
    details: [
      "Seite-an-Seite-Vergleich",
      "Transparente Preise",
      "Kundenbewertungen und Rezensionen",
      "Digitale Signatur (eIDAS)",
    ],
    icon: BarChart3,
  },
];

const benefits = [
  {
    title: "Zeit sparen",
    description: "Kein Telefon-Ping-Pong mehr. Alles passiert automatisch.",
    icon: Clock,
  },
  {
    title: "Bessere Preise",
    description:
      "Wettbewerb zwischen Anbietern führt zu besseren Konditionen und Preisen.",
    icon: Zap,
  },
  {
    title: "Qualitätsgeprüft",
    description:
      "Alle Anbieter werden geprüft und verifiziert, bevor sie Angebote abgeben dürfen.",
    icon: Shield,
  },
  {
    title: "Komplett kostenlos",
    description:
      "Angebote empfangen kostet nichts. Sie zahlen nur, wenn Sie weitermachen.",
    icon: CheckCircle2,
  },
];

export const metadata: Metadata = {
  title: "Funktionsweise – Angebote in 3 einfachen Schritten erstellen",
  description:
    "Vom Bedarf zum Angebot in drei einfachen Schritten. Vorlage wählen, Inhalt anpassen und professionelle Angebote direkt an Kunden senden. Öffnungen in Echtzeit verfolgen.",
  alternates: {
    canonical: `${SITE_URL}/de/funktionsweise`,
    languages: {
      "sv-SE": `${SITE_URL}/hur-det-fungerar`,
      de: `${SITE_URL}/de/funktionsweise`,
      "x-default": `${SITE_URL}/hur-det-fungerar`,
    },
  },
  openGraph: {
    title: "Funktionsweise – Offert Pro",
    description:
      "Angebote in 3 einfachen Schritten erstellen. Vorlage wählen, anpassen, senden.",
    url: `${SITE_URL}/de/funktionsweise`,
    locale: "de",
    alternateLocale: ["sv_SE"],
    type: "website",
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "So erstellen Sie ein professionelles Angebot mit Offert Pro",
  description:
    "Erstellen und versenden Sie professionelle Angebote in drei einfachen Schritten mit Offert Pro.",
  inLanguage: "de",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Bedarf beschreiben",
      text: "Tragen Sie eine einfache Beschreibung ein, wobei Sie Unterstützung brauchen. Kategorie wählen, Projekt beschreiben und Budget angeben.",
      url: `${SITE_URL}/de/funktionsweise#schritt-1`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Passende Angebote erhalten",
      text: "Wir matchen Sie mit den passendsten Anbietern. Sie erhalten maßgeschneiderte Angebote innerhalb von 24 Stunden direkt in Ihrem Posteingang.",
      url: `${SITE_URL}/de/funktionsweise#schritt-2`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Vergleichen und auswählen",
      text: "Vergleichen Sie Preise, Bewertungen und Bedingungen nebeneinander. Wählen Sie das beste Angebot und signieren Sie digital per eIDAS-E-Signatur.",
      url: `${SITE_URL}/de/funktionsweise#schritt-3`,
    },
  ],
};

export default function FunktionsweisePage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <NavbarDe />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Funktionsweise
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Vom Bedarf zum Angebot
            <br />
            <span className="text-gray-400">in drei einfachen Schritten</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Wir machen es einfach, den richtigen Anbieter zu finden. Bedarf
            beschreiben, Angebote empfangen und das beste auswählen — alles an
            einem Ort.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-5xl space-y-16">
          {steps.map((step, i) => (
            <div
              key={step.number}
              id={`schritt-${i + 1}`}
              className={`flex flex-col md:flex-row items-start gap-12 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl font-extralight text-indigo-200">
                    {step.number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
                    <step.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6">
                  {step.description}
                </p>
                <ul className="space-y-3">
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >
                      <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 flex items-center justify-center min-h-[280px]">
                  <step.icon className="h-24 w-24 text-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Warum Offert Pro?
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Wir nehmen den Aufwand und geben Ihnen mehr Zeit für das
              Wesentliche.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 mx-auto mb-5">
                  <b.icon className="h-6 w-6 text-indigo-600" />
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

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Bereit für Ihr erstes Angebot?
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            In unter 2 Minuten kostenlos starten. Keine Kreditkarte nötig.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
          >
            Kostenlos starten
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      <FooterDe />
    </div>
  );
}
