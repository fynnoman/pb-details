"use client";

import Reveal from "./Reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { HomeData, SiteSettings } from "@/lib/site-types";
import EditableText from "./edit/EditableText";

export default function WhyUs({
  heading,
  bullets,
  mottoLabel = "Motto",
  mottoText,
  settings,
  home,
}: {
  heading?: string;
  bullets?: Array<{ text: string }>;
  mottoLabel?: string;
  mottoText?: string;
  settings: SiteSettings;
  home?: HomeData;
}) {
  const kickerText = home?.whyUs?.kicker || "Warum PB Fahrzeugpflege";
  const headingText = heading || "Handwerk, das seit fast 30 Jahren Vertrauen schafft.";
  const mottoLabelText = mottoLabel || "Motto";
  const mottoTextText = mottoText || "";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.02, 1.15]);

  const totalReviews =
    (settings.provenExpert?.count || 0) +
    (settings.wkdb?.count || 0) +
    (settings.google?.count || 0);

  const googleWriteReviewUrl =
    "https://search.google.com/local/writereview?placeid=ChIJrXjI7NyolUcRW7NcbxMyZ8c";
  const googleReviewsUrl =
    settings.google?.url || settings.google?.mapsUrl || undefined;

  const reasons: Array<{
    headline: string;
    body: string;
    href?: string;
    hint?: string;
  }> = [
    {
      headline: `Seit ${settings.founded || 1997}`,
      body: `Inhabergeführt${settings.founders ? ` — gegründet von ${settings.founders}` : ""}`,
    },
    {
      headline: totalReviews > 0 ? String(totalReviews) : String(settings.provenExpert?.count || ""),
      body: "positive, verifizierte Kundenbewertungen aus ProvenExpert, Google und werkenntdenBESTEN",
    },
    {
      headline: `${settings.recommendation} %`,
      body: "Weiterempfehlungsquote",
      href: googleWriteReviewUrl,
      hint: "Jetzt auf Google bewerten",
    },
    {
      headline: "Q-Siegel",
      body: "Deutschlands erster Fahrzeugpflegebetrieb mit Q-Siegel",
    },
  ];

  return (
    <section ref={ref} className="relative py-16 sm:py-24 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-8 sm:mb-16 items-end">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <p className="text-[10px] sm:text-[11px] tracking-[0.32em] sm:tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-4 sm:mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                <EditableText globalSlug="home" path="whyUs.kicker" value={kickerText} />
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(1.75rem,7vw,3.8rem)] leading-[1.05] tracking-[-0.025em] max-w-[18ch]">
                <EditableText globalSlug="home" path="whyUsHeading" value={headingText} multiline />
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="col-span-12 md:col-span-7 relative aspect-[16/12] rounded-2xl sm:rounded-[1.75rem] overflow-hidden bg-gradient-to-br from-[#1a1814] via-[#100e0a] to-black"
          >
            <motion.div
              aria-hidden
              style={{ y: imgY, scale: imgScale }}
              className="absolute inset-0 will-change-transform"
            >
              <div
                className="absolute inset-0 opacity-90"
                style={{
                  background:
                    "radial-gradient(900px 600px at 50% 40%, rgba(212,180,131,0.28), transparent 55%), radial-gradient(700px 500px at 80% 80%, rgba(245,226,184,0.12), transparent 60%)",
                }}
              />
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
              <motion.img
                src="/images/logo/pb-fahrzeugpflege-logo-black.png"
                alt="PB Fahrzeugpflege Saarlouis – seit 1997"
                style={{ scale: imgScale }}
                className="max-h-[60%] sm:max-h-[70%] max-w-[70%] sm:max-w-[60%] w-auto object-contain drop-shadow-[0_10px_40px_rgba(212,180,131,0.30)]"
                loading="lazy"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8">
              <div className="glass rounded-2xl px-4 sm:px-5 py-3 sm:py-4 inline-flex flex-col max-w-full">
                <span className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)]">
                  <EditableText globalSlug="home" path="mottoLabel" value={mottoLabelText} />
                </span>
                <span className="font-display text-base sm:text-2xl italic text-chrome mt-1 leading-snug">
                  <EditableText globalSlug="home" path="mottoText" value={mottoTextText} />
                </span>
              </div>
            </div>
          </motion.div>

          <div className="col-span-12 md:col-span-5 flex flex-col gap-4 sm:gap-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 content-start">
              {reasons.map((r, i) => {
                const Comp = r.href ? motion.a : motion.div;
                const linkProps = r.href
                  ? {
                      href: r.href,
                      target: "_blank",
                      rel: "noopener",
                      "aria-label": `${r.headline} – ${r.body}. ${r.hint || "Details ansehen"}.`,
                    }
                  : {};
                return (
                  <Comp
                    key={r.headline}
                    {...linkProps}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.9, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                    className={`glass rounded-2xl sm:rounded-[1.25rem] p-4 sm:p-6 min-h-[120px] sm:min-h-[130px] h-full flex flex-col justify-between ${
                      r.href
                        ? "hover:ring-1 hover:ring-[var(--gold)]/40 transition-all group cursor-pointer"
                        : ""
                    }`}
                  >
                    <div className="font-display text-xl sm:text-4xl leading-none text-chrome break-words">
                      {r.headline}
                    </div>
                    <div className="text-[11px] sm:text-xs text-[var(--ink-dim)] mt-2 sm:mt-3 leading-relaxed">
                      {r.body}
                    </div>
                    {r.href && (
                      <div className="mt-3 flex items-center gap-1.5 text-[10px] tracking-[0.24em] uppercase text-[var(--gold)]/80 group-hover:text-[var(--gold)] transition-colors">
                        <svg viewBox="0 0 24 24" className="w-3 h-3" aria-hidden>
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.15-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.85 14.1c-.22-.66-.34-1.36-.34-2.1s.12-1.44.34-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.67-2.84z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.67 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
                        </svg>
                        <span>
                          {r.href?.includes("writereview")
                            ? "Jetzt bewerten"
                            : "Google"}
                        </span>
                        <span
                          aria-hidden
                          className="ml-auto transition-transform group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </div>
                    )}
                  </Comp>
                );
              })}
            </div>

            {settings.google && (
              <motion.a
                href={settings.google.url || settings.google.mapsUrl || "#"}
                target="_blank"
                rel="noopener"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                className="glass rounded-[1.25rem] px-5 py-4 flex items-center gap-4 hover:ring-1 hover:ring-[var(--gold)]/40 transition-all group min-h-[64px]"
              >
                <span
                  aria-hidden
                  className="shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.15-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.85 14.1c-.22-.66-.34-1.36-.34-2.1s.12-1.44.34-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.67-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.67 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] tracking-[0.28em] uppercase text-[var(--gold)] mb-0.5">
                    Google-Rezensionen
                  </div>
                  <div className="text-sm text-[var(--ink)] leading-snug">
                    {settings.google.count
                      ? `${settings.google.count} Bewertungen ansehen`
                      : "Alle Bewertungen ansehen"}
                  </div>
                </div>
                <span
                  aria-hidden
                  className="shrink-0 text-[var(--ink-dim)] group-hover:text-[var(--gold)] group-hover:translate-x-1 transition-all"
                >
                  →
                </span>
              </motion.a>
            )}
          </div>

          {bullets && bullets.length > 0 && (
            <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-2">
              {bullets.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: i * 0.04, ease: [0.2, 0.7, 0.2, 1] }}
                  className="glass-flat rounded-2xl px-5 py-4 flex items-start gap-3 text-sm text-[var(--ink)]"
                >
                  <span className="mt-1 shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-[#f5e2b8] to-[#8a6a3f] flex items-center justify-center text-[8px] text-black">
                    ✓
                  </span>
                  <span className="text-[var(--ink-dim)]">
                    <EditableText
                      globalSlug="home"
                      path={`whyUsBullets.${i}.text`}
                      value={b.text}
                    />
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
