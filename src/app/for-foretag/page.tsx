import {
  Building2,
  Users,
  BarChart3,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const benefits = [
  {
    icon: Users,
    title: "Teamsamarbete",
    description:
      "Hela teamet kan arbeta i samma plattform med rollbaserad åtkomst och delad pipeline.",
  },
  {
    icon: BarChart3,
    title: "Avancerad analys",
    description:
      "Detaljerad statistik över offerter, acceptansgrad och intäkter. Exportera till Excel.",
  },
  {
    icon: Shield,
    title: "Enterprise-säkerhet",
    description:
      "SSO/SAML-inloggning, BankID-signaturer och kryptering i vila och under överföring.",
  },
  {
    icon: Zap,
    title: "Integrationer",
    description:
      "Koppla ihop med Fortnox, CRM-system, Zapier och 100+ andra verktyg.",
  },
  {
    icon: Globe,
    title: "Anpassad domän",
    description:
      "Skicka offerter från din egen domän med white-label-branding i alla dokument.",
  },
  {
    icon: Building2,
    title: "Dedikerad support",
    description:
      "Personlig kontaktperson, onboarding-hjälp och prioriterad support dygnet runt.",
  },
];

const stats = [
  { value: "40%", label: "Högre acceptansgrad" },
  { value: "2x", label: "Snabbare offertprocess" },
  { value: "500+", label: "Företagskunder" },
  { value: "98%", label: "Kundnöjdhet" },
];

const caseStudies = [
  {
    company: "Nordberg Bygg AB",
    quote:
      "Med Offert Pro har vi centraliserat hela offertprocessen. Våra 15 säljare sparar i snitt 8 timmar per vecka.",
    name: "Erik Nordberg",
    role: "VD",
    rating: 5,
  },
  {
    company: "Digital Vision Stockholm",
    quote:
      "Vi gick från att tappa offerter i e-postkedjor till att ha full kontroll med pipeline och uppföljning.",
    name: "Lisa Hallström",
    role: "COO",
    rating: 5,
  },
  {
    company: "Cleantech Solutions",
    quote:
      "Enterprise-planen med SSO och API-integration passade perfekt för våra säkerhetskrav.",
    name: "Anders Johansson",
    role: "CTO",
    rating: 5,
  },
];

export default function ForForetagPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-4">
            För företag
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Skala din offertprocess
            <br />
            <span className="text-gray-400">med hela teamet</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Offert Pro för företag ger dig teamsamarbete, avancerad analys och
            enterprise-funktioner för att vinna fler affärer.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup"
              className="inline-flex items-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
            >
              Boka en demo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center px-10 py-4 text-base font-medium text-gray-600 bg-white hover:bg-gray-50 rounded-full transition-all duration-300 border border-gray-200"
            >
              Se priser
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
              Byggt för växande företag
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Allt ditt team behöver för att hantera offerter effektivt i stor
              skala.
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
              Företag som litar på oss
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Se hur andra företag har transformerat sin offertprocess.
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
              Redo att skala?
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
              Boka en kostnadsfri demo och se hur Offert Pro kan hjälpa ditt
              företag att vinna fler affärer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/signup"
                className="inline-flex items-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg group"
              >
                Boka demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center px-10 py-4 text-base font-medium text-gray-600 bg-white hover:bg-gray-50 rounded-full transition-all duration-300 border border-gray-200"
              >
                Se alla planer
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
