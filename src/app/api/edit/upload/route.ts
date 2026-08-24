import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getPayloadClient } from "@/lib/payload-client";

/**
 * Upload-Endpoint: nimmt eine Datei entgegen, legt sie in der media-Collection
 * an und gibt die neue ID zurück. Der Aufrufer schreibt die ID danach via
 * update-global in das entsprechende Feld.
 */
export async function POST(req: Request) {
  const payload = await getPayloadClient();
  const auth = await payload.auth({ headers: (await headers()) as any });
  if (!auth?.user) {
    return NextResponse.json({ ok: false, error: "Nicht angemeldet." }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    const alt = String(form.get("alt") || "Bild");
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "Kein File." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const created = await payload.create({
      collection: "media",
      data: { alt },
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
      user: auth.user,
    });

    return NextResponse.json({ ok: true, id: created.id, filename: (created as any).filename });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
