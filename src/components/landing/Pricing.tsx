import { Check, Sparkles } from "lucide-react";
import { pricingTiers } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Pricing() {
  return (
    <section
      id="priser"
      className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      <div className="absolute top-20 left-[20%] w-96 h-96 bg-brand-100/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-[20%] w-80 h-80 bg-purple-100/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 mb-6">
            <span className="text-xs font-semibold text-brand-600 tracking-wide">Prissättning</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Enkla, transparenta priser
          </h2>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Inga dolda avgifter. Uppgradera, nedgradera eller avsluta när du
            vill.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative rounded-3xl p-8 lg:p-10 flex flex-col transition-all duration-500 card-hover",
                tier.popular
                  ? "bg-gray-900 text-white shadow-2xl shadow-gray-900/20 ring-0 scale-[1.02] lg:scale-105"
                  : "bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-xl"
              )}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-500 to-purple-500 px-5 py-1.5 text-xs font-semibold text-white tracking-wide shadow-lg shadow-brand-500/20">
                  <Sparkles className="h-3 w-3" />
                  Mest populär
                </span>
              )}

              <h3 className={cn("text-lg font-semibold tracking-tight", tier.popular ? "text-white" : "text-gray-900")}>
                {tier.name}
              </h3>
              <p className={cn("mt-2 text-sm", tier.popular ? "text-gray-400" : "text-gray-400")}>{tier.description}</p>

              <div className="mt-8 flex items-baseline gap-1">
                <span className={cn("text-5xl font-bold tracking-tight", tier.popular ? "text-white" : "text-gray-900")}>
                  {tier.price === 0 ? "0" : tier.price}
                </span>
                <span className={cn("text-sm ml-1", tier.popular ? "text-gray-500" : "text-gray-300")}>
                  kr{tier.period}
                </span>
              </div>

              <p className={cn("mt-2 text-xs", tier.popular ? "text-gray-500" : "text-gray-300")}>{tier.users}</p>

              <ul className="mt-10 space-y-4 flex-1">
                {tier.features.map((feat) => (
                  <li
                    key={feat}
                    className={cn("flex items-start gap-3 text-sm", tier.popular ? "text-gray-300" : "text-gray-500")}
                  >
                    <Check className={cn("h-4 w-4 mt-0.5 shrink-0", tier.popular ? "text-brand-400" : "text-gray-900")} />
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href="/signup"
                className={cn(
                  "mt-10 block w-full text-center text-sm font-semibold py-3.5 rounded-full transition-all duration-300",
                  tier.popular
                    ? "bg-white text-gray-900 hover:bg-gray-100 shadow-sm"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
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
