import type { NextConfig } from "next";

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
};

export default nextConfig;
