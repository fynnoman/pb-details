import type { CollectionConfig } from "payload";

export const Vehicles: CollectionConfig = {
  slug: "vehicles",
  labels: { singular: "Fahrzeug-Kategorie", plural: "Fahrzeug-Kategorien" },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "order", "updatedAt"],
    description:
      "Die vier Fahrzeug-Kategorien der Startseite (Neuwagen, Sportwagen, Oldtimer, Gebrauchtwagen).",
    group: "Inhalte",
  },
  access: { read: () => true },
  fields: [
    { name: "label", type: "text", required: true, label: "Titel (z. B. Neuwagen)" },
    { name: "description", type: "textarea", required: true, label: "Kurzbeschreibung" },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Hintergrundbild",
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 100,
      label: "Sortierung",
      admin: { position: "sidebar" },
    },
  ],
};
