"use client";

import Reveal from "./Reveal";
import { SITE } from "@/lib/site";
import CalendlyEmbed from "./CalendlyEmbed";

export default function Contact() {
  const hasCalendly = Boolean(SITE.calendly.url);

  return (
    <section id="kontakt" className="relative py-32 sm:py-44 overflow-hidden">
      {/* Statischer Foto-Background (kein Scroll-Handler mehr) */}
      <div aria-hidden className="absolute inset-0">
        <img
          src="/images/fahrzeuge/roter-tesla-model-3-aufbereitung.jpg"
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left — Copy + Direktdraht */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                Termin vereinbaren
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.0] tracking-[-0.03em]">
                Sprechen wir über Ihr <span className="italic text-gold">Fahrzeug.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-[var(--ink-dim)] leading-relaxed max-w-md">
                Wählen Sie direkt einen Termin aus – oder rufen Sie an. Eine
                unverbindliche Begutachtung ist auch ohne Termin möglich,
                während unserer Öffnungszeiten.
              </p>
            </Reveal>

            {/* Direktdraht-Block */}
            <Reveal delay={0.15}>
              <div className="mt-10 glass-strong rounded-[1.75rem] p-6 sm:p-7">
                <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)] mb-2">
                  Direkter Draht
                </div>
                <a
                  href={SITE.phone.href}
                  className="group flex items-center gap-5"
                >
                  <span className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#f5e2b8] via-[#d4b483] to-[#8a6a3f] flex items-center justify-center text-[#100e0a] shrink-0 shadow-lg">
                    <span
                      className="absolute inset-0 rounded-full bg-[var(--gold)]/40 blur-md opacity-60 group-hover:opacity-100 transition-opacity"
                      aria-hidden
                    />
                    <svg
                      viewBox="0 0 24 24"
                      className="relative w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.89.33 1.76.63 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.48a2 2 0 0 1 2.11-.45c.84.3 1.71.51 2.6.63A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[11px] tracking-[0.32em] uppercase text-[var(--ink-mute)]">
                      Anrufen · Mo–Sa
                    </span>
                    <span className="font-display text-2xl sm:text-3xl text-chrome tracking-[-0.01em]">
                      {SITE.phone.display}
                    </span>
                  </span>
                </a>
                <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between gap-3 text-xs flex-wrap">
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noopener"
                    className="text-[var(--ink-dim)] hover:text-[var(--ink)]"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-[var(--ink-dim)] hover:text-[var(--ink)]"
                  >
                    {SITE.email}
                  </a>
                  <span className="text-[var(--ink-mute)]">Antwort in 24 h</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — Calendly-Widget oder Fallback */}
          <div className="col-span-12 lg:col-span-7" id="termin">
            <Reveal delay={0.05}>
              {hasCalendly ? (
                <div className="glass-strong rounded-[1.75rem] p-4 sm:p-6">
                  <CalendlyEmbed />
                </div>
              ) : (
                <div className="glass-strong rounded-[1.75rem] p-8 sm:p-10">
                  <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                    Online-Terminbuchung
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl leading-tight tracking-[-0.015em]">
                    Termin direkt online reservieren
                  </h3>
                  <p className="mt-5 text-[var(--ink-dim)] leading-relaxed">
                    Die Online-Terminbuchung wird in Kürze hier verfügbar
                    sein. Bis dahin erreichen Sie uns direkt telefonisch,
                    per WhatsApp oder besuchen uns ohne Termin während
                    unserer Öffnungszeiten.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href={SITE.phone.href} className="btn-gold">
                      Jetzt anrufen
                      <span aria-hidden>→</span>
                    </a>
                    <a
                      href={SITE.whatsapp}
                      target="_blank"
                      rel="noopener"
                      className="btn-glass"
                    >
                      WhatsApp öffnen
                    </a>
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
