import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation (Menü)",
  admin: {
    description:
      "Menü-Struktur im Header. Reihenfolge per Drag & Drop. Untermenüs (Dropdown) über die Kinder-Einträge.",
    group: "Struktur",
  },
  access: { read: () => true },
  fields: [
    {
      name: "items",
      type: "array",
      label: "Menüeinträge",
      required: true,
      minRows: 1,
      labels: { singular: "Eintrag", plural: "Einträge" },
      fields: [
        { name: "label", type: "text", required: true, label: "Beschriftung" },
        {
          name: "href",
          type: "text",
          required: true,
          label: "Ziel-URL (z. B. /leistungen/)",
        },
        {
          name: "children",
          type: "array",
          label: "Unterpunkte (Dropdown, optional)",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "cta",
      label: "CTA-Button (rechts)",
      fields: [
        { name: "label", type: "text", defaultValue: "Jetzt anfragen" },
        { name: "shortLabel", type: "text", label: "Kurzform (Mobile)", defaultValue: "Termin" },
        { name: "href", type: "text", defaultValue: "/kontakt/#termin" },
      ],
    },
  ],
};
