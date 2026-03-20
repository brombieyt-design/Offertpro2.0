import {
  ArrowRight,
  Star,
  Shield,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  Eye,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-44 pb-20 md:pt-56 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-[#fafbff]" />
      <div className="absolute inset-0 mesh-gradient opacity-[0.07]" />

      {/* Animated grid */}
      <div className="absolute inset-0 dot-grid opacity-60" />

      {/* Floating orbs */}
      <div className="absolute top-32 left-[10%] w-72 h-72 bg-brand-400/10 rounded-full blur-[100px] animate-glow-pulse pointer-events-none" />
      <div className="absolute top-48 right-[10%] w-80 h-80 bg-purple-400/10 rounded-full blur-[100px] animate-glow-pulse pointer-events-none" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-20 left-[30%] w-64 h-64 bg-pink-300/8 rounded-full blur-[80px] animate-glow-pulse pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Announcement badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-brand-100/50 shadow-sm mb-12 animate-fade-in-up">
          <Sparkles className="h-3.5 w-3.5 text-brand-500" />
          <span className="text-xs font-semibold text-brand-600 tracking-wide">
            Ny version 2.0 — snabbare än någonsin
          </span>
          <ArrowRight className="h-3 w-3 text-brand-400" />
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-gray-900 leading-[1.05] animate-fade-in-up">
          Skapa professionella
          <br />
          <span className="gradient-text">
            offerter på minuter
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-1">
          Imponera på dina kunder med snygga offerter, spåra i realtid och stäng
          fler affärer snabbare. Allt i en plattform.
        </p>

        {/* CTA buttons */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up-delay-2">
          <a
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-300 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-0.5 group"
          >
            Kom igång gratis
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#hur-det-fungerar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-gray-600 bg-white hover:bg-gray-50 rounded-full border border-gray-200 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
          >
            Se hur det fungerar
          </a>
        </div>

        {/* Trust row */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-10 animate-fade-in-up-delay-3">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-800">4.9/5</span>
            <span className="text-sm text-gray-400">betyg</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-brand-500" />
            <span className="text-sm text-gray-500 font-medium">500+ företag</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-brand-500" />
            <span className="text-sm text-gray-500 font-medium">100% gratis att börja</span>
          </div>
        </div>
      </div>

      {/* Hero — live dashboard mockup */}
      <div className="relative mx-auto max-w-5xl mt-24 animate-fade-in-up-delay-4">
        {/* Glow behind card */}
        <div className="absolute -inset-8 bg-gradient-to-r from-brand-400/20 via-purple-400/20 to-pink-400/20 rounded-[2rem] blur-3xl pointer-events-none animate-glow-pulse" />
        <div className="relative rounded-2xl border border-gray-200/60 shadow-2xl shadow-brand-500/10 overflow-hidden bg-white/90 backdrop-blur-sm p-5 sm:p-8 glow">
          {/* Browser dots */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-100 rounded-lg px-4 py-1.5 text-xs text-gray-400 text-center max-w-xs mx-auto">
                app.offertpro.se/dashboard
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {[
              { label: "Aktiva offerter", value: "24", icon: FileText, color: "bg-brand-50 text-brand-600", ring: "ring-brand-100" },
              { label: "Totalt värde", value: "482 000 kr", icon: DollarSign, color: "bg-emerald-50 text-emerald-600", ring: "ring-emerald-100" },
              { label: "Vinstfrekvens", value: "68%", icon: TrendingUp, color: "bg-amber-50 text-amber-600", ring: "ring-amber-100" },
              { label: "Accepterade", value: "16", icon: CheckCircle2, color: "bg-green-50 text-green-600", ring: "ring-green-100" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 hover:shadow-md transition-all duration-300 hover:border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color} ring-1 ${s.ring}`}>
                    <s.icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Quotes table */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Senaste offerter</h3>
              <span className="text-xs text-brand-500 font-medium cursor-pointer hover:text-brand-700 transition-colors">Visa alla</span>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { id: "QT-2026-031", customer: "Andersson Bygg AB", amount: "85 400 kr", status: "Accepterad", statusColor: "bg-green-50 text-green-700 ring-1 ring-green-200/50", icon: CheckCircle2, iconColor: "text-green-500" },
                { id: "QT-2026-030", customer: "Nordström Design", amount: "42 000 kr", status: "Öppnad", statusColor: "bg-blue-50 text-blue-700 ring-1 ring-blue-200/50", icon: Eye, iconColor: "text-blue-500" },
                { id: "QT-2026-029", customer: "TechFlow Solutions", amount: "128 500 kr", status: "Skickad", statusColor: "bg-amber-50 text-amber-700 ring-1 ring-amber-200/50", icon: Clock, iconColor: "text-amber-500" },
                { id: "QT-2026-028", customer: "Grön Energi AB", amount: "67 200 kr", status: "Accepterad", statusColor: "bg-green-50 text-green-700 ring-1 ring-green-200/50", icon: CheckCircle2, iconColor: "text-green-500" },
              ].map((q) => (
                <div key={q.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <q.icon className={`w-4 h-4 shrink-0 ${q.iconColor}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{q.customer}</p>
                      <p className="text-xs text-gray-400">{q.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-semibold text-gray-900 hidden sm:block">{q.amount}</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${q.statusColor}`}>{q.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom fade */}
        <div className="absolute -inset-4 bg-gradient-to-t from-[#fafbff] via-transparent to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
