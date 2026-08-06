import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FAQ, { type FaqItem } from "@/components/FAQ";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Unfallschaden & Unfallinstandsetzung in Saarlouis & im Saarland",
  },
  description:
    "Unfallschaden im Saarland? Wir regeln alles aus einer Hand – Gutachter, Anwalt, Leihwagen & fachgerechte Karosserieinstandsetzung. Freie Werkstattwahl, ohne Termin.",
  alternates: { canonical: "/unfallschaden/" },
  openGraph: {
    title:
      "Unfallschaden & Unfallinstandsetzung in Saarlouis & im Saarland",
    description:
      "Unfallschaden im Saarland? Wir regeln alles aus einer Hand – Gutachter, Anwalt, Leihwagen & fachgerechte Karosserieinstandsetzung.",
    type: "article",
  },
};

const faqs: FaqItem[] = [
  {
    q: "Was tun nach einem Autounfall?",
    a: "Sichern Sie zuerst die Unfallstelle, leisten Sie bei Bedarf Erste Hilfe und rufen Sie die Polizei, machen Sie Beweisfotos und tauschen Sie die Daten mit dem Unfallgegner aus (Versicherungsnummer, Kennzeichen). Die weitere Abwicklung übernehmen wir für Sie.",
  },
  {
    q: "Wer zahlt nach einem Unfall?",
    a: "Bei einem unverschuldeten Unfall trägt in der Regel die Haftpflichtversicherung des Unfallverursachers die Kosten – Reparatur, Gutachten, Ersatzfahrzeug und häufig auch den Anwalt. Für Sie ist unsere Unterstützung in diesen Fällen kostenlos.",
  },
  {
    q: "Muss ich in die Partnerwerkstatt der Versicherung?",
    a: "Nein. Bei einem unverschuldeten Unfall müssen Sie sich nicht in die Partnerwerkstatt schicken lassen – Sie entscheiden selbst, wer Ihr Fahrzeug repariert.",
  },
  {
    q: "Habe ich freie Werkstattwahl?",
    a: "Ja. Bei einem unverschuldeten Unfall haben Sie das Recht auf freie Werkstattwahl und auf eine fachgerechte, unabhängige Reparatur.",
  },
  {
    q: "Was ist eine merkantile Wertminderung?",
    a: "Das ist der Wertverlust, den ein Fahrzeug trotz fachgerechter Reparatur allein dadurch erleidet, dass es als Unfallfahrzeug gilt. Gerade bei hochwertigen Fahrzeugen kann dieser Betrag erheblich sein.",
  },
  {
    q: "Ist ein Parkschaden ein Unfallschaden?",
    a: "Grundsätzlich ja: Ein Parkschaden zählt als Unfallschaden, da er durch ein äußeres Ereignis entstanden ist. Ob und wie er reguliert wird, hängt vom Einzelfall und der Schuldfrage ab – wir prüfen das gern unverbindlich für Sie.",
  },
];

const eigeneAufgaben = [
  "Erste Hilfe / Polizei (falls erforderlich)",
  "Unfallstelle absichern",
  "Beweisfotos von der Unfallstelle (wichtig wegen Schuldfrage/Zeugen)",
  "Datenaustausch (Personalausweis zeigen lassen, Versicherungsnummer, Kennzeichen)",
];

const uebernahmen = [
  "Unabhängiger Gutachter",
  "Fachanwalt für Verkehrsrecht",
  "Leihfahrzeug",
  "Kommunikation mit der gegnerischen Versicherung",
  "Karosserieinstandsetzung / Lackierung nach Herstellervorgaben",
  "Dokumentation für Wiederverkauf oder Leasingrückgabe",
  "Nur ein Ansprechpartner für alles",
];

const risiken = [
  "Unsachgemäße Reparaturen",
  "Falsche Lackschichtstärken",
  "Fehlende Dokumentation",
  "Unprofessionelle Smart-Repair-Lösungen",
];

