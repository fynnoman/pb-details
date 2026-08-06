"use client";

import { motion } from "framer-motion";

type Props = {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  backgroundImage?: string;
};

export default function PageHero({
  kicker,
  title,
  subtitle,
  backgroundImage,
}: Props) {
  return (
    <section className="relative min-h-[70svh] w-full overflow-hidden grain vignette flex items-end pt-32 pb-16 sm:pb-24">
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-[var(--bg)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.55)_70%)]" />
        </div>
      )}

      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-[1400px] w-full px-6 sm:px-10">
          {kicker && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
              className="text-[11px] sm:text-xs tracking-[0.42em] uppercase text-[var(--ink-dim)] mb-6 sm:mb-8"
            >
              <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
              {kicker}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
            className="font-display font-light text-[clamp(2.2rem,5.4vw,4.6rem)] leading-[1.02] tracking-[-0.028em] max-w-[22ch] text-chrome"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.25 }}
              className="mt-6 max-w-2xl text-[var(--ink-dim)] text-base sm:text-lg leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
