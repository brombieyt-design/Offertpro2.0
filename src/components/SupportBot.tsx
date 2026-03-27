"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

/* ── Knowledge base ─────────────────────────── */
interface KnowledgeItem {
  keywords: string[];
  answer: string;
  links?: { label: string; href: string }[];
}

const knowledge: KnowledgeItem[] = [
  {
    keywords: ["pris", "kosta", "gratis", "plan", "betala", "avgift", "prenumeration"],
    answer:
      "Vi har 4 planer:\n\n• **Gratis** – 0 kr/mån (5 offerter/mån)\n• **Starter** – 149 kr/mån (50 offerter, e-signaturer)\n• **Pro** – 399 kr/mån (obegränsat, analytics, prioriterad support)\n• **Enterprise** – 999 kr/mån (team, API, dedikerad kontaktperson)\n\nDu kan testa gratis utan kreditkort!",
    links: [
      { label: "Se alla planer", href: "/pricing" },
      { label: "Inställningar", href: "/settings" },
    ],
  },
  {
    keywords: ["offert", "skapa offert", "ny offert", "offertmall"],
    answer:
      "Att skapa en offert är enkelt:\n\n1. Gå till **Offerter → Ny offert**\n2. Välj kund (eller skapa ny)\n3. Lägg till rader med beskrivning, antal och pris\n4. Förhandsgranska och skicka!\n\nDu kan också spara mallar för att snabba upp processen.",
    links: [
      { label: "Skapa ny offert", href: "/quotes/new" },
      { label: "Alla offerter", href: "/quotes" },
      { label: "Mallar", href: "/templates" },
    ],
  },
  {
    keywords: ["faktura", "fakturera", "ny faktura"],
    answer:
      "Du skapar fakturor på samma sätt som offerter:\n\n1. Gå till **Fakturor → Ny faktura**\n2. Fyll i kunduppgifter och rader\n3. Skicka direkt via e-post med PDF-bilaga\n\nOffert Pro håller koll på betalstatus och skickar påminnelser automatiskt.",
    links: [
      { label: "Skapa ny faktura", href: "/invoices/new" },
      { label: "Alla fakturor", href: "/invoices" },
    ],
  },
  {
    keywords: ["e-signatur", "signatur", "signera", "underskrift"],
    answer:
      "E-signaturer ingår från Starter-planen.\n\nDin kund får en länk och kan signera offerten direkt i webbläsaren. Du får en notis direkt när offerten signerats. Allt är juridiskt bindande enligt eIDAS.",
    links: [{ label: "Uppgradera plan", href: "/settings" }],
  },
  {
    keywords: ["pdf", "exportera", "ladda ner", "skriva ut"],
    answer:
      "Alla offerter och fakturor kan laddas ner som professionella PDF:er. Gå till offerten/fakturan och klicka på **Ladda ner PDF**. PDF:en inkluderar ditt varumärke, logotyp och alla detaljer.",
    links: [
      { label: "Offerter", href: "/quotes" },
      { label: "Fakturor", href: "/invoices" },
    ],
  },
  {
    keywords: ["mall", "mallar", "template"],
    answer:
      "Du kan skapa och spara mallar under **Mallar**. Inkludera standardrader, villkor och din branding. Nästa gång du skapar en offert väljer du bara din mall så fylls allt i automatiskt.",
    links: [{ label: "Gå till Mallar", href: "/templates" }],
  },
  {
    keywords: ["kund", "kunder", "kontakt", "kundregister"],
    answer:
      "Hantera dina kunder under **Kunder**. Lägg till företagsnamn, kontaktperson, e-post och organisationsnummer. Kundinfo fylls i automatiskt när du skapar nya offerter.",
    links: [{ label: "Gå till Kunder", href: "/clients" }],
  },
  {
    keywords: ["spåra", "spårning", "tracking", "öppna", "visning"],
    answer:
      "Med realtidsspårning ser du exakt när kunden öppnar din offert, hur länge de läser och vilka sidor de tittar på. Du får push-notiser vid viktiga händelser. Perfekt för att tajma din uppföljning!",
    links: [{ label: "Se analys", href: "/analytics" }],
  },
  {
    keywords: ["gdpr", "säker", "data", "kryptering", "integritet"],
    answer:
      "Din data är trygg hos oss:\n\n• All data krypteras (i vila och under överföring)\n• Servrar inom EU\n• GDPR-kompatibelt\n• SSL-certifikat\n• 99.9% uptime-garanti\n\nVi delar aldrig din data med tredje part.",
  },
  {
    keywords: ["fortnox", "integration", "koppling", "swish", "stripe", "bokföring"],
    answer:
      "Offert Pro integrerar med:\n\n• **Fortnox** – automatisk bokföringssync\n• **Stripe & Swish** – ta betalt direkt\n• **Google Calendar** – boka möten\n• **BankID** – verifierade e-signaturer\n\nIntegrationer aktiveras under Inställningar.",
    links: [{ label: "Inställningar", href: "/settings" }],
  },
  {
    keywords: ["support", "hjälp", "kontakt", "kontakta", "mail", "telefon"],
    answer:
      "Du kan nå oss på:\n\n• **E-post:** hej@offertpro.se\n• **Chatt:** Du pratar med mig just nu!\n• **Svarstid:** Inom 24h (Pro-kunder inom 4h)\n\nBeskriv gärna ditt ärende så hjälper jag dig eller kopplar vidare.",
  },
  {
    keywords: ["byta plan", "uppgradera", "nedgradera", "avsluta", "cancel"],
    answer:
      "Du kan byta plan när som helst under **Inställningar**. Uppgradering sker direkt och du betalar bara mellanskillnaden. Vid nedgradering gäller den nya planen från nästa fakturaperiod.",
    links: [
      { label: "Inställningar", href: "/settings" },
      { label: "Se alla planer", href: "/pricing" },
    ],
  },
  {
    keywords: ["analys", "statistik", "rapport", "analytics", "diagram"],
    answer:
      "Under **Analys** hittar du:\n\n• Intäktsöversikt med diagram\n• Offertvolym och konvertering\n• Statusfördelning\n• Topkunder\n• Konverteringstratt\n\nPerfekt för att följa upp din försäljning!",
    links: [{ label: "Gå till Analys", href: "/analytics" }],
  },
  {
    keywords: ["dashboard", "översikt", "hem", "start"],
    answer:
      "Din **Dashboard** ger dig en snabb översikt av alla dina offerter och fakturor, med nyckeltal och senaste aktivitet.",
    links: [{ label: "Gå till Dashboard", href: "/dashboard" }],
  },
  {
    keywords: ["inställningar", "profil", "företag", "logotyp", "logo"],
    answer:
      "Under **Inställningar** kan du:\n\n• Redigera företagsprofil och logotyp\n• Konfigurera betalningsuppgifter\n• Ställa in standardvärden för offerter\n• Hantera din prenumeration",
    links: [{ label: "Gå till Inställningar", href: "/settings" }],
  },
  {
    keywords: ["hej", "hallå", "tjena", "god", "hejsan", "tjo"],
    answer:
      "Hej! Välkommen till Offert Pro support! Hur kan jag hjälpa dig? Du kan fråga om t.ex.:\n\n• Priser och planer\n• Hur man skapar offerter/fakturor\n• E-signaturer\n• Integrationer\n• Säkerhet & GDPR",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Skapa offert", href: "/quotes/new" },
    ],
  },
  {
    keywords: ["tack", "tackar", "toppen", "bra"],
    answer: "Tack själv! Hör gärna av dig igen om du har fler frågor. Lycka till med dina offerter!",
  },
];

