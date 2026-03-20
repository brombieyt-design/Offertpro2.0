import {
  CreditCard,
  FileSpreadsheet,
  Mail,
  Calendar,
  Cloud,
  Shield,
  ArrowRight,
} from "lucide-react";

const integrations = [
  {
    name: "Fortnox",
    description: "Synka kunder, fakturor och bokföring automatiskt.",
    icon: FileSpreadsheet,
  },
  {
    name: "Swish & Stripe",
    description: "Ta emot betalningar direkt via offerten.",
    icon: CreditCard,
  },
  {
    name: "Google Calendar",
    description: "Boka möten och följ upp offerter i din kalender.",
    icon: Calendar,
  },
  {
    name: "E-post",
    description: "Skicka offerter direkt från Gmail eller Outlook.",
    icon: Mail,
  },
  {
    name: "Google Drive",
    description: "Spara och dela offerter i molnet automatiskt.",
    icon: Cloud,
  },
  {
    name: "BankID",
    description: "Säkra e-signaturer med svensk BankID-verifiering.",
    icon: Shield,
  },
];

export default function Integrations() {
  return (
    <section className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
            Integrationer
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Fungerar med dina verktyg
          </h2>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Koppla ihop Offert Pro med de tjänster du redan använder för ett
            smidigt arbetsflöde.
          </p>
        </div>

        {/* Integration flow diagram */}
        <div className="mb-20 rounded-2xl overflow-hidden border border-gray-200/60 shadow-lg shadow-gray-200/30 bg-gray-50 p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Left: Source integrations */}
            <div className="flex flex-row sm:flex-col gap-2 sm:gap-3">
              {[
                { name: "Fortnox", icon: FileSpreadsheet, color: "bg-green-50 text-green-600" },
                { name: "Gmail", icon: Mail, color: "bg-red-50 text-red-500" },
                { name: "Google Cal", icon: Calendar, color: "bg-blue-50 text-blue-600" },
              ].map((s) => (
                <div key={s.name} className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-2.5 shadow-sm">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}>
                    <s.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 hidden sm:block">{s.name}</span>
                </div>
              ))}
            </div>

            {/* Arrow */}
            <ArrowRight className="w-5 h-5 text-gray-300 rotate-90 sm:rotate-0 shrink-0" />

            {/* Center: Offert Pro hub */}
            <div className="bg-white rounded-2xl border-2 border-indigo-200 shadow-md px-8 py-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-sm">OP</span>
              </div>
              <p className="text-sm font-bold text-gray-900">Offert Pro</p>
              <p className="text-xs text-gray-400 mt-0.5">Allt synkat</p>
            </div>

            {/* Arrow */}
            <ArrowRight className="w-5 h-5 text-gray-300 rotate-90 sm:rotate-0 shrink-0" />

            {/* Right: Output integrations */}
            <div className="flex flex-row sm:flex-col gap-2 sm:gap-3">
              {[
                { name: "Stripe", icon: CreditCard, color: "bg-purple-50 text-purple-600" },
                { name: "BankID", icon: Shield, color: "bg-indigo-50 text-indigo-600" },
                { name: "Drive", icon: Cloud, color: "bg-amber-50 text-amber-600" },
              ].map((s) => (
                <div key={s.name} className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-2.5 shadow-sm">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}>
                    <s.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 hidden sm:block">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="bg-gray-50/80 rounded-2xl p-8 lg:p-10 transition-all duration-500 hover:shadow-xl hover:bg-white group card-hover border border-transparent hover:border-gray-100"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white mb-6 group-hover:bg-indigo-50 transition-colors duration-500 shadow-sm">
                <integration.icon className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                {integration.name}
              </h3>
              <p className="mt-3 text-gray-400 leading-relaxed">
                {integration.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
