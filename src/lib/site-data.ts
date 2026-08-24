import "server-only";
import { getPayloadClient } from "./payload-client";
import type {
  SiteSettings,
  NavigationData,
  FooterData,
  HomeData,
} from "./site-types";

/**
 * Server-only Loader für Payload-Daten. Die passenden Types leben in
 * ./site-types (client-safe) und die Media-Helfer in ./media.
 */

export async function loadSettings(): Promise<SiteSettings> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "settings", depth: 1 }) as unknown as SiteSettings;
}

export async function loadNavigation(): Promise<NavigationData> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "navigation", depth: 0 }) as unknown as NavigationData;
}

export async function loadFooter(): Promise<FooterData> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "footer", depth: 0 }) as unknown as FooterData;
}

export async function loadHomeGlobal(opts: { draft?: boolean } = {}): Promise<HomeData> {
  const payload = await getPayloadClient();
  return payload.findGlobal({
    slug: "home",
    depth: 2,
    draft: opts.draft,
  }) as unknown as HomeData;
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
    heroImage: import("./media").MediaDoc;
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
    image: import("./media").MediaDoc;
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
    image: import("./media").MediaDoc;
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
    overrideAccess: opts.draft ?? false,
  });
  return (res.docs[0] as any) || null;
}
