import Image from "next/image";
import { ArrowRight, Star, Shield, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-44 pb-16 md:pt-52 md:pb-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none" />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Small badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 mb-10 animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-green-400" />
          <span className="text-xs font-medium text-gray-500 tracking-wide">
            Gratis att komma igång
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.05] animate-fade-in-up">
          Skapa professionella
          <br />
          <span className="text-gray-400">offerter på minuter</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-1">
          Imponera på dina kunder med snygga offerter, spåra i realtid och stäng
          fler affärer snabbare. Allt i en plattform.
        </p>

        {/* CTA buttons */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up-delay-2">
          <a
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            Kom igång gratis
          </a>
          <a
            href="/hur-det-fungerar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300 group"
          >
            Se hur det fungerar
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Trust row */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-10 animate-fade-in-up-delay-3">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">4.9/5</span>
            <span className="text-sm text-gray-300">betyg</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-300" />
            <span className="text-sm text-gray-400">500+ företag</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-gray-300" />
            <span className="text-sm text-gray-400">100% gratis att börja</span>
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative mx-auto max-w-5xl mt-20 animate-fade-in-up-delay-3">
        <div className="rounded-2xl border border-gray-200/60 shadow-2xl shadow-gray-200/40 overflow-hidden bg-white">
          <Image
            src="/images/hero-dashboard.svg"
            alt="Offert Pro dashboard - skapa och hantera offerter"
            width={800}
            height={500}
            className="w-full h-auto"
            priority
          />
        </div>
        {/* Subtle glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
