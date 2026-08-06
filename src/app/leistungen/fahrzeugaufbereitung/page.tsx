import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FAQ, { type FaqItem } from "@/components/FAQ";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbList,
  faqPageSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Fahrzeugaufbereitung in Saarlouis & im Saarland" },
  description:
    "Professionelle Fahrzeugaufbereitung innen & außen im Saarland & Luxemburg – Lack- und Innenraum-Aufbereitung vom Profi, seit 1997. Über 648 Top-Bewertungen.",
  alternates: { canonical: "/leistungen/fahrzeugaufbereitung/" },
  openGraph: {
    title: "Fahrzeugaufbereitung in Saarlouis & im Saarland",
    description:
      "Professionelle Fahrzeugaufbereitung innen & außen im Saarland & Luxemburg – Lack- und Innenraum-Aufbereitung vom Profi.",
    type: "article",
  },
};

const faqs: FaqItem[] = [
  {
    q: "Was kostet eine Fahrzeugaufbereitung?",
    a: "Die Kosten richten sich nach Fahrzeuggröße, Zustand und Umfang. Eine reine Innenraumaufbereitung ist günstiger als eine komplette Aufbereitung mit Lackpolitur und Versiegelung. Nach einer kurzen Begutachtung erhalten Sie ein transparentes Angebot – auch ohne Termin. Preise finden Sie auf unserer Seite Preise.",
  },
  {
    q: "Wie lange dauert eine Fahrzeugaufbereitung?",
    a: "Je nach Umfang und Fahrzeugzustand dauert eine komplette Fahrzeugaufbereitung in der Regel zwei bis drei Werktage, da wir in mehreren Stufen und in Handarbeit arbeiten.",
  },
  {
    q: "Was gehört zu einer professionellen Fahrzeugaufbereitung?",
    a: "Eine professionelle Fahrzeugaufbereitung umfasst die Außen- bzw. Lackaufbereitung (Vorwäsche, Handwäsche, Lackreinigung, Politur und Versiegelung) sowie die Innenraumaufbereitung (Staubsaugen, Polster- und Lederreinigung, Kunststoffpflege, Scheiben und Desinfektion).",
  },
  {
    q: "Lohnt sich eine Fahrzeugaufbereitung vor dem Verkauf?",
    a: "Ja. Ein makelloser Zustand steigert den Verkaufspreis, sorgt für einen starken ersten Eindruck und minimiert bei einer Leasingrückgabe mögliche Nachberechnungen.",
  },
  {
    q: "Was kostet eine Innenraumaufbereitung?",
    a: "Eine reine Innenraumaufbereitung kostet weniger als eine komplette Aufbereitung. Der genaue Preis hängt vom Verschmutzungsgrad und der Fahrzeuggröße ab – ein verbindliches Angebot erhalten Sie nach kurzer Begutachtung.",
  },
  {
    q: "Was ist der Unterschied zwischen einer Autowäsche und einer Fahrzeugaufbereitung?",
    a: "Eine Autowäsche reinigt das Fahrzeug nur oberflächlich. Eine Fahrzeugaufbereitung reinigt, poliert, versiegelt und bereitet zusätzlich den Innenraum auf – das Ergebnis ist Werterhalt und langanhaltender Schutz statt kurzfristiger Sauberkeit.",
  },
];

const lackSchritte = [
  "Vorreinigung mit Hochdruck: Gründliche Entfernung von grobem Schmutz.",
  "Handwäsche von Profis: Schonende Reinigung, die jedes Detail berücksichtigt.",
  "Spezialreinigung: Embleme, Schriftzüge und Auspuffblenden werden akribisch gepflegt.",
  "Entfernung von Lackverunreinigungen: Beseitigung von Insekten, Teer, Flugrost und mehr.",
  "Felgenreinigung: Tiefenreinigung für strahlenden Glanz.",
  "Maschinelle & manuelle Lackreinigung: Entfernt tiefsitzenden Schmutz und Kratzer.",
  "Politur: Anti-Hologramm-Hochglanzpolitur für makellosen Glanz.",
  "Versiegelung: Auswahl aus Carnaubawachs, Nanoversiegelung oder 9H High-End Keramikversiegelung.",
];

