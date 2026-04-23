import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { cookies } from "@/content/cookies";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LAST_UPDATED = "2026-04-15";

export const metadata: Metadata = {
  title: "Cookie-policy – Offert Pro",
  description:
    "Vilka cookies Offert Pro använder och varför. Vi använder ett minimum av nödvändiga cookies och cookie-fri webbanalys.",
  alternates: {
    canonical: `${SITE_URL}/cookies`,
    languages: {
      "sv-SE": `${SITE_URL}/cookies`,
      en: `${SITE_URL}/en/cookies`,
      de: `${SITE_URL}/de/cookies`,
      "x-default": `${SITE_URL}/cookies`,
    },
  },
  openGraph: {
    title: "Cookie-policy – Offert Pro",
    description: "Vilka cookies vi använder och varför.",
    url: `${SITE_URL}/cookies`,
    locale: "sv_SE",
    alternateLocale: ["en", "de"],
    type: "website",
  },
};

const categoryLabel: Record<string, string> = {
  essential: "Nödvändig",
  preferences: "Inställningar",
  analytics: "Analys",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <article className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">Juridiskt</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">Cookie-policy</h1>
          <p className="text-sm text-gray-400 mb-12">
            Senast uppdaterad: {new Date(LAST_UPDATED).toLocaleDateString("sv-SE", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <p>
              Vi använder ett minimum av cookies för att tjänsten ska fungera.
              Marknadsföringscookies används inte. Webbanalys sker via{" "}
              <a href="https://plausible.io" rel="nofollow">Plausible</a>, som
              inte använder cookies eller spårar individer över webbplatser.
            </p>

            <h2>Cookies vi använder</h2>
          </div>

          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="text-left py-3 px-2 border-b border-gray-200">Namn</th>
                  <th className="text-left py-3 px-2 border-b border-gray-200">Kategori</th>
                  <th className="text-left py-3 px-2 border-b border-gray-200">Livstid</th>
                  <th className="text-left py-3 px-2 border-b border-gray-200">Syfte</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {cookies.map((c) => (
                  <tr key={c.name} className="align-top">
                    <td className="py-3 px-2 border-b border-gray-100 font-mono text-xs">{c.name}</td>
                    <td className="py-3 px-2 border-b border-gray-100">{categoryLabel[c.category]}</td>
                    <td className="py-3 px-2 border-b border-gray-100">{c.lifetime.sv}</td>
                    <td className="py-3 px-2 border-b border-gray-100">{c.purpose.sv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <h2>Hur du hanterar cookies</h2>
            <p>
              Nödvändiga cookies kan inte stängas av eftersom de krävs för att
              tjänsten ska fungera. Inställnings-cookies kan rensas i din
              webbläsares inställningar. Eftersom vi inte använder
              tredjepartsanalys eller marknadsföringscookies behöver du inte
              hantera samtycke separat.
            </p>

            <h2>Mer</h2>
            <p>
              Se även vår <Link href="/integritet">integritetspolicy</Link> för
              en bredare beskrivning av hur vi behandlar personuppgifter.
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
