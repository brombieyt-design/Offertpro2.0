import { Star } from "lucide-react";
import { testimonials } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section id="om-oss" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50/70">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Vad våra kunder säger
          </h2>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed">
            Hundratals företag använder Offert Pro för att vinna fler affärer.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-8">
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
