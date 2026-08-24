import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Wenn MAINTENANCE_MODE="true" (oder "1") gesetzt ist, alle öffentlichen
 * Requests auf /maintenance/ umleiten. Ausnahmen:
 *   - /verwaltung/*  (Kunde soll weiter bearbeiten können)
 *   - /admin/*       (Payload)
 *   - /api/*         (Backend)
 *   - /media/*, /images/*, /_next/*, /favicon.*  (statische Assets)
 *   - /maintenance/  (die Umbauseite selbst)
 */
export function middleware(req: NextRequest) {
  const on = process.env.MAINTENANCE_MODE;
  if (on !== "true" && on !== "1") return NextResponse.next();

  const { pathname } = req.nextUrl;
  const passThrough =
    pathname.startsWith("/verwaltung") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/media") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/_next") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/maintenance") ||
    // Pflichtangaben müssen auch während der Umbauphase erreichbar bleiben
    pathname.startsWith("/impressum") ||
    pathname.startsWith("/datenschutzerklaerung") ||
    pathname.startsWith("/allgemeine-geschaeftsbedingungen");
  if (passThrough) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/maintenance/";
  return NextResponse.rewrite(url);
}

export const config = {
  // Match everything except Next internals and files with extensions in /public.
  matcher: ["/((?!_next/static|_next/image).*)"],
};
