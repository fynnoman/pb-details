import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList, webPageSchema } from "@/lib/schema";
import { getPayloadClient } from "@/lib/payload-client";
import { mediaUrl } from "@/lib/media";
import type { MediaDoc } from "@/lib/media";

export const metadata: Metadata = {
  title: { absolute: "Leistungen - PB Fahrzeugpflege Saarlouis" },
  description:
    "Alle Leistungen von PB Fahrzeugpflege Saarlouis auf einen Blick: Keramikversiegelung, Nanoversiegelung, Fahrzeugaufbereitung, Lack- & Beulendoktor sowie Unfallschaden-Abwicklung im Saarland und in Luxemburg.",
  alternates: { canonical: "/leistungen/" },
};

type ServiceListItem = {
  id: string | number;
  slug: string;
  title: string;
  intro: string;
  tagline?: string;
  heroImage?: MediaDoc;
  order: number;
};

export default async function LeistungenPage() {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "services",
    sort: "order",
    depth: 1,
    limit: 20,
  });
  const services = res.docs as unknown as ServiceListItem[];

  const webPage = webPageSchema({
    path: "/leistungen/",
    name: "Leistungen - PB Fahrzeugpflege Saarlouis",
    description:
      "Keramikversiegelung, Nanoversiegelung, Fahrzeugaufbereitung, Lack- & Beulendoktor sowie Unfallschaden-Abwicklung im Saarland & Luxemburg.",
    breadcrumb: breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Leistungen", path: "/leistungen/" },
    ]),
  });

  return (
    <main className="relative">
      <JsonLd data={webPage} />
      <PageHero
        kicker="Leistungen"
        title={<>Alles rund um Lackschutz, Aufbereitung und Schadenbehebung — <span className="italic text-gold">aus einer Hand.</span></>}
        subtitle="Seit 1997 spezialisiert auf hochwertige Fahrzeugaufbereitung, Keramikversiegelung, Smart Repair und Unfallschaden-Abwicklung im Saarland und in Luxemburg."
      />

      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {services.map((s, i) => {
              const href =
                s.slug === "unfallschaden"
                  ? "/unfallschaden/"
                  : `/leistungen/${s.slug}/`;
              const img = mediaUrl(s.heroImage, "card") || mediaUrl(s.heroImage);
              const tag = String(i + 1).padStart(2, "0");
              return (
                <Reveal key={String(s.id)} delay={i * 0.05}>
                  <Link
                    href={href}
                    className="group block glass rounded-[1.5rem] overflow-hidden hover:ring-1 hover:ring-[var(--gold)]/40 transition-all"
                  >
                    {img && (
                      <div className="relative aspect-[16/10] overflow-hidden bg-black">
                        <img
                          src={img}
                          alt={s.heroImage?.alt || s.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-5 left-5 glass rounded-full px-3 py-1 text-[10px] tracking-[0.32em] uppercase">
                          {tag} / Leistung
                        </div>
                      </div>
                    )}
                    <div className="p-6 sm:p-8">
                      <h2 className="font-display text-2xl sm:text-3xl leading-tight tracking-[-0.015em] mb-3">
                        {s.title}
                      </h2>
                      {s.tagline && (
                        <p className="text-xs tracking-[0.22em] uppercase text-[var(--gold)] mb-3">
                          {s.tagline}
                        </p>
                      )}
                      <p className="text-sm text-[var(--ink-dim)] leading-relaxed">
                        {s.intro}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                        Mehr erfahren →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection
        title={<>Sprechen wir über Ihr <span className="italic text-gold">Fahrzeug.</span></>}
        text="Kommen Sie ohne Termin vorbei oder rufen Sie kurz an. Nach einer Begutachtung erhalten Sie ein transparentes Festpreis-Angebot."
      />
    </main>
  );
}
