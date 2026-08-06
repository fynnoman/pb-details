import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FAQ, { type FaqItem } from "@/components/FAQ";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: {
    absolute: "Nanoversiegelung fürs Auto in Saarlouis & im Saarland",
  },
  description:
    "Auto-Nanoversiegelung im Saarland & Luxemburg – die preisbewusste Alternative zur Keramikversiegelung, Schutz bis zu 18 Monate. Seit 1997, über 648 Top-Bewertungen.",
  alternates: { canonical: "/leistungen/nanoversiegelung/" },
  openGraph: {
    title: "Nanoversiegelung fürs Auto in Saarlouis & im Saarland",
    description:
      "Auto-Nanoversiegelung im Saarland & Luxemburg – die preisbewusste Alternative zur Keramikversiegelung, Schutz bis zu 18 Monate.",
    type: "article",
  },
};

const faqs: FaqItem[] = [
  {
    q: "Was kostet eine Nanoversiegelung?",
    a: "Die Kosten richten sich nach Fahrzeuggröße und Lackzustand. Als preisbewusste Alternative zur Keramikversiegelung ist die Nanoversiegelung deutlich günstiger. Nach einer kurzen Begutachtung erhalten Sie ein transparentes Angebot – auch ohne Termin. Aktuelle Preise finden Sie auf unserer Seite Preise.",
  },
  {
    q: "Wie lange hält eine Nanoversiegelung?",
    a: "Unsere 1K-Nanoversiegelung bietet langanhaltenden Schutz von bis zu 18 Monaten – deutlich länger als herkömmliches Wachs, das selten über vier Monate hält. Die genaue Standzeit hängt von Nutzung und Pflege ab.",
  },
  {
    q: "Was ist der Unterschied zwischen Nano- und Keramikversiegelung?",
    a: "Die Keramikversiegelung ist härter und hält mehrere Jahre, ist aber teurer und aufwendiger. Die Nanoversiegelung ist die günstigere Lösung mit Schutz bis zu 18 Monaten. Für höchsten, langjährigen Schutz empfehlen wir Keramik; für ein gutes Preis-Leistungs-Verhältnis die Nanoversiegelung.",
  },
  {
    q: "Was bringt eine Nanoversiegelung beim Auto?",
    a: "Sie schützt den Lack vor UV-Strahlung, Streusalz und Umwelteinflüssen, sorgt für intensiven Glanz und einen Abperleffekt, der die Wäsche erleichtert (Easy-to-Clean). Außerdem hält sie deutlich länger als Wachs.",
  },
  {
    q: "Ist eine Nanoversiegelung sinnvoll?",
    a: "Ja, wenn Sie guten Lackschutz zu einem attraktiven Preis möchten. Sie hält deutlich länger als Wachs und lässt sich bei Bedarf später auf eine Keramikversiegelung upgraden.",
  },
  {
    q: "Nanoversiegelung oder Wachs – was hält länger?",
    a: "Die Nanoversiegelung hält klar länger: Während selbst teure Wachse selten über vier Monate halten, schützt unsere 1K-Nanoversiegelung bis zu 18 Monate und verbindet sich fest mit dem Lack, statt nur aufzuliegen.",
  },
  {
    q: "Hat eine Nanoversiegelung Nachteile?",
    a: "Im Vergleich zur Keramikversiegelung ist sie weniger kratzbeständig und muss früher erneuert werden. Dafür ist sie günstiger und schneller aufgetragen – ein sehr gutes Preis-Leistungs-Verhältnis.",
  },
];

const vergleich = [
  { kriterium: "Haltbarkeit", nano: "Bis zu ca. 18 Monate", keramik: "Mehrere Jahre" },
  { kriterium: "Schutz & Härte", nano: "Guter Schutz, flüssig aufgetragen", keramik: "Sehr hart, glasartig – höherer Schutz" },
  { kriterium: "Glanz & Abperleffekt", nano: "Sehr gut (Easy-to-Clean)", keramik: "Sehr intensiv" },
  { kriterium: "Aufwand", nano: "Geringer, schneller aufgetragen", keramik: "Sehr hoher Aufwand (2–3 Tage)" },
  { kriterium: "Preis", nano: "Günstiger", keramik: "Höher" },
  { kriterium: "Ideal für", nano: "Preisbewusste Pflege, gutes Preis-Leistungs-Verhältnis", keramik: "Neuwagen, Sport-, Luxus- & Wertfahrzeuge" },
];

