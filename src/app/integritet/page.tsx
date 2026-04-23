import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LAST_UPDATED = "2026-04-15";

export const metadata: Metadata = {
  title: "Integritetspolicy – Offert Pro",
  description:
    "Hur Offert Pro samlar in, använder och skyddar dina personuppgifter enligt GDPR. EU-hostad, krypterad och med ditt samtycke som grund.",
  alternates: {
    canonical: `${SITE_URL}/integritet`,
    languages: {
      "sv-SE": `${SITE_URL}/integritet`,
      en: `${SITE_URL}/en/privacy`,
      de: `${SITE_URL}/de/datenschutz`,
      "x-default": `${SITE_URL}/integritet`,
    },
  },
  openGraph: {
    title: "Integritetspolicy – Offert Pro",
    description: "Hur vi behandlar dina personuppgifter enligt GDPR.",
    url: `${SITE_URL}/integritet`,
    locale: "sv_SE",
    alternateLocale: ["en", "de"],
    type: "website",
  },
};

export default function IntegritetPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <article className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Juridiskt
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Integritetspolicy
          </h1>
          <p className="text-sm text-gray-400 mb-12">
            Senast uppdaterad: {new Date(LAST_UPDATED).toLocaleDateString("sv-SE", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <p>
              Denna policy beskriver hur Offert Pro AB (&bdquo;Offert Pro&ldquo;,
              &bdquo;vi&ldquo;, &bdquo;oss&ldquo;) behandlar dina personuppgifter
              när du använder vår tjänst på <Link href="/">offertpro.se</Link>.
              Vi är personuppgiftsansvariga för de uppgifter du lämnar till oss.
            </p>

            <h2>1. Vilka uppgifter vi samlar in</h2>
            <ul>
              <li><strong>Kontouppgifter</strong> — namn, e-postadress, lösenord (hashat), företagsnamn, organisationsnummer.</li>
              <li><strong>Innehåll du skapar</strong> — offerter, fakturor, kunddata, mallar, bilagor.</li>
              <li><strong>Användningsdata</strong> — IP-adress, webbläsare, sidvisningar, klick (för felsökning och produktförbättring).</li>
              <li><strong>Betalningsdata</strong> — hanteras direkt av Stripe; vi lagrar bara prenumerationsstatus och faktureringsadress.</li>
            </ul>

            <h2>2. Varför vi behandlar dem</h2>
            <ul>
              <li><strong>Avtal</strong> (artikel 6.1.b GDPR) — för att leverera tjänsten du köpt.</li>
              <li><strong>Berättigat intresse</strong> (artikel 6.1.f) — för att förbättra produkten, förhindra missbruk och säkerställa drift.</li>
              <li><strong>Rättslig förpliktelse</strong> (artikel 6.1.c) — för bokföring och skatteredovisning.</li>
              <li><strong>Samtycke</strong> (artikel 6.1.a) — för icke-väsentliga cookies och marknadsföringsutskick.</li>
            </ul>

            <h2>3. Hur länge vi sparar uppgifterna</h2>
            <p>
              Kontouppgifter och innehåll behålls så länge ditt konto är aktivt.
              Vid uppsägning raderas allt inom 30 dagar, med undantag för
              uppgifter vi måste behålla av rättsliga skäl (typiskt 7 år för
              bokföringsmaterial enligt bokföringslagen).
            </p>

            <h2>4. Var uppgifterna lagras</h2>
            <p>
              All data lagras inom EU. Primär region är Frankfurt (AWS
              eu-central-1) med backup i Stockholm. Inga personuppgifter
              överförs till USA eller tredjeland utan att en lämplig skyddsåtgärd
              är på plats (standardavtalsklausuler eller EU-US Data Privacy
              Framework). Detaljer:{" "}
              <Link href="/security">säkerhet</Link>.
            </p>

            <h2>5. Vem som får tillgång</h2>
            <p>
              Endast nödvändig personal hos Offert Pro samt våra granskade
              underleverantörer (sub-processors) listade på{" "}
              <Link href="/security">/security</Link>. Alla underleverantörer
              är bundna av databehandlingsavtal (DPA).
            </p>

            <h2>6. Dina rättigheter enligt GDPR</h2>
            <ul>
              <li>Få veta vilka uppgifter vi har om dig (artikel 15)</li>
              <li>Få felaktiga uppgifter rättade (artikel 16)</li>
              <li>Få uppgifter raderade (artikel 17)</li>
              <li>Begränsa eller invända mot behandling (artikel 18, 21)</li>
              <li>Få ut dina uppgifter i ett portabelt format (artikel 20)</li>
              <li>Klaga hos Integritetsskyddsmyndigheten (IMY)</li>
            </ul>
            <p>
              För att utöva en rättighet, mejla{" "}
              <a href="mailto:privacy@offertpro.se">privacy@offertpro.se</a>.
              Vi svarar inom 30 dagar.
            </p>

            <h2>7. Cookies</h2>
            <p>
              Vi använder ett minimum av cookies för att tjänsten ska fungera.
              Detaljer i vår <Link href="/cookies">cookie-policy</Link>.
            </p>

            <h2>8. Säkerhet</h2>
            <p>
              All data krypteras med AES-256 i vila och TLS 1.3 vid överföring.
              Vi har en plikt enligt artikel 33 GDPR att rapportera personuppgiftsincidenter
              till IMY inom 72 timmar. Säkerhetsproblem rapporteras till{" "}
              <a href="mailto:security@offertpro.se">security@offertpro.se</a>.
            </p>

            <h2>9. Ändringar</h2>
            <p>
              Vi uppdaterar denna policy när tjänsten eller lagstiftningen
              ändras. Materiella ändringar meddelas via e-post och i appen
              minst 30 dagar i förväg.
            </p>

            <h2>10. Kontakt</h2>
            <p>
              Offert Pro AB · Stockholm, Sverige ·{" "}
              <a href="mailto:privacy@offertpro.se">privacy@offertpro.se</a>
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
