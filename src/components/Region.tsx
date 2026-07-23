"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const regions = [
  "Saarlouis",
  "Saarbrücken",
  "Merzig",
  "St. Wendel",
  "Luxemburg",
  "Trier",
  "Neunkirchen",
  "Homburg",
];

export default function Region() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.02, 1.1]);

  return (
    <section ref={ref} className="relative py-32 sm:py-40 overflow-hidden">
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=2000&q=85&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Weich ausblendende Ränder, Mitte deutlich heller */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                Einzugsgebiet
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02] tracking-[-0.025em]">
                Saarland <span className="italic text-gold">& Luxemburg.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[var(--ink-dim)] leading-relaxed max-w-lg">
                Sie finden uns in der Provinzialstraße 243 in 66806 Ensdorf —
                direkt bei Saarlouis. Zu uns kommen Kunden aus dem gesamten
                Saarland sowie aus Luxemburg und dem grenznahen Raum.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-2">
                {regions.map((r) => (
                  <span
                    key={r}
                    className="glass-flat rounded-full px-4 py-1.5 text-xs tracking-wide text-[var(--ink-dim)]"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Reveal delay={0.1}>
              <div className="glass-strong rounded-[1.75rem] p-8">
                <div className="text-xs tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                  Standort
                </div>
                <div className="font-display text-2xl leading-tight">
                  PB Fahrzeugpflege Saarlouis
                </div>
                <div className="mt-3 text-[var(--ink-dim)] leading-relaxed">
                  Provinzialstraße 243
                  <br />
                  66806 Ensdorf
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-mute)]">Mo – Fr</span>
                    <span className="text-[var(--ink)]">09:00 – 12:00 · 13:00 – 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-mute)]">Sa</span>
                    <span className="text-[var(--ink)]">09:00 – 12:00</span>
                  </div>
                  <div className="text-[11px] text-[var(--ink-mute)] pt-2">
                    Abweichungen möglich — bitte vorab kurz anrufen.
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Provinzialstraße+243+66806+Ensdorf"
                    target="_blank"
                    rel="noopener"
                    className="btn-glass text-sm py-2.5 px-4"
                  >
                    In Karten öffnen →
                  </a>
                  <a href="tel:+4968314612 29" className="btn-gold text-sm py-2.5 px-4">
                    Anrufen
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
