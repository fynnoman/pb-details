"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

/**
 * Schriftliches Kontaktformular als Alternative zur Online-
 * Terminbuchung. POST an /api/contact/ mit Honeypot-Feld, Rate-Limit
 * (5/h/IP) und optionaler hCaptcha-Prüfung.
 */
export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstname: fd.get("firstname"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          vehicle: fd.get("vehicle"),
          message: fd.get("message"),
          website: fd.get("website"),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(
          json.error ??
            "Es ist ein Fehler aufgetreten. Bitte rufen Sie uns direkt an.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung oder rufen Sie uns an.",
      );
    }
  }

  return (
    <section id="nachricht" className="relative py-16 sm:py-24 lg:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                Oder schreiben Sie uns
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
                Schriftliche{" "}
                <span className="italic text-gold">Anfrage.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[var(--ink-dim)] leading-relaxed">
                Sie können lieber schreiben statt anrufen oder buchen? Kein
                Problem. Wir melden uns in der Regel innerhalb von 24 Stunden
                zurück.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-xs text-[var(--ink-mute)] leading-relaxed">
                Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage
                verwendet. Mehr in unserer{" "}
                <a
                  href="/datenschutzerklaerung/"
                  className="text-[var(--ink-dim)] hover:text-[var(--ink)] underline underline-offset-4"
                >
                  Datenschutzerklärung
                </a>
                .
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <Reveal delay={0.05}>
              <form
                ref={formRef}
                onSubmit={onSubmit}
                className="glass-strong rounded-[1.75rem] p-5 sm:p-8 lg:p-10 relative"
              >
                {/* Honeypot: für Menschen unsichtbar */}
                <label
                  className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  Website (bitte leer lassen)
                  <input
                    type="text"
                    name="website"
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="col-span-2 sm:col-span-1 flex flex-col gap-2 text-xs tracking-[0.24em] uppercase text-[var(--ink-mute)]">
                    Vorname *
                    <input
                      required
                      name="firstname"
                      type="text"
                      placeholder="Ihr Vorname"
                      autoComplete="given-name"
                      className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-[var(--ink)] placeholder:text-[var(--ink-mute)] focus:outline-none focus:border-[var(--gold)]/50 transition-colors min-h-[48px]"
                    />
                  </label>
                  <label className="col-span-2 sm:col-span-1 flex flex-col gap-2 text-xs tracking-[0.24em] uppercase text-[var(--ink-mute)]">
                    Telefon
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Rückrufnummer"
                      autoComplete="tel"
                      className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-[var(--ink)] placeholder:text-[var(--ink-mute)] focus:outline-none focus:border-[var(--gold)]/50 transition-colors min-h-[48px]"
                    />
                  </label>
                  <label className="col-span-2 flex flex-col gap-2 text-xs tracking-[0.24em] uppercase text-[var(--ink-mute)]">
                    E-Mail *
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="ihre@mail.de"
                      autoComplete="email"
                      className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-[var(--ink)] placeholder:text-[var(--ink-mute)] focus:outline-none focus:border-[var(--gold)]/50 transition-colors min-h-[48px]"
                    />
                  </label>
                  <label className="col-span-2 flex flex-col gap-2 text-xs tracking-[0.24em] uppercase text-[var(--ink-mute)]">
                    Fahrzeug (optional)
                    <input
                      name="vehicle"
                      type="text"
                      placeholder="Marke, Modell, Baujahr"
                      className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-[var(--ink)] placeholder:text-[var(--ink-mute)] focus:outline-none focus:border-[var(--gold)]/50 transition-colors min-h-[48px]"
                    />
                  </label>
                  <label className="col-span-2 flex flex-col gap-2 text-xs tracking-[0.24em] uppercase text-[var(--ink-mute)]">
                    Nachricht *
                    <textarea
                      required
                      name="message"
                      rows={6}
                      placeholder="Kurzer Kontext zu Fahrzeug und Wunsch – Zustand, Ziel (Verkauf, Werterhalt, etc.)"
                      className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-[var(--ink)] placeholder:text-[var(--ink-mute)] focus:outline-none focus:border-[var(--gold)]/50 transition-colors resize-y min-h-[10rem]"
                    />
                  </label>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-[11px] text-[var(--ink-mute)] max-w-sm leading-relaxed">
                    Informationen zur Verarbeitung Ihrer Daten finden Sie in
                    unserer Datenschutzerklärung. Wir melden uns i. d. R.
                    innerhalb von 24 h zurück.
                  </p>
                  <button
                    type="submit"
                    className="btn-gold shrink-0 w-full sm:w-auto justify-center min-h-[48px]"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Wird gesendet …" : "Anfrage senden"}
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
                {status === "error" && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-[var(--ink)]"
                  >
                    {errorMessage}
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
