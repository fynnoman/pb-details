"use client";

import { useEffect } from "react";

/**
 * Setzt beim Mount die CSS-Klasse `.edit-mode` auf <html>, damit
 * edit-spezifische Styles greifen können (z. B. Nav 56px nach unten
 * schieben, damit sie unter der Toolbar sitzt). Beim Unmount wieder
 * entfernen, sonst bliebe die Klasse beim Navigieren zu anderen Seiten.
 */
export default function EditModeSetup() {
  useEffect(() => {
    document.documentElement.classList.add("edit-mode");
    return () => document.documentElement.classList.remove("edit-mode");
  }, []);
  return null;
}
