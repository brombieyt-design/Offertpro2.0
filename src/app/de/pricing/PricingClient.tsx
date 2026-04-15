"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";

interface Props {
  dict: Dictionary;
}

const PRICES: Record<string, { monthly: number | null; yearly: number | null; label: string }> = {
  free: { monthly: 0, yearly: 0, label: "€" },
  starter: { monthly: 19, yearly: 15, label: "€" },
  pro: { monthly: 49, yearly: 39, label: "€" },
  enterprise: { monthly: null, yearly: null, label: "" },
};

const faqs = [
  {
    q: "Kann ich es kostenlos testen?",
    a: "Ja — unser Free-Tarif ist dauerhaft kostenlos. Sie können bis zu 5 Angebote pro Monat ohne Kreditkarte erstellen.",
  },
  {
    q: "Kann ich jederzeit den Tarif wechseln?",
    a: "Absolut. Sie können jederzeit upgraden oder downgraden. Änderungen gelten sofort, Sie zahlen nur die Differenz.",
  },
  {
    q: "Gibt es versteckte Gebühren?",
    a: "Keine versteckten Gebühren. Der Preis, den Sie sehen, ist der Preis, den Sie zahlen. Auch keine Kündigungsgebühren.",
  },
  {
    q: "Wie funktionieren die E-Signaturen?",
    a: "E-Signaturen sind nach eIDAS rechtsverbindlich und direkt in die Plattform integriert. Kunden signieren im Browser, ohne Downloads.",
  },
  {
    q: "Kann ich bestehende Kunden importieren?",
    a: "Ja — per CSV importieren oder manuell hinzufügen. Pro-Tarife bieten Integrationen mit gängigen CRM- und Buchhaltungstools.",
  },
  {
    q: "Bieten Sie Support an?",
    a: "Alle Tarife enthalten E-Mail-Support. Pro bietet Prioritäts-Support, Enterprise einen dedizierten Account Manager.",
  },
  {
    q: "Sind meine Daten sicher?",
    a: "Verschlüsselung auf Banken-Niveau, Daten in der EU gespeichert, DSGVO-konform und regelmäßig auditiert.",
  },
  {
    q: "Kann ich mein Abo kündigen?",
    a: "Ja — jederzeit kündbar, keine langfristigen Verträge. Zugang bis zum Ende der Abrechnungsperiode.",
  },
];

export default function PricingClient({ dict }: Props) {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tierKeys = ["free", "starter", "pro", "enterprise"] as const;

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 mb-6">
          <span className="text-xs font-semibold text-brand-600 tracking-wide">
            {dict.pricing.hero.eyebrow}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {dict.pricing.hero.title}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          {dict.pricing.hero.subtitle}
        </p>

        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={cn("text-sm font-medium", !annual ? "text-gray-900" : "text-gray-500")}>
            {dict.pricing.billing.monthly}
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={cn(
              "relative w-12 h-6 rounded-full transition-colors",
              annual ? "bg-brand-600" : "bg-gray-300"
            )}
            aria-label="Jährliche Abrechnung umschalten"
          >
            <div
              className={cn(
                "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
                annual ? "translate-x-6" : "translate-x-0.5"
              )}
            />
          </button>
          <span className={cn("text-sm font-medium", annual ? "text-gray-900" : "text-gray-500")}>
            {dict.pricing.billing.yearly}
          </span>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tierKeys.map((key) => {
            const tier = dict.pricing.tiers[key];
            const p = PRICES[key];
            const isPro = key === "pro";
            const displayPrice =
              p.monthly === null
                ? "Individuell"
                : `${p.label}${annual ? p.yearly : p.monthly}`;
            const ctaLabel =
              key === "free"
                ? dict.pricing.cta.free
                : key === "enterprise"
                ? dict.pricing.cta.contact
                : dict.pricing.cta.paid;
            return (
              <div
                key={key}
                className={cn(
                  "rounded-2xl border p-6 flex flex-col",
                  isPro
                    ? "border-brand-600 ring-2 ring-brand-600 relative"
                    : "border-gray-200"
                )}
              >
                {isPro && "badge" in tier && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-white bg-brand-600 px-3 py-1 rounded-full">
                    {tier.badge}
                  </span>
                )}
                <h3 className="text-lg font-bold text-gray-900">{tier.name}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">{tier.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{displayPrice}</span>
                  {p.monthly !== null && (
                    <span className="text-gray-500 ml-1">{dict.pricing.perMonth}</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f: string) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={key === "enterprise" ? "mailto:hello@offertpro.se" : "/signup"}
                  className={cn(
                    "block text-center py-2.5 text-sm font-semibold rounded-xl transition-colors",
                    isPro
                      ? "bg-brand-600 text-white hover:bg-brand-700"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {ctaLabel}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          Häufig gestellte Fragen
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
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

      {/* Bottom CTA */}
      <section className="bg-brand-600 py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Bereit loszulegen?
        </h2>
        <p className="text-brand-100 mb-8 max-w-xl mx-auto">
          Erstellen Sie noch heute professionelle Angebote. Keine Verpflichtung, keine Kreditkarte.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 text-sm font-semibold bg-white text-brand-600 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Kostenlos starten
          </Link>
        </div>
      </section>
    </>
  );
}
