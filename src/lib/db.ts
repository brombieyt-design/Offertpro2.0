import fs from "fs";
import path from "path";
import postgres from "postgres";
import type { Customer, Quote, Invoice, Template, User, Session, SavedItem } from "@/types";

export interface Settings {
  company?: {
    companyName?: string;
    orgNumber?: string;
    vatNumber?: string;
    email?: string;
    phone?: string;
    website?: string;
    address?: string;
    city?: string;
    zipCode?: string;
    logo?: string;
    primaryColor?: string;
  };
  payment?: {
    bankgiro?: string;
    plusgiro?: string;
    bankName?: string;
    iban?: string;
    bic?: string;
    defaultTerms?: string;
    lateInterest?: string;
    reminderFee?: string;
  };
  defaults?: {
    quoteValidity?: string;
    vatRate?: string;
    currency?: string;
    language?: string;
    invoicePrefix?: string;
    quotePrefix?: string;
    footerNote?: string;
    emailSignature?: string;
  };
}

export interface DB {
  customers: Customer[];
  quotes: Quote[];
  invoices: Invoice[];
  templates: Template[];
  users: User[];
  sessions: Session[];
  settings?: Settings;
  savedItems?: SavedItem[];
}

const DB_PATH = path.join(process.cwd(), "data", "db.json");
const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const IS_PROD = process.env.NODE_ENV === "production";

/* ----------------------------------------------------------------------
 * Storage backends
 * ---------------------------------------------------------------------- */

type Backend = "postgres" | "file" | "memory";

let backend: Backend | null = null;
let sql: ReturnType<typeof postgres> | null = null;
let memoryDB: DB | null = null;
let schemaReady = false;

function getSql() {
  if (!sql && DATABASE_URL) {
    sql = postgres(DATABASE_URL, {
      ssl: DATABASE_URL.includes("sslmode=require") || IS_PROD ? "require" : undefined,
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });
  }
  return sql;
}

