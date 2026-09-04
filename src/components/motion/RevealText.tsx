"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  splitBy?: "word" | "char";
  delay?: number;
  stagger?: number;
  duration?: number;
};

/**
 * Kinetic text reveal — jedes Wort/Zeichen fährt via clip-path von unten
 * ins Sichtfeld. Stagger klein halten (30-80ms) damit's flott bleibt.
 * `once` per Intersection ist ausreichend — wir animieren beim Mount.
 */
export default function RevealText({
  text,
  as = "h1",
  className = "",
  splitBy = "word",
  delay = 0,
  stagger = 0.06,
  duration = 0.9,
}: Props) {
  const reduced = useReducedMotion();
  const parts = splitBy === "word" ? text.split(/(\s+)/) : Array.from(text);
  const Tag = as as React.ElementType;

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {parts.map((part, i) =>
        /^\s+$/.test(part) ? (
          <span key={i}>{part}</span>
        ) : (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "baseline",
              lineHeight: "inherit",
            }}
          >
            <motion.span
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{
                duration,
                delay: delay + i * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ display: "inline-block", willChange: "transform" }}
            >
              {part}
            </motion.span>
          </span>
        )
      )}
    </Tag>
  );
}
