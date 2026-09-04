"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import type { SiteSettings } from "@/lib/site-types";

type Review = {
  author: string;
  date: string;
  text: string;
};

const REVIEWS: Review[] = [
  {
    author: "Patrick Schirmbeck",
    date: "vor 3 Monaten",
    text: `Ich habe mein Leasingfahrzeug zur Rückgabe aufbereiten lassen. Was mir sofort positiv aufgefallen ist, war die gründliche Begutachtung von Innen- und Außenbereich. Anschließend wurde – basierend auf dem Fahrzeugzustand – ein „Pflegepaket“ zusammengestellt und mir im Detail erklärt. Nachdem ich das Auto zum vereinbarten Termin abgegeben hatte, wurden die Arbeiten pünktlich fertiggestellt. Beim Abholen konnte ich meinen Augen kaum trauen. Es war wie ein Neuwagen. Alles war makellos sauber, bis in die kleinste Ritze. Sogar die Delle am hinteren Radkasten war verschwunden. Ich bin absolut begeistert und kann die Jungs uneingeschränkt weiterempfehlen. Großartige Arbeit, weiter so!\n\nIch habe das Auto inzwischen zurückgegeben. Der Kommentar des Gutachters: „Wenn jeder sein Auto so zurückgeben würde, wären wir bald arbeitslos.“ Mehr muss man nicht sagen.`,
  },
  {
    author: "Gabriel Escher",
    date: "vor 2 Monaten",
    text: `Unser 9 Sitzer Staria hat leider Bekanntschaft gemacht mit einem Stahlpfosten :) (Dem Pfosten geht es gut) haha.\n\nSomit war klar, dass der direkte Weg zu PB Fahrzeugpflege führt. Und ich kann abschließend folgendes sagen:\n\nWhatsapp Nachricht\nTermin gemacht\nAbgestellt\nFertig als wäre nichts passiert\n\nDiese Jungs können eben mehr als „NUR“ Autos putzen. Und machen sich ihrem Namen PB Fahrzeugpflege alle Ehren.`,
  },
  {
    author: "Martin Chandon",
    date: "vor 4 Monaten",
    text: `Einfach Mega gute Arbeit. Hatte meinen geliebten Mustang zur Aufbereitung und Versiegelung bei PB. Das Ergebnis ist einfach überragend. Es passte einfach alles, tolle Beratung, super freundlich und das Ergebnis machte mich sprachlos. Komme sehr gerne wieder und empfehle es gerne weiter.`,
  },
  {
    author: "Markus Stahl",
    date: "vor 2 Monaten",
    text: `Vorab: Fantastisches Ergebnis! Mein Pony bekam eine Keramikversiegelung, das Komplettpaket. Lack, Felgen, Verdeck, Scheiben. Das Fahrzeug sieht wie aus dem Showroom. Absolut 1a und ich bin Tage nach Abholung immer noch sprachlos. Die Beratung von Herrn Paul und Herrn Becker absolut top. Super sympathisch und super kompetent. Vom ganzen Ablauf des Erstkontaktes über die Beratung bis zur Abholung des Fahrzeuges 1+. Absolute Empfehlung! Wer Wert auf maximale Qualität legt, auf jeden Fall zu diesem Team gehen. Ich komme definitiv wieder!`,
  },
  {
    author: "LaBastin",
    date: "vor 4 Monaten",
    text: `Wir haben letzte Woche unseren 2 Jahre alten Hyundai Tucson zur Aufbereitung abgegeben. Die beiden Herren, die mit uns gesprochen haben, waren auf Anhieb super sympathisch. Uns wurde vorab erklärt, was gemacht werden kann und verschiedene Alternativen angeboten. Es wurde uns nichts aufgezwungen, alles war unverbindlich und es wurde sich viel Zeit genommen.\n\nWir haben uns für eine Innen- sowie Außenaufbereitung entschieden mit Keramikversiegelung. Bei der Abholung hat unser Auto richtig gestrahlt, so einen Lack hatte das Auto zuvor nicht. Auch nicht, als wir es neu beim Händler erhalten haben. Sogar die Plastikteile außen sehen besser aus als im neuen Zustand.\n\nDie Arbeit, welche hier geleistet wurde, ist unschlagbar. Wir werden mit unserem zweiten Auto, sobald dieses geliefert wurde, erneut vorbeischauen und das Auto nur hier aufbereiten lassen.`,
  },
];

