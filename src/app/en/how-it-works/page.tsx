import type { Metadata } from "next";
import {
  ClipboardEdit,
  MailCheck,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
} from "lucide-react";
import NavbarEn from "@/components/landing/en/NavbarEn";
import FooterEn from "@/components/landing/en/FooterEn";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

const steps = [
  {
    number: "01",
    title: "Describe your need",
    description:
      "Fill in a short description of what you need help with. Category, requirements and timeline — done in a minute.",
    details: [
      "Choose category and industry",
      "Describe the project in free text",
      "Set budget and timeline",
      "Upload any attachments",
    ],
    icon: ClipboardEdit,
  },
  {
    number: "02",
    title: "Receive matched proposals",
    description:
      "We match you with the best-fit suppliers based on your requirements. Tailored proposals arrive in your inbox.",
    details: [
      "AI-powered matching",
      "Vetted suppliers",
      "Proposals within 24 hours",
      "Comparable format",
    ],
    icon: MailCheck,
  },
  {
    number: "03",
    title: "Compare and choose",
    description:
      "Compare prices, ratings and terms side by side. Pick the proposal that fits you best and sign digitally — eIDAS-compliant.",
    details: [
      "Side-by-side comparison",
      "Transparent pricing",
      "Customer ratings and reviews",
      "Digital signatures (eIDAS)",
    ],
    icon: BarChart3,
  },
];

const benefits = [
  {
    title: "Save time",
    description: "No more chasing proposals by phone. It all happens automatically.",
    icon: Clock,
  },
  {
    title: "Better pricing",
    description: "Competition between suppliers gives you better terms and pricing.",
    icon: Zap,
  },
  {
    title: "Quality-checked",
    description: "Every supplier is reviewed and verified before they can submit.",
    icon: Shield,
  },
  {
    title: "Free to use",
    description: "Receiving proposals is free. You only pay if you decide to proceed.",
    icon: CheckCircle2,
  },
];

export const metadata: Metadata = {
  title: "How it works – Create proposals in 3 simple steps",
  description:
    "From need to proposal in three simple steps. Pick a template, tailor the content and send professional proposals straight to the client. Track opens in real time.",
  alternates: {
    canonical: `${SITE_URL}/en/how-it-works`,
    languages: {
      "sv-SE": `${SITE_URL}/hur-det-fungerar`,
      en: `${SITE_URL}/en/how-it-works`,
      de: `${SITE_URL}/de/funktionsweise`,
      "x-default": `${SITE_URL}/hur-det-fungerar`,
    },
  },
  openGraph: {
    title: "How it works – Offert Pro",
    description: "Create proposals in 3 simple steps. Pick a template, tailor, send.",
    url: `${SITE_URL}/en/how-it-works`,
    locale: "en",
    alternateLocale: ["sv_SE", "de"],
    type: "website",
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to create a professional proposal with Offert Pro",
  description:
    "Create and send professional proposals in three simple steps with Offert Pro.",
  inLanguage: "en",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Describe your need",
      text: "Fill in a short description of what you need help with. Pick a category, describe the project and set a budget.",
      url: `${SITE_URL}/en/how-it-works#step-1`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Receive matched proposals",
      text: "We match you with the best-fit suppliers. You get tailored proposals in your inbox within 24 hours.",
      url: `${SITE_URL}/en/how-it-works#step-2`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Compare and choose",
      text: "Compare prices, ratings and terms side by side. Pick the best proposal and sign digitally with an eIDAS e-signature.",
      url: `${SITE_URL}/en/how-it-works#step-3`,
    },
  ],
};

export default function HowItWorksPageEn() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <NavbarEn />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            How it works
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            From need to proposal
            <br />
            <span className="text-gray-400">in three simple steps</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We&rsquo;ve made it easy to find the right supplier. Describe your
            need, receive proposals and pick the best one — all in one place.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-5xl space-y-16">
          {steps.map((step, i) => (
            <div
              key={step.number}
              id={`step-${i + 1}`}
              className={`flex flex-col md:flex-row items-start gap-12 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl font-extralight text-indigo-200">
                    {step.number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
                    <step.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6">
                  {step.description}
                </p>
                <ul className="space-y-3">
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >
                      <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 flex items-center justify-center min-h-[280px]">
                  <step.icon className="h-24 w-24 text-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Why choose Offert Pro?
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              We remove the friction and give you more time for what matters.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 mx-auto mb-5">
                  <b.icon className="h-6 w-6 text-indigo-600" />
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

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready for your first proposal?
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Get started free in under 2 minutes. No credit card required.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
          >
            Get started free
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      <FooterEn />
    </div>
  );
}
