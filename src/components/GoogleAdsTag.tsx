"use client";

import { useEffect } from "react";

/**
 * dataLayer-Events für Google Tag Manager.
 *
 * Diese Komponente lädt gtag.js NICHT selbst — alle Google-Ads-
 * Conversions werden in GTM konfiguriert. Hier pushen wir nur
 * semantische Events in den dataLayer:
 *
 *   pb_contact_submit  — Kontaktformular erfolgreich gesendet
 *   pb_click_tel       — Klick auf tel:-Link
 *   pb_click_mail      — Klick auf mailto:-Link
 *   pb_click_whatsapp  — Klick auf wa.me / api.whatsapp.com
 *   pb_thanks_pageview — Aufruf der /danke-Seite (Formular-Fallback)
 *
 * In GTM: pro Event ein Custom-Event-Trigger, verknüpft mit dem
 * jeweiligen Google-Ads-Conversion-Tag (inkl. Conversion-Label).
 * Marketing-Consent-Gating passiert in GTM via Consent-Mode oder
 * eigener Trigger-Bedingung.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    __pbAdsListenersBound?: boolean;
  }
}

function push(event: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event });
}

function bindListeners() {
  if (typeof window === "undefined") return;
  if (window.__pbAdsListenersBound) return;
  window.__pbAdsListenersBound = true;

  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as Element | null;
      const a = target && "closest" in target ? target.closest("a[href]") : null;
      if (!a) return;
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (href.startsWith("tel:")) {
        push("pb_click_tel");
      } else if (href.startsWith("mailto:")) {
        push("pb_click_mail");
      } else if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        push("pb_click_whatsapp");
      }
    },
    true,
  );

  window.addEventListener("pb:contact-form-success", () => {
    push("pb_contact_submit");
  });

  const path = location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/danke") {
    push("pb_thanks_pageview");
  }
}

export default function GoogleAdsTag() {
  useEffect(() => {
    bindListeners();
  }, []);
  return null;
}
