"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  shine?: boolean;
};

/**
 * Spring-basierter 3D-Tilt (Emil-Physik). Auf Touch-Devices komplett aus.
 * Der Shine ist eine diagonale Gold-Aufhellung die der Maus folgt.
 */
export default function TiltCard({
  children,
  className = "",
  intensity = 6,
  shine = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const springCfg = { stiffness: 140, damping: 18, mass: 0.6 };
  const rotX = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), springCfg);
  const rotY = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), springCfg);
  const shineX = useSpring(useTransform(mx, [0, 1], [0, 100]), springCfg);
  const shineY = useSpring(useTransform(my, [0, 1], [0, 100]), springCfg);

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: reduced ? 0 : rotX,
        rotateY: reduced ? 0 : rotY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className={`relative ${className}`}
    >
      {children}
      {shine && !reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 md:opacity-100 mix-blend-overlay"
          style={{
            background: useTransform(
              [shineX, shineY],
              ([x, y]) =>
                `radial-gradient(600px circle at ${x}% ${y}%, rgba(245,226,184,0.28), transparent 45%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
}
