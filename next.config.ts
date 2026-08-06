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
    ];
  },
};

export default nextConfig;
