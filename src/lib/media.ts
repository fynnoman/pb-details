/**
 * Media-Helfer und -Typen. Bewusst OHNE Payload-Import, damit sie
 * gefahrlos aus Client-Components importiert werden können.
 */

export type MediaDoc = {
  id: string | number;
  url?: string;
  alt?: string;
  filename?: string;
  sizes?: Record<string, { url?: string; width?: number; height?: number }>;
};

/**
 * Payload's Media-URL zeigt auf einen dynamischen Endpoint `/api/media/file/…`,
 * den Vercels Serverless-Runtime nicht bedienen kann (Filesystem ist read-only).
 * Die Dateien liegen aber statisch unter `/media/…` — dahin remappen.
 */
function normalize(url?: string): string | undefined {
  if (!url) return undefined;
  return url.replace(/^https?:\/\/[^/]+/, "").replace(/^\/api\/media\/file\//, "/media/");
}

export function mediaUrl(m?: MediaDoc | string | null, size?: string): string | undefined {
  if (!m) return undefined;
  if (typeof m === "string") return normalize(m);
  if (size && m.sizes?.[size]?.url) return normalize(m.sizes[size].url);
  return normalize(m.url);
}

export function mediaAlt(m?: MediaDoc | string | null, fallback = ""): string {
  if (!m || typeof m === "string") return fallback;
  return m.alt || fallback;
}
