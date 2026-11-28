// Creates and updates the database tables. Usage: npm run db:setup
import { getDbPool, query } from "../src/lib/db.ts";
import { ensureDatabaseAndSchema } from "../src/lib/db-schema.ts";

try {
  for (const line of await ensureDatabaseAndSchema()) console.log(line);

  const unsafe = await query<{ email: string }[]>(
    "SELECT email FROM admin_users WHERE password NOT LIKE 'scrypt$%'",
  );
  for (const { email } of unsafe) {
    console.warn(
      `[Action needed] ${email} still has an old plain-text password and cannot sign in. ` +
        `Run: npm run admin:create -- ${email}`,
    );
  }
  console.log("Database setup finished.");
  await getDbPool().end();
} catch (error) {
  console.error("Database setup failed:", error instanceof Error ? error.message : error);
  process.exit(1);
}