const fallbackAnswer =
  "Jag förstod tyvärr inte din fråga. Prova att fråga om:\n\n• Priser och planer\n• Skapa offerter eller fakturor\n• E-signaturer\n• PDF-export\n• Mallar och kunder\n• Integrationer\n• Säkerhet\n\nEller maila oss på **hej@offertpro.se** så hjälper vi dig!";

function findAnswer(input: string): { text: string; links?: { label: string; href: string }[] } {
  const lower = input.toLowerCase();
  let bestMatch: { answer: string; links?: { label: string; href: string }[]; score: number } | null = null;

  for (const item of knowledge) {
    let score = 0;
    for (const kw of item.keywords) {
      if (lower.includes(kw)) score++;
    }
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { answer: item.answer, links: item.links, score };
    }
  }

  return bestMatch ? { text: bestMatch.answer, links: bestMatch.links } : { text: fallbackAnswer };
}

type Message = { role: "bot" | "user"; text: string; links?: { label: string; href: string }[] };

export default function SupportBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hej! Jag är Offert Pros supportbot. Ställ en fråga så hjälper jag dig direkt!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate a short "typing" delay
    setTimeout(() => {
      const { text, links } = findAnswer(trimmed);
      setMessages((prev) => [...prev, { role: "bot", text, links }]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          open
            ? "bg-gray-900 hover:bg-gray-800 rotate-0"
            : "bg-brand-600 hover:bg-brand-700 hover:scale-105"
        }`}
        aria-label={open ? "Stäng support" : "Öppna support"}
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in-up"
          style={{ height: "min(520px, calc(100vh - 8rem))" }}
        >
          {/* Header */}
          <div className="bg-brand-600 px-5 py-4 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Offert Pro Support</p>
              <p className="text-brand-200 text-xs">Svarar direkt</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                  <div className="w-7 h-7 bg-brand-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-brand-600" />
                  </div>
                )}
                <div className={`max-w-[75%] ${msg.role === "user" ? "" : ""}`}>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-brand-600 text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: msg.text
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\n/g, "<br />"),
                    }}
                  />
                  {msg.links && msg.links.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5 ml-1">
                      {msg.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-full transition-colors"
                        >
                          {link.label} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-start">
                <div className="w-7 h-7 bg-brand-100 rounded-full flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-brand-600" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 px-4 py-3 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Skriv din fråga..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-colors placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-200 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
