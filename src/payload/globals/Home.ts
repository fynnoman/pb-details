import type { GlobalConfig } from "payload";

export const Home: GlobalConfig = {
  slug: "home",
  label: "Startseite",
  admin: {
    description:
      "Hero-Bereich der Startseite: Kicker, Titel, Sub-Text, Trust-Bar. Die restlichen Sektionen (Services, Warum wir, Awards, Region, FAQ, Kontakt) werden automatisch aus den jeweiligen Datensätzen gerendert.",
    group: "Inhalte",
    livePreview: {
      url: ({ req }) =>
        `${req.protocol}://${req.host}/api/preview?path=${encodeURIComponent("/")}`,
    },
  },
  access: { read: () => true },
  versions: { drafts: { autosave: { interval: 800 } } },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "kicker",
              type: "text",
              label: "Kicker (kleiner Text darüber)",
              defaultValue: "PB Fahrzeugpflege Saarlouis · Seit 1997",
            },
            {
              name: "title",
              type: "text",
              required: true,
              label: "Große Überschrift",
              defaultValue: "The Art of Detailing.",
            },
            {
              name: "subtitle",
              type: "textarea",
              label: "Untertitel",
              defaultValue:
                "Premium-Fahrzeugaufbereitung, Keramikversiegelung und Werterhalt für Sportwagen, Luxusfahrzeuge und Sammlerstücke.",
            },
            {
              name: "backgroundImage",
              type: "upload",
              relationTo: "media",
              label: "Hero-Hintergrundbild",
            },
            {
              name: "primaryCta",
              type: "group",
              label: "Primärer Button",
              fields: [
                { name: "label", type: "text", defaultValue: "Termin vereinbaren" },
                { name: "href", type: "text", defaultValue: "/kontakt/#termin" },
              ],
            },
            {
              name: "secondaryCta",
              type: "group",
              label: "Sekundärer Button",
              fields: [
                { name: "label", type: "text", defaultValue: "Leistungen ansehen" },
                { name: "href", type: "text", defaultValue: "/leistungen/" },
              ],
            },
          ],
        },
        {
          label: "Warum uns (Bento)",
          fields: [
            {
              name: "whyUsHeading",
              type: "text",
              defaultValue:
                "Handwerk, das seit fast 30 Jahren Vertrauen schafft.",
              label: "Überschrift",
            },
            {
              name: "whyUsBullets",
              type: "array",
              label: "Bulletpoints",
              fields: [{ name: "text", type: "text", required: true }],
              defaultValue: [
                { text: "Einer der dienstältesten Fahrzeugaufbereiter Deutschlands" },
                { text: "Auszeichnungen durch Heiko Maas und Anke Rehlinger für besondere Servicequalität" },
                { text: "BRILA zertifizierter Fachbetrieb für Keramikversiegelungen" },
                { text: "Eigener Qualitäts-Coach" },
                { text: "Spezialisierung auf Sportwagen, Luxusfahrzeuge und Sammlerfahrzeuge" },
                { text: "Kunden aus dem Saarland, Luxemburg und ganz Deutschland" },
                { text: "Ausschließlich Privatkunden statt Massenabfertigung" },
                { text: "Bekannt aus ZDF Fernsehen, SR3 Radio sowie weiteren Medienberichten" },
              ],
            },
            { name: "mottoLabel", type: "text", defaultValue: "Motto" },
            { name: "mottoText", type: "text", defaultValue: "„Glanz oder gar nicht.“" },
          ],
        },
        {
          label: "Prozess",
          fields: [
            {
              name: "processKicker",
              type: "text",
              defaultValue: "So läuft es bei uns ab",
            },
            {
              name: "processHeading",
              type: "text",
              defaultValue: "In drei Schritten zu Ihrem Ergebnis.",
            },
            {
              name: "processSteps",
              type: "array",
              label: "Schritte",
              minRows: 3,
              maxRows: 5,
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
              ],
            },
            {
              name: "processFootnote",
              type: "text",
              defaultValue:
                "Bei weiterer Anfahrt – etwa aus Luxemburg – lohnt sich ein kurzer Anruf vorab.",
            },
          ],
        },
        {
          label: "Region",
          fields: [
            {
              name: "regionHeading",
              type: "text",
              defaultValue: "Saarland & Luxemburg.",
            },
            {
              name: "regionText",
              type: "textarea",
              defaultValue:
                "Sie finden uns in der Provinzialstraße 243 in 66806 Ensdorf – direkt bei Saarlouis. Zu uns kommen Kunden aus dem gesamten Saarland, u. a. aus Saarlouis, Saarbrücken, Merzig und St. Wendel, sowie aus Luxemburg und dem grenznahen Raum.",
            },
            {
              name: "regionTags",
              type: "array",
              label: "Regionen-Tags",
              fields: [{ name: "label", type: "text", required: true }],
              defaultValue: [
                { label: "Saarlouis" },
                { label: "Saarbrücken" },
                { label: "Merzig" },
                { label: "St. Wendel" },
                { label: "Dillingen" },
                { label: "Luxemburg" },
                { label: "Trier" },
                { label: "Grenznaher Raum" },
              ],
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            { name: "metaTitle", type: "text", label: "Meta-Titel" },
            { name: "metaDescription", type: "textarea", label: "Meta-Description" },
            {
              name: "ogImage",
              type: "upload",
              relationTo: "media",
              label: "OG-Image",
            },
          ],
        },
      ],
    },
  ],
};
