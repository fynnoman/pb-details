import type { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Betriebsdaten",
  admin: {
    description:
      "Zentrale Daten des Betriebs: NAP, Öffnungszeiten, Bewertungen. Ändert sich hier ein Wert, wirkt er sich auf der gesamten Website aus.",
  },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Kontaktdaten",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "legalName", type: "text", label: "Rechtlicher Name" },
            { name: "owner", type: "text", label: "Inhaber" },
            {
              name: "street",
              type: "text",
              label: "Straße & Hausnummer",
              required: true,
            },
            { name: "zip", type: "text", required: true },
            { name: "city", type: "text", required: true },
            { name: "phone", type: "text", required: true, label: "Telefon" },
            { name: "fax", type: "text", label: "Fax (optional)" },
            { name: "email", type: "email", required: true },
            { name: "vatId", type: "text", label: "USt-IdNr." },
            { name: "whatsapp", type: "text", label: "WhatsApp-URL" },
          ],
        },
        {
          label: "Öffnungszeiten",
          fields: [
            {
              name: "weekday",
              type: "text",
              label: "Mo–Fr",
              defaultValue: "09:00 – 12:00 · 13:00 – 17:00",
            },
            {
              name: "saturday",
              type: "text",
              label: "Sa",
              defaultValue: "09:00 – 12:00",
            },
            {
              name: "note",
              type: "text",
              label: "Hinweis",
              defaultValue: "Abweichungen möglich – bitte vorab kurz anrufen.",
            },
          ],
        },
        {
          label: "Bewertungen",
          fields: [
            {
              name: "ratingCount",
              type: "number",
              required: true,
              label: "Anzahl Bewertungen",
              defaultValue: 648,
            },
            {
              name: "ratingValue",
              type: "number",
              required: true,
              label: "Durchschnitts-Bewertung (z.B. 4.92)",
              defaultValue: 4.92,
            },
            {
              name: "ratingScale",
              type: "number",
              required: true,
              label: "Skala (5 = 5-Sterne)",
              defaultValue: 5,
            },
            {
              name: "recommendation",
              type: "number",
              required: true,
              label: "Weiterempfehlungsquote in %",
              defaultValue: 95,
            },
            {
              name: "ratingSource",
              type: "text",
              defaultValue: "ProvenExpert",
            },
          ],
        },
        {
          label: "Social Media",
          fields: [
            { name: "facebook", type: "text", label: "Facebook-URL" },
            { name: "instagram", type: "text", label: "Instagram-URL" },
            { name: "youtube", type: "text", label: "YouTube-URL" },
            { name: "googleMaps", type: "text", label: "Google Maps-URL" },
            { name: "provenExpert", type: "text", label: "ProvenExpert-URL" },
          ],
        },
      ],
    },
  ],
};
