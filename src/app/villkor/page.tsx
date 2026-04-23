import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LAST_UPDATED = "2026-04-15";

export const metadata: Metadata = {
  title: "Villkor – Offert Pro",
  description:
    "Allmänna villkor för Offert Pros tjänst. Avtal, prenumeration, ansvarsbegränsning och svensk lag.",
  alternates: {
    canonical: `${SITE_URL}/villkor`,
    languages: {
      "sv-SE": `${SITE_URL}/villkor`,
      en: `${SITE_URL}/en/terms`,
      de: `${SITE_URL}/de/agb`,
      "x-default": `${SITE_URL}/villkor`,
    },
  },
  openGraph: {
    title: "Villkor – Offert Pro",
    description: "Allmänna villkor för Offert Pros tjänst.",
    url: `${SITE_URL}/villkor`,
    locale: "sv_SE",
    alternateLocale: ["en", "de"],
    type: "website",
  },
};

export default function VillkorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <article className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">Juridiskt</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">Allmänna villkor</h1>
          <p className="text-sm text-gray-400 mb-12">
            Senast uppdaterad:{" "}
            {new Date(LAST_UPDATED).toLocaleDateString("sv-SE", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <p>
              Dessa villkor reglerar din användning av Offert Pros tjänst
              (&bdquo;Tjänsten&ldquo;) som tillhandahålls av Offert Pro AB,
              org. nr. 559123-4567 (&bdquo;vi&ldquo;, &bdquo;oss&ldquo;).
              Genom att registrera ett konto godkänner du dessa villkor.
            </p>

            <h2>1. Avtalets ingående</h2>
            <p>
              Avtalet ingås när du registrerar ett konto och bekräftar dessa
              villkor. För konsumenter gäller 14 dagars ångerrätt enligt
              distansavtalslagen, om du inte uttryckligen avstår från denna
              för att börja använda Tjänsten omedelbart.
            </p>

            <h2>2. Tjänstens innehåll</h2>
            <p>
              Vi tillhandahåller en webbaserad plattform för att skapa,
              skicka, signera och fakturera offerter. Funktioner per plan
              specificeras på <Link href="/pricing">priser</Link>. Vi
              förbehåller oss rätten att utveckla och uppdatera Tjänsten;
              materiella reduktioner av betalfunktioner aviseras minst 30
              dagar i förväg.
            </p>

            <h2>3. Prenumeration och betalning</h2>
            <ul>
              <li>Tjänsten erbjuds i en kostnadsfri grundnivå samt i betalplaner enligt prislista.</li>
              <li>Betalplaner debiteras månadsvis eller årsvis i förskott via Stripe.</li>
              <li>Priser är angivna exkl. moms och kan ändras med 60 dagars varsel.</li>
              <li>Vid utebliven betalning pausas betalfunktioner tills skulden är reglerad.</li>
            </ul>

            <h2>4. Uppsägning</h2>
            <p>
              Du kan säga upp ditt konto när som helst i appen. Uppsägning
              gäller från slutet av innevarande betalperiod; inga
              återbetalningar görs för innevarande månad. Vi raderar dina
              uppgifter inom 30 dagar enligt vår{" "}
              <Link href="/integritet">integritetspolicy</Link>, med undantag
              för det som måste sparas av rättsliga skäl.
            </p>

            <h2>5. Ditt innehåll</h2>
            <p>
              Allt innehåll du laddar upp eller skapar (offerter, fakturor,
              kunddata, mallar) tillhör dig. Du beviljar oss en begränsad,
              icke-exklusiv licens att lagra och behandla innehållet i syfte
              att tillhandahålla Tjänsten.
            </p>
            <p>
              Du ansvarar för att innehållet är lagligt och att du har rätt
              att behandla de personuppgifter som ingår. När personuppgifter
              behandlas av oss för din räkning agerar vi som
              personuppgiftsbiträde under vårt{" "}
              <Link href="/dpa">personuppgiftsbiträdesavtal (DPA)</Link>.
            </p>

            <h2>6. Tillåten användning</h2>
            <ul>
              <li>Inga olagliga, vilseledande eller skadliga aktiviteter</li>
              <li>Ingen reverse engineering eller obehörig åtkomstförsök</li>
              <li>Ingen massutskick av kommersiella e-postmeddelanden i strid med GDPR/PuL eller direktiv 2002/58/EG</li>
              <li>Ingen användning som överbelastar våra system (rimlig användning gäller)</li>
            </ul>

            <h2>7. Tillgänglighet och support</h2>
            <p>
              Vi siktar på 99,9 % uptime per kalendermånad mätt på Tjänstens
              huvudkomponenter (se{" "}
              <Link href="/status">status</Link>). Service-credits för
              underskridande av Pro-planens SLA hanteras enligt avtal med
              kunden. Standard support sker via e-post; svarstider per plan
              specificeras på prissättningssidan.
            </p>

            <h2>8. Ansvarsbegränsning</h2>
            <p>
              I största utsträckning som tillåts enligt svensk lag är vårt
              sammanlagda ansvar gentemot dig per kalenderår begränsat till
              det belopp du betalat för Tjänsten under samma period. Vi
              ansvarar inte för indirekta skador, utebliven vinst eller
              dataförlust som du själv har möjlighet att förebygga genom
              regelbundna utskrifter eller exporter.
            </p>

            <h2>9. Force majeure</h2>
            <p>
              Vi är inte ansvariga för avbrott orsakade av omständigheter
              utanför vår rimliga kontroll (t.ex. avbrott hos
              molnleverantör, cyberangrepp, krig, naturkatastrof).
            </p>

            <h2>10. Ändringar</h2>
            <p>
              Vi kan uppdatera dessa villkor. Materiella ändringar aviseras
              via e-post och i appen minst 30 dagar i förväg. Fortsatt
              användning efter ikraftträdande utgör godkännande.
            </p>

            <h2>11. Tillämplig lag och tvistlösning</h2>
            <p>
              Svensk lag gäller. Tvist avgörs i första hand i svensk allmän
              domstol med Stockholms tingsrätt som första instans. Konsumenter
              kan även vända sig till Allmänna reklamationsnämnden (ARN) eller
              EU-kommissionens onlinetvistlösningsplattform.
            </p>

            <h2>12. Kontakt</h2>
            <p>
              Offert Pro AB · Stockholm, Sverige ·{" "}
              <a href="mailto:hej@offertpro.se">hej@offertpro.se</a>
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
