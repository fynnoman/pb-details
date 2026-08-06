import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: { absolute: "Teilnahmebedingungen Facebook Gewinnspiel" },
  description:
    "Mit dieser Aktion möchten wir unseren Kunden und Followern eine besondere Gewinnchance bieten. Grundlage der Teilnahme sind die folgenden Bedingungen.",
  alternates: { canonical: "/teilnahmebedingungen-gewinnspiel/" },
};

const paragraphs: { h: string; body: React.ReactNode }[] = [
  {
    h: "1. Anerkennung der Teilnahmebedingungen",
    body: "Mit der Teilnahme am Gewinnspiel erkennt der Teilnehmer verbindlich die nachfolgenden Teilnahmebedingungen an.",
  },
  {
    h: "2. Teilnahmeberechtigung",
    body: (
      <>
        <p>
          Teilnahmeberechtigt sind alle natürlichen Personen ab 18 Jahren. Eine
          Gewinnauszahlung an Minderjährige ist ausgeschlossen.
        </p>
        <p className="mt-3">Von der Teilnahme ausgeschlossen sind:</p>
        <ul className="mt-3 space-y-2">
          <li className="flex gap-3">
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--ink-mute)] shrink-0" />
            <span>
              Mitarbeiter von PB Fahrzeugpflege sowie deren Angehörige ersten
              und zweiten Grades,
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--ink-mute)] shrink-0" />
            <span>
              Personen, die mit der Durchführung der Aktion beschäftigt sind
              oder waren,
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--ink-mute)] shrink-0" />
            <span>
              Teilnehmer, die versuchen, den Ablauf zu manipulieren oder gegen
              diese Teilnahmebedingungen verstoßen.
            </span>
          </li>
        </ul>
        <p className="mt-3">
          PB Fahrzeugpflege behält sich vor, das Alter der Gewinner vor der
          Gewinnübergabe zu überprüfen.
        </p>
      </>
    ),
  },
  {
    h: "3. Aktionszeitraum",
    body: (
      <>
        <p>
          Die Teilnahme ist ab Veröffentlichung des offiziellen Facebook-Posts
          bis zum Annahmeschluss der jeweiligen Eurojackpot-Ziehung möglich.
        </p>
        <p className="mt-3">
          PB Fahrzeugpflege behält sich das Recht vor, die Aktion jederzeit
          ohne Angabe von Gründen abzubrechen oder zu ändern, sofern eine
          ordnungsgemäße Durchführung nicht gewährleistet werden kann.
        </p>
      </>
    ),
  },
  {
    h: "4. Teilnahme & Ablauf",
    body: (
      <ul className="space-y-2">
        <li className="flex gap-3">
          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
          <span>
            Die Teilnahme erfolgt durch ein „Gefällt mir", einen Kommentar oder
            das Teilen des Gewinnspiel-Posts auf der offiziellen Facebook-Seite
            von PB Fahrzeugpflege.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
          <span>
            Der Inhalt des Kommentars hat keinen Einfluss auf die Gewinnchance,
            darf jedoch nicht gegen geltendes Recht oder die guten Sitten
            verstoßen.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
          <span>
            PB Fahrzeugpflege nimmt mit den im Post veröffentlichten Zahlen an
            der Eurojackpot-Ziehung teil.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
          <span>
            Sollte PB Fahrzeugpflege den Jackpot (5 + 2 Zahlen) gewinnen, wird
            der Gewinn gleichmäßig auf alle teilnehmenden Personen sowie PB
            Fahrzeugpflege verteilt.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
          <span>
            Bei Gewinnen außerhalb des Jackpots erfolgt keine Ausschüttung.
          </span>
        </li>
      </ul>
    ),
  },
  {
    h: "5. Gewinn",
    body: (
      <>
        <p>
          Der Gewinn besteht in einer Gewinnbeteiligung an der Gewinnsumme des
          Eurojackpots, sofern dieser von PB Fahrzeugpflege mit den getippten
          Zahlen tatsächlich gewonnen wird.
        </p>
        <p className="mt-3">
          Die Gewinnsumme wird gleichmäßig pro Kopf unter allen gültigen
          Teilnehmern und PB Fahrzeugpflege aufgeteilt. Eine Ausschüttung
          erfolgt ausschließlich dann, wenn und sobald der jeweilige
          Gewinnbetrag von der zuständigen Lotteriegesellschaft tatsächlich an
          PB Fahrzeugpflege ausgezahlt wurde.
        </p>
        <p className="mt-3">Der Gewinn ist nicht übertragbar.</p>
      </>
    ),
  },
  {
    h: "6. Datenschutz & Veröffentlichung",
    body: (
      <>
        <p>
          Die personenbezogenen Daten der Teilnehmer werden ausschließlich zum
          Zwecke der Durchführung des Gewinnspiels verarbeitet und
          anschließend gelöscht.
        </p>
        <p className="mt-3">
          Mit Teilnahme erklärt sich der Gewinner damit einverstanden, dass
          sein Vorname, Nachname sowie Wohnort im Falle eines Gewinns auf der
          Website und den Social-Media-Kanälen von PB Fahrzeugpflege
          veröffentlicht werden dürfen. Eine medienwirksame Gewinnübergabe
          (Foto oder Video) kann durch PB Fahrzeugpflege durchgeführt werden.
        </p>
      </>
    ),
  },
  {
    h: "7. Haftungsausschluss",
    body: "PB Fahrzeugpflege haftet nicht für technische Störungen, Übertragungsverzögerungen oder Datenverluste, die eine Teilnahme am Gewinnspiel verhindern. Ebenso übernimmt PB Fahrzeugpflege keine Haftung für fehlerhafte Angaben durch Teilnehmer.",
  },
  {
    h: "8. Schriftformerfordernis / Salvatorische Klausel",
    body: "Änderungen oder Ergänzungen dieser Teilnahmebedingungen bedürfen der Schriftform. Sollte eine Bestimmung unwirksam sein, bleiben die übrigen Bestimmungen davon unberührt.",
  },
  {
    h: "9. Rechtsweg",
    body: "Der Rechtsweg ist ausgeschlossen.",
  },
];

export default function GewinnspielPage() {
  return (
    <main className="relative">
      <PageHero
        kicker="Facebook-Aktion"
        title={
          <>
            Teilnahmebedingungen „PB Fahrzeugpflege Eurojackpot-Aktion"
          </>
        }
        subtitle={
          <>
            Die PB Fahrzeugpflege Saarlouis, Provinzialstraße 243, 66806
            Ensdorf, veranstaltet das Gewinnspiel „PB Fahrzeugpflege
            Eurojackpot-Aktion" über die firmeneigene Facebook-Seite. Mit
            dieser Aktion möchten wir unseren Kunden und Followern eine
            besondere Gewinnchance bieten.
          </>
        }
      />

      <section className="relative pb-24 sm:pb-32">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10 space-y-10 text-[var(--ink-dim)] leading-relaxed">
          {paragraphs.map((p, i) => (
            <Reveal key={p.h} delay={i * 0.03}>
              <div>
                <h2 className="font-display text-xl sm:text-2xl tracking-[-0.015em] mb-4 text-[var(--ink)]">
                  {p.h}
                </h2>
                <div>{p.body}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
