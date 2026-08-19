import type { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Betriebsdaten",
  admin: {
    description:
      "Zentrale Daten des Betriebs: NAP, Öffnungszeiten, Bewertungen. Ändert sich hier ein Wert, wirkt er sich auf der gesamten Website aus.",
    group: "Struktur",
  },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Kontaktdaten",
          fields: [
            { name: "name", type: "text", required: true, label: "Firmenname (Anzeige)" },
            { name: "legalName", type: "text", label: "Rechtlicher Name" },
            { name: "tagline", type: "text", label: "Claim", defaultValue: "The Art of Detailing" },
            { name: "domain", type: "text", required: true, label: "Kanonische Domain (mit https://)" },
            { name: "founded", type: "number", label: "Gründungsjahr" },
            { name: "owner", type: "text", label: "Inhaber" },
            { name: "founders", type: "text", label: "Gründer (Klartext)" },
            {
              type: "group",
              name: "address",
              label: "Adresse",
              fields: [
                { name: "street", type: "text", required: true, label: "Straße & Hausnummer" },
                { name: "zip", type: "text", required: true },
                { name: "city", type: "text", required: true },
                { name: "region", type: "text", defaultValue: "Saarland" },
                { name: "country", type: "text", defaultValue: "Deutschland" },
              ],
            },
            {
              type: "group",
              name: "geo",
              label: "Geo-Koordinaten (für Karten & Schema.org)",
              fields: [
                { name: "lat", type: "number" },
                { name: "lng", type: "number" },
              ],
            },
            {
              type: "group",
              name: "phone",
              label: "Telefon",
              fields: [
                { name: "display", type: "text", required: true, label: "Anzeige (z. B. +49 (0) 6831 461229)" },
                { name: "e164", type: "text", required: true, label: "E.164 (z. B. +496831461229)" },
              ],
            },
            { name: "fax", type: "text", label: "Fax (optional)" },
            { name: "email", type: "email", required: true },
            { name: "vatId", type: "text", label: "USt-IdNr." },
            { name: "whatsapp", type: "text", label: "WhatsApp-URL (wa.me/…)" },
          ],
        },
        {
          label: "Öffnungszeiten",
          fields: [
            { name: "weekdayHours", type: "text", label: "Mo–Fr", defaultValue: "09:00 – 12:00 · 13:00 – 17:00" },
            { name: "saturdayHours", type: "text", label: "Sa", defaultValue: "09:00 – 12:00" },
            {
              name: "hoursNote",
              type: "text",
              label: "Hinweis",
              defaultValue: "Abweichungen möglich – bitte vorab kurz anrufen.",
            },
            {
              type: "group",
              name: "holidayNotice",
              label: "Feiertags-/Urlaubs-Hinweis (optional)",
              admin: {
                description:
                  "Wird auf Region, Kontakt und Footer angezeigt. Leer lassen, wenn kein Hinweis nötig.",
              },
              fields: [
                { name: "text", type: "text", label: "Hinweistext" },
                {
                  name: "until",
                  type: "date",
                  label: "Anzeigen bis (inkl.)",
                  admin: { date: { pickerAppearance: "dayOnly" } },
                },
              ],
            },
          ],
        },
        {
          label: "Bewertungen",
          fields: [
            {
              type: "group",
              name: "provenExpert",
              label: "ProvenExpert",
              fields: [
                { name: "count", type: "number", required: true, defaultValue: 648 },
                { name: "value", type: "number", required: true, defaultValue: 4.92 },
                { name: "url", type: "text", label: "Profil-URL" },
              ],
            },
            {
              type: "group",
              name: "google",
              label: "Google",
              fields: [
                { name: "count", type: "number", required: true, defaultValue: 184 },
                { name: "url", type: "text", label: "Google-Profil-URL" },
                { name: "mapsUrl", type: "text", label: "Google-Maps-URL" },
              ],
            },
            {
              type: "group",
              name: "wkdb",
              label: "werkenntdenBESTEN",
              fields: [
                { name: "count", type: "number", required: true, defaultValue: 445 },
                { name: "value", type: "number", required: true, defaultValue: 4.9 },
                { name: "url", type: "text", label: "Profil-URL" },
              ],
            },
            {
              name: "recommendation",
              type: "number",
              required: true,
              label: "Weiterempfehlungsquote in %",
              defaultValue: 95,
            },
            {
              name: "ratingScale",
              type: "number",
              required: true,
              label: "Skala (Standard 5)",
              defaultValue: 5,
            },
          ],
        },
        {
          label: "Social & Booking",
          fields: [
            { name: "facebook", type: "text", label: "Facebook-URL" },
            { name: "instagram", type: "text", label: "Instagram-URL" },
            { name: "youtube", type: "text", label: "YouTube-URL" },
            {
              type: "group",
              name: "calendly",
              label: "Calendly (Online-Terminbuchung)",
              admin: {
                description:
                  "Sobald hier eine URL eingetragen ist, ersetzt das Calendly-Widget den Fallback-Kontaktblock.",
              },
              fields: [{ name: "url", type: "text", label: "Calendly-URL" }],
            },
          ],
        },
      ],
    },
  ],
};
