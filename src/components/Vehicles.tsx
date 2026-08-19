"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const vehicles = [
  {
    label: "Neuwagen",
    desc: "Lackschutz ab dem ersten Kilometer durch eine Keramikversiegelung, bevor Flugrost, Insektenreste und Waschkratzer den empfindlichen Klarlack erreichen.",
    image: "/images/fahrzeuge/roter-tesla-model-3-aufbereitung.jpg",
  },
  {
    label: "Sportwagen & Luxus",
    desc: "Kompromisslose Aufbereitung und Werterhalt mit dem nötigen Fingerspitzengefühl – für Fahrzeuge, deren Wert und Erscheinungsbild zählen.",
    image: "/images/hero/schwarzes-auto-keramikversiegelung.jpg",
  },
  {
    label: "Oldtimer",
    desc: "Sammlerfahrzeuge in bester Hand – Werterhalt für Generationen, mit Fingerspitzengefühl und Erfahrung.",
    image: "/images/fahrzeuge/oldtimer-mercedes-300sl-werkstatt.jpg",
  },
  {
    label: "Gebrauchtwagen",
    desc: "Vor Leasingrückgabe oder Verkauf – gezielte Aufbereitung, die sichtbare Mängel reduziert und teure Nachberechnungen vermeidet.",
    image: "/images/fahrzeuge/gebrauchtwagen-autohaus.jpg",
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
      className="group relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-[#1a1814] via-[#100e0a] to-black"
    >
      {v.image ? (
        <>
          <motion.img
            src={v.image}
            alt={v.label}
            style={{ y, scale }}
            className="absolute inset-0 w-full h-full object-cover will-change-transform group-hover:brightness-110 transition-[filter] duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </>
      ) : (
        <>
          {/* Text-Card ohne Foto: subtile gold-radiale Textur */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(600px 400px at 30% 20%, rgba(212,180,131,0.16), transparent 55%), radial-gradient(500px 400px at 80% 90%, rgba(245,226,184,0.08), transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.5) 100%)",
            }}
          />
          <div className="absolute inset-0 flex items-start justify-center pt-16">
            <div className="font-display italic text-[clamp(2.5rem,5.5vw,4.5rem)] leading-none text-chrome opacity-70 select-none pointer-events-none tracking-tighter">
              {v.label.split(" ")[0]}
            </div>
          </div>
        </>
      )}
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
                Wir sind auf die Aufbereitung und den Lackschutz hochwertiger
                Fahrzeuge spezialisiert und betreuen ausschließlich private
                Kundenfahrzeuge. Jede Aufbereitung beginnt mit einer
                persönlichen Begutachtung – so erhalten Sie ein realistisches
                Angebot statt eines Pauschalversprechens.
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
