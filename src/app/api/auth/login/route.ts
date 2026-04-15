import { readDB } from "@/lib/db";
import { verifyPassword, createSession, setSessionCookie } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { error: "E-post och lösenord krävs." },
        { status: 400 }
      );
    }

    const db = await readDB();
    const user = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return Response.json(
        { error: "Fel e-postadress eller lösenord." },
        { status: 401 }
      );
    }

    const session = await createSession(user.id);
    await setSessionCookie(session.id);

    return Response.json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company,
      },
    });
  } catch (err) {
    return Response.json({ error: "Inloggningsfel", details: String(err) }, { status: 500 });
  }
}
