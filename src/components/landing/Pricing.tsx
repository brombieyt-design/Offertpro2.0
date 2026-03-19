import { Check } from "lucide-react";
import { pricingTiers } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Pricing() {
  return (
    <section
      id="priser"
      className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
            Prissättning
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Enkla, transparenta priser
          </h2>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
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
                "relative rounded-3xl bg-white p-8 lg:p-10 flex flex-col transition-all duration-500 card-hover",
                tier.popular
                  ? "ring-2 ring-gray-900 shadow-xl"
                  : "border border-gray-100 shadow-sm hover:shadow-xl"
              )}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-gray-900 px-5 py-1 text-xs font-medium text-white tracking-wide">
                  Mest populär
                </span>
              )}

              <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                {tier.name}
              </h3>
              <p className="mt-2 text-sm text-gray-400">{tier.description}</p>

              <div className="mt-8 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight text-gray-900">
                  {tier.price === 0 ? "0" : tier.price}
                </span>
                <span className="text-sm text-gray-300 ml-1">
                  kr{tier.period}
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-300">{tier.users}</p>

              <ul className="mt-10 space-y-4 flex-1">
                {tier.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-3 text-sm text-gray-500"
                  >
                    <Check className="h-4 w-4 text-gray-900 mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href="/signup"
                className={cn(
                  "mt-10 block w-full text-center text-sm font-medium py-3.5 rounded-full transition-all duration-300",
                  tier.popular
                    ? "bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md"
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
