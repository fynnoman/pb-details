"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Reveal from "./Reveal";

export type FaqItem =
  | { question: string; answer: string }
  | { q: string; a: string };

type Props = {
  faqs: FaqItem[];
  kicker?: string;
  title?: React.ReactNode;
  showAllLink?: boolean;
  id?: string;
};

function normalize(item: FaqItem): { question: string; answer: string } {
  return "question" in item
    ? { question: item.question, answer: item.answer }
    : { question: item.q, answer: item.a };
}

export default function FAQ({
  faqs,
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

  if (!faqs || faqs.length === 0) return null;

  return (
    <section id={id} className="relative py-20 sm:py-32 lg:py-44 overflow-hidden">
      <div className="mx-auto max-w-[1000px] px-5 sm:px-10">
        <div className="text-center mb-12 sm:mb-16">
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
          {faqs.map((raw, i) => {
            const item = normalize(raw);
            const isOpen = open === i;
            return (
              <Reveal key={item.question} delay={i * 0.04}>
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
                      {item.question}
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
                          {item.answer}
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
