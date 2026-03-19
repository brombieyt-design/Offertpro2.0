import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-40 pb-24 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 bg-white min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-4xl text-center">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.08] animate-fade-in-up">
          Skapa professionella
          <br />
          offerter på minuter
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-1">
          Imponera på dina kunder med snygga offerter, spåra i realtid och stäng
          fler affärer snabbare. Allt i en plattform.
        </p>

        {/* CTA buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up-delay-2">
          <a
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Kom igång gratis
          </a>
          <a
            href="#hur-det-fungerar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300"
          >
            Se hur det fungerar
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Trust row */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400 animate-fade-in-up-delay-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="font-medium text-gray-600">4.9/5</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-200" />
          <span>500+ företag</span>
          <div className="hidden sm:block w-px h-4 bg-gray-200" />
          <span>100% gratis att börja</span>
        </div>
      </div>
    </section>
  );
}
