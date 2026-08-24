import { NextResponse } from "next/server";

/**
 * Login-Check via Passwort aus ENV `ADMIN_PASSWORD`.
 * POST { password: string } → 200 wenn korrekt, 401 sonst.
 */
export async function POST(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "ADMIN_PASSWORD ist nicht in der Server-Umgebung gesetzt. Bitte in .env.local oder Vercel-Env eintragen.",
      },
      { status: 500 },
    );
  }
  let body: { password?: string };
  try {
    body = (await req.json()) as any;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (body.password === expected) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
