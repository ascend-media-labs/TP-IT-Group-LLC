// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const query = vi.fn();
vi.mock("../lib/db.ts", () => ({ query: (...args: unknown[]) => query(...args) }));

import { handleApiRequest } from "../lib/api-handler";
import { hashPassword, verifyPassword } from "../lib/security/password";
import { resetRateLimits } from "../lib/security/rate-limit";

const ORIGIN = "http://localhost:8080";
const TOKEN = "a".repeat(64);
const ADMIN = { id: 1, email: "admin@example.com", name: "Admin", role: "Super Admin" };

function call(
  path: string,
  {
    method = "GET",
    body,
    headers = {},
    signedIn = false,
  }: {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
    signedIn?: boolean;
  } = {},
) {
  const init: RequestInit = {
    method,
    headers: {
      ...(method === "GET" ? {} : { "content-type": "application/json" }),
      ...(signedIn ? { cookie: `tpit_session=${TOKEN}` } : {}),
      ...headers,
    },
  };
  if (body !== undefined) init.body = typeof body === "string" ? body : JSON.stringify(body);
  return handleApiRequest(new Request(ORIGIN + path, init), "203.0.113.1");
}

const sqlRun = () => query.mock.calls.map(([sql]) => String(sql));

beforeEach(() => {
  resetRateLimits();
  query.mockReset();
  query.mockImplementation(async (sql: string) => {
    if (sql.includes("FROM admin_sessions s")) return [ADMIN];
    if (sql.startsWith("INSERT")) return { insertId: 7 };
    return [];
  });
});

describe("access control", () => {
  it.each([
    ["GET", "/api/contact"],
    ["PUT", "/api/contact"],
    ["DELETE", "/api/contact"],
    ["GET", "/api/applications"],
    ["PUT", "/api/applications"],
    ["DELETE", "/api/applications"],
    ["POST", "/api/team"],
    ["PUT", "/api/team"],
    ["DELETE", "/api/team"],
    ["POST", "/api/clients"],
    ["PUT", "/api/clients"],
    ["DELETE", "/api/clients"],
    ["POST", "/api/careers"],
    ["PUT", "/api/careers"],
    ["DELETE", "/api/careers"],
    ["POST", "/api/upload"],
    ["GET", "/api/stats"],
    ["GET", "/api/auth/session"],
  ])("%s %s requires a session", async (method, path) => {
    const response = await call(path, { method });
    expect(response.status).toBe(401);
    expect(query).not.toHaveBeenCalled();
  });

  it.each([
    "/api/data/admin_users",
    "/api/schema/sync",
    "/api/schema/create-table",
    "/api/__proto__",
    "/api/constructor",
  ])("%s does not exist", async (path) => {
    expect((await call(path, { signedIn: true })).status).toBe(404);
    expect(query).not.toHaveBeenCalled();
  });

  it("rejects the old forgeable token", async () => {
    const forged = Buffer.from(JSON.stringify({ id: 1 })).toString("base64");
    const response = await call("/api/contact", {
      headers: { cookie: `tpit_session=${forged}`, authorization: `Bearer ${forged}` },
    });
    expect(response.status).toBe(401);
  });

  it("allows a signed-in admin", async () => {
    expect((await call("/api/contact", { signedIn: true })).status).toBe(200);
  });

  it("shows only active jobs to visitors", async () => {
    await call("/api/careers?status=inactive");
    expect(sqlRun().at(-1)).toContain("is_active = 1");
  });
});

describe("cross-site protection", () => {
  const body = { id: 1 };

  it("requires a JSON content type", async () => {
    const response = await call("/api/team", {
      method: "DELETE",
      body,
      signedIn: true,
      headers: { "content-type": "text/plain" },
    });
    expect(response.status).toBe(415);
  });

  it.each([{ origin: "https://evil.example" }, { "sec-fetch-site": "cross-site" }])(
    "rejects %o",
    async (headers) => {
      const response = await call("/api/team", { method: "DELETE", body, signedIn: true, headers });
      expect(response.status).toBe(403);
      expect(query).not.toHaveBeenCalled();
    },
  );

  it("accepts the same origin", async () => {
    const response = await call("/api/team", {
      method: "DELETE",
      body,
      signedIn: true,
      headers: { origin: ORIGIN },
    });
    expect(response.status).toBe(200);
  });
});

