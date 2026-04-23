import type { Metadata } from "next";
import Link from "next/link";
import NavbarEn from "@/components/landing/en/NavbarEn";
import FooterEn from "@/components/landing/en/FooterEn";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LAST_UPDATED = "2026-04-15";

export const metadata: Metadata = {
  title: "Privacy policy – Offert Pro",
  description:
    "How Offert Pro collects, uses and protects your personal data under GDPR. EU-hosted, encrypted and grounded in your consent.",
  alternates: {
    canonical: `${SITE_URL}/en/privacy`,
    languages: {
      "sv-SE": `${SITE_URL}/integritet`,
      en: `${SITE_URL}/en/privacy`,
      de: `${SITE_URL}/de/datenschutz`,
      "x-default": `${SITE_URL}/integritet`,
    },
  },
  openGraph: {
    title: "Privacy policy – Offert Pro",
    description: "How we handle your personal data under GDPR.",
    url: `${SITE_URL}/en/privacy`,
    locale: "en",
    alternateLocale: ["sv_SE", "de"],
    type: "website",
  },
};

export default function PrivacyPageEn() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarEn />

      <article className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Privacy policy
          </h1>
          <p className="text-sm text-gray-400 mb-12">
            Last updated: {new Date(LAST_UPDATED).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <p>
              This policy describes how Offert Pro AB (&ldquo;Offert Pro&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;) processes your personal data
              when you use our service at <Link href="/en">offertpro.se</Link>.
              We are the data controller for the data you provide.
            </p>

            <h2>1. What data we collect</h2>
            <ul>
              <li><strong>Account data</strong> — name, email, hashed password, company name, registration number.</li>
              <li><strong>Content you create</strong> — proposals, invoices, client data, templates, attachments.</li>
              <li><strong>Usage data</strong> — IP address, browser, page views, clicks (for debugging and product improvement).</li>
              <li><strong>Payment data</strong> — handled directly by Stripe; we only store subscription status and billing address.</li>
            </ul>

            <h2>2. Why we process it</h2>
            <ul>
              <li><strong>Contract</strong> (GDPR Art. 6(1)(b)) — to deliver the service you bought.</li>
              <li><strong>Legitimate interest</strong> (Art. 6(1)(f)) — to improve the product, prevent abuse and keep things running.</li>
              <li><strong>Legal obligation</strong> (Art. 6(1)(c)) — for accounting and tax records.</li>
              <li><strong>Consent</strong> (Art. 6(1)(a)) — for non-essential cookies and marketing emails.</li>
            </ul>

            <h2>3. How long we keep it</h2>
            <p>
              Account data and content are kept while your account is active.
              On termination we erase everything within 30 days, except data we
              must retain for legal reasons (typically 7 years for accounting
              records under the Swedish Bookkeeping Act).
            </p>

            <h2>4. Where it&rsquo;s stored</h2>
            <p>
              All data is stored within the EU. Primary region is Frankfurt
              (AWS eu-central-1) with backup in Stockholm. No personal data is
              transferred to the US or third countries without an appropriate
              safeguard in place (Standard Contractual Clauses or the EU-US
              Data Privacy Framework). Details:{" "}
              <Link href="/en/security">security</Link>.
            </p>

            <h2>5. Who can access it</h2>
            <p>
              Only necessary Offert Pro staff and our vetted sub-processors
              listed at <Link href="/en/security">/en/security</Link>. All
              sub-processors are bound by data processing agreements (DPAs).
            </p>

            <h2>6. Your rights under GDPR</h2>
            <ul>
              <li>Know what data we hold about you (Art. 15)</li>
              <li>Have inaccurate data corrected (Art. 16)</li>
              <li>Have your data erased (Art. 17)</li>
              <li>Restrict or object to processing (Art. 18, 21)</li>
              <li>Receive your data in a portable format (Art. 20)</li>
              <li>Lodge a complaint with your supervisory authority</li>
            </ul>
            <p>
              To exercise a right, email{" "}
              <a href="mailto:privacy@offertpro.se">privacy@offertpro.se</a>.
              We respond within 30 days.
            </p>

            <h2>7. Cookies</h2>
            <p>
              We use a minimum of cookies for the service to work. Details in
              our <Link href="/en/cookies">cookie policy</Link>.
            </p>

            <h2>8. Security</h2>
            <p>
              All data is encrypted with AES-256 at rest and TLS 1.3 in
              transit. Under GDPR Article 33 we are required to report personal
              data breaches to the supervisory authority within 72 hours.
              Security issues to{" "}
              <a href="mailto:security@offertpro.se">security@offertpro.se</a>.
            </p>

            <h2>9. Changes</h2>
            <p>
              We update this policy when the service or applicable law changes.
              Material changes are communicated by email and in the app at
              least 30 days in advance.
            </p>

            <h2>10. Contact</h2>
            <p>
              Offert Pro AB · Stockholm, Sweden ·{" "}
              <a href="mailto:privacy@offertpro.se">privacy@offertpro.se</a>
            </p>
          </div>
        </div>
      </article>

      <FooterEn />
    </div>
  );
}
