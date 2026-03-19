import { Check } from "lucide-react";
import { pricingTiers } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Pricing() {
  return (
    <section id="priser" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Enkla, transparenta priser
          </h2>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed">
            Inga dolda avgifter. Uppgradera, nedgradera eller avsluta när du
            vill.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative rounded-2xl bg-white p-8 flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
                tier.popular
                  ? "ring-2 ring-indigo-600 shadow-lg"
                  : "border border-gray-100 shadow-sm hover:shadow-lg"
              )}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white">
                  Mest populär
                </span>
              )}

              <h3 className="text-lg font-semibold text-gray-900">
                {tier.name}
              </h3>
              <p className="mt-2 text-sm text-gray-400">{tier.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight text-gray-900">
                  {tier.price === 0 ? "0" : tier.price}
                </span>
                <span className="text-sm text-gray-400">kr{tier.period}</span>
              </div>

              <p className="mt-2 text-xs text-gray-400">{tier.users}</p>

              <ul className="mt-8 space-y-4 flex-1">
                {tier.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <Check className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href="/signup"
                className={cn(
                  "mt-10 block w-full text-center text-sm font-medium py-3 rounded-full transition-all duration-300",
                  tier.popular
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md"
                    : "bg-gray-50 text-gray-900 hover:bg-gray-100"
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
