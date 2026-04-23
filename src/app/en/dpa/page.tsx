import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileCheck, ShieldCheck, Globe2 } from "lucide-react";
import NavbarEn from "@/components/landing/en/NavbarEn";
import FooterEn from "@/components/landing/en/FooterEn";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LAST_UPDATED = "2026-04-15";

export const metadata: Metadata = {
  title: "Data processing agreement (DPA) – Offert Pro",
  description:
    "Offert Pro's DPA per GDPR Article 28. Standard pre-signed agreement, e-sign our template, or send us yours.",
  alternates: {
    canonical: `${SITE_URL}/en/dpa`,
    languages: {
      "sv-SE": `${SITE_URL}/dpa`,
      en: `${SITE_URL}/en/dpa`,
      de: `${SITE_URL}/de/avv`,
      "x-default": `${SITE_URL}/dpa`,
    },
  },
  openGraph: {
    title: "Data processing agreement – Offert Pro",
    description: "DPA per GDPR Article 28 — standard agreement or your own.",
    url: `${SITE_URL}/en/dpa`,
    locale: "en",
    alternateLocale: ["sv_SE", "de"],
    type: "website",
  },
};

export default function DpaPageEn() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarEn />

      <article className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Data processing agreement (DPA)
          </h1>
          <p className="text-sm text-gray-400 mb-12">
            Last updated:{" "}
            {new Date(LAST_UPDATED).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <p>
              When you use Offert Pro to handle personal data (e.g. client
              details on proposals and invoices), you are the
              <em> controller</em> and we are your
              <em> processor</em> under GDPR Article 28. This agreement
              describes how we process the data on your behalf.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <a
              href="mailto:legal@offertpro.se?subject=DPA%20template"
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all"
            >
              <FileCheck className="h-6 w-6 text-indigo-600 mb-3" />
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Request DPA template (PDF)
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Our pre-signed template — applies automatically to every
                customer
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600">
                <Download className="h-4 w-4" />
                Request by email
              </span>
            </a>
            <a
              href="mailto:legal@offertpro.se?subject=DPA signing"
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all"
            >
              <ShieldCheck className="h-6 w-6 text-indigo-600 mb-3" />
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Sign our DPA
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                We send an eIDAS signing request within 24 hours
              </p>
              <span className="text-sm font-medium text-indigo-600">
                legal@offertpro.se
              </span>
            </a>
            <a
              href="mailto:legal@offertpro.se?subject=Customer DPA"
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all"
            >
              <Globe2 className="h-6 w-6 text-indigo-600 mb-3" />
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                We sign yours
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Send your standard template — we review and return signed
              </p>
              <span className="text-sm font-medium text-indigo-600">
                legal@offertpro.se
              </span>
            </a>
          </div>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <h2>What the DPA covers</h2>
            <ul>
              <li><strong>Nature and purpose of processing</strong> — we process the data solely to deliver the Service per your instructions.</li>
              <li><strong>Categories of data subjects and data</strong> — typically: your clients and their contact details on proposals/invoices.</li>
              <li><strong>Technical and organisational safeguards</strong> — described in the annex; summary at <Link href="/en/security">/en/security</Link>.</li>
              <li><strong>Sub-processors</strong> — the list at <Link href="/en/security">/en/security</Link> is part of the DPA; we notify 30 days before adding any new one.</li>
              <li><strong>International transfers</strong> — EU only. Standard Contractual Clauses apply if we ever need to go outside the EU.</li>
              <li><strong>Assistance with data-subject rights</strong> — we assist with access, erasure and portability requests.</li>
              <li><strong>Personal-data breaches</strong> — notification within 72 hours per Article 33.</li>
              <li><strong>Audit rights</strong> — you or an independent auditor may audit our security measures once per year.</li>
            </ul>

            <h2>When the DPA applies</h2>
            <p>
              The DPA enters into force automatically when you sign a paid
              agreement with us. Free-tier users are subject to the same terms
              where applicable.
            </p>

            <h2>More</h2>
            <p>
              See also our <Link href="/en/terms">terms of service</Link>,{" "}
              <Link href="/en/privacy">privacy policy</Link> and{" "}
              <Link href="/en/security">security overview</Link>.
            </p>
          </div>
        </div>
      </article>

      <FooterEn />
    </div>
  );
}
