"use client";

import Reveal from "./Reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const reasons = [
  { headline: "Seit 1997", body: "Inhabergeführt von Thomas Paul & Karsten Becker" },
  { headline: "600+", body: "positive, verifizierte Kundenbewertungen" },
  { headline: "95 %", body: "Weiterempfehlungsquote" },
  { headline: "Q-Siegel", body: "Deutschlands erster Fahrzeugpflegebetrieb mit Q-Siegel" },
  { headline: "BRILA", body: "zertifizierter Fachbetrieb für Keramikversiegelungen" },
  { headline: "ZDF & SR3", body: "Bekannt aus TV und Radio-Berichten" },
];

const bullets = [
  "Einer der dienstältesten Fahrzeugaufbereiter Deutschlands",
  "Auszeichnungen durch Heiko Maas und Anke Rehlinger",
  "Eigener Qualitäts-Coach",
  "Spezialisierung auf Sport-, Luxus- und Sammlerfahrzeuge",
  "Kunden aus dem Saarland, Luxemburg und ganz Deutschland",
  "Ausschließlich Privatkunden statt Massenabfertigung",
];

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.02, 1.15]);

  return (
    <section ref={ref} className="relative py-32 sm:py-44 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-16 items-end">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                Warum PB Fahrzeugpflege
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.02] tracking-[-0.025em] max-w-[18ch]">
                Handwerk, das seit fast 30 Jahren <span className="italic text-gold">Vertrauen</span> schafft.
              </h2>
            </Reveal>
          </div>
        </div>

        {/* Bento */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {/* Large image */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="col-span-12 md:col-span-7 relative aspect-[16/12] rounded-[1.75rem] overflow-hidden"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1800&q=85&auto=format&fit=crop"
              alt="Detailliert aufbereiteter Wagen"
              style={{ y: imgY, scale: imgScale }}
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <div className="glass rounded-2xl px-5 py-4 inline-flex flex-col">
                <span className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)]">
                  Motto
                </span>
                <span className="font-display text-xl sm:text-2xl italic text-chrome mt-1">
                  „Glanz oder gar nicht.“
                </span>
              </div>
            </div>
          </motion.div>

          {/* Metrics */}
          <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-4 sm:gap-6 content-start">
            {reasons.slice(0, 4).map((r, i) => (
              <motion.div
                key={r.headline}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                className="glass rounded-[1.25rem] p-5 sm:p-6 min-h-[130px] flex flex-col justify-between"
              >
                <div className="font-display text-3xl sm:text-4xl leading-none text-chrome">
                  {r.headline}
                </div>
                <div className="text-xs text-[var(--ink-dim)] mt-3 leading-relaxed">
                  {r.body}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bullets — wide row */}
          <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-2">
            {bullets.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.04, ease: [0.2, 0.7, 0.2, 1] }}
                className="glass-flat rounded-2xl px-5 py-4 flex items-start gap-3 text-sm text-[var(--ink)]"
              >
                <span className="mt-1 shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-[#f5e2b8] to-[#8a6a3f] flex items-center justify-center text-[8px] text-black">
                  ✓
                </span>
                <span className="text-[var(--ink-dim)]">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
