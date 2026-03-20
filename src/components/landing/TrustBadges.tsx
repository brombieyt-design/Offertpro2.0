import { Shield, Lock, Star, Globe } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "GDPR-kompatibel",
    description: "All data lagras inom EU",
  },
  {
    icon: Lock,
    title: "SSL-kryptering",
    description: "256-bit kryptering",
  },
  {
    icon: Star,
    title: "4.9/5 på G2",
    description: "200+ recensioner",
  },
  {
    icon: Globe,
    title: "99.9% Uptime",
    description: "Enterprise-grade hosting",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 border-y border-gray-100/80">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gray-100 shadow-sm mb-3">
                <badge.icon className="h-4 w-4 text-gray-500" />
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
