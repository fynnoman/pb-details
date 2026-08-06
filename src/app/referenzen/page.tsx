import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Referenzen & Bewertungen – Saarland" },
  description:
    "Über 648 Bewertungen, mehr als 95 % Weiterempfehlung und als erster deutscher Fahrzeugpflege-Betrieb mit Q-Siegel ausgezeichnet. Überzeugen Sie sich selbst.",
  alternates: { canonical: "/referenzen/" },
};

const zertifikate = [
  {
    title: "Q-Siegel",
    subtitle: "Deutschlands erster Fahrzeugpflege-Betrieb mit Q-Siegel",
    details:
      "Auszeichnung durch Minister Heiko Maas. Zweite Auszeichnung in Folge durch Ministerin Anke Rehlinger.",
  },
  {
    title: "BRILA Certified Installer",
    subtitle: "Zertifizierter Fachbetrieb für Keramikversiegelungen",
    details:
      "BRILA-Urkunde für professionelle Anwendung des 9H High-End-Lackschutzes.",
  },
  {
    title: "Werkstatt des Vertrauens",
    subtitle: "Kundenempfehlung als Vertrauens-Werkstatt",
    details:
      "Auszeichnung basierend auf verifizierten Kundenempfehlungen.",
  },
  {
    title: "Eigener Qualitäts-Coach",
    subtitle: "Interne Qualitätssicherung",
    details:
      "Kontinuierliche Prüfung jeder Aufbereitung nach unseren eigenen Qualitätsstandards.",
  },
];

const provenExpert = [
  { year: "2017", labels: ["TOP Dienstleister", "TOP Empfehlung", 'TOP Kundenempfehlung / Dienstleister (über 95 % Empfehlungen, Note „sehr gut")'] },
  { year: "2018", labels: ["TOP Dienstleister", "TOP Empfehlung"] },
  { year: "2019", labels: ["TOP Dienstleister", "TOP Empfehlung", "Von Kunden empfohlen"] },
  { year: "2020", labels: ["TOP Dienstleister", "TOP Empfehlung"] },
  { year: "2021", labels: ["TOP Dienstleister", "TOP Empfehlung"] },
  { year: "2022", labels: ["TOP Dienstleister"] },
  { year: "2023", labels: ["TOP Dienstleister"] },
  { year: "2024", labels: ["TOP Dienstleister"] },
  { year: "2026", labels: ["ProvenExpert Bewertungssiegel"] },
];

const weitereSiegel = [
  "WerKenntDenBesten – Siegel",
  "Marktplatz Mittelstand – Siegel",
  "Webwiki Badge 2024",
  "Gold-Bewertung / Empfehlung",
];

const jubilaeen = [
  "20. Jubiläum – Gratulation durch Ensdorfer Bürgermeister Hartwin Faust",
  "25. Jubiläum – Gratulation vom Ensdorfer Bürgermeister",
  'ZDF – Fernsehteam der Sendung „Drehscheibe", Thema „Ein Tag Aushilfe als Fahrzeugpfleger"',
  "SR3 Radio (Saarlandwelle) – Fahrzeug-Beschriftung / Karosseriearbeiten",
  "IHK Saar Wirtschaft 10/15 – Pressebericht über die Q-Siegel-Auszeichnung",
  "KITT und Herbie zu Besuch bei PB Fahrzeugpflege Saarlouis",
];

export default function ReferenzenPage() {
  return (
    <main className="relative">
      <PageHero
        kicker="Referenzen & Bewertungen"
        title="Unsere Referenzen"
        subtitle={
          <>
            {SITE.ratings.count} Bewertungen auf ProvenExpert bei{" "}
            {SITE.ratings.value.toString().replace(".", ",")} von{" "}
            {SITE.ratings.scale} Sternen. Über {SITE.ratings.recommendation} %
            Weiterempfehlung. Ausgezeichnet als Deutschlands erster
            Fahrzeugpflege-Betrieb mit Q-Siegel.
          </>
        }
      />

      {/* Zertifikate */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-10">
              Zertifikate &amp; Qualitätssiegel
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {zertifikate.map((z, i) => (
              <Reveal key={z.title} delay={i * 0.05}>
                <div className="glass rounded-[1.5rem] p-8 h-full">
                  <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-3">
                    Auszeichnung
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl leading-snug tracking-[-0.015em]">
                    {z.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--ink)] font-medium">
                    {z.subtitle}
                  </p>
                  <p className="mt-4 text-sm text-[var(--ink-dim)] leading-relaxed">
                    {z.details}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ProvenExpert */}
      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-6">
              ProvenExpert-Auszeichnungen
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg max-w-[70ch] mb-10">
              Jahr für Jahr ausgezeichnet – die Übersicht:
            </p>
          </Reveal>
          <div className="space-y-3">
            {provenExpert.map((row, i) => (
              <Reveal key={row.year} delay={i * 0.03}>
                <div className="glass-flat rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="font-display text-2xl text-chrome shrink-0 w-24">
                    {row.year}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {row.labels.map((l) => (
                      <span
                        key={l}
                        className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[var(--ink-dim)]"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Weitere Siegel */}
      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-10">
              Weitere Siegel
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {weitereSiegel.map((s, i) => (
              <Reveal key={s} delay={i * 0.04}>
                <div className="glass-flat rounded-2xl px-6 py-5 h-full flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--gold)] shrink-0" />
                  <span className="text-sm text-[var(--ink-dim)]">{s}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Jubiläen & Presse */}
      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-10">
              Jubiläen &amp; Presse
            </h2>
          </Reveal>
          <ul className="space-y-4">
            {jubilaeen.map((j, i) => (
              <Reveal key={j} delay={i * 0.04}>
                <li className="flex gap-3 text-[var(--ink-dim)] leading-relaxed">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                  <span>{j}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Live ProvenExpert Link */}
      <section className="relative py-16">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10 text-center">
          <Reveal>
            <a
              href={SITE.social.provenExpert}
              target="_blank"
              rel="noopener"
              className="btn-glass"
            >
              Alle Bewertungen auf ProvenExpert ansehen
              <span aria-hidden>↗</span>
            </a>
          </Reveal>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Werden Sie unsere nächste{" "}
            <span className="italic text-gold">Referenz.</span>
          </>
        }
        text="Kommen Sie ohne Termin vorbei oder rufen Sie kurz an. Wir freuen uns darauf, auch Ihr Fahrzeug in unser Portfolio aufzunehmen."
      />
    </main>
  );
}
