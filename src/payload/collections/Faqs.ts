import type { CollectionConfig } from "payload";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ-Eintrag", plural: "FAQ-Einträge" },
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "topic", "updatedAt"],
    description:
      "Zentrales FAQ-Repository. Fragen können auf Seiten per Tag oder ID referenziert werden – so gibt es genau eine gepflegte Antwort pro Frage.",
  },
  access: { read: () => true },
  fields: [
    {
      name: "question",
      type: "text",
      required: true,
      label: "Frage",
    },
    {
      name: "answer",
      type: "textarea",
      required: true,
      label: "Antwort",
    },
    {
      name: "topic",
      type: "select",
      label: "Thema",
      required: true,
      options: [
        { label: "Startseite / Allgemein", value: "home" },
        { label: "Keramikversiegelung", value: "keramikversiegelung" },
        { label: "Nanoversiegelung", value: "nanoversiegelung" },
        { label: "Fahrzeugaufbereitung", value: "fahrzeugaufbereitung" },
        { label: "Lack- & Beulendoktor", value: "lack-beulendoktor" },
        { label: "Unfallschaden", value: "unfallschaden" },
        { label: "Allgemeine FAQ-Seite", value: "faq-general" },
      ],
    },
    {
      name: "order",
      type: "number",
      label: "Reihenfolge innerhalb des Themas",
      defaultValue: 0,
    },
    {
      name: "publishedOnPages",
      type: "select",
      hasMany: true,
      label: "Auf welchen Seiten anzeigen",
      options: [
        { label: "Startseite", value: "/" },
        { label: "/leistungen/keramikversiegelung/", value: "/leistungen/keramikversiegelung/" },
        { label: "/leistungen/nanoversiegelung/", value: "/leistungen/nanoversiegelung/" },
        { label: "/leistungen/fahrzeugaufbereitung/", value: "/leistungen/fahrzeugaufbereitung/" },
        { label: "/leistungen/lack-und-beulendoktor/", value: "/leistungen/lack-und-beulendoktor/" },
        { label: "/unfallschaden/", value: "/unfallschaden/" },
        { label: "/faq/", value: "/faq/" },
      ],
    },
  ],
};
