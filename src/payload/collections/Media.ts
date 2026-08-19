import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Medium", plural: "Medien" },
  admin: {
    useAsTitle: "alt",
    description:
      "Alle Bilder, Videos und Dokumente. Alt-Text ist Pflicht (Barrierefreiheit + SEO). Upload per Drag & Drop.",
    group: "Medien",
  },
  access: { read: () => true },
  upload: {
    staticDir: "public/media",
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 800, height: 600, position: "centre" },
      { name: "hero", width: 2400, position: "centre" },
    ],
    mimeTypes: ["image/*", "video/*", "application/pdf"],
    adminThumbnail: "thumbnail",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Alt-Text (Bildbeschreibung)",
      admin: {
        description:
          'Kurzer Satz, der beschreibt, was zu sehen ist. Beispiel: „Schwarzer Porsche nach Keramikversiegelung – PB Fahrzeugpflege Saarlouis".',
      },
    },
    { name: "caption", type: "text", label: "Bildunterschrift (optional)" },
    { name: "credit", type: "text", label: "Fotograf / Quelle (optional)" },
  ],
};
