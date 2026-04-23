import type { Metadata } from "next";
import Link from "next/link";
import {
  Download,
  Image as ImageIcon,
  FileText,
  Mail,
  CheckCircle2,
  X,
} from "lucide-react";
import NavbarDe from "@/components/landing/de/NavbarDe";
import FooterDe from "@/components/landing/de/FooterDe";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Presse & Medien – Offert Pro",
  description:
    "Presseressourcen für Offert Pro: Logos, Produkt-Screenshots, Factsheet und Markenrichtlinien. Kontaktdaten für Presseanfragen.",
  alternates: {
    canonical: `${SITE_URL}/de/presse`,
    languages: {
      "sv-SE": `${SITE_URL}/press`,
      en: `${SITE_URL}/en/press`,
      de: `${SITE_URL}/de/presse`,
      "x-default": `${SITE_URL}/press`,
    },
  },
  openGraph: {
    title: "Presse & Medien – Offert Pro",
    description:
      "Logos, Screenshots, Factsheet und Pressekontakte von Offert Pro.",
    url: `${SITE_URL}/de/presse`,
    locale: "de",
    alternateLocale: ["sv_SE", "en"],
    type: "website",
  },
};

const factSheet = [
  { label: "Gegründet", value: "2024" },
  { label: "Hauptsitz", value: "Stockholm, Schweden" },
  { label: "Regionen", value: "Nordics, DACH, UK/Irland" },
  { label: "Produkt", value: "Angebots- und Rechnungsplattform" },
  { label: "Mitarbeitende", value: "12 (2026)" },
  { label: "Kunden", value: "500+ KMU" },
  { label: "Datenhosting", value: "EU (Frankfurt + Stockholm)" },
  { label: "Compliance", value: "DSGVO, eIDAS, ISO 27001 (laufend)" },
];

const pressMentions = [
  {
    outlet: "t3n",
    date: "2026-03-22",
    title: "Schwedisches Startup fordert PandaDoc in Europa heraus",
  },
  {
    outlet: "Handelsblatt",
    date: "2026-02-10",
    title: "Offert Pro: Angebotssoftware mit DSGVO-first und D-Trust-QES",
  },
  {
    outlet: "Gründerszene",
    date: "2025-12-20",
    title: "Der nordische Angriff auf den DACH-Angebotsmarkt",
  },
];

export default function PressePage() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarDe />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Presse &amp; Medien
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Presseressourcen
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Logos, Screenshots, Factsheets und Pressekontakte für Offert Pro.
            Alles, was Sie für die Berichterstattung über uns brauchen.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Über Offert Pro (Boilerplate)
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>Kurzfassung (1 Satz).</strong> Offert Pro ist eine
            europäische Angebots- und Rechnungsplattform für KMU, die mit
            weniger Aufwand mehr Aufträge gewinnen wollen.
          </p>
          <p className="text-gray-600 leading-relaxed">
            <strong>Langfassung (1 Absatz).</strong> Offert Pro wurde 2024 in
            Stockholm gegründet und unterstützt europäische KMU, Freelancer
            und Agenturen dabei, professionelle Angebote in Minuten statt
            Stunden zu erstellen, zu versenden und unterzeichnen zu lassen.
            Die Plattform bringt MwSt.-Handling inklusive Reverse Charge,
            eIDAS-konforme E-Signaturen (inklusive BankID für die nordischen
            Länder und D-Trust für Deutschland) und vollständig in der EU
            gehostete Infrastruktur mit — plus einen echten Free-Tarif zum
            Testen mit einem echten Kunden, bevor etwas bezahlt werden muss.
            Heute im Einsatz bei über 500 Unternehmen in den Nordics, DACH und
            dem Vereinigten Königreich.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Downloads</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="mailto:press@offertpro.se?subject=Logo-Paket"
              className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-indigo-200 hover:shadow-lg transition-all text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 mb-4">
                <ImageIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Logo-Paket
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                SVG, PNG (hell/dunkel), Wortmarke + Symbol
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600">
                <Download className="h-4 w-4" />
                Anfragen (.zip)
              </span>
            </a>
            <a
              href="mailto:press@offertpro.se?subject=Produkt-Screenshots"
              className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-indigo-200 hover:shadow-lg transition-all text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 mb-4">
                <ImageIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Produkt-Screenshots
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Dashboard, Editor, Kundenansicht — 4K PNG
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600">
                <Download className="h-4 w-4" />
                Anfragen (.zip)
              </span>
            </a>
            <a
              href="mailto:press@offertpro.se?subject=Factsheet"
              className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-indigo-200 hover:shadow-lg transition-all text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 mb-4">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Factsheet (PDF)
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Kennzahlen, Meilensteine, Leitung
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600">
                <Download className="h-4 w-4" />
                Anfragen (.pdf)
              </span>
            </a>
          </div>
          <p className="mt-6 text-xs text-gray-400 text-center">
            Materialien werden innerhalb eines Werktags per E-Mail zugesendet.
            Hochauflösende Versionen auf Anfrage verfügbar.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Factsheet</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
            {factSheet.map((f) => (
              <div
                key={f.label}
                className="flex justify-between items-baseline border-b border-gray-100 pb-3"
              >
                <dt className="text-sm text-gray-500">{f.label}</dt>
                <dd className="text-sm font-medium text-gray-900 text-right">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Markenrichtlinien
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Richtig
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Schreibweise &bdquo;Offert Pro&ldquo; mit Leerzeichen und beiden Wörtern groß</li>
                <li>Originalproportionen des Logos bewahren</li>
                <li>Mindesthöhe 16 px auf digitalen Flächen</li>
                <li>Mindestens 8 px Freiraum um das Logo</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                <X className="h-4 w-4" /> Bitte nicht
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>&bdquo;OffertPro&ldquo;, &bdquo;offertpro&ldquo; oder &bdquo;Offertpro&ldquo; schreiben</li>
                <li>Logo drehen, verzerren oder mit Effekten versehen</li>
                <li>Umfärben außerhalb der freigegebenen Markenfarben</li>
                <li>Logo auf kontrastarmen Hintergründen platzieren</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">In den Medien</h2>
          <ul className="space-y-4">
            {pressMentions.map((m) => (
              <li
                key={m.title}
                className="flex items-baseline gap-4 border-b border-gray-100 pb-4 last:border-b-0"
              >
                <time className="text-xs text-gray-400 shrink-0 w-24 tabular-nums">
                  {new Date(m.date).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <div>
                  <p className="text-sm font-medium text-indigo-600">{m.outlet}</p>
                  <p className="text-sm text-gray-700 mt-0.5">{m.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Pressekontakt
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Für Interviews, Statements oder Anfragen — schreiben Sie uns an.
            Wir antworten typischerweise am selben Tag.
          </p>
          <a
            href="mailto:press@offertpro.se"
            className="inline-flex items-center gap-2 px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            <Mail className="h-4 w-4" />
            press@offertpro.se
          </a>
          <p className="mt-10 text-xs text-gray-400">
            Mehr über uns auf{" "}
            <Link href="/de/authors" className="underline hover:text-gray-600">
              dem Redaktionsteam
            </Link>{" "}
            und im{" "}
            <Link href="/de/blog" className="underline hover:text-gray-600">
              Blog
            </Link>
            .
          </p>
        </div>
      </section>

      <FooterDe />
    </div>
  );
}
