import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getPayloadClient } from "@/lib/payload-client";

/**
 * Auth-geschützter Endpoint zum Aktualisieren einzelner Felder eines Globals.
 * Body: { slug: string; changes: Record<string, any> }
 *   - `slug` ist z. B. "home", "settings", "footer", "navigation"
 *   - `changes` ist ein flaches oder verschachteltes Objekt mit den Änderungen
 *     (wird als Partial in payload.updateGlobal gefüttert)
 */
export async function POST(req: Request) {
  const payload = await getPayloadClient();
  const auth = await payload.auth({ headers: (await headers()) as any });
  if (!auth?.user) {
    return NextResponse.json({ ok: false, error: "Nicht angemeldet." }, { status: 401 });
  }

  let body: { slug?: string; changes?: Record<string, unknown> };
  try {
    body = (await req.json()) as any;
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { slug, changes } = body;
  if (!slug || typeof slug !== "string" || !changes || typeof changes !== "object") {
    return NextResponse.json({ ok: false, error: "slug + changes erforderlich." }, { status: 400 });
  }

  const allowedSlugs = new Set(["home", "settings", "footer", "navigation"]);
  if (!allowedSlugs.has(slug)) {
    return NextResponse.json({ ok: false, error: `Global "${slug}" nicht erlaubt.` }, { status: 403 });
  }

  try {
    const updated = await payload.updateGlobal({
      slug: slug as any,
      data: changes as any,
      overrideAccess: false,
      user: auth.user,
    });
    return NextResponse.json({ ok: true, updated });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