const innenSchritte = [
  "Gründliche Staubsaugung: Erfasst auch schwer zugängliche Bereiche.",
  "Tiefenreinigung von Polstern und Teppichen: Entfernt tiefsitzenden Schmutz und Flecken.",
  "Lederpflege: Reinigung und Pflege für langanhaltenden Schutz und Geschmeidigkeit.",
  "Kunststoff- und Armaturenpflege: Sorgt für ein makelloses Finish.",
  "Scheibenreinigung: Für eine klare Sicht und strahlende Sauberkeit.",
  "Desinfektion & Geruchsbeseitigung: Frisches, hygienisches Innenraumklima.",
];

const vergleich = [
  { kriterium: "Umfang", waesche: "Schnelle Außenreinigung", aufbereitung: "Mehrstufige Reinigung & Aufbereitung innen und außen" },
  { kriterium: "Lack", waesche: "Nur oberflächlich sauber", aufbereitung: "Reinigung, Politur und Versiegelung" },
  { kriterium: "Innenraum", waesche: "Meist nicht enthalten", aufbereitung: "Tiefenreinigung von Polstern, Leder, Desinfektion" },
  { kriterium: "Dauer", waesche: "Wenige Minuten", aufbereitung: "In der Regel 2–3 Werktage" },
  { kriterium: "Ergebnis", waesche: "Sauberkeit auf Zeit", aufbereitung: "Werterhalt & langanhaltender Schutz" },
];

const path = "/leistungen/fahrzeugaufbereitung/";

