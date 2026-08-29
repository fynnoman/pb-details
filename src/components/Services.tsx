"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { mediaUrl } from "@/lib/media";
import type { MediaDoc } from "@/lib/media";
import EditableImage from "./edit/EditableImage";
import EditableText from "./edit/EditableText";

export type ServiceItem = {
  id: string | number;
  slug: string;
  title: string;
  intro: string;
  tagline?: string;
  heroImage: MediaDoc;
  features?: Array<{ text: string }>;
  order: number;
};

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.12]);

  const isEven = index % 2 === 0;
  const tag = String(index + 1).padStart(2, "0");
  const href =
    service.slug === "unfallschaden"
      ? "/unfallschaden/"
      : `/leistungen/${service.slug}/`;
  const imageUrl = mediaUrl(service.heroImage, "card") || mediaUrl(service.heroImage);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-12 gap-6 lg:gap-16 items-center py-12 sm:py-20 lg:py-24 ${
        !isEven ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="col-span-12 lg:col-span-7">
        <Link
          href={href}
          className="block relative aspect-[16/11] rounded-[1.8rem] overflow-hidden group bg-gradient-to-br from-[#1a1814] via-[#100e0a] to-black"
        >
          {imageUrl && (
            <>
              <EditableImage collection="services" docId={service.id} path="heroImage" className="absolute inset-0">
                <motion.img
                  src={imageUrl}
                  alt={service.heroImage?.alt || service.title}
                  style={{ y, scale }}
                  className="absolute inset-0 w-full h-full object-cover will-change-transform group-hover:brightness-110 transition-[filter] duration-700"
                  loading="lazy"
                />
              </EditableImage>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/20 pointer-events-none" />
            </>
          )}
          <div className="absolute top-6 left-6 glass rounded-full px-4 py-1.5 text-[10px] tracking-[0.32em] uppercase">
            {tag} / Leistung
          </div>
        </Link>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <Reveal>
          <div className="font-display text-[10rem] leading-none text-[var(--ink)]/[0.18] absolute -translate-y-16 select-none pointer-events-none hidden lg:block">
            {tag}
          </div>
        </Reveal>
        <Reveal>
          <h3 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-[-0.02em]">
            <EditableText
              collection="services"
              docId={service.id}
              path="title"
              value={service.title}
              render={(v) => (
                <Link href={href} className="hover:text-gold transition-colors">
                  {v}
                </Link>
              )}
            />
          </h3>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 text-[var(--ink-dim)] leading-relaxed max-w-md">
            <EditableText
              collection="services"
              docId={service.id}
              path="intro"
              value={service.intro}
              multiline
            />
          </p>
        </Reveal>
        {service.features && service.features.length > 0 && (
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-2">
              {service.features.map((f, fi) => (
                <li
                  key={fi}
                  className="flex items-center gap-3 text-sm text-[var(--ink)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                  <EditableText
                    collection="services"
                    docId={service.id}
                    path={`features.${fi}.text`}
                    value={f.text}
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        )}
        <Reveal delay={0.15}>
          <Link
            href={href}
            className="mt-8 inline-flex items-center gap-2 text-sm tracking-wide text-[var(--ink-dim)] hover:text-[var(--gold)] transition-colors group"
          >
            Mehr erfahren
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

export default function Services({
  services,
  home,
}: {
  services: ServiceItem[];
  home?: import("@/lib/site-types").HomeData;
}) {
  const t = home?.services || {};
  const kicker = t.kicker || "Unsere Leistungen";
  const title = t.title || "Alles rund um Lackschutz, Aufbereitung und Schadenbehebung";
  const titleHighlight = t.titleHighlight || " — aus einer Hand.";
  const intro = t.intro || "Bei PB Fahrzeugpflege Saarlouis erhalten Sie alle Leistungen rund um Lackschutz, Aufbereitung und Schadenbehebung aus einer Hand – seit 1997 in Ensdorf bei Saarlouis.";
  return (
    <section id="leistungen" className="relative py-16 sm:py-24 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10">
        <div className="max-w-3xl mb-12 sm:mb-20">
          <Reveal>
            <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
              <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
              <EditableText globalSlug="home" path="services.kicker" value={kicker} />
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(1.9rem,8vw,4.2rem)] leading-[1.05] tracking-[-0.025em]">
              <EditableText
                globalSlug="home"
                path="services.title"
                value={title}
                render={(v) => (
                  <>
                    {v}
                    <span className="italic text-gold">{titleHighlight}</span>
                  </>
                )}
              />
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[var(--ink-dim)] leading-relaxed max-w-xl">
              <EditableText globalSlug="home" path="services.intro" value={intro} multiline />
            </p>
          </Reveal>
        </div>

        <div className="divide-y divide-white/5">
          {services.map((s, i) => (
            <ServiceCard key={String(s.id)} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
