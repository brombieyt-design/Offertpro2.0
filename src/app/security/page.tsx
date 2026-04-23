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
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Säkerhet & compliance – Offert Pro",
  description:
    "GDPR, EU-hostad data, kryptering i vila och vid överföring, eIDAS-signaturer, rollbaserad åtkomst och pågående ISO 27001-certifiering. Säkerhetsöversikt för Offert Pro.",
  alternates: {
    canonical: `${SITE_URL}/security`,
    languages: {
      "sv-SE": `${SITE_URL}/security`,
      en: `${SITE_URL}/en/security`,
      de: `${SITE_URL}/de/sicherheit`,
      "x-default": `${SITE_URL}/security`,
    },
  },
  openGraph: {
    title: "Säkerhet & compliance – Offert Pro",
    description:
      "GDPR-först, EU-hostad data, eIDAS-signaturer och rollbaserad åtkomst. Så skyddar vi din data.",
    url: `${SITE_URL}/security`,
    locale: "sv_SE",
    alternateLocale: ["en", "de"],
    type: "website",
  },
};

const sections = [
  {
    icon: Server,
    title: "EU-hostad data som standard",
    body:
      "Alla kunddata lagras och behandlas inom EU. Primär region är Frankfurt (AWS eu-central-1) med geografiskt separerad backup i Stockholm. Ingen data överförs till USA eller tredjeland utan uttryckligt samtycke.",
  },
  {
    icon: Lock,
    title: "Kryptering i vila och vid överföring",
    body:
      "All data krypteras med AES-256 i vila och TLS 1.3 vid överföring. Databasdiskar, backuper och objektlagring är krypterade. Filuppladdningar (logotyp, bilagor) lagras i krypterad objektlagring med signerade URL:er.",
  },
  {
    icon: UserCheck,
    title: "Autentisering och åtkomst",
    body:
      "Lösenord hashas med bcrypt (kostnadsfaktor 12). Tvåfaktorautentisering via TOTP ingår på alla planer. På Pro-planen stöder vi SAML 2.0 SSO via din egen IdP (Okta, Google Workspace, Microsoft Entra).",
  },
  {
    icon: KeyRound,
    title: "Rollbaserad åtkomst",
    body:
      "Admin-, Sales- och Viewer-roller på alla betalplaner. Fin-granulär åtkomst per offert och per kund finns på Pro. Samtliga åtkomstförändringar loggas i en oföränderlig audit-log.",
  },
  {
    icon: FileCheck,
    title: "eIDAS-signaturer",
    body:
      "Elektroniska signaturer följer eIDAS-förordningen (EU) 910/2014. SES och AES ingår på alla planer; QES (kvalificerad signatur) via BankID (Sverige, Norge, Finland) och D-Trust (Tyskland) ingår på Pro — juridiskt likvärdigt med handskriven underskrift enligt artikel 25(2).",
  },
  {
    icon: HardDrive,
    title: "Backup och återställning",
    body:
      "Punkt-i-tid-återställning upp till 30 dagar bakåt. Dagliga fullbackuper med 90 dagars retention. RTO 4 timmar, RPO 1 timme. Återställningstester körs kvartalsvis.",
  },
  {
    icon: Shield,
    title: "Compliance och certifieringar",
    body:
      "Fullständig GDPR-efterlevnad inklusive databehandlingsavtal (DPA) som standard. ISO 27001-certifiering är under formell revision med plan att slutföras 2026. SOC 2 Type I startar hösten 2026.",
  },
  {
    icon: Bell,
    title: "Incidentrapportering",
    body:
      "72-timmars notifieringsplikt enligt GDPR artikel 33. Ansvariga säkerhetskontakter: security@offertpro.se. PGP-nyckel tillgänglig på begäran. Responsible disclosure-program: rimliga belöningar för verifierade sårbarheter.",
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Säkerhet &amp; compliance
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Din data är säker hos oss
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            GDPR-först, EU-hostad som standard, krypterad både i vila och vid
            överföring. Så skyddar vi dina offerter, dina kunddata och dina
            signaturer.
          </p>
        </div>
      </section>

      {/* Sections */}
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

      {/* Sub-processors */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Underleverantörer (sub-processors)
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Vi använder följande underleverantörer för att leverera tjänsten.
            Alla lyder under databehandlingsavtal och är granskade för
            GDPR-efterlevnad.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="text-left py-3 border-b border-gray-200">Underleverantör</th>
                  <th className="text-left py-3 border-b border-gray-200">Syfte</th>
                  <th className="text-left py-3 border-b border-gray-200">Region</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr><td className="py-3 border-b border-gray-100">AWS (Amazon Web Services)</td><td className="py-3 border-b border-gray-100">Hosting, lagring, backup</td><td className="py-3 border-b border-gray-100">Frankfurt, Stockholm</td></tr>
                <tr><td className="py-3 border-b border-gray-100">Postmark</td><td className="py-3 border-b border-gray-100">Transaktionella e-postmeddelanden</td><td className="py-3 border-b border-gray-100">EU</td></tr>
                <tr><td className="py-3 border-b border-gray-100">Stripe</td><td className="py-3 border-b border-gray-100">Prenumerationsbetalningar</td><td className="py-3 border-b border-gray-100">Irland (EU)</td></tr>
                <tr><td className="py-3 border-b border-gray-100">BankID / D-Trust</td><td className="py-3 border-b border-gray-100">Kvalificerade e-signaturer</td><td className="py-3 border-b border-gray-100">Sverige / Tyskland</td></tr>
                <tr><td className="py-3">Sentry (EU)</td><td className="py-3">Felrapportering</td><td className="py-3">Frankfurt</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Frågor om säkerhet?
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Behöver ditt säkerhetsteam ett DPA, en SOC 2-roadmap eller en
            penetrationstestsammanfattning? Maila oss — vi svarar typiskt inom
            en arbetsdag.
          </p>
          <a
            href="mailto:security@offertpro.se"
            className="inline-flex items-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
          >
            security@offertpro.se
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <p className="mt-10 text-xs text-gray-400">
            Se även{" "}
            <Link href="/authors" className="underline hover:text-gray-600">
              redaktionen
            </Link>{" "}
            och{" "}
            <Link href="/blog" className="underline hover:text-gray-600">
              bloggen
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