export default function FahrzeugaufbereitungPage() {
  const webPage = webPageSchema({
    path,
    name: "Fahrzeugaufbereitung in Saarlouis & im Saarland",
    description:
      "Professionelle Fahrzeugaufbereitung innen & außen im Saarland & Luxemburg.",
    breadcrumb: breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Leistungen", path: "/leistungen/" },
      { name: "Fahrzeugaufbereitung", path },
    ]),
  });
  const service = serviceSchema({
    name: "Fahrzeugaufbereitung",
    description:
      "Mehrstufige Innen- und Außenaufbereitung – Vorwäsche, Handwäsche, Lackreinigung, Politur und Versiegelung sowie Polster-, Leder- und Kunststoffpflege.",
    path,
    serviceType: "Fahrzeugaufbereitung",
  });
  return (
    <main className="relative">
      <JsonLd data={[webPage, service, faqPageSchema(faqs)]} />
      <PageHero
        kicker="03 / Leistung · Fahrzeugaufbereitung"
        title="Fahrzeugaufbereitung in Saarlouis, dem Saarland & Luxemburg"
        subtitle="Weit mehr als eine normale Autowäsche: mehrstufige, individuell abgestimmte Aufbereitung aus Lack- und Innenraumbehandlung – in der Regel zwei bis drei Werktage."
        backgroundImage="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=2400&q=85&auto=format&fit=crop"
      />

      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10 space-y-6 text-[var(--ink-dim)] leading-relaxed text-base sm:text-lg">
          <Reveal>
            <p>
              Bei einer professionellen Fahrzeugaufbereitung – auch
              Autoaufbereitung genannt – wird Ihr Fahrzeug innen und außen
              gründlich gereinigt, aufbereitet und geschützt: weit mehr als
              eine normale Autowäsche.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              Bei PB Fahrzeugpflege Saarlouis umfasst unser
              Premium-Detailing-Paket ein mehrstufiges, individuell
              abgestimmtes Programm aus Lack- und Innenraumaufbereitung und
              dauert je nach Umfang in der Regel zwei bis drei Werktage.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Reveal>
              <div className="glass rounded-[1.5rem] p-8 h-full">
                <h2 className="font-display text-2xl sm:text-3xl leading-tight tracking-[-0.015em] mb-6">
                  Lackaufbereitung
                </h2>
                <p className="text-[var(--ink-dim)] leading-relaxed mb-6">
                  Perfekter Glanz und langanhaltender Schutz – für
                  Fahrzeugliebhaber, die ihr Auto in perfektem Zustand genießen
                  möchten:
                </p>
                <ul className="space-y-3 text-[var(--ink-dim)]">
                  {lackSchritte.map((s) => (
                    <li key={s} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="glass rounded-[1.5rem] p-8 h-full">
                <h2 className="font-display text-2xl sm:text-3xl leading-tight tracking-[-0.015em] mb-6">
                  Innenraumaufbereitung
                </h2>
                <p className="text-[var(--ink-dim)] leading-relaxed mb-6">
                  Sauberkeit und Komfort auf höchstem Niveau – für
                  Fahrzeugbesitzer, die das Beste aus ihrem Innenraum
                  herausholen möchten:
                </p>
                <ul className="space-y-3 text-[var(--ink-dim)]">
                  {innenSchritte.map((s) => (
                    <li key={s} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <p className="mt-10 text-[var(--ink-dim)] leading-relaxed max-w-[70ch]">
              Für Verkauf oder Leasingrückgabe optimieren wir gezielt den
              Fahrzeugzustand: Wertsteigerung durch makellosen Auftritt,
              bleibender erster Eindruck und Minimierung von möglichen
              Nachberechnungen. Je nach Zweck (Hochzeit, Fahrzeugverkauf,
              Leasingrückgabe, Werterhalt etc.) bieten wir verschiedene
              Detailing-Levels an. Gerne beraten wir Sie ausführlich in einem
              persönlichen Gespräch direkt bei uns vor Ort – ein Termin ist
              nicht erforderlich. Dauer: ca. 2–3 Werktage.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Was kostet eine Fahrzeugaufbereitung?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg">
              Die Kosten einer Fahrzeugaufbereitung hängen von Fahrzeuggröße,
              Zustand und gewünschtem Umfang ab – eine reine
              Innenraumaufbereitung kostet weniger als eine komplette
              Aufbereitung mit Lackpolitur und Versiegelung. Da wir jedes
              Fahrzeug individuell beurteilen, erstellen wir Ihnen nach einer
              kurzen Begutachtung ein transparentes Angebot, unverbindlich und
              ohne Termin. Eine Übersicht finden Sie auf unserer{" "}
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

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Fahrzeugaufbereitung im Saarland, in Saarlouis & Umgebung
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg">
              Sie finden uns in der Provinzialstraße 243 in 66806 Ensdorf –
              direkt bei Saarlouis. Zu uns kommen Kunden aus dem gesamten
              Saarland, u.&nbsp;a. aus Saarlouis, Saarbrücken, Dillingen und
              St.&nbsp;Wendel, sowie aus Trier, Luxemburg und dem grenznahen
              Raum. Eine unverbindliche Begutachtung ist während der
              Öffnungszeiten auch ohne Termin möglich.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-6">
              Autowäsche oder Fahrzeugaufbereitung – der Unterschied
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg max-w-[70ch] mb-12">
              Eine Autowäsche reinigt das Fahrzeug oberflächlich, eine
              Fahrzeugaufbereitung reinigt, bereitet auf und schützt Innenraum
              und Lack mehrstufig. Der Unterschied im Überblick:
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-[1.5rem] overflow-hidden">
              <div className="grid grid-cols-12 gap-0 text-[11px] tracking-[0.28em] uppercase text-[var(--ink-mute)] px-6 sm:px-8 py-5 border-b border-white/5">
                <div className="col-span-12 sm:col-span-4">Kriterium</div>
                <div className="col-span-6 sm:col-span-4">Autowäsche</div>
                <div className="col-span-6 sm:col-span-4 text-[var(--gold)]">
                  Fahrzeugaufbereitung
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
                      {row.waesche}
                    </div>
                    <div className="col-span-6 sm:col-span-4 text-[var(--ink-dim)]">
                      {row.aufbereitung}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQ
        id="faq-fahrzeugaufbereitung"
        kicker="Häufige Fragen zur Fahrzeugaufbereitung"
        title={
          <>
            Antworten rund um Umfang, Dauer und{" "}
            <span className="italic text-gold">Werterhalt.</span>
          </>
        }
        faqs={faqs}
      />

      <CtaSection
        title={
          <>
            Innen- und außen{" "}
            <span className="italic text-gold">wie neu.</span>
          </>
        }
        text="Ob vor Fahrzeugverkauf, Leasingrückgabe oder einfach für den eigenen Werterhalt – kommen Sie unverbindlich vorbei. Wir sehen uns Ihr Fahrzeug an und erstellen ein transparentes Angebot."
      />
    </main>
  );
}
