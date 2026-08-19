import type { CollectionConfig, Field } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

const seoTab: Field = {
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
      {
        name: "primaryCta",
        type: "group",
        label: "Primärer Button (optional)",
        fields: [
          { name: "label", type: "text" },
          { name: "href", type: "text" },
        ],
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
        label: "Verlinkte Detail-URL (z. B. /leistungen/keramikversiegelung/)",
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
      { name: "primaryLabel", type: "text", defaultValue: "Jetzt Kontakt aufnehmen" },
      { name: "primaryHref", type: "text", defaultValue: "/kontakt/#termin" },
    ] as Field[],
  },
  {
    slug: "vergleichstabelle",
    labels: { singular: "Vergleichstabelle", plural: "Vergleichstabellen" },
    fields: [
      { name: "heading", type: "text", label: "Überschrift" },
      { name: "intro", type: "textarea", label: "Einleitungstext" },
      { name: "columnA", type: "text", required: true, label: "Spaltenkopf A" },
      { name: "columnB", type: "text", required: true, label: "Spaltenkopf B" },
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
  {
    slug: "prozess-schritte",
    labels: { singular: "Prozess-Schritte", plural: "Prozess-Sektionen" },
    fields: [
      { name: "kicker", type: "text", defaultValue: "So läuft es bei uns ab" },
      { name: "heading", type: "text", required: true },
      {
        name: "steps",
        type: "array",
        label: "Schritte",
        minRows: 2,
        fields: [
          { name: "title", type: "text", required: true },
          { name: "description", type: "textarea", required: true },
        ],
      },
      { name: "footnote", type: "text", label: "Fußnote (optional)" },
    ] as Field[],
  },
  {
    slug: "preistabelle",
    labels: { singular: "Preistabelle", plural: "Preistabellen" },
    fields: [
      { name: "kicker", type: "text", defaultValue: "Preise" },
      { name: "heading", type: "text", required: true },
      { name: "intro", type: "textarea", label: "Einleitungstext" },
      {
        name: "packages",
        type: "array",
        label: "Preispakete",
        minRows: 1,
        labels: { singular: "Paket", plural: "Pakete" },
        fields: [
          { name: "name", type: "text", required: true, label: "Paketname" },
          { name: "price", type: "text", required: true, label: 'Preis (z. B. „ab 299 €“)' },
          { name: "priceNote", type: "text", label: 'Zusatz zum Preis (z. B. „inkl. MwSt.“)' },
          { name: "description", type: "textarea", label: "Kurzbeschreibung" },
          {
            name: "positions",
            type: "array",
            label: "Positionen (Bulletpoints)",
            fields: [{ name: "text", type: "text", required: true }],
          },
          { name: "highlighted", type: "checkbox", defaultValue: false, label: "Als Empfehlung hervorheben" },
          { name: "ctaLabel", type: "text", defaultValue: "Anfragen" },
          { name: "ctaHref", type: "text", defaultValue: "/kontakt/#termin" },
        ],
      },
      { name: "footnote", type: "text", label: "Fußnote (z. B. Preishinweis, Zahlungsarten)" },
    ] as Field[],
  },
  {
    slug: "why-us-bento",
    labels: { singular: "Warum uns (Bento)", plural: "Warum-uns-Sektionen" },
    fields: [
      { name: "kicker", type: "text", defaultValue: "Warum PB Fahrzeugpflege" },
      { name: "heading", type: "text", required: true },
      {
        name: "metrics",
        type: "array",
        label: "Kennzahlen-Karten",
        minRows: 2,
        maxRows: 6,
        fields: [
          { name: "headline", type: "text", required: true, label: "Große Zahl / Wort" },
          { name: "body", type: "text", required: true, label: "Beschreibung darunter" },
        ],
      },
      {
        name: "bullets",
        type: "array",
        label: "Bulletpoints",
        fields: [{ name: "text", type: "text", required: true }],
      },
    ] as Field[],
  },
  {
    slug: "awards-marquee",
    labels: { singular: "Auszeichnungen (Marquee)", plural: "Awards-Sektionen" },
    fields: [
      { name: "kicker", type: "text", defaultValue: "Ausgezeichnet" },
      { name: "heading", type: "text", required: true },
      {
        name: "showStoryCards",
        type: "checkbox",
        defaultValue: true,
        label: "Story-Karten unter Marquee anzeigen",
      },
    ] as Field[],
  },
  {
    slug: "region-block",
    labels: { singular: "Region + Karte", plural: "Region-Sektionen" },
    fields: [
      { name: "kicker", type: "text", defaultValue: "Einzugsgebiet" },
      { name: "heading", type: "text", required: true },
      { name: "text", type: "textarea", label: "Beschreibung" },
      {
        name: "regions",
        type: "array",
        label: "Regionen-Tags",
        fields: [{ name: "label", type: "text", required: true }],
      },
      {
        name: "showMap",
        type: "checkbox",
        defaultValue: true,
        label: "Google-Maps-Karte anzeigen",
      },
    ] as Field[],
  },
  {
    slug: "kontakt-block",
    labels: { singular: "Kontakt / Termin", plural: "Kontakt-Sektionen" },
    fields: [
      { name: "kicker", type: "text", defaultValue: "Termin vereinbaren" },
      { name: "heading", type: "text", required: true },
      { name: "text", type: "textarea", label: "Beschreibung" },
      {
        name: "showCalendly",
        type: "checkbox",
        defaultValue: true,
        label: "Calendly-Widget anzeigen (nur wenn URL in Einstellungen gesetzt)",
      },
    ] as Field[],
  },
];

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Seite", plural: "Seiten" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "path", "_status", "updatedAt"],
    description:
      "Seiten werden aus einem Baukasten von Sektionen (Hero, Text, Leistung, FAQ, Galerie, CTA, Vergleich, Prozess, Preise, Awards, Region, Kontakt) zusammengesetzt.",
    group: "Inhalte",
    livePreview: {
      url: ({ data, req }) =>
        `${req.protocol}://${req.host}/api/preview?path=${encodeURIComponent(
          (data?.path as string) || "/",
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
    { name: "title", type: "text", required: true, label: "Interner Titel" },
    {
      name: "path",
      type: "text",
      required: true,
      unique: true,
      label: "URL-Pfad (z. B. /leistungen/keramikversiegelung/)",
    },
    {
      name: "sections",
      type: "blocks",
      label: "Sektionen (Baukasten)",
      blocks: sectionBlocks,
    },
    seoTab,
  ],
};
