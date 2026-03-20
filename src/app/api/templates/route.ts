import { readDB, writeDB, generateId } from "@/lib/db";
import type { NextRequest } from "next/server";

export async function GET() {
  const db = readDB();
  return Response.json(db.templates);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const db = readDB();

  const template = {
    id: generateId(),
    name: body.name ?? "Ny mall",
    description: body.description ?? "",
    items: (body.items ?? []).map((item: Record<string, unknown>) => ({
      ...item,
      id: item.id || generateId(),
    })),
    createdAt: new Date().toISOString().split("T")[0],
  };

  db.templates.push(template);
  writeDB(db);

  return Response.json(template, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const db = readDB();

  db.templates = db.templates.filter((t) => t.id !== id);
  writeDB(db);

  return Response.json({ ok: true });
}
