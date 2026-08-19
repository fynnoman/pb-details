"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  /** Pfad zum Hintergrund-Bild (aus /public). */
  src: string;
  /** Alt-Text. */
  alt: string;
  /** Kicker über der Headline. */
  kicker?: string;
  /** Große Headline über dem Bild (nach dem Reveal). */
  title: ReactNode;
  /** Optionaler Untertitel. */
  subtitle?: ReactNode;
  /** Optionale Kinder unter dem Untertitel (CTAs etc.). */
  children?: ReactNode;
};

/**
 * Sticky-Scroll-Reveal: das Bild startet klein und rund-geeckt,
 * wächst beim Scrollen zum Vollbild, ein dunkler Verlauf blendet
 * darüber und der Text erscheint gestaffelt. Der Container ist
 * höher als das Viewport, damit die Sektion "hält" während
 * scrolled — sticky top-0 pinnt das Bild währenddessen.
 *
 * Choreographie (bewusst überlappend):
 * - Scale + Border-Radius: 0.10 → 0.55  (Bild wächst)
 * - Overlay-Opacity:       0.32 → 0.62  (dunkelt ab)
 * - Content-Opacity + Y:   0.52 → 0.78  (Text erscheint)
 */
export default function ScrollScaleReveal({
  src,
  alt,
  kicker,
  title,
  subtitle,
  children,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.1, 0.55], [0.86, 1]);
  const radius = useTransform(scrollYProgress, [0.1, 0.55], [40, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.32, 0.62], [0.15, 0.85]);
  const contentOpacity = useTransform(scrollYProgress, [0.52, 0.78], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.52, 0.9], [40, 0]);

  const staticStyle: React.CSSProperties = { transform: "scale(1)", borderRadius: 0 };

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: "220vh" }}
      aria-label="Marken-Motto"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div
          style={
            reduce
              ? staticStyle
              : { scale, borderRadius: radius, willChange: "transform" }
          }
          className="relative h-full w-full overflow-hidden bg-black"
        >
          {/* Hintergrund-Bild */}
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Sanfte Grundabdeckung, damit Kanten nicht überstrahlen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"
          />

          {/* Dunkler Overlay, der beim Scrollen einblendet */}
          <motion.div
            aria-hidden
            style={
              reduce
                ? { opacity: 0.7 }
                : { opacity: overlayOpacity }
            }
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_75%)]" />
          </motion.div>

          {/* Content-Layer */}
          <motion.div
            style={
              reduce
                ? { opacity: 1 }
                : { opacity: contentOpacity, y: contentY }
            }
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 sm:px-10 text-center"
          >
            {kicker && (
              <p className="text-[11px] sm:text-xs tracking-[0.42em] uppercase text-[var(--ink-dim)] mb-6 sm:mb-8">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                {kicker}
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle ml-3" />
              </p>
            )}

            <h2 className="font-display font-light text-[clamp(2.8rem,7.5vw,7rem)] leading-[0.98] tracking-[-0.03em] max-w-[18ch]">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--ink-dim)]">
                {subtitle}
              </p>
            )}

            {children && (
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                {children}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
