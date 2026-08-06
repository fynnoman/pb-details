/**
 * Sehr einfacher In-Memory-Rate-Limiter mit Sliding Window.
 * Läuft pro Vercel-Instanz - keine Cross-Instance-Konsistenz.
 * Für einen Marketing-Site mit niedrigem Traffic ausreichend.
 *
 * Für strengere Anforderungen später auf Upstash/Vercel-KV umstellen.
 */

type Bucket = {
  timestamps: number[];
};

const buckets = new Map<string, Bucket>();

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 60 * 60 * 1000; // 1h

export function rateLimit(
  key: string,
  limit = DEFAULT_LIMIT,
  windowMs = DEFAULT_WINDOW_MS,
): { ok: boolean; remaining: number; retryAfterSec?: number } {
  const now = Date.now();
  const cutoff = now - windowMs;
  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => t > cutoff);

  if (bucket.timestamps.length >= limit) {
    const oldest = bucket.timestamps[0];
    const retryAfterSec = Math.ceil((oldest + windowMs - now) / 1000);
    buckets.set(key, bucket);
    return { ok: false, remaining: 0, retryAfterSec };
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);

  // Opportunistisches GC: alle 100 Requests alte Buckets aufräumen
  if (buckets.size > 500 && Math.random() < 0.01) {
    for (const [k, b] of buckets) {
      b.timestamps = b.timestamps.filter((t) => t > cutoff);
      if (b.timestamps.length === 0) buckets.delete(k);
    }
  }

  return { ok: true, remaining: limit - bucket.timestamps.length };
}

export function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  return `ip:${ip}`;
}
