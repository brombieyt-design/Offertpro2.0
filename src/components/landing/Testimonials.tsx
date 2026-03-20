import { Star } from "lucide-react";
import { testimonials } from "@/lib/constants";

const avatarColors = [
  "bg-indigo-100 text-indigo-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
];

export default function Testimonials() {
  return (
    <section
      id="om-oss"
      className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-gray-50/50"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
            Kundröster
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Vad våra kunder säger
          </h2>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Hundratals företag använder Offert Pro för att vinna fler affärer.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-10 transition-all duration-500 hover:shadow-xl card-hover border border-gray-100/50"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-4">
                {/* Avatar */}
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold shrink-0 ${avatarColors[i % avatarColors.length]}`}
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
                  className="h-3 w-3 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span>4.9/5 genomsnittligt betyg</span>
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
