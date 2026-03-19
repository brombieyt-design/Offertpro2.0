"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { pricingTiers, testimonials } from "@/lib/constants";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const faqs = [
  {
    q: "Kan jag testa gratis?",
    a: "Ja! Vår gratisplan är helt gratis för alltid. Du kan skapa upp till 5 offerter per månad utan att ange kreditkort.",
  },
  {
    q: "Kan jag byta plan när som helst?",
    a: "Absolut. Du kan uppgradera eller nedgradera din plan när som helst. Ändringen träder i kraft direkt.",
  },
  {
    q: "Finns det några dolda avgifter?",
    a: "Nej, inga dolda avgifter. Priset du ser är vad du betalar. Inga uppsägningsavgifter heller.",
  },
  {
    q: "Hur fungerar e-signaturerna?",
    a: "E-signaturer är juridiskt bindande och inbyggda i plattformen. Kunder kan signera direkt i webbläsaren utan att ladda ner något.",
  },
  {
    q: "Kan jag importera befintliga kunder?",
    a: "Ja, du kan importera kunder via CSV-fil eller lägga till dem manuellt. Vi stödjer även integration med populära CRM-system på Pro-planen.",
  },
  {
    q: "Erbjuder ni support?",
    a: "Alla planer inkluderar e-postsupport. Pro-planen har prioriterad support och Business-planen inkluderar en dedikerad kontaktperson.",
  },
  {
    q: "Är mina data säkra?",
    a: "Vi använder bankgrad kryptering och lagrar all data inom EU. Vi följer GDPR och gör regelbundna säkerhetsgranskningar.",
  },
  {
    q: "Kan jag avbryta min prenumeration?",
    a: "Ja, du kan avbryta när som helst utan bindningstid. Du behåller tillgång till din plan till slutet av faktureringsperioden.",
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Enkla, transparenta priser
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Börja gratis. Väx i din takt. Ingen bindningstid.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={cn("text-sm font-medium", !annual ? "text-gray-900" : "text-gray-500")}>
            Månadsvis
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={cn(
              "relative w-12 h-6 rounded-full transition-colors",
              annual ? "bg-indigo-600" : "bg-gray-300"
            )}
          >
            <div
              className={cn(
                "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
                annual ? "translate-x-6" : "translate-x-0.5"
              )}
            />
          </button>
          <span className={cn("text-sm font-medium", annual ? "text-gray-900" : "text-gray-500")}>
            Årsvis
          </span>
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
            Spara 20%
          </span>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier) => {
            const price = annual ? Math.round(tier.price * 0.8) : tier.price;
            return (
              <div
                key={tier.name}
                className={cn(
                  "rounded-2xl border p-6 flex flex-col",
                  tier.popular
                    ? "border-indigo-600 ring-2 ring-indigo-600 relative"
                    : "border-gray-200"
                )}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-white bg-indigo-600 px-3 py-1 rounded-full">
                    Mest populär
                  </span>
                )}
                <h3 className="text-lg font-bold text-gray-900">{tier.name}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">{tier.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{price}</span>
                  <span className="text-gray-500 ml-1">kr{tier.period}</span>
                </div>
                <p className="text-xs text-gray-500 mb-6">{tier.users}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={cn(
                    "block text-center py-2.5 text-sm font-semibold rounded-xl transition-colors",
                    tier.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {tier.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          Vanliga frågor
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {faq.q}
                {openFaq === i ? (
                  <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-gray-600">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          Vad våra kunder säger
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-gray-50 rounded-xl p-6">
              <p className="text-sm text-gray-700 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-gray-900">{t.name}</p>
              <p className="text-xs text-gray-500">
                {t.role}, {t.company}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-indigo-600 py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Redo att komma igång?
        </h2>
        <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
          Börja skapa professionella offerter idag. Ingen bindningstid, inget kreditkort.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 text-sm font-semibold bg-white text-indigo-600 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Börja gratis idag
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
