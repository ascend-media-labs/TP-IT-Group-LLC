import { randomBytes } from "node:crypto";

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/** Decides the file type from the content itself, never from the name or declared MIME type. */
export function detectImageExtension(buffer: Buffer): ".png" | ".jpg" | ".webp" | null {
  if (buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return ".png";
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return ".jpg";
  const isRiff = buffer.toString("ascii", 0, 4) === "RIFF";
  if (isRiff && buffer.toString("ascii", 8, 12) === "WEBP") return ".webp";
  return null;
}

export function buildImageFilename(originalName: string, extension: string): string {
  const base = (originalName.split(/[\\/]/).pop() ?? "")
    .replace(/\.[^.]*$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 30);
  return `${base || "image"}_${Date.now()}_${randomBytes(4).toString("hex")}${extension}`;
}
