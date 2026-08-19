/**
 * Seed-Script für den initialen Datenbestand.
 *
 * Aufruf:
 *   pnpm seed
 *   ↳ ruft `payload run scripts/seed.ts` auf — Payload lädt automatisch
 *     die Config und stellt Env-Variablen bereit.
 *
 * Erforderliche ENV-Variablen:
 *   DATABASE_URL         Postgres-Connection-String
 *   PAYLOAD_SECRET       Payload-Secret
 *   SEED_ADMIN_EMAIL     Login-Mail des Admin-Users
 *   SEED_ADMIN_PASSWORD  Klartext-Passwort (Kunde ändert beim ersten Login)
 *
 * Das Skript ist idempotent — mehrfaches Ausführen aktualisiert bestehende
 * Datensätze, statt Duplikate zu erzeugen.
 */

import { getPayload } from "payload";
import config from "../payload.config";
import fs from "node:fs/promises";
import path from "node:path";
import { buildLexical } from "./lib/lexical";
import { serviceDetails } from "./seed-service-content";
import { pageContent } from "./seed-page-content";

type Payload = Awaited<ReturnType<typeof getPayload>>;

const PUBLIC_IMAGES_DIR = path.resolve(process.cwd(), "public/images");

async function main() {
  const payload = await getPayload({ config });

  await seedAdminUser(payload);
  const mediaMap = await seedMedia(payload);
  await seedGlobals(payload, mediaMap);
  await seedFaqs(payload);
  await seedVehicles(payload, mediaMap);
  await seedAwards(payload, mediaMap);
  await seedServices(payload, mediaMap);
  await seedRedirects(payload);
  await seedBlogPosts(payload, mediaMap);
  await seedPages(payload);

  console.log("\n✓ Seed done.");
  process.exit(0);
}

/* ─── Admin User ────────────────────────────────────────────────────────── */

async function seedAdminUser(payload: Payload) {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn(
      "⚠  SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD nicht gesetzt — überspringe Admin-User-Seed.",
    );
    return;
  }

  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
  });

  if (existing.docs.length) {
    console.log(`• Admin-User existiert bereits (${email})`);
    return;
  }

  await payload.create({
    collection: "users",
    data: {
      email,
      password,
      name: "PB Admin",
      roles: ["admin"],
    },
  });

  console.log(`✓ Admin-User angelegt: ${email}`);
}

/* ─── Media ─────────────────────────────────────────────────────────────── */

type MediaMap = Record<string, string>; // relativer Pfad → Payload-ID

async function seedMedia(payload: Payload): Promise<MediaMap> {
  const files = await walk(PUBLIC_IMAGES_DIR);
  const map: MediaMap = {};

  for (const file of files) {
    const filename = path.basename(file);
    if (filename.startsWith(".")) continue;
    if (filename.endsWith(".pdf")) continue;
    const relPath = "/images/" + path.relative(PUBLIC_IMAGES_DIR, file).replaceAll(path.sep, "/");

    const existing = await payload.find({
      collection: "media",
      where: { filename: { equals: filename } },
      limit: 1,
    });

    if (existing.docs.length) {
      map[relPath] = String(existing.docs[0].id);
      continue;
    }

    const buffer = await fs.readFile(file);
    const stats = await fs.stat(file);
    const mimetype = mimeFor(filename);
    const alt = altFromFilename(filename);

    const created = await payload.create({
      collection: "media",
      data: { alt },
      file: {
        data: buffer,
        mimetype,
        name: filename,
        size: stats.size,
      },
    });

    map[relPath] = String(created.id);
    console.log(`  ↑ media: ${relPath}`);
  }

  console.log(`✓ Medien importiert (${Object.keys(map).length} Dateien)`);
  return map;
}

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

function mimeFor(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  return (
    {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
      gif: "image/gif",
      svg: "image/svg+xml",
      mp4: "video/mp4",
      pdf: "application/pdf",
    }[ext || ""] || "application/octet-stream"
  );
}

function altFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  const words = base.replaceAll("-", " ").replaceAll("_", " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/* ─── Globals ───────────────────────────────────────────────────────────── */

async function seedGlobals(payload: Payload, mediaMap: MediaMap) {
  await payload.updateGlobal({
    slug: "settings",
    data: {
      name: "PB Fahrzeugpflege Saarlouis",
      legalName: "PB Fahrzeugpflege Saarlouis",
      tagline: "The Art of Detailing",
      domain: "https://www.pb-fahrzeugpflege.de",
      founded: 1997,
      owner: "Thomas Paul-Mohm",
      founders: "Thomas Paul & Karsten Becker",
      address: {
        street: "Provinzialstraße 243",
        zip: "66806",
        city: "Ensdorf",
        region: "Saarland",
        country: "Deutschland",
      },
      geo: { lat: 49.2973359, lng: 6.7782342 },
      phone: {
        display: "+49 (0) 6831 461229",
        e164: "+496831461229",
      },
      fax: "06831 645425",
      email: "info@pb-fahrzeugpflege.de",
      vatId: "DE268106468",
      whatsapp: "https://wa.me/+496831461229",
      weekdayHours: "09:00 – 12:00 · 13:00 – 17:00",
      saturdayHours: "09:00 – 12:00",
      hoursNote: "Abweichungen möglich – bitte vorab kurz anrufen.",
      holidayNotice: {
        text: "Am Samstag, 15.08. geschlossen (Mariä Himmelfahrt)",
        until: "2026-08-16",
      },
      provenExpert: {
        count: 648,
        value: 4.92,
        url: "https://www.provenexpert.com/pb-fahrzeugpflege-saarlouis/",
      },
      google: {
        count: 184,
        url: "https://share.google/ctOJCy04RFzGMWZIt",
        mapsUrl: "https://g.page/pbfahrzeugpflege?share",
      },
      wkdb: {
        count: 445,
        value: 4.9,
        url: "",
      },
      recommendation: 95,
      ratingScale: 5,
      facebook: "https://de-de.facebook.com/pbfahrzeugpflege",
      instagram: "https://www.instagram.com/pbfahrzeugpflege/",
      youtube: "https://www.youtube.com/channel/UC7Xmy1J1uXXCQCz9rvTxuNA",
      calendly: { url: "" },
    },
  });
  console.log("✓ Global: settings");

  await payload.updateGlobal({
    slug: "navigation",
    data: {
      items: [
        { label: "Home", href: "/" },
        { label: "Über uns", href: "/ueber-uns/" },
        {
          label: "Leistungen",
          href: "/leistungen/",
          children: [
            { label: "Keramikversiegelung", href: "/leistungen/keramikversiegelung/" },
            { label: "Nanoversiegelung", href: "/leistungen/nanoversiegelung/" },
            { label: "Fahrzeugaufbereitung", href: "/leistungen/fahrzeugaufbereitung/" },
            { label: "Lack- & Beulendoktor", href: "/leistungen/lack-und-beulendoktor/" },
          ],
        },
        { label: "Unfallschaden", href: "/unfallschaden/" },
        { label: "Preise", href: "/preise/" },
        { label: "FAQ", href: "/faq/" },
        { label: "Referenzen", href: "/referenzen/" },
        { label: "Kontakt", href: "/kontakt/" },
      ],
      cta: {
        label: "Jetzt anfragen",
        shortLabel: "Termin",
        href: "/kontakt/#termin",
      },
    },
  });
  console.log("✓ Global: navigation");

  await payload.updateGlobal({
    slug: "footer",
    data: {
      intro:
        "The Art of Detailing. Premium-Fahrzeugaufbereitung und Keramikversiegelung – inhabergeführt seit 1997.",
      motto: "„Glanz oder gar nicht.“",
      legalLinks: [
        { label: "Impressum", href: "/impressum/" },
        { label: "Datenschutz", href: "/datenschutzerklaerung/" },
        { label: "AGB", href: "/allgemeine-geschaeftsbedingungen/" },
      ],
      aiNote:
        "Diese Website wurde mit Unterstützung von Künstlicher Intelligenz erstellt.",
    },
  });
  console.log("✓ Global: footer");

  await payload.updateGlobal({
    slug: "home",
    data: {
      kicker: "PB Fahrzeugpflege Saarlouis · Seit 1997",
      title: "The Art of Detailing.",
      subtitle:
        "Premium-Fahrzeugaufbereitung, Keramikversiegelung und Werterhalt für Sportwagen, Luxusfahrzeuge und Sammlerstücke.",
      backgroundImage: mediaMap["/images/hero/schwarzes-auto-keramikversiegelung.jpg"],
      primaryCta: { label: "Termin vereinbaren", href: "/kontakt/#termin" },
      secondaryCta: { label: "Leistungen ansehen", href: "/leistungen/" },
      whyUsHeading: "Handwerk, das seit fast 30 Jahren Vertrauen schafft.",
      whyUsBullets: [
        { text: "Einer der dienstältesten Fahrzeugaufbereiter Deutschlands" },
        { text: "Auszeichnungen durch Heiko Maas und Anke Rehlinger für besondere Servicequalität" },
        { text: "BRILA zertifizierter Fachbetrieb für Keramikversiegelungen" },
        { text: "Eigener Qualitäts-Coach" },
        { text: "Spezialisierung auf Sportwagen, Luxusfahrzeuge und Sammlerfahrzeuge" },
        { text: "Kunden aus dem Saarland, Luxemburg und ganz Deutschland" },
        { text: "Ausschließlich Privatkunden statt Massenabfertigung" },
        { text: "Bekannt aus ZDF Fernsehen, SR3 Radio sowie weiteren Medienberichten" },
      ],
      mottoLabel: "Motto",
      mottoText: "„Glanz oder gar nicht.“",
      processKicker: "So läuft es bei uns ab",
      processHeading: "In drei Schritten zu Ihrem Ergebnis.",
      processSteps: [
        {
          title: "Begutachtung",
          description:
            "Kommen Sie während der Öffnungszeiten auch ohne Termin vorbei – wir sehen uns Ihr Fahrzeug direkt an.",
        },
        {
          title: "Individuelles Angebot",
          description:
            "Auf Basis von Lackzustand, Aufwand und Ihrem Ziel – Verkauf, Leasingrückgabe oder Werterhalt – erstellen wir ein transparentes Angebot.",
        },
        {
          title: "Aufbereitung",
          description:
            "Wir nehmen uns die nötige Zeit und arbeiten, bis das Ergebnis stimmt. Glanz oder gar nicht.",
        },
      ],
      processFootnote:
        "Bei weiterer Anfahrt – etwa aus Luxemburg – lohnt sich ein kurzer Anruf vorab.",
      regionHeading: "Saarland & Luxemburg.",
      regionText:
        "Sie finden uns in der Provinzialstraße 243 in 66806 Ensdorf – direkt bei Saarlouis. Zu uns kommen Kunden aus dem gesamten Saarland, u. a. aus Saarlouis, Saarbrücken, Merzig und St. Wendel, sowie aus Luxemburg und dem grenznahen Raum.",
      regionTags: [
        { label: "Saarlouis" },
        { label: "Saarbrücken" },
        { label: "Merzig" },
        { label: "St. Wendel" },
        { label: "Dillingen" },
        { label: "Luxemburg" },
        { label: "Trier" },
        { label: "Grenznaher Raum" },
      ],
      metaTitle: "Fahrzeugaufbereitung Saarlouis & Keramikversiegelung",
      metaDescription:
        "Premium-Fahrzeugaufbereitung & Keramikversiegelung im Saarland und Luxemburg – seit 1997. Spezialist für Neuwagen, Sportwagen & Luxusfahrzeuge. Über 648 Top-Bewertungen.",
    },
  });
  console.log("✓ Global: home");
}

/* ─── FAQs ──────────────────────────────────────────────────────────────── */

const topicBySlug: Record<string, string> = {
  keramikversiegelung: "keramikversiegelung",
  nanoversiegelung: "nanoversiegelung",
  fahrzeugaufbereitung: "fahrzeugaufbereitung",
  "lack-und-beulendoktor": "lack-beulendoktor",
  unfallschaden: "unfallschaden",
};

async function seedFaqs(payload: Payload) {
  const items: Array<{ q: string; a: string; topic: string; order: number }> = [
    // Homepage FAQs
    { topic: "home", order: 10, q: "Was unterscheidet PB Fahrzeugpflege von anderen Aufbereitern im Saarland?", a: 'PB Fahrzeugpflege Saarlouis arbeitet inhabergeführt seit 1997 ausschließlich an privaten Kundenfahrzeugen und ist auf Sportwagen, Oldtimer und Luxusfahrzeuge spezialisiert. Statt schneller Massenabfertigung nehmen wir uns die Zeit für ein perfektes Ergebnis – nach dem Motto „Wir schützen Werte“. Über 600 positive Bewertungen und eine Weiterempfehlungsrate von über 95 % bestätigen das.' },
    { topic: "home", order: 20, q: "Bieten Sie auch Aufbereitung für Sportwagen, Oldtimer und Luxusfahrzeuge an?", a: "Ja. Hochwertige Fahrzeuge sind unsere Spezialität – vom High-End-Lackschutz per Keramikversiegelung bis zur kompletten Innen- und Außenaufbereitung." },
    { topic: "home", order: 30, q: "Seit wann gibt es PB Fahrzeugpflege?", a: "PB Fahrzeugpflege Saarlouis besteht seit 1997 und gehört mit über 29 Jahren Erfahrung zu den ältesten und erfahrensten Fahrzeugaufbereitern Deutschlands." },
    { topic: "home", order: 40, q: "Aus welchen Regionen kommen Ihre Kunden?", a: "Unsere Kunden kommen aus Saarlouis und dem gesamten Saarland, aus Luxemburg sowie aus den angrenzenden Regionen. Unser Standort in Ensdorf an der B51 liegt verkehrsgünstig mit unmittelbarer Zuganbindung." },
    { topic: "home", order: 50, q: "Wo befindet sich PB Fahrzeugpflege?", a: "Sie finden uns in der Provinzialstraße 243, 66806 Ensdorf – direkt bei Saarlouis. Begutachtung und Angebot sind auch ohne Termin möglich." },
  ];

  // Service-spezifische FAQs aus dem Detail-Content ergänzen
  for (const detail of serviceDetails) {
    const topic = topicBySlug[detail.slug] || detail.slug;
    detail.faqs.forEach((f, i) => {
      items.push({ topic, order: (i + 1) * 10, q: f.question, a: f.answer });
    });
  }

  // Page-FAQs (unfallschaden, faq-general)
  const pageFaqTopic: Record<string, string> = {
    "/unfallschaden/": "unfallschaden",
    "/faq/": "faq-general",
  };
  for (const page of pageContent) {
    if (!page.faqs) continue;
    const topic = pageFaqTopic[page.path];
    if (!topic) continue;
    page.faqs.forEach((f, i) => {
      items.push({ topic, order: (i + 1) * 10, q: f.question, a: f.answer });
    });
  }

  for (const item of items) {
    const existing = await payload.find({
      collection: "faqs",
      where: { question: { equals: item.q } },
      limit: 1,
    });
    const data = {
      question: item.q,
      answer: item.a,
      topic: item.topic,
      order: item.order,
    };
    if (existing.docs.length) {
      await payload.update({
        collection: "faqs",
        id: existing.docs[0].id,
        data,
      });
    } else {
      await payload.create({ collection: "faqs", data });
    }
  }
  console.log(`✓ FAQs (${items.length})`);
}

/* ─── Vehicles ──────────────────────────────────────────────────────────── */

async function seedVehicles(payload: Payload, mediaMap: MediaMap) {
  const items = [
    {
      label: "Neuwagen",
      description:
        "Lackschutz ab dem ersten Kilometer durch eine Keramikversiegelung, bevor Flugrost, Insektenreste und Waschkratzer den empfindlichen Klarlack erreichen.",
      image: mediaMap["/images/fahrzeuge/roter-tesla-model-3-aufbereitung.jpg"],
      order: 10,
    },
    {
      label: "Sportwagen & Luxus",
      description:
        "Kompromisslose Aufbereitung und Werterhalt mit dem nötigen Fingerspitzengefühl – für Fahrzeuge, deren Wert und Erscheinungsbild zählen.",
      image: mediaMap["/images/hero/schwarzes-auto-keramikversiegelung.jpg"],
      order: 20,
    },
    {
      label: "Oldtimer",
      description:
        "Sammlerfahrzeuge in bester Hand – Werterhalt für Generationen, mit Fingerspitzengefühl und Erfahrung.",
      image: mediaMap["/images/fahrzeuge/oldtimer-mercedes-300sl-werkstatt.jpg"],
      order: 30,
    },
    {
      label: "Gebrauchtwagen",
      description:
        "Vor Leasingrückgabe oder Verkauf – gezielte Aufbereitung, die sichtbare Mängel reduziert und teure Nachberechnungen vermeidet.",
      image: mediaMap["/images/fahrzeuge/gebrauchtwagen-autohaus.jpg"],
      order: 40,
    },
  ];

  for (const item of items) {
    const existing = await payload.find({
      collection: "vehicles",
      where: { label: { equals: item.label } },
      limit: 1,
    });
    if (existing.docs.length) {
      await payload.update({
        collection: "vehicles",
        id: existing.docs[0].id,
        data: item,
      });
    } else {
      await payload.create({ collection: "vehicles", data: item });
    }
  }
  console.log(`✓ Vehicles (${items.length})`);
}

/* ─── Awards ────────────────────────────────────────────────────────────── */

async function seedAwards(payload: Payload, mediaMap: MediaMap) {
  const items = [
    // Badges
    { title: "ProvenExpert Top Dienstleister 2023", type: "badge", image: mediaMap["/images/badges/provenexpert-top-dienstleister-2023.png"], order: 10 },
    { title: "ProvenExpert Top Empfehlung 2021", type: "badge", image: mediaMap["/images/badges/provenexpert-top-empfehlung-2021.jpg"], order: 20 },
    { title: "ProvenExpert Top Empfehlung 2019", type: "badge", image: mediaMap["/images/badges/provenexpert-top-empfehlung-2019.jpg"], order: 30 },
    { title: "werkenntdenBESTEN Empfehlungssiegel", type: "badge", image: mediaMap["/images/badges/werkenntdenbesten-badge.png"], order: 40 },
    { title: "Profi-Badge", type: "badge", image: mediaMap["/images/badges/profi-badge.webp"], order: 50 },
    { title: "Q-Siegel Servicequalität", type: "badge", image: mediaMap["/images/urkunden/q-siegel-logo.png"], order: 60 },
    // Story-Karten
    {
      title: "BRILA Certified Installer",
      type: "story",
      image: mediaMap["/images/urkunden/brila-urkunde-keramikversiegelung.jpg"],
      storyLabel: "BRILA Certified Installer",
      storyText: "Zertifizierter Fachbetrieb für 9H-Keramikversiegelung.",
      order: 100,
    },
    {
      title: "20 Jahre Jubiläum",
      type: "story",
      image: mediaMap["/images/urkunden/20-jahre-buergermeister-gratulation.jpg"],
      storyLabel: "20 Jahre Jubiläum",
      storyText: "Gratulation vom Ensdorfer Bürgermeister Hartwin Faust.",
      order: 110,
    },
    {
      title: "Sponsoring FV 09 Schwalbach",
      type: "story",
      image: mediaMap["/images/fahrzeuge/sponsoring-fv-09-schwalbach.jpg"],
      storyLabel: "Regional verwurzelt",
      storyText: "Sponsoring beim FV 09 Schwalbach.",
      order: 120,
    },
  ];

  for (const item of items) {
    const existing = await payload.find({
      collection: "awards",
      where: { title: { equals: item.title } },
      limit: 1,
    });
    if (existing.docs.length) {
      await payload.update({
        collection: "awards",
        id: existing.docs[0].id,
        data: item as any,
      });
    } else {
      await payload.create({ collection: "awards", data: item as any });
    }
  }
  console.log(`✓ Awards (${items.length})`);
}

/* ─── Services ──────────────────────────────────────────────────────────── */

async function seedServices(payload: Payload, mediaMap: MediaMap) {
  const items = [
    {
      slug: "keramikversiegelung",
      title: "Keramikversiegelung",
      tagline: "Premium-Lackschutz für Neuwagen, Sport- und Luxusfahrzeuge.",
      intro:
        "High-End 9H-Lackschutz für Neuwagen, Sport- und Luxusfahrzeuge. Glasartige Schutzschicht auf Basis von Siliziumoxid, in über 20 Stunden Handarbeit aufgetragen.",
      heroImage: mediaMap["/images/hero/schwarzes-auto-keramikversiegelung.jpg"],
      features: [
        { text: "Bis zu mehrere Jahre Schutz" },
        { text: "BRILA zertifiziert" },
        { text: "Ideal für Neuwagen ab Kilometer 0" },
      ],
      order: 10,
      metaTitle: "Keramikversiegelung Saarlouis – 9H-Lackschutz | PB Fahrzeugpflege",
      metaDescription:
        "9H-Keramikversiegelung im Saarland: BRILA-zertifizierter Fachbetrieb, über 20 Stunden Handarbeit, mehrjähriger Lackschutz für Sport- und Luxusfahrzeuge.",
    },
    {
      slug: "nanoversiegelung",
      title: "Nanoversiegelung",
      tagline: "Preisbewusster Lackschutz mit Easy-to-Clean-Effekt.",
      intro:
        "Die preisbewusste Alternative zur Keramikversiegelung – 1K-Nanoversiegelung, die sich fest mit dem Lack verbindet und bis zu viermal länger hält als Wachs.",
      heroImage: mediaMap["/images/hero/nanoversiegelung-abperleffekt.jpg"],
      features: [
        { text: "Schutz bis zu 18 Monate" },
        { text: "Easy-to-Clean-Effekt" },
        { text: "Günstiger Einstieg" },
      ],
      order: 20,
      metaTitle: "Nanoversiegelung Saarlouis | PB Fahrzeugpflege",
      metaDescription:
        "1K-Nanoversiegelung mit Abperleffekt – bis zu 18 Monate Lackschutz. Preisbewusste Alternative zur Keramikversiegelung im Saarland.",
    },
    {
      slug: "fahrzeugaufbereitung",
      title: "Fahrzeugaufbereitung",
      tagline: "Mehrstufige Innen- und Außenaufbereitung.",
      intro:
        "Mehrstufige Innen- und Außenaufbereitung – von Vorwäsche über Lackkorrektur bis zur Versiegelung. Auch gezielt für Leasingrückgabe und Fahrzeugverkauf.",
      heroImage: mediaMap["/images/fahrzeuge/roter-tesla-model-3-aufbereitung.jpg"],
      features: [
        { text: "Innen & Außen" },
        { text: "In der Regel 2–3 Werktage" },
        { text: "Werterhalt & Wertsteigerung" },
      ],
      order: 30,
      metaTitle: "Fahrzeugaufbereitung Saarlouis | PB Fahrzeugpflege",
      metaDescription:
        "Professionelle Innen- und Außenaufbereitung im Saarland – Lackkorrektur, Politur, Versiegelung. Ideal für Leasingrückgabe und Fahrzeugverkauf.",
    },
    {
      slug: "lack-und-beulendoktor",
      title: "Lack- & Beulendoktor",
      tagline: "Smart Repair und Paintless Dent Repair.",
      intro:
        "Smart Repair und lackschadenfreie Ausbeultechnik: Dellen und Lackschäden bis zu 70 % günstiger als eine klassische Lackierung reparieren – der Originallack bleibt erhalten.",
      heroImage: mediaMap["/images/hero/beulendoktor-smart-repair.jpg"],
      features: [
        { text: "Bis zu 70 % günstiger" },
        { text: "Paintless Dent Repair" },
        { text: "Werterhaltend" },
      ],
      order: 40,
      metaTitle: "Lack- & Beulendoktor Saarlouis | Smart Repair | PB Fahrzeugpflege",
      metaDescription:
        "Smart Repair und Paintless Dent Repair im Saarland: Kleine Dellen und Lackschäden bis zu 70 % günstiger reparieren, Originallack bleibt erhalten.",
    },
    {
      slug: "unfallschaden",
      title: "Unfallschaden",
      tagline: "Komplette Schadenabwicklung aus einer Hand.",
      intro:
        "Komplette Schadenabwicklung aus einer Hand – Gutachter, Anwalt, Leihwagen und Karosserieinstandsetzung nach Herstellervorgaben. Freie Werkstattwahl, ohne Termin.",
      heroImage: mediaMap["/images/hero/unfallschaden-werkstatt.jpg"],
      features: [
        { text: "Kostenlos bei Haftpflichtschäden*" },
        { text: "Ein Ansprechpartner" },
        { text: "Werterhalt bei Premium-Fahrzeugen" },
      ],
      order: 50,
      metaTitle: "Unfallschaden-Abwicklung Saarlouis | PB Fahrzeugpflege",
      metaDescription:
        "Komplette Unfallschadenabwicklung im Saarland: Gutachter, Anwalt, Leihwagen und Karosserieinstandsetzung – kostenlos bei Haftpflichtschäden.",
    },
  ];

  for (const item of items) {
    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: item.slug } },
      limit: 1,
    });

    // Content + related FAQs aus dem Detail-Content-File beziehen
    const detail = serviceDetails.find((d) => d.slug === item.slug);
    const content = detail ? buildLexical(detail.contentBlocks) : lexicalPlaceholder(item.intro);

    let relatedFaqIds: Array<string | number> = [];
    if (detail) {
      const questions = detail.faqs.map((f) => f.question);
      const faqRes = await payload.find({
        collection: "faqs",
        where: { question: { in: questions } },
        limit: 100,
      });
      relatedFaqIds = faqRes.docs.map((d) => d.id);
    }

    const data = {
      ...item,
      content,
      relatedFaqs: relatedFaqIds,
      _status: "published",
    } as any;

    if (existing.docs.length) {
      await payload.update({
        collection: "services",
        id: existing.docs[0].id,
        data,
      });
    } else {
      await payload.create({ collection: "services", data });
    }
  }
  console.log(`✓ Services (${items.length})`);
}

