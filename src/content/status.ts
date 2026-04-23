export type ComponentStatus = "operational" | "degraded" | "partial_outage" | "major_outage" | "maintenance";

export interface StatusComponent {
  /** Stable identifier used in URLs / anchors */
  id: string;
  /** Display label per locale */
  label: { sv: string; en: string; de: string };
  /** Current status */
  status: ComponentStatus;
  /** Uptime over the last 90 days as a decimal (0.9997 = 99.97%) */
  uptime90d: number;
}

export interface IncidentUpdate {
  /** ISO datetime */
  at: string;
  body: { sv: string; en: string; de: string };
}

export interface Incident {
  id: string;
  /** ISO date when the incident started */
  startedAt: string;
  /** ISO date when the incident was resolved, omitted if ongoing */
  resolvedAt?: string;
  /** Components affected (by id) */
  affected: string[];
  /** Highest severity reached during the incident */
  severity: Exclude<ComponentStatus, "operational" | "maintenance">;
  title: { sv: string; en: string; de: string };
  updates: IncidentUpdate[];
}

/**
 * Current component statuses. Updated manually; this file is the single
 * source of truth for /status, /en/status and /de/status.
 */
export const components: StatusComponent[] = [
  {
    id: "web-app",
    label: { sv: "Webbapp", en: "Web app", de: "Web-App" },
    status: "operational",
    uptime90d: 0.9998,
  },
  {
    id: "api",
    label: { sv: "API", en: "API", de: "API" },
    status: "operational",
    uptime90d: 0.9999,
  },
  {
    id: "pdf",
    label: {
      sv: "PDF-generering",
      en: "PDF generation",
      de: "PDF-Erzeugung",
    },
    status: "operational",
    uptime90d: 0.9996,
  },
  {
    id: "email",
    label: {
      sv: "E-postutskick",
      en: "Email delivery",
      de: "E-Mail-Versand",
    },
    status: "operational",
    uptime90d: 0.9995,
  },
  {
    id: "esign",
    label: {
      sv: "E-signaturer (eIDAS)",
      en: "E-signatures (eIDAS)",
      de: "E-Signaturen (eIDAS)",
    },
    status: "operational",
    uptime90d: 0.9998,
  },
  {
    id: "db",
    label: { sv: "Databas", en: "Database", de: "Datenbank" },
    status: "operational",
    uptime90d: 0.9999,
  },
];

/**
 * Recent incidents, newest first. An empty array shows the "no incidents
 * reported" state on the status page.
 */
export const incidents: Incident[] = [
  {
    id: "2026-03-14-pdf-queue",
    startedAt: "2026-03-14T09:12:00Z",
    resolvedAt: "2026-03-14T10:05:00Z",
    affected: ["pdf"],
    severity: "partial_outage",
    title: {
      sv: "Fördröjningar i PDF-kön",
      en: "Delays in the PDF rendering queue",
      de: "Verzögerungen in der PDF-Rendering-Warteschlange",
    },
    updates: [
      {
        at: "2026-03-14T09:12:00Z",
        body: {
          sv: "Vi ser ökad kölängd för PDF-rendering. Utredning pågår.",
          en: "We're seeing increased queue length for PDF rendering. Investigation in progress.",
          de: "Wir beobachten eine erhöhte Warteschlangenlänge bei der PDF-Erzeugung. Untersuchung läuft.",
        },
      },
      {
        at: "2026-03-14T09:44:00Z",
        body: {
          sv: "Identifierat: en worker-pool hade fastnat efter en deployment. Skalar ut.",
          en: "Identified: a worker pool stalled after a deployment. Scaling out.",
          de: "Ursache erkannt: Ein Worker-Pool hing nach einem Deployment fest. Wir skalieren nach oben.",
        },
      },
      {
        at: "2026-03-14T10:05:00Z",
        body: {
          sv: "Löst. Kön har töms och nya PDF:er genereras inom förväntade tider igen.",
          en: "Resolved. The queue has drained and new PDFs are being produced within expected latency again.",
          de: "Behoben. Die Warteschlange wurde geleert; neue PDFs werden wieder in erwarteten Latenzen erzeugt.",
        },
      },
    ],
  },
  {
    id: "2026-02-01-email-provider",
    startedAt: "2026-02-01T14:30:00Z",
    resolvedAt: "2026-02-01T15:10:00Z",
    affected: ["email"],
    severity: "partial_outage",
    title: {
      sv: "Fördröjd e-postleverans från transaktionell leverantör",
      en: "Delayed email delivery from transactional provider",
      de: "Verzögerter E-Mail-Versand beim transaktionalen Anbieter",
    },
    updates: [
      {
        at: "2026-02-01T14:30:00Z",
        body: {
          sv: "Transaktionell e-postleverantör rapporterar incidenter. Köer byggs upp.",
          en: "Transactional email provider is reporting incidents; queues are building up.",
          de: "Der Anbieter für Transaktions-E-Mails meldet Vorfälle; Warteschlangen wachsen an.",
        },
      },
      {
        at: "2026-02-01T15:10:00Z",
        body: {
          sv: "Leverantören återställd. Fördröjda meddelanden har levererats.",
          en: "Provider recovered. Delayed messages have been delivered.",
          de: "Anbieter wiederhergestellt. Verzögerte Nachrichten wurden zugestellt.",
        },
      },
    ],
  },
];

export function uptimeString(uptime: number): string {
  return `${(uptime * 100).toFixed(2)}%`;
}
