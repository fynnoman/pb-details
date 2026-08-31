"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";
import type { HomeData, SiteSettings } from "@/lib/site-types";
import EditableText from "./edit/EditableText";

export default function Anspruch({
  settings,
  home,
}: {
  settings: SiteSettings;
  home?: HomeData;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.15, 1.05]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  const totalReviews =
    (settings.provenExpert?.count || 0) +
    (settings.wkdb?.count || 0) +
    (settings.google?.count || 0);

  const t = home?.anspruch || {};
  const kicker = t.kicker || "Unser Anspruch";
  const title = t.title || "Kompromisslose Qualität bis ins Detail.";
  const titleHighlight = t.titleHighlight || "bis ins Detail.";
  const para1 = t.para1 || "Unser Qualitäts- und Leistungsanspruch beginnt dort, wo andere ihre Arbeit bereits als beendet ansehen. Wir nehmen uns die Zeit, die eine perfekte Aufbereitung braucht, und hören erst auf, wenn das Ergebnis stimmt.";
  const para2 = t.para2 || 'Da wir ausschließlich private Kundenfahrzeuge betreuen – darunter viele Sportwagen, Oldtimer und Luxusfahrzeuge – ist Ihr Fahrzeug bei uns in besten Händen. Billig kann jeder – deshalb lautet unser Motto: „Glanz oder gar nicht!"';
  const quoteText = t.quoteText || "„Für andere reicht das Erzählte,\nfür uns zählt das Erreichte.“";
  const badgeLabel = t.badgeLabel || "Weiterempfehlung";

  // Titel ohne den Highlight-Teil (für styled render)
  const titleBase = titleHighlight && title.endsWith(titleHighlight)
    ? title.slice(0, title.length - titleHighlight.length).trim()
    : title;

  return (
    <section
      id="ueber-uns"
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-44 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/5] sm:aspect-[4/5] rounded-2xl sm:rounded-[2rem] overflow-hidden">
              <motion.img
                src="/images/team/karsten-thomas-empfang.jpg"
                alt="Karsten Becker und Thomas Paul, Gründer von PB Fahrzeugpflege Saarlouis, am Empfang vor Zertifikatswand in Ensdorf"
                style={{ y: imgY, scale: imgScale }}
                className="absolute inset-0 w-full h-full object-cover object-top will-change-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              <motion.div
                style={{ rotate: badgeRotate }}
                className="absolute right-3 bottom-3 sm:right-8 sm:bottom-8 glass-strong rounded-2xl px-4 py-3 sm:px-5 sm:py-4 max-w-[200px] sm:max-w-[240px] shadow-xl"
              >
                <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)] mb-1">
                  <EditableText globalSlug="home" path="anspruch.badgeLabel" value={badgeLabel} />
                </div>
                <div className="font-display text-3xl sm:text-4xl text-chrome leading-none">
                  {settings.recommendation}
                  <span className="text-[var(--gold)]">%</span>
                </div>
                <div className="text-xs text-[var(--ink-dim)] mt-2">
                  aus {totalReviews > 0 ? totalReviews : settings.provenExpert?.count} verifizierten Bewertungen
                </div>
              </motion.div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
            <Reveal>
              <p className="text-[10px] sm:text-[11px] tracking-[0.32em] sm:tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-4 sm:mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                <EditableText globalSlug="home" path="anspruch.kicker" value={kicker} />
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(1.75rem,7vw,3.6rem)] leading-[1.05] tracking-[-0.02em] max-w-[18ch]">
                <EditableText
                  globalSlug="home"
                  path="anspruch.title"
                  value={title}
                  render={() => (
                    <>
                      {titleBase} <span className="italic text-gold">{titleHighlight}</span>
                    </>
                  )}
                />
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 sm:mt-8 text-[var(--ink-dim)] text-base sm:text-lg leading-relaxed max-w-xl">
                <EditableText globalSlug="home" path="anspruch.para1" value={para1} multiline />
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 text-sm sm:text-base text-[var(--ink-dim)] leading-relaxed max-w-xl">
                <EditableText globalSlug="home" path="anspruch.para2" value={para2} multiline />
              </p>
            </Reveal>
            {settings.founders && (
              <Reveal delay={0.2}>
                <blockquote className="mt-8 sm:mt-10 pl-5 sm:pl-6 border-l border-[var(--gold)]/40">
                  <p className="font-display italic text-lg sm:text-2xl md:text-3xl leading-snug text-chrome">
                    <EditableText
                      globalSlug="home"
                      path="anspruch.quoteText"
                      value={quoteText}
                      multiline
                      render={(v) => (
                        <>
                          {v.split("\n").map((line, i) => (
                            <span key={i}>
                              {line}
                              {i < v.split("\n").length - 1 && <br />}
                            </span>
                          ))}
                        </>
                      )}
                    />
                  </p>
                  <footer className="mt-3 text-[11px] tracking-[0.3em] uppercase text-[var(--ink-mute)]">
                    <EditableText globalSlug="settings" path="founders" value={settings.founders} />
                  </footer>
                </blockquote>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
