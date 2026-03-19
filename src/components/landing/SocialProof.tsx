import { Building2, Star, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "500+",
    label: "småföretag litar på Offert-pro",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "från 200+ recensioner",
  },
  {
    icon: TrendingUp,
    value: "24M+",
    label: "kr i stängda offerter denna månad",
  },
];

export default function SocialProof() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((s) => (
            <div key={s.value} className="flex flex-col items-center text-center">
              <s.icon className="h-6 w-6 text-indigo-600 mb-2" />
              <span className="text-3xl font-bold text-gray-900">{s.value}</span>
              <span className="mt-1 text-sm text-gray-600">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
