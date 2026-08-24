import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload-client";

/**
 * Liefert einen Snapshot aller editierbaren Inhalte fürs Editor-Formular.
 * Kein Passwort nötig (Read-only, gleiche Daten wie das public Frontend
 * ohnehin ausliefert), aber Draft-Content wird nicht ausgeliefert.
 */
export async function GET() {
  const payload = await getPayloadClient();
  const [home, settings, footer, navigation, services, vehicles, awards, faqs, posts, pages] =
    await Promise.all([
      payload.findGlobal({ slug: "home", depth: 2 }),
      payload.findGlobal({ slug: "settings", depth: 1 }),
      payload.findGlobal({ slug: "footer", depth: 0 }),
      payload.findGlobal({ slug: "navigation", depth: 0 }),
      payload.find({ collection: "services", limit: 20, depth: 1, sort: "order" }),
      payload.find({ collection: "vehicles", limit: 20, depth: 1, sort: "order" }),
      payload.find({ collection: "awards", limit: 50, depth: 1, sort: "order" }),
      payload.find({ collection: "faqs", limit: 100, depth: 0, sort: "topic" }),
      payload.find({ collection: "blog-posts", limit: 50, depth: 1, sort: "-publishedAt" }),
      payload.find({ collection: "pages", limit: 30, depth: 0, sort: "path" }),
    ]);
  return NextResponse.json({
    home,
    settings,
    footer,
    navigation,
    services: services.docs,
    vehicles: vehicles.docs,
    awards: awards.docs,
    faqs: faqs.docs,
    posts: posts.docs,
    pages: pages.docs,
  });
}
