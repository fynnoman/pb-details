/**
 * Vorbelegung fuer die editierbaren Rechtstexte, damit Karsten im
 * Verwaltungs-Editor die aktuelle Fassung sieht und direkt bearbeitet
 * (statt bei "0 Abschnitte" anzufangen).
 *
 * Wird ausschliesslich vom /api/verwaltung/data-Endpoint verwendet, um
 * fehlende `sections` aufzufuellen. Solange Karsten die Sections nicht
 * speichert, greift auf den Frontend-Seiten weiterhin der bestehende
 * Hardcoded-Fallback. Erst nach dem ersten Save schaltet die
 * Seite auf den LegalSectionRenderer.
 */
import type { LegalSection } from "@/lib/site-data";

type SettingsLike = {
  name?: string;
  email?: string;
};

export function defaultLegalSections(settings: SettingsLike): {
  impressum: LegalSection[];
  datenschutz: LegalSection[];
  agb: LegalSection[];
} {
  const email = settings.email || "info@pb-fahrzeugpflege.de";
  const firma = settings.name || "PB Fahrzeugpflege Saarlouis";

  return {
    impressum: [
      {
        heading: "Verbraucherstreitbeilegung / Universalschlichtungsstelle",
        body:
          "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      },
      {
        heading: "Haftung für Inhalte",
        body:
          "Als Diensteanbieter sind wir gemäß § 7 Absatz 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach den §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.\n\nVerpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
      },
      {
        heading: "Haftung für Links",
        body:
          "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.\n\nEine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
      },
      {
        heading: "Urheberrecht",
        body:
          "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.\n\nSoweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.",
      },
      {
        heading: "Bildnachweise",
        body: `Sofern nicht anders gekennzeichnet, liegen die Bildrechte bei ${firma}. Weitere Nutzungen bedürfen der schriftlichen Zustimmung.`,
      },
    ],

    datenschutz: [
      {
        heading: "2. Allgemeine Hinweise",
        body:
          "Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung erfolgt regelmäßig nur nach Einwilligung der betroffenen Person oder in den Fällen, in denen eine vorherige Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung gesetzlich gestattet ist.\n\nRechtsgrundlagen der Verarbeitung sind Art. 6 Abs. 1 DSGVO (insbesondere Buchstabe a – Einwilligung, b – Vertrag/vorvertragliche Maßnahmen und f – berechtigtes Interesse) sowie § 25 TDDDG für den Zugriff auf Endgeräte.",
      },
      {
        heading: "3. Hosting (Vercel)",
        body:
          "Diese Website wird bei der Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA (bzw. deren Rechenzentren in der EU, Region Frankfurt) gehostet. Beim Aufruf der Website werden technisch notwendige Daten (u. a. IP-Adresse, Datum und Uhrzeit, Referrer, User-Agent, Statuscode) in Server-Log-Dateien verarbeitet.\n\nRechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und effizienten Website-Betrieb). Mit Vercel besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.",
      },
      {
        heading: "4. Server-Log-Dateien",
        body:
          "Der Provider erhebt und speichert automatisch Informationen in Server-Log-Dateien, die Ihr Browser übermittelt:\n\n– Browsertyp und Browserversion\n– verwendetes Betriebssystem\n– Referrer-URL\n– Hostname des zugreifenden Rechners\n– Uhrzeit der Serveranfrage\n– IP-Adresse\n\nDiese Daten werden nicht mit anderen Datenquellen zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Log-Daten werden nach spätestens 30 Tagen gelöscht, sofern nicht zur Aufklärung eines Sicherheitsvorfalls länger erforderlich.",
      },
      {
        heading: "5. Cookies und Einwilligungsverwaltung",
        body:
          "Unsere Website verwendet Cookies und ähnliche Technologien, um den Betrieb zu ermöglichen und – ausschließlich nach Ihrer Einwilligung – die Nutzung zu analysieren oder Marketing auszuspielen. Sie steuern Ihre Einwilligung über unser eigenbetriebenes Consent-Banner. Ihre Auswahl wird in einem First-Party-Cookie (pb_consent_v1) auf Ihrem Gerät gespeichert; eine Übertragung an externe Consent-Dienstleister findet nicht statt.\n\nWir unterscheiden folgende Kategorien:\n\n– Notwendig: technisch erforderliche Cookies (z. B. Consent-Speicherung, Sicherheit, Formular). Rechtsgrundlage: § 25 Abs. 2 TDDDG.\n– Analyse: anonymisierte Reichweitenmessung. Rechtsgrundlage: § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO.\n– Marketing: Wiedererkennung für Kampagnenoptimierung. Rechtsgrundlage: § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO.\n\nDie Einwilligung ist freiwillig und jederzeit widerrufbar. Sie können Ihre Auswahl über den Link „Cookie-Einstellungen“ im Footer oder durch Löschen des pb_consent_v1-Cookies in Ihrem Browser jederzeit anpassen.",
      },
      {
        heading: "6. Kontaktformular",
        body: `Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die von Ihnen eingegebenen Daten (Vorname, E-Mail-Adresse, optional Telefonnummer und Fahrzeugangaben, Nachricht). Der technische Versand der Formularanfrage erfolgt über den Auftragsverarbeiter Resend (Resend, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA). Resend leitet die Anfrage per E-Mail an ${email} weiter und speichert die Inhalte zur Zustellungssicherung kurzzeitig.\n\nRechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen bzw. Vertragsdurchführung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung Ihrer Anfrage). Die Daten werden nach abgeschlossener Bearbeitung gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.\n\nDa Resend seinen Sitz in den USA hat, findet eine Datenübermittlung in ein Drittland statt. Grundlage der Übermittlung sind Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO sowie – soweit anwendbar – die Selbstzertifizierung nach dem EU-U.S. Data Privacy Framework.\n\nZum Schutz vor Spam nutzen wir zusätzlich ein Honeypot-Feld (technisch unsichtbar) sowie ein Rate-Limit pro IP-Adresse. Es werden hierfür keine dauerhaften Nutzerprofile erstellt.`,
      },
      {
        heading: "7. Terminbuchung via Calendly",
        body:
          "Auf unserer Kontaktseite binden wir – soweit aktiv geschaltet – das Terminbuchungs-Widget von Calendly (Calendly LLC, 271 17th Street NW, Suite 1000, Atlanta, GA 30363, USA) ein. Beim Aufruf der Seite wird eine Verbindung zu Calendly-Servern aufgebaut, wobei technische Daten wie IP-Adresse, Browsertyp und aufgerufene Seiten übertragen werden können. Bei einer Terminbuchung übermitteln Sie zusätzlich Name, E-Mail und optionale Angaben direkt an Calendly.\n\nRechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. lit. f DSGVO (berechtigtes Interesse an effizienter Terminvereinbarung). Für die Drittstaaten-Übermittlung an Calendly (USA) gelten die Anforderungen des Kapitels V DSGVO. Weitere Informationen: https://calendly.com/de/legal/privacy-notice",
      },
      {
        heading: "8. Google Maps",
        body:
          "Auf unserer Startseite binden wir – ausschließlich nach Ihrer Einwilligung in die Kategorie „Marketing“ – eine Google-Maps-Karte zur Darstellung unseres Standorts ein. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Ohne Ihre Einwilligung wird die Karte nicht geladen und es findet keine Verbindung zu Google-Servern statt. Erst nach Einwilligung wird die Karte nachgeladen; dabei wird Ihre IP-Adresse an Google übertragen und kann von Google in den USA verarbeitet werden.\n\nRechtsgrundlage ist § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen im Footer widerrufen. Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: https://policies.google.com/privacy",
      },
      {
        heading: "9. Google Tag Manager",
        body:
          "Wir binden – ausschließlich nach Ihrer Einwilligung in die Kategorien „Analyse“ oder „Marketing“ – den Google Tag Manager der Google Ireland Limited ein, um Tags zentral zu verwalten. Der Tag Manager selbst erhebt keine personenbezogenen Daten, führt aber Tags aus, die dies tun können. Ohne Einwilligung wird der Tag Manager nicht geladen.\n\nRechtsgrundlage: § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen im Footer widerrufen.",
      },
      {
        heading: "10. Selbstgehostete Schriftarten",
        body:
          "Zur einheitlichen Darstellung von Schriften nutzen wir die Schriftart „Roboto“ (Google LLC). Die Schriftdateien werden ausschließlich lokal vom Server dieser Website geladen; es erfolgt keine Verbindung zu Google-Servern.",
      },
      {
        heading: "11. WhatsApp-Button",
        body:
          "Der WhatsApp-Button führt Sie – nach aktivem Klick – zu einer Kommunikation über WhatsApp. Durch das Öffnen des Buttons werden Daten an WhatsApp übertragen. Verantwortlicher Dienstanbieter ist die WhatsApp Ireland Ltd., 4 Grand Canal Square, Dublin 2, Irland. Bitte beachten Sie, dass WhatsApp unter Umständen Nutzerdaten an Meta-Unternehmen weitergibt. Die Nutzung erfolgt freiwillig; wir empfehlen, keine sensiblen Informationen über WhatsApp zu senden.",
      },
      {
        heading: "12. Externe Links (ProvenExpert, Google, Social Media)",
        body:
          "Wir verlinken auf externe Bewertungs- und Social-Media-Profile (z. B. ProvenExpert, Google-Rezensionen, Instagram, Facebook, YouTube). Erst durch Klick auf den jeweiligen Link werden Daten an den externen Anbieter übertragen. Für die Datenverarbeitung auf den verlinkten Seiten ist der jeweilige Betreiber verantwortlich.",
      },
      {
        heading: "13. SSL-/TLS-Verschlüsselung",
        body:
          "Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am „https://“ in der Adresszeile Ihres Browsers und am Schloss-Symbol.",
      },
      {
        heading: "14. Ihre Rechte als betroffene Person",
        body: `Sie haben uns gegenüber jederzeit folgende Rechte:\n\n– Recht auf Auskunft (Art. 15 DSGVO)\n– Recht auf Berichtigung (Art. 16 DSGVO)\n– Recht auf Löschung (Art. 17 DSGVO)\n– Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)\n– Recht auf Datenübertragbarkeit (Art. 20 DSGVO)\n– Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)\n– Recht auf Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO) mit Wirkung für die Zukunft\n\nZur Ausübung Ihrer Rechte wenden Sie sich formlos an ${email}.`,
      },
      {
        heading: "15. Beschwerderecht bei der Aufsichtsbehörde",
        body:
          "Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren (Art. 77 DSGVO). Für uns zuständig ist:\n\nUnabhängiges Datenschutzzentrum Saarland\nFritz-Dobisch-Straße 12\n66111 Saarbrücken\nTelefon: +49 681 94781-0\nE-Mail: poststelle@datenschutz.saarland.de",
      },
      {
        heading: "16. Automatisierte Entscheidungsfindung / Profiling",
        body:
          "Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne des Art. 22 DSGVO findet nicht statt.",
      },
      {
        heading: "17. Speicherdauer",
        body:
          "Personenbezogene Daten werden nur so lange gespeichert, wie es für die Erfüllung der jeweiligen Zwecke erforderlich ist oder wie es gesetzliche Aufbewahrungspflichten (insbesondere aus HGB und AO) vorsehen. Danach werden die Daten gelöscht oder gesperrt.",
      },
      {
        heading: "18. Änderungen dieser Datenschutzerklärung",
        body:
          "Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen an unseren Leistungen umzusetzen. Für Ihren nächsten Besuch gilt dann die neue Datenschutzerklärung.\n\nStand: August 2026",
      },
    ],

    agb: [
      {
        heading: "Vorläufiger Hinweis",
        body:
          "Diese Allgemeinen Geschäftsbedingungen werden derzeit überarbeitet und rechtlich geprüft. Für verbindliche Auskünfte bitten wir Sie, sich direkt an uns zu wenden.",
      },
    ],
  };
}

/**
 * Fuellt fehlende Sections mit den Defaults auf. Sobald ein Tab
 * eigene Sections enthaelt, bleibt der Tab unangetastet.
 */
export function withLegalDefaults(
  legal: {
    impressum?: { sections?: LegalSection[] };
    datenschutz?: { sections?: LegalSection[] };
    agb?: { sections?: LegalSection[] };
  } | null | undefined,
  settings: SettingsLike,
) {
  const defaults = defaultLegalSections(settings);
  const hasContent = (sections?: LegalSection[]) =>
    Array.isArray(sections) &&
    sections.some(
      (s) => (s.heading && s.heading.trim()) || (s.body && s.body.trim()),
    );
  return {
    ...(legal || {}),
    impressum: {
      ...(legal?.impressum || {}),
      sections: hasContent(legal?.impressum?.sections)
        ? legal!.impressum!.sections!
        : defaults.impressum,
    },
    datenschutz: {
      ...(legal?.datenschutz || {}),
      sections: hasContent(legal?.datenschutz?.sections)
        ? legal!.datenschutz!.sections!
        : defaults.datenschutz,
    },
    agb: {
      ...(legal?.agb || {}),
      sections: hasContent(legal?.agb?.sections)
        ? legal!.agb!.sections!
        : defaults.agb,
    },
  };
}
