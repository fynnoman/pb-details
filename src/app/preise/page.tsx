import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: { absolute: "Preise – Fahrzeugaufbereitung im Saarland" },
  description:
    "Was kostet eine Fahrzeugaufbereitung oder Keramikversiegelung? Da jedes Fahrzeug anders ist, erstellen wir nach einer Begutachtung Ihr individuelles Angebot.",
  alternates: { canonical: "/preise/" },
};

const sections = [
  {
    h: "Leasingrückgabe – Kosten vermeiden",
    p: "Wir sorgen dafür, dass Ihr Fahrzeug so übergeben wird, dass unnötige Nachzahlungen an den Leasinggeber vermieden werden. Gründlich, zielgerichtet und ohne Überraschungen.",
  },
  {
    h: "Fahrzeugverkauf – Wert steigern",
    p: "Ein aufbereitetes Fahrzeug verkauft sich schneller und zu besseren Konditionen. Wir holen optisch und technisch das Maximum heraus, damit Ihr Wagen den bestmöglichen Eindruck hinterlässt.",
  },
  {
    h: "Sammlerfahrzeug – Wert erhalten",
    p: "Hier geht es nicht um den schnellen Glanz, sondern um langfristigen Werterhalt. Mit Fingerspitzengefühl und Erfahrung schützen wir, was Ihnen wichtig ist – über Jahre hinweg.",
  },
  {
    h: "Lack- & Beulendoktor-Arbeiten – Präzision statt Flickwerk",
    p: "Ob kleine Dellen oder Lackschäden: Unser Anspruch ist, dass Sie nachher nichts mehr sehen. Präzise, sauber und fachgerecht – ohne billige Kompromisse.",
    href: "/leistungen/lack-und-beulendoktor/",
  },
  {
    h: "Keramikversiegelung – Schutz & Perfektion",
    p: "Die Königsklasse unserer Arbeit: Ein mehrstufiger Prozess, der für maximalen Schutz, langanhaltenden Glanz und ein perfektes Finish sorgt. Kein Produkt von der Stange, sondern Handwerk auf höchstem Niveau.",
    href: "/leistungen/keramikversiegelung/",
  },
];

const orientierung = [
  { label: "Keramikversiegelung", value: "1.500 – 1.900 €", hint: "Orientierungswert je nach Fahrzeug und Zustand" },
  { label: "Leihwagen", value: "ab 55 € / Tag", hint: "Nach Verfügbarkeit, bitte vorab reservieren" },
  { label: "Smart Repair", value: "bis zu 70 % günstiger", hint: "Verglichen mit klassischer Lackierung" },
];

export default function PreisePage() {
  return (
    <main className="relative">
      <PageHero
        kicker="Preise"
        title="Preise für Aufbereitung, Versiegelung & Smart Repair"
        subtitle="Die Frage nach dem Preis ist naheliegend. Doch jeder Auftrag und jeder Kunde hat sein eigenes Motiv. Deshalb beginnt bei uns jedes Angebot mit einer persönlichen Begutachtung Ihres Fahrzeugs."
      />

      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg mb-12">
              Worum geht es bei Ihrem Fahrzeug?
            </p>
          </Reveal>
          <div className="space-y-10">
            {sections.map((s, i) => (
              <Reveal key={s.h} delay={i * 0.05}>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl leading-snug tracking-[-0.015em] mb-4">
                    {s.h}
                  </h2>
                  <p className="text-[var(--ink-dim)] leading-relaxed">
                    {s.p}
                    {s.href && (
                      <>
                        {" "}
                        <Link
                          href={s.href}
                          className="text-[var(--gold)] hover:underline underline-offset-4"
                        >
                          Mehr erfahren
                        </Link>
                        .
                      </>
                    )}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10 space-y-6 text-[var(--ink-dim)] leading-relaxed text-base sm:text-lg">
          <Reveal>
            <p>
              Sicher verstehen Sie jetzt, warum bei uns jeder Auftrag mit einer
              Analyse beginnt. Wir sehen uns Ihr Fahrzeug im Detail an,
              sprechen über Ihre Ziele und sagen offen, was wirklich sinnvoll
              ist – und was nicht.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              Um es klar zu sagen: Jahrzehntelange Erfahrung, durchdachte
              Abläufe, hochwertigste Materialien und vor allem Zeit gibt es
              nicht zum Billigpreis. Ja, es gibt günstigere Anbieter – die
              meisten sogar. Doch wer nur nach dem niedrigsten Preis sucht,
              bekommt selten den höchsten Wert.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Wir stehen für Qualität statt Kompromisse. Für eine klare Linie.
              Für Ergebnisse, die überzeugen – unabhängig davon, welches Ziel
              Sie mit Ihrem Fahrzeug verfolgen. Darum geben wir keine
              Pauschalpreise am Telefon oder per Mail.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              Wenn all das für Sie logisch klingt, sind Sie bei uns richtig.
              Kommen Sie ohne Termin vorbei – lassen Sie uns Ihr Fahrzeug
              gemeinsam ansehen. So entsteht ein individuelles Angebot, das zu
              Ihrem Fahrzeug und Ihrem Ziel passt. Denn bei uns beginnt Premium
              schon bei der Beratung.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-4">
              Orientierungswerte
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg max-w-[70ch] mb-10">
              Damit Sie einen groben Rahmen haben – bitte beachten Sie: Das
              verbindliche Angebot erstellen wir immer erst nach der
              persönlichen Begutachtung.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {orientierung.map((o, i) => (
              <Reveal key={o.label} delay={0.1 + i * 0.05}>
                <div className="glass rounded-[1.5rem] p-8 h-full">
                  <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-3">
                    {o.label}
                  </div>
                  <div className="font-display text-2xl sm:text-3xl text-chrome leading-tight tracking-[-0.015em]">
                    {o.value}
                  </div>
                  <div className="text-sm text-[var(--ink-dim)] mt-4 leading-relaxed">
                    {o.hint}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="text-xs text-[var(--ink-mute)] mt-6">
              Weitere Details zu den Konditionen finden Sie in unseren{" "}
              <Link
                href="/allgemeine-geschaeftsbedingungen/"
                className="hover:text-[var(--ink)] underline underline-offset-4"
              >
                Allgemeinen Geschäftsbedingungen
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Individuelles Angebot statt{" "}
            <span className="italic text-gold">Pauschalpreis.</span>
          </>
        }
        text="Bringen Sie Ihr Fahrzeug vorbei – wir sehen es uns direkt an und erstellen ein transparentes Festpreis-Angebot. Auch ohne Termin, während unserer Öffnungszeiten."
      />
    </main>
  );
}
