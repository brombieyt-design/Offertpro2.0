import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/constants";

const avatarColors = [
  "bg-gradient-to-br from-brand-400 to-purple-400 text-white",
  "bg-gradient-to-br from-emerald-400 to-teal-400 text-white",
  "bg-gradient-to-br from-amber-400 to-orange-400 text-white",
];

export default function Testimonials() {
  return (
    <section
      id="om-oss"
      className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-gray-50/50 relative overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 mb-6">
            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
            <span className="text-xs font-semibold text-amber-600 tracking-wide">Kundröster</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Vad våra kunder säger
          </h2>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Hundratals företag använder Offert Pro för att vinna fler affärer.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-500/5 card-hover border border-gray-100 relative overflow-hidden group"
            >
              {/* Quote decoration */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-gray-100 group-hover:text-brand-100 transition-colors duration-500" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-8">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-base text-gray-600 leading-relaxed relative">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-4">
                {/* Avatar */}
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold shrink-0 shadow-sm ${avatarColors[i % avatarColors.length]}`}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust line */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="font-medium">4.9/5 genomsnittligt betyg</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-200" />
          <span>200+ verifierade recensioner</span>
          <div className="hidden sm:block w-px h-4 bg-gray-200" />
          <span>500+ aktiva företag</span>
        </div>
      </div>
    </section>
  );
}
