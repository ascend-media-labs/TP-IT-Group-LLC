import { query } from "./db.ts";
import { hashPassword, verifyPassword } from "./security/password.ts";
import { hitRateLimit } from "./security/rate-limit.ts";
import { createSession, destroySession, getSessionUser } from "./security/session.ts";
import type { AdminUser } from "./security/session.ts";
import { buildImageFilename, detectImageExtension, MAX_IMAGE_BYTES } from "./upload.ts";
import {
  applicationSchema,
  applicationStatusSchema,
  careerSchema,
  clientSchema,
  contactReadSchema,
  contactSchema,
  idSchema,
  loginSchema,
  teamSchema,
} from "./validation.ts";

const MAX_BODY_BYTES = 64 * 1024;
// Base64 is about 4/3 of the file size.
const MAX_UPLOAD_BODY_BYTES = Math.ceil(MAX_IMAGE_BYTES * 1.4);
const MINUTE = 60 * 1000;

class ApiError extends Error {
  status: number;
  headers: Record<string, string>;
  constructor(status: number, message: string, headers: Record<string, string> = {}) {
    super(message);
    this.status = status;
    this.headers = headers;
  }
}

interface Context {
  request: Request;
  url: URL;
  clientIp: string;
  user: AdminUser | null;
  body: () => Promise<Record<string, unknown>>;
}

interface Route {
  /** "admin" routes need a valid session. Every route must state which it is. */
  access: "public" | "admin";
  run: (context: Context) => Promise<Response>;
}

function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store", ...headers },
  });
}

function limit(key: string, max: number, windowMs: number) {
  const retryAfter = hitRateLimit(key, max, windowMs);
  if (retryAfter) {
    throw new ApiError(429, "Too many requests. Please try again later.", {
      "retry-after": String(retryAfter),
    });
  }
}

interface Schema<T> {
  safeParse: (
    value: unknown,
  ) => { success: true; data: T } | { success: false; error: { issues: { message: string }[] } };
}

function parse<T>(schema: Schema<T>, value: unknown): T {
  const result = schema.safeParse(value);
  if (!result.success) {
    throw new ApiError(400, result.error.issues[0]?.message ?? "Invalid request");
  }
  return result.data;
}

async function readJson(request: Request, maxBytes: number): Promise<Record<string, unknown>> {
  const tooLarge = new ApiError(413, "Request is too large");
  if (Number(request.headers.get("content-length") ?? 0) > maxBytes) throw tooLarge;
  const reader = request.body?.getReader();
  if (!reader) return {};
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw tooLarge;
    }
    chunks.push(value);
  }
  if (size === 0) return {};
  try {
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    // handled below
  }
  throw new ApiError(400, "Request body must be a JSON object");
}

/**
 * Blocks cross-site writes. Requiring application/json forces a browser preflight,
 * which this API never approves, and the Origin header must match this site.
 */
function assertSameSite(request: Request, url: URL) {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.split(";")[0]?.trim().toLowerCase() !== "application/json") {
    throw new ApiError(415, "Content-Type must be application/json");
  }
  const forbidden = new ApiError(403, "Cross-site requests are not allowed");
  if (request.headers.get("sec-fetch-site") === "cross-site") throw forbidden;
  const origin = request.headers.get("origin");
  if (origin === null || origin === process.env["APP_ORIGIN"]) return;
  let originHost = "";
  try {
    originHost = new URL(origin).host;
  } catch {
    // "null" and malformed origins are rejected below.
  }
  if (originHost !== url.host) throw forbidden;
}

// Whitelisted ORDER BY clause: user input never reaches the SQL text.
function orderBy(url: URL, columns: string[], fallback: string, fallbackOrder: "ASC" | "DESC") {
  const sort = url.searchParams.get("sort") ?? "";
  const requested = url.searchParams.get("order")?.toUpperCase();
  const order = requested === "ASC" || requested === "DESC" ? requested : fallbackOrder;
  return ` ORDER BY ${columns.includes(sort) ? sort : fallback} ${order}, id ASC`;
}

function searchFilter(url: URL, columns: string[]) {
  const search = url.searchParams.get("search")?.slice(0, 100);
  if (!search) return { sql: "", args: [] as string[] };
  return {
    sql: ` AND (${columns.map((column) => `${column} LIKE ?`).join(" OR ")})`,
    args: columns.map(() => `%${search}%`),
  };
}

