import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { de } from "@payloadcms/translations/languages/de";
import { en } from "@payloadcms/translations/languages/en";
import path from "path";
import { fileURLToPath } from "url";

import { Media } from "./src/payload/collections/Media";
import { Faqs } from "./src/payload/collections/Faqs";
import { BlogPosts } from "./src/payload/collections/BlogPosts";
import { Pages } from "./src/payload/collections/Pages";
import { Settings } from "./src/payload/globals/Settings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: " | PB Fahrzeugpflege CMS",
    },
  },
  editor: lexicalEditor({}),
  collections: [
    {
      slug: "users",
      auth: true,
      admin: { useAsTitle: "email" },
      fields: [{ name: "name", type: "text" }],
    },
    Media,
    Faqs,
    BlogPosts,
    Pages,
  ],
  globals: [Settings],
  secret: process.env.PAYLOAD_SECRET || "unsafe-development-only-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL ||
        "postgres://placeholder:placeholder@localhost:5432/placeholder",
    },
  }),
  i18n: {
    supportedLanguages: { de, en },
    fallbackLanguage: "de",
  },
});
