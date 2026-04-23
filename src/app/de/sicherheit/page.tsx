import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Lock,
  Server,
  FileCheck,
  KeyRound,
  UserCheck,
  Bell,
  HardDrive,
  ArrowRight,
} from "lucide-react";
import NavbarDe from "@/components/landing/de/NavbarDe";
import FooterDe from "@/components/landing/de/FooterDe";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Sicherheit & Compliance – Offert Pro",
  description:
    "DSGVO, EU-gehostete Daten, Verschlüsselung ruhend und bei Übertragung, eIDAS-Signaturen, rollenbasierter Zugriff und laufende ISO-27001-Zertifizierung. Sicherheitsübersicht von Offert Pro.",
  alternates: {
    canonical: `${SITE_URL}/de/sicherheit`,
    languages: {
      "sv-SE": `${SITE_URL}/security`,
      en: `${SITE_URL}/en/security`,
      de: `${SITE_URL}/de/sicherheit`,
      "x-default": `${SITE_URL}/security`,
    },
  },
  openGraph: {
    title: "Sicherheit & Compliance – Offert Pro",
    description:
      "DSGVO-first, EU-gehostet, eIDAS-Signaturen und rollenbasierter Zugriff. So schützen wir Ihre Daten.",
    url: `${SITE_URL}/de/sicherheit`,
    locale: "de",
    alternateLocale: ["sv_SE", "en"],
    type: "website",
  },
};

const sections = [
  {
    icon: Server,
    title: "EU-gehostet als Standard",
    body:
      "Alle Kundendaten werden innerhalb der EU gespeichert und verarbeitet. Primärregion ist Frankfurt (AWS eu-central-1), mit geografisch getrenntem Backup in Stockholm. Keine Datenübertragung in die USA oder Drittländer ohne ausdrückliche Einwilligung.",
  },
  {
    icon: Lock,
    title: "Verschlüsselung ruhend und bei Übertragung",
    body:
      "Alle Daten werden mit AES-256 ruhend und TLS 1.3 bei Übertragung verschlüsselt. Datenbank-Volumes, Backups und Objektspeicher sind verschlüsselt. Datei-Uploads (Logo, Anhänge) liegen im verschlüsselten Objektspeicher mit signierten URLs.",
  },
  {
    icon: UserCheck,
    title: "Authentifizierung und Zugriff",
    body:
      "Passwörter werden mit bcrypt (Kostenfaktor 12) gehasht. Zwei-Faktor-Authentifizierung via TOTP ist in jedem Tarif enthalten. Im Pro-Tarif unterstützen wir SAML-2.0-SSO mit Ihrem eigenen IdP (Okta, Google Workspace, Microsoft Entra).",
  },
  {
    icon: KeyRound,
    title: "Rollenbasierte Zugriffskontrolle",
    body:
      "Admin-, Sales- und Viewer-Rollen in jedem Bezahltarif. Feingranulare Zugriffsrechte pro Angebot und pro Kunde sind im Pro-Tarif verfügbar. Jede Zugriffsänderung wird in einem unveränderlichen Audit-Log protokolliert.",
  },
  {
    icon: FileCheck,
    title: "eIDAS-Signaturen",
    body:
      "Elektronische Signaturen nach eIDAS-Verordnung (EU) 910/2014. EES und FES in jedem Tarif; QES (qualifizierte Signaturen) über BankID (Schweden, Norwegen, Finnland) und D-Trust (Deutschland) sind im Pro-Tarif enthalten — rechtlich der handschriftlichen Unterschrift gleichgestellt nach Artikel 25 Absatz 2.",
  },
  {
    icon: HardDrive,
    title: "Backup und Wiederherstellung",
    body:
      "Punkt-in-Zeit-Wiederherstellung bis 30 Tage zurück. Tägliche Vollbackups mit 90 Tagen Aufbewahrung. RTO 4 Stunden, RPO 1 Stunde. Wiederherstellungstests quartalsweise.",
  },
  {
    icon: Shield,
    title: "Compliance und Zertifizierungen",
    body:
      "Vollständige DSGVO-Konformität inklusive Auftragsverarbeitungsvertrag (AV-Vertrag) als Standard. ISO-27001-Zertifizierung läuft in formeller Prüfung, geplanter Abschluss 2026. SOC 2 Type I startet Herbst 2026.",
  },
  {
    icon: Bell,
    title: "Vorfallsmeldung",
    body:
      "72-Stunden-Meldepflicht nach Artikel 33 DSGVO. Sicherheitskontakt: security@offertpro.se. PGP-Schlüssel auf Anfrage. Responsible-Disclosure-Programm: angemessene Belohnungen für verifizierte Schwachstellen.",
  },
];

export default function SicherheitPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarDe />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Sicherheit &amp; Compliance
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Ihre Daten sind bei uns sicher
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            DSGVO-first, EU-gehostet als Standard, verschlüsselt ruhend und bei
            Übertragung. So schützen wir Ihre Angebote, Kundendaten und
            Signaturen.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 mb-5">
                <s.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {s.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Unterauftragsverarbeiter
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Wir setzen folgende Unterauftragsverarbeiter für die Bereitstellung
            des Dienstes ein. Alle unterliegen Auftragsverarbeitungsverträgen
            und sind auf DSGVO-Konformität geprüft.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="text-left py-3 border-b border-gray-200">Anbieter</th>
                  <th className="text-left py-3 border-b border-gray-200">Zweck</th>
                  <th className="text-left py-3 border-b border-gray-200">Region</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr><td className="py-3 border-b border-gray-100">AWS (Amazon Web Services)</td><td className="py-3 border-b border-gray-100">Hosting, Speicher, Backup</td><td className="py-3 border-b border-gray-100">Frankfurt, Stockholm</td></tr>
                <tr><td className="py-3 border-b border-gray-100">Postmark</td><td className="py-3 border-b border-gray-100">Transaktionale E-Mails</td><td className="py-3 border-b border-gray-100">EU</td></tr>
                <tr><td className="py-3 border-b border-gray-100">Stripe</td><td className="py-3 border-b border-gray-100">Abonnementabrechnung</td><td className="py-3 border-b border-gray-100">Irland (EU)</td></tr>
                <tr><td className="py-3 border-b border-gray-100">BankID / D-Trust</td><td className="py-3 border-b border-gray-100">Qualifizierte E-Signaturen</td><td className="py-3 border-b border-gray-100">Schweden / Deutschland</td></tr>
                <tr><td className="py-3">Sentry (EU)</td><td className="py-3">Fehler-Monitoring</td><td className="py-3">Frankfurt</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Fragen zur Sicherheit?
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Braucht Ihr Sicherheitsteam einen AV-Vertrag, eine SOC-2-Roadmap
            oder eine Pentest-Zusammenfassung? Schreiben Sie uns — wir
            antworten typischerweise innerhalb eines Werktags.
          </p>
          <a
            href="mailto:security@offertpro.se"
            className="inline-flex items-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
          >
            security@offertpro.se
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <p className="mt-10 text-xs text-gray-400">
            Siehe auch das{" "}
            <Link href="/de/authors" className="underline hover:text-gray-600">
              Redaktionsteam
            </Link>{" "}
            und den{" "}
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
