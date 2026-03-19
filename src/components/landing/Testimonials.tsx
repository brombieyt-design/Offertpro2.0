import { Star } from "lucide-react";
import { testimonials } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section id="om-oss" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Vad våra kunder säger
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Hundratals företag använder Offert-pro för att vinna fler affärer.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-gray-100 shadow-sm p-6"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-sm text-gray-600 italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-4">
                <p className="text-sm font-bold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-500">
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
