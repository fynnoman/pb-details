"use client";

import Reveal from "./Reveal";
import type { HomeData, SiteSettings } from "@/lib/site-types";
import CalendlyEmbed from "./CalendlyEmbed";
import EditableText from "./edit/EditableText";

export default function Contact({
  settings,
  home,
}: {
  settings: SiteSettings;
  home?: HomeData;
}) {
  const hasCalendly = Boolean(settings.calendly?.url);
  const t = home?.contact || {};
  const kicker = t.kicker || "Termin vereinbaren";
  const title = t.title || "Sprechen wir über Ihr";
  const titleHighlight = t.titleHighlight || "Fahrzeug.";
  const intro = t.intro || "Wählen Sie direkt einen Termin aus – oder rufen Sie an. Eine unverbindliche Begutachtung ist auch ohne Termin möglich, während unserer Öffnungszeiten.";
  const directLabel = t.directLabel || "Direkter Draht";
  const callAt = t.callAt || "Anrufen · Mo–Sa";
  const response = t.response || "Antwort in 24 h";

  return (
    <section id="kontakt" className="relative py-16 sm:py-24 lg:py-44 overflow-hidden">
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

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <p className="text-[10px] sm:text-[11px] tracking-[0.32em] sm:tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-4 sm:mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                <EditableText globalSlug="home" path="contact.kicker" value={kicker} />
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(1.9rem,8vw,4.2rem)] leading-[1.05] tracking-[-0.03em]">
                <EditableText
                  globalSlug="home"
                  path="contact.title"
                  value={title}
                  render={(v) => (
                    <>
                      {v} <span className="italic text-gold">{titleHighlight}</span>
                    </>
                  )}
                />
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 sm:mt-8 text-sm sm:text-base text-[var(--ink-dim)] leading-relaxed max-w-md">
                <EditableText globalSlug="home" path="contact.intro" value={intro} multiline />
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 sm:mt-10 glass-strong rounded-2xl sm:rounded-[1.75rem] p-5 sm:p-7">
                <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)] mb-2">
                  <EditableText globalSlug="home" path="contact.directLabel" value={directLabel} />
                </div>
                <a href={`tel:${settings.phone.e164}`} className="group flex items-center gap-4 sm:gap-5 min-h-[56px]">
                  <span className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#f5e2b8] via-[#d4b483] to-[#8a6a3f] flex items-center justify-center text-[#100e0a] shrink-0 shadow-lg">
                    <span
                      className="absolute inset-0 rounded-full bg-[var(--gold)]/40 blur-md opacity-60 group-hover:opacity-100 transition-opacity"
                      aria-hidden
                    />
                    <svg
                      viewBox="0 0 24 24"
                      className="relative w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.89.33 1.76.63 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.48a2 2 0 0 1 2.11-.45c.84.3 1.71.51 2.6.63A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <span className="flex flex-col min-w-0">
                    <span className="text-[10px] sm:text-[11px] tracking-[0.28em] sm:tracking-[0.32em] uppercase text-[var(--ink-mute)]">
                      <EditableText globalSlug="home" path="contact.callAt" value={callAt} />
                    </span>
                    <span className="font-display text-[1.05rem] sm:text-2xl md:text-3xl text-chrome tracking-[-0.01em] truncate">
                      <EditableText globalSlug="settings" path="phone.display" value={settings.phone.display} />
                    </span>
                  </span>
                </a>
                <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between gap-3 text-xs flex-wrap">
                  {settings.whatsapp && (
                    <a
                      href={settings.whatsapp}
                      target="_blank"
                      rel="noopener"
                      className="text-[var(--ink-dim)] hover:text-[var(--ink)]"
                    >
                      WhatsApp
                    </a>
                  )}
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-[var(--ink-dim)] hover:text-[var(--ink)]"
                  >
                    <EditableText globalSlug="settings" path="email" value={settings.email} />
                  </a>
                  <span className="text-[var(--ink-mute)]">
                    <EditableText globalSlug="home" path="contact.response" value={response} />
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7" id="termin">
            <Reveal delay={0.05}>
              {hasCalendly ? (
                <div className="glass-strong rounded-2xl sm:rounded-[1.75rem] p-3 sm:p-6">
                  <CalendlyEmbed url={settings.calendly!.url!} />
                </div>
              ) : (
                <div className="glass-strong rounded-2xl sm:rounded-[1.75rem] p-6 sm:p-10">
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
                  <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                    <a
                      href={`tel:${settings.phone.e164}`}
                      className="btn-gold min-h-[48px] w-full sm:w-auto justify-center"
                    >
                      Jetzt anrufen
                      <span aria-hidden>→</span>
                    </a>
                    {settings.whatsapp && (
                      <a
                        href={settings.whatsapp}
                        target="_blank"
                        rel="noopener"
                        className="btn-glass min-h-[48px] w-full sm:w-auto justify-center"
                      >
                        WhatsApp öffnen
                      </a>
                    )}
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
