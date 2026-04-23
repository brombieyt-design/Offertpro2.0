import type { Metadata } from "next";
import Link from "next/link";
import NavbarDe from "@/components/landing/de/NavbarDe";
import FooterDe from "@/components/landing/de/FooterDe";
import { cookies } from "@/content/cookies";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LAST_UPDATED = "2026-04-15";

export const metadata: Metadata = {
  title: "Cookie-Erklärung – Offert Pro",
  description:
    "Welche Cookies Offert Pro setzt und warum. Wir nutzen ein Minimum an essentiellen Cookies und cookie-freie Web-Analyse.",
  alternates: {
    canonical: `${SITE_URL}/de/cookies`,
    languages: {
      "sv-SE": `${SITE_URL}/cookies`,
      en: `${SITE_URL}/en/cookies`,
      de: `${SITE_URL}/de/cookies`,
      "x-default": `${SITE_URL}/cookies`,
    },
  },
  openGraph: {
    title: "Cookie-Erklärung – Offert Pro",
    description: "Welche Cookies wir setzen und warum.",
    url: `${SITE_URL}/de/cookies`,
    locale: "de",
    alternateLocale: ["sv_SE", "en"],
    type: "website",
  },
};

const categoryLabel: Record<string, string> = {
  essential: "Essentiell",
  preferences: "Einstellungen",
  analytics: "Analyse",
};

export default function CookiesPageDe() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarDe />

      <article className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">Rechtliches</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">Cookie-Erklärung</h1>
          <p className="text-sm text-gray-400 mb-12">
            Zuletzt aktualisiert:{" "}
            {new Date(LAST_UPDATED).toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <p>
              Wir setzen ein Minimum an Cookies ein, damit der Dienst
              funktioniert. Marketing-Cookies werden nicht verwendet.
              Web-Analyse läuft über{" "}
              <a href="https://plausible.io" rel="nofollow">Plausible</a> —
              keine Cookies, kein websiteübergreifendes Tracking.
            </p>

            <h2>Cookies, die wir setzen</h2>
          </div>

          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="text-left py-3 px-2 border-b border-gray-200">Name</th>
                  <th className="text-left py-3 px-2 border-b border-gray-200">Kategorie</th>
                  <th className="text-left py-3 px-2 border-b border-gray-200">Laufzeit</th>
                  <th className="text-left py-3 px-2 border-b border-gray-200">Zweck</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {cookies.map((c) => (
                  <tr key={c.name} className="align-top">
                    <td className="py-3 px-2 border-b border-gray-100 font-mono text-xs">{c.name}</td>
                    <td className="py-3 px-2 border-b border-gray-100">{categoryLabel[c.category]}</td>
                    <td className="py-3 px-2 border-b border-gray-100">{c.lifetime.de}</td>
                    <td className="py-3 px-2 border-b border-gray-100">{c.purpose.de}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <h2>So verwalten Sie Cookies</h2>
            <p>
              Essentielle Cookies können nicht deaktiviert werden, da sie für
              die Bereitstellung des Dienstes erforderlich sind.
              Einstellungs-Cookies lassen sich in Ihren Browsereinstellungen
              löschen. Da wir keine Drittanbieter-Analyse oder
              Marketing-Cookies verwenden, müssen Sie eine Einwilligung nicht
              separat verwalten.
            </p>

            <h2>Mehr</h2>
            <p>
              Siehe auch unsere{" "}
              <Link href="/de/datenschutz">Datenschutzerklärung</Link> für eine
              umfassendere Beschreibung der Verarbeitung personenbezogener
              Daten.
            </p>
          </div>
        </div>
      </article>

      <FooterDe />
    </div>
  );
}
