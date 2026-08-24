/**
 * Type-only shapes für Payload-Daten. Reine Types, kein Runtime-Code,
 * damit Client-Components frei davon importieren dürfen (kein Payload-Ballast).
 */

import type { MediaDoc } from "./media";

export type SiteSettings = {
  name: string;
  legalName?: string;
  tagline?: string;
  domain: string;
  founded?: number;
  owner?: string;
  founders?: string;
  address: { street: string; zip: string; city: string; region?: string; country?: string };
  geo?: { lat?: number; lng?: number };
  phone: { display: string; e164: string };
  fax?: string;
  email: string;
  vatId?: string;
  whatsapp?: string;
  weekdayHours?: string;
  saturdayHours?: string;
  hoursNote?: string;
  holidayNotice?: { text?: string; until?: string };
  provenExpert?: { count: number; value: number; url?: string };
  google?: { count: number; url?: string; mapsUrl?: string };
  wkdb?: { count: number; value: number; url?: string };
  recommendation: number;
  ratingScale: number;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  calendly?: { url?: string };
};

export type NavigationData = {
  items: Array<{
    label: string;
    href: string;
    children?: Array<{ label: string; href: string }>;
  }>;
  cta: { label: string; shortLabel?: string; href: string };
};

export type FooterData = {
  intro?: string;
  motto?: string;
  legalLinks: Array<{ label: string; href: string }>;
  aiNote?: string;
};

export type HomeData = {
  kicker?: string;
  title: string;
  subtitle?: string;
  backgroundImage?: MediaDoc | string;
  primaryCta?: { label?: string; href?: string };
  secondaryCta?: { label?: string; href?: string };
  whyUsHeading?: string;
  whyUsBullets?: Array<{ text: string }>;
  mottoLabel?: string;
  mottoText?: string;
  processKicker?: string;
  processHeading?: string;
  processSteps?: Array<{ title: string; description: string }>;
  processFootnote?: string;
  regionHeading?: string;
  regionText?: string;
  regionTags?: Array<{ label: string }>;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: MediaDoc | string;

  // Section-Texte (editierbar über den /edit-Modus)
  anspruch?: {
    kicker?: string;
    title?: string;
    titleHighlight?: string;
    para1?: string;
    para2?: string;
    quoteText?: string;
    badgeLabel?: string;
  };
  services?: { kicker?: string; title?: string; titleHighlight?: string; intro?: string };
  vehicles?: { kicker?: string; title?: string; titleHighlight?: string; intro?: string };
  whyUs?: { kicker?: string };
  awards?: { kicker?: string; title?: string; titleHighlight?: string; linkLabel?: string };
  region?: {
    kicker?: string;
    standortLabel?: string;
    openMapsLabel?: string;
    callLabel?: string;
  };
  faq?: { kicker?: string; title?: string; titleHighlight?: string; linkLabel?: string };
  contact?: {
    kicker?: string;
    title?: string;
    titleHighlight?: string;
    intro?: string;
    directLabel?: string;
    callAt?: string;
    response?: string;
  };
};
