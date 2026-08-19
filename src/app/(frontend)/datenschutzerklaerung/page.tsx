import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Datenschutzerklärung" },
  description:
    "Datenschutzerklärung von PB Fahrzeugpflege Saarlouis: Datenverarbeitung, Cookies, Google Tag Manager, Kontaktformular via Formsubmit, Calendly, Google Maps, Ihre Rechte.",
  alternates: { canonical: "/datenschutzerklaerung/" },
  robots: { index: false, follow: true },
};

const sections: { h: string; p: React.ReactNode }[] = [
  {
    h: "Verantwortliche Stelle",
    p: (
      <>
        {SITE.name}, Inhaber: {SITE.owner}, {SITE.address.street},{" "}
        {SITE.address.zip} {SITE.address.city}, Telefon: {SITE.phone.display},
        E-Mail: {SITE.email}
      </>
    ),
  },
  {
    h: "Allgemeine Hinweise zur Datenverarbeitung",
    p: "Wir verarbeiten personenbezogene Daten ausschließlich im Einklang mit der Datenschutzgrundverordnung sowie den geltenden nationalen Datenschutzgesetzen. Die Nutzung unserer Website ist grundsätzlich ohne Angabe personenbezogener Daten möglich. Personenbezogene Daten werden nur verarbeitet, soweit dies zur Bereitstellung einer funktionsfähigen Website oder zur Bearbeitung Ihrer Anfrage erforderlich ist.",
  },
  {
    h: "Hosting (Vercel)",
    p: "Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA (bzw. deren Rechenzentren in der EU) gehostet. Beim Aufruf der Website werden technisch notwendige Daten (u. a. IP-Adresse, Browsertyp, Uhrzeit) in Server-Log-Dateien verarbeitet. Rechtsgrundlage ist Artikel 6 Absatz 1 Buchstabe f DSGVO (berechtigtes Interesse an sicherem und effizientem Website-Betrieb). Es besteht ein Auftragsverarbeitungsvertrag nach Artikel 28 DSGVO.",
  },
  {
    h: "Server-Log-Dateien",
    p: "Beim Besuch unserer Website werden automatisch Daten erfasst, die Ihr Browser übermittelt. Dazu zählen Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Diese Daten sind technisch notwendig, um die Website anzuzeigen und die Stabilität zu gewährleisten. Eine Zusammenführung dieser Daten mit anderen Datenquellen findet nicht statt.",
  },
  {
    h: "Cookies und Einwilligungsverwaltung",
    p: "Unsere Website verwendet Cookies. Grundlage hierfür ist das Consent-Management-System CookieYes (CookieYes Limited, 3 Warren Yard, Warren Farm Office Village, Milton Keynes, England). Nutzer können selbst bestimmen, in welche Kategorien sie einwilligen möchten. Technisch notwendige Cookies werden ohne Einwilligung gesetzt, da sie für den Betrieb der Website erforderlich sind. Alle anderen Cookies werden nur nach ausdrücklicher Zustimmung aktiviert. Ihre Cookie-Einstellungen können jederzeit über die CookieYes-Oberfläche angepasst werden.",
  },
  {
    h: "Google Tag Manager",
    p: "Wir nutzen Google Tag Manager der Google Ireland Limited, um Marketing- und Analyse-Tags zentral zu verwalten. Der Tag Manager selbst erhebt keine personenbezogenen Daten, führt aber Tags aus, die dies tun können. Die dadurch geladenen Dienste werden nur nach vorheriger Einwilligung über CookieYes aktiv. Rechtsgrundlage für die Einbindung ist Artikel 6 Absatz 1 Buchstabe f DSGVO (berechtigtes Interesse an effizienter Tag-Verwaltung).",
  },
  {
    h: "Kontaktformular und Formsubmit",
    p: (
      <>
        Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die von Ihnen
        eingegebenen Daten (Vorname, E-Mail-Adresse, optional Telefonnummer
        und Fahrzeugangaben, Nachricht). Der technische Versand der
        Formularanfrage erfolgt über den Dienst{" "}
        <strong className="text-[var(--ink)]">Formsubmit</strong> (Formsubmit,
        USA). Formsubmit dient dabei als reiner Übermittlungs-Dienstleister:
        Die Anfrage wird von unserem Server an Formsubmit übertragen und von
        dort per E-Mail an {SITE.email} weitergeleitet. Formsubmit speichert
        die Formularinhalte für die Weiterleitung kurzzeitig zwischen; eine
        dauerhafte Speicherung erfolgt bei Formsubmit nach unserem
        Kenntnisstand nicht.
        <br />
        <br />
        Die Verarbeitung Ihrer Anfrage-Inhalte erfolgt auf Grundlage von
        Artikel 6 Absatz 1 Buchstabe b DSGVO (vorvertragliche Maßnahmen bzw.
        Vertragsdurchführung) bzw. Buchstabe f DSGVO (berechtigtes Interesse
        an der Beantwortung Ihrer Anfrage). Die Daten werden nach abgeschlossener
        Bearbeitung gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten
        entgegenstehen. Da Formsubmit in den USA sitzt, kann eine Übermittlung
        in ein Drittland stattfinden; für einen Nicht-EU-Empfang gelten die
        Anforderungen des Kapitel V DSGVO.
        <br />
        <br />
        Zum Schutz vor Spam nutzen wir zusätzlich ein Honeypot-Feld (technisch
        unsichtbar, für Menschen nicht ausfüllbar) sowie ein Rate-Limit
        (maximal 5 Anfragen pro Stunde pro IP-Adresse).
      </>
    ),
  },
  {
    h: "Terminbuchung via Calendly",
    p: "Auf unserer Kontaktseite binden wir das Terminbuchungs-Widget von Calendly (Calendly LLC, 271 17th Street NW, Suite 1000, Atlanta, GA 30363, USA) ein. Beim Aufruf der Seite wird eine Verbindung zu Calendly-Servern aufgebaut, wobei technische Daten wie IP-Adresse, Browsertyp und aufgerufene Seiten übertragen werden können. Bei einer Terminbuchung übermitteln Sie zusätzlich Name, E-Mail und optionale Angaben direkt an Calendly. Rechtsgrundlage: Artikel 6 Absatz 1 Buchstabe b DSGVO (vorvertragliche Maßnahmen) bzw. f DSGVO (berechtigtes Interesse an effizienter Terminvereinbarung). Da Calendly in den USA sitzt, findet eine Drittstaaten-Übermittlung statt.",
  },
  {
    h: "Google Maps Embed",
    p: "Auf unserer Startseite betten wir eine Google-Maps-Karte zur Darstellung unseres Standorts ein. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Beim Laden der Karte wird eine Verbindung zu Google-Servern aufgebaut und Ihre IP-Adresse an Google übertragen. Diese kann von Google in den USA verarbeitet werden. Rechtsgrundlage ist Artikel 6 Absatz 1 Buchstabe f DSGVO (berechtigtes Interesse an einer leicht auffindbaren Standortdarstellung).",
  },
  {
    h: "WhatsApp-Button",
    p: "Der WhatsApp-Button führt direkt zu einer Kommunikation über WhatsApp. Durch das Öffnen des Buttons werden Daten an WhatsApp übertragen. Verantwortlicher Dienstanbieter ist WhatsApp Ireland Ltd., 4 Grand Canal Square, Dublin 2, Irland. Bitte beachten Sie, dass WhatsApp unter Umständen Nutzerdaten an Meta-Unternehmen weitergibt. Die Nutzung erfolgt freiwillig. Wir raten dazu, über WhatsApp keine sensiblen Informationen zu versenden.",
  },
  {
    h: "ProvenExpert-Widget",
    p: "Wir binden auf unserer Seite ein Widget des Bewertungsdienstleisters ProvenExpert (Expert Systems AG, Quedlinburger Straße 1, 10589 Berlin) ein. Beim Aufruf der Seiten mit Widget wird eine Verbindung zu ProvenExpert-Servern aufgebaut, wobei technische Daten wie Ihre IP-Adresse übertragen werden können. Rechtsgrundlage: Artikel 6 Absatz 1 Buchstabe f DSGVO (berechtigtes Interesse an der Darstellung unserer Kundenbewertungen).",
  },
  {
    h: "werkenntdenBESTEN-Siegel",
    p: "Wir zeigen ein Kunden-Empfehlungssiegel von werkenntdenBESTEN (mediarocket GmbH). Beim Laden des Siegels wird eine Verbindung zu deren Servern aufgebaut. Rechtsgrundlage: Artikel 6 Absatz 1 Buchstabe f DSGVO (berechtigtes Interesse an der Darstellung unserer Bewertungen).",
  },
  {
    h: "Weitergabe von Daten",
    p: "Eine Weitergabe personenbezogener Daten erfolgt nur, wenn dies zur Vertragserfüllung notwendig ist, eine gesetzliche Verpflichtung besteht oder Sie ausdrücklich eingewilligt haben. Eine Weitergabe zu Werbezwecken findet nicht statt.",
  },
  {
    h: "Speicherdauer",
    p: "Personenbezogene Daten werden nur so lange gespeichert, wie es für die jeweiligen Zwecke erforderlich ist. Gesetzliche Aufbewahrungsfristen bleiben unberührt.",
  },
  {
    h: "Sicherheit",
    p: "Wir treffen technische und organisatorische Maßnahmen, um Ihre Daten gegen Verlust, Missbrauch oder unbefugten Zugriff zu schützen. Diese Maßnahmen entsprechen dem aktuellen Stand der Technik.",
  },
  {
    h: "Ihre Rechte",
    p: "Sie haben folgende Rechte: Auskunft über gespeicherte Daten · Berichtigung unrichtiger Daten · Löschung Ihrer Daten · Einschränkung der Verarbeitung · Widerspruch gegen die Verarbeitung · Datenübertragbarkeit · Beschwerderecht bei einer Datenschutzaufsichtsbehörde.",
  },
  {
    h: "Aktualität dieser Erklärung",
    p: "Diese Datenschutzerklärung wird regelmäßig aktualisiert. Es gilt stets die aktuelle Fassung auf dieser Seite.",
  },
];

export default function DatenschutzPage() {
  return (
    <main className="relative">
      <PageHero
        kicker="Datenschutz"
        title="Datenschutzerklärung"
      />

      <section className="relative pb-24 sm:pb-32">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10 space-y-8 text-[var(--ink-dim)] leading-relaxed">
          {sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.02}>
              <div>
                <h2 className="font-display text-xl sm:text-2xl tracking-[-0.015em] mb-4 text-[var(--ink)]">
                  {s.h}
                </h2>
                <p>{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
