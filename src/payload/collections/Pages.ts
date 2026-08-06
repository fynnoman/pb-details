import type { CollectionConfig, Field } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

const seoField: Field = {
  type: "tabs",
  tabs: [
    {
      label: "SEO",
      fields: [
        { name: "metaTitle", type: "text", label: "Meta-Titel" },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta-Description",
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
          label: "OG-Image (Social Sharing)",
        },
        {
          name: "noindex",
          type: "checkbox",
          defaultValue: false,
          label: "Von Suchmaschinen ausschließen (noindex)",
        },
      ],
    },
  ],
};

/**
 * Baukasten-Sektionen für den Kunden.
 * Jede Sektion ist ein "Block", der über den Payload-Admin
 * hinzugefügt, sortiert und entfernt werden kann.
 */
const sectionBlocks = [
  {
    slug: "hero",
    labels: { singular: "Hero", plural: "Hero-Sektionen" },
    fields: [
      { name: "kicker", type: "text", label: "Kicker (kleiner Text darüber)" },
      { name: "title", type: "text", required: true, label: "Überschrift" },
      { name: "subtitle", type: "textarea", label: "Untertitel / Sub-Text" },
      {
        name: "backgroundImage",
        type: "upload",
        relationTo: "media",
        label: "Hintergrundbild",
      },
    ] as Field[],
  },
  {
    slug: "text",
    labels: { singular: "Textblock", plural: "Textblöcke" },
    fields: [
      { name: "heading", type: "text", label: "Überschrift (H2)" },
      {
        name: "body",
        type: "richText",
        required: true,
        editor: lexicalEditor({}),
        label: "Fließtext",
      },
    ] as Field[],
  },
  {
    slug: "leistungsblock",
    labels: { singular: "Leistungsblock", plural: "Leistungsblöcke" },
    fields: [
      { name: "heading", type: "text", required: true, label: "Überschrift" },
      { name: "description", type: "textarea", label: "Beschreibung" },
      {
        name: "features",
        type: "array",
        label: "Features / Bulletpoints",
        fields: [{ name: "text", type: "text", required: true }],
      },
      {
        name: "image",
        type: "upload",
        relationTo: "media",
        label: "Bild",
      },
      {
        name: "linkHref",
        type: "text",
        label: "Verlinkte Detail-URL (z.B. /leistungen/keramikversiegelung/)",
      },
    ] as Field[],
  },
  {
    slug: "faq-block",
    labels: { singular: "FAQ-Sektion", plural: "FAQ-Sektionen" },
    fields: [
      { name: "kicker", type: "text", defaultValue: "Häufige Fragen" },
      { name: "heading", type: "text", label: "Überschrift" },
      {
        name: "faqs",
        type: "relationship",
        relationTo: "faqs",
        hasMany: true,
        label: "FAQ-Einträge (aus dem globalen FAQ-Repository)",
      },
    ] as Field[],
  },
  {
    slug: "galerie",
    labels: { singular: "Galerie", plural: "Galerien" },
    fields: [
      { name: "heading", type: "text", label: "Überschrift" },
      {
        name: "images",
        type: "array",
        label: "Bilder",
        fields: [
          {
            name: "image",
            type: "upload",
            relationTo: "media",
            required: true,
          },
        ],
      },
    ] as Field[],
  },
  {
    slug: "cta",
    labels: { singular: "Call-to-Action", plural: "Call-to-Actions" },
    fields: [
      { name: "kicker", type: "text", defaultValue: "Unverbindlich anfragen" },
      { name: "heading", type: "text", required: true, label: "Überschrift" },
      { name: "text", type: "textarea", label: "Beschreibung" },
      {
        name: "primaryLabel",
        type: "text",
        defaultValue: "Jetzt Kontakt aufnehmen",
      },
      { name: "primaryHref", type: "text", defaultValue: "/kontakt/" },
    ] as Field[],
  },
  {
    slug: "vergleichstabelle",
    labels: { singular: "Vergleichstabelle", plural: "Vergleichstabellen" },
    fields: [
      { name: "heading", type: "text", label: "Überschrift" },
      { name: "intro", type: "textarea", label: "Einleitungstext" },
      {
        name: "columnA",
        type: "text",
        required: true,
        label: "Spaltenkopf A",
      },
      {
        name: "columnB",
        type: "text",
        required: true,
        label: "Spaltenkopf B",
      },
      {
        name: "rows",
        type: "array",
        label: "Zeilen",
        fields: [
          { name: "kriterium", type: "text", required: true },
          { name: "valueA", type: "text", required: true },
          { name: "valueB", type: "text", required: true },
        ],
      },
    ] as Field[],
  },
];

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Seite", plural: "Seiten" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "path", "status", "updatedAt"],
    description:
      "Seiten werden aus einem Baukasten von Sektionen (Hero, Text, Leistung, FAQ, Galerie, CTA, Vergleich) zusammengesetzt.",
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return { status: { equals: "published" } };
    },
  },
  fields: [
    { name: "title", type: "text", required: true, label: "Interner Titel" },
    {
      name: "path",
      type: "text",
      required: true,
      unique: true,
      label: "URL-Pfad (z.B. /leistungen/keramikversiegelung/)",
    },
    {
      name: "sections",
      type: "blocks",
      label: "Sektionen (Baukasten)",
      blocks: sectionBlocks,
    },
    seoField,
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Entwurf", value: "draft" },
        { label: "Veröffentlicht", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};
