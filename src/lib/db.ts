import fs from "fs";
import path from "path";
import type { Customer, Quote, Invoice, Template, User, Session } from "@/types";

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
}

const DB_PATH = path.join(process.cwd(), "data", "db.json");

// In-memory store used when filesystem is read-only (e.g. Vercel)
let memoryDB: DB | null = null;

function getDefaultData(): DB {
  return {
    customers: [
      {
        id: "c1",
        name: "Erik Johansson",
        email: "erik@acmecorp.se",
        phone: "+46 70 123 45 67",
        company: "Acme Corp AB",
        city: "Stockholm",
        address: "Kungsgatan 10, 111 43 Stockholm",
        orgNr: "556789-0123",
      },
      {
        id: "c2",
        name: "Sofia Lindström",
        email: "sofia@pixelstudio.se",
        phone: "+46 73 456 78 90",
        company: "Pixel Studio",
        city: "Göteborg",
        address: "Avenyn 5, 411 36 Göteborg",
      },
      {
        id: "c3",
        name: "Anders Berg",
        email: "anders@summitit.se",
        phone: "+46 76 789 01 23",
        company: "Summit IT Solutions",
        city: "Malmö",
        address: "Stortorget 1, 211 22 Malmö",
        orgNr: "556123-4567",
      },
      {
        id: "c4",
        name: "Maria Ekström",
        email: "maria@novaconsulting.se",
        company: "Nova Consulting",
        city: "Uppsala",
      },
    ],
    quotes: [
      {
        id: "q1",
        number: "QT-2026-001",
        customer: { id: "c1", name: "Erik Johansson", email: "erik@acmecorp.se", company: "Acme Corp AB" },
        items: [
          { id: "i1", description: "Webbutveckling", quantity: 40, unitPrice: 950, discount: 0 },
          { id: "i2", description: "UX-design", quantity: 20, unitPrice: 850, discount: 10 },
        ],
        status: "accepted",
        createdAt: "2026-03-01",
        validUntil: "2026-03-31",
        total: 53300,
      },
      {
        id: "q2",
        number: "QT-2026-002",
        customer: { id: "c2", name: "Sofia Lindström", email: "sofia@pixelstudio.se", company: "Pixel Studio" },
        items: [{ id: "i3", description: "Logotyp & varumärkespaket", quantity: 1, unitPrice: 28000 }],
        status: "opened",
        createdAt: "2026-03-05",
        validUntil: "2026-04-04",
        total: 28000,
      },
      {
        id: "q3",
        number: "QT-2026-003",
        customer: { id: "c3", name: "Anders Berg", email: "anders@summitit.se", company: "Summit IT Solutions" },
        items: [{ id: "i4", description: "IT-infrastruktur audit", quantity: 1, unitPrice: 85000 }],
        status: "sent",
        createdAt: "2026-03-10",
        validUntil: "2026-04-09",
        total: 85000,
      },
      {
        id: "q4",
        number: "QT-2026-004",
        customer: { id: "c4", name: "Maria Ekström", email: "maria@novaconsulting.se", company: "Nova Consulting" },
        items: [{ id: "i5", description: "Strategikonsultation", quantity: 10, unitPrice: 1950 }],
        status: "draft",
        createdAt: "2026-03-15",
        validUntil: "2026-04-14",
        total: 19500,
      },
    ],
    invoices: [
      {
        id: "inv1",
        number: "FAK-2026-001",
        customer: { id: "c1", name: "Erik Johansson", email: "erik@acmecorp.se", company: "Acme Corp AB" },
        items: [{ id: "i1", description: "Webbutveckling - fas 1", quantity: 20, unitPrice: 950 }],
        status: "paid",
        issuedAt: "2026-02-15",
        dueDate: "2026-03-15",
        total: 19000,
        paymentTerms: "30 dagar netto",
      },
      {
        id: "inv2",
        number: "FAK-2026-002",
        customer: { id: "c2", name: "Sofia Lindström", email: "sofia@pixelstudio.se", company: "Pixel Studio" },
        items: [{ id: "i2", description: "Logotypdesign - delbetalning", quantity: 1, unitPrice: 14000 }],
        status: "sent",
        issuedAt: "2026-03-01",
        dueDate: "2026-03-31",
        total: 14000,
        paymentTerms: "30 dagar netto",
      },
      {
        id: "inv3",
        number: "FAK-2026-003",
        customer: { id: "c3", name: "Anders Berg", email: "anders@summitit.se", company: "Summit IT Solutions" },
        items: [{ id: "i3", description: "IT-konsultation", quantity: 8, unitPrice: 1200 }],
        status: "overdue",
        issuedAt: "2026-02-01",
        dueDate: "2026-03-01",
        total: 9600,
        paymentTerms: "30 dagar netto",
      },
    ],
    templates: [],
    users: [],
    sessions: [],
  };
}

function canWriteToFS(): boolean {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // Test write access
    const testFile = path.join(dir, ".write-test");
    fs.writeFileSync(testFile, "");
    fs.unlinkSync(testFile);
    return true;
  } catch {
    return false;
  }
}

let useFileSystem: boolean | null = null;

function shouldUseFS(): boolean {
  if (useFileSystem === null) {
    useFileSystem = canWriteToFS();
  }
  return useFileSystem;
}

export function readDB(): DB {
  if (!shouldUseFS()) {
    if (!memoryDB) {
      memoryDB = getDefaultData();
    }
    return memoryDB;
  }

  try {
    if (!fs.existsSync(DB_PATH)) {
      const defaultData = getDefaultData();
      writeDB(defaultData);
      return defaultData;
    }
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw) as DB;
  } catch {
    const defaultData = getDefaultData();
    try {
      writeDB(defaultData);
    } catch {
      // filesystem failed, fall back to memory
      memoryDB = defaultData;
    }
    return defaultData;
  }
}

export function writeDB(data: DB): void {
  if (!shouldUseFS()) {
    memoryDB = data;
    return;
  }

  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function nextQuoteNumber(db: DB): string {
  const year = new Date().getFullYear();
  const count = db.quotes.length + 1;
  return `QT-${year}-${String(count).padStart(3, "0")}`;
}

export function nextInvoiceNumber(db: DB): string {
  const year = new Date().getFullYear();
  const count = db.invoices.length + 1;
  return `FAK-${year}-${String(count).padStart(3, "0")}`;
}
