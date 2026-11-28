import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

// scrypt parameters are stored with each hash so they can be raised later.
const COST = 16384;
const BLOCK_SIZE = 8;
const PARALLELISM = 1;
const KEY_LENGTH = 64;
export const MIN_PASSWORD_LENGTH = 12;

function derive(password: string, salt: Buffer, N: number, r: number, p: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, KEY_LENGTH, { N, r, p }, (error, key) =>
      error ? reject(error) : resolve(key),
    );
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await derive(password, salt, COST, BLOCK_SIZE, PARALLELISM);
  const parts = [COST, BLOCK_SIZE, PARALLELISM, salt.toString("base64"), key.toString("base64")];
  return ["scrypt", ...parts].join("$");
}

/** Returns false for anything that is not a scrypt hash, including old plain-text passwords. */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, n, r, p, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !n || !r || !p || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64");
  if (expected.length !== KEY_LENGTH) return false;
  const saltBytes = Buffer.from(salt, "base64");
  const actual = await derive(password, saltBytes, Number(n), Number(r), Number(p));
  return timingSafeEqual(actual, expected);
}
