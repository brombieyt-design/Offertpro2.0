import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileCheck, ShieldCheck, Globe2 } from "lucide-react";
import NavbarDe from "@/components/landing/de/NavbarDe";
import FooterDe from "@/components/landing/de/FooterDe";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LAST_UPDATED = "2026-04-15";

export const metadata: Metadata = {
  title: "Auftragsverarbeitungsvertrag (AVV) – Offert Pro",
  description:
    "Der AVV von Offert Pro nach Art. 28 DSGVO. Vorgefertigter Mustervertrag, eIDAS-Signatur unserer Vorlage oder wir signieren Ihre.",
  alternates: {
    canonical: `${SITE_URL}/de/avv`,
    languages: {
      "sv-SE": `${SITE_URL}/dpa`,
      en: `${SITE_URL}/en/dpa`,
      de: `${SITE_URL}/de/avv`,
      "x-default": `${SITE_URL}/dpa`,
    },
  },
  openGraph: {
    title: "Auftragsverarbeitungsvertrag – Offert Pro",
    description: "AVV nach Art. 28 DSGVO — Mustervertrag oder eigene Vorlage.",
    url: `${SITE_URL}/de/avv`,
    locale: "de",
    alternateLocale: ["sv_SE", "en"],
    type: "website",
  },
};

export default function AvvPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarDe />

      <article className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">Rechtliches</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Auftragsverarbeitungsvertrag (AVV)
          </h1>
          <p className="text-sm text-gray-400 mb-12">
            Zuletzt aktualisiert:{" "}
            {new Date(LAST_UPDATED).toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <p>
              Wenn Sie Offert Pro zur Verarbeitung personenbezogener Daten
              nutzen (z. B. Kundendaten auf Angeboten und Rechnungen), sind
              Sie <em>Verantwortliche/r</em> und wir Ihr
              <em> Auftragsverarbeiter</em> nach Art. 28 DSGVO. Dieser Vertrag
              beschreibt, wie wir die Daten in Ihrem Auftrag verarbeiten.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <a
              href="mailto:legal@offertpro.se?subject=AVV-Mustervertrag"
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all"
            >
              <FileCheck className="h-6 w-6 text-indigo-600 mb-3" />
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                AVV-Mustervertrag anfragen
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Unser vorgefertigter Mustervertrag — gilt automatisch für
                jeden Kunden
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600">
                <Download className="h-4 w-4" />
                Per E-Mail anfragen
              </span>
            </a>
            <a
              href="mailto:legal@offertpro.se?subject=AVV-Signatur"
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all"
            >
              <ShieldCheck className="h-6 w-6 text-indigo-600 mb-3" />
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Unseren AVV signieren
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Wir senden eine eIDAS-Signaturanforderung innerhalb von 24
                Stunden
              </p>
              <span className="text-sm font-medium text-indigo-600">
                legal@offertpro.se
              </span>
            </a>
            <a
              href="mailto:legal@offertpro.se?subject=Eigener AVV"
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all"
            >
              <Globe2 className="h-6 w-6 text-indigo-600 mb-3" />
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Wir signieren Ihren
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Senden Sie Ihre Standardvorlage — wir prüfen und retournieren
                signiert
              </p>
              <span className="text-sm font-medium text-indigo-600">
                legal@offertpro.se
              </span>
            </a>
          </div>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <h2>Was der AVV regelt</h2>
            <ul>
              <li><strong>Art und Zweck der Verarbeitung</strong> — wir verarbeiten die Daten ausschließlich zur Bereitstellung des Dienstes nach Ihren Weisungen.</li>
              <li><strong>Kategorien betroffener Personen und Daten</strong> — typischerweise: Ihre Kundinnen und Kunden sowie deren Kontaktdaten auf Angeboten/Rechnungen.</li>
              <li><strong>Technische und organisatorische Maßnahmen (TOMs)</strong> — beschrieben in der Anlage; Zusammenfassung auf <Link href="/de/sicherheit">/de/sicherheit</Link>.</li>
              <li><strong>Unterauftragsverarbeiter</strong> — die Liste auf <Link href="/de/sicherheit">/de/sicherheit</Link> ist Bestandteil des AVV; wir kündigen einen neuen 30 Tage im Voraus an.</li>
              <li><strong>Internationale Übermittlungen</strong> — nur innerhalb der EU. Standardvertragsklauseln gelten, falls wir jemals außerhalb der EU verarbeiten müssen.</li>
              <li><strong>Unterstützung bei Betroffenenrechten</strong> — wir unterstützen bei Auskunfts-, Lösch- und Datenübertragbarkeitsanfragen.</li>
              <li><strong>Datenschutzverletzungen</strong> — Meldung innerhalb von 72 Stunden gemäß Art. 33.</li>
              <li><strong>Auditrecht</strong> — Sie oder ein/e unabhängige/r Auditor/in dürfen die Sicherheitsmaßnahmen einmal pro Jahr prüfen.</li>
            </ul>

            <h2>Wann der AVV gilt</h2>
            <p>
              Der AVV tritt automatisch in Kraft, sobald Sie einen
              Bezahlvertrag mit uns abschließen. Free-Tier-Nutzer/innen
              unterliegen den gleichen Bedingungen, soweit anwendbar.
            </p>

            <h2>Mehr</h2>
            <p>
              Siehe auch unsere <Link href="/de/agb">AGB</Link>,{" "}
              <Link href="/de/datenschutz">Datenschutzerklärung</Link> und{" "}
              <Link href="/de/sicherheit">Sicherheitsübersicht</Link>.
            </p>
          </div>
        </div>
      </article>

      <FooterDe />
    </div>
  );
}
