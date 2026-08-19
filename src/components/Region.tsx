"use client";

import Reveal from "./Reveal";
import { SITE } from "@/lib/site";

const regions = [
  "Saarlouis",
  "Saarbrücken",
  "Merzig",
  "St. Wendel",
  "Dillingen",
  "Luxemburg",
  "Trier",
  "Grenznaher Raum",
];

export default function Region() {
  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      {/* Statischer Gradient-Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 70% 30%, rgba(212,180,131,0.08), transparent 55%), radial-gradient(900px 700px at 20% 80%, rgba(245,226,184,0.05), transparent 60%), linear-gradient(180deg, var(--bg) 0%, #0a0906 55%, var(--bg) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                Einzugsgebiet
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02] tracking-[-0.025em]">
                Saarland <span className="italic text-gold">& Luxemburg.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[var(--ink-dim)] leading-relaxed max-w-lg">
                Sie finden uns in der Provinzialstraße 243 in 66806 Ensdorf –
                direkt bei Saarlouis. Zu uns kommen Kunden aus dem gesamten
                Saarland, u. a. aus Saarlouis, Saarbrücken, Merzig und St.
                Wendel, sowie aus Luxemburg und dem grenznahen Raum.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-2">
                {regions.map((r) => (
                  <span
                    key={r}
                    className="glass-flat rounded-full px-4 py-1.5 text-xs tracking-wide text-[var(--ink-dim)]"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Reveal delay={0.1}>
              <div className="glass-strong rounded-[1.75rem] p-8">
                <div className="text-xs tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                  Standort
                </div>
                <div className="font-display text-2xl leading-tight">
                  PB Fahrzeugpflege Saarlouis
                </div>
                <div className="mt-3 text-[var(--ink-dim)] leading-relaxed">
                  Provinzialstraße 243
                  <br />
                  66806 Ensdorf
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-mute)]">Mo – Fr</span>
                    <span className="text-[var(--ink)]">{SITE.hours.weekday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-mute)]">Sa</span>
                    <span className="text-[var(--ink)]">{SITE.hours.saturday}</span>
                  </div>
                  <div className="text-[11px] text-[var(--ink-mute)] pt-2">
                    Abweichungen möglich – bitte vorab kurz anrufen.
                  </div>
                  {SITE.hours.holidayNotice && (
                    <div className="mt-3 rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/[0.05] px-3 py-2.5 text-xs text-[var(--ink)] leading-snug">
                      <span className="text-[var(--gold)] font-semibold">
                        Feiertagshinweis:
                      </span>{" "}
                      {SITE.hours.holidayNotice.text}
                    </div>
                  )}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={SITE.social.googleMaps}
                    target="_blank"
                    rel="noopener"
                    className="btn-glass text-sm py-2.5 px-4"
                  >
                    In Karten öffnen →
                  </a>
                  <a href={SITE.phone.href} className="btn-gold text-sm py-2.5 px-4">
                    Anrufen
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
