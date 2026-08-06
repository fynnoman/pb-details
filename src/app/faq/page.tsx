import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FAQ, { type FaqItem } from "@/components/FAQ";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: {
    absolute: "FAQ Keramikversiegelung und Fahrzeugaufbereitung Saarlouis",
  },
  description:
    "Häufige Fragen zu Keramikversiegelung & Fahrzeugaufbereitung: Kosten, Haltbarkeit, Ablauf, Pflege und Waschanlage – klar und praxisnah beantwortet.",
  alternates: { canonical: "/faq/" },
};

const faqs: FaqItem[] = [
  {
    q: "Was kostet eine Keramikversiegelung am Auto?",
    a: "Als Orientierung liegt eine Keramikversiegelung meist zwischen 1.500 und 1.900 EUR. Entscheidend sind Lackzustand, nötige Lackkorrektur, Größe des Fahrzeugs und der gewünschte Umfang, zum Beispiel Felgen oder Scheiben. Wir machen erst eine kurze Begutachtung und sagen dir dann transparent, was sinnvoll ist. Pauschalpreise ohne diese Angaben sind schlicht unseriös.",
  },
  {
    q: "Wie lange hält eine Keramikversiegelung wirklich?",
    a: "Die Schutzwirkung liegt in der Regel bei etwa 3 Jahren. Wie gut die Optik über die Zeit bleibt, hängt stark von Pflege und Waschmethode ab. Wer regelmäßig falsch wäscht oder aggressive Chemie nutzt, kann die Oberfläche schneller stumpf wirken lassen. Wir erklären dir nach der Abholung kurz, was du tun und lassen solltest.",
  },
  {
    q: "Wie läuft eine Keramikversiegelung bei Ihnen ab?",
    a: "Wir prüfen zuerst den Lackzustand und klären, welches Ergebnis realistisch ist. Danach folgt die gründliche Reinigung, Dekontamination und je nach Zustand die Lackkorrektur. Erst wenn der Lack wirklich sauber vorbereitet ist, wird die Keramik aufgetragen. Am Ende zählt nicht die Keramik, sondern die Vorbereitung, weil dort die Qualität entsteht.",
  },
  {
    q: "Kann ich mit Keramikversiegelung in die Waschanlage?",
    a: "Technisch ja, aber es ist nicht die beste Lösung, wenn du den Lack dauerhaft sauber halten willst. Bürstenanlagen erzeugen auf Dauer Waschkratzer, Keramik verhindert das nicht komplett. Wenn Waschanlage, dann möglichst schonend, und du solltest wissen, dass dunkle Lacke solche Spuren schneller zeigen. Besser ist eine passende Handwäsche oder eine wirklich gute Textilwaschanlage mit sauberer Vorwäsche.",
  },
  {
    q: "Wie pflege ich ein Auto mit Keramikversiegelung?",
    a: "Schonend waschen, keine Bürsten, keine aggressiven Reiniger ohne Grund. Regelmäßige Wäsche mit saurem Autoshampoo erhält Glanz und Abperlen deutlich länger. Wir geben dir nach der Abholung klare Pflegehinweise, damit das Ergebnis im Alltag so bleibt, wie du es abholst.",
  },
  {
    q: "Wie schnell sollte ein Neuwagen versiegelt werden?",
    a: "So früh wie möglich. Viele Neuwagen sind im Rohzustand, also ohne echten Lackschutz, und sammeln schnell die ersten Spuren durch Wäsche, Insekten, Staub und Standzeit. Wer früh versiegelt, hält den Lack länger in einem sauberen Zustand. Je länger du wartest, desto höher ist meistens der Korrekturaufwand.",
  },
  {
    q: "Wie lange dauert eine Aufbereitung oder Keramikversiegelung?",
    a: "Das hängt vom Paket und vom Zustand ab. Eine Außenaufbereitung mit Lackkorrektur wie auch die Innenraumaufbereitung (Trocknung) liegt meist bei 2 Tagen. Eine Keramikversiegelung mit Vorbereitung dauert in der Regel 2 bis 4 Tage. Nach der Begutachtung nennen wir dir eine realistische Dauer.",
  },
  {
    q: "Wird mein Fahrzeug danach wie neu?",
    a: "Manchmal sehr nah dran, aber nicht immer. Tiefe Kratzer, Lackschäden oder bereits nachlackierte Bereiche setzen Grenzen. Unser Anspruch ist ein sichtbar besseres Ergebnis ohne Blender-Versprechen. Bei der Begutachtung zeigen wir dir, was möglich ist und wo man fairerweise Grenzen anerkennen muss.",
  },
  {
    q: "Warum ist eine Begutachtung vor Ort so wichtig?",
    a: "Weil Licht, Fotos und Winkel täuschen. Lackhärte, Kratzerbild, Vorarbeiten, Fahrzeuggröße und Details wie Felgen oder Klavierlack im Innenraum bestimmen den Aufwand. Erst wenn wir das Fahrzeug live sehen, können wir Preis, Dauer und Ergebnis seriös einschätzen.",
  },
  {
    q: "Muss ich für ein Angebot einen Termin vereinbaren?",
    a: "Nein. Du kannst während der Öffnungszeiten ohne Termin vorbeikommen. Wir schauen das Fahrzeug direkt an und klären, was realistisch ist und was nicht. Bei weiterer Anfahrt ist ein kurzer Anruf sinnvoll, damit sicher Zeit für dich ist.",
  },
  {
    q: "Verfügen Sie über Leihwagen?",
    a: "Ja. Ein Leihwagen ist nach Verfügbarkeit möglich. Preis: ab 55 EUR pro Tag. Bitte frühzeitig Bescheid geben, damit wir planen können.",
  },
  {
    q: "Lohnt sich eine Aufbereitung vor der Leasingrückgabe?",
    a: "Sehr oft ja. Viele Rückgaben werden wegen sichtbarer Kleinigkeiten teuer, zum Beispiel matte Lackflächen, Umweltablagerungen, starke Waschkratzer, eingebrannte Insektenreste bzw. Vogelkot oder Innenraumabnutzung und Gerüche. Ebenso werden kleinere Dellen und Abschürfungen am Lack gerne zur Berechnung herangezogen. Durch eine gezielte Aufbereitung können wir die Optik deutlich verbessern und Stress bei der Rückgabe reduzieren. Wir sagen dir vorher ehrlich, was sich rechnet und was nicht.",
  },
  {
    q: "Neuwagen oder Gebrauchtwagen polieren – wozu überhaupt?",
    a: 'Ein Neuwagen ist selten wirklich „neu" im Lack. Transport, Standzeit, Händlerwäsche und schnelle Aufbereitung hinterlassen oft feine Kratzer, Schleier oder Hologramme. Bei Gebrauchtwagen kommen Waschkratzer, Insektenreste, Teer, Flugrost und matte Stellen dazu. Polieren heißt nicht „glänzend machen", sondern Lackzustand sichtbar verbessern und die Basis für Schutz schaffen. Wenn du Werterhalt willst, führt an einer sauberen Lackkorrektur kaum ein Weg vorbei.',
  },
];

