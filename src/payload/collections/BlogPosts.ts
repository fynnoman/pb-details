import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  labels: { singular: "Blogbeitrag", plural: "Blogbeiträge" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "status", "updatedAt"],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return { status: { equals: "published" } };
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
              label: "URL-Slug (ohne / am Anfang und Ende)",
              admin: {
                description:
                  'z.B. „warum-neuwagen-im-rohzustand-sind-und-sofort-geschuetzt-werden-sollten"',
              },
            },
            {
              name: "intro",
              type: "textarea",
              required: true,
              label: "Intro-Text (wird in der Übersicht und oberhalb des Beitrags gezeigt)",
            },
            {
              name: "content",
              type: "richText",
              required: true,
              label: "Beitragsinhalt",
              editor: lexicalEditor({}),
            },
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              label: "Beitragsbild (optional)",
            },
            {
              name: "cta",
              type: "group",
              label: "Abschluss-CTA (optional)",
              fields: [
                { name: "label", type: "text", label: "Button-Text" },
                { name: "href", type: "text", label: "Ziel-URL" },
              ],
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "metaTitle",
              type: "text",
              label: "Meta-Titel (~60 Zeichen)",
            },
            {
              name: "metaDescription",
              type: "textarea",
              label: "Meta-Description (~155 Zeichen)",
            },
            {
              name: "ogImage",
              type: "upload",
              relationTo: "media",
              label: "OG-Image für Social Sharing",
            },
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Veröffentlichungsdatum",
      admin: { position: "sidebar" },
    },
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
