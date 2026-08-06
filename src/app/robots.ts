import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://www.pb-fahrzeugpflege.de",
    sitemap: "https://www.pb-fahrzeugpflege.de/sitemap.xml",
  };
}
