import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import { posts } from "@/lib/blog";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Blog – Fahrzeugpflege & Keramikversiegelung" },
  description:
    "Fachbeiträge rund um Keramikversiegelung, Lackschutz und Fahrzeugaufbereitung – aus über 29 Jahren Praxis bei PB Fahrzeugpflege Saarlouis.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  const webPage = webPageSchema({
    path: "/blog/",
    name: "Blog – Fahrzeugpflege & Keramikversiegelung",
    description:
      "Fachbeiträge rund um Keramikversiegelung, Lackschutz und Fahrzeugaufbereitung.",
    breadcrumb: breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog/" },
    ]),
  });
  return (
    <main className="relative">
      <JsonLd data={webPage} />
      <PageHero
        kicker="Fachwissen aus der Praxis"
        title="Blog"
        subtitle="Was wir aus über 29 Jahren Fahrzeugaufbereitung gelernt haben – konkret, ehrlich und praxisnah."
      />

      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
          <div className="space-y-6">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="glass rounded-[1.5rem] p-8 sm:p-10 block group hover:ring-1 hover:ring-[var(--gold)]/30 transition"
                >
                  <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                    {post.publishedAt}
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl leading-snug tracking-[-0.015em] group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-5 text-[var(--ink-dim)] leading-relaxed">
                    {post.intro}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--ink-dim)] group-hover:text-[var(--gold)] transition-colors">
                    Weiterlesen
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Fragen zu Ihrem{" "}
            <span className="italic text-gold">Fahrzeug?</span>
          </>
        }
        text="Was hier im Blog steht, sind Erfahrungen aus der Werkstatt. Für Ihr konkretes Fahrzeug schauen wir es uns am besten direkt an – ohne Termin, während unserer Öffnungszeiten."
      />
    </main>
  );
}
