import { Shield, Lock, Star, Globe } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "GDPR-kompatibel",
    description: "All data lagras inom EU",
    gradient: "from-brand-400 to-indigo-400",
  },
  {
    icon: Lock,
    title: "SSL-kryptering",
    description: "256-bit kryptering",
    gradient: "from-emerald-400 to-teal-400",
  },
  {
    icon: Star,
    title: "4.9/5 på G2",
    description: "200+ recensioner",
    gradient: "from-amber-400 to-orange-400",
  },
  {
    icon: Globe,
    title: "99.9% Uptime",
    description: "Enterprise-grade hosting",
    gradient: "from-purple-400 to-pink-400",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100/80">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex flex-col items-center text-center p-5 rounded-2xl hover:bg-gray-50 transition-all duration-300 group"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${badge.gradient} shadow-sm mb-3 group-hover:scale-110 transition-transform duration-500`}>
                <badge.icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-xs font-semibold text-gray-700">
                {badge.title}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
