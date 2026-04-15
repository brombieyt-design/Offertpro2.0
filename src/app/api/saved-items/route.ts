import { readDB, writeDB, generateId } from "@/lib/db";
import type { NextRequest } from "next/server";
import { sanitizeText, sanitizeNumber } from "@/lib/sanitize";

export async function GET() {
  try {
    const db = readDB();
    return Response.json(db.savedItems || []);
  } catch (err) {
    return Response.json({ error: "Serverfel", details: String(err) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = readDB();
    if (!db.savedItems) db.savedItems = [];

    const item = {
      id: generateId(),
      description: sanitizeText(body.description, 500),
      unitPrice: sanitizeNumber(body.unitPrice, { min: 0, max: 10_000_000 }),
      category: sanitizeText(body.category, 100),
      createdAt: new Date().toISOString(),
    };

    if (!item.description) {
      return Response.json({ error: "Beskrivning krävs" }, { status: 400 });
    }

    db.savedItems.unshift(item);
    writeDB(db);

    return Response.json(item, { status: 201 });
  } catch (err) {
    return Response.json({ error: "Kunde inte spara objekt", details: String(err) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const db = readDB();
    db.savedItems = (db.savedItems || []).filter((i) => i.id !== id);
    writeDB(db);
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: "Kunde inte ta bort objekt", details: String(err) }, { status: 500 });
  }
}