export default function UnfallschadenPage() {
  return (
    <main className="relative">
      <PageHero
        kicker="Unfallschaden"
        title="Unfallschaden im Saarland – Abwicklung & Unfallinstandsetzung aus einer Hand"
        subtitle="Wir kümmern uns um alles: von der Begutachtung über die Kommunikation mit der Versicherung bis zur Karosserieinstandsetzung nach Herstellervorgaben. Alles aus einer Hand, ganz ohne Stress."
        backgroundImage="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2400&q=85&auto=format&fit=crop"
      />

      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10 space-y-6 text-[var(--ink-dim)] leading-relaxed text-base sm:text-lg">
          <Reveal>
            <p>
              Nach einem unverschuldeten Unfall im Saarland übernehmen wir für
              Sie die komplette Schadenabwicklung und die fachgerechte
              Reparatur Ihres Fahrzeugs. Bei einem Autounfall geht es nicht
              nur um einen Schaden, sondern um Kontrolle, um Ihr Recht und um
              den tatsächlichen Wert Ihres Fahrzeugs. Genau dabei
              unterstützen wir Sie.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-6">
              Unfall gehabt? Bleiben Sie entspannt – wir sind für Sie da!
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg max-w-[70ch] mb-10">
              Bei einem Autounfall geht es nicht nur um einen Schaden. Es geht
              um Kontrolle, um Ihr Recht und um den tatsächlichen Wert Ihres
              Fahrzeugs. Vielleicht fragen Sie sich gerade:
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-2 text-[var(--ink-dim)] leading-relaxed mb-16">
              <li className="flex gap-3">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                <span>Wer zahlt das alles?</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                <span>Versucht die Versicherung mich abzuzocken?</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                <span>
                  Muss ich in eine Partnerwerkstatt oder habe ich freie
                  Werkstattwahl?
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                <span>Was ist mit einer evtl. Wertminderung?</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                <span>Wie lange bin ich ohne Fahrzeug?</span>
              </li>
            </ul>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal delay={0.15}>
              <div className="glass rounded-[1.5rem] p-8">
                <h3 className="font-display text-xl sm:text-2xl leading-snug tracking-[-0.015em] mb-6">
                  Was jetzt Ihre Aufgabe ist
                </h3>
                <ul className="space-y-3 text-[var(--ink-dim)]">
                  {eigeneAufgaben.map((a) => (
                    <li key={a} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--ink-mute)] shrink-0" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="glass rounded-[1.5rem] p-8">
                <h3 className="font-display text-xl sm:text-2xl leading-snug tracking-[-0.015em] mb-6">
                  …den kompletten Rest übernehmen wir kostenlos* für Sie
                </h3>
                <ul className="space-y-3 text-[var(--ink-dim)]">
                  {uebernahmen.map((u) => (
                    <li key={u} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-[var(--ink-mute)]">
                  * kostenlos für Sie bei Haftpflichtschäden
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Sie sprechen mit uns – wir sprechen mit allen anderen.
            </h2>
          </Reveal>
          <div className="space-y-6 text-[var(--ink-dim)] leading-relaxed text-lg">
            <Reveal delay={0.05}>
              <p>
                Sie erhalten eine klare Einschätzung. Was sinnvoll ist. Was
                wirtschaftlich ist. Und was Sie besser nicht akzeptieren
                sollten.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Keine Werkstattkette. Keine Schnellabfertigung. Keine
                Kompromisse auf Kosten des Fahrzeugwertes.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Besonders wichtig bei hochwertigen Fahrzeugen
            </h2>
          </Reveal>
          <div className="space-y-6 text-[var(--ink-dim)] leading-relaxed text-lg">
            <Reveal delay={0.05}>
              <p>
                Bei Premium- und Sportfahrzeugen entscheidet die Qualität der
                Instandsetzung direkt über den Marktwert. Diese Faktoren
                bleiben im Fahrzeug – und kommen spätestens beim Verkauf oder
                bei der Leasingrückgabe ans Licht:
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-2">
                {risiken.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--ink-mute)] shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Gerade bei höherwertigen Fahrzeugen ist die merkantile
                Wertminderung ein ernstes Thema. Hier geht es nicht um ein paar
                Euro. Hier geht es um Substanz. Wer hier billig repariert,
                zahlt später doppelt.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Versicherungswerkstatt oder eigene Entscheidung?
            </h2>
          </Reveal>
          <div className="space-y-6 text-[var(--ink-dim)] leading-relaxed text-lg">
            <Reveal delay={0.05}>
              <p>
                Viele Versicherer versuchen, Sie in die „Partnerwerkstatt" zu
                bekommen. Das geht dann „schnell, standardisiert, kosteneffizient".
                Hört sich gut an, ist aber für Sie die denkbar schlechteste
                Lösung.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Denn: Die Versicherung denkt in Schadenssummen. Wir denken in
                Werterhalt.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Sie haben das Recht auf eine fachgerechte Reparatur. Und das
                Recht auf unabhängige Unterstützung. Nutzen Sie es.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Wenn Sie gerade betroffen sind, handeln Sie jetzt. Lassen Sie
                den Schaden von uns professionell und kostenlos prüfen, bevor
                Sie irgendetwas unterschreiben oder zusagen.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <div className="mt-10 glass-strong rounded-[1.5rem] p-8">
              <h3 className="font-display text-xl sm:text-2xl leading-snug tracking-[-0.015em] mb-3">
                Schaden checken lassen
              </h3>
              <p className="text-[var(--ink-dim)] text-sm sm:text-base leading-relaxed mb-6">
                Foto per WhatsApp oder Formular – Rückmeldung kurzfristig.
                Alternativ: einfach ohne Termin vorbeikommen.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener"
                  className="btn-gold"
                >
                  WhatsApp senden
                  <span aria-hidden>→</span>
                </a>
                <Link href="/kontakt/" className="btn-glass">
                  Formular
                </Link>
                <a href={SITE.phone.href} className="btn-glass">
                  {SITE.phone.display}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Wer zahlt nach einem Unfall?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg">
              Bei einem unverschuldeten Unfall trägt in der Regel die
              Haftpflichtversicherung des Unfallverursachers die Kosten –
              darunter die Reparatur, ein unabhängiges Gutachten, ein
              Ersatzfahrzeug und in vielen Fällen auch einen Anwalt. Für Sie
              ist unsere Unterstützung in diesen Fällen daher kostenlos. Im
              Zweifel prüfen wir Ihren Fall unverbindlich, bevor Sie etwas
              unterschreiben.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Unfallinstandsetzung &amp; Karosseriearbeiten im Saarland
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg">
              Wir setzen Ihr Fahrzeug nach einem Unfall fachgerecht und nach
              Herstellervorgaben instand – von der Karosserieinstandsetzung
              über die Lackierung bis zur Dokumentation für Wiederverkauf oder
              Leasingrückgabe. Dank unseres Netzwerks aus Karosseriebauern,
              Lackierern und unabhängigen Gutachtern erhalten Sie alles aus
              einer Hand.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg mt-4">
              Sie finden uns in der Provinzialstraße 243 in 66806 Ensdorf –
              direkt bei Saarlouis. Wir sind für Kunden aus dem gesamten
              Saarland da, u.&nbsp;a. aus Saarlouis, Saarbrücken, Dillingen
              und St.&nbsp;Wendel, sowie aus dem grenznahen Raum. Eine
              unverbindliche Begutachtung ist auch ohne Termin möglich – senden
              Sie uns gern vorab ein Foto per WhatsApp oder über unser
              Formular.
            </p>
          </Reveal>
        </div>
      </section>

      <FAQ
        id="faq-unfallschaden"
        kicker="Häufige Fragen zum Unfallschaden"
        title={
          <>
            Antworten rund um Recht, Kosten und{" "}
            <span className="italic text-gold">Werkstattwahl.</span>
          </>
        }
        faqs={faqs}
      />

      <CtaSection
        title={
          <>
            Zuerst prüfen –{" "}
            <span className="italic text-gold">dann entscheiden.</span>
          </>
        }
        text="Bevor Sie eine Partnerwerkstatt akzeptieren oder eine Regulierung unterschreiben: lassen Sie den Schaden von uns kostenlos prüfen. Wir schaffen Klarheit."
      />
    </main>
  );
}
