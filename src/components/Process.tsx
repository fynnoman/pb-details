"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import EditableText from "./edit/EditableText";

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
  const kickerText = kicker || "So läuft es bei uns ab";
  const headingText = heading || "In drei Schritten zu Ihrem Ergebnis.";
  const footnoteText = footnote || "";

  return (
    <section className="relative py-16 sm:py-24 lg:py-40 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1400px 900px at 30% 20%, rgba(212,180,131,0.10), transparent 55%), radial-gradient(1000px 700px at 80% 90%, rgba(245,226,184,0.06), transparent 60%), linear-gradient(180deg, var(--bg) 0%, #0a0906 55%, var(--bg) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10">
        <div className="max-w-3xl mb-10 sm:mb-16">
          <Reveal>
            <p className="text-[10px] sm:text-[11px] tracking-[0.32em] sm:tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-4 sm:mb-6">
              <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
              <EditableText globalSlug="home" path="processKicker" value={kickerText} />
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(1.75rem,7vw,3.6rem)] leading-[1.05] tracking-[-0.025em]">
              <EditableText globalSlug="home" path="processHeading" value={headingText} />
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {items.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              className="glass rounded-2xl sm:rounded-[1.75rem] p-6 sm:p-8 lg:p-10 relative overflow-hidden"
            >
              <div className="font-display text-[5rem] sm:text-[7rem] leading-none text-[var(--ink)]/[0.18] absolute -top-2 sm:-top-4 -right-1 sm:-right-2 select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-[11px] sm:text-xs tracking-[0.32em] uppercase text-[var(--gold)] mb-3 sm:mb-4 relative z-10">
                Schritt {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl leading-tight tracking-[-0.02em] relative z-10">
                <EditableText
                  globalSlug="home"
                  path={`processSteps.${i}.title`}
                  value={s.title}
                />
              </h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[var(--ink-dim)] leading-relaxed relative z-10">
                <EditableText
                  globalSlug="home"
                  path={`processSteps.${i}.description`}
                  value={s.description}
                  multiline
                />
              </p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-10 sm:mt-12 text-center text-xs sm:text-sm text-[var(--ink-mute)] px-4">
            <EditableText globalSlug="home" path="processFootnote" value={footnoteText} multiline />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
