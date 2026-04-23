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
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Press & media – Offert Pro",
  description:
    "Pressresurser för Offert Pro: logotyper, produktskärmdumpar, faktablad och varumärkesriktlinjer. Kontaktuppgifter för pressförfrågningar.",
  alternates: {
    canonical: `${SITE_URL}/press`,
    languages: {
      "sv-SE": `${SITE_URL}/press`,
      en: `${SITE_URL}/en/press`,
      de: `${SITE_URL}/de/presse`,
      "x-default": `${SITE_URL}/press`,
    },
  },
  openGraph: {
    title: "Press & media – Offert Pro",
    description:
      "Logotyper, skärmdumpar, faktablad och presskontakter för Offert Pro.",
    url: `${SITE_URL}/press`,
    locale: "sv_SE",
    alternateLocale: ["en", "de"],
    type: "website",
  },
};

const factSheet = [
  { label: "Grundat", value: "2024" },
  { label: "Huvudkontor", value: "Stockholm, Sverige" },
  { label: "Region", value: "Norden, DACH, UK/Irland" },
  { label: "Produkt", value: "Offert- och fakturaplattform" },
  { label: "Anställda", value: "12 (2026)" },
  { label: "Kunder", value: "500+ småföretag" },
  { label: "Datahosting", value: "EU (Frankfurt + Stockholm)" },
  { label: "Compliance", value: "GDPR, eIDAS, ISO 27001 (pågående)" },
];

const pressMentions = [
  {
    outlet: "Di Digital",
    date: "2026-03-12",
    title: "Stockholmsstartupen som tar upp striden med PandaDoc",
  },
  {
    outlet: "Ny Teknik",
    date: "2026-02-04",
    title: "Offert Pro satsar på DACH — och BankID över gränserna",
  },
  {
    outlet: "Breakit",
    date: "2025-12-18",
    title: "Offertjätten PandaDoc får europeisk utmanare",
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Press &amp; media
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Pressresurser
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Logotyper, skärmdumpar, faktablad och mediekontakter för Offert
            Pro. Allt du behöver för att skriva om oss.
          </p>
        </div>
      </section>

      {/* Boilerplate */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Om Offert Pro (boilerplate)
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>Kort version (1 mening).</strong> Offert Pro är en
            europeisk offert- och fakturaplattform för småföretag som vill
            stänga fler affärer med mindre krångel.
          </p>
          <p className="text-gray-600 leading-relaxed">
            <strong>Lång version (1 stycke).</strong> Offert Pro är grundat i
            Stockholm 2024 och hjälper europeiska småföretag, frilansare och
            byråer att skapa, skicka och signera professionella offerter på
            minuter i stället för timmar. Plattformen hanterar EU-moms inklusive
            Reverse Charge, eIDAS-konforma e-signaturer (inklusive BankID för
            Norden och D-Trust för Tyskland) samt helt EU-baserad datahosting —
            och har en riktig gratisnivå så du kan testa mot en levande kund
            innan du betalar något. Används idag av 500+ företag i Norden,
            DACH och Storbritannien.
          </p>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nedladdningar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/press/offert-pro-logos.zip"
              className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-indigo-200 hover:shadow-lg transition-all text-center group"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 mb-4">
                <ImageIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Logotyppaket
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                SVG, PNG (ljus/mörk), wordmark + symbol
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600">
                <Download className="h-4 w-4" />
                Ladda ner (.zip)
              </span>
            </a>
            <a
              href="/press/offert-pro-screenshots.zip"
              className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-indigo-200 hover:shadow-lg transition-all text-center group"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 mb-4">
                <ImageIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Produktskärmdumpar
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Dashboard, redigerare, kundvy — 4K PNG
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600">
                <Download className="h-4 w-4" />
                Ladda ner (.zip)
              </span>
            </a>
            <a
              href="/press/offert-pro-factsheet.pdf"
              className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-indigo-200 hover:shadow-lg transition-all text-center group"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 mb-4">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Faktablad (PDF)
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Nyckeltal, milstolpar, ledning
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600">
                <Download className="h-4 w-4" />
                Ladda ner (.pdf)
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Fact sheet */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Faktablad</h2>
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

      {/* Brand guidelines */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Varumärkesriktlinjer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Gör
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Skriv &bdquo;Offert Pro&ldquo; med mellanslag och båda ord med stor initial</li>
                <li>Behåll logotypens ursprungliga proportioner</li>
                <li>Använd minst 16 px höjd på digitala ytor</li>
                <li>Säkerställ minst 8 px luft runt logotypen</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                <X className="h-4 w-4" /> Undvik
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Skriv inte &bdquo;OffertPro&ldquo;, &bdquo;offertpro&ldquo; eller &bdquo;Offertpro&ldquo;</li>
                <li>Rotera, tänj eller lägg effekter på logotypen</li>
                <li>Byt färger utom till de godkända varumärkesfärgerna</li>
                <li>Placera logotypen på lågkontrasterande bakgrunder</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Press mentions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">I media</h2>
          <ul className="space-y-4">
            {pressMentions.map((m) => (
              <li
                key={m.title}
                className="flex items-baseline gap-4 border-b border-gray-100 pb-4 last:border-b-0"
              >
                <time className="text-xs text-gray-400 shrink-0 w-24 tabular-nums">
                  {new Date(m.date).toLocaleDateString("sv-SE", {
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

      {/* Contact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Presskontakt
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            För intervjuer, kommentarer eller frågor — mejla oss. Vi svarar
            vanligen samma dag.
          </p>
          <a
            href="mailto:press@offertpro.se"
            className="inline-flex items-center gap-2 px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
          >
            <Mail className="h-4 w-4" />
            press@offertpro.se
          </a>
          <p className="mt-10 text-xs text-gray-400">
            Mer om oss på <Link href="/authors" className="underline hover:text-gray-600">redaktionen</Link> och i{" "}
            <Link href="/blog" className="underline hover:text-gray-600">bloggen</Link>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
