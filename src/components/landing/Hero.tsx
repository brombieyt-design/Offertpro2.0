"use client";

import {
  ArrowRight,
  Star,
  Shield,
  Users,
  Sparkles,
} from "lucide-react";

function HeroAnimation() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square" aria-hidden="true">
      {/* Main morphing blob */}
      <div className="absolute inset-8 bg-gradient-to-br from-brand-400 via-accent-500 to-pink-400 opacity-20 animate-hero-morph" />

      {/* Central dashboard card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-72 sm:w-80 animate-hero-float-1">
          {/* Main card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-brand-500/10 border border-gray-100 p-5 sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">OP</span>
                </div>
                <span className="text-xs font-bold text-gray-900">Offert Pro</span>
              </div>
              <span className="text-[10px] font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">OFFERT</span>
            </div>

            {/* Stats mini */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: "Offerter", value: "24", color: "text-brand-600" },
                { label: "Värde", value: "482k", color: "text-emerald-600" },
                { label: "Vinstkvot", value: "68%", color: "text-amber-600" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-[9px] text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Quote lines */}
            <div className="space-y-2">
              {[
                { name: "Webbdesign", amount: "45 000 kr", color: "bg-green-400" },
                { name: "SEO-paket", amount: "12 000 kr", color: "bg-brand-400" },
                { name: "Copywriting", amount: "15 000 kr", color: "bg-amber-400" },
              ].map((line) => (
                <div key={line.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${line.color}`} />
                    <span className="text-xs text-gray-600">{line.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">{line.amount}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">Totalt</span>
              <span className="text-base font-bold text-gray-900">72 000 kr</span>
            </div>
          </div>

          {/* Floating notification - accepted */}
          <div className="absolute -top-4 -right-6 bg-white rounded-xl shadow-lg shadow-green-500/10 border border-green-100 px-3 py-2 animate-hero-float-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[10px] font-semibold text-green-700">Offert accepterad!</span>
            </div>
          </div>

          {/* Floating notification - tracking */}
          <div className="absolute -bottom-3 -left-8 bg-white rounded-xl shadow-lg shadow-brand-500/10 border border-brand-100 px-3 py-2 animate-hero-float-1" style={{ animationDelay: "2s" }}>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-600" />
              </div>
              <span className="text-[10px] font-semibold text-brand-700">Kunden öppnade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Orbiting dots */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        {/* Dashed orbit ring */}
        <circle cx="200" cy="200" r="170" fill="none" stroke="url(#orbit-gradient)" strokeWidth="1" strokeDasharray="6 6" className="animate-dash-move opacity-20" />
        <circle cx="200" cy="200" r="130" fill="none" stroke="url(#orbit-gradient)" strokeWidth="1" strokeDasharray="4 8" className="animate-dash-move opacity-15" style={{ animationDirection: "reverse" }} />
        <defs>
          <linearGradient id="orbit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-400)" />
            <stop offset="100%" stopColor="var(--color-accent-400)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-brand-50/50 via-white to-white">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-brand-400) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — text content */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            {/* Announcement badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 mb-8 animate-fade-in-up">
              <Sparkles className="h-3.5 w-3.5 text-brand-500" />
              <span className="text-xs font-semibold text-brand-600 tracking-wide">
                Ny version 2.0 — snabbare än någonsin
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-7xl font-bold tracking-tight text-gray-900 leading-[1.08] animate-fade-in-up">
              Skapa professionella{" "}
              <span className="gradient-text">
                offerter på minuter
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg text-gray-500 leading-relaxed animate-fade-in-up-delay-1 max-w-lg mx-auto lg:mx-0">
              Imponera på dina kunder med snygga offerter, spåra i realtid och
              stäng fler affärer snabbare. Allt i en plattform.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-fade-in-up-delay-2">
              <a
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-full transition-all duration-200 shadow-md shadow-brand-600/25 hover:shadow-lg hover:shadow-brand-600/30 group"
              >
                Kom igång gratis
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="#hur-det-fungerar"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 rounded-full border border-gray-200 transition-all duration-200 hover:border-gray-300"
              >
                Se hur det fungerar
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 animate-fade-in-up-delay-3">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-800 ml-1">4.9/5</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Users className="h-3.5 w-3.5 text-brand-400" />
                <span className="font-medium">500+ företag</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Shield className="h-3.5 w-3.5 text-brand-400" />
                <span className="font-medium">GDPR-säkert</span>
              </div>
            </div>
          </div>

          {/* Right — animated hero visual */}
          <div className="hidden md:block animate-fade-in-up-delay-2">
            <HeroAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
