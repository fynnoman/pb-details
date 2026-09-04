"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

/**
 * "Sous la Surface" — der eine unvergessliche Moment der Site.
 * Sticky-Scroll-Takeover: dunkles Auto → Spiegelglanz. Wasserperlen
 * (SVG-generierte Beads) tauchen progressiv auf, italic Fraunces-Zitat
 * kommt mittig zum Climax rein. Die Sektion ist 250vh hoch, sticky-
 * viewport hält den Panel-Layer.
 */

const BEADS = generateBeads(42);

function generateBeads(count: number) {
  const rng = mulberry32(1997);
  return Array.from({ length: count }, () => ({
    x: rng() * 100, // %
    y: rng() * 100,
    r: 3 + rng() * 14, // px
    delay: rng() * 0.6,
    drift: (rng() - 0.5) * 10,
  }));
}
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function SousLaSurface({
  imageDull = "/images/hero/schwarzes-auto-keramikversiegelung.jpg",
  imageShine = "/images/hero/schwarzes-auto-keramikversiegelung.jpg",
}: {
  imageDull?: string;
  imageShine?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Progress cues (matt on top, shine emerges, quote lands, exit)
  const shineOpacity = useTransform(scrollYProgress, [0.05, 0.55], [0, 1]);
  const shineScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.0]);
  const beadStart = useTransform(scrollYProgress, [0.15, 0.7], [0, 1]);
  const kickerOpacity = useTransform(scrollYProgress, [0.0, 0.15], [0, 1]);
  const kickerY = useTransform(scrollYProgress, [0.0, 0.2], [30, 0]);
  const quoteOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.55, 0.85, 0.95],
    [0, 1, 1, 0]
  );
  const quoteY = useTransform(scrollYProgress, [0.35, 0.6], [40, 0]);
  const attribOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const wordShine = useTransform(shineOpacity, (v) => 0.15 + v * 0.75);

  return (
    <section
      ref={ref}
      className="relative h-[260vh] bg-black"
      aria-label="Sous la Surface — Ceramic-Coating-Effekt"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Layer 1: dull matte state */}
        <div className="absolute inset-0">
          <img
            src={imageDull}
            alt=""
            className="w-full h-full object-cover"
            style={{
              filter: "grayscale(0.35) brightness(0.55) contrast(0.9)",
            }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Layer 2: coated, mirror-shine — cross-fades in */}
        <motion.div
          style={{ opacity: shineOpacity, scale: shineScale }}
          className="absolute inset-0 will-change-[opacity,transform]"
        >
          <img
            src={imageShine}
            alt=""
            className="w-full h-full object-cover"
            style={{
              filter:
                "contrast(1.15) saturate(1.15) brightness(1.08)",
            }}
            loading="lazy"
          />
          {/* Gloss highlight */}
          <div
            className="absolute inset-0 mix-blend-overlay opacity-70"
            style={{
              background:
                "radial-gradient(1200px 800px at 50% 35%, rgba(245,226,184,0.35), transparent 55%), radial-gradient(700px 500px at 80% 80%, rgba(212,180,131,0.2), transparent 60%)",
            }}
          />
        </motion.div>

        {/* Layer 3: water beading — SVG dots that pop into view */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <radialGradient id="beadGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="45%" stopColor="rgba(245,226,184,0.35)" />
              <stop offset="80%" stopColor="rgba(212,180,131,0.15)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
            </radialGradient>
            <filter id="beadShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0.15" stdDeviation="0.2" floodColor="#000" floodOpacity="0.5" />
            </filter>
          </defs>
          {BEADS.map((b, i) => (
            <Bead key={i} b={b} progress={beadStart} />
          ))}
        </svg>

        {/* Bottom vignette to seat type */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />
        <div className="pointer-events-none absolute inset-0 grain" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-between px-6 py-16 md:py-24 pointer-events-none">
          <motion.div
            style={{ opacity: kickerOpacity, y: kickerY }}
            className="w-full max-w-[1400px] flex items-center justify-between text-[10px] uppercase text-white/75"
          >
            <div className="flex items-center gap-3" style={{ letterSpacing: "0.4em" }}>
              <span className="h-px w-8 bg-[var(--gold)]/80" />
              <span>Sous la Surface</span>
            </div>
            <div className="hidden sm:block" style={{ letterSpacing: "0.4em" }}>
              N° 02 · Céramique
            </div>
          </motion.div>

          {/* Centered pull-quote */}
          <div className="w-full max-w-3xl text-center">
            <motion.p
              style={{ opacity: quoteOpacity, y: quoteY }}
              className="font-display text-[clamp(1.6rem,4.6vw,3.6rem)] leading-[1.1] tracking-[-0.02em] text-white"
            >
              Was Sie sehen, ist{" "}
              <motion.span
                style={{ opacity: wordShine }}
                className="italic"
              >
                <span className="text-gold">nicht</span>
              </motion.span>{" "}
              der Lack.
              <br />
              <span className="text-white/80">Es ist, was wir</span>{" "}
              <span className="italic text-gold">darüber legen.</span>
            </motion.p>
            <motion.p
              style={{ opacity: attribOpacity }}
              className="mt-8 text-[10px] uppercase text-white/70"
              // eslint-disable-next-line react/forbid-dom-props
            >
              <span
                style={{ letterSpacing: "0.4em" }}
                className="inline-flex items-center gap-3"
              >
                <span className="h-px w-8 bg-[var(--gold)]/70" />
                Keramikversiegelung · BRILA Certified
                <span className="h-px w-8 bg-[var(--gold)]/70" />
              </span>
            </motion.p>
          </div>

          <motion.div
            style={{ opacity: kickerOpacity }}
            className="hidden md:flex items-center gap-3 text-[9px] uppercase text-white/50"
          >
            <span style={{ letterSpacing: "0.4em" }}>Scroll</span>
            <span className="h-px w-10 bg-white/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Bead({
  b,
  progress,
}: {
  b: (typeof BEADS)[number];
  progress: MotionValue<number>;
}) {
  // Bead appears at its own moment within the progress range
  const opacity = useTransform(progress, [b.delay, b.delay + 0.15], [0, 1]);
  const scale = useTransform(progress, [b.delay, b.delay + 0.25], [0.4, 1]);
  const drift = useTransform(
    progress,
    [b.delay, 1],
    [0, b.drift * 0.15]
  );
  const cy = useTransform(drift, (d) => b.y + d);

  return (
    <motion.circle
      cx={b.x}
      cy={cy}
      r={b.r / 10}
      fill="url(#beadGrad)"
      filter="url(#beadShadow)"
      style={{ opacity, scale, transformOrigin: `${b.x}% ${b.y}%` }}
    />
  );
}
