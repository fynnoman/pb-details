import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FAQ, { type FaqItem } from "@/components/FAQ";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: {
    absolute: "Keramikversiegelung fürs Auto in Saarlouis & im Saarland",
  },
  description:
    "Professionelle Keramikversiegelung fürs Auto im Saarland & Luxemburg – glasartiger Lackschutz in über 20 Stunden Handarbeit. Seit 1997, über 648 Top-Bewertungen.",
  alternates: { canonical: "/leistungen/keramikversiegelung/" },
  openGraph: {
    title: "Keramikversiegelung fürs Auto in Saarlouis & im Saarland",
    description:
      "Professionelle Keramikversiegelung fürs Auto im Saarland & Luxemburg – glasartiger Lackschutz in über 20 Stunden Handarbeit. Seit 1997.",
    type: "article",
  },
};

const faqs: FaqItem[] = [
  {
    q: "Was kostet eine Keramikversiegelung?",
    a: "Die Kosten richten sich nach Fahrzeuggröße, Lackzustand und Aufbau. Nach einer kurzen Begutachtung erhalten Sie ein transparentes Festpreis-Angebot – unverbindlich und auch ohne Termin. Aktuelle Preise finden Sie auf unserer Seite Preise.",
  },
  {
    q: "Wie lange hält eine Keramikversiegelung?",
    a: "Eine professionell aufgetragene Keramikversiegelung hält in der Regel mehrere Jahre. Die genaue Haltbarkeit hängt von Nutzung und Pflege ab – mit der richtigen Pflege bleibt der Schutz besonders lange erhalten.",
  },
  {
    q: "Wie lange dauert eine Keramikversiegelung?",
    a: "Je nach Fahrzeug und Lackzustand dauert die komplette Aufbereitung und Versiegelung in der Regel zwei bis vier Tage, da wir den Lack vor dem Auftragen gründlich vorbereiten.",
  },
  {
    q: "Lohnt sich eine Keramikversiegelung beim Neuwagen?",
    a: "Ja. Gerade beim Neuwagen ist der Klarlack noch im Rohzustand und besonders empfindlich. Eine Keramikversiegelung ab dem ersten Kilometer schützt den Lack, bevor erste Schäden entstehen, und erhält den Wert des Fahrzeugs.",
  },
  {
    q: "Keramikversiegelung oder Nanoversiegelung – was ist besser?",
    a: "Die Keramikversiegelung ist härter und langlebiger, die Nanoversiegelung günstiger und mit kürzerer Haltbarkeit. Für Neuwagen sowie Sport- und Luxusfahrzeuge empfehlen wir meist die Keramikversiegelung; wir beraten Sie gern individuell.",
  },
  {
    q: "Eignet sich eine Keramikversiegelung auch für Gebrauchtwagen?",
    a: "Ja. Bei Gebrauchtfahrzeugen bereiten wir den Lack vorher auf und entfernen Kratzer und Verunreinigungen, bevor wir die Keramikversiegelung auftragen – ideal zur Werterhaltung.",
  },
  {
    q: "Schützt eine Keramikversiegelung vor Steinschlag und Kratzern?",
    a: "Sie schützt zuverlässig vor Mikrokratzern, UV-Strahlung, Chemie und Verschmutzung. Tiefe Steinschläge kann sie nicht verhindern – dafür ist eine Lackschutzfolie die richtige Wahl. Gern beraten wir Sie zur passenden Lösung.",
  },
  {
    q: "Kann eine Keramikversiegelung wieder entfernt werden?",
    a: "Ja, allerdings nur mechanisch: In unseren internen Tests ließ sich die Versiegelung ausschließlich mit Schleifpaste und Poliermaschine entfernen. Das zeigt, wie widerstandsfähig die Schicht im Alltag ist.",
  },
];

const vorteile = [
  "Langfristiger Lackschutz und Werterhalt",
  "Intensiver Glanz und starker Abperleffekt",
  "Leichtere Reinigung, weniger Anhaftung von Schmutz",
  "Schutz vor UV-Strahlung, Chemie und Mikrokratzern",
];

const nachteile = [
  "Höhere Kosten als Wachs oder eine Nanoversiegelung",
  "Aufwendige Anwendung – der Lack muss vorher fachgerecht aufbereitet werden",
  "Kein Schutz vor tiefen Kratzern und Steinschlägen",
  "Regelmäßige Wagenwäsche weiterhin erforderlich",
];

