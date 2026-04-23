export type FaqSection = "general" | "billing" | "security" | "legal" | "features";

export interface FaqEntry {
  section: FaqSection;
  question: { sv: string; en: string; de: string };
  answer: { sv: string; en: string; de: string };
}

/**
 * Single source of truth for frequently asked questions. Rendered at
 * /faq, /en/faq and /de/faq with FAQPage JSON-LD so Google surfaces
 * answers directly in search results.
 */
export const faqs: FaqEntry[] = [
  {
    section: "general",
    question: {
      sv: "Vad är Offert Pro?",
      en: "What is Offert Pro?",
      de: "Was ist Offert Pro?",
    },
    answer: {
      sv: "Offert Pro är en europeisk offert- och fakturaplattform för småföretag. Du skapar, skickar och låter kunder e-signera offerter i webbläsaren, och omvandlar en godkänd offert till en faktura med ett klick.",
      en: "Offert Pro is a European proposal and invoicing platform for small businesses. You create, send and let clients e-sign proposals in the browser, and turn an accepted proposal into an invoice with one click.",
      de: "Offert Pro ist eine europäische Angebots- und Rechnungsplattform für KMU. Sie erstellen, versenden und lassen Kunden Angebote im Browser elektronisch signieren — ein angenommenes Angebot wird mit einem Klick zur Rechnung.",
    },
  },
  {
    section: "general",
    question: {
      sv: "Finns det en riktig gratisnivå?",
      en: "Is there a real free tier?",
      de: "Gibt es einen echten kostenlosen Tarif?",
    },
    answer: {
      sv: "Ja. Gratisnivån omfattar 5 offerter per månad, PDF-export och grundläggande varumärkning — ingen tidsbegränsning och inget kreditkort krävs.",
      en: "Yes. The free tier covers 5 proposals per month, PDF export and basic branding — no time limit and no credit card required.",
      de: "Ja. Der kostenlose Tarif umfasst 5 Angebote pro Monat, PDF-Export und grundlegendes Branding — keine Zeitbegrenzung und keine Kreditkarte erforderlich.",
    },
  },
  {
    section: "features",
    question: {
      sv: "Vilka språk finns Offert Pro på?",
      en: "What languages does Offert Pro support?",
      de: "Welche Sprachen unterstützt Offert Pro?",
    },
    answer: {
      sv: "Marknadssidor och support finns på svenska, engelska och tyska. I själva appen kan offerter skapas på vilket språk som helst — du skriver innehållet fritt.",
      en: "Marketing pages and support are in Swedish, English and German. Inside the app you can create proposals in any language — the content is free text.",
      de: "Marketingseiten und Support gibt es auf Schwedisch, Englisch und Deutsch. In der App selbst können Angebote in jeder Sprache erstellt werden — der Inhalt ist Freitext.",
    },
  },
  {
    section: "features",
    question: {
      sv: "Kan jag omvandla en offert till en faktura?",
      en: "Can I convert a proposal into an invoice?",
      de: "Kann ich ein Angebot in eine Rechnung umwandeln?",
    },
    answer: {
      sv: "Ja. När kunden godkänt offerten kan du med ett klick skapa en faktura med samma rader, moms och kunddata — utan att skriva in något på nytt.",
      en: "Yes. Once the client has accepted the proposal, you can create an invoice with the same line items, VAT and client data in one click — no rekeying.",
      de: "Ja. Sobald das Angebot angenommen ist, erstellen Sie mit einem Klick eine Rechnung mit denselben Positionen, MwSt. und Kundendaten — ohne neu zu tippen.",
    },
  },
  {
    section: "features",
    question: {
      sv: "Hanterar ni EU-moms och Reverse Charge?",
      en: "Do you handle EU VAT and reverse charge?",
      de: "Handhaben Sie die EU-MwSt. und Reverse Charge?",
    },
    answer: {
      sv: "Ja. EU-VAT-nummer för både dig och kunden placeras automatiskt på dokumentet, och vid B2B-leverans mellan EU-länder sätts rätt formulering om omvänd betalningsskyldighet (artikel 196 i mervärdesskattedirektivet).",
      en: "Yes. Your and the client's EU VAT numbers are placed on the document automatically, and for B2B cross-border sales inside the EU the correct reverse-charge wording (Article 196 of the VAT Directive) is applied.",
      de: "Ja. Ihre und die USt-ID des Kunden werden automatisch auf dem Dokument platziert, und bei B2B-Leistungen zwischen EU-Mitgliedstaaten wird der korrekte Reverse-Charge-Hinweis (Art. 196 der MwSt.-Systemrichtlinie, § 13b UStG) gesetzt.",
    },
  },
  {
    section: "security",
    question: {
      sv: "Var lagras min data?",
      en: "Where is my data stored?",
      de: "Wo werden meine Daten gespeichert?",
    },
    answer: {
      sv: "All data lagras inom EU. Primär region är Frankfurt (AWS eu-central-1) med backup i Stockholm. Läs mer på /security.",
      en: "All data is stored within the EU. Primary region is Frankfurt (AWS eu-central-1) with backup in Stockholm. More at /en/security.",
      de: "Alle Daten werden innerhalb der EU gespeichert. Primärregion ist Frankfurt (AWS eu-central-1) mit Backup in Stockholm. Mehr unter /de/sicherheit.",
    },
  },
  {
    section: "security",
    question: {
      sv: "Är era e-signaturer juridiskt bindande?",
      en: "Are your e-signatures legally binding?",
      de: "Sind Ihre E-Signaturen rechtsverbindlich?",
    },
    answer: {
      sv: "Ja. Alla planer följer eIDAS-förordningen (EU) 910/2014 (SES och AES). Pro-planen inkluderar kvalificerade signaturer (QES) via BankID för Norden och D-Trust för Tyskland — juridiskt likvärdigt med en handskriven underskrift.",
      en: "Yes. Every plan follows the eIDAS regulation (EU) 910/2014 (SES and AES). The Pro plan includes qualified signatures (QES) via BankID for the Nordics and D-Trust for Germany — legally equivalent to a handwritten signature.",
      de: "Ja. Jeder Tarif erfüllt die eIDAS-Verordnung (EU) 910/2014 (EES und FES). Der Pro-Tarif enthält qualifizierte Signaturen (QES) via BankID für die Nordics und D-Trust für Deutschland — rechtlich einer handschriftlichen Unterschrift gleichgestellt.",
    },
  },
  {
    section: "security",
    question: {
      sv: "Stöder ni tvåfaktorsautentisering och SSO?",
      en: "Do you support 2FA and SSO?",
      de: "Unterstützen Sie 2FA und SSO?",
    },
    answer: {
      sv: "TOTP-baserad tvåfaktor ingår på alla planer. SAML 2.0 SSO (Okta, Google Workspace, Microsoft Entra m.fl.) finns på Pro-planen.",
      en: "TOTP-based two-factor is included on every plan. SAML 2.0 SSO (Okta, Google Workspace, Microsoft Entra, etc.) is available on the Pro plan.",
      de: "TOTP-basierte Zwei-Faktor-Authentifizierung ist in jedem Tarif enthalten. SAML-2.0-SSO (Okta, Google Workspace, Microsoft Entra u. a.) ist im Pro-Tarif verfügbar.",
    },
  },
  {
    section: "billing",
    question: {
      sv: "Hur fungerar faktureringen?",
      en: "How does billing work?",
      de: "Wie funktioniert die Abrechnung?",
    },
    answer: {
      sv: "Vi fakturerar månadsvis eller årsvis i förskott via Stripe. Alla priser är exklusive moms och kan justeras med 60 dagars varsel. Du kan säga upp när som helst från appen.",
      en: "We bill monthly or annually in advance via Stripe. All prices are excluding VAT and may change with 60 days' notice. You can cancel at any time from the app.",
      de: "Wir rechnen monatlich oder jährlich im Voraus über Stripe ab. Alle Preise verstehen sich zzgl. MwSt. und können mit 60 Tagen Vorlauf angepasst werden. Sie können jederzeit in der App kündigen.",
    },
  },
  {
    section: "billing",
    question: {
      sv: "Kan jag byta plan när som helst?",
      en: "Can I change plan at any time?",
      de: "Kann ich jederzeit den Tarif wechseln?",
    },
    answer: {
      sv: "Ja. Uppgraderingar träder i kraft omedelbart och proraterade kostnader debiteras vid nästa fakturering. Nedgraderingar träder i kraft vid slutet av innevarande period.",
      en: "Yes. Upgrades take effect immediately with prorated charges on the next invoice. Downgrades take effect at the end of the current period.",
      de: "Ja. Upgrades werden sofort wirksam und anteilig bei der nächsten Rechnung berechnet. Downgrades treten zum Ende des laufenden Abrechnungszeitraums in Kraft.",
    },
  },
  {
    section: "legal",
    question: {
      sv: "Tillhandahåller ni ett personuppgiftsbiträdesavtal (DPA)?",
      en: "Do you provide a data processing agreement (DPA)?",
      de: "Stellen Sie einen Auftragsverarbeitungsvertrag (AVV) bereit?",
    },
    answer: {
      sv: "Ja. Ett standardiserat DPA enligt artikel 28 GDPR gäller automatiskt för alla kunder. Vi signerar även din egen mall på begäran. Se /dpa.",
      en: "Yes. A standard DPA under GDPR Article 28 applies automatically to every customer. We also sign your own template on request. See /en/dpa.",
      de: "Ja. Ein standardmäßiger AVV nach Art. 28 DSGVO gilt automatisch für jeden Kunden. Auf Anfrage signieren wir auch Ihre eigene Vorlage. Siehe /de/avv.",
    },
  },
  {
    section: "legal",
    question: {
      sv: "Vilken lag gäller för avtalet?",
      en: "What law governs the contract?",
      de: "Welches Recht gilt für den Vertrag?",
    },
    answer: {
      sv: "Svensk lag. Tvist avgörs i första hand vid Stockholms tingsrätt. Konsumenter kan även vända sig till ARN eller EU-kommissionens onlinetvistlösningsplattform.",
      en: "Swedish law. Disputes are settled at Stockholm District Court as first instance. Consumers may also refer to the EU Online Dispute Resolution platform.",
      de: "Schwedisches Recht. Streitigkeiten werden in erster Instanz am Bezirksgericht Stockholm entschieden. Verbraucher/innen können sich zudem an die Online-Streitbeilegungsplattform der EU-Kommission wenden.",
    },
  },
];

export const sectionLabel: Record<FaqSection, { sv: string; en: string; de: string }> = {
  general: { sv: "Allmänt", en: "General", de: "Allgemein" },
  features: { sv: "Funktioner", en: "Features", de: "Funktionen" },
  security: { sv: "Säkerhet", en: "Security", de: "Sicherheit" },
  billing: { sv: "Fakturering", en: "Billing", de: "Abrechnung" },
  legal: { sv: "Juridik", en: "Legal", de: "Recht" },
};

export const sectionOrder: FaqSection[] = ["general", "features", "security", "billing", "legal"];
