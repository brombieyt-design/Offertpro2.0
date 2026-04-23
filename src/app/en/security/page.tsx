import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Lock,
  Server,
  FileCheck,
  KeyRound,
  UserCheck,
  Bell,
  HardDrive,
  ArrowRight,
} from "lucide-react";
import NavbarEn from "@/components/landing/en/NavbarEn";
import FooterEn from "@/components/landing/en/FooterEn";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export const metadata: Metadata = {
  title: "Security & compliance – Offert Pro",
  description:
    "GDPR, EU-hosted data, encryption at rest and in transit, eIDAS signatures, role-based access and an in-progress ISO 27001 audit. Offert Pro's security overview.",
  alternates: {
    canonical: `${SITE_URL}/en/security`,
    languages: {
      "sv-SE": `${SITE_URL}/security`,
      en: `${SITE_URL}/en/security`,
      de: `${SITE_URL}/de/sicherheit`,
      "x-default": `${SITE_URL}/security`,
    },
  },
  openGraph: {
    title: "Security & compliance – Offert Pro",
    description:
      "GDPR-first, EU-hosted by default, eIDAS signatures and role-based access. How we protect your data.",
    url: `${SITE_URL}/en/security`,
    locale: "en",
    alternateLocale: ["sv_SE", "de"],
    type: "website",
  },
};

const sections = [
  {
    icon: Server,
    title: "EU-hosted by default",
    body:
      "All customer data is stored and processed within the EU. Primary region is Frankfurt (AWS eu-central-1) with geographically-separated backup in Stockholm. No data is transferred to the US or third countries without explicit consent.",
  },
  {
    icon: Lock,
    title: "Encryption at rest and in transit",
    body:
      "All data is encrypted with AES-256 at rest and TLS 1.3 in transit. Database disks, backups and object storage are all encrypted. File uploads (logo, attachments) are stored in encrypted object storage with signed URLs.",
  },
  {
    icon: UserCheck,
    title: "Authentication and access",
    body:
      "Passwords are hashed with bcrypt (cost factor 12). Two-factor authentication via TOTP is included on every plan. On the Pro plan we support SAML 2.0 SSO via your own IdP (Okta, Google Workspace, Microsoft Entra).",
  },
  {
    icon: KeyRound,
    title: "Role-based access control",
    body:
      "Admin, Sales and Viewer roles on every paid plan. Fine-grained access per proposal and per client is available on Pro. Every access change is written to an immutable audit log.",
  },
  {
    icon: FileCheck,
    title: "eIDAS signatures",
    body:
      "Electronic signatures follow the eIDAS regulation (EU) 910/2014. SES and AES are included on every plan; QES (qualified signatures) via BankID (Sweden, Norway, Finland) and D-Trust (Germany) are included on Pro — legally equivalent to a handwritten signature under Article 25(2).",
  },
  {
    icon: HardDrive,
    title: "Backup and recovery",
    body:
      "Point-in-time restore up to 30 days back. Daily full backups with 90-day retention. RTO 4 hours, RPO 1 hour. Recovery drills run quarterly.",
  },
  {
    icon: Shield,
    title: "Compliance and certifications",
    body:
      "Full GDPR compliance including a Data Processing Agreement (DPA) by default. ISO 27001 certification is under formal audit with planned completion in 2026. SOC 2 Type I kicks off in autumn 2026.",
  },
  {
    icon: Bell,
    title: "Incident reporting",
    body:
      "72-hour notification duty under GDPR Article 33. Security contact: security@offertpro.se. PGP key available on request. Responsible disclosure programme: fair rewards for verified vulnerabilities.",
  },
];

export default function SecurityPageEn() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarEn />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            Security &amp; compliance
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Your data is safe with us
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            GDPR-first, EU-hosted by default, encrypted at rest and in transit.
            Here&rsquo;s how we protect your proposals, your client data and
            your signatures.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 mb-5">
                <s.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {s.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Sub-processors
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            We use the following sub-processors to deliver the service. All are
            bound by data processing agreements and vetted for GDPR compliance.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="text-left py-3 border-b border-gray-200">Sub-processor</th>
                  <th className="text-left py-3 border-b border-gray-200">Purpose</th>
                  <th className="text-left py-3 border-b border-gray-200">Region</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr><td className="py-3 border-b border-gray-100">AWS (Amazon Web Services)</td><td className="py-3 border-b border-gray-100">Hosting, storage, backup</td><td className="py-3 border-b border-gray-100">Frankfurt, Stockholm</td></tr>
                <tr><td className="py-3 border-b border-gray-100">Postmark</td><td className="py-3 border-b border-gray-100">Transactional email</td><td className="py-3 border-b border-gray-100">EU</td></tr>
                <tr><td className="py-3 border-b border-gray-100">Stripe</td><td className="py-3 border-b border-gray-100">Subscription billing</td><td className="py-3 border-b border-gray-100">Ireland (EU)</td></tr>
                <tr><td className="py-3 border-b border-gray-100">BankID / D-Trust</td><td className="py-3 border-b border-gray-100">Qualified e-signatures</td><td className="py-3 border-b border-gray-100">Sweden / Germany</td></tr>
                <tr><td className="py-3">Sentry (EU)</td><td className="py-3">Error reporting</td><td className="py-3">Frankfurt</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Security questions?
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Does your security team need a DPA, a SOC 2 roadmap or a pentest
            summary? Drop us a line — we typically respond within one business
            day.
          </p>
          <a
            href="mailto:security@offertpro.se"
            className="inline-flex items-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
          >
            security@offertpro.se
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <p className="mt-10 text-xs text-gray-400">
            See also the{" "}
            <Link href="/en/authors" className="underline hover:text-gray-600">
              editorial team
            </Link>{" "}
            and{" "}
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
