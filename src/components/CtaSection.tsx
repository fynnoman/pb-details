import Link from "next/link";
import Reveal from "./Reveal";
import { SITE } from "@/lib/site";

type Props = {
  kicker?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
};

export default function CtaSection({
  kicker = "Unverbindlich anfragen",
  title,
  text,
  primaryLabel = "Jetzt Kontakt aufnehmen",
  primaryHref = "/kontakt/",
}: Props) {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="glass-strong rounded-[1.75rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-7">
              <Reveal>
                <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                  <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                  {kicker}
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
                  {title}
                </h2>
              </Reveal>
              {text && (
                <Reveal delay={0.1}>
                  <p className="mt-6 text-[var(--ink-dim)] leading-relaxed max-w-xl">
                    {text}
                  </p>
                </Reveal>
              )}
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-3">
              <Reveal delay={0.15}>
                <Link
                  href={primaryHref}
                  className="btn-gold w-full justify-center"
                >
                  {primaryLabel}
                  <span aria-hidden>→</span>
                </Link>
              </Reveal>
              <Reveal delay={0.2}>
                <a
                  href={SITE.phone.href}
                  className="btn-glass w-full justify-center"
                >
                  <span
                    className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse"
                    aria-hidden
                  />
                  {SITE.phone.display}
                </a>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="text-[11px] text-[var(--ink-mute)] text-center leading-relaxed mt-2">
                  Auch ohne Termin – während unserer Öffnungszeiten in der
                  Provinzialstraße 243, Ensdorf.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
