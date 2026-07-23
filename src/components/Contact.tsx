"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Reveal from "./Reveal";

const services = [
  "Keramikversiegelung",
  "Nanoversiegelung",
  "Fahrzeugaufbereitung",
  "Lack- & Beulendoktor",
  "Unfallschaden",
  "Beratung",
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.12]);

  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [service, setService] = useState<string>("Keramikversiegelung");

  return (
    <section id="kontakt" ref={ref} className="relative py-32 sm:py-44 overflow-hidden">
      {/* Background video */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 will-change-transform"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1493238792000-8113da705763?w=2000&q=85&auto=format&fit=crop"
          className="w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3843433/3843433-hd_1920_1080_24fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Weich ausblendende Ränder, Mitte deutlich heller */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left — Copy + call button */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                Jetzt Anfrage stellen
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.0] tracking-[-0.03em]">
                Sprechen wir über Ihr <span className="italic text-gold">Fahrzeug.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-[var(--ink-dim)] leading-relaxed max-w-md">
                Schreiben Sie uns kurz, was Sie brauchen — oder rufen Sie direkt
                an. Eine unverbindliche Begutachtung ist auch ohne Termin
                möglich.
              </p>
            </Reveal>

            {/* Big call button */}
            <Reveal delay={0.15}>
              <div className="mt-10 glass-strong rounded-[1.75rem] p-6 sm:p-7">
                <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)] mb-2">
                  Direkter Draht
                </div>
                <a
                  href="tel:+4968314612 29"
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
                      Anrufen — Mo–Sa
                    </span>
                    <span className="font-display text-2xl sm:text-3xl text-chrome tracking-[-0.01em]">
                      +49 (0) 6831 461229
                    </span>
                  </span>
                </a>
                <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between text-xs">
                  <a
                    href="mailto:info@pb-fahrzeugpflege.de"
                    className="text-[var(--ink-dim)] hover:text-[var(--ink)]"
                  >
                    info@pb-fahrzeugpflege.de
                  </a>
                  <span className="text-[var(--ink-mute)]">Antwort in 24 h</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — Form */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal delay={0.05}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStatus("sent");
                }}
                className="glass-strong rounded-[1.75rem] p-6 sm:p-10 relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <label className="col-span-2 sm:col-span-1 flex flex-col gap-2 text-xs tracking-[0.24em] uppercase text-[var(--ink-mute)]">
                    Name
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Ihr Name"
                      className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-mute)] focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                    />
                  </label>
                  <label className="col-span-2 sm:col-span-1 flex flex-col gap-2 text-xs tracking-[0.24em] uppercase text-[var(--ink-mute)]">
                    Telefon
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Rückrufnummer"
                      className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-mute)] focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                    />
                  </label>
                  <label className="col-span-2 flex flex-col gap-2 text-xs tracking-[0.24em] uppercase text-[var(--ink-mute)]">
                    E-Mail
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="ihre@mail.de"
                      className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-mute)] focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                    />
                  </label>
                  <label className="col-span-2 flex flex-col gap-2 text-xs tracking-[0.24em] uppercase text-[var(--ink-mute)]">
                    Fahrzeug
                    <input
                      name="vehicle"
                      type="text"
                      placeholder="Marke, Modell, Baujahr"
                      className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-mute)] focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                    />
                  </label>

                  <div className="col-span-2 flex flex-col gap-3 text-xs tracking-[0.24em] uppercase text-[var(--ink-mute)]">
                    Gewünschte Leistung
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setService(s)}
                          className={`px-4 py-2 rounded-full text-[11px] tracking-wider transition-all ${
                            service === s
                              ? "bg-gradient-to-b from-[#f4dcb2] to-[#a2814f] text-black border border-transparent"
                              : "glass-flat text-[var(--ink-dim)] hover:text-[var(--ink)]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="service" value={service} />
                  </div>

                  <label className="col-span-2 flex flex-col gap-2 text-xs tracking-[0.24em] uppercase text-[var(--ink-mute)]">
                    Nachricht
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Kurzer Kontext zu Fahrzeug und Wunsch — Zustand, Ziel (Verkauf, Werterhalt, etc.)"
                      className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-mute)] focus:outline-none focus:border-[var(--gold)]/50 transition-colors resize-none"
                    />
                  </label>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-[11px] text-[var(--ink-mute)] max-w-sm leading-relaxed">
                    Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
                    Wir melden uns i. d. R. innerhalb von 24 h zurück.
                  </p>
                  <button type="submit" className="btn-gold shrink-0">
                    Anfrage senden
                    <span aria-hidden>→</span>
                  </button>
                </div>

                {status === "sent" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 glass rounded-xl px-4 py-3 text-sm text-[var(--ink)] flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-[var(--gold)] flex items-center justify-center text-black text-[10px]">
                      ✓
                    </span>
                    Danke für Ihre Anfrage. Wir melden uns kurzfristig zurück.
                  </motion.div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
