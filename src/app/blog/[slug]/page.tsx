import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import { getPost, posts } from "@/lib/blog";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}/`;
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedIso,
      url,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="relative">
      <PageHero
        kicker={
          <>
            <Link
              href="/blog/"
              className="hover:text-[var(--ink)] transition-colors"
            >
              Blog
            </Link>{" "}
            · {post.publishedAt}
          </>
        }
        title={post.title}
      />

      <article className="relative pb-24 sm:pb-32">
        <div className="mx-auto max-w-[720px] px-6 sm:px-10 space-y-6 text-[var(--ink-dim)] leading-relaxed text-base sm:text-lg">
          <Reveal>
            <p className="text-[var(--ink)]">{post.intro}</p>
          </Reveal>
          {post.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.05 + i * 0.02}>
              <p>{p}</p>
            </Reveal>
          ))}

          {post.cta && (
            <Reveal delay={0.3}>
              <div className="pt-8">
                <Link href={post.cta.href} className="btn-gold">
                  {post.cta.label}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </article>

      {/* Andere Beiträge */}
      <section className="relative py-16 border-t border-white/5">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
          <Reveal>
            <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-8">
              <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
              Weitere Beiträge
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts
              .filter((p) => p.slug !== post.slug)
              .map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <Link
                    href={`/blog/${p.slug}/`}
                    className="glass-flat rounded-2xl p-6 h-full block group hover:ring-1 hover:ring-[var(--gold)]/30 transition"
                  >
                    <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-3">
                      {p.publishedAt}
                    </div>
                    <h3 className="font-display text-lg leading-snug tracking-[-0.015em] group-hover:text-gold transition-colors">
                      {p.title}
                    </h3>
                  </Link>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Ihr Fahrzeug{" "}
            <span className="italic text-gold">verdient mehr.</span>
          </>
        }
        text="Wir schauen uns Ihr Fahrzeug an, sagen ehrlich, was sinnvoll ist, und erstellen ein transparentes Angebot – ganz ohne Termin."
      />
    </main>
  );
}
