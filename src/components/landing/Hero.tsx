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
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-44 pb-16 md:pt-52 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 pointer-events-none" />
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 -right-32 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Small badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 shadow-sm mb-10 animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-indigo-600 tracking-wide">
            Gratis att komma igång
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.05] animate-fade-in-up">
          Skapa professionella
          <br />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            offerter på minuter
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-1">
          Imponera på dina kunder med snygga offerter, spåra i realtid och stäng
          fler affärer snabbare. Allt i en plattform.
        </p>

        {/* CTA buttons */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up-delay-2">
          <a
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all duration-300 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5"
          >
            Kom igång gratis
          </a>
          <a
            href="/hur-det-fungerar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-300 group"
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
            <span className="text-sm text-gray-400">betyg</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-400" />
            <span className="text-sm text-gray-500">500+ företag</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-indigo-400" />
            <span className="text-sm text-gray-500">100% gratis att börja</span>
          </div>
        </div>
      </div>

      {/* Hero — live dashboard mockup */}
      <div className="relative mx-auto max-w-5xl mt-20 animate-fade-in-up-delay-3">
        {/* Glow behind card */}
        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200/40 via-purple-200/40 to-pink-200/40 rounded-3xl blur-2xl pointer-events-none" />
        <div className="relative rounded-2xl border border-gray-200/60 shadow-2xl shadow-indigo-200/20 overflow-hidden bg-white/80 backdrop-blur-sm p-5 sm:p-8">
          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {[
              { label: "Aktiva offerter", value: "24", icon: FileText, color: "bg-indigo-50 text-indigo-600", ring: "ring-indigo-100" },
              { label: "Totalt värde", value: "482 000 kr", icon: DollarSign, color: "bg-emerald-50 text-emerald-600", ring: "ring-emerald-100" },
              { label: "Vinstfrekvens", value: "68%", icon: TrendingUp, color: "bg-amber-50 text-amber-600", ring: "ring-amber-100" },
              { label: "Accepterade", value: "16", icon: CheckCircle2, color: "bg-green-50 text-green-600", ring: "ring-green-100" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 hover:shadow-md transition-shadow duration-300">
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
              <span className="text-xs text-indigo-500 font-medium cursor-pointer hover:text-indigo-700 transition-colors">Visa alla</span>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { id: "QT-2026-031", customer: "Andersson Bygg AB", amount: "85 400 kr", status: "Accepterad", statusColor: "bg-green-50 text-green-700", icon: CheckCircle2, iconColor: "text-green-500" },
                { id: "QT-2026-030", customer: "Nordström Design", amount: "42 000 kr", status: "Öppnad", statusColor: "bg-blue-50 text-blue-700", icon: Eye, iconColor: "text-blue-500" },
                { id: "QT-2026-029", customer: "TechFlow Solutions", amount: "128 500 kr", status: "Skickad", statusColor: "bg-amber-50 text-amber-700", icon: Clock, iconColor: "text-amber-500" },
                { id: "QT-2026-028", customer: "Grön Energi AB", amount: "67 200 kr", status: "Accepterad", statusColor: "bg-green-50 text-green-700", icon: CheckCircle2, iconColor: "text-green-500" },
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
        <div className="absolute -inset-4 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 40C240 70 480 10 720 40C960 70 1200 10 1440 40V80H0V40Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
