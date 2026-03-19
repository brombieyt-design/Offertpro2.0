import { Star, Building2, BadgeCheck } from "lucide-react";

const trustItems = [
  {
    icon: Star,
    label: "4.9 av 5 betyg",
    sublabel: "200+ recensioner",
  },
  {
    icon: Building2,
    label: "500+ företag",
    sublabel: "litar på Offert Pro",
  },
  {
    icon: BadgeCheck,
    label: "100% gratis",
    sublabel: "att komma igång",
  },
];

export default function SocialProof() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/70">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-16">
          {trustItems.map((item, i) => (
            <div key={item.label} className="flex items-center gap-8">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <item.icon className="h-5 w-5 text-gray-400" />
                <div>
                  <span className="text-sm font-semibold text-gray-700">
                    {item.label}
                  </span>
                  <p className="text-xs text-gray-400">{item.sublabel}</p>
                </div>
              </div>
              {i < trustItems.length - 1 && (
                <div className="hidden sm:block w-px h-10 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