describe("login", () => {
  const login = (password: string) =>
    call("/api/auth/login", { method: "POST", body: { email: ADMIN.email, password } });

  const storedPassword = (password: string) =>
    query.mockImplementation(async (sql: string) =>
      sql.includes("FROM admin_users WHERE") ? [{ ...ADMIN, password }] : [],
    );

  it("never accepts a plain-text stored password", async () => {
    storedPassword("admin123");
    expect((await login("admin123")).status).toBe(401);
    expect((await login("anything")).status).toBe(401);
  });

  it("rejects a wrong password and accepts the right one with a protected cookie", async () => {
    storedPassword(await hashPassword("correct horse battery"));
    expect((await login("admin123")).status).toBe(401);

    const response = await login("correct horse battery");
    expect(response.status).toBe(200);
    const cookie = response.headers.get("set-cookie") ?? "";
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("SameSite=Strict");
    expect(await response.text()).not.toContain("scrypt");
  });

  it("limits repeated attempts", async () => {
    const statuses = [];
    for (let i = 0; i < 6; i++) statuses.push((await login("wrong")).status);
    expect(statuses).toEqual([401, 401, 401, 401, 401, 429]);
  });

  it("hashes with a random salt", async () => {
    const [a, b] = await Promise.all([hashPassword("same"), hashPassword("same")]);
    expect(a).not.toBe(b);
    expect(await verifyPassword("same", a)).toBe(true);
    expect(await verifyPassword("other", a)).toBe(false);
  });
});

describe("input handling", () => {
  const application = {
    role_title: "Engineer",
    applicant_name: "Test Person",
    email: "test@example.com",
    phone: "+1 814 844 1362",
  };
  const apply = (extra: Record<string, unknown>) =>
    call("/api/applications", { method: "POST", body: { ...application, ...extra } });

  it.each([
    { email: "not-an-email" },
    { phone: "123" },
    { resume_link: "javascript:alert(1)" },
    { applicant_name: { nested: true } },
    { cover_note: "x".repeat(5001) },
  ])("rejects invalid input %#", async (extra) => {
    expect((await apply(extra)).status).toBe(400);
    expect(query).not.toHaveBeenCalled();
  });

  it("ignores unknown fields and completes links", async () => {
    const response = await apply({ status: "Hired", id: 99, linkedin_url: "linkedin.com/in/test" });
    expect(response.status).toBe(201);
    const [sql, values] = query.mock.calls.at(-1) as [string, unknown[]];
    expect(sql).not.toMatch(/\bid\b,/);
    expect(values).toContain("Submitted");
    expect(values).not.toContain("Hired");
    expect(values).toContain("https://linkedin.com/in/test");
  });

  it("rejects oversized and malformed bodies", async () => {
    const post = (body: string) => call("/api/contact", { method: "POST", body });
    expect((await post(JSON.stringify({ message: "x".repeat(70_000) }))).status).toBe(413);
    expect((await post("{broken")).status).toBe(400);
  });

  it("does not leak database errors", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    query.mockRejectedValue(new Error("Access denied for user 'root'"));
    const response = await call("/api/team");
    expect(response.status).toBe(500);
    expect(await response.text()).not.toContain("root");
  });

  it.each([
    ["page.html", "<script>alert(1)</script>"],
    ["logo.svg", '<svg onload="alert(1)"/>'],
    ["fake.png", "not really an image"],
  ])("refuses to upload %s", async (filename, content) => {
    const data = `data:image/png;base64,${Buffer.from(content).toString("base64")}`;
    const response = await call("/api/upload", {
      method: "POST",
      body: { filename, data },
      signedIn: true,
    });
    expect(response.status).toBe(400);
  });
});
