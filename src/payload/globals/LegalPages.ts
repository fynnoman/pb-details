import type { GlobalConfig, Field } from "payload";

/**
 * Editierbare Rechtstexte fuer Impressum, Datenschutzerklaerung und AGB.
 *
 * Absicht: Karsten soll die Texte im /verwaltung-Editor pflegen koennen.
 *
 * Bewusst NICHT ueber diese Sections editierbar:
 *  - Impressum § 5 DDG, Vertreten durch, Kontakt, Redaktionell verantwortlich
 *    (nutzen Settings.name/address/phone/email dynamisch)
 *  - Impressum USt-IdNr. (hardcoded auf DE268106468, siehe Kommentar in
 *    src/app/(frontend)/impressum/page.tsx)
 *  - Datenschutz § 1 Verantwortliche Stelle (Settings-Daten)
 *  - Datenschutz § 4 Server-Logs, § 5 Cookies, § 7 Calendly, § 8 Google Maps,
 *    § 14 Rechte (enthalten Listen, externe Links oder eingebettete
 *    Settings-Daten – hardcoded, damit Formatierung intakt bleibt)
 *
 * Alle uebrigen §-Abschnitte werden als `sections`-Array editierbar bereitgestellt.
 * Body-Renderer trennt Absaetze an Leerzeilen; einfache http(s)-URLs werden
 * automatisch verlinkt (siehe Frontend-Renderer).
 */

const sectionField = (labelSingular: string, labelPlural: string): Field => ({
  name: "sections",
  type: "array",
  label: labelPlural,
  labels: { singular: labelSingular, plural: labelPlural },
  admin: {
    description:
      "Reihenfolge der Abschnitte = Reihenfolge auf der Seite. Absaetze im Text durch Leerzeilen trennen. Leere Abschnitte werden nicht angezeigt.",
  },
  fields: [
    { name: "heading", type: "text", label: "Ueberschrift (H2)" },
    { name: "body", type: "textarea", label: "Text", admin: { rows: 8 } },
  ],
});

export const LegalPages: GlobalConfig = {
  slug: "legal",
  label: "Rechtstexte",
  admin: {
    description:
      "Editierbare Abschnitte fuer Impressum, Datenschutz und AGB. Kontaktdaten, USt-IdNr., Cookie- und Rechte-Listen bleiben aus rechtlichen Gruenden im Code.",
    group: "Inhalte",
  },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Impressum",
          fields: [sectionField("Abschnitt", "Impressum-Abschnitte")],
          name: "impressum",
        },
        {
          label: "Datenschutz",
          fields: [sectionField("Abschnitt", "Datenschutz-Abschnitte")],
          name: "datenschutz",
        },
        {
          label: "AGB",
          fields: [sectionField("Abschnitt", "AGB-Abschnitte")],
          name: "agb",
        },
      ],
    },
  ],
};
