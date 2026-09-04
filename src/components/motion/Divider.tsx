"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
  variant?: "line" | "diamond" | "trace";
  className?: string;
};

/**
 * Gold-Ornament-Divider zwischen Sections. Die Hairline zeichnet sich
 * beim ersten In-View von der Mitte nach außen (per scaleX + origin-center).
 * `diamond` fügt ein kleines Rhombus-Zeichen mittig ein, `trace` ist eine
 * dickere durchgezogene Linie mit Ausklang.
 */
export default function Divider({ variant = "diamond", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <div
      ref={ref}
      className={`relative mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10 py-6 sm:py-10 ${className}`}
      aria-hidden
    >
      <div className="relative flex items-center justify-center gap-4">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-px flex-1 origin-right"
          style={{
            background:
              "linear-gradient(to left, transparent 0%, rgba(212,180,131,0.55) 45%, rgba(212,180,131,0.9) 100%)",
          }}
        />

        {variant === "diamond" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6, rotate: 45 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 45 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block h-1.5 w-1.5"
            style={{
              background:
                "linear-gradient(180deg, #f8e6c3 0%, #d4b483 55%, #8a6a3f 100%)",
              boxShadow: "0 0 20px rgba(212,180,131,0.5)",
            }}
          />
        )}
        {variant === "trace" && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]/70 whitespace-nowrap"
          >
            ◆
          </motion.span>
        )}

        <motion.span
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-px flex-1 origin-left"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(212,180,131,0.55) 45%, rgba(212,180,131,0.9) 100%)",
          }}
        />
      </div>
    </div>
  );
}
