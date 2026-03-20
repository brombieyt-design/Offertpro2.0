"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Är det verkligen gratis att komma igång?",
    answer:
      "Ja! Vår gratisplan inkluderar upp till 5 offerter per månad, utan kreditkort. Du kan uppgradera när som helst om du behöver mer.",
  },
  {
    question: "Hur fungerar e-signaturerna?",
    answer:
      "Dina kunder kan signera offerter direkt i webbläsaren. Du får en notis så fort offerten är signerad och kan följa statusen i realtid.",
  },
  {
    question: "Kan jag använda mina egna mallar?",
    answer:
      "Absolut. Du kan skapa egna mallar med ditt varumärke, logotyp och färger. Spara dem för att snabbt återanvända vid framtida offerter.",
  },
  {
    question: "Vilka betalningsmetoder stöds?",
    answer:
      "Vi stöder betalning via kort (Visa, Mastercard), Swish och faktura. Alla betalningar hanteras säkert via Stripe.",
  },
  {
    question: "Kan jag byta plan när som helst?",
    answer:
      "Ja, du kan uppgradera eller nedgradera din plan när som helst. Ändringen träder i kraft direkt och du betalar bara mellanskillnaden.",
  },
  {
    question: "Hur säker är min data?",
    answer:
      "Vi använder kryptering i vila och under överföring. All data lagras på servrar inom EU och vi följer GDPR fullt ut.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-gray-50/50 relative overflow-hidden">
      <div className="absolute bottom-0 right-[20%] w-80 h-80 bg-brand-100/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 mb-6">
            <HelpCircle className="h-3 w-3 text-gray-500" />
            <span className="text-xs font-semibold text-gray-600 tracking-wide">Vanliga frågor</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Har du frågor?
          </h2>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Här hittar du svar på de vanligaste frågorna om Offert Pro.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen ? "border-brand-200 shadow-lg shadow-brand-500/5" : "border-gray-100 hover:border-gray-200 hover:shadow-md"}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left"
                >
                  <span className="text-base font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full shrink-0 transition-all duration-300 ${isOpen ? "bg-brand-50 rotate-180" : "bg-gray-100"}`}>
                    <ChevronDown
                      className={`h-4 w-4 transition-colors duration-300 ${isOpen ? "text-brand-600" : "text-gray-400"}`}
                    />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-48 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="px-8 text-gray-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
