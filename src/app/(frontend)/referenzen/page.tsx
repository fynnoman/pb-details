import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbList,
  productAggregateRating,
  webPageSchema,
} from "@/lib/schema";

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
    image: "/images/urkunden/q-siegel-servicequalitaet.jpg",
    imageAlt:
      "Q-Siegel-Zertifikat Servicequalität Deutschland für PB Fahrzeugpflege Saarlouis",
  },
  {
    title: "BRILA Certified Installer",
    subtitle: "Zertifizierter Fachbetrieb für Keramikversiegelungen",
    details:
      "BRILA-Urkunde für professionelle Anwendung des 9H High-End-Lackschutzes.",
    image: "/images/urkunden/brila-urkunde-keramikversiegelung.jpg",
    imageAlt:
      "BRILA-Urkunde Keramikversiegelung für PB Fahrzeugpflege Saarlouis",
  },
  {
    title: "SQD Stufe I",
    subtitle: "ServiceQualität Deutschland – Stufe I",
    details:
      "Zertifikat für nachhaltige Qualitätssicherung im Betrieb seit 2016.",
    image: "/images/urkunden/sqd-stufe-1.jpg",
    imageAlt: "SQD Servicequalität Deutschland Stufe I Zertifikat 2016",
  },
  {
    title: "29 Jahre inhabergeführt",
    subtitle: "Jubiläum 2026",
    details:
      "Von zwei jungen Unternehmern zu einem der dienstältesten Fahrzeugpfleger Deutschlands.",
    image: "/images/urkunden/29-jahre-jubilaeum.jpg",
    imageAlt: "29 Jahre PB Fahrzeugpflege Saarlouis Jubiläum",
  },
];

const provenExpertBadges = [
  { src: "/images/badges/provenexpert-top-dienstleister-2017.png", alt: "ProvenExpert Top Dienstleister 2017", year: "2017" },
  { src: "/images/badges/provenexpert-top-empfehlung-2017.png", alt: "ProvenExpert Top Empfehlung 2017", year: "2017" },
  { src: "/images/badges/provenexpert-top-dienstleister-2018.png", alt: "ProvenExpert Top Dienstleister 2018", year: "2018" },
  { src: "/images/badges/provenexpert-top-empfehlung-2018.png", alt: "ProvenExpert Top Empfehlung 2018", year: "2018" },
  { src: "/images/badges/provenexpert-von-kunden-empfohlen-2018.png", alt: "ProvenExpert Von Kunden empfohlen 2018", year: "2018" },
  { src: "/images/badges/provenexpert-top-dienstleister-2019.jpg", alt: "ProvenExpert Top Dienstleister 2019", year: "2019" },
  { src: "/images/badges/provenexpert-top-empfehlung-2019.jpg", alt: "ProvenExpert Top Empfehlung 2019", year: "2019" },
  { src: "/images/badges/provenexpert-top-dienstleister-2021.jpg", alt: "ProvenExpert Top Dienstleister 2021", year: "2021" },
  { src: "/images/badges/provenexpert-top-empfehlung-2021.jpg", alt: "ProvenExpert Top Empfehlung 2021", year: "2021" },
  { src: "/images/badges/provenexpert-top-dienstleister-2023.png", alt: "ProvenExpert Top Dienstleister 2023", year: "2023" },
  { src: "/images/badges/provenexpert-top-dienstleister-2024.png", alt: "ProvenExpert Top Dienstleister 2024", year: "2024" },
  { src: "/images/badges/provenexpert-bewertungssiegel-2026.png", alt: "ProvenExpert Bewertungssiegel 2026", year: "2026" },
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
  { src: "/images/badges/werkenntdenbesten-badge.png", alt: "WerKenntDenBesten Badge – Kunden-Empfehlungssiegel" },
  { src: "/images/badges/gold-wert-kennstdueinen.png", alt: "Kennst du einen? Gold-Bewertung für PB Fahrzeugpflege" },
  { src: "/images/badges/profi-badge.webp", alt: "Profi-Badge für PB Fahrzeugpflege Saarlouis" },
  { src: "/images/badges/topservice.png", alt: "TopService-Badge für PB Fahrzeugpflege" },
];

const jubilaeen = [
  {
    text: "20. Jubiläum – Gratulation durch Ensdorfer Bürgermeister Hartwin Faust",
    image: "/images/urkunden/20-jahre-buergermeister-gratulation.jpg",
    imageAlt:
      "20 Jahre PB Fahrzeugpflege Saarlouis – Bürgermeister Hartwin Faust gratuliert Karsten Becker und Thomas Paul",
  },
  { text: "25. Jubiläum – Gratulation vom Ensdorfer Bürgermeister" },
  {
    text: 'ZDF – Fernsehteam der Sendung „Drehscheibe", Thema „Ein Tag Aushilfe als Fahrzeugpfleger"',
  },
  {
    text: "SR3 Radio (Saarlandwelle) – Fahrzeug-Beschriftung / Karosseriearbeiten",
  },
  {
    text: "IHK Saar Wirtschaft 10/15 – Pressebericht über die Q-Siegel-Auszeichnung",
  },
  { text: "KITT und Herbie zu Besuch bei PB Fahrzeugpflege Saarlouis" },
];

export default function ReferenzenPage() {
  const webPage = webPageSchema({
    path: "/referenzen/",
    name: "Referenzen & Bewertungen – Saarland",
    description: `Über ${SITE.ratings.count} Bewertungen bei ${SITE.ratings.value.toString().replace(".", ",")} von ${SITE.ratings.scale} Sternen. Q-Siegel, BRILA und weitere Auszeichnungen.`,
    breadcrumb: breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Referenzen", path: "/referenzen/" },
    ]),
  });
  return (
    <main className="relative">
      <JsonLd data={[webPage, productAggregateRating]} />
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
                <div className="glass rounded-[1.5rem] overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-[4/3] bg-black/20 flex items-center justify-center overflow-hidden">
                    <img
                      src={z.image}
                      alt={z.imageAlt}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain p-6"
                    />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
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
          <div className="space-y-3 mb-16">
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

          <Reveal delay={0.1}>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[var(--ink-mute)] mb-6">
              <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
              Auszeichnungen im Bild
            </p>
          </Reveal>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {provenExpertBadges.map((b, i) => (
              <Reveal key={b.src} delay={i * 0.03}>
                <div className="glass-flat rounded-2xl aspect-square flex items-center justify-center p-4 hover:ring-1 hover:ring-[var(--gold)]/30 transition">
                  <img
                    src={b.src}
                    alt={b.alt}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain"
                  />
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {weitereSiegel.map((s, i) => (
              <Reveal key={s.src} delay={i * 0.04}>
                <div className="glass-flat rounded-2xl aspect-square flex items-center justify-center p-6 hover:ring-1 hover:ring-[var(--gold)]/30 transition">
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain"
                  />
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
              <Reveal key={j.text} delay={i * 0.04}>
                <li className="flex gap-3 text-[var(--ink-dim)] leading-relaxed">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                  <span>{j.text}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.4}>
            <div className="mt-12 rounded-[1.5rem] overflow-hidden">
              <img
                src="/images/urkunden/20-jahre-buergermeister-gratulation.jpg"
                alt="20 Jahre PB Fahrzeugpflege Saarlouis – Bürgermeister Hartwin Faust gratuliert Karsten Becker und Thomas Paul"
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
          </Reveal>
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
