import { readDB, writeDB, generateId } from "@/lib/db";
import { hashPassword, createSession, setSessionCookie } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { firstName, lastName, email, password, company } = body;

  if (!firstName || !lastName || !email || !password) {
    return Response.json(
      { error: "Alla obligatoriska fält måste fyllas i." },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return Response.json(
      { error: "Lösenordet måste vara minst 8 tecken." },
      { status: 400 }
    );
  }

  const db = readDB();

  if (db.users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return Response.json(
      { error: "Ett konto med denna e-postadress finns redan." },
      { status: 409 }
    );
  }

  const user = {
    id: generateId(),
    firstName,
    lastName,
    email: email.toLowerCase(),
    company: company || undefined,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  db.users.push(user);
  writeDB(db);

  const session = createSession(user.id);
  await setSessionCookie(session.id);

  return Response.json(
    {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company,
      },
    },
    { status: 201 }
  );
}
