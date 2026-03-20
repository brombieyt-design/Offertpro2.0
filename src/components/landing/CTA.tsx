import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-4xl text-center">
        <div className="relative rounded-[2rem] bg-gray-950 px-8 py-20 md:px-16 md:py-28 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 mesh-gradient opacity-[0.12]" />
          <div className="absolute inset-0 dot-grid opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)" }} />

          {/* Glow orbs */}
          <div className="absolute top-10 left-[20%] w-60 h-60 bg-brand-500/15 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-10 right-[20%] w-48 h-48 bg-purple-500/15 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
              <Sparkles className="h-3 w-3 text-brand-300" />
              <span className="text-xs font-semibold text-brand-300 tracking-wide">Kom igång idag</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Redo att komma igång?
            </h2>
            <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
              Gå med hundratals företag som redan använder Offert Pro för att skapa
              professionella offerter och stänga fler avtal.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-gray-900 bg-white hover:bg-gray-100 rounded-full transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-xl group"
              >
                Börja gratis idag
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              Inget kreditkort krävs. Kom igång på under 2 minuter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