/* Minimaler Lexical-Rich-Text-Node — der Kunde ergänzt ausführliche Inhalte im Admin. */
function lexicalPlaceholder(text: string) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: "paragraph",
          format: "" as const,
          indent: 0,
          version: 1,
          children: [{ type: "text", text, format: 0, version: 1 }],
          direction: "ltr" as const,
        },
      ],
      direction: "ltr" as const,
    },
  };
}

/* ─── Redirects ─────────────────────────────────────────────────────────── */

async function seedRedirects(payload: Payload) {
  const items = [
    { from: "/9555-2/", to: "/teilnahmebedingungen-gewinnspiel/", statusCode: "301" },
    { from: "/datenschutz/", to: "/datenschutzerklaerung/", statusCode: "301" },
    { from: "/gutschein/none/", to: "/gutschein/", statusCode: "301" },
    { from: "/nano-lackversiegelung/", to: "/leistungen/nanoversiegelung/", statusCode: "301" },
    { from: "/smartrepair/", to: "/leistungen/lack-und-beulendoktor/#smart-repair", statusCode: "301" },
    { from: "/autoaufbereitung-preise/", to: "/preise/", statusCode: "301" },
  ];

  for (const item of items) {
    const existing = await payload.find({
      collection: "redirects",
      where: { from: { equals: item.from } },
      limit: 1,
    });
    if (existing.docs.length) {
      await payload.update({
        collection: "redirects",
        id: existing.docs[0].id,
        data: item as any,
      });
    } else {
      await payload.create({ collection: "redirects", data: item as any });
    }
  }
  console.log(`✓ Redirects (${items.length})`);
}

