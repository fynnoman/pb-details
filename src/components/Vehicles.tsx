"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";
import { mediaUrl } from "@/lib/media";
import type { MediaDoc } from "@/lib/media";
import EditableImage from "./edit/EditableImage";
import EditableText from "./edit/EditableText";

export type VehicleItem = {
  id: string | number;
  label: string;
  description: string;
  image: MediaDoc;
  order: number;
};

function VehicleTile({ v, i }: { v: VehicleItem; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.05, 1.18]);
  const url = mediaUrl(v.image, "card") || mediaUrl(v.image);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
      className="group relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-[#1a1814] via-[#100e0a] to-black"
    >
      {url && (
        <>
          <EditableImage collection="vehicles" docId={v.id} path="image" className="absolute inset-0">
            <motion.img
              src={url}
              alt={v.image?.alt || v.label}
              style={{ y, scale }}
              className="absolute inset-0 w-full h-full object-cover will-change-transform group-hover:brightness-110 transition-[filter] duration-700"
              loading="lazy"
            />
          </EditableImage>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </>
      )}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-2">
          {String(i + 1).padStart(2, "0")}
        </div>
        <h3 className="font-display text-2xl sm:text-3xl leading-tight tracking-[-0.02em]">
          <EditableText collection="vehicles" docId={v.id} path="label" value={v.label} />
        </h3>
        <p className="mt-3 text-sm text-[var(--ink-dim)] leading-relaxed max-w-xs">
          <EditableText collection="vehicles" docId={v.id} path="description" value={v.description} multiline />
        </p>
      </div>
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-[1.5rem] pointer-events-none" />
    </motion.div>
  );
}

export default function Vehicles({
  vehicles,
  home,
}: {
  vehicles: VehicleItem[];
  home?: import("@/lib/site-types").HomeData;
}) {
  const t = home?.vehicles || {};
  const kicker = t.kicker || "Spezialisierung";
  const title = t.title || "Auf welche Fahrzeuge wir";
  const titleHighlight = t.titleHighlight || "spezialisiert sind.";
  const intro = t.intro || "Wir sind auf die Aufbereitung und den Lackschutz hochwertiger Fahrzeuge spezialisiert und betreuen ausschließlich private Kundenfahrzeuge. Jede Aufbereitung beginnt mit einer persönlichen Begutachtung – so erhalten Sie ein realistisches Angebot statt eines Pauschalversprechens.";
  return (
    <section className="relative py-20 sm:py-32 lg:py-44 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        <div className="grid grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                <EditableText globalSlug="home" path="vehicles.kicker" value={kicker} />
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02] tracking-[-0.025em]">
                <EditableText
                  globalSlug="home"
                  path="vehicles.title"
                  value={title}
                  render={(v) => (
                    <>
                      {v} <span className="italic text-gold">{titleHighlight}</span>
                    </>
                  )}
                />
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:pt-16">
            <Reveal delay={0.1}>
              <p className="text-[var(--ink-dim)] leading-relaxed">
                <EditableText globalSlug="home" path="vehicles.intro" value={intro} multiline />
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {vehicles.map((v, i) => (
            <VehicleTile key={String(v.id)} v={v} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
