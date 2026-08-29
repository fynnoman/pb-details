import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import LexicalRenderer from "@/components/LexicalRenderer";
import JsonLd from "@/components/JsonLd";
import { articleSchema, breadcrumbList, webPageSchema } from "@/lib/schema";
import { getPayloadClient } from "@/lib/payload-client";
import { mediaUrl } from "@/lib/media";
import type { MediaDoc } from "@/lib/media";

type Params = { slug: string };

type BlogPostDoc = {
  id: string | number;
  slug: string;
  title: string;
  intro: string;
  content?: any;
  heroImage?: MediaDoc;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: MediaDoc;
  cta?: { label?: string; href?: string };
};

async function loadPost(slug: string, draft = false): Promise<BlogPostDoc | null> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "blog-posts",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
    draft,
    overrideAccess: draft,
  });
  return (res.docs[0] as unknown as BlogPostDoc) || null;
}

export async function generateStaticParams(): Promise<Params[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({ collection: "blog-posts", depth: 0, limit: 100 });
  return res.docs.map((d: any) => ({ slug: d.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}/`;
  return {
    title: { absolute: post.metaTitle || post.title },
    description: post.metaDescription || post.intro,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.intro,
      type: "article",
      publishedTime: post.publishedAt,
      url,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { draftMode } = await import("next/headers");
  const { isEnabled: draft } = await draftMode();
  const { slug } = await params;
  const post = await loadPost(slug, draft);
  if (!post) notFound();

  const payload = await getPayloadClient();
  const otherRes = await payload.find({
    collection: "blog-posts",
    where: { slug: { not_equals: post.slug } },
    sort: "-publishedAt",
    depth: 0,
    limit: 3,
  });
  const otherPosts = otherRes.docs as unknown as BlogPostDoc[];

  const path = `/blog/${post.slug}/`;
  const dateLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  const webPage = webPageSchema({
    path,
    name: post.title,
    description: post.metaDescription || post.intro,
    datePublished: post.publishedAt,
    breadcrumb: breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog/" },
      { name: post.title, path },
    ]),
  });
  const article = articleSchema({
    headline: post.title,
    description: post.metaDescription || post.intro,
    path,
    datePublished: post.publishedAt,
  });

  const heroBg = mediaUrl(post.heroImage, "hero");
  return (
    <main className="relative">
      <JsonLd data={[webPage, article]} />
      <PageHero
        kicker={
          <>
            <Link href="/blog/" className="hover:text-[var(--ink)] transition-colors">
              Blog
            </Link>
            {dateLabel && <> · {dateLabel}</>}
          </>
        }
        title={post.title}
        {...(heroBg ? { backgroundImage: heroBg } : {})}
      />

      <article className="relative pb-24 sm:pb-32 pt-16">
        <div className="mx-auto max-w-[720px] px-4 sm:px-8 lg:px-10 space-y-6 text-[var(--ink-dim)] leading-relaxed text-base sm:text-lg">
          <Reveal>
            <p className="text-[var(--ink)]">{post.intro}</p>
          </Reveal>
          <LexicalRenderer data={post.content} />
          {post.cta?.href && (
            <Reveal delay={0.3}>
              <div className="pt-8">
                <Link href={post.cta.href} className="btn-gold">
                  {post.cta.label || "Mehr erfahren"}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </article>

      {otherPosts.length > 0 && (
        <section className="relative py-16 border-t border-white/5">
          <div className="mx-auto max-w-[1000px] px-4 sm:px-8 lg:px-10">
            <Reveal>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-8">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                Weitere Beiträge
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherPosts.map((p, i) => {
                const label = p.publishedAt
                  ? new Date(p.publishedAt).toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "";
                return (
                  <Reveal key={String(p.id)} delay={i * 0.05}>
                    <Link
                      href={`/blog/${p.slug}/`}
                      className="glass-flat rounded-2xl p-6 h-full block group hover:ring-1 hover:ring-[var(--gold)]/30 transition"
                    >
                      {label && (
                        <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-3">
                          {label}
                        </div>
                      )}
                      <h3 className="font-display text-lg leading-snug tracking-[-0.015em] group-hover:text-gold transition-colors">
                        {p.title}
                      </h3>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CtaSection
        title={<>Ihr Fahrzeug <span className="italic text-gold">verdient mehr.</span></>}
        text="Wir schauen uns Ihr Fahrzeug an, sagen ehrlich, was sinnvoll ist, und erstellen ein transparentes Angebot – ganz ohne Termin."
      />
    </main>
  );
}