/* ─── Blog Posts ────────────────────────────────────────────────────────── */

async function seedBlogPosts(payload: Payload, mediaMap: MediaMap) {
  const posts = [
    {
      slug: "warum-neuwagen-im-rohzustand-sind-und-sofort-geschuetzt-werden-sollten",
      title: "Warum Neuwagen im Rohzustand sind – und sofort geschützt werden sollten",
      intro:
        "Ab Werk sind moderne Klarlacke deutlich empfindlicher als früher. Ohne zusätzliche Versiegelung entstehen schon in den ersten Wochen sichtbare Wasch- und Sonnenschäden.",
      publishedAt: "2025-06-01T09:00:00.000Z",
    },
    {
      slug: "leasingrueckgabe-so-vermeiden-sie-teure-nachberechnungen",
      title: "Leasingrückgabe: So vermeiden Sie teure Nachberechnungen",
      intro:
        "Bei der Rückgabe eines Leasingfahrzeugs werden Lackkratzer, Steinschläge und Innenraumverschmutzungen streng bewertet. Eine gezielte Aufbereitung spart schnell mehrere hundert Euro.",
      publishedAt: "2025-07-01T09:00:00.000Z",
    },
    {
      slug: "keramikversiegelung-vs-nanoversiegelung-was-passt-zu-mir",
      title: "Keramikversiegelung vs. Nanoversiegelung – was passt zu mir?",
      intro:
        "Beide Techniken schützen den Lack – aber mit unterschiedlichem Wirkprofil, unterschiedlicher Haltbarkeit und deutlich unterschiedlichem Preis. Ein Vergleich für Ihre Entscheidung.",
      publishedAt: "2025-08-01T09:00:00.000Z",
    },
    {
      slug: "smart-repair-wann-lohnt-sich-die-lackreparatur-ohne-lackierung",
      title: "Smart Repair: Wann lohnt sich die Lackreparatur ohne Lackierung?",
      intro:
        "Kleine Dellen, Parkrempler oder Steinschläge müssen nicht immer neu lackiert werden. Smart Repair und Paintless Dent Repair reparieren solche Schäden bis zu 70 % günstiger – und erhalten den Originallack.",
      publishedAt: "2025-09-01T09:00:00.000Z",
    },
  ];

  for (const p of posts) {
    const existing = await payload.find({
      collection: "blog-posts",
      where: { slug: { equals: p.slug } },
      limit: 1,
    });
    const data = {
      title: p.title,
      slug: p.slug,
      intro: p.intro,
      publishedAt: p.publishedAt,
      content: lexicalPlaceholder(p.intro),
      _status: "published",
    } as any;
    if (existing.docs.length) {
      await payload.update({
        collection: "blog-posts",
        id: existing.docs[0].id,
        data,
      });
    } else {
      await payload.create({ collection: "blog-posts", data });
    }
  }
  console.log(`✓ Blog Posts (${posts.length})`);
}

