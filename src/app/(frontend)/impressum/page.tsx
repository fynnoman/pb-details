import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList, webPageSchema } from "@/lib/schema";
import { loadSettings } from "@/lib/site-data";

const PATH = "/impressum/";

export const metadata: Metadata = {
  title: { absolute: "Impressum | PB Fahrzeugpflege Saarlouis" },
  description:
    "Impressum und rechtliche Angaben gemäß § 5 TMG von PB Fahrzeugpflege Saarlouis in Ensdorf.",
  alternates: { canonical: PATH },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl sm:text-3xl leading-tight tracking-[-0.01em] mt-12 mb-4 text-[var(--ink)]">
      {children}
    </h2>
  );
}

export default async function ImpressumPage() {
  const settings = await loadSettings();
  const owner = settings.owner || "Thomas Paul-Mohm";
  const vatId = settings.vatId || "DE268106468";
  const fax = settings.fax;
  const webPage = webPageSchema({
    path: PATH,
    name: "Impressum | PB Fahrzeugpflege Saarlouis",
    description:
      "Rechtliche Angaben nach § 5 TMG und § 18 Abs. 2 MStV von PB Fahrzeugpflege Saarlouis.",
    breadcrumb: breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Impressum", path: PATH },
    ]),
  });
  return (
    <main className="relative">
      <JsonLd data={webPage} />
      <PageHero kicker="Rechtliches" title="Impressum" />

      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-[820px] px-4 sm:px-8 lg:px-10 text-[var(--ink-dim)] leading-relaxed">
          <Reveal>
            <H2>Angaben gemäß § 5 TMG</H2>
            <p>
              {settings.name}
              <br />
              {settings.address.street}
              <br />
              {settings.address.zip} {settings.address.city}
              <br />
              {settings.address.country || "Deutschland"}
            </p>
          </Reveal>

          <Reveal>
            <H2>Vertreten durch</H2>
            <p>Inhaber: {owner}</p>
          </Reveal>

          <Reveal>
            <H2>Kontakt</H2>
            <p>
              Telefon: <a href={`tel:${settings.phone.e164}`} className="text-[var(--ink)] hover:text-[var(--gold)]">{settings.phone.display}</a>
              <br />
              {fax && (
                <>
                  Fax: {fax}
                  <br />
                </>
              )}
              E-Mail: <a href={`mailto:${settings.email}`} className="text-[var(--ink)] hover:text-[var(--gold)]">{settings.email}</a>
              <br />
              Web: <a href={settings.domain} className="text-[var(--ink)] hover:text-[var(--gold)]">{settings.domain.replace(/^https?:\/\//, "")}</a>
            </p>
          </Reveal>

          <Reveal>
            <H2>Umsatzsteuer-ID</H2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              <span className="text-[var(--ink)]">{vatId}</span>
            </p>
          </Reveal>

          <Reveal>
            <H2>Redaktionell verantwortlich (§ 18 Abs. 2 MStV)</H2>
            <p>
              {owner}
              <br />
              Anschrift wie oben.
            </p>
          </Reveal>

          <Reveal>
            <H2>EU-Streitschlichtung</H2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener"
                className="text-[var(--ink)] hover:text-[var(--gold)] underline underline-offset-4"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </Reveal>

          <Reveal>
            <H2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</H2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </Reveal>

          <Reveal>
            <H2>Haftung für Inhalte</H2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Absatz 1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach den §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
              hinweisen.
            </p>
            <p className="mt-4">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
              Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden
              wir diese Inhalte umgehend entfernen.
            </p>
          </Reveal>

          <Reveal>
            <H2>Haftung für Links</H2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
              wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
              überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
              Verlinkung nicht erkennbar.
            </p>
            <p className="mt-4">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
              jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
              zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
              derartige Links umgehend entfernen.
            </p>
          </Reveal>

          <Reveal>
            <H2>Urheberrecht</H2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten,
              nicht kommerziellen Gebrauch gestattet.
            </p>
            <p className="mt-4">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
              wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
              werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
              trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
              bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden
              von Rechtsverletzungen werden wir derartige Inhalte umgehend
              entfernen.
            </p>
          </Reveal>

          <Reveal>
            <H2>Bildnachweise</H2>
            <p>
              Sofern nicht anders gekennzeichnet, liegen die Bildrechte bei
              {" "}
              {settings.name}. Weitere Nutzungen bedürfen der schriftlichen
              Zustimmung.
            </p>
          </Reveal>

          <Reveal>
            <H2>Datenschutz</H2>
            <p>
              Unsere Datenschutzerklärung finden Sie unter{" "}
              <a
                href="/datenschutzerklaerung/"
                className="text-[var(--ink)] hover:text-[var(--gold)] underline underline-offset-4"
              >
                /datenschutzerklaerung/
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
