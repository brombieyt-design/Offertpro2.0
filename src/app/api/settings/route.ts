import { readDB, writeDB } from "@/lib/db";
import type { NextRequest } from "next/server";

export async function GET() {
  try {
    const db = readDB();
    return Response.json(db.settings ?? {});
  } catch (err) {
    return Response.json({ error: "Serverfel", details: String(err) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = readDB();

    db.settings = { ...(db.settings ?? {}), ...body };
    writeDB(db);

    return Response.json(db.settings);
  } catch (err) {
    return Response.json({ error: "Kunde inte spara inställningar", details: String(err) }, { status: 500 });
  }
}
