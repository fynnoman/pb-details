"use client";

import Link from "next/link";
import Reveal from "./Reveal";

const badges = [
  { src: "/images/badges/provenexpert-top-dienstleister-2023.png", alt: "ProvenExpert Top Dienstleister 2023" },
  { src: "/images/badges/provenexpert-top-empfehlung-2021.jpg", alt: "ProvenExpert Top Empfehlung 2021" },
  { src: "/images/badges/provenexpert-top-empfehlung-2019.jpg", alt: "ProvenExpert Top Empfehlung 2019" },
  { src: "/images/badges/werkenntdenbesten-badge.png", alt: "WerKenntDenBesten – Kunden-Empfehlungssiegel" },
  { src: "/images/badges/profi-badge.webp", alt: "Profi-Badge PB Fahrzeugpflege Saarlouis" },
  { src: "/images/urkunden/q-siegel-logo.png", alt: "Q-Siegel Servicequalität Deutschland" },
];

const stories = [
  {
    src: "/images/urkunden/brila-urkunde-keramikversiegelung.jpg",
    alt: "BRILA-Urkunde Keramikversiegelung für PB Fahrzeugpflege Saarlouis",
    label: "BRILA Certified Installer",
    text: "Zertifizierter Fachbetrieb für 9H-Keramikversiegelung.",
  },
  {
    src: "/images/urkunden/20-jahre-buergermeister-gratulation.jpg",
    alt: "20 Jahre PB Fahrzeugpflege Saarlouis – Bürgermeister Hartwin Faust gratuliert Karsten Becker und Thomas Paul",
    label: "20 Jahre Jubiläum",
    text: "Gratulation vom Ensdorfer Bürgermeister Hartwin Faust.",
  },
  {
    src: "/images/fahrzeuge/sponsoring-fv-09-schwalbach.jpg",
    alt: "PB Fahrzeugpflege Saarlouis unterstützt den FV 09 Schwalbach – Übergabe eines gerahmten Vereinstrikots",
    label: "Regional verwurzelt",
    text: "Sponsoring beim FV 09 Schwalbach.",
  },
];

export default function Awards() {
  // Verdoppeltes Array für nahtlose Endlos-Schleife
  const marqueeBadges = [...badges, ...badges];

  return (
    <section className="relative py-20 sm:py-32 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-12 sm:mb-16 items-end">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                Ausgezeichnet
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.02] tracking-[-0.025em] max-w-[22ch]">
                Mehrfach zertifiziert, jährlich{" "}
                <span className="italic text-gold">bestätigt.</span>
              </h2>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Marquee mit Fade-Rändern */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-[var(--bg)] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-[var(--bg)] to-transparent"
        />

        {/* CSS-Marquee - läuft off-main-thread, deutlich smoother als
            Framer Motion animate={{ x }} das auf requestAnimationFrame
            im main thread läuft. */}
        <div className="marquee-track flex gap-6 sm:gap-10 md:gap-14 items-center">
          {marqueeBadges.map((b, i) => (
            <div
              key={`${b.src}-${i}`}
              className="glass-flat rounded-2xl aspect-square h-24 sm:h-32 md:h-36 shrink-0 flex items-center justify-center p-3 sm:p-4 md:p-5"
            >
              <img
                src={b.src}
                alt={b.alt}
                loading="lazy"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Story-Cards */}
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10 mt-16 sm:mt-24 md:mt-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {stories.map((s, i) => (
            <Reveal key={s.src} delay={i * 0.06}>
              <figure className="glass rounded-[1.5rem] overflow-hidden h-full flex flex-col group">
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
                <figcaption className="p-6 flex-1 flex flex-col">
                  <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-3">
                    {s.label}
                  </div>
                  <p className="text-sm text-[var(--ink-dim)] leading-relaxed">
                    {s.text}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-14 text-center">
            <Link
              href="/referenzen/"
              className="inline-flex items-center gap-2 text-sm tracking-wide text-[var(--ink-dim)] hover:text-[var(--gold)] transition-colors group"
            >
              Alle Auszeichnungen &amp; Referenzen ansehen
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
