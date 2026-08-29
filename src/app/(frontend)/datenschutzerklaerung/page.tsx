import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList, webPageSchema } from "@/lib/schema";
import { loadSettings } from "@/lib/site-data";

const PATH = "/datenschutzerklaerung/";

export const metadata: Metadata = {
  title: { absolute: "Datenschutzerklärung | PB Fahrzeugpflege Saarlouis" },
  description:
    "Datenschutzerklärung nach DSGVO für www.pb-fahrzeugpflege.de – Hosting, Cookies, Kontaktformular, Google Maps und weitere eingebundene Dienste.",
  alternates: { canonical: PATH },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl sm:text-3xl leading-tight tracking-[-0.01em] mt-12 mb-4 text-[var(--ink)]">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-lg sm:text-xl leading-snug tracking-[-0.01em] mt-8 mb-3 text-[var(--ink)]">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3">{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-5 mt-3 space-y-1.5">{children}</ul>;
}

export default async function DatenschutzPage() {
  const settings = await loadSettings();
  const founders = settings.founders || "Thomas Paul & Karsten Becker";
  const webPage = webPageSchema({
    path: PATH,
    name: "Datenschutzerklärung | PB Fahrzeugpflege Saarlouis",
    description:
      "Datenschutzerklärung nach DSGVO für www.pb-fahrzeugpflege.de.",
    breadcrumb: breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Datenschutzerklärung", path: PATH },
    ]),
  });
  return (
    <main className="relative">
      <JsonLd data={webPage} />
      <PageHero
        kicker="Rechtliches"
        title="Datenschutzerklärung"
        subtitle="Informationen zur Verarbeitung Ihrer personenbezogenen Daten beim Besuch dieser Website – nach Art. 13 DSGVO."
      />

      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-[820px] px-4 sm:px-8 lg:px-10 text-[var(--ink-dim)] leading-relaxed">
          <Reveal>
            <H2>1. Verantwortliche Stelle</H2>
            <P>
              Verantwortlich für die Datenverarbeitung auf dieser Website im
              Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
            </P>
            <P>
              {settings.name}
              <br />
              Inhaber: {founders}
              <br />
              {settings.address.street}
              <br />
              {settings.address.zip} {settings.address.city}
              <br />
              {settings.address.country || "Deutschland"}
              <br />
              Telefon:{" "}
              <a
                href={`tel:${settings.phone.e164}`}
                className="text-[var(--ink)] hover:text-[var(--gold)]"
              >
                {settings.phone.display}
              </a>
              <br />
              E-Mail:{" "}
              <a
                href={`mailto:${settings.email}`}
                className="text-[var(--ink)] hover:text-[var(--gold)]"
              >
                {settings.email}
              </a>
            </P>
          </Reveal>

          <Reveal>
            <H2>2. Allgemeine Hinweise</H2>
            <P>
              Wir verarbeiten personenbezogene Daten nur, soweit dies zur
              Bereitstellung einer funktionsfähigen Website sowie unserer
              Inhalte und Leistungen erforderlich ist. Die Verarbeitung
              erfolgt regelmäßig nur nach Einwilligung der betroffenen Person
              oder in den Fällen, in denen eine vorherige Einwilligung aus
              tatsächlichen Gründen nicht möglich ist und die Verarbeitung
              gesetzlich gestattet ist.
            </P>
            <P>
              Rechtsgrundlagen der Verarbeitung sind Art. 6 Abs. 1 DSGVO
              (insbesondere Buchstabe a – Einwilligung, b – Vertrag/
              vorvertragliche Maßnahmen und f – berechtigtes Interesse) sowie
              § 25 TTDSG für den Zugriff auf Endgeräte.
            </P>
          </Reveal>

          <Reveal>
            <H2>3. Hosting (Vercel)</H2>
            <P>
              Diese Website wird bei der Vercel Inc., 440 N Barranca Ave #4133,
              Covina, CA 91723, USA (bzw. deren Rechenzentren in der EU,
              Region Frankfurt) gehostet. Beim Aufruf der Website werden
              technisch notwendige Daten (u. a. IP-Adresse, Datum und Uhrzeit,
              Referrer, User-Agent, Statuscode) in Server-Log-Dateien
              verarbeitet.
            </P>
            <P>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an einem sicheren und effizienten Website-Betrieb).
              Mit Vercel besteht ein Auftragsverarbeitungsvertrag nach Art. 28
              DSGVO.
            </P>
          </Reveal>

          <Reveal>
            <H2>4. Server-Log-Dateien</H2>
            <P>
              Der Provider erhebt und speichert automatisch Informationen in
              Server-Log-Dateien, die Ihr Browser übermittelt:
            </P>
            <UL>
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer-URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </UL>
            <P>
              Diese Daten werden nicht mit anderen Datenquellen
              zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
              Log-Daten werden nach spätestens 30 Tagen gelöscht, sofern nicht
              zur Aufklärung eines Sicherheitsvorfalls länger erforderlich.
            </P>
          </Reveal>

          <Reveal>
            <H2>5. Cookies und Einwilligungsverwaltung</H2>
            <P>
              Unsere Website verwendet Cookies und ähnliche Technologien, um
              den Betrieb zu ermöglichen und – ausschließlich nach Ihrer
              Einwilligung – die Nutzung zu analysieren oder Marketing
              auszuspielen. Sie steuern Ihre Einwilligung über unser
              eigenbetriebenes Consent-Banner. Ihre Auswahl wird in einem
              First-Party-Cookie (<code>pb_consent_v1</code>) auf Ihrem Gerät
              gespeichert; eine Übertragung an externe Consent-Dienstleister
              findet nicht statt.
            </P>
            <P>Wir unterscheiden folgende Kategorien:</P>
            <UL>
              <li>
                <strong className="text-[var(--ink)]">Notwendig</strong> –
                technisch erforderliche Cookies (z. B. Consent-Speicherung,
                Sicherheit, Formular). Rechtsgrundlage: § 25 Abs. 2 TTDSG.
              </li>
              <li>
                <strong className="text-[var(--ink)]">Analyse</strong> –
                anonymisierte Reichweitenmessung. Rechtsgrundlage: § 25 Abs. 1
                TTDSG i. V. m. Art. 6 Abs. 1 lit. a DSGVO.
              </li>
              <li>
                <strong className="text-[var(--ink)]">Marketing</strong> –
                Wiedererkennung für Kampagnenoptimierung. Rechtsgrundlage:
                § 25 Abs. 1 TTDSG i. V. m. Art. 6 Abs. 1 lit. a DSGVO.
              </li>
            </UL>
            <P>
              Die Einwilligung ist freiwillig und jederzeit widerrufbar. Sie
              können Ihre Auswahl über den Link „Cookie-Einstellungen" im
              Footer oder durch Löschen des <code>pb_consent_v1</code>-Cookies
              in Ihrem Browser jederzeit anpassen.
            </P>
          </Reveal>

          <Reveal>
            <H2>6. Kontaktformular</H2>
            <P>
              Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die von
              Ihnen eingegebenen Daten (Vorname, E-Mail-Adresse, optional
              Telefonnummer und Fahrzeugangaben, Nachricht). Der technische
              Versand der Formularanfrage erfolgt über den
              Auftragsverarbeiter <strong className="text-[var(--ink)]">Resend</strong>{" "}
              (Resend, Inc., 2261 Market Street #5039, San Francisco, CA
              94114, USA). Resend leitet die Anfrage per E-Mail an{" "}
              {settings.email} weiter und speichert die Inhalte zur
              Zustellungssicherung kurzzeitig.
            </P>
            <P>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
              Maßnahmen bzw. Vertragsdurchführung) sowie Art. 6 Abs. 1 lit. f
              DSGVO (berechtigtes Interesse an der Beantwortung Ihrer
              Anfrage). Die Daten werden nach abgeschlossener Bearbeitung
              gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten
              entgegenstehen.
            </P>
            <P>
              Da Resend seinen Sitz in den USA hat, findet eine
              Datenübermittlung in ein Drittland statt. Grundlage der
              Übermittlung sind Standardvertragsklauseln nach Art. 46 Abs. 2
              lit. c DSGVO sowie – soweit anwendbar – die Selbstzertifizierung
              nach dem EU-U.S. Data Privacy Framework.
            </P>
            <P>
              Zum Schutz vor Spam nutzen wir zusätzlich ein Honeypot-Feld
              (technisch unsichtbar) sowie ein Rate-Limit pro IP-Adresse. Es
              werden hierfür keine dauerhaften Nutzerprofile erstellt.
            </P>
          </Reveal>

          <Reveal>
            <H2>7. Terminbuchung via Calendly</H2>
            <P>
              Auf unserer Kontaktseite binden wir – soweit aktiv geschaltet –
              das Terminbuchungs-Widget von Calendly (Calendly LLC, 271 17th
              Street NW, Suite 1000, Atlanta, GA 30363, USA) ein. Beim Aufruf
              der Seite wird eine Verbindung zu Calendly-Servern aufgebaut,
              wobei technische Daten wie IP-Adresse, Browsertyp und
              aufgerufene Seiten übertragen werden können. Bei einer
              Terminbuchung übermitteln Sie zusätzlich Name, E-Mail und
              optionale Angaben direkt an Calendly.
            </P>
            <P>
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
              Maßnahmen) bzw. lit. f DSGVO (berechtigtes Interesse an
              effizienter Terminvereinbarung). Für die Drittstaaten-
              Übermittlung an Calendly (USA) gelten die Anforderungen des
              Kapitels V DSGVO. Weitere Informationen: {""}
              <a
                href="https://calendly.com/de/legal/privacy-notice"
                target="_blank"
                rel="noopener"
                className="text-[var(--ink)] hover:text-[var(--gold)] underline underline-offset-4"
              >
                calendly.com/de/legal/privacy-notice
              </a>
              .
            </P>
          </Reveal>

          <Reveal>
            <H2>8. Google Maps</H2>
            <P>
              Auf unserer Startseite und Kontaktseite binden wir eine
              Google-Maps-Karte zur Darstellung unseres Standorts ein.
              Anbieter ist die Google Ireland Limited, Gordon House, Barrow
              Street, Dublin 4, Irland. Beim Laden der Karte wird eine
              Verbindung zu Google-Servern aufgebaut und Ihre IP-Adresse an
              Google übertragen. Diese kann von Google in den USA verarbeitet
              werden.
            </P>
            <P>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an einer leicht auffindbaren Standortdarstellung).
              Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in
              der Datenschutzerklärung von Google:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener"
                className="text-[var(--ink)] hover:text-[var(--gold)] underline underline-offset-4"
              >
                policies.google.com/privacy
              </a>
              .
            </P>
          </Reveal>

          <Reveal>
            <H2>9. Google Tag Manager</H2>
            <P>
              Wir binden – ausschließlich nach Ihrer Einwilligung in die
              Kategorien „Analyse" oder „Marketing" – den Google Tag Manager
              der Google Ireland Limited ein, um Tags zentral zu verwalten.
              Der Tag Manager selbst erhebt keine personenbezogenen Daten,
              führt aber Tags aus, die dies tun können. Ohne Einwilligung wird
              der Tag Manager nicht geladen.
            </P>
            <P>
              Rechtsgrundlage: § 25 Abs. 1 TTDSG i. V. m. Art. 6 Abs. 1 lit. a
              DSGVO. Sie können Ihre Einwilligung jederzeit über die
              Cookie-Einstellungen im Footer widerrufen.
            </P>
          </Reveal>

          <Reveal>
            <H2>10. Selbstgehostete Schriftarten</H2>
            <P>
              Zur einheitlichen Darstellung von Schriften nutzen wir die
              Schriftart „Roboto" (Google LLC). Die Schriftdateien werden
              ausschließlich lokal vom Server dieser Website geladen; es
              erfolgt <strong className="text-[var(--ink)]">keine</strong>{" "}
              Verbindung zu Google-Servern.
            </P>
          </Reveal>

          <Reveal>
            <H2>11. WhatsApp-Button</H2>
            <P>
              Der WhatsApp-Button führt Sie – nach aktivem Klick – zu einer
              Kommunikation über WhatsApp. Durch das Öffnen des Buttons werden
              Daten an WhatsApp übertragen. Verantwortlicher Dienstanbieter
              ist die WhatsApp Ireland Ltd., 4 Grand Canal Square, Dublin 2,
              Irland. Bitte beachten Sie, dass WhatsApp unter Umständen
              Nutzerdaten an Meta-Unternehmen weitergibt. Die Nutzung erfolgt
              freiwillig; wir empfehlen, keine sensiblen Informationen über
              WhatsApp zu senden.
            </P>
          </Reveal>

          <Reveal>
            <H2>12. Externe Links (ProvenExpert, Google, Social Media)</H2>
            <P>
              Wir verlinken auf externe Bewertungs- und Social-Media-Profile
              (z. B. ProvenExpert, Google-Rezensionen, Instagram, Facebook,
              YouTube). Erst durch Klick auf den jeweiligen Link werden Daten
              an den externen Anbieter übertragen. Für die Datenverarbeitung
              auf den verlinkten Seiten ist der jeweilige Betreiber
              verantwortlich.
            </P>
          </Reveal>

          <Reveal>
            <H2>13. SSL-/TLS-Verschlüsselung</H2>
            <P>
              Diese Website nutzt aus Sicherheitsgründen und zum Schutz der
              Übertragung vertraulicher Inhalte eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
              Sie am „https://" in der Adresszeile Ihres Browsers und am
              Schloss-Symbol.
            </P>
          </Reveal>

          <Reveal>
            <H2>14. Ihre Rechte als betroffene Person</H2>
            <P>
              Sie haben uns gegenüber jederzeit folgende Rechte:
            </P>
            <UL>
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>
                Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)
              </li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>
                Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)
              </li>
              <li>
                Recht auf Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3
                DSGVO) mit Wirkung für die Zukunft
              </li>
            </UL>
            <P>
              Zur Ausübung Ihrer Rechte wenden Sie sich formlos an{" "}
              <a
                href={`mailto:${settings.email}`}
                className="text-[var(--ink)] hover:text-[var(--gold)] underline underline-offset-4"
              >
                {settings.email}
              </a>
              .
            </P>
          </Reveal>

          <Reveal>
            <H2>15. Beschwerderecht bei der Aufsichtsbehörde</H2>
            <P>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
              über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu
              beschweren (Art. 77 DSGVO). Für uns zuständig ist:
            </P>
            <P>
              Unabhängiges Datenschutzzentrum Saarland
              <br />
              Fritz-Dobisch-Straße 12
              <br />
              66111 Saarbrücken
              <br />
              Telefon: +49 681 94781-0
              <br />
              E-Mail: poststelle@datenschutz.saarland.de
            </P>
          </Reveal>

          <Reveal>
            <H2>16. Automatisierte Entscheidungsfindung / Profiling</H2>
            <P>
              Eine automatisierte Entscheidungsfindung einschließlich
              Profiling im Sinne des Art. 22 DSGVO findet nicht statt.
            </P>
          </Reveal>

          <Reveal>
            <H2>17. Speicherdauer</H2>
            <P>
              Personenbezogene Daten werden nur so lange gespeichert, wie es
              für die Erfüllung der jeweiligen Zwecke erforderlich ist oder
              wie es gesetzliche Aufbewahrungspflichten (insbesondere aus
              HGB und AO) vorsehen. Danach werden die Daten gelöscht oder
              gesperrt.
            </P>
          </Reveal>

          <Reveal>
            <H2>18. Änderungen dieser Datenschutzerklärung</H2>
            <P>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
              damit sie stets den aktuellen rechtlichen Anforderungen
              entspricht oder um Änderungen an unseren Leistungen umzusetzen.
              Für Ihren nächsten Besuch gilt dann die neue
              Datenschutzerklärung.
            </P>
            <p className="mt-6 text-xs text-[var(--ink-mute)]">
              Stand: August 2026
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
