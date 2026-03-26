import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json({ user: null }, { status: 401 });
    }

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
    return Response.json({ error: "Sessionsfel", details: String(err) }, { status: 500 });
  }
}
