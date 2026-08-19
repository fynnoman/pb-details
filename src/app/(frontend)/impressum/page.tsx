import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Impressum" },
  description: `Inhaber: ${SITE.owner}. USt-IdNr. ${SITE.vatId}.`,
  alternates: { canonical: "/impressum/" },
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <main className="relative">
      <PageHero
        kicker="Angaben gemäß § 5 TMG"
        title="Impressum"
      />

      <section className="relative pb-24 sm:pb-32">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10 space-y-10 text-[var(--ink-dim)] leading-relaxed">
          <Reveal>
            <div className="glass rounded-[1.5rem] p-8">
              <div className="font-display text-xl leading-snug tracking-[-0.015em] text-[var(--ink)]">
                {SITE.name}
              </div>
              <div className="mt-4 space-y-1">
                <div>{SITE.address.street}</div>
                <div>
                  {SITE.address.zip} {SITE.address.city}
                </div>
                <div className="mt-3">
                  Telefon:{" "}
                  <a
                    href={SITE.phone.href}
                    className="text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
                  >
                    {SITE.phone.display}
                  </a>
                </div>
                <div>Fax: {SITE.fax}</div>
                <div>
                  E-Mail:{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
                  >
                    {SITE.email}
                  </a>
                </div>
                <div>
                  Webseite:{" "}
                  <a
                    href={SITE.domain}
                    className="text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
                  >
                    www.pb-fahrzeugpflege.de
                  </a>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-white/10 space-y-1">
                <div>
                  <span className="text-[var(--ink-mute)]">Inhaber:</span>{" "}
                  {SITE.owner}
                </div>
                <div>
                  <span className="text-[var(--ink-mute)]">USt-IdNr.:</span>{" "}
                  {SITE.vatId}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div>
              <h2 className="font-display text-2xl tracking-[-0.015em] mb-4 text-[var(--ink)]">
                Haftung für Inhalte
              </h2>
              <p>
                Wir sind gemäß § 7 Absatz 1 TMG für eigene Inhalte auf diesen
                Seiten verantwortlich. Nach den §§ 8 bis 10 TMG sind wir jedoch
                nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die
                auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur
                Entfernung oder Sperrung der Nutzung von Informationen nach den
                allgemeinen Gesetzen bleiben davon unberührt. Eine Haftung ist
                erst ab dem Zeitpunkt der Kenntnis einer konkreten
                Rechtsverletzung möglich. Bei Bekanntwerden entfernen wir
                entsprechende Inhalte umgehend.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h2 className="font-display text-2xl tracking-[-0.015em] mb-4 text-[var(--ink)]">
                Haftung für Links
              </h2>
              <p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber verantwortlich. Rechtswidrige Inhalte waren zum
                Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
                Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
                Anhaltspunkte nicht zumutbar. Bei Bekanntwerden von
                Rechtsverletzungen entfernen wir derartige Links umgehend.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <h2 className="font-display text-2xl tracking-[-0.015em] mb-4 text-[var(--ink)]">
                Urheberrecht
              </h2>
              <p>
                Die durch uns erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Vervielfältigung,
                Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb
                der Grenzen des Urheberrechts bedürfen der schriftlichen
                Zustimmung des jeweiligen Autors. Downloads und Kopien dieser
                Seite sind nur für den privaten, nicht kommerziellen Gebrauch
                gestattet. Inhalte Dritter werden als solche gekennzeichnet.
                Sollten Sie dennoch eine Urheberrechtsverletzung bemerken,
                bitten wir um einen Hinweis. Bei Bekanntwerden entfernen wir
                entsprechende Inhalte umgehend.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <h2 className="font-display text-2xl tracking-[-0.015em] mb-4 text-[var(--ink)]">
                Datenschutz
              </h2>
              <p>
                Unsere Datenschutzerklärung finden Sie unter{" "}
                <Link
                  href="/datenschutzerklaerung/"
                  className="text-[var(--gold)] hover:underline underline-offset-4"
                >
                  /datenschutzerklaerung/
                </Link>
                .
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div>
              <h2 className="font-display text-2xl tracking-[-0.015em] mb-4 text-[var(--ink)]">
                EU-Streitschlichtung
              </h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--gold)] hover:underline underline-offset-4"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div>
              <h2 className="font-display text-2xl tracking-[-0.015em] mb-4 text-[var(--ink)]">
                Verbraucherstreitbeilegung / Universalschlichtungsstelle
              </h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
