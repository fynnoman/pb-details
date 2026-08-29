import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { de } from "@payloadcms/translations/languages/de";
import { en } from "@payloadcms/translations/languages/en";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./src/payload/collections/Users";
import { Media } from "./src/payload/collections/Media";
import { Faqs } from "./src/payload/collections/Faqs";
import { BlogPosts } from "./src/payload/collections/BlogPosts";
import { Pages } from "./src/payload/collections/Pages";
import { Services } from "./src/payload/collections/Services";
import { Vehicles } from "./src/payload/collections/Vehicles";
import { Awards } from "./src/payload/collections/Awards";
import { Redirects } from "./src/payload/collections/Redirects";

import { Settings } from "./src/payload/globals/Settings";
import { Navigation } from "./src/payload/globals/Navigation";
import { Footer } from "./src/payload/globals/Footer";
import { Home } from "./src/payload/globals/Home";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const serverUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  "http://localhost:3000";

export default buildConfig({
  serverURL: serverUrl,
  // Admin-UI komplett deaktiviert: die Redaktion nutzt ausschließlich
  // den eigenen Editor unter /verwaltung. Payload läuft weiterhin als
  // Backend (Local API in /api/verwaltung/*), aber ohne Admin-Routen.
  admin: {
    user: Users.slug,
    disable: true,
  },
  editor: lexicalEditor({}),
  collections: [Users, Media, Pages, Services, Vehicles, Awards, Faqs, BlogPosts, Redirects],
  globals: [Home, Settings, Navigation, Footer],
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
