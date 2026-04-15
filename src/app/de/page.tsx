import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Eye,
  PenTool,
  Copy,
  Bell,
  GitBranch,
  Check,
  Star,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import NavbarDe from "@/components/landing/de/NavbarDe";
import HeroDe from "@/components/landing/de/HeroDe";
import FooterDe from "@/components/landing/de/FooterDe";
import { getDictionary } from "@/i18n/dictionaries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://offertpro.se";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary("de");
  return {
    title: dict.home.meta.title,
    description: dict.home.meta.description,
    alternates: {
      canonical: `${SITE_URL}/de`,
      languages: {
        "sv-SE": SITE_URL,
        en: `${SITE_URL}/en`,
        de: `${SITE_URL}/de`,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      title: dict.home.meta.title,
      description: dict.home.meta.description,
      url: `${SITE_URL}/de`,
      locale: "de",
      alternateLocale: ["sv_SE", "en"],
      type: "website",
      siteName: "Offert Pro",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Offert Pro – Professionelle Angebote und Rechnungen für moderne Kleinunternehmen",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.home.meta.title,
      description: dict.home.meta.description,
      images: ["/og-image.png"],
    },
  };
}

const featureIcons = [FileText, Eye, PenTool, Copy, Bell, GitBranch];

export default async function DeHome() {
  const dict = await getDictionary("de");
  const featureEntries = Object.entries(dict.home.features.items) as [
    string,
    { title: string; description: string }
  ][];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "de",
    mainEntity: dict.home.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: `${SITE_URL}/de` },
    ],
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Offert Pro",
    url: `${SITE_URL}/de`,
    inLanguage: "de",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: dict.home.meta.description,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "0",
      highPrice: "99",
      offerCount: "4",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Professionelle PDF-Angebote",
      "E-Signaturen (eIDAS)",
      "Echtzeit-Tracking",
      "Wiederverwendbare Vorlagen",
      "Automatische Erinnerungen",
      "Angebot zu Rechnung",
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      <NavbarDe />

      <section aria-label="Hero">
        <HeroDe />
      </section>

      {/* Social proof / stats */}
      <section aria-label="Social Proof" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold tracking-tight text-gray-900">500+</p>
              <p className="mt-2 text-sm text-gray-500">{dict.home.socialProof.businesses}</p>
            </div>
            <div>
              <p className="text-4xl font-bold tracking-tight text-gray-900">4,9<span className="text-lg text-gray-400">/5</span></p>
              <p className="mt-2 text-sm text-gray-500">{dict.home.socialProof.rating}</p>
            </div>
            <div>
              <p className="text-4xl font-bold tracking-tight text-gray-900">2,4 Mio. €+</p>
              <p className="mt-2 text-sm text-gray-500">{dict.home.socialProof.volume}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        aria-label="Funktionen"
        className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-gray-50/50"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 mb-6">
              <span className="text-xs font-semibold text-purple-600 tracking-wide">
                Funktionen
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              {dict.home.features.title}
            </h2>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              {dict.home.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featureEntries.map(([key, item], i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <div
                  key={key}
                  className="relative bg-white rounded-2xl p-8 lg:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-500/5 group border border-gray-100 overflow-hidden"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 mb-6 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-purple-500 transition-all duration-500">
                    <Icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        aria-label="So funktioniert's"
        className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 mb-6">
              <span className="text-xs font-semibold text-brand-600 tracking-wide">
                So funktioniert&apos;s
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Drei Schritte zu Ihrem perfekten Angebot
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                number: "01",
                title: "Angebot erstellen",
                description:
                  "Kundendaten eingeben, Positionen hinzufügen und aus gespeicherten Vorlagen wählen. In unter 2 Minuten fertig.",
              },
              {
                number: "02",
                title: "Senden & verfolgen",
                description:
                  "Als PDF per E-Mail versenden. In Echtzeit sehen, wann Ihr Kunde das Angebot öffnet und liest.",
              },
              {
                number: "03",
                title: "Auftrag gewinnen",
                description:
                  "Angenommenes Angebot mit einem Klick in eine Rechnung umwandeln. Alles fließt automatisch.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="relative bg-white rounded-3xl p-10 lg:p-12 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-500/5 border border-gray-100 group"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-500">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section aria-label="Vertrauen und Sicherheit" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "DSGVO-konform", body: "Daten in der EU gespeichert, im Ruhezustand und bei Übertragung verschlüsselt." },
              { icon: PenTool, title: "eIDAS E-Signaturen", body: "Rechtsverbindliche elektronische Signaturen in der gesamten Europäischen Union." },
              { icon: Zap, title: "Auf Geschwindigkeit ausgelegt", body: "Ein Angebot in weniger als 5 Minuten erstellen, senden und nachverfolgen." },
              { icon: Globe, title: "Mehrere Währungen", body: "Funktioniert mit EUR, SEK, USD, GBP und mehr — MwSt.-kompatibel." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6">
                <Icon className="h-5 w-5 text-brand-600 mb-4" />
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section aria-label="Preise" className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 mb-6">
              <span className="text-xs font-semibold text-brand-600 tracking-wide">
                {dict.pricing.hero.eyebrow}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              {dict.pricing.hero.title}
            </h2>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              {dict.pricing.hero.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {(["free", "starter", "pro", "enterprise"] as const).map((tier) => {
              const t = dict.pricing.tiers[tier];
              const prices: Record<typeof tier, string> = {
                free: "0 €",
                starter: "19 €",
                pro: "49 €",
                enterprise: "Individuell",
              };
              const isPro = tier === "pro";
              return (
                <div
                  key={tier}
                  className={`relative rounded-3xl p-8 border ${
                    isPro
                      ? "border-brand-200 bg-gradient-to-b from-brand-50/60 to-white shadow-lg shadow-brand-500/10"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  {isPro && "badge" in t && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-600 text-white text-[10px] font-semibold tracking-wide uppercase">
                      {t.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">{t.name}</h3>
                  <p className="mt-1 text-sm text-gray-400">{t.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      {prices[tier]}
                    </span>
                    {tier !== "enterprise" && (
                      <span className="text-sm text-gray-400">{dict.pricing.perMonth}</span>
                    )}
                  </div>
                  <ul className="mt-6 space-y-2.5">
                    {t.features.map((f: string) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-brand-600 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tier === "enterprise" ? "mailto:hello@offertpro.se" : "/signup"}
                    className={`mt-8 block text-center text-sm font-semibold py-3 rounded-full transition-all duration-200 ${
                      isPro
                        ? "bg-brand-600 text-white hover:bg-brand-700"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {tier === "free"
                      ? dict.pricing.cta.free
                      : tier === "enterprise"
                      ? dict.pricing.cta.contact
                      : dict.pricing.cta.paid}
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-center text-sm text-gray-400">
            <Link href="/de/pricing" className="text-brand-600 hover:text-brand-700 font-medium">
              Alle Tarife vergleichen →
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section aria-label="FAQ" className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              {dict.home.faq.title}
            </h2>
          </div>
          <div className="space-y-4">
            {dict.home.faq.items.map((item, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-gray-100 p-6 transition-all hover:border-gray-200"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-base font-semibold text-gray-900">{item.q}</h3>
                  <span className="ml-4 text-brand-600 group-open:rotate-45 transition-transform duration-200">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-gray-500 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section aria-label="Kundenstimmen" className="py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Wir haben die Zeit vom ersten Kontakt bis zum unterzeichneten Angebot um 60% reduziert. Kunden lieben das saubere Design und das Echtzeit-Tracking verschafft uns einen enormen Vorteil.",
                author: "Sara Lindqvist",
                role: "Gründerin, Studio North",
              },
              {
                quote:
                  "Die beste Investition des Jahres. Die Einrichtung dauerte 20 Minuten und wir haben in derselben Woche den ersten Auftrag über Offert Pro gewonnen.",
                author: "Marco Bianchi",
                role: "CEO, Bianchi Consulting",
              },
              {
                quote:
                  "Durchdacht, einfach und funktioniert einfach. Schon der E-Signatur-Flow hat uns davor bewahrt, etwas Eigenes zu bauen.",
                author: "Ines Dubois",
                role: "Operations Lead, Atelier Paris",
              },
            ].map((t) => (
              <figure
                key={t.author}
                className="bg-gray-50/60 rounded-2xl p-8 border border-gray-100"
              >
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-gray-700 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">{t.author}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section aria-label="Call to action" className="py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-600 via-brand-600 to-purple-600">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {dict.home.cta.title}
          </h2>
          <p className="mt-6 text-lg text-white/80">{dict.home.cta.subtitle}</p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-brand-600 bg-white hover:bg-gray-50 rounded-full transition-all shadow-lg group"
            >
              {dict.home.cta.button}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/de/pricing"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/20"
            >
              Preise ansehen
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/60">{dict.home.hero.noCreditCard}</p>
        </div>
      </section>

      <FooterDe />
    </main>
  );
}