/* ─── Pages (Content + Legal) ───────────────────────────────────────────── */

async function seedPages(payload: Payload) {
  const pages: Array<{
    path: string;
    title: string;
    metaTitle?: string;
    metaDescription?: string;
    sections?: any[];
  }> = [
    {
      path: "/ueber-uns/",
      title: "Über uns",
      metaTitle: "Über uns – PB Fahrzeugpflege Saarlouis",
      metaDescription:
        "Inhabergeführt seit 1997. Karsten Becker & Thomas Paul über Anspruch, Team und Geschichte von PB Fahrzeugpflege Saarlouis.",
      sections: [
        {
          blockType: "hero",
          kicker: "Über uns",
          title: "Handwerk, das Werte schützt.",
          subtitle:
            "Seit 1997 inhabergeführt in Ensdorf bei Saarlouis. Karsten Becker und Thomas Paul leiten den Betrieb persönlich – mit dem Anspruch, ausschließlich private Kundenfahrzeuge kompromisslos aufzubereiten.",
        },
        {
          blockType: "text",
          heading: "Kompromisslose Qualität bis ins Detail",
          body: lexicalPlaceholder(
            "Unser Qualitäts- und Leistungsanspruch beginnt dort, wo andere ihre Arbeit bereits als beendet ansehen. Wir nehmen uns die Zeit, die eine perfekte Aufbereitung braucht, und hören erst auf, wenn das Ergebnis stimmt. Da wir ausschließlich private Kundenfahrzeuge betreuen – darunter viele Sportwagen, Oldtimer und Luxusfahrzeuge – ist Ihr Fahrzeug bei uns in besten Händen.",
          ),
        },
        {
          blockType: "cta",
          heading: "Lernen Sie uns kennen.",
          text: "Kommen Sie unverbindlich vorbei oder vereinbaren Sie einen Termin.",
          primaryLabel: "Kontakt aufnehmen",
          primaryHref: "/kontakt/",
        },
      ],
    },
    {
      path: "/preise/",
      title: "Preise",
      metaTitle: "Preise – Fahrzeugaufbereitung & Keramikversiegelung Saarlouis",
      metaDescription:
        "Transparente Pakete für Fahrzeugaufbereitung und Keramikversiegelung im Saarland. Individuell nach Fahrzeuggröße und Aufwand kalkuliert.",
      sections: [
        {
          blockType: "hero",
          kicker: "Preise",
          title: "Klare Pakete, ehrlich kalkuliert.",
          subtitle:
            "Unsere Preise variieren je nach Fahrzeuggröße, Lackzustand und Aufwand. Die folgenden Pakete geben Ihnen einen Orientierungsrahmen – ein verbindliches Angebot erstellen wir nach der persönlichen Begutachtung.",
        },
        {
          blockType: "text",
          heading: "Individuelle Kalkulation",
          body: lexicalPlaceholder(
            "Kommen Sie zu unseren Öffnungszeiten unverbindlich vorbei. Wir sehen uns Ihr Fahrzeug direkt an und erstellen ein transparentes Angebot – ohne Pauschalversprechen.",
          ),
        },
        {
          blockType: "cta",
          heading: "Angebot per WhatsApp oder Telefon",
          text: "Für eine schnelle erste Einschätzung schicken Sie uns gerne 2–3 Fotos Ihres Fahrzeugs per WhatsApp.",
          primaryLabel: "WhatsApp öffnen",
          primaryHref: "https://wa.me/+496831461229",
        },
      ],
    },
    {
      path: "/unfallschaden/",
      title: "Unfallschaden",
      metaTitle: "Unfallschaden-Abwicklung Saarlouis | PB Fahrzeugpflege",
      metaDescription:
        "Komplette Unfallschadenabwicklung: Gutachter, Anwalt, Leihwagen und Karosserieinstandsetzung – kostenlos bei Haftpflichtschäden.",
      sections: [
        {
          blockType: "hero",
          kicker: "Unfallschaden",
          title: "Alles aus einer Hand.",
          subtitle:
            "Vom Gutachter über den Anwalt bis zur Karosserieinstandsetzung – wir kümmern uns um die komplette Abwicklung. Kostenlos bei Haftpflichtschäden.",
        },
      ],
    },
    {
      path: "/kontakt/",
      title: "Kontakt",
      metaTitle: "Kontakt – PB Fahrzeugpflege Saarlouis",
      metaDescription:
        "Terminvereinbarung, Adresse, Anfahrt: PB Fahrzeugpflege Saarlouis in Ensdorf. Telefon, WhatsApp, E-Mail und Online-Termin.",
      sections: [
        {
          blockType: "hero",
          kicker: "Kontakt",
          title: "Sprechen wir über Ihr Fahrzeug.",
          subtitle:
            "Wählen Sie direkt einen Termin aus – oder rufen Sie an. Eine unverbindliche Begutachtung ist auch ohne Termin möglich, während unserer Öffnungszeiten.",
        },
        {
          blockType: "kontakt-block",
          kicker: "Termin vereinbaren",
          heading: "Termin direkt online reservieren",
          text: "Die Online-Terminbuchung wird in Kürze hier verfügbar sein. Bis dahin erreichen Sie uns direkt telefonisch, per WhatsApp oder besuchen uns ohne Termin.",
          showCalendly: true,
        },
      ],
    },
    {
      path: "/faq/",
      title: "FAQ",
      metaTitle: "FAQ – Häufige Fragen | PB Fahrzeugpflege Saarlouis",
      metaDescription:
        "Antworten auf häufige Fragen rund um Keramikversiegelung, Nanoversiegelung, Fahrzeugaufbereitung und Unfallschaden im Saarland.",
      sections: [
        {
          blockType: "hero",
          kicker: "FAQ",
          title: "Antworten auf das, was Sie wissen wollen.",
        },
        {
          blockType: "faq-block",
          kicker: "Häufige Fragen",
          heading: "Alle Fragen & Antworten",
        },
      ],
    },
    {
      path: "/referenzen/",
      title: "Referenzen",
      metaTitle: "Referenzen & Auszeichnungen | PB Fahrzeugpflege Saarlouis",
      metaDescription:
        "Über 648 verifizierte Bewertungen, mehrfach ausgezeichnet: ProvenExpert Top Dienstleister, werkenntdenBESTEN, Q-Siegel, BRILA Certified Installer.",
      sections: [
        {
          blockType: "hero",
          kicker: "Referenzen",
          title: "Mehrfach zertifiziert, jährlich bestätigt.",
        },
        {
          blockType: "awards-marquee",
          heading: "Auszeichnungen",
          showStoryCards: true,
        },
      ],
    },
    {
      path: "/danke/",
      title: "Danke",
      metaTitle: "Danke – Ihre Nachricht ist eingegangen",
      metaDescription:
        "Vielen Dank für Ihre Anfrage bei PB Fahrzeugpflege Saarlouis. Wir melden uns in Kürze bei Ihnen.",
      sections: [
        {
          blockType: "hero",
          kicker: "Vielen Dank",
          title: "Ihre Nachricht ist eingegangen.",
          subtitle:
            "Wir melden uns in Kürze telefonisch oder per E-Mail bei Ihnen. Bei dringenden Anliegen erreichen Sie uns telefonisch oder per WhatsApp.",
        },
      ],
    },
    {
      path: "/gutschein/",
      title: "Gutschein",
      metaTitle: "Gutschein für Fahrzeugaufbereitung Saarlouis",
      metaDescription:
        "Verschenken Sie einen Gutschein für Fahrzeugaufbereitung, Keramikversiegelung oder Aufbereitung bei PB Fahrzeugpflege Saarlouis.",
      sections: [
        {
          blockType: "hero",
          kicker: "Gutschein",
          title: "Ein Geschenk mit Wert.",
          subtitle:
            "Verschenken Sie einen Gutschein für Fahrzeugaufbereitung oder Lackschutz – im Wunschbetrag oder für ein konkretes Paket.",
        },
        {
          blockType: "cta",
          heading: "Gutschein anfragen",
          text: "Kontaktieren Sie uns telefonisch oder per E-Mail, wir stellen Ihnen den Gutschein individuell aus.",
          primaryLabel: "Anrufen",
          primaryHref: "tel:+496831461229",
        },
      ],
    },
    {
      path: "/teilnahmebedingungen-gewinnspiel/",
      title: "Teilnahmebedingungen Gewinnspiel",
      metaTitle: "Teilnahmebedingungen Gewinnspiel | PB Fahrzeugpflege",
      sections: [
        {
          blockType: "text",
          heading: "Teilnahmebedingungen",
          body: lexicalPlaceholder(
            "Teilnahmeberechtigt sind alle Personen ab 18 Jahren mit Wohnsitz in Deutschland. Der Rechtsweg ist ausgeschlossen. Der Gewinn ist nicht übertragbar und kann nicht in bar ausgezahlt werden. Die Teilnahme ist unabhängig von einem Kauf.",
          ),
        },
      ],
    },
    // Legal-Pages werden als Platzhalter angelegt; der ausführliche Text
    // bleibt weiterhin im separaten TSX-Rendering, bis der Kunde ihn im
    // Admin überarbeitet.
    {
      path: "/impressum/",
      title: "Impressum",
      sections: [
        {
          blockType: "hero",
          kicker: "Rechtliches",
          title: "Impressum",
        },
      ],
    },
    {
      path: "/datenschutzerklaerung/",
      title: "Datenschutz",
      sections: [
        {
          blockType: "hero",
          kicker: "Rechtliches",
          title: "Datenschutzerklärung",
        },
      ],
    },
    {
      path: "/allgemeine-geschaeftsbedingungen/",
      title: "AGB",
      sections: [
        {
          blockType: "hero",
          kicker: "Rechtliches",
          title: "Allgemeine Geschäftsbedingungen",
        },
      ],
    },
  ];

  for (const p of pages) {
    const existing = await payload.find({
      collection: "pages",
      where: { path: { equals: p.path } },
      limit: 1,
    });

    // Content aus pageContent (falls vorhanden) als Text-Block anhängen
    const extra = pageContent.find((pc) => pc.path === p.path);
    const sections = [...(p.sections || [])];
    if (extra) {
      sections.push({
        blockType: "text",
        body: buildLexical(extra.contentBlocks),
      });

      // FAQ-Block mit relatedFaqs hinzufügen wenn FAQs vorhanden
      if (extra.faqs && extra.faqs.length > 0) {
        const questions = extra.faqs.map((f) => f.question);
        const faqRes = await payload.find({
          collection: "faqs",
          where: { question: { in: questions } },
          limit: 100,
        });
        if (faqRes.docs.length > 0) {
          sections.push({
            blockType: "faq-block",
            kicker: "Häufige Fragen",
            heading: "Antworten auf häufige Fragen",
            faqs: faqRes.docs.map((d) => d.id),
          });
        }
      }
    }

    const data = {
      title: p.title,
      path: p.path,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      sections,
      _status: "published",
    } as any;
    if (existing.docs.length) {
      await payload.update({
        collection: "pages",
        id: existing.docs[0].id,
        data,
      });
    } else {
      await payload.create({ collection: "pages", data });
    }
  }
  console.log(`✓ Pages (${pages.length})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
