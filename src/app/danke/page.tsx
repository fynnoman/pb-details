import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: {
    absolute: "Danke für Ihre Kontaktaufnahme.",
  },
  description:
    "Vielen Dank für Ihre Kontaktaufnahme! Wir werden uns schnellstmöglich bei Ihnen melden.",
  alternates: { canonical: "/danke/" },
  robots: { index: false, follow: true },
};

export default function DankePage() {
  return (
    <main className="relative min-h-[80svh] flex items-center py-24 sm:py-32">
      <div className="mx-auto max-w-[720px] w-full px-6 sm:px-10 text-center">
        <Reveal>
          <p className="text-[11px] sm:text-xs tracking-[0.42em] uppercase text-[var(--ink-dim)] mb-6 sm:mb-8">
            <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
            Nachricht erhalten
            <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle ml-3" />
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.02] tracking-[-0.028em] text-chrome">
            Vielen Dank für Ihre <span className="italic text-gold">Kontaktaufnahme.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 text-[var(--ink-dim)] leading-relaxed text-lg">
            Wir werden uns schnellstmöglich bei Ihnen melden. In der Regel
            innerhalb von 24 Stunden.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-gold">
              Zurück zur Startseite
              <span aria-hidden>→</span>
            </Link>
            <Link href="/leistungen/" className="btn-glass">
              Leistungen ansehen
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
