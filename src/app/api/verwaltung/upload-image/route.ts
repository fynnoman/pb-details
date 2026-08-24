import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload-client";

/**
 * Bild-Upload für den einfachen Verwaltungs-Editor.
 * FormData: password, file, [alt]
 * Response: { url, id, filename }
 */
export async function POST(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PASSWORD nicht gesetzt." },
      { status: 500 },
    );
  }

  try {
    const form = await req.formData();
    const password = String(form.get("password") || "");
    if (password !== expected) {
      return NextResponse.json({ ok: false, error: "Passwort falsch." }, { status: 401 });
    }

    const file = form.get("file");
    const alt = String(form.get("alt") || "Bild");
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "Kein File." }, { status: 400 });
    }

    const payload = await getPayloadClient();
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
      overrideAccess: true,
    });

    return NextResponse.json({
      ok: true,
      id: created.id,
      url: (created as any).url,
      filename: (created as any).filename,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