const vergleich = [
  { kriterium: "Haltbarkeit", keramik: "Mehrere Jahre", nano: "ca. 12–18 Monate" },
  { kriterium: "Schutz & Härte", keramik: "Sehr hart, glasartig – hoher Schutz", nano: "Guter Schutz, jedoch weicher" },
  { kriterium: "Glanz & Abperleffekt", keramik: "Sehr intensiv", nano: "Gut" },
  { kriterium: "Aufwand", keramik: "Meist 2–3 Tage", nano: "Deutlich geringer" },
  { kriterium: "Preis", keramik: "Höher", nano: "Günstiger" },
  { kriterium: "Ideal für", keramik: "Neuwagen, Sport-, Luxus- & Wertfahrzeuge", nano: "Preisbewusste Pflege mit kürzerer Haltedauer" },
];

export default function KeramikversiegelungPage() {
  return (
    <main className="relative">
      <PageHero
        kicker="01 / Leistung · Keramikversiegelung"
        title={
          <>
            Keramikversiegelung fürs Auto in Saarlouis, dem Saarland &amp;
            Luxemburg
          </>
        }
        subtitle="Seit fast drei Jahrzehnten zertifizierter Fachbetrieb für Keramikversiegelung im Saarland und in Luxemburg – für Neuwagen ebenso wie für Sport-, Luxus- und gepflegte Gebrauchtfahrzeuge."
        backgroundImage="https://images.unsplash.com/photo-1607603750909-408e193868c7?w=2400&q=85&auto=format&fit=crop"
      />

      {/* Intro-Sektion */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10 space-y-6 text-[var(--ink-dim)] leading-relaxed text-base sm:text-lg">
          <Reveal>
            <p>
              Eine Keramikversiegelung ist eine glasartige Schutzschicht auf
              Basis von Siliziumoxid, die sich dauerhaft mit dem Autolack
              verbindet und ihn vor Umwelteinflüssen, Mikrokratzern und Korrosion
              schützt. Da wir uns bei PB Fahrzeugpflege Saarlouis höchster
              Qualität verschrieben haben, dauert eine solche Behandlung nicht
              selten 2–3 Tage.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              Der Lack bei Neuwagen befindet sich im absoluten Rohzustand und
              ist äußeren Einflüssen wie Flugrost, Insektenresten, Baumharz und
              Mikrokratzern (z.&nbsp;B. durch die Waschanlage) schutzlos
              ausgesetzt. Gerade in den ersten Kilometern können sich diese
              Schäden in den noch frischen Klarlack einbrennen. Deshalb ist
              unsere Keramikversiegelung direkt ab dem ersten Kilometer die
              beste Wahl, um den Lack langfristig zu schützen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Warum PB — H2 mit Sub-Sektionen */}
      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
              <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
              Warum PB Fahrzeugpflege
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-10">
              Warum sollte die Neuwagen-Keramikversiegelung von PB
              Fahrzeugpflege Saarlouis® durchgeführt werden?
            </h2>
          </Reveal>

          <div className="space-y-10 text-[var(--ink-dim)] leading-relaxed">
            <Reveal delay={0.1}>
              <p>
                Ihr neues Fahrzeug ist ein Statement, eine Investition und oft
                ein lang ersehnter Wunsch, der in Erfüllung geht. Doch genau in
                diesem Neuzustand ist der Lack Ihres Fahrzeugs am
                empfindlichsten – sozusagen im ungeschützten Rohzustand. Dieser
                Moment, bevor Ihr Auto den ersten Kilometer auf der Straße
                zurückgelegt hat, ist der entscheidende Zeitpunkt, um den Lack
                optimal zu schützen. Und genau hier kommt unsere glasartige
                Keramikversiegelung für Neuwagen und hochwertige Sportfahrzeuge
                ins Spiel.
              </p>
            </Reveal>

            <div>
              <Reveal>
                <h3 className="font-display text-2xl sm:text-3xl leading-snug tracking-[-0.015em] text-[var(--ink)]">
                  Neuwagen-Lackschutz ab dem ersten Kilometer – weil Perfektion
                  keine Kompromisse kennt
                </h3>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-5">
                  Stellen Sie sich vor, Ihr Fahrzeuglack – unberührt, makellos –
                  trifft auf die raue Realität der Straße: Insekten, Vogelkot,
                  Baumharz, Sahara-Sand, Industriestaub, Blütenstaub, Streusalz,
                  Eis und Schnee. All diese Elemente sind nicht nur störend,
                  sondern können den empfindlichen Lack Ihres Neuwagens in
                  kürzester Zeit angreifen und irreparable Schäden verursachen.
                  Schon wenige Tage können ausreichen, um den Wert und die
                  Ästhetik Ihres Fahrzeugs nachhaltig zu beeinträchtigen.
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h3 className="font-display text-2xl sm:text-3xl leading-snug tracking-[-0.015em] text-[var(--ink)]">
                  Vergessen Sie die Märchen – vertrauen Sie auf Expertise
                </h3>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-5">
                  Vielleicht wurde Ihnen beim Kauf gesagt, dass das Autohaus den
                  Lack bereits „versiegelt" hat. In der Praxis handelt es sich
                  dabei meist nur um eine einfache Wachs- oder Polymerbehandlung
                  – nicht um eine vollwertige Keramikversiegelung. Lassen Sie
                  sich genau erklären, was tatsächlich aufgetragen wurde, bevor
                  Sie auf zusätzlichen Schutz verzichten.
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h3 className="font-display text-2xl sm:text-3xl leading-snug tracking-[-0.015em] text-[var(--ink)]">
                  Warum ausgerechnet die PB Fahrzeugpflege Saarlouis
                  Keramikversiegelung?
                </h3>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-5">
                  Unsere Keramikversiegelung bietet weit mehr als nur
                  oberflächlichen Schutz. Sie bildet eine unsichtbare, aber
                  extrem widerstandsfähige Schutzbarriere, die das Eindringen
                  von Schadstoffen verhindert und den Lack Ihres Fahrzeugs
                  langfristig in neuwertigem Zustand erhält. Mit unserer
                  Keramikversiegelung legen Sie den Grundstein für eine
                  Werterhaltung, die dem Anspruch Ihres Neufahrzeugs gerecht
                  wird.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4">
                  Bei PB Fahrzeugpflege Saarlouis® setzen wir auf höchste
                  Präzision, erstklassige Produkte und jahrzehntelange
                  Erfahrung, um Ihnen den besten Schutz für Ihr Fahrzeug zu
                  bieten. Schützen Sie Ihre Investition – von Anfang an.
                  Vertrauen Sie auf die Profis, die wissen, was Ihr Fahrzeug
                  wirklich braucht.
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h3 className="font-display text-2xl sm:text-3xl leading-snug tracking-[-0.015em] text-[var(--ink)]">
                  Präzision und Perfektion in jeder Phase
                </h3>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-5">
                  Unsere speziell geschulten Mitarbeiter nehmen sich die Zeit,
                  die Ihr Fahrzeug verdient. In penibler Handarbeit – oft sind
                  dafür mehr als 20 Stunden erforderlich – tragen wir eine
                  hochmoderne, keramische Siliziumoxid-Beschichtung auf den
                  empfindlichen Klarlack Ihres Fahrzeugs auf. Diese glasartige
                  Schicht wirkt wie ein unsichtbarer Schutzpanzer und schützt
                  den Lack Ihres Neuwagens vor den täglichen Herausforderungen,
                  denen er auf der Straße ausgesetzt ist.
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h3 className="font-display text-2xl sm:text-3xl leading-snug tracking-[-0.015em] text-[var(--ink)]">
                  Der Schutz, den Ihr Fahrzeug verdient
                </h3>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-5">
                  Die von uns verwendete Keramikversiegelung basiert auf
                  speziellen keramischen Verbindungen, die eine extreme
                  Widerstandsfähigkeit gewährleisten. Diese Versiegelung ist so
                  robust, dass sie in unseren internen Tests nur mit
                  Schleifpaste und Poliermaschine wieder entfernt werden konnte.
                  Das bedeutet, dass Ihr Lack ab sofort besser geschützt ist als
                  je zuvor – gegen alles, was die Umwelt Ihrem Fahrzeug
                  entgegensetzen könnte.
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h3 className="font-display text-2xl sm:text-3xl leading-snug tracking-[-0.015em] text-[var(--ink)]">
                  Widerstandsfähigkeit, die sich bewährt hat
                </h3>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-5">
                  Sobald die Keramikversiegelung aufgetragen ist, wird der Lack
                  Ihres Neuwagens deutlich widerstandsfähiger gegenüber
                  Umwelteinflüssen wie UV-Strahlung, Schmutz, Insektenrückständen
                  und vielem mehr. Dieser Schutz ist nicht nur äußerlich
                  sichtbar, sondern bewahrt den Wert und die Ästhetik Ihres
                  Fahrzeugs langfristig.
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h3 className="font-display text-2xl sm:text-3xl leading-snug tracking-[-0.015em] text-[var(--ink)]">
                  Warum PB Fahrzeugpflege Saarlouis®?
                </h3>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-5">
                  PB Fahrzeugpflege Saarlouis® gehört zu den dienstältesten
                  Fahrzeugaufbereitungsbetrieben Deutschlands. Als BRILA
                  zertifizierter Fachbetrieb für Keramikversiegelungen (BRILA
                  Certified Installer), Q-Siegel zertifizierter Qualitätsbetrieb
                  und Anbieter mit über 600 positiven Kundenbewertungen
                  vertrauen seit 1997 Fahrzeugbesitzer aus dem Saarland,
                  Luxemburg und weit darüber hinaus auf unsere Erfahrung. Unsere
                  Leidenschaft für Perfektion und unser unermüdlicher Einsatz
                  für Qualität machen uns zu den führenden Experten für
                  Keramikversiegelung in Saarlouis, dem Saarland und Luxemburg.
                  Vertrauen Sie uns Ihr Fahrzeug an, und wir sorgen dafür, dass
                  es optimal geschützt und immer in bestmöglichem Zustand
                  bleibt.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <blockquote className="mt-8 pl-6 border-l border-[var(--gold)]/40">
                <p className="font-display italic text-2xl sm:text-3xl leading-snug text-chrome">
                  „Für andere reicht das Erzählte, für uns zählt das Erreichte!"
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.15}>
              <p>
                Sie haben noch weitere Fragen zu unserer Keramikversiegelung?
                Dann rufen Sie uns einfach an oder kommen Sie einfach ohne
                Termin zur unverbindlichen Beratung und Angebotserstellung bei
                uns in Saarlouis / Ensdorf vorbei!
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/kontakt/" className="btn-gold">
                  Jetzt kontaktieren
                  <span aria-hidden>→</span>
                </Link>
                <Link href="/preise/" className="btn-glass">
                  Preise ansehen
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Was kostet */}
      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Was kostet eine Keramikversiegelung?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg">
              Die Kosten einer Keramikversiegelung hängen von Fahrzeuggröße,
              Lackzustand und dem gewünschten Schutzaufbau ab. Da wir jedes
              Fahrzeug vor der Versiegelung gründlich aufbereiten, erstellen wir
              Ihnen nach einer kurzen Begutachtung ein transparentes
              Festpreis-Angebot – unverbindlich und auch ohne Termin. Eine
              Übersicht finden Sie auf unserer{" "}
              <Link
                href="/preise/"
                className="text-[var(--gold)] hover:underline underline-offset-4"
              >
                Seite Preise
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Was bringt */}
      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Was bringt eine Keramikversiegelung – und für wen lohnt sie sich?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg mb-6">
              Eine Keramikversiegelung bringt vor allem dreierlei: dauerhaften
              Schutz vor Umwelteinflüssen, einen intensiven, tiefen Glanz und
              eine spürbar leichtere Reinigung dank Abperleffekt. Besonders
              lohnt sie sich bei Fahrzeugen, deren Wert und Erscheinungsbild
              langfristig erhalten bleiben sollen:
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-3 text-[var(--ink-dim)] leading-relaxed">
              <li className="flex gap-3">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                <span>
                  <strong className="text-[var(--ink)]">Neuwagen</strong> –
                  Schutz des empfindlichen Klarlacks ab dem ersten Kilometer.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                <span>
                  <strong className="text-[var(--ink)]">
                    Sport- und Luxusfahrzeuge
                  </strong>{" "}
                  – kompromissloser Werterhalt und dauerhafter Glanz.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                <span>
                  <strong className="text-[var(--ink)]">Gebrauchtwagen</strong>{" "}
                  – nach vorheriger Lackaufbereitung, ideal für hochwertige
                  Fahrzeuge zum Werterhalt.
                </span>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg mt-8">
              Ob sich die Versiegelung für Ihr Fahrzeug lohnt, sagen wir Ihnen
              ehrlich nach einer kurzen Begutachtung.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Keramik oder Nano — Vergleich */}
      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-6">
              Keramik- oder Nanoversiegelung – was ist besser?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg max-w-[70ch] mb-12">
              Die Keramikversiegelung ist härter und hält deutlich länger, die
              Nanoversiegelung ist günstiger und schneller aufgetragen. Welche
              Lösung „besser" ist, hängt von Anspruch, Budget und Fahrzeug ab –
              hier die wichtigsten Unterschiede im Überblick:
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-[1.5rem] overflow-hidden">
              <div className="grid grid-cols-12 gap-0 text-[11px] tracking-[0.28em] uppercase text-[var(--ink-mute)] px-6 sm:px-8 py-5 border-b border-white/5">
                <div className="col-span-12 sm:col-span-4">Kriterium</div>
                <div className="col-span-6 sm:col-span-4 text-[var(--gold)]">
                  Keramikversiegelung
                </div>
                <div className="col-span-6 sm:col-span-4">
                  Nanoversiegelung
                </div>
              </div>
              <ul className="divide-y divide-white/5">
                {vergleich.map((row) => (
                  <li
                    key={row.kriterium}
                    className="grid grid-cols-12 gap-4 px-6 sm:px-8 py-5 text-sm sm:text-base"
                  >
                    <div className="col-span-12 sm:col-span-4 font-medium text-[var(--ink)]">
                      {row.kriterium}
                    </div>
                    <div className="col-span-6 sm:col-span-4 text-[var(--ink-dim)]">
                      {row.keramik}
                    </div>
                    <div className="col-span-6 sm:col-span-4 text-[var(--ink-dim)]">
                      {row.nano}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-10 text-[var(--ink-dim)] leading-relaxed max-w-[70ch]">
              Für Neuwagen, Sport- und Luxusfahrzeuge empfehlen wir in der Regel
              die Keramikversiegelung. Wer eine günstigere Lösung mit kürzerer
              Haltedauer sucht, ist mit unserer{" "}
              <Link
                href="/leistungen/nanoversiegelung/"
                className="text-[var(--gold)] hover:underline underline-offset-4"
              >
                Nanoversiegelung
              </Link>{" "}
              gut beraten.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vorteile & Nachteile */}
      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-6">
              Vorteile und Nachteile einer Keramikversiegelung
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg max-w-[70ch] mb-12">
              Eine Keramikversiegelung bietet erhebliche Vorteile, hat aber auch
              Punkte, die man kennen sollte. Ein ehrlicher Überblick:
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal delay={0.1}>
              <div className="glass rounded-[1.5rem] p-8 h-full">
                <h3 className="font-display text-xl sm:text-2xl tracking-[-0.015em] mb-6">
                  Vorteile
                </h3>
                <ul className="space-y-3 text-[var(--ink-dim)]">
                  {vorteile.map((v) => (
                    <li key={v} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="glass rounded-[1.5rem] p-8 h-full">
                <h3 className="font-display text-xl sm:text-2xl tracking-[-0.015em] mb-6">
                  Nachteile / worauf Sie achten sollten
                </h3>
                <ul className="space-y-3 text-[var(--ink-dim)]">
                  {nachteile.map((n) => (
                    <li key={n} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--ink-mute)] shrink-0" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p className="mt-10 text-[var(--ink-dim)] leading-relaxed max-w-[70ch]">
              Genau deshalb führen wir jede Versiegelung in sorgfältiger
              Handarbeit und nach gründlicher Lackaufbereitung durch.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        id="faq-keramikversiegelung"
        kicker="Häufige Fragen zur Keramikversiegelung"
        title={
          <>
            Antworten rund um Kosten, Haltbarkeit und{" "}
            <span className="italic text-gold">Ablauf.</span>
          </>
        }
        faqs={faqs}
      />

      {/* CTA */}
      <CtaSection
        title={
          <>
            Sprechen wir über die Versiegelung Ihres{" "}
            <span className="italic text-gold">Fahrzeugs.</span>
          </>
        }
        text="Kommen Sie ohne Termin vorbei oder rufen Sie kurz an. Nach einer Begutachtung erhalten Sie ein transparentes Festpreis-Angebot – ehrlich, ohne Überraschungen."
      />
    </main>
  );
}
