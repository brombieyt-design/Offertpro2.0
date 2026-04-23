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
import NavbarEn from "@/components/landing/en/NavbarEn";
import FooterEn from "@/components/landing/en/FooterEn";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Press & media – Offert Pro",
  description:
    "Press resources for Offert Pro: logos, product screenshots, fact sheet and brand guidelines. Media contact for press inquiries.",
  alternates: {
    canonical: `${SITE_URL}/en/press`,
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
      "Logos, screenshots, fact sheet and press contacts for Offert Pro.",
    url: `${SITE_URL}/en/press`,
    locale: "en",
    alternateLocale: ["sv_SE", "de"],
    type: "website",
  },
};

const factSheet = [
  { label: "Founded", value: "2024" },
  { label: "Headquarters", value: "Stockholm, Sweden" },
  { label: "Regions", value: "Nordics, DACH, UK/Ireland" },
  { label: "Product", value: "Proposal and invoicing platform" },
  { label: "Employees", value: "12 (2026)" },
  { label: "Customers", value: "500+ small businesses" },
  { label: "Data hosting", value: "EU (Frankfurt + Stockholm)" },
  { label: "Compliance", value: "GDPR, eIDAS, ISO 27001 (in progress)" },
];

const pressMentions = [
  {
    outlet: "TechCrunch",
    date: "2026-03-18",
    title: "Stockholm startup Offert Pro takes on PandaDoc in Europe",
  },
  {
    outlet: "Sifted",
    date: "2026-02-05",
    title: "The European proposal tool putting BankID and D-Trust on the map",
  },
  {
    outlet: "The Next Web",
    date: "2025-12-14",
    title: "Offert Pro raises the bar for EU-hosted sales tooling",
  },
];

export default function PressPageEn() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarEn />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Press &amp; media
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Press resources
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Logos, screenshots, fact sheets and press contacts for Offert Pro.
            Everything you need to write about us.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            About Offert Pro (boilerplate)
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>Short version (1 sentence).</strong> Offert Pro is a
            European proposal and invoicing platform for small businesses that
            want to close more deals with less friction.
          </p>
          <p className="text-gray-600 leading-relaxed">
            <strong>Long version (1 paragraph).</strong> Founded in Stockholm
            in 2024, Offert Pro helps European small businesses, freelancers
            and agencies create, send and sign professional proposals in
            minutes instead of hours. The platform ships with EU VAT and
            reverse-charge handling, eIDAS-compliant e-signatures (including
            BankID for the Nordics and D-Trust for Germany) and fully
            EU-hosted infrastructure — plus a genuine free tier so you can
            pilot against a live client before paying anything. Used today by
            500+ companies across the Nordics, DACH and the UK.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Downloads</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="mailto:press@offertpro.se?subject=Logo%20pack"
              className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-indigo-200 hover:shadow-lg transition-all text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 mb-4">
                <ImageIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Logo pack
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                SVG, PNG (light/dark), wordmark + symbol
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600">
                <Download className="h-4 w-4" />
                Request (.zip)
              </span>
            </a>
            <a
              href="mailto:press@offertpro.se?subject=Product%20screenshots"
              className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-indigo-200 hover:shadow-lg transition-all text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 mb-4">
                <ImageIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Product screenshots
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Dashboard, editor, client view — 4K PNG
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600">
                <Download className="h-4 w-4" />
                Request (.zip)
              </span>
            </a>
            <a
              href="mailto:press@offertpro.se?subject=Fact%20sheet"
              className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-indigo-200 hover:shadow-lg transition-all text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 mb-4">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Fact sheet (PDF)
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Metrics, milestones, leadership
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600">
                <Download className="h-4 w-4" />
                Request (.pdf)
              </span>
            </a>
          </div>
          <p className="mt-6 text-xs text-gray-400 text-center">
            Assets are sent by email within one business day. High-resolution
            versions available on request.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fact sheet</h2>
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

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Brand guidelines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Do
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Spell it &ldquo;Offert Pro&rdquo; with a space and capital initials on both words</li>
                <li>Preserve the logo&rsquo;s original proportions</li>
                <li>Use at least 16 px height on digital surfaces</li>
                <li>Keep at least 8 px of clear space around the mark</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                <X className="h-4 w-4" /> Don&rsquo;t
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Write &ldquo;OffertPro&rdquo;, &ldquo;offertpro&rdquo; or &ldquo;Offertpro&rdquo;</li>
                <li>Rotate, stretch or add effects to the logo</li>
                <li>Recolour the logo outside the approved brand palette</li>
                <li>Place the logo on low-contrast backgrounds</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">In the news</h2>
          <ul className="space-y-4">
            {pressMentions.map((m) => (
              <li
                key={m.title}
                className="flex items-baseline gap-4 border-b border-gray-100 pb-4 last:border-b-0"
              >
                <time className="text-xs text-gray-400 shrink-0 w-24 tabular-nums">
                  {new Date(m.date).toLocaleDateString("en-GB", {
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

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Press contact
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            For interviews, comments or inquiries — email us. We typically
            reply the same day.
          </p>
          <a
            href="mailto:press@offertpro.se"
            className="inline-flex items-center gap-2 px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            <Mail className="h-4 w-4" />
            press@offertpro.se
          </a>
          <p className="mt-10 text-xs text-gray-400">
            More about us on{" "}
            <Link href="/en/authors" className="underline hover:text-gray-600">
              the editorial team
            </Link>{" "}
            and in the{" "}
            <Link href="/en/blog" className="underline hover:text-gray-600">
              blog
            </Link>
            .
          </p>
        </div>
      </section>

      <FooterEn />
    </div>
  );
}
