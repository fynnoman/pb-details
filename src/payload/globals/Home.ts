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
          label: "Sektions-Texte",
          description:
            "Kicker, Überschriften und feste Texte der einzelnen Homepage-Sektionen.",
          fields: [
            {
              type: "group",
              name: "anspruch",
              label: "Sektion: Unser Anspruch",
              fields: [
                { name: "kicker", type: "text", defaultValue: "Unser Anspruch" },
                { name: "title", type: "text", defaultValue: "Kompromisslose Qualität bis ins Detail." },
                { name: "titleHighlight", type: "text", label: "Betontes Wort am Ende", defaultValue: "bis ins Detail." },
                { name: "para1", type: "textarea", defaultValue: "Unser Qualitäts- und Leistungsanspruch beginnt dort, wo andere ihre Arbeit bereits als beendet ansehen. Wir nehmen uns die Zeit, die eine perfekte Aufbereitung braucht, und hören erst auf, wenn das Ergebnis stimmt." },
                { name: "para2", type: "textarea", defaultValue: "Da wir ausschließlich private Kundenfahrzeuge betreuen – darunter viele Sportwagen, Oldtimer und Luxusfahrzeuge – ist Ihr Fahrzeug bei uns in besten Händen. Billig kann jeder – deshalb lautet unser Motto: „Glanz oder gar nicht!\"" },
                { name: "quoteText", type: "textarea", defaultValue: "„Für andere reicht das Erzählte,\nfür uns zählt das Erreichte.\"" },
                { name: "badgeLabel", type: "text", defaultValue: "Weiterempfehlung" },
              ],
            },
            {
              type: "group",
              name: "services",
              label: "Sektion: Leistungen",
              fields: [
                { name: "kicker", type: "text", defaultValue: "Unsere Leistungen" },
                { name: "title", type: "text", defaultValue: "Alles rund um Lackschutz, Aufbereitung und Schadenbehebung" },
                { name: "titleHighlight", type: "text", defaultValue: " — aus einer Hand." },
                { name: "intro", type: "textarea", defaultValue: "Bei PB Fahrzeugpflege Saarlouis erhalten Sie alle Leistungen rund um Lackschutz, Aufbereitung und Schadenbehebung aus einer Hand – seit 1997 in Ensdorf bei Saarlouis." },
              ],
            },
            {
              type: "group",
              name: "vehicles",
              label: "Sektion: Fahrzeuge (Spezialisierung)",
              fields: [
                { name: "kicker", type: "text", defaultValue: "Spezialisierung" },
                { name: "title", type: "text", defaultValue: "Auf welche Fahrzeuge wir" },
                { name: "titleHighlight", type: "text", defaultValue: "spezialisiert sind." },
                { name: "intro", type: "textarea", defaultValue: "Wir sind auf die Aufbereitung und den Lackschutz hochwertiger Fahrzeuge spezialisiert und betreuen ausschließlich private Kundenfahrzeuge. Jede Aufbereitung beginnt mit einer persönlichen Begutachtung – so erhalten Sie ein realistisches Angebot statt eines Pauschalversprechens." },
              ],
            },
            {
              type: "group",
              name: "whyUs",
              label: "Sektion: Warum PB Fahrzeugpflege",
              fields: [
                { name: "kicker", type: "text", defaultValue: "Warum PB Fahrzeugpflege" },
              ],
            },
            {
              type: "group",
              name: "awards",
              label: "Sektion: Auszeichnungen (Marquee)",
              fields: [
                { name: "kicker", type: "text", defaultValue: "Ausgezeichnet" },
                { name: "title", type: "text", defaultValue: "Mehrfach zertifiziert, jährlich" },
                { name: "titleHighlight", type: "text", defaultValue: "bestätigt." },
                { name: "linkLabel", type: "text", defaultValue: "Alle Auszeichnungen & Referenzen ansehen" },
              ],
            },
            {
              type: "group",
              name: "region",
              label: "Sektion: Region / Standort",
              fields: [
                { name: "kicker", type: "text", defaultValue: "Einzugsgebiet" },
                { name: "standortLabel", type: "text", defaultValue: "Standort" },
                { name: "openMapsLabel", type: "text", defaultValue: "In Karten öffnen →" },
                { name: "callLabel", type: "text", defaultValue: "Anrufen" },
              ],
            },
            {
              type: "group",
              name: "faq",
              label: "Sektion: FAQ",
              fields: [
                { name: "kicker", type: "text", defaultValue: "Häufige Fragen" },
                { name: "title", type: "text", defaultValue: "Antworten auf das, was Sie wissen" },
                { name: "titleHighlight", type: "text", defaultValue: "wollen." },
                { name: "linkLabel", type: "text", defaultValue: "Alle Fragen & Antworten ansehen" },
              ],
            },
            {
              type: "group",
              name: "contact",
              label: "Sektion: Kontakt",
              fields: [
                { name: "kicker", type: "text", defaultValue: "Termin vereinbaren" },
                { name: "title", type: "text", defaultValue: "Sprechen wir über Ihr" },
                { name: "titleHighlight", type: "text", defaultValue: "Fahrzeug." },
                { name: "intro", type: "textarea", defaultValue: "Wählen Sie direkt einen Termin aus – oder rufen Sie an. Eine unverbindliche Begutachtung ist auch ohne Termin möglich, während unserer Öffnungszeiten." },
                { name: "directLabel", type: "text", defaultValue: "Direkter Draht" },
                { name: "callAt", type: "text", defaultValue: "Anrufen · Mo–Sa" },
                { name: "response", type: "text", defaultValue: "Antwort in 24 h" },
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
