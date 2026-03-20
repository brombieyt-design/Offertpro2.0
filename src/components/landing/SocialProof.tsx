import { Star, Building2, BadgeCheck, Zap } from "lucide-react";

const trustItems = [
  {
    icon: Star,
    value: "4.9",
    label: "av 5 betyg",
    sublabel: "200+ recensioner",
    color: "bg-amber-50 text-amber-500",
  },
  {
    icon: Building2,
    value: "500+",
    label: "företag",
    sublabel: "litar på Offert Pro",
    color: "bg-brand-50 text-brand-500",
  },
  {
    icon: Zap,
    value: "2 min",
    label: "snittid",
    sublabel: "per offert",
    color: "bg-purple-50 text-purple-500",
  },
  {
    icon: BadgeCheck,
    value: "100%",
    label: "gratis",
    sublabel: "att komma igång",
    color: "bg-emerald-50 text-emerald-500",
  },
];

export default function SocialProof() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item) => (
            <div key={item.label} className="text-center p-6 rounded-2xl bg-gray-50/80 border border-gray-100/50 hover:shadow-lg hover:bg-white transition-all duration-500 card-hover group">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-500`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="flex items-baseline justify-center gap-1.5 mb-1">
                <span className="text-3xl font-bold tracking-tight text-gray-900">
                  {item.value}
                </span>
                <span className="text-sm text-gray-400 font-medium">{item.label}</span>
              </div>
              <p className="text-xs text-gray-300 tracking-wide">
                {item.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
