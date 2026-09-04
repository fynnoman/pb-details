"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  /** For semantic hints only — component just wraps children in a motion div. */
  as?: "a" | "button" | "span" | "div";
  /** Reserved for parent usage; MagneticLink itself does not render href. */
  href?: string;
  onClick?: () => void;
};

/**
 * Magnetic hover — der Wrapper-Container wandert dem Cursor entgegen.
 * Wir rendern absichtlich KEIN <a>/<button> selbst, damit die children
 * (typischerweise ein next/link <Link>) das Element bleiben und keine
 * verschachtelten Anchors entstehen. `href` / `as` bleiben als
 * semantische Hints für Aufrufer ohne Effekt hier.
 */
export default function MagneticLink({
  children,
  className = "",
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springCfg = { stiffness: 160, damping: 15, mass: 0.5 };
  const sx = useSpring(x, springCfg);
  const sy = useSpring(y, springCfg);

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
