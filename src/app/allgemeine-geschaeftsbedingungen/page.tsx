import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Allgemeine Geschäftsbedingungen" },
  description: `Allgemeine Geschäftsbedingungen von ${SITE.name} – Stand: November 2025.`,
  alternates: { canonical: "/allgemeine-geschaeftsbedingungen/" },
  robots: { index: false, follow: true },
};

const paragraphs: { h: string; body: React.ReactNode }[] = [
  {
    h: "1. Geltungsbereich",
    body: `Diese AGB gelten für alle Dienstleistungen und Warenlieferungen der ${SITE.name}, ${SITE.address.street}, ${SITE.address.zip} ${SITE.address.city}. Sie gelten für Verbraucher und Unternehmer im Sinne der §§ 13, 14 BGB gleichermaßen.`,
  },
  {
    h: "2. Angebot und Vertragsschluss",
    body: "Angebote erfolgen grundsätzlich nach Besichtigung des Fahrzeugs und einer individuellen Abstimmung des Leistungsumfangs. Der Vertrag kommt spätestens mit Abgabe des Fahrzeugs zur Durchführung der Arbeiten zustande. Terminvereinbarungen gelten als verbindliche Reservierung des Arbeitszeitraums.",
  },
  {
    h: "3. Kostenvoranschläge",
    body: (
      <>
        <p>
          Kostenvoranschläge sind unverbindlich. Für Kostenvoranschläge kann eine
          Gebühr in Höhe von bis zu 15 Prozent des voraussichtlichen
          Auftragswertes berechnet werden. Voraussetzung ist, dass der Kunde vor
          Erstellung des Kostenvoranschlags ausdrücklich auf die Kosten
          hingewiesen wurde und dem zugestimmt hat. Die Zustimmung kann
          mündlich, schriftlich oder in Textform (z.&nbsp;B. E-Mail, WhatsApp)
          erfolgen. Die Gebühr wird bei Auftragserteilung vollständig auf den
          Endpreis angerechnet.
        </p>
        <p className="mt-3">
          Lehnt der Kunde den Auftrag nach Erstellung des Kostenvoranschlags ab,
          verbleibt die Gebühr als Vergütung für den erbrachten Aufwand.
        </p>
      </>
    ),
  },
  {
    h: "4. Terminvergabe, Absagefristen, Ausfallentschädigung, Anzahlungen",
    body: (
      <>
        <p>
          Termine sind verbindlich. Viele unserer Leistungen erfordern
          umfangreiche Vorbereitungen und können kurzfristig nicht neu vergeben
          werden. Eine Absage oder Terminverschiebung ist daher bis spätestens
          72 Stunden vor dem vereinbarten Termin kostenfrei möglich.
        </p>
        <p className="mt-3">
          Erfolgt eine Absage weniger als 72 Stunden vorher oder erscheint der
          Kunde nicht, behalten wir uns vor, eine angemessene
          Ausfallentschädigung in Höhe von bis zu 80 Prozent des vereinbarten
          oder geschätzten Auftragswertes zu berechnen. Dies gilt insbesondere,
          wenn reservierte Arbeitszeit, Werkflächen, Vorbereitung oder
          eingeplantes Personal kurzfristig nicht mehr anderweitig genutzt
          werden können. Dem Kunden bleibt der Nachweis vorbehalten, dass kein
          oder ein geringerer Schaden entstanden ist.
        </p>
        <p className="mt-3">
          Für bestimmte Leistungen, insbesondere Keramikversiegelungen sowie
          zeitintensive oder mehrtägige Aufbereitungen, kann eine Anzahlung
          verlangt werden. Die Anzahlung stellt eine Abschlagszahlung auf den
          späteren Gesamtpreis dar und wird vollständig auf die Endrechnung
          angerechnet. Wird ein solcher Termin weniger als 72 Stunden vorher
          abgesagt oder erscheint der Kunde nicht, verfällt die geleistete
          Anzahlung als Teil der Ausfallentschädigung. Ist der tatsächliche
          Schaden höher als die Anzahlung, können zusätzlich bis zu 80 Prozent
          des Auftragswertes berechnet werden, soweit dies den entstandenen
          Ausfall abbildet.
        </p>
        <p className="mt-3">
          Absagen oder Terminänderungen, die außerhalb unserer Geschäftszeiten
          eingehen, gelten erst mit Beginn des nächsten Werktages als
          zugegangen. Nachrichten auf dem Anrufbeantworter, per E-Mail,
          WhatsApp oder anderen Messengern werden erst mit tatsächlicher
          Kenntnisnahme während unserer regulären Öffnungszeiten wirksam.
          Absagen am Wochenende, an Feiertagen oder spät abends gelten daher
          frühestens ab dem folgenden Werktag als eingegangen. Die 72-Stunden-
          Frist wird ab diesem Zeitpunkt berechnet.
        </p>
      </>
    ),
  },
  {
    h: "5. Zahlungsbedingungen",
    body: "Die Zahlung erfolgt ausschließlich vor Ort in bar oder per EC-Karte. Zahlungen auf Rechnung sind nicht möglich. Die Vergütung ist mit Abschluss der Arbeiten sofort fällig.",
  },
  {
    h: "6. Durchführung der Arbeiten / Übergabe",
    body: "Das Fahrzeug muss zum vereinbarten Termin zugänglich übergeben werden und vollständig leergeräumt sein. Für Schäden oder Verluste an im Fahrzeug zurückgelassenen Gegenständen übernehmen wir keine Haftung, sofern diese nicht auf Vorsatz oder grober Fahrlässigkeit unsererseits beruhen. Mängel oder Vorschäden sind bei Fahrzeugabgabe mitzuteilen. Nach Fertigstellung erfolgt die Abnahme vor Ort. Spätere Reklamationen, die bei üblicher Sorgfalt bei Abnahme erkennbar gewesen wären, können nicht berücksichtigt werden.",
  },
  {
    h: "7. Keramikversiegelung: Schutzdauer, Pflegepflicht & Haftung",
    body: "Die Haltbarkeit unserer Keramikversiegelungen beträgt bis zu 3 Jahre, bei entsprechender Pflege noch deutlich länger. Dies ist jedoch stark von regelmäßiger und sachgemäßer Pflege abhängig. Wir übernehmen keine Garantie für die Haltbarkeit. Der Kunde ist verpflichtet, unsere Pflegehinweise einzuhalten. Eine unsachgemäße Pflege kann zu frühzeitigem Versagen der Versiegelung führen. Eine Nachbesserung erfolgt nur nach Kulanz und Einzelfallprüfung.",
  },
  {
    h: "8. Haftung bei Lackzuständen, Vorschäden und Altarbeiten",
    body: (
      <>
        <p>
          Viele Fahrzeuge weisen bei Übergabe Vorschäden, verdeckte Mängel oder
          zuvor instandgesetzte Bereiche auf. Diese sind häufig ohne Demontage,
          Spezialwerkzeuge oder tiefere Reinigung nicht erkennbar. Im Zuge
          unserer fachgerechten Arbeiten, beispielsweise bei Politur,
          Lackkorrektur, Reinigung oder Versiegelung, können solche Altzustände
          sichtbar werden oder sich verstärken. Dies beruht ausschließlich auf
          dem bestehenden Zustand des Fahrzeugs und stellt keinen Mangel
          unserer Leistung dar.
        </p>
        <p className="mt-3">
          Gleiches gilt für altersbedingt instabile, gealterte oder
          vorgeschädigte Bauteile wie Clips, Halterungen, Zierleisten,
          Befestigungen, Kunststoffe oder Klebestellen, die aufgrund von
          Materialermüdung, Vorreparaturen, Spannungsrissen oder
          unsachgemäßen Vorarbeiten empfindlich reagieren oder versagen können.
          Lösen sich solche Bauteile, brechen sie oder treten weitere optische
          Veränderungen auf, liegt dies regelmäßig in den bestehenden
          Vorschäden oder Materialschwächen begründet.
        </p>
        <p className="mt-3">
          Wir übernehmen keine Haftung für Schäden, Ablösungen, sichtbare
          Übergänge, Farbveränderungen, Materialbrüche oder andere
          Folgeerscheinungen, die durch solche Altzustände, Vorschäden,
          Materialermüdung oder nicht fachgerecht ausgeführte Vorarbeiten
          verursacht werden, soweit dies gesetzlich zulässig ist.
        </p>
        <p className="mt-3">
          Der Kunde ist verpflichtet, bei Auftragserteilung bekannte Vorschäden
          oder frühere Reparaturen mitzuteilen. Eine Haftung für verdeckte
          Vorschäden besteht nur im Rahmen der gesetzlichen Bestimmungen.
        </p>
      </>
    ),
  },
  {
    h: "9. Versicherungsaufträge & Fremdaufträge",
    body: (
      <>
        <p>
          Bei Aufträgen im Namen oder im Auftrag Dritter, zum Beispiel durch
          Versicherungen, Gutachter, Leasinggeber oder sonstige Institutionen,
          haftet der jeweilige Auftraggeber für die Richtigkeit und
          Vollständigkeit der übermittelten Angaben. Wir übernehmen keine
          Verantwortung für fehlerhafte oder unvollständige Vorgaben Dritter.
        </p>
        <p className="mt-3">
          Unsere Einschätzungen, Bewertungen oder Stellungnahmen zu Schäden,
          Zuständen oder Reparaturmöglichkeiten ersetzen kein Gutachten und
          basieren ausschließlich auf dem sichtbaren Zustand zum Zeitpunkt der
          Begutachtung. Verdeckte Mängel oder Schäden, die ohne Demontage,
          Spezialwerkzeuge oder weitergehende Prüfverfahren nicht erkennbar
          sind, fallen nicht in unsere Haftung.
        </p>
        <p className="mt-3">
          Jegliche Kostenschätzungen oder Einschätzungen zu Reparaturmaßnahmen
          erfolgen nach bestem Wissen und auf Grundlage unserer Erfahrung. Eine
          Haftung für Abweichungen oder spätere Feststellungen besteht nur im
          Rahmen der gesetzlichen Bestimmungen.
        </p>
      </>
    ),
  },
  {
    h: "10. Datenschutz / Videoüberwachung",
    body: "Zum Schutz unserer Kunden und Mitarbeiter sind unsere Räumlichkeiten kameraüberwacht. Dies ist durch deutliche Hinweisschilder vor Ort kenntlich gemacht. Die Aufzeichnung dient ausschließlich internen Sicherheits- und Dokumentationszwecken. Eine Verwendung zur Beweisführung bei Auftragsstreitigkeiten behalten wir uns vor. Daten werden DSGVO-konform verarbeitet und nach maximal 7 Tagen automatisch gelöscht, sofern sie nicht aus berechtigtem Grund länger gespeichert werden müssen (z. B. bei Rechtsstreitigkeiten).",
  },
  {
    h: "11. Gerichtsstand / Schlussbestimmungen",
    body: "Es gilt deutsches Recht. Gerichtsstand ist Saarlouis, sofern der Kunde Kaufmann ist. Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
  },
];

export default function AgbPage() {
  return (
    <main className="relative">
      <PageHero
        kicker="Stand: November 2025"
        title="Allgemeine Geschäftsbedingungen"
      />

      <section className="relative pb-24 sm:pb-32">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10 space-y-10 text-[var(--ink-dim)] leading-relaxed">
          {paragraphs.map((p, i) => (
            <Reveal key={p.h} delay={i * 0.03}>
              <div>
                <h2 className="font-display text-xl sm:text-2xl tracking-[-0.015em] mb-4 text-[var(--ink)]">
                  {p.h}
                </h2>
                <div>{p.body}</div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.4}>
            <p className="text-xs text-[var(--ink-mute)] pt-4 border-t border-white/5">
              {SITE.name} · Inhaber: {SITE.owner} · {SITE.address.street},{" "}
              {SITE.address.zip} {SITE.address.city} · www.pb-fahrzeugpflege.de
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
