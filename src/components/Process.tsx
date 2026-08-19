"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

export type ProcessStep = { title: string; description: string };

export default function Process({
  kicker,
  heading,
  steps,
  footnote,
}: {
  kicker?: string;
  heading?: string;
  steps?: ProcessStep[];
  footnote?: string;
}) {
  const items = steps && steps.length > 0 ? steps : [];

  return (
    <section className="relative py-20 sm:py-32 lg:py-44 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1400px 900px at 30% 20%, rgba(212,180,131,0.10), transparent 55%), radial-gradient(1000px 700px at 80% 90%, rgba(245,226,184,0.06), transparent 60%), linear-gradient(180deg, var(--bg) 0%, #0a0906 55%, var(--bg) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-10">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <Reveal>
            <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
              <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
              {kicker || "So läuft es bei uns ab"}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02] tracking-[-0.025em]">
              {heading || "In drei Schritten zu Ihrem Ergebnis."}
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {items.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              className="glass rounded-[1.75rem] p-8 sm:p-10 relative overflow-hidden"
            >
              <div className="font-display text-[7rem] leading-none text-[var(--ink)]/[0.18] absolute -top-4 -right-2 select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-xs tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                Schritt {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-3xl leading-tight tracking-[-0.02em]">
                {s.title}
              </h3>
              <p className="mt-4 text-[var(--ink-dim)] leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>

        {footnote && (
          <Reveal delay={0.3}>
            <p className="mt-12 text-center text-sm text-[var(--ink-mute)]">{footnote}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
