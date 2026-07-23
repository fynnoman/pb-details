"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Begutachtung",
    desc: "Kommen Sie während der Öffnungszeiten auch ohne Termin vorbei — wir sehen uns Ihr Fahrzeug direkt an.",
  },
  {
    n: "02",
    title: "Individuelles Angebot",
    desc: "Auf Basis von Lackzustand, Aufwand und Ihrem Ziel — Verkauf, Leasingrückgabe oder Werterhalt — erstellen wir ein transparentes Angebot.",
  },
  {
    n: "03",
    title: "Aufbereitung",
    desc: "Wir nehmen uns die nötige Zeit und arbeiten, bis das Ergebnis stimmt. Glanz oder gar nicht.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.02, 1.1]);

  return (
    <section ref={ref} className="relative py-32 sm:py-44 overflow-hidden">
      {/* Background image with strong parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=2000&q=85&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Weich ausblendende Ränder + dezente Abdunklung für Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
        <div className="absolute inset-0 bg-black/35" />
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-3xl mb-16">
          <Reveal>
            <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
              <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
              So läuft es bei uns ab
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02] tracking-[-0.025em]">
              In drei Schritten zu Ihrem <span className="italic text-gold">Ergebnis.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              className="glass rounded-[1.75rem] p-8 sm:p-10 relative overflow-hidden"
            >
              <div className="font-display text-[7rem] leading-none text-[var(--ink)]/[0.18] absolute -top-4 -right-2 select-none pointer-events-none">
                {s.n}
              </div>
              <div className="text-xs tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                Schritt {s.n}
              </div>
              <h3 className="font-display text-3xl leading-tight tracking-[-0.02em]">
                {s.title}
              </h3>
              <p className="mt-4 text-[var(--ink-dim)] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-12 text-center text-sm text-[var(--ink-mute)]">
            Bei weiterer Anfahrt — etwa aus Luxemburg — lohnt sich ein kurzer Anruf vorab.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
