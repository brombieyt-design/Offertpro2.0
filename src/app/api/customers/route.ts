import { readDB, writeDB, generateId } from "@/lib/db";
import type { NextRequest } from "next/server";

export async function GET() {
  const db = readDB();
  return Response.json(db.customers);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const db = readDB();

  const customer = {
    id: generateId(),
    name: body.name ?? "",
    email: body.email ?? "",
    phone: body.phone,
    company: body.company,
    city: body.city,
    address: body.address,
    orgNr: body.orgNr,
    notes: body.notes,
  };

  db.customers.push(customer);
  writeDB(db);

  return Response.json(customer, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const db = readDB();

  const idx = db.customers.findIndex((c) => c.id === body.id);
  if (idx === -1) {
    return Response.json({ error: "Kund hittades inte" }, { status: 404 });
  }

  db.customers[idx] = { ...db.customers[idx], ...body };
  writeDB(db);

  return Response.json(db.customers[idx]);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const db = readDB();

  db.customers = db.customers.filter((c) => c.id !== id);
  writeDB(db);

  return Response.json({ ok: true });
}
