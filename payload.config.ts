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
  admin: {
    user: Users.slug,
    meta: {
      title: "PB Fahrzeugpflege CMS",
      titleSuffix: " · PB Fahrzeugpflege",
      description:
        "Redaktions-Bereich für die Website von PB Fahrzeugpflege Saarlouis.",
      icons: [
        {
          rel: "icon",
          type: "image/png",
          url: "/images/logo/pb-fahrzeugpflege-logo-black.png",
        },
      ],
    },
    components: {
      graphics: {
        Logo: "/src/payload/components/Logo#default",
        Icon: "/src/payload/components/Icon#default",
      },
      beforeDashboard: ["/src/payload/components/BeforeDashboard#default"],
    },
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 390, height: 844 },
        { label: "Tablet", name: "tablet", width: 834, height: 1194 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
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
