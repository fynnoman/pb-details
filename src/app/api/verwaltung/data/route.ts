import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload-client";
import { withLegalDefaults } from "@/lib/legal-defaults";

/**
 * Liefert einen Snapshot aller editierbaren Inhalte fürs Editor-Formular.
 * Kein Passwort nötig (Read-only, gleiche Daten wie das public Frontend
 * ohnehin ausliefert), aber Draft-Content wird nicht ausgeliefert.
 *
 * Wichtig: alle Media-URLs werden von `/api/media/file/...` auf `/media/...`
 * umgeschrieben, weil Payloads Serverless-Media-Endpoint auf Vercel nicht
 * greift. Public-Verzeichnis wird stattdessen als statisches CDN benutzt.
 */
function rewriteMediaUrls<T>(input: T): T {
  if (!input || typeof input !== "object") return input;
  if (Array.isArray(input)) {
    return input.map(rewriteMediaUrls) as any;
  }
  const out: any = Array.isArray(input) ? [] : {};
  for (const [k, v] of Object.entries(input as any)) {
    if (k === "url" && typeof v === "string") {
      out[k] = v
        .replace(/^https?:\/\/[^/]+/, "")
        .replace(/^\/api\/media\/file\//, "/media/");
    } else if (v && typeof v === "object") {
      out[k] = rewriteMediaUrls(v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

export async function GET() {
  const payload = await getPayloadClient();
  // Defensiv: `legal` kann fehlen, solange die DB-Tabelle noch nicht
  // angelegt ist (Payload legt sie erst beim ersten Write an). Damit
  // /verwaltung/editor nicht kippt, faengt wir diesen Fall einzeln ab.
  const safeLegal = payload
    .findGlobal({ slug: "legal", depth: 0 })
    .catch((err: unknown) => {
      console.warn(
        "[api/verwaltung/data] legal-Global nicht verfuegbar, nutze leeren Fallback:",
        err instanceof Error ? err.message : err,
      );
      return {} as any;
    });
  const [home, settings, footer, navigation, legal, services, vehicles, awards, faqs, posts, pages] =
    await Promise.all([
      payload.findGlobal({ slug: "home", depth: 2 }),
      payload.findGlobal({ slug: "settings", depth: 1 }),
      payload.findGlobal({ slug: "footer", depth: 0 }),
      payload.findGlobal({ slug: "navigation", depth: 0 }),
      safeLegal,
      payload.find({ collection: "services", limit: 20, depth: 1, sort: "order" }),
      payload.find({ collection: "vehicles", limit: 20, depth: 1, sort: "order" }),
      payload.find({ collection: "awards", limit: 50, depth: 1, sort: "order" }),
      payload.find({ collection: "faqs", limit: 100, depth: 0, sort: "topic" }),
      payload.find({ collection: "blog-posts", limit: 50, depth: 1, sort: "-publishedAt" }),
      payload.find({ collection: "pages", limit: 30, depth: 0, sort: "path" }),
    ]);
  // Rechtstexte mit aktuellen Vorlagen anreichern, damit Karsten im
  // Editor die bestehende Fassung sieht und direkt bearbeiten kann.
  // Sobald ein Tab bereits eigene Sections in der DB hat, bleibt der
  // Tab unangetastet.
  const legalWithDefaults = withLegalDefaults(legal as any, settings as any);

  return NextResponse.json(
    rewriteMediaUrls({
      home,
      settings,
      footer,
      navigation,
      legal: legalWithDefaults,
      services: services.docs,
      vehicles: vehicles.docs,
      awards: awards.docs,
      faqs: faqs.docs,
      posts: posts.docs,
      pages: pages.docs,
    }),
  );
}
