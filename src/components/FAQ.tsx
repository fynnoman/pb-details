"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Reveal from "./Reveal";

export type FaqItem = { q: string; a: string };

const defaultFaqs: FaqItem[] = [
  {
    q: "Was unterscheidet PB Fahrzeugpflege von anderen Aufbereitern im Saarland?",
    a: "PB Fahrzeugpflege Saarlouis arbeitet inhabergeführt seit 1997 ausschließlich an privaten Kundenfahrzeugen und ist auf Sportwagen, Oldtimer und Luxusfahrzeuge spezialisiert. Statt schneller Massenabfertigung nehmen wir uns die Zeit für ein perfektes Ergebnis — nach dem Motto „Wir schützen Werte“. Über 600 positive Bewertungen und eine Weiterempfehlungsrate von über 95 % bestätigen das.",
  },
  {
    q: "Bieten Sie auch Aufbereitung für Sportwagen, Oldtimer und Luxusfahrzeuge an?",
    a: "Ja. Hochwertige Fahrzeuge sind unsere Spezialität — vom High-End-Lackschutz per Keramikversiegelung bis zur kompletten Innen- und Außenaufbereitung.",
  },
  {
    q: "Seit wann gibt es PB Fahrzeugpflege?",
    a: "PB Fahrzeugpflege Saarlouis besteht seit 1997 und gehört mit über 29 Jahren Erfahrung zu den ältesten und erfahrensten Fahrzeugaufbereitern Deutschlands.",
  },
  {
    q: "Aus welchen Regionen kommen Ihre Kunden?",
    a: "Unsere Kunden kommen aus Saarlouis und dem gesamten Saarland, aus Luxemburg sowie aus den angrenzenden Regionen. Unser Standort in Ensdorf an der B51 liegt verkehrsgünstig mit unmittelbarer Zuganbindung.",
  },
  {
    q: "Wo befindet sich PB Fahrzeugpflege?",
    a: "Sie finden uns in der Provinzialstraße 243, 66806 Ensdorf — direkt bei Saarlouis. Begutachtung und Angebot sind auch ohne Termin möglich.",
  },
];

type Props = {
  faqs?: FaqItem[];
  kicker?: string;
  title?: React.ReactNode;
  showAllLink?: boolean;
  id?: string;
};

export default function FAQ({
  faqs = defaultFaqs,
  kicker = "Häufige Fragen",
  title = (
    <>
      Antworten auf das, was Sie wissen{" "}
      <span className="italic text-gold">wollen.</span>
    </>
  ),
  showAllLink = true,
  id = "faq",
}: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id={id} className="relative py-32 sm:py-44 overflow-hidden">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <div className="text-center mb-16">
          <Reveal>
            <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
              <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
              {kicker}
              <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle ml-3" />
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02] tracking-[-0.025em]">
              {title}
            </h2>
          </Reveal>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div
                  className={`glass rounded-2xl overflow-hidden transition-colors ${
                    isOpen ? "ring-1 ring-[var(--gold)]/30" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 px-6 sm:px-8 py-5 text-left"
                  >
                    <span className="font-display text-lg sm:text-xl leading-snug flex-1 tracking-[-0.01em]">
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border border-white/15 transition-transform duration-500 ${
                        isOpen
                          ? "rotate-45 bg-[var(--gold)] text-black border-[var(--gold)]"
                          : ""
                      }`}
                    >
                      <span className="text-lg leading-none">+</span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-6 text-[var(--ink-dim)] leading-relaxed max-w-[70ch]">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        {showAllLink && (
          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link
                href="/faq/"
                className="inline-flex items-center gap-2 text-sm tracking-wide text-[var(--ink-dim)] hover:text-[var(--gold)] transition-colors group"
              >
                Alle Fragen &amp; Antworten ansehen
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
