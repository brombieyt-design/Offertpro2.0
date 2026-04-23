import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Shield, Newspaper, Gavel, ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Kontakt – Offert Pro",
  description:
    "Kontakta Offert Pro. Support, försäljning, juridik, säkerhet och press — rätt e-postadress för rätt ärende.",
  alternates: {
    canonical: `${SITE_URL}/kontakt`,
    languages: {
      "sv-SE": `${SITE_URL}/kontakt`,
      en: `${SITE_URL}/en/contact`,
      de: `${SITE_URL}/de/kontakt`,
      "x-default": `${SITE_URL}/kontakt`,
    },
  },
  openGraph: {
    title: "Kontakt – Offert Pro",
    description: "Rätt e-postadress för rätt ärende.",
    url: `${SITE_URL}/kontakt`,
    locale: "sv_SE",
    alternateLocale: ["en", "de"],
    type: "website",
  },
};

const channels = [
  {
    icon: MessageSquare,
    title: "Allmän support",
    email: "hej@offertpro.se",
    description: "Frågor om produkten, hjälp att komma igång eller felsökning. Svar typiskt inom en arbetsdag.",
  },
  {
    icon: Mail,
    title: "Försäljning & Pro-planer",
    email: "sales@offertpro.se",
    description: "Offert för team eller Enterprise, demo eller frågor om SSO, QES och API.",
  },
  {
    icon: Gavel,
    title: "Juridik & DPA",
    email: "legal@offertpro.se",
    description: "DPA-signering, egen mall att granska, begäran enligt GDPR artiklarna 15–21.",
  },
  {
    icon: Shield,
    title: "Säkerhet",
    email: "security@offertpro.se",
    description: "Sårbarhetsrapporter, incidentanmälan, frågor om ISO 27001-roadmap eller pentest-sammanfattning.",
  },
  {
    icon: Newspaper,
    title: "Press & media",
    email: "press@offertpro.se",
    description: "Intervjuer, kommentarer, logotyppaket och skärmdumpar. Se även pressrummet.",
  },
];

export default function KontaktPage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Offert Pro AB",
    url: SITE_URL,
    contactPoint: channels.map((c) => ({
      "@type": "ContactPoint",
      email: c.email,
      contactType: c.title,
      areaServed: ["SE", "EU"],
      availableLanguage: ["sv", "en", "de"],
    })),
    address: {
      "@type": "PostalAddress",
      addressCountry: "SE",
      addressLocality: "Stockholm",
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Navbar />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Kontakt
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Så kontaktar du oss
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Rätt e-postadress för rätt ärende — vi svarar på svenska,
            engelska eller tyska. Typiskt svar inom en arbetsdag.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {channels.map((c) => (
            <a
              key={c.email}
              href={`mailto:${c.email}`}
              className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 shrink-0">
                <c.icon className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-gray-900">{c.title}</h2>
                <p className="text-sm font-medium text-indigo-600 mt-0.5 truncate">{c.email}</p>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{c.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Postadress</h2>
          <address className="not-italic text-gray-600 leading-relaxed">
            Offert Pro AB<br />
            Org.nr. 559123-4567<br />
            Stockholm, Sverige
          </address>
          <p className="mt-8 text-sm text-gray-400">
            För tidskritiska säkerhetsrapporter — använd direkt{" "}
            <a href="mailto:security@offertpro.se" className="underline hover:text-gray-600">
              security@offertpro.se
            </a>
            . Se även vår <Link href="/security" className="underline hover:text-gray-600">säkerhetsöversikt</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hellre på egen hand?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-full transition-all"
            >
              Vanliga frågor
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/status"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-full transition-all"
            >
              Systemstatus
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
