import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import type { Metadata } from "next";
import SectionRenderer from "./SectionRenderer";
import JsonLd from "./JsonLd";
import { breadcrumbList, webPageSchema } from "@/lib/schema";
import { loadPageByPath } from "@/lib/site-data";
import { mediaUrl } from "@/lib/media";

export async function pageMetadata(path: string, fallbackTitle: string): Promise<Metadata> {
  const page = await loadPageByPath(path);
  if (!page) return { title: { absolute: fallbackTitle } };
  return {
    title: { absolute: page.metaTitle || page.title || fallbackTitle },
    description: page.metaDescription,
    alternates: { canonical: path },
    robots: page.noindex ? { index: false, follow: false } : undefined,
    openGraph: page.ogImage
      ? {
          images: [{ url: mediaUrl(page.ogImage) || "" }],
        }
      : undefined,
  };
}

export default async function CmsPage({
  path,
  breadcrumb,
}: {
  path: string;
  breadcrumb?: Array<{ name: string; path: string }>;
}) {
  const { isEnabled: draft } = await draftMode();
  const page = await loadPageByPath(path, { draft });
  if (!page) notFound();

  const webPage = webPageSchema({
    path,
    name: page.metaTitle || page.title,
    description: page.metaDescription,
    breadcrumb: breadcrumbList(breadcrumb || [
      { name: "Home", path: "/" },
      { name: page.title, path },
    ]),
  });

  return (
    <main className="relative">
      <JsonLd data={webPage} />
      <SectionRenderer sections={page.sections} />
    </main>
  );
}
