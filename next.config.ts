import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
];

// Statische Fallback-Redirects (immer aktiv) — die aus dem CMS gepflegten
// werden beim Build zusätzlich geladen, sofern DATABASE_URL erreichbar ist.
const staticRedirects = [
  {
    // WordPress-Bild-URLs auf Logo umleiten, damit indexierte
    // Google-Images-Ergebnisse nicht 404 zeigen.
    source: "/wp-content/uploads/:path*",
    destination: "/images/logo/pb-fahrzeugpflege-logo-black.png",
    permanent: false,
  },
  {
    source: "/2025/11/25/:slug/",
    destination: "/blog/:slug/",
    permanent: true,
  },
];

async function cmsRedirects() {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("placeholder")) {
    return [];
  }
  try {
    // Dynamischer Import, damit next.config auch ohne Payload lauffähig bleibt.
    const { getPayload } = await import("payload");
    const config = (await import("./payload.config")).default;
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "redirects",
      limit: 200,
      depth: 0,
    });
    return res.docs.map((r: any) => ({
      source: r.from,
      destination: r.to,
      permanent: r.statusCode !== "302",
    }));
  } catch (err) {
    // Bei Build ohne DB oder Fehler: leere Liste, damit Build nicht bricht.
    console.warn("[next.config] Redirects aus DB konnten nicht geladen werden:", err);
    return [];
  }
}

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    const fromCms = await cmsRedirects();
    return [...staticRedirects, ...fromCms];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
