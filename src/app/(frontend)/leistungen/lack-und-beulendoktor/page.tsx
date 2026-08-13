import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FAQ, { type FaqItem } from "@/components/FAQ";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbList,
  faqPageSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";

const jahreErfahrung = new Date().getFullYear() - SITE.founded;

export const metadata: Metadata = {
  title: { absolute: "Beulendoktor & Smart Repair in Saarlouis & im Saarland" },
  description:
    "Beulendoktor & Smart Repair im Saarland & Luxemburg – Dellen und Lackschäden ohne Lackieren reparieren, bis zu 70 % günstiger. Seit 1997, über 648 Top-Bewertungen.",
  alternates: { canonical: "/leistungen/lack-und-beulendoktor/" },
  openGraph: {
    title: "Beulendoktor & Smart Repair in Saarlouis & im Saarland",
    description:
      "Beulendoktor & Smart Repair im Saarland & Luxemburg – Dellen und Lackschäden ohne Lackieren reparieren, bis zu 70 % günstiger.",
    type: "article",
  },
};

const faqs: FaqItem[] = [
  {
    q: "Was kostet Smart Repair?",
    a: "Die Kosten richten sich nach Art, Größe und Lage des Schadens. Da nur die beschädigte Stelle bearbeitet wird, ist Smart Repair bis zu 70 % günstiger als eine herkömmliche Lackierung. Den genauen Preis nennen wir Ihnen nach einer kurzen Begutachtung – auch ohne Termin.",
  },
  {
    q: "Kann man Dellen ohne Lackieren entfernen?",
    a: "Ja. Kleinere Dellen und Beulen lassen sich mit der lackschadenfreien Ausbeultechnik entfernen, ohne den Originallack zu beschädigen – das ist schneller und günstiger als Spachteln und Lackieren.",
  },
  {
    q: "Wie funktioniert die Ausbeultechnik beim Beulendoktor?",
    a: "Bei der Ausbeultechnik wird die Delle mit speziellen Hebel- und Klebewerkzeugen vorsichtig zurück in die ursprüngliche Form gebracht. Der Lack bleibt dabei vollständig erhalten – auch bei modernen Materialien wie Aluminium.",
  },
  {
    q: "Was ist der Unterschied zwischen Smart Repair und einer Lackierung?",
    a: "Smart Repair repariert kleine Schäden punktuell und ist deutlich günstiger und schneller. Eine klassische Lackierung erneuert ganze Bauteile und ist aufwendiger. Für kleine Dellen und Lackschäden ist Smart Repair meist die bessere Wahl.",
  },
  {
    q: "Wie lange dauert eine Beulenreparatur?",
    a: "Eine Beulenreparatur dauert in der Regel etwa einen halben Werktag, eine Lackreparatur ca. drei Werktage – ideal vor einer Leasingrückgabe oder einem Fahrzeugverkauf.",
  },
  {
    q: "Lohnt sich Smart Repair?",
    a: "Ja. Smart Repair ist bis zu 70 % günstiger als eine Lackierung, schneller erledigt und verursacht durch die kleine Reparaturfläche weniger Wertminderung – Ihr Fahrzeug bleibt wertvoll.",
  },
];

const smartVorteile = [
  `Über ${jahreErfahrung} Jahre Erfahrung in der Reparatur von Beulen und Lackschäden.`,
  "Ausgezeichnete Qualität: mehrfach für unseren erstklassigen Service und die herausragende Qualität ausgezeichnet.",
  "Hohe Kundenzufriedenheit: Weiterempfehlungsrate von über 95 %.",
  "Schnelle Reparaturzeit: Beulenreparatur ca. 0,5 Werktage, Lackreparaturen ca. 3 Werktage.",
  "Kostenersparnis: mit Smart Repair bis zu 70 % sparen gegenüber herkömmlichen Lackierungen.",
  "Umweltschonend: geringerer Materialverbrauch, nachhaltige Lackreparatur.",
  "Wertsteigerung: kleinere Reparaturflächen bedeuten weniger Wertminderung.",
];

const beulendoktorVorteile = [
  "Lackschadenfreie Ausbeultechnik: entfernt Beulen und Dellen ohne den Lack zu beeinträchtigen.",
  `Über ${jahreErfahrung} Jahre Erfahrung mit Präzision und moderner Ausrüstung.`,
  "Spezialisierung auf moderne Materialien: sicheres Arbeiten auch bei Aluminium und Thermoglas.",
  "Fachgerechte Reparaturen, die verhindern, dass aus kleinen Beulen große Probleme werden.",
  "Über 600 positive Bewertungen: zufriedene Kunden sprechen für sich.",
];

