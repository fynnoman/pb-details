import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getPayloadClient } from "@/lib/payload-client";

/**
 * Update eines einzelnen Feldes in einem Dokument einer Collection.
 * Body: { collection: string; id: string|number; changes: Record<string,any> }
 */
export async function POST(req: Request) {
  const payload = await getPayloadClient();
  const auth = await payload.auth({ headers: (await headers()) as any });
  if (!auth?.user) {
    return NextResponse.json({ ok: false, error: "Nicht angemeldet." }, { status: 401 });
  }

  let body: { collection?: string; id?: string | number; changes?: Record<string, unknown> };
  try {
    body = (await req.json()) as any;
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { collection, id, changes } = body;
  if (!collection || id === undefined || !changes) {
    return NextResponse.json(
      { ok: false, error: "collection + id + changes erforderlich." },
      { status: 400 },
    );
  }

  const allowed = new Set(["services", "vehicles", "awards", "blog-posts", "faqs"]);
  if (!allowed.has(collection)) {
    return NextResponse.json(
      { ok: false, error: `Collection "${collection}" nicht erlaubt.` },
      { status: 403 },
    );
  }

  try {
    const updated = await payload.update({
      collection: collection as any,
      id: id as any,
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
