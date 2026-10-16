"use client";

import { useEffect } from "react";
import { getConsent, hasConsent } from "./CookieBanner";

/**
 * Google Tag Manager mit eigenem Consent-Gate.
 * Container-ID aus NEXT_PUBLIC_GTM_ID.
 *
 * GTM wird dynamisch geladen, sobald der Nutzer entweder Analyse oder
 * Marketing akzeptiert — beide Kategorien laufen in diesem Container.
 * Der aktuelle Consent-Status wird in den dataLayer gepusht, damit
 * Trigger in GTM darauf reagieren können.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    __pbGtmLoaded?: boolean;
  }
}

function pushConsent() {
  if (typeof window === "undefined") return;
  const c = getConsent();
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "pb_consent",
    pb_consent_analytics: c?.analytics === true,
    pb_consent_marketing: c?.marketing === true,
  });
}

function loadGtm(id: string) {
  if (typeof window === "undefined") return;
  if (window.__pbGtmLoaded) return;
  window.__pbGtmLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  const first = document.getElementsByTagName("script")[0];
  first?.parentNode?.insertBefore(s, first);
}

export default function GoogleTagManager() {
  const id = process.env.NEXT_PUBLIC_GTM_ID;

  useEffect(() => {
    if (!id) return;
    const sync = () => {
      pushConsent();
      if (hasConsent("analytics") || hasConsent("marketing")) loadGtm(id);
    };
    sync();
    window.addEventListener("pb-consent-changed", sync);
    return () => window.removeEventListener("pb-consent-changed", sync);
  }, [id]);

  if (!id) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${id}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
