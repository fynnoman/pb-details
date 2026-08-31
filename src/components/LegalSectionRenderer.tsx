import Reveal from "./Reveal";
import type { LegalSection } from "@/lib/site-data";

/**
 * Rendert eine Sektionsliste aus dem legal-Global.
 * - Absaetze werden an Leerzeilen (\n\n) getrennt
 * - http(s)-URLs und mailto:-Adressen werden automatisch verlinkt
 * - Sektionen ohne heading UND ohne body werden uebersprungen
 *
 * Bewusst KEIN Rich-Text-Support, damit die Bearbeitung im
 * einfachen /verwaltung-Editor moeglich bleibt (nur Textarea).
 */

const URL_RE = /(https?:\/\/[^\s<>()]+|mailto:[^\s<>()]+)/g;

function renderInline(text: string) {
  const parts: (string | React.ReactElement)[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  URL_RE.lastIndex = 0;
  while ((match = URL_RE.exec(text)) !== null) {
    if (match.index > lastIdx) parts.push(text.slice(lastIdx, match.index));
    const href = match[0];
    const label = href.replace(/^https?:\/\//, "").replace(/^mailto:/, "");
    parts.push(
      <a
        key={`${match.index}-${href}`}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener" : undefined}
        className="text-[var(--ink)] hover:text-[var(--gold)] underline underline-offset-4"
      >
        {label}
      </a>,
    );
    lastIdx = match.index + href.length;
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return parts;
}

function Paragraph({ text, first }: { text: string; first: boolean }) {
  const lines = text.split(/\n/);
  return (
    <p className={first ? undefined : "mt-3"}>
      {lines.map((line, i) => (
        <span key={i}>
          {renderInline(line)}
          {i < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </p>
  );
}

export default function LegalSectionRenderer({
  sections,
}: {
  sections?: LegalSection[] | null;
}) {
  if (!sections || sections.length === 0) return null;
  return (
    <>
      {sections
        .filter((s) => (s.heading && s.heading.trim()) || (s.body && s.body.trim()))
        .map((s, idx) => {
          const paragraphs = (s.body || "")
            .split(/\n{2,}/)
            .map((p) => p.trim())
            .filter(Boolean);
          return (
            <Reveal key={idx}>
              {s.heading && s.heading.trim() ? (
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl leading-tight tracking-[-0.01em] mt-10 sm:mt-12 mb-3 sm:mb-4 text-[var(--ink)]">
                  {s.heading}
                </h2>
              ) : null}
              {paragraphs.map((p, i) => (
                <Paragraph key={i} text={p} first={i === 0} />
              ))}
            </Reveal>
          );
        })}
    </>
  );
}
