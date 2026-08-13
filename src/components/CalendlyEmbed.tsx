"use client";

import Script from "next/script";
import { SITE } from "@/lib/site";

type Props = {
  /** Höhe des Widgets. */
  height?: number;
};

/**
 * Calendly Inline-Widget. Rendert nichts, solange SITE.calendly.url
 * leer ist – dann übernimmt die aufrufende Sektion den Fallback.
 */
export default function CalendlyEmbed({ height = 720 }: Props) {
  const url = SITE.calendly.url;
  if (!url) return null;
  return (
    <>
      <div
        className="calendly-inline-widget rounded-[1.75rem] overflow-hidden bg-white"
        data-url={`${url}?hide_gdpr_banner=1&background_color=0d0c0a&text_color=e8e5df&primary_color=d4b483`}
        style={{ minWidth: 320, height }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
