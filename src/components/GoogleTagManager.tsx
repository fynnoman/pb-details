"use client";

import { useEffect } from "react";
import { hasConsent } from "./CookieBanner";

/**
 * Google Tag Manager mit eigenem Consent-Gate.
 * Container-ID aus NEXT_PUBLIC_GTM_ID.
 *
 * GTM wird dynamisch erst dann geladen, wenn der Nutzer im eigenen
 * CookieBanner die Analyse-Kategorie akzeptiert. Das Signal kommt über
 * das `pb-consent-changed`-Event. Ohne Einwilligung passiert nichts.
 */

declare global {
  interface Window {
    __pbGtmLoaded?: boolean;
  }
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
    if (hasConsent("analytics")) loadGtm(id);
    const onConsent = () => {
      if (hasConsent("analytics")) loadGtm(id);
    };
    window.addEventListener("pb-consent-changed", onConsent);
    return () => window.removeEventListener("pb-consent-changed", onConsent);
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
