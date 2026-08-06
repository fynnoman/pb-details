import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Über uns – Fahrzeugaufbereitung im Saarland" },
  description:
    "Seit 1997 stehen Thomas Paul & Karsten Becker für professionelle Fahrzeugaufbereitung im Saarland – mit Leidenschaft, Qualität und fast 30 Jahren Erfahrung.",
  alternates: { canonical: "/ueber-uns/" },
};

export default function UeberUnsPage() {
  const webPage = webPageSchema({
    path: "/ueber-uns/",
    name: "Über uns – Fahrzeugaufbereitung im Saarland",
    description:
      "Seit 1997 stehen Thomas Paul & Karsten Becker für professionelle Fahrzeugaufbereitung im Saarland.",
    breadcrumb: breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Über uns", path: "/ueber-uns/" },
    ]),
  });
  return (
    <main className="relative">
      <JsonLd data={webPage} />
      <PageHero
        kicker="Über uns"
        title="Thomas Paul & Karsten Becker von PB Fahrzeugpflege Saarlouis®"
        subtitle="Inhabergeführt seit 1997. Was mit zwei Jungunternehmern begann, ist heute einer der dienstältesten und am besten bewerteten Fahrzeugaufbereiter Deutschlands."
        backgroundImage="/images/team/karsten-becker-thomas-paul.jpg"
      />

      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Im Jahr 1997 …
            </h2>
          </Reveal>
          <div className="space-y-6 text-[var(--ink-dim)] leading-relaxed text-base sm:text-lg">
            <Reveal delay={0.05}>
              <p>
                … als junge und ambitionierte Unternehmer im Alter von 18 und
                24 Jahren, haben wir – Thomas Paul und Karsten Becker – die
                professionelle Fahrzeugaufbereitung im Saarland auf ein neues
                Level gehoben. Während andere sich auf die Massenabfertigung
                für Autohäuser und Gebrauchtwagenhändler konzentrierten,
                hatten wir ein anderes Ziel:
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-display text-xl sm:text-2xl leading-snug italic text-chrome not-italic">
                Wir wollten der beste Fahrzeugaufbereiter im Saarland werden,
                mit einem klaren Fokus auf den Privatkunden.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Unsere Leidenschaft für Perfektion und unser unermüdlicher
                Ehrgeiz haben uns zum Erfolg geführt. Fast drei Jahrzehnte
                später haben wir nicht nur unser Ziel erreicht, sondern weit
                übertroffen. Heute dürfen wir Kunden aus ganz Deutschland und
                sogar darüber hinaus bei PB Fahrzeugpflege Saarlouis® begrüßen.
                Unsere Liebe zum Detail und unser Engagement für höchste
                Qualität haben uns zu einer festen Größe in der Branche
                gemacht.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Erfahrung, die Vertrauen schafft
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg">
              In den vergangenen Jahrzehnten haben wir nicht nur unser Handwerk
              perfektioniert, sondern auch ein tiefes Verständnis für die
              Bedürfnisse unserer Kunden entwickelt. Unsere Geschichte ist
              geprägt von stetiger Weiterentwicklung und der Fähigkeit, uns
              immer wieder neu zu erfinden, um den hohen Ansprüchen unserer
              Kunden gerecht zu werden.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Warum PB Fahrzeugpflege Saarlouis®?
            </h2>
          </Reveal>
          <div className="space-y-6 text-[var(--ink-dim)] leading-relaxed text-base sm:text-lg">
            <Reveal delay={0.05}>
              <p>
                Unsere Expertise und unser kompromissloser Qualitätsanspruch
                machen uns zur ersten Wahl, wenn es um die professionelle
                Fahrzeugaufbereitung geht. Ob es um eine gründliche Reinigung,
                eine Lackkorrektur oder eine hochmoderne Keramikversiegelung
                geht – bei PB Fahrzeugpflege Saarlouis® erhalten Sie
                Ergebnisse, die Ihren Erwartungen nicht nur gerecht werden,
                sondern sie übertreffen.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Wir sehen nicht nur Autos, sondern Werte. Jedes Fahrzeug ist
                für uns ein Unikat und bekommt eine maßgeschneiderte
                Behandlung.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Bei uns gibt&apos;s keine leeren Versprechungen aus
                Hochglanzprospekten, sondern 100 % ehrliche Handwerkskunst mit
                Ergebnissen, die dauerhaft überzeugen.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Wenn Sie Wert auf Qualität legen, wenn für Sie Klasse statt
                Kompromisse zählt, dann sind wir für Sie genau die Richtigen.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Erleben Sie den{" "}
            <span className="italic text-gold">Unterschied.</span>
          </>
        }
        text="Kontaktieren Sie uns noch heute und erleben Sie den Unterschied, den echte Leidenschaft und fast 30 Jahre Erfahrung in der Fahrzeugaufbereitung machen können."
      />
    </main>
  );
}
