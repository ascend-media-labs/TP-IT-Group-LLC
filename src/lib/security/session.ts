import { createHash, randomBytes } from "node:crypto";
import { query } from "../db.ts";

export const SESSION_COOKIE = "tpit_session";
const SESSION_LIFETIME_MS = 8 * 60 * 60 * 1000;

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

// Only the hash is stored, so a leaked database does not expose usable session tokens.
const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

function readToken(request: Request): string | null {
  const header = request.headers.get("cookie") ?? "";
  for (const part of header.split(";")) {
    const [name, ...value] = part.trim().split("=");
    if (name === SESSION_COOKIE) {
      const token = value.join("=");
      return /^[a-f0-9]{64}$/.test(token) ? token : null;
    }
  }
  return null;
}

function buildCookie(request: Request, value: string, maxAgeSeconds: number): string {
  const { hostname, protocol } = new URL(request.url);
  const isLocalHttp =
    protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(hostname);
  return [
    `${SESSION_COOKIE}=${value}`,
    "Path=/api",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${maxAgeSeconds}`,
    ...(isLocalHttp ? [] : ["Secure"]),
  ].join("; ");
}

/** Creates a session and returns the Set-Cookie header value. */
export async function createSession(request: Request, userId: number): Promise<string> {
  const token = randomBytes(32).toString("hex");
  await query("DELETE FROM admin_sessions WHERE expires_at < ?", [Date.now()]);
  await query("INSERT INTO admin_sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)", [
    hashToken(token),
    userId,
    Date.now() + SESSION_LIFETIME_MS,
  ]);
  return buildCookie(request, token, SESSION_LIFETIME_MS / 1000);
}

export async function getSessionUser(request: Request): Promise<AdminUser | null> {
  const token = readToken(request);
  if (!token) return null;
  const rows = await query<AdminUser[]>(
    `SELECT u.id, u.email, u.name, u.role
       FROM admin_sessions s
       JOIN admin_users u ON u.id = s.user_id
      WHERE s.token_hash = ? AND s.expires_at > ?`,
    [hashToken(token), Date.now()],
  );
  return rows[0] ?? null;
}

/** Deletes the session and returns the Set-Cookie header value that clears the cookie. */
export async function destroySession(request: Request): Promise<string> {
  const token = readToken(request);
  if (token) await query("DELETE FROM admin_sessions WHERE token_hash = ?", [hashToken(token)]);
  return buildCookie(request, "", 0);
}
