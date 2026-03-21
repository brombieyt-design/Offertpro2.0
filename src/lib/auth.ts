import { cookies } from "next/headers";
import crypto from "crypto";
import { readDB, writeDB, generateId } from "./db";
import type { User, Session } from "@/types";

const SESSION_COOKIE = "session_id";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  const test = crypto.scryptSync(password, salt, 64).toString("hex");
  return hash === test;
}

export function createSession(userId: string): Session {
  const db = readDB();
  const session: Session = {
    id: generateId(),
    userId,
    expiresAt: new Date(Date.now() + SESSION_DURATION_MS).toISOString(),
  };
  db.sessions.push(session);
  writeDB(db);
  return session;
}

export async function setSessionCookie(sessionId: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const db = readDB();
  const session = db.sessions.find(
    (s) => s.id === sessionId && new Date(s.expiresAt) > new Date()
  );
  if (!session) return null;

  const user = db.users.find((u) => u.id === session.userId);
  return user ?? null;
}

export function removeSession(sessionId: string) {
  const db = readDB();
  db.sessions = db.sessions.filter((s) => s.id !== sessionId);
  writeDB(db);
}
