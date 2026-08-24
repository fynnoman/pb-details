"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import type { HomeData, SiteSettings } from "@/lib/site-types";
import { mediaUrl } from "@/lib/media";
import EditableText from "./edit/EditableText";
import EditableImage from "./edit/EditableImage";

export default function Hero({
  home,
  settings,
}: {
  home: HomeData;
  settings: SiteSettings;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const bgUrl =
    mediaUrl(home.backgroundImage, "hero") ||
    "/images/hero/schwarzes-auto-keramikversiegelung.jpg";

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden grain vignette"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <EditableImage globalSlug="home" path="backgroundImage" className="w-full h-full">
          <img src={bgUrl} alt="" className="w-full h-full object-cover" />
        </EditableImage>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-[var(--bg)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.55)_70%)]" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 min-h-[100svh] flex flex-col justify-end pb-16 sm:pb-32 pt-32 sm:pt-44 md:pt-48"
      >
        <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="text-[11px] sm:text-xs tracking-[0.42em] uppercase text-[var(--ink-dim)] mb-6 sm:mb-8"
          >
            <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
            <EditableText globalSlug="home" path="kicker" value={home.kicker || ""} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1], delay: 0.05 }}
            className="font-display font-light text-[clamp(2rem,10vw,5.8rem)] leading-[0.98] tracking-[-0.03em] max-w-[16ch] mb-6"
          >
            <EditableText
              globalSlug="home"
              path="title"
              value={home.title}
              render={(v) =>
                v.split(" ").map((word, i, arr) => (
                  <span
                    key={i}
                    className={`block ${i === arr.length - 1 ? "italic text-gold" : "text-chrome"}`}
                  >
                    {word}
                  </span>
                ))
              }
            />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
            className="font-display text-[clamp(1rem,3.5vw,1.7rem)] leading-snug tracking-[-0.01em] text-[var(--ink)] max-w-[32ch] font-normal"
          >
            <EditableText
              globalSlug="home"
              path="subtitle"
              value={home.subtitle || ""}
              multiline
            />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1], delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            {home.primaryCta?.href && (
              <Link href={home.primaryCta.href} className="btn-gold">
                {home.primaryCta.label || "Jetzt anfragen"}
                <span aria-hidden>→</span>
              </Link>
            )}
            {home.secondaryCta?.href && (
              <Link href={home.secondaryCta.href} className="btn-glass">
                {home.secondaryCta.label || "Leistungen ansehen"}
              </Link>
            )}
            <a
              href={`tel:${settings.phone.e164}`}
              className="text-sm text-[var(--ink-dim)] hover:text-[var(--ink)] ml-2 inline-flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
              {settings.phone.display}
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div style={{ opacity }} className="absolute bottom-0 inset-x-0 z-10">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10 pb-4 sm:pb-6">
          <div className="glass rounded-2xl px-4 sm:px-8 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-xs tracking-[0.22em] sm:tracking-[0.24em] uppercase text-[var(--ink-dim)]">
            {settings.provenExpert && (
              <span>
                ⭑ {settings.provenExpert.value.toString().replace(".", ",")} /{" "}
                {settings.ratingScale} · {settings.provenExpert.count} ProvenExpert
              </span>
            )}
            {settings.google && (
              <span className="hidden sm:inline">
                {settings.google.count} Google
              </span>
            )}
            {settings.wkdb && (
              <span className="hidden md:inline">
                {settings.wkdb.count} werkenntdenBESTEN
              </span>
            )}
            <span className="hidden lg:inline">Q-Siegel · BRILA</span>
            {settings.founded && <span>Seit {settings.founded}</span>}
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-[var(--ink-mute)]"
      >
        <span>Scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-[var(--gold)] to-transparent" />
      </motion.div>
    </section>
  );
}
