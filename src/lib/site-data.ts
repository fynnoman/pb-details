import { getPayloadClient } from "./payload-client";

/* Types: bewusst locker gehalten — die exakten Payload-Typen liegen in
   src/payload/payload-types.ts (nach `pnpm payload:generate:types`).
   Wir referenzieren hier nur die Felder, die das Frontend braucht. */

export type MediaDoc = {
  id: string | number;
  url?: string;
  alt?: string;
  filename?: string;
  sizes?: Record<string, { url?: string; width?: number; height?: number }>;
};

export type SiteSettings = Awaited<ReturnType<typeof loadSettings>>;
export type NavigationData = Awaited<ReturnType<typeof loadNavigation>>;
export type FooterData = Awaited<ReturnType<typeof loadFooter>>;
export type HomeData = Awaited<ReturnType<typeof loadHomeGlobal>>;

export async function loadSettings() {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "settings", depth: 1 }) as unknown as {
    name: string;
    legalName?: string;
    tagline?: string;
    domain: string;
    founded?: number;
    owner?: string;
    founders?: string;
    address: { street: string; zip: string; city: string; region?: string; country?: string };
    geo?: { lat?: number; lng?: number };
    phone: { display: string; e164: string };
    fax?: string;
    email: string;
    vatId?: string;
    whatsapp?: string;
    weekdayHours?: string;
    saturdayHours?: string;
    hoursNote?: string;
    holidayNotice?: { text?: string; until?: string };
    provenExpert?: { count: number; value: number; url?: string };
    google?: { count: number; url?: string; mapsUrl?: string };
    wkdb?: { count: number; value: number; url?: string };
    recommendation: number;
    ratingScale: number;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    calendly?: { url?: string };
  };
}

export async function loadNavigation() {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "navigation", depth: 0 }) as unknown as {
    items: Array<{
      label: string;
      href: string;
      children?: Array<{ label: string; href: string }>;
    }>;
    cta: { label: string; shortLabel?: string; href: string };
  };
}

export async function loadFooter() {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "footer", depth: 0 }) as unknown as {
    intro?: string;
    motto?: string;
    legalLinks: Array<{ label: string; href: string }>;
    aiNote?: string;
  };
}

export async function loadHomeGlobal(opts: { draft?: boolean } = {}) {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "home", depth: 2, draft: opts.draft }) as unknown as {
    kicker?: string;
    title: string;
    subtitle?: string;
    backgroundImage?: MediaDoc | string;
    primaryCta?: { label?: string; href?: string };
    secondaryCta?: { label?: string; href?: string };
    whyUsHeading?: string;
    whyUsBullets?: Array<{ text: string }>;
    mottoLabel?: string;
    mottoText?: string;
    processKicker?: string;
    processHeading?: string;
    processSteps?: Array<{ title: string; description: string }>;
    processFootnote?: string;
    regionHeading?: string;
    regionText?: string;
    regionTags?: Array<{ label: string }>;
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: MediaDoc | string;
  };
}

export async function loadServicesForHome() {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "services",
    where: { showOnHome: { equals: true } },
    sort: "order",
    depth: 2,
    limit: 20,
  });
  return res.docs as unknown as Array<{
    id: string | number;
    slug: string;
    title: string;
    intro: string;
    tagline?: string;
    heroImage: MediaDoc;
    features?: Array<{ text: string }>;
    order: number;
  }>;
}

export async function loadVehicles() {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "vehicles",
    sort: "order",
    depth: 2,
    limit: 10,
  });
  return res.docs as unknown as Array<{
    id: string | number;
    label: string;
    description: string;
    image: MediaDoc;
    order: number;
  }>;
}

export async function loadAwards() {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "awards",
    sort: "order",
    depth: 2,
    limit: 50,
  });
  return res.docs as unknown as Array<{
    id: string | number;
    title: string;
    type: "badge" | "story";
    image: MediaDoc;
    storyLabel?: string;
    storyText?: string;
    order: number;
  }>;
}

export async function loadFaqsByTopic(topic: string) {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "faqs",
    where: { topic: { equals: topic } },
    sort: "order",
    depth: 0,
    limit: 50,
  });
  return res.docs as unknown as Array<{
    id: string | number;
    question: string;
    answer: string;
    order: number;
    topic: string;
  }>;
}

export async function loadPageByPath(path: string, opts: { draft?: boolean } = {}) {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "pages",
    where: { path: { equals: path } },
    depth: 3,
    limit: 1,
    draft: opts.draft,
  });
  return (res.docs[0] as any) || null;
}

/** Auflösung von Media-Feldern (kann String-ID oder Doc sein). */
export function mediaUrl(m?: MediaDoc | string | null, size?: string): string | undefined {
  if (!m || typeof m === "string") return undefined;
  if (size && m.sizes?.[size]?.url) return m.sizes[size].url;
  return m.url;
}
export function mediaAlt(m?: MediaDoc | string | null, fallback = ""): string {
  if (!m || typeof m === "string") return fallback;
  return m.alt || fallback;
}
