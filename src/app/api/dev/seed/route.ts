import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getPayloadClient } from "@/lib/payload-client";
import { runSeed } from "../../../../../scripts/seed";

/**
 * Dev-only Endpoint: startet den kompletten Seed aus dem Next-Runtime.
 * Umgeht den `payload run` CLI-Bug unter aktuellem Node/tsx.
 *
 * Aufruf: http://localhost:3000/api/dev/seed
 * Nur zugänglich, wenn ein Payload-User eingeloggt ist. Blockt in Prod.
 */
export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
    return new NextResponse("Nur in Development erlaubt.", { status: 403 });
  }

  const payload = await getPayloadClient();
  // Auth-Check nur wenn nicht auf localhost (Dev-Bequemlichkeit)
  const host = req.headers.get("host") || "";
  if (!host.startsWith("localhost")) {
    const auth = await payload.auth({ headers: (await headers()) as any });
    if (!auth?.user) {
      return NextResponse.json(
        { ok: false, error: "Bitte zuerst unter /admin einloggen." },
        { status: 401 },
      );
    }
  }

  try {
    console.log("\n[seed] Starte Seed via Next-Runtime …");
    await runSeed(payload);
    return NextResponse.json({
      ok: true,
      message:
        "Seed erfolgreich ausgeführt — Medien, Globals, Services, Vehicles, Awards, FAQs, Blog, Pages, Redirects befüllt.",
    });
  } catch (err) {
    console.error("[seed] Fehler:", err);
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined,
      },
      { status: 500 },
    );
  }
}
