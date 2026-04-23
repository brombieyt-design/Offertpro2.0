import type { Metadata } from "next";
import Link from "next/link";
import NavbarEn from "@/components/landing/en/NavbarEn";
import FooterEn from "@/components/landing/en/FooterEn";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";
const LAST_UPDATED = "2026-04-15";

export const metadata: Metadata = {
  title: "Terms of service – Offert Pro",
  description:
    "General terms for the Offert Pro service. Contract, subscription, liability and Swedish law.",
  alternates: {
    canonical: `${SITE_URL}/en/terms`,
    languages: {
      "sv-SE": `${SITE_URL}/villkor`,
      en: `${SITE_URL}/en/terms`,
      de: `${SITE_URL}/de/agb`,
      "x-default": `${SITE_URL}/villkor`,
    },
  },
  openGraph: {
    title: "Terms of service – Offert Pro",
    description: "General terms for the Offert Pro service.",
    url: `${SITE_URL}/en/terms`,
    locale: "en",
    alternateLocale: ["sv_SE", "de"],
    type: "website",
  },
};

export default function TermsPageEn() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarEn />

      <article className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">Terms of service</h1>
          <p className="text-sm text-gray-400 mb-12">
            Last updated:{" "}
            {new Date(LAST_UPDATED).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-gray max-w-none prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <p>
              These terms govern your use of the Offert Pro service (the
              &ldquo;Service&rdquo;) provided by Offert Pro AB, reg. no.
              559123-4567 (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By creating an
              account you accept these terms.
            </p>

            <h2>1. Formation of the contract</h2>
            <p>
              The contract is formed when you create an account and confirm
              these terms. EU consumers have a 14-day right of withdrawal
              under the Consumer Rights Directive (2011/83/EU), unless you
              expressly waive it to start using the Service immediately.
            </p>

            <h2>2. The Service</h2>
            <p>
              We provide a web-based platform for creating, sending, signing
              and invoicing proposals. Per-plan features are listed at{" "}
              <Link href="/en/pricing">pricing</Link>. We reserve the right to
              develop and update the Service; material reductions of paid
              functionality are announced at least 30 days in advance.
            </p>

            <h2>3. Subscription and billing</h2>
            <ul>
              <li>The Service is offered in a free tier and paid plans per the published price list.</li>
              <li>Paid plans are billed monthly or annually in advance via Stripe.</li>
              <li>Prices are excluding VAT and may change with 60 days&rsquo; notice.</li>
              <li>If payment fails, paid features are suspended until the balance is settled.</li>
            </ul>

            <h2>4. Termination</h2>
            <p>
              You can terminate your account at any time inside the app.
              Termination is effective at the end of the current billing
              period; we don&rsquo;t refund the current month. We delete your
              data within 30 days per our{" "}
              <Link href="/en/privacy">privacy policy</Link>, except for what
              must be retained for legal reasons.
            </p>

            <h2>5. Your content</h2>
            <p>
              All content you upload or create (proposals, invoices, client
              data, templates) belongs to you. You grant us a limited,
              non-exclusive licence to store and process the content for the
              purpose of providing the Service.
            </p>
            <p>
              You are responsible for ensuring the content is lawful and that
              you have the right to process the personal data it contains.
              When personal data is processed by us on your behalf, we act as
              processor under our{" "}
              <Link href="/en/dpa">data processing agreement (DPA)</Link>.
            </p>

            <h2>6. Acceptable use</h2>
            <ul>
              <li>No unlawful, deceptive or harmful activity</li>
              <li>No reverse engineering or unauthorised access attempts</li>
              <li>No bulk commercial email in breach of GDPR or Directive 2002/58/EC (ePrivacy)</li>
              <li>No use that overloads our systems (fair use applies)</li>
            </ul>

            <h2>7. Availability and support</h2>
            <p>
              We target 99.9% uptime per calendar month measured against the
              Service&rsquo;s primary components (see{" "}
              <Link href="/en/status">status</Link>). Service credits for
              breaches of the Pro plan SLA are handled per the customer
              agreement. Standard support is by email; per-plan response
              targets are listed on the pricing page.
            </p>

            <h2>8. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by Swedish law, our aggregate
              liability to you per calendar year is limited to the amount you
              have paid for the Service in the same period. We are not liable
              for indirect damages, lost profits or data loss that you have
              the means to prevent through regular exports.
            </p>

            <h2>9. Force majeure</h2>
            <p>
              We are not liable for outages caused by circumstances beyond
              our reasonable control (e.g. cloud provider failure,
              cyberattack, war, natural disaster).
            </p>

            <h2>10. Changes</h2>
            <p>
              We may update these terms. Material changes are announced by
              email and in the app at least 30 days in advance. Continued
              use after the effective date constitutes acceptance.
            </p>

            <h2>11. Governing law and disputes</h2>
            <p>
              These terms are governed by Swedish law. Disputes are settled
              in the Swedish general courts, with Stockholm District Court as
              first instance. Consumers may also refer disputes to the EU
              Online Dispute Resolution platform.
            </p>

            <h2>12. Contact</h2>
            <p>
              Offert Pro AB · Stockholm, Sweden ·{" "}
              <a href="mailto:hello@offertpro.se">hello@offertpro.se</a>
            </p>
          </div>
        </div>
      </article>

      <FooterEn />
    </div>
  );
}
