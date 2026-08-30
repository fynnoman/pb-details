"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Reveal from "./Reveal";
import EditableText from "./edit/EditableText";

export type FaqItem =
  | { id?: string | number; question: string; answer: string }
  | { id?: string | number; q: string; a: string };

type Props = {
  faqs: FaqItem[];
  kicker?: string;
  title?: React.ReactNode;
  showAllLink?: boolean;
  id?: string;
  home?: import("@/lib/site-types").HomeData;
};

function normalize(item: FaqItem): { id?: string | number; question: string; answer: string } {
  return "question" in item
    ? { id: item.id, question: item.question, answer: item.answer }
    : { id: item.id, question: item.q, answer: item.a };
}

export default function FAQ({
  faqs,
  kicker,
  title,
  showAllLink = true,
  id = "faq",
  home,
}: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const t = home?.faq || {};
  const kickerText = kicker || t.kicker || "Häufige Fragen";
  const titleText = t.title || "Antworten auf das, was Sie wissen";
  const titleHighlight = t.titleHighlight || "wollen.";
  const linkLabel = t.linkLabel || "Alle Fragen & Antworten ansehen";

  if (!faqs || faqs.length === 0) return null;

  return (
    <section id={id} className="relative py-16 sm:py-24 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-8 lg:px-10">
        <div className="text-center mb-10 sm:mb-16">
          <Reveal>
            <p className="text-[10px] sm:text-[11px] tracking-[0.32em] sm:tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-4 sm:mb-6">
              <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
              <EditableText globalSlug="home" path="faq.kicker" value={kickerText} />
              <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle ml-3" />
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(1.75rem,7vw,3.6rem)] leading-[1.05] tracking-[-0.025em]">
              {title ? (
                title
              ) : (
                <EditableText
                  globalSlug="home"
                  path="faq.title"
                  value={titleText}
                  render={(v) => (
                    <>
                      {v} <span className="italic text-gold">{titleHighlight}</span>
                    </>
                  )}
                />
              )}
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
                    className="w-full flex items-center gap-3 sm:gap-4 px-5 sm:px-8 py-5 text-left min-h-[64px]"
                  >
                    <span className="font-display text-base sm:text-lg md:text-xl leading-snug flex-1 tracking-[-0.01em]">
                      {item.id !== undefined ? (
                        <EditableText
                          collection="faqs"
                          docId={item.id}
                          path="question"
                          value={item.question}
                        />
                      ) : (
                        item.question
                      )}
                    </span>
                    <span
                      className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border border-white/15 transition-transform duration-500 ${
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
                        <div className="px-5 sm:px-8 pb-5 sm:pb-6 text-sm sm:text-base text-[var(--ink-dim)] leading-relaxed max-w-[70ch]">
                          {item.id !== undefined ? (
                            <EditableText
                              collection="faqs"
                              docId={item.id}
                              path="answer"
                              value={item.answer}
                              multiline
                            />
                          ) : (
                            item.answer
                          )}
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
            <div className="mt-8 sm:mt-10 text-center">
              <Link
                href="/faq/"
                className="inline-flex items-center gap-2 text-sm tracking-wide text-[var(--ink-dim)] hover:text-[var(--gold)] transition-colors group min-h-[44px]"
              >
                <EditableText globalSlug="home" path="faq.linkLabel" value={linkLabel} />
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
