import type { Metadata } from "next";
import {
  Building2,
  Users,
  BarChart3,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Star,
} from "lucide-react";
import NavbarEn from "@/components/landing/en/NavbarEn";
import FooterEn from "@/components/landing/en/FooterEn";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

const benefits = [
  {
    icon: Users,
    title: "Team collaboration",
    description:
      "The entire team works in the same platform with role-based access and a shared pipeline.",
  },
  {
    icon: BarChart3,
    title: "Advanced analytics",
    description:
      "Detailed statistics on proposals, acceptance rates and revenue. Export to Excel or your BI tool.",
  },
  {
    icon: Shield,
    title: "Enterprise security",
    description:
      "SSO/SAML login, eIDAS-grade e-signatures and encryption at rest and in transit.",
  },
  {
    icon: Zap,
    title: "Integrations",
    description:
      "Connect with HubSpot, Salesforce, Xero, Zapier and over 100 other tools.",
  },
  {
    icon: Globe,
    title: "Custom domain",
    description:
      "Send proposals from your own domain with white-label branding across every document.",
  },
  {
    icon: Building2,
    title: "Dedicated support",
    description:
      "Named customer success manager, onboarding help and priority support around the clock.",
  },
];

const stats = [
  { value: "40%", label: "Higher acceptance rate" },
  { value: "2x", label: "Faster proposal cycle" },
  { value: "500+", label: "Business customers" },
  { value: "98%", label: "Customer satisfaction" },
];

const caseStudies = [
  {
    company: "Nordberg Construction",
    quote:
      "With Offert Pro we&rsquo;ve centralised the entire proposal process. Our 15 sales reps save 8 hours a week on average.",
    name: "Erik Nordberg",
    role: "CEO",
    rating: 5,
  },
  {
    company: "Digital Vision London",
    quote:
      "We went from losing proposals in email threads to having full control through the pipeline and follow-up tools.",
    name: "Lisa Hall",
    role: "COO",
    rating: 5,
  },
  {
    company: "Cleantech Solutions",
    quote:
      "The Enterprise plan with SSO and API integration fit our security requirements perfectly.",
    name: "Anders Johansson",
    role: "CTO",
    rating: 5,
  },
];

export const metadata: Metadata = {
  title: "For businesses – Scale your proposal process with the whole team",
  description:
    "Offert Pro for businesses: 40% higher acceptance rate, 2x faster proposal cycle. Team collaboration, role management, API integrations and dedicated support.",
  alternates: {
    canonical: `${SITE_URL}/en/for-businesses`,
    languages: {
      "sv-SE": `${SITE_URL}/for-foretag`,
      en: `${SITE_URL}/en/for-businesses`,
      de: `${SITE_URL}/de/fuer-unternehmen`,
      "x-default": `${SITE_URL}/for-foretag`,
    },
  },
  openGraph: {
    title: "For businesses – Offert Pro",
    description:
      "Scale your proposal process. 40% higher acceptance rate, team collaboration, API integrations.",
    url: `${SITE_URL}/en/for-businesses`,
    locale: "en",
    alternateLocale: ["sv_SE", "de"],
    type: "website",
  },
};

export default function ForBusinessesPageEn() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarEn />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            For businesses
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Scale your proposal process
            <br />
            <span className="text-gray-400">with the whole team</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Offert Pro for businesses gives you team collaboration, advanced
            analytics and enterprise features to win more deals.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup"
              className="inline-flex items-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
            >
              Book a demo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/en/pricing"
              className="inline-flex items-center px-10 py-4 text-base font-medium text-gray-600 bg-white hover:bg-gray-50 rounded-full transition-all duration-300 border border-gray-200"
            >
              See pricing
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Built for growing companies
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Everything your team needs to manage proposals efficiently at
              scale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-gray-50/80 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white mb-5 shadow-sm">
                  <b.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Companies that trust us
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              See how other businesses have transformed their proposal process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <div
                key={cs.company}
                className="bg-white rounded-3xl p-10 border border-gray-100/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: cs.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  &ldquo;{cs.quote}&rdquo;
                </p>
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">
                    {cs.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    {cs.role}, {cs.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-100 px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to scale?
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
              Book a free demo and see how Offert Pro can help your business
              win more deals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/signup"
                className="inline-flex items-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
              >
                Book a demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="/en/pricing"
                className="inline-flex items-center px-10 py-4 text-base font-medium text-gray-600 bg-white hover:bg-gray-50 rounded-full transition-all duration-300 border border-gray-200"
              >
                See all plans
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterEn />
    </div>
  );
}
