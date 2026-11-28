// In-memory counters: they reset on restart and are not shared between server instances.
// Add a limit at the hosting provider (WAF or reverse proxy) as well.
const buckets = new Map<string, { count: number; resetAt: number }>();
const MAX_BUCKETS = 10_000;

/** Counts one attempt. Returns 0 when allowed, otherwise the seconds to wait. */
export function hitRateLimit(key: string, limit: number, windowMs: number): number {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_BUCKETS) {
      for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
      if (buckets.size >= MAX_BUCKETS) buckets.delete(buckets.keys().next().value as string);
    }
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }
  bucket.count += 1;
  return bucket.count > limit ? Math.ceil((bucket.resetAt - now) / 1000) : 0;
}

export function resetRateLimits(): void {
  buckets.clear();
}
