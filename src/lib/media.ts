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

export function mediaUrl(m?: MediaDoc | string | null, size?: string): string | undefined {
  if (!m || typeof m === "string") return undefined;
  if (size && m.sizes?.[size]?.url) return m.sizes[size].url;
  return m.url;
}

export function mediaAlt(m?: MediaDoc | string | null, fallback = ""): string {
  if (!m || typeof m === "string") return fallback;
  return m.alt || fallback;
}
