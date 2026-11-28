// Creates an admin, or resets an existing admin's password.
// Usage: npm run admin:create -- you@example.com ["Display Name"]
// The password is asked for interactively, or read from the ADMIN_PASSWORD variable.
import { createInterface } from "node:readline/promises";
import { Writable } from "node:stream";
import { getDbPool, query } from "../src/lib/db.ts";
import { hashPassword, MIN_PASSWORD_LENGTH } from "../src/lib/security/password.ts";

async function askHidden(prompt: string): Promise<string> {
  let hidden = false;
  const output = new Writable({
    write(chunk, _encoding, done) {
      if (!hidden) process.stdout.write(chunk);
      done();
    },
  });
  const reader = createInterface({ input: process.stdin, output, terminal: true });
  const answer = reader.question(prompt);
  hidden = true;
  const value = await answer;
  reader.close();
  process.stdout.write("\n");
  return value;
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

const email = process.argv[2]?.trim().toLowerCase();
const name = process.argv[3]?.trim();
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  fail('Usage: npm run admin:create -- you@example.com ["Display Name"]');
}

let password = process.env["ADMIN_PASSWORD"];
if (!password) {
  if (!process.stdin.isTTY) fail("Set ADMIN_PASSWORD, or run this in an interactive terminal.");
  password = await askHidden(`New password (at least ${MIN_PASSWORD_LENGTH} characters): `);
  if (password !== (await askHidden("Repeat password: "))) fail("Passwords do not match.");
}
if (password.length < MIN_PASSWORD_LENGTH || password.length > 200) {
  fail(`Password must be ${MIN_PASSWORD_LENGTH} to 200 characters long.`);
}

try {
  await query(
    `INSERT INTO admin_users (email, password, name) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE password = VALUES(password), name = COALESCE(?, name)`,
    [email, await hashPassword(password), name || "Administrator", name || null],
  );
  // A password change signs out every existing session of this account.
  await query(
    "DELETE s FROM admin_sessions s JOIN admin_users u ON u.id = s.user_id WHERE u.email = ?",
    [email],
  );
  console.log(`Admin ${email} is ready.`);
  await getDbPool().end();
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  fail(`Could not save the admin (did you run "npm run db:setup" first?): ${reason}`);
}
