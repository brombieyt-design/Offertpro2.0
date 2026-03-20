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