async function count(sql: string): Promise<number> {
  const rows = await query<{ count: number }[]>(sql);
  return Number(rows[0]?.count ?? 0);
}

type DeletableTable =
  | "team_members"
  | "clients"
  | "careers"
  | "contact_messages"
  | "job_applications";

function deleteById(table: DeletableTable): Route {
  return {
    access: "admin",
    run: async ({ body }) => {
      const { id } = parse(idSchema, await body());
      await query(`DELETE FROM ${table} WHERE id = ?`, [id]);
      return json({ success: true });
    },
  };
}

function teamValues(input: Record<string, unknown>) {
  const m = parse(teamSchema, input);
  return [
    m.name,
    m.role,
    m.sub_role,
    m.bio,
    m.image || "/team/karthik.jpg",
    m.department || "TP IT Group LLC",
    m.display_order,
  ];
}

function clientValues(input: Record<string, unknown>) {
  const c = parse(clientSchema, input);
  return [c.name, c.src, c.category || "Enterprise Partner", c.display_order];
}

function careerValues(input: Record<string, unknown>) {
  const j = parse(careerSchema, input);
  return [
    j.title,
    j.dept,
    j.location || "Wilmington, DE / Hybrid",
    j.type || "Full-time",
    j.experience || "3-5 years",
    j.description,
    j.is_active,
  ];
}

// Compared against when the email is unknown, so response time does not reveal valid emails.
let dummyHash: Promise<string> | undefined;

