import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  admin: {
    description:
      "Fußbereich: Motto, Legal-Links, AI-Hinweis. Kontaktblock und Bewertungen kommen automatisch aus den Betriebsdaten.",
    group: "Struktur",
  },
  access: { read: () => true },
  fields: [
    {
      name: "intro",
      type: "textarea",
      label: "Einleitungstext links (unter Logo)",
      defaultValue:
        "The Art of Detailing. Premium-Fahrzeugaufbereitung und Keramikversiegelung – inhabergeführt seit 1997.",
    },
    {
      name: "motto",
      type: "text",
      label: "Motto",
      defaultValue: "„Glanz oder gar nicht.“",
    },
    {
      name: "legalLinks",
      type: "array",
      label: "Legal-Links (rechts unten)",
      minRows: 1,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
      defaultValue: [
        { label: "Impressum", href: "/impressum/" },
        { label: "Datenschutz", href: "/datenschutzerklaerung/" },
        { label: "AGB", href: "/allgemeine-geschaeftsbedingungen/" },
      ],
    },
    {
      name: "aiNote",
      type: "text",
      label: "AI-Hinweis (ganz unten)",
      defaultValue:
        "Diese Website wurde mit Unterstützung von Künstlicher Intelligenz erstellt.",
    },
  ],
};