export default function FAQPage() {
  return (
    <main className="relative">
      <PageHero
        kicker="Häufige Fragen"
        title="FAQ – Keramikversiegelung und Fahrzeugaufbereitung"
        subtitle="Hier findest du die häufigsten Fragen rund um Keramikversiegelung und Fahrzeugaufbereitung. Die Antworten sind bewusst klar und praxisnah, ohne Showversprechen. Wenn du es genau wissen willst, komm kurz ohne Termin vorbei oder ruf uns an."
      />

      <FAQ
        id="faq-alle"
        kicker="Alle Antworten"
        title={
          <>
            Praxisnah &amp; klar –{" "}
            <span className="italic text-gold">ohne Showversprechen.</span>
          </>
        }
        faqs={faqs}
        showAllLink={false}
      />

      <section className="relative py-8 sm:py-12">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10 text-center">
          <Reveal>
            <p className="text-[var(--ink-dim)] leading-relaxed text-lg">
              Für eine unverbindliche Einschätzung kommen Sie einfach ohne
              Termin vorbei oder rufen uns an. Dann schauen wir Ihr Fahrzeug
              gemeinsam an und sagen Ihnen klar, was sinnvoll ist.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Noch eine Frage{" "}
            <span className="italic text-gold">offen?</span>
          </>
        }
        text="Ein kurzer Anruf oder eine Nachricht reichen. Wir antworten in der Regel innerhalb von 24 Stunden."
      />
    </main>
  );
}
