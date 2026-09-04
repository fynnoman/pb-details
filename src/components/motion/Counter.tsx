"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  to: number;
  from?: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
  suffix?: string;
  prefix?: string;
};

/**
 * Zählt beim ersten In-View von `from` auf `to`. Läuft off-main-thread
 * über framer-motion's requestAnimationFrame, kein DOM-thrash weil wir
 * per useTransform + textContent-Update arbeiten.
 */
export default function Counter({
  to,
  from = 0,
  duration = 1.6,
  format,
  className = "",
  suffix = "",
  prefix = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduced = useReducedMotion();
  const mv = useMotionValue(reduced ? to : from);
  const rounded = useTransform(mv, (v) => {
    const n = Math.round(v);
    return format ? format(n) : String(n);
  });

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(mv, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, mv, to, duration, reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const unsub = rounded.on("change", (v) => {
      el.textContent = `${prefix}${v}${suffix}`;
    });
    // Set initial content synchronously so SSR + first paint have value
    const initial = reduced ? to : from;
    el.textContent = `${prefix}${
      format ? format(initial) : Math.round(initial)
    }${suffix}`;
    return () => unsub();
  }, [rounded, prefix, suffix, format, from, to, reduced]);

  return <span ref={ref} className={className} aria-label={`${prefix}${to}${suffix}`} />;
}