const routes: Record<string, Partial<Record<string, Route>>> = {
  "/api/auth/login": {
    POST: {
      access: "public",
      run: async ({ request, clientIp, body }) => {
        limit(`login-ip:${clientIp}`, 20, 15 * MINUTE);
        const { email, password } = parse(loginSchema, await body());
        limit(`login-account:${clientIp}:${email}`, 5, 15 * MINUTE);

        const users = await query<(AdminUser & { password: string })[]>(
          "SELECT id, email, password, name, role FROM admin_users WHERE email = ?",
          [email],
        );
        const user = users[0];
        dummyHash ??= hashPassword("not-a-real-password");
        const valid = await verifyPassword(password, user?.password ?? (await dummyHash));
        if (!user || !valid) throw new ApiError(401, "Invalid email or password");

        const cookie = await createSession(request, user.id);
        const { id, name, role } = user;
        return json({ success: true, user: { id, email: user.email, name, role } }, 200, {
          "set-cookie": cookie,
        });
      },
    },
  },

  "/api/auth/logout": {
    POST: {
      access: "public",
      run: async ({ request }) =>
        json({ success: true }, 200, { "set-cookie": await destroySession(request) }),
    },
  },

  "/api/auth/session": {
    GET: {
      access: "admin",
      run: async ({ user }) => json({ success: true, user }),
    },
  },

  "/api/stats": {
    GET: {
      access: "admin",
      run: async () =>
        json({
          success: true,
          teamCount: await count("SELECT count(*) AS count FROM team_members"),
          clientCount: await count("SELECT count(*) AS count FROM clients"),
          careerCount: await count("SELECT count(*) AS count FROM careers"),
          activeCareerCount: await count(
            "SELECT count(*) AS count FROM careers WHERE is_active = 1",
          ),
          contactCount: await count("SELECT count(*) AS count FROM contact_messages"),
          unreadContactCount: await count(
            "SELECT count(*) AS count FROM contact_messages WHERE is_read = 0",
          ),
        }),
    },
  },

  "/api/upload": {
    POST: {
      access: "admin",
      run: async ({ user, body }) => {
        limit(`upload:${user?.id}`, 30, 10 * MINUTE);
        const input = await body();
        const data = input["data"];
        const filename = input["filename"];
        if (typeof data !== "string" || !data) {
          throw new ApiError(400, "No image data provided for upload");
        }
        const buffer = Buffer.from(data.replace(/^data:[^,]*,/, ""), "base64");
        if (buffer.length > MAX_IMAGE_BYTES) throw new ApiError(413, "Image exceeds the 5MB limit");
        const extension = detectImageExtension(buffer);
        if (!extension) throw new ApiError(400, "Only PNG, JPG and WebP images are allowed");

        const folder = input["folder"] === "logos" ? "logos" : "team";
        const name = buildImageFilename(typeof filename === "string" ? filename : "", extension);
        const [fs, path] = await Promise.all([import("node:fs/promises"), import("node:path")]);
        const directory = path.resolve(process.cwd(), "public", folder);
        await fs.mkdir(directory, { recursive: true });
        await fs.writeFile(path.join(directory, name), buffer, { flag: "wx" });
        return json({ success: true, url: `/${folder}/${name}`, filename: name });
      },
    },
  },

  "/api/team": {
    GET: {
      access: "public",
      run: async ({ url }) => {
        const search = searchFilter(url, ["name", "role", "department", "bio"]);
        let sql = `SELECT * FROM team_members WHERE 1=1${search.sql}`;
        const args = [...search.args];
        const dept = url.searchParams.get("dept");
        if (dept) {
          sql += " AND department = ?";
          args.push(dept);
        }
        const columns = ["id", "name", "role", "display_order", "created_at"];
        sql += orderBy(url, columns, "display_order", "ASC");
        const team = await query<unknown[]>(sql, args);
        return json({ success: true, count: team.length, team });
      },
    },
    POST: {
      access: "admin",
      run: async ({ body }) => {
        const result = await query<{ insertId: number }>(
          "INSERT INTO team_members (name, role, sub_role, bio, image, department, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
          teamValues(await body()),
        );
        return json({ success: true, id: result.insertId }, 201);
      },
    },
    PUT: {
      access: "admin",
      run: async ({ body }) => {
        const input = await body();
        const { id } = parse(idSchema, input);
        await query(
          "UPDATE team_members SET name=?, role=?, sub_role=?, bio=?, image=?, department=?, display_order=? WHERE id=?",
          [...teamValues(input), id],
        );
        return json({ success: true });
      },
    },
    DELETE: deleteById("team_members"),
  },

  "/api/clients": {
    GET: {
      access: "public",
      run: async ({ url }) => {
        const search = searchFilter(url, ["name", "category"]);
        let sql = `SELECT * FROM clients WHERE 1=1${search.sql}`;
        const args = [...search.args];
        const category = url.searchParams.get("category");
        if (category && category !== "all") {
          sql += " AND category = ?";
          args.push(category);
        }
        const columns = ["id", "name", "category", "display_order", "created_at"];
        sql += orderBy(url, columns, "display_order", "ASC");
        const clients = await query<unknown[]>(sql, args);
        return json({ success: true, count: clients.length, clients });
      },
    },
    POST: {
      access: "admin",
      run: async ({ body }) => {
        const result = await query<{ insertId: number }>(
          "INSERT INTO clients (name, src, category, display_order) VALUES (?, ?, ?, ?)",
          clientValues(await body()),
        );
        return json({ success: true, id: result.insertId }, 201);
      },
    },
    PUT: {
      access: "admin",
      run: async ({ body }) => {
        const input = await body();
        const { id } = parse(idSchema, input);
        await query("UPDATE clients SET name=?, src=?, category=?, display_order=? WHERE id=?", [
          ...clientValues(input),
          id,
        ]);
        return json({ success: true });
      },
    },
    DELETE: deleteById("clients"),
  },

  "/api/careers": {
    GET: {
      access: "public",
      run: async ({ url, user }) => {
        const search = searchFilter(url, ["title", "dept", "location", "description"]);
        let sql = `SELECT * FROM careers WHERE 1=1${search.sql}`;
        const args = [...search.args];
        for (const column of ["dept", "type"]) {
          const value = url.searchParams.get(column);
          if (value) {
            sql += ` AND ${column} = ?`;
            args.push(value);
          }
        }
        const status = url.searchParams.get("status");
        const isActive = url.searchParams.get("is_active");
        // Visitors only ever see active openings.
        if (!user || status === "active" || isActive === "1") sql += " AND is_active = 1";
        else if (status === "inactive" || isActive === "0") sql += " AND is_active = 0";
        const columns = ["id", "title", "dept", "location", "created_at"];
        sql += orderBy(url, columns, "id", "DESC");
        const careers = await query<unknown[]>(sql, args);
        return json({ success: true, count: careers.length, careers });
      },
    },
    POST: {
      access: "admin",
      run: async ({ body }) => {
        const result = await query<{ insertId: number }>(
          "INSERT INTO careers (title, dept, location, type, experience, description, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)",
          careerValues(await body()),
        );
        return json({ success: true, id: result.insertId }, 201);
      },
    },
    PUT: {
      access: "admin",
      run: async ({ body }) => {
        const input = await body();
        const { id } = parse(idSchema, input);
        await query(
          "UPDATE careers SET title=?, dept=?, location=?, type=?, experience=?, description=?, is_active=? WHERE id=?",
          [...careerValues(input), id],
        );
        return json({ success: true });
      },
    },
    DELETE: deleteById("careers"),
  },

  "/api/contact": {
    GET: {
      access: "admin",
      run: async () => {
        const messages = await query("SELECT * FROM contact_messages ORDER BY id DESC");
        return json({ success: true, messages });
      },
    },
    POST: {
      access: "public",
      run: async ({ clientIp, body }) => {
        limit(`contact:${clientIp}`, 5, 10 * MINUTE);
        const m = parse(contactSchema, await body());
        await query(
          "INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)",
          [m.name, m.email, m.phone, m.subject, m.message],
        );
        return json({ success: true, message: "Message sent successfully" }, 201);
      },
    },
    PUT: {
      access: "admin",
      run: async ({ body }) => {
        const { id, is_read } = parse(contactReadSchema, await body());
        await query("UPDATE contact_messages SET is_read = ? WHERE id = ?", [is_read ? 1 : 0, id]);
        return json({ success: true });
      },
    },
    DELETE: deleteById("contact_messages"),
  },

  "/api/applications": {
    GET: {
      access: "admin",
      run: async () => {
        const applications = await query("SELECT * FROM job_applications ORDER BY id DESC");
        return json({ success: true, applications });
      },
    },
    POST: {
      access: "public",
      run: async ({ clientIp, body }) => {
        limit(`application:${clientIp}`, 5, 10 * MINUTE);
        const a = parse(applicationSchema, await body());
        const row = {
          ...a,
          dept: a.dept || "General",
          location: a.location || "Remote / Hybrid",
          status: "Submitted",
        };
        // Column names come from the validation schema, which strips unknown keys.
        const names = Object.keys(row);
        const result = await query<{ insertId: number }>(
          `INSERT INTO job_applications (${names.join(", ")}) VALUES (${names.map(() => "?").join(", ")})`,
          Object.values(row),
        );
        const reference = String(result.insertId).padStart(4, "0");
        return json(
          {
            success: true,
            id: result.insertId,
            applicationId: `TPIT-${new Date().getFullYear()}-${reference}`,
            message: "Application submitted successfully to TP IT Group LLC",
          },
          201,
        );
      },
    },
    PUT: {
      access: "admin",
      run: async ({ body }) => {
        const { id, status } = parse(applicationStatusSchema, await body());
        await query("UPDATE job_applications SET status = ? WHERE id = ?", [status, id]);
        return json({ success: true });
      },
    },
    DELETE: deleteById("job_applications"),
  },
};

