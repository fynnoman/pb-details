import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const Services: CollectionConfig = {
  slug: "services",
  labels: { singular: "Leistung", plural: "Leistungen" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "order", "_status", "updatedAt"],
    description:
      "Die Leistungen (Keramikversiegelung, Nanoversiegelung, Fahrzeugaufbereitung, Lack- & Beulendoktor, Unfallschaden). Sortierung per Feld 'order'.",
    group: "Inhalte",
    livePreview: {
      url: ({ data, req }) =>
        `${req.protocol}://${req.host}/api/preview?path=${encodeURIComponent(
          `/leistungen/${data?.slug ?? ""}/`,
        )}`,
    },
  },
  versions: { drafts: { autosave: { interval: 800 } } },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return { _status: { equals: "published" } };
    },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Inhalt",
          fields: [
            { name: "title", type: "text", required: true, label: "Titel" },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              label: "URL-Slug (ohne Schrägstriche)",
              admin: {
                description: 'z. B. „keramikversiegelung", „nanoversiegelung", „unfallschaden".',
              },
            },
            { name: "tagline", type: "text", label: "Kurzclaim (unter der Überschrift)" },
            {
              name: "intro",
              type: "textarea",
              required: true,
              label: "Kurzbeschreibung (Übersicht/Homepage)",
            },
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              required: true,
              label: "Hauptbild",
            },
            {
              name: "features",
              type: "array",
              label: "Features (Bulletpoints)",
              minRows: 1,
              fields: [{ name: "text", type: "text", required: true }],
            },
            {
              name: "content",
              type: "richText",
              required: true,
              label: "Ausführlicher Fließtext",
              editor: lexicalEditor({}),
            },
            {
              name: "relatedFaqs",
              type: "relationship",
              relationTo: "faqs",
              hasMany: true,
              label: "FAQ-Einträge (unten auf der Detailseite)",
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            { name: "metaTitle", type: "text", label: "Meta-Titel" },
            { name: "metaDescription", type: "textarea", label: "Meta-Description" },
            {
              name: "ogImage",
              type: "upload",
              relationTo: "media",
              label: "OG-Image",
            },
          ],
        },
      ],
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 100,
      label: "Sortier-Nummer",
      admin: { position: "sidebar" },
    },
    {
      name: "showOnHome",
      type: "checkbox",
      defaultValue: true,
      label: "Auf Startseite anzeigen",
      admin: { position: "sidebar" },
    },
  ],
};
