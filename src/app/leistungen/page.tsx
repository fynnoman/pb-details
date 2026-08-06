import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: { absolute: "Leistungen - PB Fahrzeugpflege Saarlouis" },
  description:
    "Alle Leistungen von PB Fahrzeugpflege Saarlouis auf einen Blick: Keramikversiegelung, Nanoversiegelung, Fahrzeugaufbereitung, Lack- & Beulendoktor sowie Unfallschaden-Abwicklung im Saarland und in Luxemburg.",
  alternates: { canonical: "/leistungen/" },
};

const services = [
  {
    tag: "01",
    title: "Keramikversiegelung",
    href: "/leistungen/keramikversiegelung/",
    desc: "High-End 9H-Lackschutz für Neuwagen, Sport- und Luxusfahrzeuge. Glasartige Schutzschicht auf Basis von Siliziumoxid, in über 20 Stunden Handarbeit aufgetragen.",
  },
  {
    tag: "02",
    title: "Nanoversiegelung",
    href: "/leistungen/nanoversiegelung/",
    desc: "Die preisbewusste Alternative zur Keramikversiegelung – hält bis zu viermal länger als Wachs und schützt bis zu 18 Monate.",
  },
  {
    tag: "03",
    title: "Fahrzeugaufbereitung",
    href: "/leistungen/fahrzeugaufbereitung/",
    desc: "Mehrstufige Innen- und Außenaufbereitung, auch für Leasingrückgabe und Fahrzeugverkauf – in der Regel zwei bis drei Werktage.",
  },
  {
    tag: "04",
    title: "Lack- & Beulendoktor",
    href: "/leistungen/lack-und-beulendoktor/",
    desc: "Smart Repair und lackschadenfreie Ausbeultechnik: Dellen und Lackschäden bis zu 70 % günstiger reparieren, ohne den Originallack zu beschädigen.",
  },
];

export default function LeistungenPage() {
  return (
    <main className="relative">
      <PageHero
        kicker="Unsere Leistungen"
        title="Alles rund um Lackschutz, Aufbereitung und Schadenbehebung."
        subtitle="Bei PB Fahrzeugpflege Saarlouis erhalten Sie alle Leistungen rund um Lackschutz, Aufbereitung und Schadenbehebung aus einer Hand – seit 1997 in Ensdorf bei Saarlouis."
      />

      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.href} delay={i * 0.05}>
                <Link
                  href={s.href}
                  className="group glass rounded-[1.75rem] p-8 sm:p-10 block h-full hover:ring-1 hover:ring-[var(--gold)]/30 transition"
                >
                  <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                    {s.tag} / Leistung
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl leading-tight tracking-[-0.015em] group-hover:text-gold transition-colors">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-[var(--ink-dim)] leading-relaxed">
                    {s.desc}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--ink-dim)] group-hover:text-[var(--gold)] transition-colors">
                    Mehr erfahren
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div className="mt-10 glass-flat rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-xl sm:text-2xl tracking-[-0.015em]">
                  Nach einem Unfall?
                </h3>
                <p className="mt-2 text-[var(--ink-dim)] text-sm sm:text-base">
                  Wir übernehmen die komplette Schadenabwicklung – Gutachter,
                  Anwalt, Leihwagen und Karosseriearbeiten. Aus einer Hand.
                </p>
              </div>
              <Link href="/unfallschaden/" className="btn-gold shrink-0">
                Unfallschaden
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Nicht sicher, was zu Ihrem Fahrzeug{" "}
            <span className="italic text-gold">passt?</span>
          </>
        }
        text="Kommen Sie ohne Termin vorbei – wir sehen uns Ihr Fahrzeug direkt an und sagen ehrlich, welche Leistung sinnvoll ist. Auch bei weiterer Anfahrt aus Luxemburg lohnt sich ein kurzer Anruf vorab."
      />
    </main>
  );
}
