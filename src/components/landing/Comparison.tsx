import { FileWarning, Zap, ArrowRight, X, Check } from "lucide-react";

const oldWay = [
  "Kopiera klistra i Word eller Excel",
  "Skicka PDF via e-post manuellt",
  "Ingen aning om kunden öppnat",
  "Jaga signaturer via telefon",
  "Manuell uppföljning med påminnelser",
  "Ingen överblick över pipeline",
];

const newWay = [
  "Skapa snygga offerter på minuter",
  "Skicka direkt från plattformen",
  "Realtidsspårning vid varje öppning",
  "E-signaturer med ett klick",
  "Automatiska uppföljningar",
  "Visuell pipeline med statusöversikt",
];

export default function Comparison() {
  return (
    <section className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 mb-6">
            <span className="text-xs font-semibold text-gray-600 tracking-wide">Jämförelse</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Sluta med det gamla sättet
          </h2>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            PDF-formatet uppfanns 1993. Din offertprocess förtjänar bättre.
          </p>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Old way */}
          <div className="rounded-3xl border border-red-200/60 bg-gradient-to-br from-red-50/50 to-orange-50/30 p-10 relative overflow-hidden">
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 shadow-sm">
                  <FileWarning className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Det gamla sättet
                  </h3>
                  <p className="text-sm text-red-400">Tidskrävande och osäkert</p>
                </div>
              </div>
              <ul className="space-y-4">
                {oldWay.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 mt-0.5 shrink-0">
                      <X className="h-3 w-3 text-red-400" />
                    </span>
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* New way */}
          <div className="rounded-3xl border border-green-200/60 bg-gradient-to-br from-green-50/50 to-emerald-50/30 p-10 relative overflow-hidden shadow-lg shadow-green-500/5">
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 shadow-sm">
                  <Zap className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Med Offert Pro
                  </h3>
                  <p className="text-sm text-green-500">Snabbt och professionellt</p>
                </div>
              </div>
              <ul className="space-y-4">
                {newWay.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 mt-0.5 shrink-0">
                      <Check className="h-3 w-3 text-green-600" />
                    </span>
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="/signup"
            className="inline-flex items-center gap-2 text-base font-semibold text-brand-600 hover:text-brand-700 transition-colors group"
          >
            Byt till det moderna sättet
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
