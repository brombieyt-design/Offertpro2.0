import { Sparkles, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 mb-6">
          <Sparkles className="h-4 w-4" />
          Nu med AI-drivna offerttips
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
          Vinn fler affärer med{" "}
          <span className="text-indigo-600">snygga offerter</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Skapa professionella offerter och fakturor på minuter. Spåra i
          realtid, få e-signaturer och stäng fler affärer snabbare.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
          >
            Kom igång gratis – inget kort krävs
          </a>
          <a
            href="#demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Play className="h-4 w-4" />
            Se hur det fungerar
          </a>
        </div>

        {/* Trust line */}
        <p className="mt-8 text-sm text-gray-500">
          Gratis för alltid &middot; Inget kreditkort &middot; Starta på 2 minuter
        </p>
      </div>
    </section>
  );
}
