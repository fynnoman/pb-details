import type { CollectionConfig } from "payload";

export const Awards: CollectionConfig = {
  slug: "awards",
  labels: { singular: "Auszeichnung", plural: "Auszeichnungen" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "order", "updatedAt"],
    description:
      "Badges (im Marquee) und Story-Karten (drei Kacheln darunter). Über 'Typ' entscheidet der Kunde, ob es ein Badge oder eine Story ist.",
    group: "Inhalte",
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true, label: "Interner Titel" },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "badge",
      options: [
        { label: "Badge (Marquee-Logo)", value: "badge" },
        { label: "Story-Karte (mit Text)", value: "story" },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Bild / Logo (Alt-Text wird aus dem Medium übernommen)",
    },
    {
      name: "storyLabel",
      type: "text",
      label: "Label (nur bei Story-Karten)",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "story",
      },
    },
    {
      name: "storyText",
      type: "textarea",
      label: "Story-Text (nur bei Story-Karten)",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "story",
      },
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
