import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Gutschein für Fahrzeugpflege & Keramikversiegelung",
  },
  description:
    "Verschenken Sie Premium-Fahrzeugpflege: Gutscheine für Keramikversiegelung, Fahrzeugaufbereitung, Nanoversiegelung oder Smart Repair. Individuell im Betrieb in Ensdorf bei Saarlouis.",
  alternates: { canonical: "/gutschein/" },
};

const anlaesse = [
  {
    title: "Geburtstag & Jubiläum",
    text: "Ein persönliches Geschenk für Fahrzeugbesitzer, denen ihr Auto etwas bedeutet.",
  },
  {
    title: "Weihnachten",
    text: "Statt Krimskrams: eine Wertsteigerung, die man das ganze Jahr sieht.",
  },
  {
    title: "Übergabe eines Neu- oder Sportwagens",
    text: "Der perfekte Start – Lackschutz ab dem ersten Kilometer.",
  },
  {
    title: "Firmen & Mitarbeiter",
    text: "Wertschätzendes Präsent für Kunden, Partner oder verdiente Mitarbeiter.",
  },
];

const leistungen = [
  {
    title: "Keramikversiegelung",
    href: "/leistungen/keramikversiegelung/",
    desc: "High-End 9H-Lackschutz in über 20 Stunden Handarbeit.",
  },
  {
    title: "Nanoversiegelung",
    href: "/leistungen/nanoversiegelung/",
    desc: "Preisbewusste Alternative mit bis zu 18 Monaten Schutz.",
  },
  {
    title: "Fahrzeugaufbereitung",
    href: "/leistungen/fahrzeugaufbereitung/",
    desc: "Mehrstufige Innen- und Außenaufbereitung in 2–3 Werktagen.",
  },
  {
    title: "Lack- & Beulendoktor",
    href: "/leistungen/lack-und-beulendoktor/",
    desc: "Smart Repair – bis zu 70 % günstiger als klassische Lackierung.",
  },
];

export default function GutscheinPage() {
  const webPage = webPageSchema({
    path: "/gutschein/",
    name: "Gutschein für Fahrzeugpflege & Keramikversiegelung",
    description:
      "Gutscheine für Keramikversiegelung, Fahrzeugaufbereitung, Nanoversiegelung oder Smart Repair.",
    breadcrumb: breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Gutschein", path: "/gutschein/" },
    ]),
  });

  return (
    <main className="relative">
      <JsonLd data={webPage} />

      <PageHero
        kicker="Verschenken Sie Premium-Pflege"
        title="Gutschein für Fahrzeugpflege & Keramikversiegelung"
        subtitle="Ein Geschenk, das man sieht, spürt und dessen Wert bleibt. Gutscheine gibt es in jedem Betrag – oder direkt für eine konkrete Leistung."
      />

      {/* So funktioniert es */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10 space-y-6 text-[var(--ink-dim)] leading-relaxed text-base sm:text-lg">
          <Reveal>
            <p>
              Ein PB-Gutschein ist ein persönliches Geschenk für alle, denen
              ihr Fahrzeug am Herzen liegt. Ob Neuwagen-Lackschutz,
              Fahrzeugaufbereitung vor der Leasingrückgabe, Smart Repair oder
              eine unserer Königsklassen – der Keramikversiegelung: Sie wählen
              den Betrag, wir kümmern uns um den Rest.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              Gutscheine erhalten Sie ganz einfach direkt bei uns im Betrieb
              in Ensdorf. Auch telefonisch oder per WhatsApp sind wir für Sie
              erreichbar. Auf Wunsch stellen wir den Gutschein als hochwertigen
              Ausdruck bereit oder senden ihn digital an Sie oder direkt an den
              Beschenkten.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Anlässe */}
      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-4">
              Für welchen Anlass?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg max-w-[70ch] mb-12">
              Ein PB-Gutschein passt überall dort, wo ein persönliches,
              hochwertiges Geschenk gefragt ist:
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {anlaesse.map((a, i) => (
              <Reveal key={a.title} delay={0.1 + i * 0.05}>
                <div className="glass rounded-[1.5rem] p-8 h-full">
                  <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-3">
                    Anlass
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl leading-snug tracking-[-0.015em]">
                    {a.title}
                  </h3>
                  <p className="mt-4 text-[var(--ink-dim)] leading-relaxed">
                    {a.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Für welche Leistung */}
      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-4">
              Für welche Leistung?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg max-w-[70ch] mb-12">
              Sie können einen freien Betrag verschenken oder gezielt eine
              bestimmte Leistung. Details zur jeweiligen Leistung finden Sie
              hier:
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leistungen.map((l, i) => (
              <Reveal key={l.href} delay={0.1 + i * 0.05}>
                <Link
                  href={l.href}
                  className="glass-flat rounded-2xl p-6 flex items-center justify-between gap-4 hover:ring-1 hover:ring-[var(--gold)]/30 transition group"
                >
                  <div>
                    <h3 className="font-display text-lg leading-snug tracking-[-0.015em] group-hover:text-gold transition-colors">
                      {l.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--ink-dim)]">
                      {l.desc}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="text-[var(--ink-mute)] group-hover:text-[var(--gold)] transition-colors group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* So bekommen Sie den Gutschein */}
      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              So bekommen Sie den Gutschein
            </h2>
          </Reveal>
          <div className="space-y-6 text-[var(--ink-dim)] leading-relaxed text-lg">
            <Reveal delay={0.05}>
              <p>
                <strong className="text-[var(--ink)]">Persönlich:</strong>{" "}
                Kommen Sie einfach während unserer Öffnungszeiten in der
                Provinzialstraße 243 in 66806 Ensdorf vorbei. Wir stellen den
                Gutschein direkt aus.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                <strong className="text-[var(--ink)]">Telefonisch:</strong>{" "}
                Rufen Sie uns unter{" "}
                <a
                  href={SITE.phone.href}
                  className="text-[var(--gold)] hover:underline underline-offset-4"
                >
                  {SITE.phone.display}
                </a>{" "}
                an. Wir klären Betrag, Anlass und Übergabeform.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                <strong className="text-[var(--ink)]">WhatsApp / E-Mail:</strong>{" "}
                Sie erreichen uns per{" "}
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener"
                  className="text-[var(--gold)] hover:underline underline-offset-4"
                >
                  WhatsApp
                </a>{" "}
                oder{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-[var(--gold)] hover:underline underline-offset-4"
                >
                  {SITE.email}
                </a>
                . Auf Wunsch versenden wir den Gutschein digital.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Machen Sie ein{" "}
            <span className="italic text-gold">bleibendes Geschenk.</span>
          </>
        }
        text="Wir beraten Sie gern zum passenden Betrag oder zur konkreten Leistung. Persönlich vor Ort, telefonisch oder per Nachricht."
        primaryLabel="Gutschein anfragen"
      />
    </main>
  );
}