const vergleich = [
  { kriterium: "Kosten", smart: "Bis zu 70 % günstiger", lackierung: "Höher – ganzes Bauteil" },
  { kriterium: "Umfang", smart: "Punktuelle Reparatur kleiner Schäden", lackierung: "Lackierung kompletter Bauteile" },
  { kriterium: "Dauer", smart: "Beule ca. 0,5 · Lack ca. 3 Werktage", lackierung: "Meist länger" },
  { kriterium: "Wertminderung", smart: "Gering – kleine Reparaturfläche", lackierung: "Höher, ggf. dokumentationspflichtig" },
  { kriterium: "Ideal für", smart: "Parkdellen, kleine Lack- & Karosserieschäden", lackierung: "Großflächige oder tiefe Schäden" },
];

const path = "/leistungen/lack-und-beulendoktor/";

export default function LackBeulendoktorPage() {
  const webPage = webPageSchema({
    path,
    name: "Beulendoktor & Smart Repair in Saarlouis & im Saarland",
    description:
      "Beulendoktor & Smart Repair im Saarland & Luxemburg – Dellen und Lackschäden bis zu 70 % günstiger als eine klassische Lackierung.",
    breadcrumb: breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Leistungen", path: "/leistungen/" },
      { name: "Lack- & Beulendoktor", path },
    ]),
  });
  const service = serviceSchema({
    name: "Lack- & Beulendoktor / Smart Repair",
    description:
      "Punktuelle Reparatur kleiner Lack- und Karosserieschäden mit lackschadenfreier Ausbeultechnik (Paintless Dent Repair) und Smart Repair.",
    path,
    serviceType: "Smart Repair",
  });
  return (
    <main className="relative">
      <JsonLd data={[webPage, service, faqPageSchema(faqs)]} />
      <PageHero
        kicker="04 / Leistung · Lack- & Beulendoktor"
        title="Beulendoktor & Smart Repair in Saarlouis, dem Saarland & Luxemburg"
        subtitle="Lackschäden und Beulen am Fahrzeug schnell, effektiv und kostengünstig reparieren – mit Verfahren, die den Originallack Ihres Fahrzeugs erhalten."
        backgroundImage="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=2400&q=85&auto=format&fit=crop"
      />

      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10 space-y-6 text-[var(--ink-dim)] leading-relaxed text-base sm:text-lg">
          <Reveal>
            <p>
              Beulendoktor &amp; Smart Repair bei PB Fahrzeugpflege Saarlouis:
              Ihr Fahrzeug ist mehr als nur ein Transportmittel – es ist ein
              wertvolles Gut, das perfekte Pflege verdient. Unser Smart-Repair-
              Verfahren bietet Ihnen die ideale Lösung, um Lackschäden schnell,
              effektiv und kostengünstig zu beheben – in einer Qualität, die
              nur ein Premiumbetrieb wie unserer garantieren kann.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-4">
              Smart Repair Saarland – Lackschäden günstig reparieren
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg max-w-[70ch] mb-10">
              Ihre Smart-Repair-Vorteile im Überblick:
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {smartVorteile.map((v, i) => (
              <Reveal key={v} delay={i * 0.03}>
                <div className="glass-flat rounded-2xl px-6 py-5 h-full flex gap-3">
                  <span className="mt-2 shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-[#f5e2b8] to-[#8a6a3f] flex items-center justify-center text-[8px] text-black">
                    ✓
                  </span>
                  <span className="text-[var(--ink-dim)] text-sm sm:text-base leading-relaxed">
                    {v}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-10 text-[var(--ink-dim)] leading-relaxed max-w-[70ch]">
              Unsere Philosophie: Qualität steht bei uns an erster Stelle. Wir
              setzen modernste Techniken ein, um sicherzustellen, dass die
              Reparatur den höchsten Standards entspricht – ohne Kompromisse.
              Sollten wir mit Smart Repair Grenzen erreichen, bieten wir dank
              unserer Zusammenarbeit mit den besten Kfz-Gutachtern,
              Karosseriebauern und Kfz-Lackierbetrieben auch umfangreichere
              Reparaturmethoden an. Ihr Vorteil: Alles aus einer Hand, alles in
              Premiumqualität. Sie brauchen sich um nichts zu kümmern.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/kontakt/#termin" className="btn-gold">
                Termin buchen
                <span aria-hidden>→</span>
              </Link>
              <Link href="/unfallschaden/" className="btn-glass">
                Unfallschaden
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-4">
              Beulendoktor Saarland – Ausbeulen ohne Lackieren
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg max-w-[70ch] mb-10">
              Warum unnötig viel Geld für Spachteln und Lackieren ausgeben,
              wenn es auch einfacher geht? Wir setzen auf modernste Hebel- und
              Klebetechniken, die den Wert Ihres Fahrzeugs erhalten und
              perfekte Ergebnisse liefern.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {beulendoktorVorteile.map((v, i) => (
              <Reveal key={v} delay={i * 0.03}>
                <div className="glass-flat rounded-2xl px-6 py-5 h-full flex gap-3">
                  <span className="mt-2 shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-[#f5e2b8] to-[#8a6a3f] flex items-center justify-center text-[8px] text-black">
                    ✓
                  </span>
                  <span className="text-[var(--ink-dim)] text-sm sm:text-base leading-relaxed">
                    {v}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-10 text-[var(--ink-dim)] leading-relaxed max-w-[70ch]">
              Vermeiden Sie unnötige Schäden durch unprofessionelle
              Beulen-Reparaturen und kommen Sie direkt zu den Experten. Wir
              bieten Ihnen eine unverbindliche Begutachtung Ihres Schadens –
              jederzeit und ohne Termin.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Was kostet Smart Repair?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg">
              Die Kosten für Smart Repair hängen von Art, Größe und Lage des
              Schadens ab. Da nur die beschädigte Stelle bearbeitet wird, ist
              Smart Repair bis zu 70 % günstiger als eine herkömmliche
              Lackierung des gesamten Bauteils. Den genauen Preis nennen wir
              Ihnen nach einer kurzen, unverbindlichen Begutachtung – auch
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
              Wie funktioniert die Ausbeultechnik? Dellen ohne Lackieren
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg">
              Ja – kleinere Dellen und Beulen lassen sich ohne Lackieren
              entfernen. Bei der lackschadenfreien Ausbeultechnik (auch
              Paintless Dent Repair) wird die Delle mit speziellen Hebel- und
              Klebewerkzeugen vorsichtig von hinten oder außen zurück in ihre
              ursprüngliche Form gebracht – der Originallack bleibt dabei
              vollständig erhalten. Das ist schneller und günstiger als
              Spachteln und Lackieren und vermeidet eine Wertminderung durch
              nachlackierte Teile.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-6">
              Smart Repair oder klassische Lackierung – der Unterschied
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg max-w-[70ch] mb-12">
              Smart Repair repariert kleine Schäden punktuell und günstig, eine
              klassische Lackierung erneuert ganze Bauteile. Der Unterschied im
              Überblick:
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-[1.5rem] overflow-hidden">
              <div className="grid grid-cols-12 gap-0 text-[11px] tracking-[0.28em] uppercase text-[var(--ink-mute)] px-6 sm:px-8 py-5 border-b border-white/5">
                <div className="col-span-12 sm:col-span-4">Merkmal</div>
                <div className="col-span-6 sm:col-span-4 text-[var(--gold)]">
                  Smart Repair
                </div>
                <div className="col-span-6 sm:col-span-4">
                  Klassische Lackierung
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
                      {row.smart}
                    </div>
                    <div className="col-span-6 sm:col-span-4 text-[var(--ink-dim)]">
                      {row.lackierung}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-10 text-[var(--ink-dim)] leading-relaxed max-w-[70ch]">
              Bei größeren oder tiefen Schäden – etwa nach einem Unfall –
              bieten wir dank unserer Zusammenarbeit mit Gutachtern,
              Karosseriebauern und Lackierbetrieben auch umfangreichere
              Reparaturen an:{" "}
              <Link
                href="/unfallschaden/"
                className="text-[var(--gold)] hover:underline underline-offset-4"
              >
                alles aus einer Hand
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
              Typische Schäden: Parkdellen, Steinschläge &amp; mehr
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg">
              Mit Smart Repair und unserer Ausbeultechnik beheben wir unter
              anderem Parkdellen, Türkantendellen, kleinere Beulen,
              Steinschläge und kleine Lackkratzer. So bleibt Ihr Fahrzeug
              optisch und im Wert erhalten – ohne aufwendige
              Komplettlackierung.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Smart Repair &amp; Beulendoktor im Saarland
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg">
              Sie finden uns in der Provinzialstraße 243 in 66806 Ensdorf –
              direkt bei Saarlouis. Als Lack- und Beulendoktor sind wir für
              Kunden aus dem gesamten Saarland da, u.&nbsp;a. aus Saarlouis,
              Saarbrücken, Dillingen und St.&nbsp;Wendel, sowie aus Luxemburg
              und dem grenznahen Raum. Eine unverbindliche Begutachtung Ihres
              Schadens ist während der Öffnungszeiten auch ohne Termin
              möglich.
            </p>
          </Reveal>
        </div>
      </section>

      <FAQ
        id="faq-lack-beulendoktor"
        kicker="Häufige Fragen zu Smart Repair &amp; Beulendoktor"
        title={
          <>
            Antworten rund um Kosten, Ausbeultechnik und{" "}
            <span className="italic text-gold">Werterhalt.</span>
          </>
        }
        faqs={faqs}
      />

      <CtaSection
        title={
          <>
            Delle, Steinschlag oder Kratzer?{" "}
            <span className="italic text-gold">Wir prüfen es kurz.</span>
          </>
        }
        text="Fotografieren Sie den Schaden mit dem Smartphone und schicken Sie ihn per WhatsApp oder Formular – wir melden uns kurzfristig zurück. Alternativ einfach unangekündigt vorbeikommen."
        primaryLabel="Schaden checken lassen"
      />
    </main>
  );
}
