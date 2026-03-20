import { FileWarning, Zap, ArrowRight } from "lucide-react";

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
    <section className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
            Jämförelse
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Sluta med det gamla sättet
          </h2>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            PDF-formatet uppfanns 1993. Din offertprocess förtjänar bättre.
          </p>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Old way */}
          <div className="rounded-3xl border border-red-100 bg-red-50/30 p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
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
                    <span className="block h-1.5 w-1.5 rounded-full bg-red-400" />
                  </span>
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* New way */}
          <div className="rounded-3xl border border-green-100 bg-green-50/30 p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
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
                    <svg
                      className="h-3 w-3 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="/signup"
            className="inline-flex items-center gap-2 text-base font-medium text-indigo-600 hover:text-indigo-700 transition-colors group"
          >
            Byt till det moderna sättet
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