const vorteile = [
  "Schutz bis zu 18 Monate – hält bis zu viermal länger als Wachs",
  "Intensiver Glanz und Easy-to-Clean-Effekt",
  "Schutz vor UV-Strahlung, Streusalz und Umwelteinflüssen",
  "Deutlich günstiger als eine Keramikversiegelung",
];

const nachteile = [
  "Kürzere Haltbarkeit als eine Keramikversiegelung",
  "Weniger kratzbeständig als eine Keramikbeschichtung",
  "Muss nach einiger Zeit erneuert werden",
];

export default function NanoversiegelungPage() {
  return (
    <main className="relative">
      <PageHero
        kicker="02 / Leistung · Nanoversiegelung"
        title="Nanoversiegelung fürs Auto in Saarlouis, dem Saarland & Luxemburg"
        subtitle="Die preisbewusste Alternative zur Keramikversiegelung – eine hochwertige 1K-Nanoversiegelung, die sich fest mit dem Autolack verbindet und bis zu viermal länger hält als eine herkömmliche Wachsversiegelung."
        backgroundImage="https://images.unsplash.com/photo-1493238792000-8113da705763?w=2400&q=85&auto=format&fit=crop"
      />

      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10 space-y-6 text-[var(--ink-dim)] leading-relaxed text-base sm:text-lg">
          <Reveal>
            <p>
              Eine Nanoversiegelung ist eine flüssige Schutzschicht, die sich
              fest mit dem Autolack verbindet und ihn – einfacher und günstiger
              als eine Keramikversiegelung – vor Umwelteinflüssen schützt. Bei
              PB Fahrzeugpflege Saarlouis verwenden wir eine hochwertige
              1K-Nanoversiegelung, die bis zu viermal länger hält als eine
              herkömmliche Wachsversiegelung.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              Sie ist damit die preisbewusste Alternative zur
              Keramikversiegelung – für alle, die guten, langanhaltenden
              Lackschutz zu einem attraktiven Preis möchten.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Die von uns verwendete 1K-Nanoversiegelung ist den herkömmlichen
              Wachsversiegelungen deutlich überlegen. Diese legen sich nur auf
              die Lackoberfläche und werden durch Autowäsche, Waschanlage und
              Umwelteinwirkungen schnell wieder abgetragen. Selbst bei den
              teuersten Wachsen kann eine Standzeit über 4 Monate selten
              erreicht werden. Ganz anders die von uns verwendete
              1K-Nanoversiegelung. Diese verbindet sich fest mit der
              Lackstruktur und bietet Ihnen einen bisher unerreichten Glanz-
              und Glättegrad. Der langanhaltende Schutz bis zu 18 Monaten
              reduziert die Auswirkungen von aggressiven Umwelteinflüssen,
              UV-Strahlung und Streusalz.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Easy-to-Clean: müheloser Glanz
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg">
              Dank des Abperleffekts lassen sich Anhaftungen wie Insekten,
              Vogelkot und Blütenstaub deutlich einfacher entfernen. Diese
              Easy-to-Clean-Performance sorgt für eine spürbar leichtere
              Wagenwäsche – Wasser und Schmutz perlen einfach ab.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg mt-4">
              Sie möchten den bestmöglichen Schutz für Ihren Autolack? Dann
              geht’s hier zu unserer{" "}
              <Link
                href="/leistungen/keramikversiegelung/"
                className="text-[var(--gold)] hover:underline underline-offset-4"
              >
                Keramikversiegelung
              </Link>
              !
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Was kostet eine Nanoversiegelung?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg">
              Die Kosten einer Nanoversiegelung hängen von Fahrzeuggröße und
              Lackzustand ab. Als preisbewusste Alternative zur
              Keramikversiegelung ist sie deutlich günstiger. Nach einer kurzen
              Begutachtung erhalten Sie ein transparentes Angebot –
              unverbindlich und auch ohne Termin. Eine Übersicht finden Sie auf
              unserer{" "}
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
              Was bringt eine Nanoversiegelung – und ist sie sinnvoll?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg mb-6">
              Eine Nanoversiegelung schützt den Lack vor UV-Strahlung,
              Streusalz und Umwelteinflüssen, sorgt für intensiven Glanz und
              macht dank Abperleffekt die Wäsche leichter. Sinnvoll ist sie vor
              allem dann, wenn Sie guten, langanhaltenden Lackschutz zu einem
              attraktiven Preis möchten:
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-3 text-[var(--ink-dim)] leading-relaxed">
              <li className="flex gap-3">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                <span>
                  Alltags- und Gebrauchtfahrzeuge mit gutem
                  Preis-Leistungs-Verhältnis
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                <span>Als günstiger Einstieg in den professionellen Lackschutz</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                <span>
                  Wenn ein Schutz für etwa 1–1,5 Jahre statt mehrerer Jahre
                  ausreicht
                </span>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg mt-8">
              Wünschen Sie den höchstmöglichen, langjährigen Schutz, ist unsere{" "}
              <Link
                href="/leistungen/keramikversiegelung/"
                className="text-[var(--gold)] hover:underline underline-offset-4"
              >
                Keramikversiegelung
              </Link>{" "}
              die richtige Wahl – wir beraten Sie gern ehrlich.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-6">
              Nano- oder Keramikversiegelung – was ist besser?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg max-w-[70ch] mb-12">
              Die Nanoversiegelung ist günstiger und schneller aufgetragen, die
              Keramikversiegelung härter und langlebiger. Welche Lösung
              „besser" ist, hängt von Budget, Anspruch und Fahrzeug ab – hier
              die wichtigsten Unterschiede im Überblick:
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-[1.5rem] overflow-hidden">
              <div className="grid grid-cols-12 gap-0 text-[11px] tracking-[0.28em] uppercase text-[var(--ink-mute)] px-6 sm:px-8 py-5 border-b border-white/5">
                <div className="col-span-12 sm:col-span-4">Kriterium</div>
                <div className="col-span-6 sm:col-span-4 text-[var(--gold)]">
                  Nanoversiegelung
                </div>
                <div className="col-span-6 sm:col-span-4">Keramikversiegelung</div>
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
                      {row.nano}
                    </div>
                    <div className="col-span-6 sm:col-span-4 text-[var(--ink-dim)]">
                      {row.keramik}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-10 text-[var(--ink-dim)] leading-relaxed max-w-[70ch]">
              Kurz gesagt: Wer ein gutes Preis-Leistungs-Verhältnis sucht, ist
              mit der Nanoversiegelung bestens beraten. Für maximalen,
              langjährigen Schutz empfehlen wir die Keramikversiegelung.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-6">
              Vorteile und Nachteile einer Nanoversiegelung
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg max-w-[70ch] mb-12">
              Ein ehrlicher Überblick, damit Sie die richtige Wahl treffen:
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
        </div>
      </section>

      <FAQ
        id="faq-nanoversiegelung"
        kicker="Häufige Fragen zur Nanoversiegelung"
        title={
          <>
            Antworten rund um Nano, Wachs und{" "}
            <span className="italic text-gold">Alternativen.</span>
          </>
        }
        faqs={faqs}
      />

      <CtaSection
        title={
          <>
            Guter Lackschutz zum{" "}
            <span className="italic text-gold">attraktiven Preis.</span>
          </>
        }
        text="Kommen Sie ohne Termin vorbei – nach kurzer Begutachtung erhalten Sie ein transparentes Angebot. Auf Wunsch prüfen wir gemeinsam, ob eine Nano- oder eine Keramikversiegelung besser zu Ihrem Fahrzeug passt."
      />
    </main>
  );
}
