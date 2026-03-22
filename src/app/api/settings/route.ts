import { readDB, writeDB } from "@/lib/db";
import type { NextRequest } from "next/server";

export async function GET() {
  const db = readDB();
  return Response.json(db.settings ?? {});
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const db = readDB();

  db.settings = { ...(db.settings ?? {}), ...body };
  writeDB(db);

  return Response.json(db.settings);
}
