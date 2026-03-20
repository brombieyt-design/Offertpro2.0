import {
  CreditCard,
  FileSpreadsheet,
  Mail,
  Calendar,
  Cloud,
  Shield,
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
        <div className="text-center max-w-2xl mx-auto mb-24">
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
