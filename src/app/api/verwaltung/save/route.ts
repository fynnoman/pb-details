import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload-client";

/**
 * Speichert den kompletten Editor-Zustand ab. Bekommt das Passwort im
 * Body mit; validiert es gegen ENV; splittet die Daten in Global-Updates
 * und Collection-Doc-Updates.
 *
 * Body:
 *   {
 *     password: string,
 *     globals: { home?: {...}, settings?: {...}, footer?: {...}, navigation?: {...} },
 *     docs: [ { collection: "services", id, data: {...} }, ... ]
 *   }
 */
export async function POST(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PASSWORD nicht gesetzt." },
      { status: 500 },
    );
  }

  let body: {
    password?: string;
    globals?: Record<string, any>;
    docs?: Array<{ collection: string; id: string | number; data: any }>;
  };
  try {
    body = (await req.json()) as any;
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (body.password !== expected) {
    return NextResponse.json({ ok: false, error: "Passwort falsch." }, { status: 401 });
  }

  const payload = await getPayloadClient();
  const errors: string[] = [];

  // Globals
  const allowedGlobals = new Set(["home", "settings", "footer", "navigation"]);
  for (const [slug, data] of Object.entries(body.globals || {})) {
    if (!allowedGlobals.has(slug)) continue;
    try {
      await payload.updateGlobal({ slug: slug as any, data, overrideAccess: true });
    } catch (err) {
      errors.push(`global ${slug}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // Docs
  const allowedCollections = new Set([
    "services",
    "vehicles",
    "awards",
    "blog-posts",
    "faqs",
    "pages",
  ]);
  for (const d of body.docs || []) {
    if (!allowedCollections.has(d.collection)) continue;
    try {
      await payload.update({
        collection: d.collection as any,
        id: d.id as any,
        data: d.data,
        overrideAccess: true,
      });
    } catch (err) {
      errors.push(
        `${d.collection}#${d.id}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: errors.join(" · "), errors },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