function Stars() {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label="5 von 5 Sternen"
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="w-4 h-4"
          aria-hidden
        >
          <path
            fill="#F5B400"
            d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5z"
          />
        </svg>
      ))}
    </div>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.15-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.85 14.1c-.22-.66-.34-1.36-.34-2.1s.12-1.44.34-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.67-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.67 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
  return (
    <span
      aria-hidden
      className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#f5e2b8] via-[#d4b483] to-[#8a6a3f] flex items-center justify-center text-[#100e0a] text-xs font-semibold tracking-wide"
    >
      {initials || "PB"}
    </span>
  );
}

function ReviewCard({ review, i }: { review: Review; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
      className="glass rounded-2xl sm:rounded-[1.5rem] p-5 sm:p-6 flex flex-col snap-start shrink-0 w-[88%] max-w-[340px] sm:max-w-none sm:w-auto h-full"
    >
      <header className="flex items-start gap-3 mb-4">
        <Initials name={review.author} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-[var(--ink)] font-medium truncate">
              {review.author}
            </span>
            <span className="shrink-0" title="Google-Rezension">
              <GoogleG />
            </span>
          </div>
          <div className="text-[11px] text-[var(--ink-mute)] mt-0.5">
            {review.date}
          </div>
        </div>
      </header>
      <Stars />
      <p className="mt-4 text-sm text-[var(--ink-dim)] leading-relaxed whitespace-pre-line flex-1">
        {review.text}
      </p>
    </motion.article>
  );
}

export default function Reviews({ settings }: { settings: SiteSettings }) {
  const reviewUrl =
    settings.google?.url || settings.google?.mapsUrl || undefined;

  return (
    <section
      id="rezensionen"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-8 sm:mb-14 lg:items-end">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <p className="text-[10px] sm:text-[11px] tracking-[0.32em] sm:tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-4 sm:mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                Original-Rezensionen von Google
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(1.75rem,7vw,3.6rem)] leading-[1.05] tracking-[-0.025em] max-w-[22ch]">
                Was Kunden über uns{" "}
                <span className="italic text-gold">sagen.</span>
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <Reveal delay={0.1}>
              <div className="glass-flat rounded-2xl px-4 py-3 sm:px-5 sm:py-4 inline-flex items-center gap-3 sm:gap-4 lg:justify-end lg:w-full">
                <Stars />
                <div className="min-w-0">
                  <div className="font-display text-xl sm:text-2xl lg:text-3xl leading-none text-chrome">
                    {settings.google?.count ?? ""}
                    <span className="text-[var(--ink-mute)] text-sm sm:text-base lg:text-lg font-normal">
                      {" "}
                      Bewertungen
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-[var(--ink-mute)] mt-0.5 sm:mt-1">
                    Google
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible pb-4 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {REVIEWS.map((r, i) => (
            <ReviewCard key={r.author} review={r} i={i} />
          ))}
        </div>

        {reviewUrl && (
          <Reveal delay={0.2}>
            <div className="mt-10 sm:mt-14 flex justify-center">
              <a
                href={reviewUrl}
                target="_blank"
                rel="noopener"
                className="glass-flat rounded-full px-5 py-3 inline-flex items-center gap-3 text-sm text-[var(--ink-dim)] hover:text-[var(--ink)] hover:ring-1 hover:ring-[var(--gold)]/40 transition-all group min-h-[48px]"
              >
                <GoogleG />
                <span>Alle Rezensionen auf Google ansehen</span>
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
