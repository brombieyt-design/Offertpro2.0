import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Shield, Newspaper, Gavel, ArrowRight } from "lucide-react";
import NavbarDe from "@/components/landing/de/NavbarDe";
import FooterDe from "@/components/landing/de/FooterDe";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Kontakt – Offert Pro",
  description:
    "Offert Pro kontaktieren. Support, Vertrieb, Recht, Sicherheit und Presse — die richtige E-Mail-Adresse für Ihr Anliegen.",
  alternates: {
    canonical: `${SITE_URL}/de/kontakt`,
    languages: {
      "sv-SE": `${SITE_URL}/kontakt`,
      en: `${SITE_URL}/en/contact`,
      de: `${SITE_URL}/de/kontakt`,
      "x-default": `${SITE_URL}/kontakt`,
    },
  },
  openGraph: {
    title: "Kontakt – Offert Pro",
    description: "Die richtige E-Mail-Adresse für Ihr Anliegen.",
    url: `${SITE_URL}/de/kontakt`,
    locale: "de",
    alternateLocale: ["sv_SE", "en"],
    type: "website",
  },
};

const channels = [
  {
    icon: MessageSquare,
    title: "Allgemeiner Support",
    email: "hello@offertpro.se",
    description: "Produktfragen, Einstieg oder Fehlerbehebung. Antwort typischerweise innerhalb eines Werktags.",
  },
  {
    icon: Mail,
    title: "Vertrieb & Pro-Tarife",
    email: "sales@offertpro.se",
    description: "Angebote für Teams oder Enterprise, Demos, Fragen zu SSO, QES und API.",
  },
  {
    icon: Gavel,
    title: "Recht & AVV",
    email: "legal@offertpro.se",
    description: "AVV-Signatur, Prüfung Ihrer Vorlage, Anfragen nach Art. 15–21 DSGVO.",
  },
  {
    icon: Shield,
    title: "Sicherheit",
    email: "security@offertpro.se",
    description: "Schwachstellenberichte, Vorfallsmeldungen, Fragen zur ISO-27001-Roadmap oder Pentest-Zusammenfassung.",
  },
  {
    icon: Newspaper,
    title: "Presse & Medien",
    email: "press@offertpro.se",
    description: "Interviews, Statements, Logo-Pakete und Screenshots. Siehe auch Presseraum.",
  },
];

export default function KontaktPageDe() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Offert Pro AB",
    url: SITE_URL,
    contactPoint: channels.map((c) => ({
      "@type": "ContactPoint",
      email: c.email,
      contactType: c.title,
      areaServed: ["DE", "AT", "CH", "EU"],
      availableLanguage: ["de", "en", "sv"],
    })),
    address: {
      "@type": "PostalAddress",
      addressCountry: "SE",
      addressLocality: "Stockholm",
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <NavbarDe />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Kontakt
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            So erreichen Sie uns
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Die richtige E-Mail-Adresse für Ihr Anliegen — wir antworten auf
            Deutsch, Englisch oder Schwedisch. Antwortzeit in der Regel
            innerhalb eines Werktags.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {channels.map((c) => (
            <a
              key={c.email}
              href={`mailto:${c.email}`}
              className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 shrink-0">
                <c.icon className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-gray-900">{c.title}</h2>
                <p className="text-sm font-medium text-indigo-600 mt-0.5 truncate">{c.email}</p>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{c.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Postanschrift</h2>
          <address className="not-italic text-gray-600 leading-relaxed">
            Offert Pro AB<br />
            Reg.-Nr. 559123-4567<br />
            Stockholm, Schweden
          </address>
          <p className="mt-8 text-sm text-gray-400">
            Für zeitkritische Sicherheitsmeldungen nutzen Sie direkt{" "}
            <a href="mailto:security@offertpro.se" className="underline hover:text-gray-600">
              security@offertpro.se
            </a>
            . Siehe auch unsere{" "}
            <Link href="/de/sicherheit" className="underline hover:text-gray-600">
              Sicherheitsübersicht
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lieber selbst nachschlagen?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/de/faq"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-full transition-all"
            >
              FAQ
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/de/status"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-full transition-all"
            >
              Systemstatus
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <FooterDe />
    </div>
  );
}
