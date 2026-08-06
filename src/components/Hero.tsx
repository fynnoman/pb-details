"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["0px", "8px"]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden grain vignette"
    >
      {/* Background video */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=2400&q=85&auto=format&fit=crop"
          className="w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/6873975/6873975-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/3843433/3843433-hd_1920_1080_24fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-[var(--bg)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.55)_70%)]" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity, filter: `blur(var(--hero-blur, 0px))` }}
        className="relative z-10 h-[100svh] flex flex-col justify-end pb-24 sm:pb-32 pt-32"
      >
        <div className="mx-auto max-w-[1400px] w-full px-6 sm:px-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="text-[11px] sm:text-xs tracking-[0.42em] uppercase text-[var(--ink-dim)] mb-6 sm:mb-8"
          >
            <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
            Seit 1997 · Inhabergeführt in Ensdorf
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1], delay: 0.05 }}
            className="font-display font-light text-[clamp(2.4rem,6.4vw,5.8rem)] leading-[0.98] tracking-[-0.03em] max-w-[16ch] mb-6"
          >
            <span className="block text-chrome">The Art</span>
            <span className="block italic text-gold">of Detailing.</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
            className="font-display text-[clamp(1.15rem,1.9vw,1.7rem)] leading-snug tracking-[-0.01em] text-[var(--ink)] max-w-[32ch] font-normal"
          >
            Fahrzeugaufbereitung &amp; Keramikversiegelung in Saarlouis, dem
            Saarland &amp; Luxemburg.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1], delay: 0.35 }}
            className="mt-6 max-w-xl text-[var(--ink-dim)] text-base sm:text-lg leading-relaxed"
          >
            PB Fahrzeugpflege Saarlouis® ist ein auf Premium-Fahrzeugaufbereitung
            und Keramikversiegelung spezialisierter Betrieb im Saarland – seit
            1997. Ob Neuwagen, Sportwagen, Luxusfahrzeug oder Oldtimer: Wenn es
            um professionelle Fahrzeugaufbereitung im Saarland und in Luxemburg
            geht, sind Sie bei uns in den besten Händen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1], delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link href="/kontakt/" className="btn-gold">
              Jetzt anfragen
              <span aria-hidden>→</span>
            </Link>
            <Link href="/leistungen/" className="btn-glass">
              Leistungen entdecken
            </Link>
            <a
              href={SITE.phone.href}
              className="text-sm text-[var(--ink-dim)] hover:text-[var(--ink)] ml-2 inline-flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
              {SITE.phone.display}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom marquee-ish trust bar */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-0 inset-x-0 z-10"
      >
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 pb-6">
          <div className="glass rounded-2xl px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[var(--ink-dim)]">
            <span>
              ⭑ {SITE.ratings.value.toString().replace(".", ",")} / {SITE.ratings.scale} ·{" "}
              {SITE.ratings.count} Bewertungen
            </span>
            <span className="hidden sm:inline">Q-Siegel · Deutschlands 1.</span>
            <span className="hidden md:inline">BRILA zertifiziert</span>
            <span>Kunden aus DE · LU</span>
            <span className="hidden md:inline">Seit 1997</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
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
