"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { HomeData, SiteSettings } from "@/lib/site-types";
import { mediaUrl } from "@/lib/media";
import EditableText from "./edit/EditableText";
import EditableImage from "./edit/EditableImage";
import Counter from "./motion/Counter";
import MagneticLink from "./motion/MagneticLink";

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
  const vignette = useTransform(scrollYProgress, [0, 1], [0.55, 0.75]);

  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const disableScrollFx = isMobile || prefersReducedMotion;

  // Mouse-parallax: spring-based, subtle depth on desktop
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 60, damping: 20, mass: 0.6 };
  const parallaxX = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), springCfg);
  const parallaxY = useSpring(useTransform(my, [-0.5, 0.5], [-8, 8]), springCfg);
  useEffect(() => {
    if (disableScrollFx) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [disableScrollFx, mx, my]);

  const bgStyle = disableScrollFx ? undefined : { y, scale };
  const textStyle = disableScrollFx ? undefined : { y: textY, opacity };
  const fadeStyle = disableScrollFx ? undefined : { opacity };

  const bgUrl =
    mediaUrl(home.backgroundImage, "hero") ||
    "/images/hero/schwarzes-auto-keramikversiegelung.jpg";

  const titleWords = (home.title || "").trim().split(/\s+/).filter(Boolean);
  const totalReviews =
    (settings.provenExpert?.count || 0) +
    (settings.wkdb?.count || 0) +
    (settings.google?.count || 0);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden grain vignette"
    >
      {/* Deep bg with mouse-parallax */}
      <motion.div
        style={bgStyle}
        className="absolute inset-0 will-change-transform"
      >
        <motion.div
          style={
            disableScrollFx ? undefined : { x: parallaxX, y: parallaxY, scale: 1.08 }
          }
          className="absolute inset-0 will-change-transform"
        >
          <EditableImage globalSlug="home" path="backgroundImage" className="w-full h-full">
            <img
              src={bgUrl}
              alt=""
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
          </EditableImage>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-[var(--bg)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.55)_70%)]" />
      </motion.div>

      {/* Scroll-progress vignette darkening */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: useTransform(
            vignette,
            (v) =>
              `radial-gradient(ellipse 90% 65% at 50% 45%, transparent 45%, rgba(0,0,0,${v}) 100%)`
          ),
        }}
      />

      {/* Corner ornaments — animate in cinematic */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-24 md:top-28 left-4 md:left-10 z-10 hidden sm:block text-white/60"
      >
        <p className="text-[9px] uppercase" style={{ letterSpacing: "0.4em" }}>
          Depuis
        </p>
        <p className="mt-1.5 font-display text-[20px] leading-none tracking-[-0.01em] text-chrome">
          {settings.founded || 1997}
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-24 md:top-28 right-4 md:right-10 z-10 hidden sm:block text-right text-white/60"
      >
        <p className="text-[9px] uppercase" style={{ letterSpacing: "0.4em" }}>
          Édition
        </p>
        <p className="mt-1.5 font-display italic text-[20px] leading-none text-chrome">
          MMXXV
        </p>
      </motion.div>

      {/* Content column */}
      <motion.div
        style={textStyle}
        className="relative z-10 min-h-[100svh] flex flex-col justify-end pb-24 sm:pb-32 pt-28 sm:pt-44 md:pt-48"
      >
        <div className="mx-auto max-w-[1400px] w-full px-4 sm:px-8 lg:px-10">
          {/* Kicker + drawn hairline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="flex items-center gap-3 text-[10px] sm:text-xs tracking-[0.32em] sm:tracking-[0.42em] uppercase text-[var(--ink-dim)] mb-4 sm:mb-8"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block w-10 h-px bg-[var(--gold)] align-middle origin-left"
            />
            <EditableText globalSlug="home" path="kicker" value={home.kicker || ""} />
          </motion.p>

          {/* Kinetic title — word-by-word clip-path reveal */}
          <div className="max-w-[16ch] mb-4 sm:mb-6">
            <h2
              className="font-display font-light text-[clamp(1.9rem,9vw,5.8rem)] leading-[0.98] tracking-[-0.03em]"
              aria-label={home.title}
            >
              {titleWords.map((word, i) => {
                const isLast = i === titleWords.length - 1;
                return (
                  <span
                    key={i}
                    style={{
                      display: "block",
                      overflow: "hidden",
                      lineHeight: "inherit",
                    }}
                  >
                    <motion.span
                      initial={{ y: "108%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 1.05,
                        delay: 0.4 + i * 0.09,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{ display: "inline-block", willChange: "transform" }}
                      className={isLast ? "italic text-gold" : "text-chrome"}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              })}
            </h2>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.1,
              ease: [0.2, 0.7, 0.2, 1],
              delay: 0.4 + titleWords.length * 0.09 + 0.1,
            }}
            className="font-display text-[clamp(0.95rem,3.2vw,1.7rem)] leading-snug tracking-[-0.01em] text-[var(--ink)] max-w-[32ch] font-normal"
          >
            <EditableText
              globalSlug="home"
              path="subtitle"
              value={home.subtitle || ""}
              multiline
            />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.2, 0.7, 0.2, 1],
              delay: 0.4 + titleWords.length * 0.09 + 0.3,
            }}
            className="mt-6 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {home.primaryCta?.href && (
              <MagneticLink
                as="a"
                href={home.primaryCta.href}
                strength={0.25}
                className="w-full sm:w-auto"
              >
                <Link
                  href={home.primaryCta.href}
                  className="btn-gold min-h-[48px] w-full sm:w-auto justify-center"
                >
                  {home.primaryCta.label || "Jetzt anfragen"}
                  <span aria-hidden>→</span>
                </Link>
              </MagneticLink>
            )}
            {home.secondaryCta?.href && (
              <MagneticLink
                as="a"
                href={home.secondaryCta.href}
                strength={0.2}
                className="w-full sm:w-auto"
              >
                <Link
                  href={home.secondaryCta.href}
                  className="btn-glass min-h-[48px] w-full sm:w-auto justify-center"
                >
                  {home.secondaryCta.label || "Leistungen ansehen"}
                </Link>
              </MagneticLink>
            )}
            <a
              href={`tel:${settings.phone.e164}`}
              className="text-sm text-[var(--ink-dim)] hover:text-[var(--ink)] w-full sm:w-auto sm:ml-2 inline-flex items-center gap-2 min-h-[44px]"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
              {settings.phone.display}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Trust bar with animated counters */}
      <motion.div style={fadeStyle} className="absolute bottom-0 inset-x-0 z-10 hidden sm:block">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10 pb-4 sm:pb-6">
          <div className="glass rounded-2xl px-4 sm:px-8 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-xs tracking-[0.22em] sm:tracking-[0.24em] uppercase text-[var(--ink-dim)]">
            {settings.provenExpert && (
              <span className="inline-flex items-center gap-1.5">
                <span className="text-[var(--gold)]">⭑</span>
                <Counter
                  to={settings.provenExpert.value}
                  format={(n) =>
                    (Math.round(n * 100) / 100).toString().replace(".", ",")
                  }
                  duration={1.4}
                />
                <span>/ {settings.ratingScale}</span>
                <span className="mx-1 opacity-40">·</span>
                <Counter to={settings.provenExpert.count} duration={1.6} />
                <span>ProvenExpert</span>
              </span>
            )}
            {settings.google && (
              <span className="hidden sm:inline">
                <Counter to={settings.google.count} duration={1.6} /> Google
              </span>
            )}
            {settings.wkdb && (
              <span className="hidden md:inline">
                <Counter to={settings.wkdb.count} duration={1.6} /> werkenntdenBESTEN
              </span>
            )}
            <span className="hidden lg:inline">Q-Siegel · BRILA</span>
            {totalReviews > 0 && (
              <span className="hidden xl:inline">
                <Counter to={totalReviews} duration={1.8} /> Bewertungen
              </span>
            )}
            {settings.founded && (
              <span>
                Seit <Counter to={settings.founded} duration={1.4} />
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        style={fadeStyle}
        className="hidden md:flex absolute bottom-32 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-[var(--ink-mute)]"
      >
        <span>Scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-[var(--gold)] to-transparent" />
      </motion.div>
    </section>
  );
}
