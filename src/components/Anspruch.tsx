"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";
import { SITE } from "@/lib/site";

export default function Anspruch() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.15, 1.05]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section
      id="ueber-uns"
      ref={ref}
      className="relative py-32 sm:py-44 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left column — image */}
          <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden">
              <motion.img
                src="/images/team/karsten-becker-thomas-paul.jpg"
                alt="Karsten Becker und Thomas Paul, Inhaber und Gründer von PB Fahrzeugpflege Saarlouis, im Betrieb in Ensdorf"
                style={{ y: imgY, scale: imgScale }}
                className="absolute inset-0 w-full h-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Floating glass badge */}
              <motion.div
                style={{ rotate: badgeRotate }}
                className="absolute -right-6 -bottom-6 sm:right-8 sm:bottom-8 glass-strong rounded-2xl px-5 py-4 max-w-[240px] shadow-xl"
              >
                <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)] mb-1">
                  Weiterempfehlung
                </div>
                <div className="font-display text-4xl text-chrome leading-none">
                  {SITE.ratings.recommendation}
                  <span className="text-[var(--gold)]">%</span>
                </div>
                <div className="text-xs text-[var(--ink-dim)] mt-2">
                  aus {SITE.ratings.count} verifizierten Bewertungen
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right column — copy */}
          <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
            <Reveal>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                Unser Anspruch
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02] tracking-[-0.02em] max-w-[18ch]">
                Kompromisslose Qualität <span className="italic text-gold">bis ins Detail.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-[var(--ink-dim)] text-lg leading-relaxed max-w-xl">
                Unser Qualitäts- und Leistungsanspruch beginnt dort, wo andere
                ihre Arbeit bereits als beendet ansehen. Wir nehmen uns die Zeit,
                die eine perfekte Aufbereitung braucht, und hören erst auf, wenn
                das Ergebnis stimmt.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 text-[var(--ink-dim)] leading-relaxed max-w-xl">
                Da wir ausschließlich private Kundenfahrzeuge betreuen – darunter
                viele Sportwagen, Oldtimer und Luxusfahrzeuge – ist Ihr Fahrzeug
                bei uns in besten Händen. Billig kann jeder – deshalb lautet
                unser Motto: „Glanz oder gar nicht!"
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <blockquote className="mt-10 pl-6 border-l border-[var(--gold)]/40">
                <p className="font-display italic text-2xl sm:text-3xl leading-snug text-chrome">
                  „Für andere reicht das Erzählte,
                  <br />
                  für uns zählt das Erreichte.“
                </p>
                <footer className="mt-3 text-[11px] tracking-[0.3em] uppercase text-[var(--ink-mute)]">
                  Thomas Paul & Karsten Becker
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
