import type { MetadataRoute } from "next";

const SITE = "https://www.pb-fahrzeugpflege.de";

type Entry = {
  path: string;
  lastModified: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  images?: string[];
};

const pages: Entry[] = [
  {
    path: "/",
    lastModified: "2026-07-21",
    changeFrequency: "weekly",
    priority: 1.0,
    images: [
      `${SITE}/images/team/karsten-becker-thomas-paul.jpg`,
      `${SITE}/images/logo/pb-fahrzeugpflege-logo-black.png`,
    ],
  },
  {
    path: "/leistungen/keramikversiegelung/",
    lastModified: "2026-07-21",
    changeFrequency: "monthly",
    priority: 0.9,
    images: [`${SITE}/images/hero/schwarzes-auto-keramikversiegelung.jpg`],
  },
  {
    path: "/unfallschaden/",
    lastModified: "2026-07-21",
    changeFrequency: "monthly",
    priority: 0.9,
    images: [`${SITE}/images/hero/unfallschaden-werkstatt.jpg`],
  },
  { path: "/leistungen/nanoversiegelung/", lastModified: "2026-06-16", changeFrequency: "monthly", priority: 0.8 },
  { path: "/leistungen/fahrzeugaufbereitung/", lastModified: "2026-06-15", changeFrequency: "monthly", priority: 0.8 },
  { path: "/leistungen/lack-und-beulendoktor/", lastModified: "2026-06-15", changeFrequency: "monthly", priority: 0.8 },
  { path: "/leistungen/", lastModified: "2026-03-09", changeFrequency: "monthly", priority: 0.7 },
  { path: "/preise/", lastModified: "2026-06-15", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq/", lastModified: "2026-06-16", changeFrequency: "monthly", priority: 0.7 },
  {
    path: "/referenzen/",
    lastModified: "2026-06-18",
    changeFrequency: "monthly",
    priority: 0.7,
    images: [
      `${SITE}/images/urkunden/q-siegel-servicequalitaet.jpg`,
      `${SITE}/images/urkunden/brila-urkunde-keramikversiegelung.jpg`,
      `${SITE}/images/urkunden/20-jahre-buergermeister-gratulation.jpg`,
    ],
  },
  {
    path: "/ueber-uns/",
    lastModified: "2026-06-15",
    changeFrequency: "monthly",
    priority: 0.6,
    images: [`${SITE}/images/team/karsten-becker-thomas-paul.jpg`],
  },
  { path: "/kontakt/", lastModified: "2026-07-21", changeFrequency: "monthly", priority: 0.8 },
  { path: "/teilnahmebedingungen-gewinnspiel/", lastModified: "2025-09-12", changeFrequency: "yearly", priority: 0.3 },
];

const blogPosts: Entry[] = [
  { path: "/blog/", lastModified: "2025-11-25", changeFrequency: "monthly", priority: 0.6 },
  { path: "/blog/warum-neuwagen-im-rohzustand-sind-und-sofort-geschuetzt-werden-sollten/", lastModified: "2025-11-25", changeFrequency: "yearly", priority: 0.6 },
  { path: "/blog/warum-immer-mehr-kunden-aus-luxemburg-ihre-keramikversiegelung-im-saarland-durchfuehren-lassen/", lastModified: "2025-11-25", changeFrequency: "yearly", priority: 0.6 },
  { path: "/blog/die-haeufigsten-fehler-bei-billigen-keramikversiegelungen-und-wie-du-sie-erkennst/", lastModified: "2025-11-25", changeFrequency: "yearly", priority: 0.6 },
  { path: "/blog/warum-schwarze-fahrzeuge-hoechste-praezision-erfordern-und-wie-eine-professionelle-keramikversiegelung-sie-schuetzt/", lastModified: "2025-11-25", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pages, ...blogPosts].map((entry) => ({
    url: `${SITE}${entry.path}`,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    ...(entry.images ? { images: entry.images } : {}),
  }));
}
