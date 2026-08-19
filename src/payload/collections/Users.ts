import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  labels: { singular: "Nutzer", plural: "Nutzer" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "roles", "updatedAt"],
    group: "System",
  },
  fields: [
    { name: "name", type: "text", label: "Name" },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      required: true,
      defaultValue: ["editor"],
      options: [
        { label: "Admin (voller Zugriff)", value: "admin" },
        { label: "Redakteur (Inhalte pflegen)", value: "editor" },
      ],
      admin: {
        description:
          "Admins können Nutzer und System-Einstellungen ändern. Redakteure pflegen Inhalte.",
      },
    },
  ],
};
