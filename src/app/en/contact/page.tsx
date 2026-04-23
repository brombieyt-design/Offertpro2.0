import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Shield, Newspaper, Gavel, ArrowRight } from "lucide-react";
import NavbarEn from "@/components/landing/en/NavbarEn";
import FooterEn from "@/components/landing/en/FooterEn";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Contact – Offert Pro",
  description:
    "Contact Offert Pro. Support, sales, legal, security and press — the right email for the right question.",
  alternates: {
    canonical: `${SITE_URL}/en/contact`,
    languages: {
      "sv-SE": `${SITE_URL}/kontakt`,
      en: `${SITE_URL}/en/contact`,
      de: `${SITE_URL}/de/kontakt`,
      "x-default": `${SITE_URL}/kontakt`,
    },
  },
  openGraph: {
    title: "Contact – Offert Pro",
    description: "The right email for the right question.",
    url: `${SITE_URL}/en/contact`,
    locale: "en",
    alternateLocale: ["sv_SE", "de"],
    type: "website",
  },
};

const channels = [
  {
    icon: MessageSquare,
    title: "General support",
    email: "hello@offertpro.se",
    description: "Product questions, onboarding help or troubleshooting. Typically answered within one business day.",
  },
  {
    icon: Mail,
    title: "Sales & Pro plans",
    email: "sales@offertpro.se",
    description: "Quotes for team or Enterprise, demos, or questions about SSO, QES and API.",
  },
  {
    icon: Gavel,
    title: "Legal & DPA",
    email: "legal@offertpro.se",
    description: "DPA signing, review of your template, requests under GDPR Articles 15–21.",
  },
  {
    icon: Shield,
    title: "Security",
    email: "security@offertpro.se",
    description: "Vulnerability reports, incident notifications, questions about the ISO 27001 roadmap or pentest summaries.",
  },
  {
    icon: Newspaper,
    title: "Press & media",
    email: "press@offertpro.se",
    description: "Interviews, quotes, logo packs and screenshots. See also the press kit.",
  },
];

export default function ContactPageEn() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Offert Pro AB",
    url: SITE_URL,
    contactPoint: channels.map((c) => ({
      "@type": "ContactPoint",
      email: c.email,
      contactType: c.title,
      areaServed: ["EU"],
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
      <NavbarEn />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            How to reach us
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            The right email for the right question — we reply in Swedish,
            English or German. Typical response time: one business day.
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">Postal address</h2>
          <address className="not-italic text-gray-600 leading-relaxed">
            Offert Pro AB<br />
            Reg. no. 559123-4567<br />
            Stockholm, Sweden
          </address>
          <p className="mt-8 text-sm text-gray-400">
            For time-critical security reports, use{" "}
            <a href="mailto:security@offertpro.se" className="underline hover:text-gray-600">
              security@offertpro.se
            </a>{" "}
            directly. See also our{" "}
            <Link href="/en/security" className="underline hover:text-gray-600">
              security overview
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Prefer self-serve?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/en/faq"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-full transition-all"
            >
              FAQ
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/en/status"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-full transition-all"
            >
              System status
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <FooterEn />
    </div>
  );
}
