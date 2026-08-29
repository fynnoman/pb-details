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

  const reasons = [
    { headline: `Seit ${settings.founded || 1997}`, body: `Inhabergeführt${settings.founders ? ` von ${settings.founders}` : ""}` },
    {
      headline: totalReviews > 0 ? String(totalReviews) : String(settings.provenExpert?.count || ""),
      body: "positive, verifizierte Kundenbewertungen",
    },
    {
      headline: `${settings.recommendation} %`,
      body: "Weiterempfehlungsquote",
    },
    {
      headline: "Q-Siegel",
      body: "Deutschlands erster Fahrzeugpflegebetrieb mit Q-Siegel",
    },
  ];

  return (
    <section ref={ref} className="relative py-16 sm:py-24 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-12 sm:mb-16 items-end">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
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
            className="col-span-12 md:col-span-7 relative aspect-[16/12] rounded-[1.75rem] overflow-hidden bg-gradient-to-br from-[#1a1814] via-[#100e0a] to-black"
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

            <div className="absolute inset-0 flex items-center justify-center p-8">
              <motion.img
                src="/images/logo/pb-fahrzeugpflege-logo-black.png"
                alt="PB Fahrzeugpflege Saarlouis – seit 1997"
                style={{ scale: imgScale }}
                className="max-h-[70%] max-w-[60%] w-auto object-contain drop-shadow-[0_10px_40px_rgba(212,180,131,0.30)]"
                loading="lazy"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <div className="glass rounded-2xl px-5 py-4 inline-flex flex-col">
                <span className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)]">
                  <EditableText globalSlug="home" path="mottoLabel" value={mottoLabelText} />
                </span>
                <span className="font-display text-xl sm:text-2xl italic text-chrome mt-1">
                  <EditableText globalSlug="home" path="mottoText" value={mottoTextText} />
                </span>
              </div>
            </div>
          </motion.div>

          <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-4 sm:gap-6 content-start">
            {reasons.map((r, i) => (
              <motion.div
                key={r.headline}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                className="glass rounded-[1.25rem] p-5 sm:p-6 min-h-[130px] flex flex-col justify-between"
              >
                <div className="font-display text-3xl sm:text-4xl leading-none text-chrome">
                  {r.headline}
                </div>
                <div className="text-xs text-[var(--ink-dim)] mt-3 leading-relaxed">
                  {r.body}
                </div>
              </motion.div>
            ))}
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
