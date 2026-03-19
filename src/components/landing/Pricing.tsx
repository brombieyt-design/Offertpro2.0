import { Check } from "lucide-react";
import { pricingTiers } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Pricing() {
  return (
    <section id="priser" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Enkla, transparenta priser
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Inga dolda avgifter. Uppgradera, nedgradera eller avsluta när du
            vill.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative rounded-xl border bg-white shadow-sm p-6 flex flex-col",
                tier.popular
                  ? "border-indigo-600 ring-2 ring-indigo-600"
                  : "border-gray-100"
              )}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-semibold text-white">
                  Mest populär
                </span>
              )}

              <h3 className="text-lg font-semibold text-gray-900">
                {tier.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{tier.description}</p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">
                  {tier.price === 0 ? "0" : tier.price}
                </span>
                <span className="text-sm text-gray-500">kr{tier.period}</span>
              </div>

              <p className="mt-1 text-xs text-gray-500">{tier.users}</p>

              <ul className="mt-6 space-y-3 flex-1">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href="/signup"
                className={cn(
                  "mt-8 block w-full text-center text-sm font-medium py-2.5 rounded-lg transition-colors",
                  tier.popular
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
                )}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
