import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/constants";

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
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-10 transition-all duration-500 hover:shadow-xl card-hover border border-gray-100/50"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-10 pt-6 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                <p className="mt-1 text-sm text-gray-400">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
