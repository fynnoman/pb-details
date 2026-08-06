import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Datenschutzerklärung" },
  description:
    "Datenschutzerklärung von PB Fahrzeugpflege Saarlouis: Datenverarbeitung, Cookies, Google Analytics 4, Meta Pixel, Kontaktformular, hCaptcha, WhatsApp, Ihre Rechte.",
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
    h: "Server-Log-Dateien",
    p: "Beim Besuch unserer Website werden automatisch Daten erfasst, die Ihr Browser übermittelt. Dazu zählen Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Diese Daten sind technisch notwendig, um die Website anzuzeigen und die Stabilität zu gewährleisten. Eine Zusammenführung dieser Daten mit anderen Datenquellen findet nicht statt.",
  },
  {
    h: "Cookies und Einwilligungsverwaltung",
    p: "Unsere Website verwendet Cookies. Grundlage hierfür ist das Consent-Management-System CookieYes. Nutzer können selbst bestimmen, in welche Kategorien sie einwilligen möchten. Technisch notwendige Cookies werden ohne Einwilligung gesetzt, da sie für den Betrieb der Website erforderlich sind. Alle anderen Cookies werden nur nach ausdrücklicher Zustimmung aktiviert. Ihre Cookie-Einstellungen können jederzeit über die CookieYes-Oberfläche angepasst werden.",
  },
  {
    h: "Google Analytics 4",
    p: "Unsere Website verwendet Google Analytics 4. Dieser Dienst erfasst Daten über Besucherbewegungen auf der Website. Die Daten werden anonymisiert ausgewertet. Google Analytics 4 nutzt Cookies und andere Technologien. Die Verarbeitung erfolgt ausschließlich auf Basis einer Einwilligung gemäß Artikel 6 Absatz 1 Buchstabe a DSGVO. Sie können Ihre Zustimmung jederzeit über das CookieYes-System widerrufen. Die IP-Adressen werden automatisch gekürzt und nicht vollständig gespeichert.",
  },
  {
    h: "Meta Facebook Pixel",
    p: "Unsere Website verwendet das Meta Facebook Pixel des Anbieters Meta Platforms Ireland Ltd. Dies ermöglicht uns, das Besucherverhalten zu analysieren und zielgerichtete Werbeanzeigen zu schalten. Der Einsatz erfolgt nur mit Ihrer Einwilligung gemäß Artikel 6 Absatz 1 Buchstabe a DSGVO. Die Daten können in die USA übertragen werden. Grundlage dafür sind die Standardvertragsklauseln von Meta. Die Einwilligung kann jederzeit über CookieYes widerrufen werden.",
  },
  {
    h: "Google Tag Manager",
    p: "Wir nutzen Google Tag Manager, um Marketing- und Analyse-Tags zentral zu verwalten. Der Tag Manager selbst erhebt keine personenbezogenen Daten, führt aber Tags aus, die dies tun können. Die dadurch geladenen Dienste werden nur nach vorheriger Einwilligung über CookieYes aktiv.",
  },
  {
    h: "Kontaktformular",
    p: "Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die von Ihnen eingegebenen Daten wie Name, E-Mail-Adresse und Nachricht. Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihres Anliegens. Die Verarbeitung erfolgt auf Grundlage von Artikel 6 Absatz 1 Buchstabe b DSGVO. Die Daten werden gelöscht, sobald sie nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
  },
  {
    h: "hCaptcha",
    p: "Zum Schutz vor Missbrauch unseres Kontaktformulars nutzen wir hCaptcha. Anbieter ist Intuition Machines, Inc. hCaptcha erfasst technische Informationen (u. a. IP-Adresse, Browsertyp, Verweildauer, Mausbewegungen) und wertet aus, ob eine Anfrage von einem Menschen stammt. Die Verarbeitung erfolgt auf Grundlage von Artikel 6 Absatz 1 Buchstabe f DSGVO (berechtigtes Interesse an Spam-Abwehr).",
  },
  {
    h: "WhatsApp-Button",
    p: "Der WhatsApp-Button führt direkt zu einer Kommunikation über WhatsApp. Durch das Öffnen des Buttons werden Daten an WhatsApp übertragen. Verantwortlicher Dienstanbieter ist WhatsApp Ireland Ltd. Bitte beachten Sie, dass WhatsApp unter Umständen Nutzerdaten an Meta-Unternehmen weitergibt. Die Nutzung erfolgt freiwillig. Wir raten dazu, über WhatsApp keine sensiblen Informationen zu versenden.",
  },
  {
    h: "ProvenExpert-Widget",
    p: "Wir binden auf unserer Seite ein Widget des Bewertungsdienstleisters ProvenExpert (Expert Systems AG) ein. Beim Aufruf der Seiten mit Widget wird eine Verbindung zu ProvenExpert-Servern aufgebaut, wobei technische Daten wie Ihre IP-Adresse übertragen werden können. Die Einbindung erfolgt erst nach Ihrer Einwilligung über CookieYes.",
  },
  {
    h: "WerKenntDenBesten-Siegel",
    p: "Wir zeigen ein Kunden-Empfehlungssiegel von WerKenntDenBesten. Beim Laden des Siegels wird eine Verbindung zu den WKDB-Servern aufgebaut. Die Einbindung erfolgt erst nach Ihrer Einwilligung über CookieYes.",
  },
  {
    h: "Wordfence (Sicherheit)",
    p: "Zum Schutz unserer Website vor Angriffen setzen wir den Sicherheitsdienst Wordfence ein. Dieser prüft eingehende Anfragen und blockiert verdächtige Zugriffe. Dabei werden IP-Adressen und weitere technische Daten verarbeitet. Rechtsgrundlage ist Artikel 6 Absatz 1 Buchstabe f DSGVO (berechtigtes Interesse an sicherer Bereitstellung der Website).",
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
