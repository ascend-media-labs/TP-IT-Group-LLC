/** The visitor address used for rate limiting. Proxy headers are used only when trustworthy. */
export function getClientIp(request: Request): string {
  const runtime = request as Request & { cf?: unknown; ip?: string };
  // Cloudflare sets this header itself; elsewhere a visitor could forge it.
  if (runtime.cf) return request.headers.get("cf-connecting-ip") ?? "unknown";
  if (process.env["TRUST_PROXY"] === "true") {
    const forwarded = request.headers.get("x-forwarded-for")?.split(",").pop()?.trim();
    if (forwarded) return forwarded;
  }
  return runtime.ip ?? "unknown";
}
