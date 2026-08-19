import { NextResponse } from "next/server";
import { draftMode } from "next/headers";
import { getPayloadClient } from "@/lib/payload-client";

/**
 * Preview-Endpoint für Payload Live-Preview.
 * Payload-Admin lädt: /api/preview?path=/leistungen/keramikversiegelung/
 *
 * Prüft, dass der aufrufende User in Payload authentifiziert ist,
 * aktiviert dann Next-DraftMode und redirected auf die Ziel-Seite.
 * Nur aktiv in Development und Vercel-Preview-Deployments.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path") || "/";

  const isProd = process.env.VERCEL_ENV === "production";
  if (isProd) {
    return new NextResponse("Preview ist auf der Produktions-URL deaktiviert.", {
      status: 403,
    });
  }

  // Verifiziere Payload-Session
  try {
    const payload = await getPayloadClient();
    const auth = await payload.auth({ headers: req.headers as any });
    if (!auth?.user) {
      return new NextResponse("Nicht angemeldet.", { status: 401 });
    }
  } catch {
    return new NextResponse("Preview-Auth fehlgeschlagen.", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(path, req.url));
}
