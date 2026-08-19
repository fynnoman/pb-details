import type { CollectionConfig } from "payload";

export const Redirects: CollectionConfig = {
  slug: "redirects",
  labels: { singular: "Weiterleitung", plural: "Weiterleitungen" },
  admin: {
    useAsTitle: "from",
    defaultColumns: ["from", "to", "statusCode", "updatedAt"],
    description:
      "301-Weiterleitungen für alte URLs (aus WordPress/Rank-Math). Änderungen werden erst nach einem Redeploy oder nach dem Cache-Ablauf wirksam.",
    group: "System",
  },
  access: { read: () => true },
  fields: [
    {
      name: "from",
      type: "text",
      required: true,
      unique: true,
      label: "Quell-Pfad (z. B. /alte-seite/)",
      admin: {
        description: "Mit führendem / beginnen. Ohne Domain.",
      },
    },
    {
      name: "to",
      type: "text",
      required: true,
      label: "Ziel-Pfad oder -URL",
    },
    {
      name: "statusCode",
      type: "select",
      required: true,
      defaultValue: "301",
      options: [
        { label: "301 (permanent)", value: "301" },
        { label: "302 (temporär)", value: "302" },
      ],
    },
    {
      name: "note",
      type: "text",
      label: "Notiz (intern)",
    },
  ],
};
