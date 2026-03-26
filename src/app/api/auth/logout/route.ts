import { cookies } from "next/headers";
import { clearSessionCookie, removeSession } from "@/lib/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session_id")?.value;

    if (sessionId) {
      removeSession(sessionId);
    }

    await clearSessionCookie();

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: "Utloggningsfel", details: String(err) }, { status: 500 });
  }
}
