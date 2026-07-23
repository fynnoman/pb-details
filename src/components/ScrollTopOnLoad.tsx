"use client";

import { useEffect } from "react";

export default function ScrollTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Sofort und nach dem Layout noch einmal — verhindert, dass
    // Browser oder Framer Motion Layout-Shifts uns wegscrollen.
    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
    const t = setTimeout(() => window.scrollTo(0, 0), 60);
    return () => clearTimeout(t);
  }, []);

  return null;
}
