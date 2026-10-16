"use client";

import { useEffect } from "react";
import { hasConsent } from "./CookieBanner";

/**
 * Google Ads gtag.js + Conversion-Event-Listener.
 *
 * Lädt an das eigene Consent-System angekoppelt: gtag.js wird erst nach
 * Marketing-Einwilligung injiziert. CookieBanner dispatched
 * `pb-consent-changed`, worauf diese Komponente reagiert.
 *
 * Die Klick-/Event-Listener sind immer registriert — ohne geladenes
 * gtag.js sind sie ein No-Op.
 *
 * Conversion-IDs (Stand: aus Google-Ads-Konto übergeben):
 *   Basis:                AW-850199230
 *   Kontaktformular:      AW-850199230 (Custom-Event "pb:contact-form-success" + /danke)
 *   Anruf (tel:):         AW-850339404 + AW-849433151
 *   E-Mail (mailto:):     AW-850326666
 *   WhatsApp:             AW-849434126
 */

const BASE_ID = "AW-850199230";
const CONFIG_IDS = [
  "AW-850199230",
  "AW-850339404",
  "AW-850326666",
  "AW-849433151",
  "AW-849434126",
] as const;
const CONTACT_FORM_SEND_TO = "AW-850199230";
const TEL_SEND_TO = ["AW-850339404", "AW-849433151"] as const;
const MAIL_SEND_TO = "AW-850326666";
const WHATSAPP_SEND_TO = "AW-849434126";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __pbGtagLoaded?: boolean;
    __pbAdsListenersBound?: boolean;
  }
}

function loadGtag() {
  if (typeof window === "undefined") return;
  if (window.__pbGtagLoaded) return;
  window.__pbGtagLoaded = true;

  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    window.dataLayer!.push(args);
  };
  window.gtag = gtag;
  gtag("js", new Date());
  for (const id of CONFIG_IDS) gtag("config", id);

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${BASE_ID}`;
  const first = document.getElementsByTagName("script")[0];
  first?.parentNode?.insertBefore(s, first);
}

function fire(sendTo: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: sendTo });
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
        for (const id of TEL_SEND_TO) fire(id);
      } else if (href.startsWith("mailto:")) {
        fire(MAIL_SEND_TO);
      } else if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        fire(WHATSAPP_SEND_TO);
      }
    },
    true,
  );

  window.addEventListener("pb:contact-form-success", () => {
    fire(CONTACT_FORM_SEND_TO);
  });

  const path = location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/danke") {
    let tries = 0;
    const attempt = () => {
      if (typeof window.gtag === "function") {
        fire(CONTACT_FORM_SEND_TO);
        return;
      }
      if (++tries < 20) setTimeout(attempt, 500);
    };
    attempt();
  }
}

export default function GoogleAdsTag() {
  useEffect(() => {
    bindListeners();
    if (hasConsent("marketing")) loadGtag();
    const onConsent = () => {
      if (hasConsent("marketing")) loadGtag();
    };
    window.addEventListener("pb-consent-changed", onConsent);
    return () => window.removeEventListener("pb-consent-changed", onConsent);
  }, []);
  return null;
}
