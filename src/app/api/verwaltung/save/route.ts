import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPayloadClient } from "@/lib/payload-client";

/**
 * Speichert nur die tatsaechlich geaenderten Inhalte. Globals + Docs
 * werden parallel geschrieben, damit wir nicht in die Vercel-Timeouts
 * laufen (Neon Postgres schafft die parallelen Writes locker).
 *
 * Body:
 *   {
 *     password: string,
 *     globals: { home?: {...}, settings?: {...}, footer?: {...}, navigation?: {...} },
 *     docs: [ { collection: "services", id, data: {...} }, ... ]
 *   }
 */
export const maxDuration = 60;

export async function POST(req: Request) {
  const t0 = Date.now();
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
  const timings: Record<string, number> = {};

  const allowedGlobals = new Set(["home", "settings", "footer", "navigation"]);
  const allowedCollections = new Set([
    "services",
    "vehicles",
    "awards",
    "blog-posts",
    "faqs",
    "pages",
  ]);

  const globalJobs = Object.entries(body.globals || {})
    .filter(([slug]) => allowedGlobals.has(slug))
    .map(async ([slug, data]) => {
      const start = Date.now();
      try {
        await payload.updateGlobal({ slug: slug as any, data, overrideAccess: true });
        timings[`global:${slug}`] = Date.now() - start;
      } catch (err) {
        errors.push(`global ${slug}: ${err instanceof Error ? err.message : String(err)}`);
      }
    });

  const docJobs = (body.docs || [])
    .filter((d) => allowedCollections.has(d.collection))
    .map(async (d) => {
      const start = Date.now();
      try {
        await payload.update({
          collection: d.collection as any,
          id: d.id as any,
          data: d.data,
          overrideAccess: true,
        });
        timings[`${d.collection}#${d.id}`] = Date.now() - start;
      } catch (err) {
        errors.push(
          `${d.collection}#${d.id}: ${err instanceof Error ? err.message : String(err)}`,
        );
      }
    });

  await Promise.all([...globalJobs, ...docJobs]);

  // Nach dem Save alle Frontend-Seiten invalidieren, damit Next.js
  // das statische Rendering neu triggert und Aenderungen sofort live
  // sind. "layout" hebelt den gesamten (frontend)-Baum aus.
  try {
    revalidatePath("/", "layout");
  } catch (err) {
    console.warn("[verwaltung/save] revalidate warn:", err);
  }

  const totalMs = Date.now() - t0;
  // eslint-disable-next-line no-console
  console.log("[verwaltung/save]", {
    totalMs,
    docsWritten: docJobs.length,
    globalsWritten: globalJobs.length,
    slowest: Object.entries(timings)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5),
    errors: errors.length,
  });

  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: errors.join(" · "), errors, ms: totalMs },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true, ms: totalMs });
}
