/**
 * Vorbelegung fuer die editierbaren Rechtstexte, damit Karsten im
 * Verwaltungs-Editor die aktuelle Fassung sieht und direkt bearbeitet
 * (statt bei "0 Abschnitte" anzufangen).
 *
 * Texte wurden 1:1 aus der Live-Website uebernommen:
 * - https://pb-fahrzeugpflege.de/impressum/                (editierbare §§)
 * - https://pb-fahrzeugpflege.de/datenschutzerklaerung/    (§§ 2–18)
 * - https://pb-fahrzeugpflege.de/allgemeine-geschaeftsbedingungen/ (§§ 1–11)
 *
 * Wird ausschliesslich vom /api/verwaltung/data-Endpoint verwendet, um
 * fehlende `sections` aufzufuellen. Solange Karsten die Sections nicht
 * speichert, greift auf den Frontend-Seiten weiterhin der bestehende
 * Hardcoded-Fallback bzw. der pages-Collection-Inhalt. Erst nach dem
 * ersten Save schaltet die Seite auf den LegalSectionRenderer.
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
          "Der Provider erhebt und speichert automatisch Informationen in Server-Log-Dateien, die Ihr Browser übermittelt:\n\n- Browsertyp und Browserversion\n- verwendetes Betriebssystem\n- Referrer-URL\n- Hostname des zugreifenden Rechners\n- Uhrzeit der Serveranfrage\n- IP-Adresse\n\nDiese Daten werden nicht mit anderen Datenquellen zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Log-Daten werden nach spätestens 30 Tagen gelöscht, sofern nicht zur Aufklärung eines Sicherheitsvorfalls länger erforderlich.",
      },
      {
        heading: "5. Cookies und Einwilligungsverwaltung",
        body:
          "Unsere Website verwendet Cookies und ähnliche Technologien, um den Betrieb zu ermöglichen und – ausschließlich nach Ihrer Einwilligung – die Nutzung zu analysieren oder Marketing auszuspielen. Sie steuern Ihre Einwilligung über unser eigenbetriebenes Consent-Banner. Ihre Auswahl wird in einem First-Party-Cookie (pb_consent_v1) auf Ihrem Gerät gespeichert; eine Übertragung an externe Consent-Dienstleister findet nicht statt.\n\nWir unterscheiden folgende Kategorien:\n\n- Notwendig – technisch erforderliche Cookies (z. B. Consent-Speicherung, Sicherheit, Formular). Rechtsgrundlage: § 25 Abs. 2 TDDDG.\n- Analyse – anonymisierte Reichweitenmessung. Rechtsgrundlage: § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO.\n- Marketing – Wiedererkennung für Kampagnenoptimierung. Rechtsgrundlage: § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO.\n\nDie Einwilligung ist freiwillig und jederzeit widerrufbar. Sie können Ihre Auswahl über den Link „Cookie-Einstellungen“ im Footer oder durch Löschen des pb_consent_v1-Cookies in Ihrem Browser jederzeit anpassen.",
      },
      {
        heading: "6. Kontaktformular",
        body: `Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die von Ihnen eingegebenen Daten (Vorname, E-Mail-Adresse, optional Telefonnummer und Fahrzeugangaben, Nachricht). Der technische Versand der Formularanfrage erfolgt über den Auftragsverarbeiter Resend (Resend, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA). Resend leitet die Anfrage per E-Mail an ${email} weiter und speichert die Inhalte zur Zustellungssicherung kurzzeitig.\n\nRechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen bzw. Vertragsdurchführung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung Ihrer Anfrage). Die Daten werden nach abgeschlossener Bearbeitung gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.\n\nDa Resend seinen Sitz in den USA hat, findet eine Datenübermittlung in ein Drittland statt. Grundlage der Übermittlung sind Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO sowie – soweit anwendbar – die Selbstzertifizierung nach dem EU-U.S. Data Privacy Framework.\n\nZum Schutz vor Spam nutzen wir zusätzlich ein Honeypot-Feld (technisch unsichtbar) sowie ein Rate-Limit pro IP-Adresse. Es werden hierfür keine dauerhaften Nutzerprofile erstellt.`,
      },
      {
        heading: "7. Terminbuchung via Calendly",
        body:
          "Auf unserer Kontaktseite binden wir – soweit aktiv geschaltet – das Terminbuchungs-Widget von Calendly (Calendly LLC, 271 17th Street NW, Suite 1000, Atlanta, GA 30363, USA) ein. Beim Aufruf der Seite wird eine Verbindung zu Calendly-Servern aufgebaut, wobei technische Daten wie IP-Adresse, Browsertyp und aufgerufene Seiten übertragen werden können. Bei einer Terminbuchung übermitteln Sie zusätzlich Name, E-Mail und optionale Angaben direkt an Calendly.\n\nRechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. lit. f DSGVO (berechtigtes Interesse an effizienter Terminvereinbarung). Für die Drittstaaten-Übermittlung an Calendly (USA) gelten die Anforderungen des Kapitels V DSGVO. Weitere Informationen: https://calendly.com/de/legal/privacy-notice.",
      },
      {
        heading: "8. Google Maps",
        body:
          "Auf unserer Startseite binden wir – ausschließlich nach Ihrer Einwilligung in die Kategorie „Marketing“ – eine Google-Maps-Karte zur Darstellung unseres Standorts ein. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Ohne Ihre Einwilligung wird die Karte nicht geladen und es findet keine Verbindung zu Google-Servern statt. Erst nach Einwilligung wird die Karte nachgeladen; dabei wird Ihre IP-Adresse an Google übertragen und kann von Google in den USA verarbeitet werden.\n\nRechtsgrundlage ist § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen im Footer widerrufen. Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: https://policies.google.com/privacy.",
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
        body: `Sie haben uns gegenüber jederzeit folgende Rechte:\n\n- Recht auf Auskunft (Art. 15 DSGVO)\n- Recht auf Berichtigung (Art. 16 DSGVO)\n- Recht auf Löschung (Art. 17 DSGVO)\n- Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)\n- Recht auf Datenübertragbarkeit (Art. 20 DSGVO)\n- Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)\n- Recht auf Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO) mit Wirkung für die Zukunft\n\nZur Ausübung Ihrer Rechte wenden Sie sich formlos an ${email}.`,
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
        heading: "1. Geltungsbereich",
        body:
          "Diese AGB gelten für alle Dienstleistungen und Warenlieferungen der PB Fahrzeugpflege, Provinzialstraße 243, 66806 Ensdorf. Sie gelten für Verbraucher und Unternehmer im Sinne der §§ 13, 14 BGB gleichermaßen.",
      },
      {
        heading: "2. Angebot und Vertragsschluss",
        body:
          "Angebote erfolgen grundsätzlich nach Besichtigung des Fahrzeugs und einer individuellen Abstimmung des Leistungsumfangs. Der Vertrag kommt spätestens mit Abgabe des Fahrzeugs zur Durchführung der Arbeiten zustande. Terminvereinbarungen gelten als verbindliche Reservierung des Arbeitszeitraums.",
      },
      {
        heading: "3. Kostenvoranschläge",
        body:
          "Kostenvoranschläge sind unverbindlich. Für Kostenvoranschläge kann eine Gebühr in Höhe von bis zu 15 Prozent des voraussichtlichen Auftragswertes berechnet werden. Voraussetzung ist, dass der Kunde vor Erstellung des Kostenvoranschlags ausdrücklich auf die Kosten hingewiesen wurde und dem zugestimmt hat. Die Zustimmung kann mündlich, schriftlich oder in Textform (z. B. E-Mail, WhatsApp) erfolgen. Die Gebühr wird bei Auftragserteilung vollständig auf den Endpreis angerechnet.\n\nLehnt der Kunde den Auftrag nach Erstellung des Kostenvoranschlags ab, verbleibt die Gebühr als Vergütung für den erbrachten Aufwand.",
      },
      {
        heading:
          "4. Terminvergabe, Absagefristen, Ausfallentschädigung, Anzahlungen",
        body:
          "Termine sind verbindlich. Viele unserer Leistungen erfordern umfangreiche Vorbereitungen und können kurzfristig nicht neu vergeben werden. Eine Absage oder Terminverschiebung ist daher bis spätestens 72 Stunden vor dem vereinbarten Termin kostenfrei möglich.\n\nErfolgt eine Absage weniger als 72 Stunden vorher oder erscheint der Kunde nicht, behalten wir uns vor, eine angemessene Ausfallentschädigung in Höhe von bis zu 80 Prozent des vereinbarten oder geschätzten Auftragswertes zu berechnen. Dies gilt insbesondere, wenn reservierte Arbeitszeit, Werkflächen, Vorbereitung oder eingeplantes Personal kurzfristig nicht mehr anderweitig genutzt werden können. Dem Kunden bleibt der Nachweis vorbehalten, dass kein oder ein geringerer Schaden entstanden ist.\n\nFür bestimmte Leistungen, insbesondere Keramikversiegelungen sowie zeitintensive oder mehrtägige Aufbereitungen, kann eine Anzahlung verlangt werden. Die Anzahlung stellt eine Abschlagszahlung auf den späteren Gesamtpreis dar und wird vollständig auf die Endrechnung angerechnet. Wird ein solcher Termin weniger als 72 Stunden vorher abgesagt oder erscheint der Kunde nicht, verfällt die geleistete Anzahlung als Teil der Ausfallentschädigung. Ist der tatsächliche Schaden höher als die Anzahlung, können zusätzlich bis zu 80 Prozent des Auftragswertes berechnet werden, soweit dies den entstandenen Ausfall abbildet.\n\nAbsagen oder Terminänderungen, die außerhalb unserer Geschäftszeiten eingehen, gelten erst mit Beginn des nächsten Werktages als zugegangen. Nachrichten auf dem Anrufbeantworter, per E-Mail, WhatsApp oder anderen Messengern werden erst mit tatsächlicher Kenntnisnahme während unserer regulären Öffnungszeiten wirksam. Absagen am Wochenende, an Feiertagen oder spät abends gelten daher frühestens ab dem folgenden Werktag als eingegangen. Die 72-Stunden-Frist wird ab diesem Zeitpunkt berechnet.",
      },
      {
        heading: "5. Zahlungsbedingungen",
        body:
          "Die Zahlung erfolgt ausschließlich vor Ort in bar oder per EC-Karte. Zahlungen auf Rechnung sind nicht möglich. Die Vergütung ist mit Abschluss der Arbeiten sofort fällig.",
      },
      {
        heading: "6. Durchführung der Arbeiten / Übergabe",
        body:
          "Das Fahrzeug muss zum vereinbarten Termin zugänglich übergeben werden und vollständig leergeräumt sein. Für Schäden oder Verluste an im Fahrzeug zurückgelassenen Gegenständen übernehmen wir keine Haftung, sofern diese nicht auf Vorsatz oder grober Fahrlässigkeit unsererseits beruhen. Mängel oder Vorschäden sind bei Fahrzeugabgabe mitzuteilen. Nach Fertigstellung erfolgt die Abnahme vor Ort. Spätere Reklamationen, die bei üblicher Sorgfalt bei Abnahme erkennbar gewesen wären, können nicht berücksichtigt werden.",
      },
      {
        heading:
          "7. Keramikversiegelung: Schutzdauer, Pflegepflicht & Haftung",
        body:
          "Die Haltbarkeit unserer Keramikversiegelungen beträgt bis zu 3 Jahre, bei entsprechender Pflege noch deutlich länger. Dies ist jedoch stark von regelmäßiger und sachgemäßer Pflege abhängig. Wir übernehmen keine Garantie für die Haltbarkeit. Der Kunde ist verpflichtet, unsere Pflegehinweise einzuhalten. Eine unsachgemäße Pflege kann zu frühzeitigem Versagen der Versiegelung führen. Eine Nachbesserung erfolgt nur nach Kulanz und Einzelfallprüfung.",
      },
      {
        heading: "8. Haftung bei Lackzuständen, Vorschäden und Altarbeiten",
        body:
          "Viele Fahrzeuge weisen bei Übergabe Vorschäden, verdeckte Mängel oder zuvor instandgesetzte Bereiche auf. Diese sind häufig ohne Demontage, Spezialwerkzeuge oder tiefere Reinigung nicht erkennbar. Im Zuge unserer fachgerechten Arbeiten, beispielsweise bei Politur, Lackkorrektur, Reinigung oder Versiegelung, können solche Altzustände sichtbar werden oder sich verstärken. Dies beruht ausschließlich auf dem bestehenden Zustand des Fahrzeugs und stellt keinen Mangel unserer Leistung dar.\n\nGleiches gilt für altersbedingt instabile, gealterte oder vorgeschädigte Bauteile wie Clips, Halterungen, Zierleisten, Befestigungen, Kunststoffe oder Klebestellen, die aufgrund von Materialermüdung, Vorreparaturen, Spannungsrissen oder unsachgemäßen Vorarbeiten empfindlich reagieren oder versagen können. Lösen sich solche Bauteile, brechen sie oder treten weitere optische Veränderungen auf, liegt dies regelmäßig in den bestehenden Vorschäden oder Materialschwächen begründet.\n\nWir übernehmen keine Haftung für Schäden, Ablösungen, sichtbare Übergänge, Farbveränderungen, Materialbrüche oder andere Folgeerscheinungen, die durch solche Altzustände, Vorschäden, Materialermüdung oder nicht fachgerecht ausgeführte Vorarbeiten verursacht werden, soweit dies gesetzlich zulässig ist.\n\nDer Kunde ist verpflichtet, bei Auftragserteilung bekannte Vorschäden oder frühere Reparaturen mitzuteilen. Eine Haftung für verdeckte Vorschäden besteht nur im Rahmen der gesetzlichen Bestimmungen.",
      },
      {
        heading: "9. Versicherungsaufträge & Fremdaufträge",
        body:
          "Bei Aufträgen im Namen oder im Auftrag Dritter, zum Beispiel durch Versicherungen, Gutachter, Leasinggeber oder sonstige Institutionen, haftet der jeweilige Auftraggeber für die Richtigkeit und Vollständigkeit der übermittelten Angaben. Wir übernehmen keine Verantwortung für fehlerhafte oder unvollständige Vorgaben Dritter.\n\nUnsere Einschätzungen, Bewertungen oder Stellungnahmen zu Schäden, Zuständen oder Reparaturmöglichkeiten ersetzen kein Gutachten und basieren ausschließlich auf dem sichtbaren Zustand zum Zeitpunkt der Begutachtung. Verdeckte Mängel oder Schäden, die ohne Demontage, Spezialwerkzeuge oder weitergehende Prüfverfahren nicht erkennbar sind, fallen nicht in unsere Haftung.\n\nJegliche Kostenschätzungen oder Einschätzungen zu Reparaturmaßnahmen erfolgen nach bestem Wissen und auf Grundlage unserer Erfahrung. Eine Haftung für Abweichungen oder spätere Feststellungen besteht nur im Rahmen der gesetzlichen Bestimmungen.",
      },
      {
        heading: "10. Datenschutz / Videoüberwachung",
        body:
          "Zum Schutz unserer Kunden und Mitarbeiter sind unsere Räumlichkeiten kameraüberwacht. Dies ist durch deutliche Hinweisschilder vor Ort kenntlich gemacht. Die Aufzeichnung dient ausschließlich internen Sicherheits- und Dokumentationszwecken. Eine Verwendung zur Beweisführung bei Auftragsstreitigkeiten behalten wir uns vor. Daten werden DSGVO-konform verarbeitet und nach maximal 7 Tagen automatisch gelöscht, sofern sie nicht aus berechtigtem Grund länger gespeichert werden müssen (z. B. bei Rechtsstreitigkeiten).",
      },
      {
        heading: "11. Gerichtsstand / Schlussbestimmungen",
        body:
          "Es gilt deutsches Recht. Gerichtsstand ist Saarlouis, sofern der Kunde Kaufmann ist. Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
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
