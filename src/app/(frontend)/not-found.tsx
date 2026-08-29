import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: { absolute: "Seite nicht gefunden – 404" },
  description:
    "Die angeforderte Seite existiert nicht. Nutzen Sie die Navigation oder springen Sie direkt zur Startseite.",
  robots: { index: false, follow: true },
};

const suggestions = [
  { label: "Startseite", href: "/" },
  { label: "Leistungen", href: "/leistungen/" },
  { label: "Keramikversiegelung", href: "/leistungen/keramikversiegelung/" },
  { label: "Unfallschaden", href: "/unfallschaden/" },
  { label: "Kontakt", href: "/kontakt/" },
];

export default function NotFound() {
  return (
    <main className="relative min-h-[80svh] flex items-center py-16 sm:py-24">
      <div className="mx-auto max-w-[720px] w-full px-4 sm:px-8 lg:px-10 text-center">
        <Reveal>
          <p className="text-[11px] sm:text-xs tracking-[0.42em] uppercase text-[var(--ink-dim)] mb-6 sm:mb-8">
            <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
            Fehler 404
            <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle ml-3" />
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="font-display font-light text-[clamp(4rem,10vw,8rem)] leading-none tracking-[-0.03em] mb-4">
            <span className="block text-chrome">404</span>
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="font-display text-2xl sm:text-3xl leading-snug tracking-[-0.015em] max-w-[24ch] mx-auto">
            Diese Seite konnten wir nicht{" "}
            <span className="italic text-gold">finden.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 text-[var(--ink-dim)] leading-relaxed">
            Der Link ist vielleicht veraltet oder falsch geschrieben. Nutzen
            Sie die Navigation oder springen Sie direkt zu einer der
            wichtigsten Seiten:
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="glass-flat rounded-full px-5 py-2.5 text-sm text-[var(--ink-dim)] hover:text-[var(--ink)] hover:ring-1 hover:ring-[var(--gold)]/30 transition"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="mt-12">
            <Link href="/" className="btn-gold">
              Zur Startseite
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
