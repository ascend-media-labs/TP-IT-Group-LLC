const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  // TanStack Start renders inline hydration scripts, so inline scripts must stay allowed.
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-src https://maps.google.com https://www.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

export function withSecurityHeaders(
  request: Request,
  response: Response,
  { contentSecurityPolicy }: { contentSecurityPolicy: boolean },
): Response {
  const headers = new Headers(response.headers);
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-frame-options", "DENY");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  headers.set("permissions-policy", "camera=(), microphone=(), geolocation=()");
  // The Vite dev server needs inline and websocket access that this policy would block.
  if (contentSecurityPolicy) headers.set("content-security-policy", CONTENT_SECURITY_POLICY);
  if (new URL(request.url).protocol === "https:") {
    headers.set("strict-transport-security", "max-age=31536000");
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