async function ensureSchema() {
  if (schemaReady) return;
  const client = getSql();
  if (!client) return;
  await client`
    CREATE TABLE IF NOT EXISTS kv_store (
      key   TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  schemaReady = true;
}

function canWriteToFS(): boolean {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const testFile = path.join(dir, ".write-test");
    fs.writeFileSync(testFile, "");
    fs.unlinkSync(testFile);
    return true;
  } catch {
    return false;
  }
}

function pickBackend(): Backend {
  if (backend) return backend;
  if (DATABASE_URL) backend = "postgres";
  else if (!IS_PROD && canWriteToFS()) backend = "file";
  else backend = "memory";
  return backend;
}

/* ----------------------------------------------------------------------
 * Default / seed data
 * ---------------------------------------------------------------------- */

/** Dev-only seed data. Never returned in production unless explicitly enabled. */
function getSeedData(): DB {
  // Production starts with an empty store. First signup via /api/auth/signup
  // creates the real admin account.
  if (IS_PROD && process.env.SEED_DEMO_DATA !== "true") {
    return {
      customers: [],
      quotes: [],
      invoices: [],
      templates: [],
      users: [],
      sessions: [],
    };
  }

  return {
    customers: [
      { id: "c1", name: "Erik Johansson", email: "erik@acmecorp.se", phone: "+46 70 123 45 67", company: "Acme Corp AB", city: "Stockholm", address: "Kungsgatan 10, 111 43 Stockholm", orgNr: "556789-0123" },
      { id: "c2", name: "Sofia Lindström", email: "sofia@pixelstudio.se", phone: "+46 73 456 78 90", company: "Pixel Studio", city: "Göteborg", address: "Avenyn 5, 411 36 Göteborg" },
      { id: "c3", name: "Anders Berg", email: "anders@summitit.se", phone: "+46 76 789 01 23", company: "Summit IT Solutions", city: "Malmö", address: "Stortorget 1, 211 22 Malmö", orgNr: "556123-4567" },
      { id: "c4", name: "Maria Ekström", email: "maria@novaconsulting.se", company: "Nova Consulting", city: "Uppsala" },
    ],
    quotes: [
      { id: "q1", number: "QT-2026-001", customer: { id: "c1", name: "Erik Johansson", email: "erik@acmecorp.se", company: "Acme Corp AB" }, items: [{ id: "i1", description: "Webbutveckling", quantity: 40, unitPrice: 950, discount: 0 }, { id: "i2", description: "UX-design", quantity: 20, unitPrice: 850, discount: 10 }], status: "accepted", createdAt: "2026-03-01", validUntil: "2026-03-31", total: 53300 },
      { id: "q2", number: "QT-2026-002", customer: { id: "c2", name: "Sofia Lindström", email: "sofia@pixelstudio.se", company: "Pixel Studio" }, items: [{ id: "i3", description: "Logotyp & varumärkespaket", quantity: 1, unitPrice: 28000 }], status: "opened", createdAt: "2026-03-05", validUntil: "2026-04-04", total: 28000 },
      { id: "q3", number: "QT-2026-003", customer: { id: "c3", name: "Anders Berg", email: "anders@summitit.se", company: "Summit IT Solutions" }, items: [{ id: "i4", description: "IT-infrastruktur audit", quantity: 1, unitPrice: 85000 }], status: "sent", createdAt: "2026-03-10", validUntil: "2026-04-09", total: 85000 },
      { id: "q4", number: "QT-2026-004", customer: { id: "c4", name: "Maria Ekström", email: "maria@novaconsulting.se", company: "Nova Consulting" }, items: [{ id: "i5", description: "Strategikonsultation", quantity: 10, unitPrice: 1950 }], status: "draft", createdAt: "2026-03-15", validUntil: "2026-04-14", total: 19500 },
    ],
    invoices: [
      { id: "inv1", number: "FAK-2026-001", customer: { id: "c1", name: "Erik Johansson", email: "erik@acmecorp.se", company: "Acme Corp AB" }, items: [{ id: "i1", description: "Webbutveckling - fas 1", quantity: 20, unitPrice: 950 }], status: "paid", issuedAt: "2026-02-15", dueDate: "2026-03-15", total: 19000, paymentTerms: "30 dagar netto" },
      { id: "inv2", number: "FAK-2026-002", customer: { id: "c2", name: "Sofia Lindström", email: "sofia@pixelstudio.se", company: "Pixel Studio" }, items: [{ id: "i2", description: "Logotypdesign - delbetalning", quantity: 1, unitPrice: 14000 }], status: "sent", issuedAt: "2026-03-01", dueDate: "2026-03-31", total: 14000, paymentTerms: "30 dagar netto" },
      { id: "inv3", number: "FAK-2026-003", customer: { id: "c3", name: "Anders Berg", email: "anders@summitit.se", company: "Summit IT Solutions" }, items: [{ id: "i3", description: "IT-konsultation", quantity: 8, unitPrice: 1200 }], status: "overdue", issuedAt: "2026-02-01", dueDate: "2026-03-01", total: 9600, paymentTerms: "30 dagar netto" },
    ],
    templates: [],
    users: [],
    sessions: [],
  };
}

/* ----------------------------------------------------------------------
 * Public API — async readDB / writeDB
 * ---------------------------------------------------------------------- */

export async function readDB(): Promise<DB> {
  const b = pickBackend();

  if (b === "postgres") {
    try {
      await ensureSchema();
      const client = getSql()!;
      const rows = await client<{ value: DB }[]>`
        SELECT value FROM kv_store WHERE key = 'state' LIMIT 1
      `;
      if (rows.length === 0) {
        const seed = getSeedData();
        await client`
          INSERT INTO kv_store (key, value) VALUES ('state', ${client.json(seed as unknown as postgres.JSONValue)})
          ON CONFLICT (key) DO NOTHING
        `;
        return seed;
      }
      return rows[0].value;
    } catch (err) {
      console.error("[db] Postgres read failed, falling back to memory:", err);
      if (!memoryDB) memoryDB = getSeedData();
      return memoryDB;
    }
  }

  if (b === "file") {
    try {
      if (!fs.existsSync(DB_PATH)) {
        const seed = getSeedData();
        await writeDB(seed);
        return seed;
      }
      return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
    } catch {
      const seed = getSeedData();
      try { await writeDB(seed); } catch { memoryDB = seed; }
      return seed;
    }
  }

  if (!memoryDB) memoryDB = getSeedData();
  return memoryDB;
}

export async function writeDB(data: DB): Promise<void> {
  const b = pickBackend();

  if (b === "postgres") {
    try {
      await ensureSchema();
      const client = getSql()!;
      await client`
        INSERT INTO kv_store (key, value, updated_at)
        VALUES ('state', ${client.json(data as unknown as postgres.JSONValue)}, NOW())
        ON CONFLICT (key) DO UPDATE
          SET value = EXCLUDED.value, updated_at = NOW()
      `;
      return;
    } catch (err) {
      console.error("[db] Postgres write failed, using memory fallback:", err);
      memoryDB = data;
      return;
    }
  }

  if (b === "file") {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    return;
  }

  memoryDB = data;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function nextQuoteNumber(db: DB): string {
  const year = new Date().getFullYear();
  const count = db.quotes.length + 1;
  const prefix = db.settings?.defaults?.quotePrefix || "QT";
  return `${prefix}-${year}-${String(count).padStart(3, "0")}`;
}

export function nextInvoiceNumber(db: DB): string {
  const year = new Date().getFullYear();
  const count = db.invoices.length + 1;
  const prefix = db.settings?.defaults?.invoicePrefix || "FAK";
  return `${prefix}-${year}-${String(count).padStart(3, "0")}`;
}

/** For tests / admin reset. Returns current backend ("postgres" / "file" / "memory"). */
export function getBackend(): Backend {
  return pickBackend();
}
