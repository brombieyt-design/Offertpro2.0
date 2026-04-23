export type IntegrationCategory =
  | "accounting"
  | "crm"
  | "payments"
  | "esign"
  | "email"
  | "automation"
  | "storage";

export type IntegrationStatus = "available" | "beta" | "planned";

export interface Integration {
  id: string;
  name: string;
  category: IntegrationCategory;
  region: ("SE" | "DK" | "NO" | "FI" | "DE" | "AT" | "CH" | "UK" | "EU")[];
  status: IntegrationStatus;
  description: { sv: string; en: string; de: string };
}

/**
 * Shared source of truth for the integrations page. Surfaced at
 * /integrations, /en/integrations and /de/integrationen.
 */
export const integrations: Integration[] = [
  // Accounting
  {
    id: "fortnox",
    name: "Fortnox",
    category: "accounting",
    region: ["SE"],
    status: "available",
    description: {
      sv: "Synka godkända offerter och fakturor direkt till Fortnox. Kunder, artiklar och konteringar kopplas automatiskt.",
      en: "Sync accepted proposals and invoices straight into Fortnox. Customers, items and ledger codes are mapped automatically.",
      de: "Angenommene Angebote und Rechnungen direkt mit Fortnox synchronisieren. Kunden, Artikel und Konten werden automatisch zugeordnet.",
    },
  },
  {
    id: "visma",
    name: "Visma eEkonomi",
    category: "accounting",
    region: ["SE", "NO", "FI", "DK"],
    status: "available",
    description: {
      sv: "Export av fakturor till Visma eEkonomi med korrekta momsrader och betalningsvillkor.",
      en: "Push invoices to Visma eEkonomi with correct VAT lines and payment terms.",
      de: "Rechnungen an Visma eEkonomi übergeben — inklusive korrekter MwSt.-Zeilen und Zahlungsbedingungen.",
    },
  },
  {
    id: "datev",
    name: "DATEV",
    category: "accounting",
    region: ["DE", "AT"],
    status: "planned",
    description: {
      sv: "Export till DATEV (DATEV-Format och Unternehmen online) för överlämning till tyska revisorer. Släpps 2026.",
      en: "Export to DATEV (DATEV format and Unternehmen online) for handover to German accountants. Launches 2026.",
      de: "Export nach DATEV (DATEV-Format und Unternehmen online) für die Übergabe an Steuerberater. Start 2026.",
    },
  },
  {
    id: "xero",
    name: "Xero",
    category: "accounting",
    region: ["UK", "EU"],
    status: "available",
    description: {
      sv: "Dubbelriktad synk mot Xero: fakturor, kunder och betalningar hålls i synk.",
      en: "Two-way Xero sync: invoices, customers and payments stay in sync.",
      de: "Bidirektionale Synchronisierung mit Xero: Rechnungen, Kunden und Zahlungen bleiben synchron.",
    },
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    category: "accounting",
    region: ["UK", "EU"],
    status: "available",
    description: {
      sv: "Skicka fakturor och klasser till QuickBooks Online med rätt momskoder per EU-land.",
      en: "Push invoices and classes to QuickBooks Online with correct per-country EU VAT codes.",
      de: "Rechnungen und Klassen mit korrekten länderspezifischen EU-MwSt.-Codes an QuickBooks Online übergeben.",
    },
  },

  // CRM
  {
    id: "hubspot",
    name: "HubSpot",
    category: "crm",
    region: ["EU"],
    status: "available",
    description: {
      sv: "Uppdatera affärsfas i HubSpot när en offert öppnas, signeras eller omvandlas till faktura.",
      en: "Update HubSpot deal stage when a proposal is opened, signed or converted into an invoice.",
      de: "HubSpot-Deal-Phase aktualisieren, wenn ein Angebot geöffnet, signiert oder in eine Rechnung umgewandelt wird.",
    },
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    category: "crm",
    region: ["EU"],
    status: "available",
    description: {
      sv: "Trigger för offertstatus på Pipedrive-pipelinen — samma data, ett klick bort.",
      en: "Trigger proposal status in your Pipedrive pipeline — same data, one click away.",
      de: "Angebotsstatus als Trigger in Ihrer Pipedrive-Pipeline — gleiche Daten, ein Klick entfernt.",
    },
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "crm",
    region: ["EU"],
    status: "beta",
    description: {
      sv: "Koppla Offert Pro till en Salesforce-Opportunity. I betatest — hör av dig för åtkomst.",
      en: "Attach Offert Pro to a Salesforce Opportunity. In beta — ask for access.",
      de: "Offert Pro an eine Salesforce-Opportunity anbinden. In der Beta — Zugang auf Anfrage.",
    },
  },

  // Payments
  {
    id: "stripe",
    name: "Stripe",
    category: "payments",
    region: ["EU"],
    status: "available",
    description: {
      sv: "Betallänk på varje faktura. Kortbetalningar, SEPA och Apple Pay. Prenumerationsfakturering om du vill.",
      en: "Pay-link on every invoice. Card, SEPA and Apple Pay. Subscription billing if you want it.",
      de: "Zahlungslink auf jeder Rechnung. Karte, SEPA und Apple Pay. Abonnementabrechnung optional.",
    },
  },
  {
    id: "mollie",
    name: "Mollie",
    category: "payments",
    region: ["EU"],
    status: "available",
    description: {
      sv: "Europeisk betalningsleverantör — iDEAL, Bancontact, SEPA, kort. Låga avgifter för EU-handel.",
      en: "European payment provider — iDEAL, Bancontact, SEPA, cards. Low fees for EU commerce.",
      de: "Europäischer Zahlungsanbieter — iDEAL, Bancontact, SEPA, Karten. Günstige Gebühren für EU-Handel.",
    },
  },
  {
    id: "gocardless",
    name: "GoCardless",
    category: "payments",
    region: ["UK", "EU"],
    status: "available",
    description: {
      sv: "Återkommande autogiro via SEPA Direct Debit och BACS — perfekt för retainer-avtal.",
      en: "Recurring direct debit via SEPA Direct Debit and BACS — great for retainer agreements.",
      de: "Wiederkehrende Lastschrift über SEPA-Lastschrift und BACS — ideal für Retainer-Verträge.",
    },
  },

  // E-signature
  {
    id: "bankid",
    name: "BankID",
    category: "esign",
    region: ["SE", "NO", "FI"],
    status: "available",
    description: {
      sv: "Kvalificerad e-signatur (QES) för nordiska signatärer — juridiskt likvärdigt med handskriven underskrift.",
      en: "Qualified electronic signature (QES) for Nordic signers — legally equivalent to a handwritten signature.",
      de: "Qualifizierte elektronische Signatur (QES) für nordische Unterzeichnende — rechtlich einer handschriftlichen Unterschrift gleichgestellt.",
    },
  },
  {
    id: "d-trust",
    name: "D-Trust",
    category: "esign",
    region: ["DE"],
    status: "available",
    description: {
      sv: "Kvalificerad e-signatur (QES) för tyska signatärer via D-Trust (Bundesdruckerei).",
      en: "Qualified electronic signature (QES) for German signers via D-Trust (Bundesdruckerei).",
      de: "Qualifizierte elektronische Signatur (QES) für deutsche Unterzeichnende über D-Trust (Bundesdruckerei).",
    },
  },

  // Email
  {
    id: "postmark",
    name: "Postmark",
    category: "email",
    region: ["EU"],
    status: "available",
    description: {
      sv: "Transaktionell e-post i EU-region med hög leveransgrad — varje offert och faktura går via Postmark.",
      en: "Transactional email in the EU region with high deliverability — every proposal and invoice goes through Postmark.",
      de: "Transaktionale E-Mails in der EU-Region mit hoher Zustellrate — jedes Angebot und jede Rechnung läuft über Postmark.",
    },
  },

  // Automation
  {
    id: "zapier",
    name: "Zapier",
    category: "automation",
    region: ["EU"],
    status: "available",
    description: {
      sv: "Koppla Offert Pro till 6 000+ andra verktyg via Zapier-triggers: proposal_sent, proposal_signed, invoice_paid.",
      en: "Connect Offert Pro to 6,000+ other tools via Zapier triggers: proposal_sent, proposal_signed, invoice_paid.",
      de: "Offert Pro über Zapier-Trigger mit mehr als 6.000 weiteren Tools verbinden: proposal_sent, proposal_signed, invoice_paid.",
    },
  },
  {
    id: "make",
    name: "Make (Integromat)",
    category: "automation",
    region: ["EU"],
    status: "available",
    description: {
      sv: "Kraftfullare automationer via Make — grenar, filter och dataomvandling. Passar tekniskt inriktade team.",
      en: "More powerful automations via Make — branches, filters and data shaping. Suits technical teams.",
      de: "Mächtigere Automatisierungen via Make — Verzweigungen, Filter und Datenumformung. Für technische Teams.",
    },
  },
  {
    id: "webhook",
    name: "REST API + Webhooks",
    category: "automation",
    region: ["EU"],
    status: "available",
    description: {
      sv: "Full REST-API och webhooks för egna integrationer. OpenAPI-spec och sandboxmiljö.",
      en: "Full REST API and webhooks for custom integrations. OpenAPI spec and sandbox environment.",
      de: "Vollständige REST-API und Webhooks für Eigenintegrationen. OpenAPI-Spezifikation und Sandbox-Umgebung.",
    },
  },

  // Storage
  {
    id: "gdrive",
    name: "Google Drive",
    category: "storage",
    region: ["EU"],
    status: "available",
    description: {
      sv: "Spara signerade offerter och fakturor automatiskt i en Google Drive-mapp per kund.",
      en: "Auto-save signed proposals and invoices to a Google Drive folder per customer.",
      de: "Signierte Angebote und Rechnungen automatisch in einem Google-Drive-Ordner pro Kunde ablegen.",
    },
  },
  {
    id: "dropbox",
    name: "Dropbox",
    category: "storage",
    region: ["EU"],
    status: "available",
    description: {
      sv: "Samma automatik för Dropbox-användare — en mapp per kund, auto-sparad vid signering.",
      en: "Same automation for Dropbox users — one folder per customer, auto-saved on signing.",
      de: "Gleiche Automatik für Dropbox-Nutzer — ein Ordner pro Kunde, automatisch beim Signieren gespeichert.",
    },
  },
];

export const categoryLabel: Record<IntegrationCategory, { sv: string; en: string; de: string }> = {
  accounting: { sv: "Bokföring", en: "Accounting", de: "Buchhaltung" },
  crm: { sv: "CRM", en: "CRM", de: "CRM" },
  payments: { sv: "Betalningar", en: "Payments", de: "Zahlungen" },
  esign: { sv: "E-signaturer", en: "E-signatures", de: "E-Signaturen" },
  email: { sv: "E-post", en: "Email", de: "E-Mail" },
  automation: { sv: "Automation", en: "Automation", de: "Automatisierung" },
  storage: { sv: "Lagring", en: "Storage", de: "Speicher" },
};

export const categoryOrder: IntegrationCategory[] = [
  "accounting",
  "crm",
  "payments",
  "esign",
  "email",
  "automation",
  "storage",
];

export const statusLabel: Record<IntegrationStatus, { sv: string; en: string; de: string }> = {
  available: { sv: "Tillgänglig", en: "Available", de: "Verfügbar" },
  beta: { sv: "Beta", en: "Beta", de: "Beta" },
  planned: { sv: "Planerad", en: "Planned", de: "Geplant" },
};
