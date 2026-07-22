"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const vehicles = [
  {
    label: "Neuwagen",
    desc: "Lackschutz ab dem ersten Kilometer — bevor Flugrost, Insektenreste und Waschkratzer den empfindlichen Klarlack erreichen.",
    image:
      "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=1400&q=85&auto=format&fit=crop",
  },
  {
    label: "Sportwagen & Luxus",
    desc: "Kompromisslose Aufbereitung und Werterhalt mit dem nötigen Fingerspitzengefühl.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=85&auto=format&fit=crop",
  },
  {
    label: "Oldtimer",
    desc: "Sammlerfahrzeuge in bester Hand — Werterhalt für Generationen.",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1400&q=85&auto=format&fit=crop",
  },
  {
    label: "Leasingrückgabe",
    desc: "Gezielte Aufbereitung, die sichtbare Mängel reduziert und teure Nachberechnungen vermeidet.",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1400&q=85&auto=format&fit=crop",
  },
];

function VehicleTile({ v, i }: { v: (typeof vehicles)[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.05, 1.18]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
      className="group relative aspect-[4/5] rounded-[1.5rem] overflow-hidden"
    >
      <motion.img
        src={v.image}
        alt={v.label}
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full object-cover will-change-transform group-hover:brightness-110 transition-[filter] duration-700"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-2">
          {String(i + 1).padStart(2, "0")}
        </div>
        <h3 className="font-display text-2xl sm:text-3xl leading-tight tracking-[-0.02em]">
          {v.label}
        </h3>
        <p className="mt-3 text-sm text-[var(--ink-dim)] leading-relaxed max-w-xs">
          {v.desc}
        </p>
      </div>
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-[1.5rem] pointer-events-none" />
    </motion.div>
  );
}

export default function Vehicles() {
  return (
    <section className="relative py-32 sm:py-44 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                Spezialisierung
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02] tracking-[-0.025em]">
                Auf welche Fahrzeuge wir <span className="italic text-gold">spezialisiert</span> sind.
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:pt-16">
            <Reveal delay={0.1}>
              <p className="text-[var(--ink-dim)] leading-relaxed">
                Wir betreuen ausschließlich private Kundenfahrzeuge. Jede
                Aufbereitung beginnt mit einer persönlichen Begutachtung — so
                erhalten Sie ein realistisches Angebot statt eines
                Pauschalversprechens.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {vehicles.map((v, i) => (
            <VehicleTile key={v.label} v={v} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
