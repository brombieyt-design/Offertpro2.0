import { readDB, writeDB, generateId } from "@/lib/db";
import type { NextRequest } from "next/server";
import {
  sanitizeText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeOrgNr,
  sanitizePersonnummer,
  sanitizeEnum,
} from "@/lib/sanitize";

export async function GET() {
  try {
    const db = readDB();
    return Response.json(db.customers);
  } catch (err) {
    return Response.json({ error: "Serverfel", details: String(err) }, { status: 500 });
  }
}

function buildCustomer(body: Record<string, unknown>) {
  return {
    name: sanitizeText(body.name, 200),
    email: sanitizeEmail(body.email),
    phone: sanitizePhone(body.phone),
    company: sanitizeText(body.company, 200),
    city: sanitizeText(body.city, 100),
    address: sanitizeText(body.address, 300),
    orgNr: body.orgNr ? sanitizeOrgNr(body.orgNr) : "",
    personnummer: body.personnummer ? sanitizePersonnummer(body.personnummer) : "",
    customerType: sanitizeEnum(body.customerType, ["business", "private"] as const, "business"),
    notes: sanitizeText(body.notes, 5000),
    tags: Array.isArray(body.tags)
      ? body.tags.slice(0, 10).map((t: unknown) => sanitizeText(t, 50)).filter(Boolean)
      : [],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = readDB();

    // Allow bulk create via array
    if (Array.isArray(body)) {
      const created = body.slice(0, 500).map((entry) => ({
        id: generateId(),
        createdAt: new Date().toISOString(),
        ...buildCustomer(entry),
      }));
      db.customers.push(...created);
      writeDB(db);
      return Response.json({ created: created.length, customers: created }, { status: 201 });
    }

    const customer = {
      id: generateId(),
      createdAt: new Date().toISOString(),
      ...buildCustomer(body),
    };

    db.customers.push(customer);
    writeDB(db);

    return Response.json(customer, { status: 201 });
  } catch (err) {
    return Response.json({ error: "Kunde inte skapa kund", details: String(err) }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const db = readDB();

    const idx = db.customers.findIndex((c) => c.id === body.id);
    if (idx === -1) {
      return Response.json({ error: "Kund hittades inte" }, { status: 404 });
    }

    db.customers[idx] = { ...db.customers[idx], ...body };
    writeDB(db);

    return Response.json(db.customers[idx]);
  } catch (err) {
    return Response.json({ error: "Kunde inte uppdatera kund", details: String(err) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const db = readDB();

    db.customers = db.customers.filter((c) => c.id !== id);
    writeDB(db);

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: "Kunde inte ta bort kund", details: String(err) }, { status: 500 });
  }
}
