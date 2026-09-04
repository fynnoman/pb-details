"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom Cursor — Gold-Ring der der Maus mit sanfter Trägheit folgt.
 * Nur auf hover-fähigen fine pointers aktiv (Desktop). Wächst über
 * interactive elements (a, button, [role=button]), reagiert auf
 * :active mit scale-Puls. Fallback: OS-Cursor bleibt sichtbar; wenn
 * Custom Cursor aktiv ist, blenden wir OS-Cursor über CSS aus.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => setEnabled(mq.matches && !rm.matches);
    check();
    mq.addEventListener("change", check);
    rm.addEventListener("change", check);
    return () => {
      mq.removeEventListener("change", check);
      rm.removeEventListener("change", check);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let targetX = -100;
    let targetY = -100;
    let hoverScale = 1;
    let pressScale = 1;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest(
        'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]'
      );
      hoverScale = interactive ? 1.9 : 1;
    };
    const onDown = () => (pressScale = 0.85);
    const onUp = () => (pressScale = 1);
    const onLeave = () => {
      targetX = -100;
      targetY = -100;
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    const tick = () => {
      dotX += (targetX - dotX) * 0.55;
      dotY += (targetY - dotY) * 0.55;
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      const s = hoverScale * pressScale;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${s})`;
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    document.documentElement.classList.add("pb-custom-cursor");

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("pb-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 rounded-full will-change-transform"
        style={{
          border: "1px solid rgba(212,180,131,0.7)",
          boxShadow: "0 0 12px rgba(212,180,131,0.28)",
          transition: "border-color 240ms cubic-bezier(0.23,1,0.32,1)",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[var(--gold)] will-change-transform"
        style={{ boxShadow: "0 0 8px rgba(212,180,131,0.7)" }}
      />
    </>
  );
}
