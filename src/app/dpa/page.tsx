import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileCheck, ShieldCheck, Globe2 } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LAST_UPDATED = "2026-04-15";

export const metadata: Metadata = {
  title: "Personuppgiftsbiträdesavtal (DPA) – Offert Pro",
  description:
    "Offert Pros DPA enligt artikel 28 GDPR. Standardiserat avtal som du kan ladda ner och signera elektroniskt — eller vi signerar din egen mall.",
  alternates: {
    canonical: `${SITE_URL}/dpa`,
    languages: {
      "sv-SE": `${SITE_URL}/dpa`,
      en: `${SITE_URL}/en/dpa`,
      de: `${SITE_URL}/de/avv`,
      "x-default": `${SITE_URL}/dpa`,
    },
  },
  openGraph: {
    title: "Personuppgiftsbiträdesavtal – Offert Pro",
    description: "DPA enligt artikel 28 GDPR — standardavtal eller din egen.",
    url: `${SITE_URL}/dpa`,
    locale: "sv_SE",
    alternateLocale: ["en", "de"],
    type: "website",
  },
};

export default function DpaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <article className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">Juridiskt</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Personuppgiftsbiträdesavtal (DPA)
          </h1>
          <p className="text-sm text-gray-400 mb-12">
            Senast uppdaterad:{" "}
            {new Date(LAST_UPDATED).toLocaleDateString("sv-SE", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <p>
              När du använder Offert Pro för att hantera personuppgifter
              (t.ex. kunduppgifter på offerter och fakturor) är du
              <em> personuppgiftsansvarig</em> och vi är ditt
              <em> personuppgiftsbiträde</em> enligt artikel 28 GDPR. Detta
              avtal beskriver hur vi behandlar uppgifterna för din räkning.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <a
              href="/legal/offert-pro-dpa-sv.pdf"
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all"
            >
              <FileCheck className="h-6 w-6 text-indigo-600 mb-3" />
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Ladda ner DPA (PDF)
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Vår förskrivna mall — gäller automatiskt för alla kunder
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600">
                <Download className="h-4 w-4" />
                Ladda ner
              </span>
            </a>
            <a
              href="mailto:legal@offertpro.se?subject=DPA-signering"
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all"
            >
              <ShieldCheck className="h-6 w-6 text-indigo-600 mb-3" />
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Signera vår DPA
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Vi skickar en eIDAS-signering på under 24 timmar
              </p>
              <span className="text-sm font-medium text-indigo-600">
                legal@offertpro.se
              </span>
            </a>
            <a
              href="mailto:legal@offertpro.se?subject=Egen DPA"
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all"
            >
              <Globe2 className="h-6 w-6 text-indigo-600 mb-3" />
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Vi signerar din mall
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Skicka in din standardmall — vi granskar och returnerar
              </p>
              <span className="text-sm font-medium text-indigo-600">
                legal@offertpro.se
              </span>
            </a>
          </div>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <h2>Vad DPA:n omfattar</h2>
            <ul>
              <li><strong>Behandlingens art och syfte</strong> — vi behandlar uppgifterna enbart för att leverera Tjänsten enligt dina instruktioner.</li>
              <li><strong>Kategorier av registrerade och uppgifter</strong> — typiskt: dina kunder och deras kontaktuppgifter på offerter/fakturor.</li>
              <li><strong>Tekniska och organisatoriska säkerhetsåtgärder</strong> — beskrivs i bilaga; sammanfattning på <Link href="/security">/security</Link>.</li>
              <li><strong>Underbiträden</strong> — listan på <Link href="/security">/security</Link> är en del av DPA:n; vi notifierar 30 dagar innan vi tillägger ett nytt.</li>
              <li><strong>Internationella överföringar</strong> — endast inom EU. Standardavtalsklausuler tillämpas om vi någonsin behöver gå utanför EU.</li>
              <li><strong>Bistånd vid registrerades rättigheter</strong> — vi assisterar med åtkomst-, raderings- och portabilitetsförfrågningar.</li>
              <li><strong>Personuppgiftsincidenter</strong> — notifiering inom 72 timmar enligt artikel 33.</li>
              <li><strong>Revisionsrätt</strong> — du eller en oberoende revisor får granska säkerhetsåtgärderna en gång per år.</li>
            </ul>

            <h2>Når DPA:n gäller</h2>
            <p>
              DPA:n träder automatiskt i kraft när du signerar ett betalt
              avtal med oss. Free-tier-användare omfattas av samma villkor i
              tillämpliga delar.
            </p>

            <h2>Mer</h2>
            <p>
              Se även våra <Link href="/villkor">allmänna villkor</Link>,{" "}
              <Link href="/integritet">integritetspolicy</Link> och{" "}
              <Link href="/security">säkerhetsöversikt</Link>.
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