async function resolveUser(request: Request, route: Route): Promise<AdminUser | null> {
  try {
    return await getSessionUser(request);
  } catch (error) {
    // A session lookup failure must not take down public pages.
    if (route.access === "public") return null;
    throw error;
  }
}

export async function handleApiRequest(request: Request, clientIp: string): Promise<Response> {
  const url = new URL(request.url);
  try {
    const methods = Object.hasOwn(routes, url.pathname) ? routes[url.pathname] : undefined;
    if (!methods) throw new ApiError(404, "Not found");
    const route = Object.hasOwn(methods, request.method) ? methods[request.method] : undefined;
    if (!route) {
      throw new ApiError(405, "Method not allowed", { allow: Object.keys(methods).join(", ") });
    }
    if (request.method !== "GET") assertSameSite(request, url);

    const user = await resolveUser(request, route);
    if (route.access === "admin" && !user) throw new ApiError(401, "Please sign in");

    const maxBytes = url.pathname === "/api/upload" ? MAX_UPLOAD_BODY_BYTES : MAX_BODY_BYTES;
    return await route.run({
      request,
      url,
      clientIp,
      user,
      body: () => readJson(request, maxBytes),
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return json({ success: false, error: error.message }, error.status, error.headers);
    }
    // Details stay in the server log; visitors get a generic message.
    console.error("API Error in", url.pathname, error);
    return json({ success: false, error: "Something went wrong. Please try again later." }, 500);
  }
}
