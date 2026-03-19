import { Star, Building2, BadgeCheck } from "lucide-react";

const trustItems = [
  {
    icon: Star,
    value: "4.9",
    label: "av 5 betyg",
    sublabel: "200+ recensioner",
  },
  {
    icon: Building2,
    value: "500+",
    label: "företag",
    sublabel: "litar på Offert Pro",
  },
  {
    icon: BadgeCheck,
    value: "100%",
    label: "gratis",
    sublabel: "att komma igång",
  },
];

export default function SocialProof() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 border-y border-gray-100/80">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-16 sm:gap-20">
          {trustItems.map((item, i) => (
            <div key={item.label} className="flex items-center gap-12">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <item.icon className="h-4 w-4 text-gray-300" />
                  <span className="text-2xl font-bold tracking-tight text-gray-900">
                    {item.value}
                  </span>
                  <span className="text-sm text-gray-400">{item.label}</span>
                </div>
                <p className="text-xs text-gray-300 tracking-wide">
                  {item.sublabel}
                </p>
              </div>
              {i < trustItems.length - 1 && (
                <div className="hidden sm:block w-px h-12 bg-gray-200/70" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
