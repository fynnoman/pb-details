import type { NextConfig } from "next";

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

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/9555-2/",
        destination: "/teilnahmebedingungen-gewinnspiel/",
        permanent: true,
      },
      {
        source: "/2025/11/25/:slug/",
        destination: "/blog/:slug/",
        permanent: true,
      },
      {
        source: "/datenschutz/",
        destination: "/datenschutzerklaerung/",
        permanent: true,
      },
      {
        // WordPress-Bild-URLs auf ProvenExpert-Widget-Bild umleiten,
        // damit indexierte Google-Images-Ergebnisse nicht 404 zeigen.
        // Genauere Ziel-Zuordnung erfolgt manuell für die Top-Bilder,
        // sobald FTP-Zugang der Altseite verfügbar ist.
        source: "/wp-content/uploads/:path*",
        destination: "/images/logo/pb-fahrzeugpflege-logo-black.png",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Statische Assets cachefreundlich
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
