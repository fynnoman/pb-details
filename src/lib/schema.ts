import type { SiteSettings } from "./site-types";

/**
 * JSON-LD-Schemas. Statische Schemas werden zur Laufzeit aus dem Payload-Global
 * `settings` gebaut, damit NAP-Änderungen im Admin sofort greifen.
 */

export function urlOf(domain: string, path: string): string {
  return `${domain}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildOrganizationSchema(settings: SiteSettings) {
  const base = settings.domain;
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "Organization"],
    "@id": `${base}/#organization`,
    name: settings.name,
    legalName: settings.legalName,
    url: `${base}/`,
    email: settings.email,
    telephone: settings.phone.e164,
    faxNumber: settings.fax,
    vatID: settings.vatId,
    foundingDate: settings.founded ? `${settings.founded}` : undefined,
    founder: settings.founders
      ? settings.founders.split("&").map((n) => ({ "@type": "Person", name: n.trim() }))
      : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address.street,
      postalCode: settings.address.zip,
      addressLocality: settings.address.city,
      addressRegion: settings.address.region,
      addressCountry: "DE",
    },
    geo: settings.geo
      ? { "@type": "GeoCoordinates", latitude: settings.geo.lat, longitude: settings.geo.lng }
      : undefined,
    hasMap: settings.google?.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "13:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "12:00",
      },
    ],
    priceRange: "€€€€",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Saarland" },
      { "@type": "Country", name: "Luxemburg" },
    ],
    sameAs: [
      settings.facebook,
      settings.instagram,
      settings.youtube,
      settings.provenExpert?.url,
      settings.google?.mapsUrl,
    ].filter(Boolean),
  };
}

export function buildWebsiteSchema(settings: SiteSettings) {
  const base = settings.domain;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: `${base}/`,
    name: settings.name,
    inLanguage: "de-DE",
    publisher: { "@id": `${base}/#organization` },
  };
}

export function buildProductAggregateRating(settings: SiteSettings) {
  const total =
    (settings.provenExpert?.count || 0) +
    (settings.wkdb?.count || 0) +
    (settings.google?.count || 0);
  const ratingValue = settings.provenExpert?.value || 4.9;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: settings.name,
    description:
      "Keramikversiegelung, Autoaufbereitung, Smart Repair & Beulendoktor im Saarland",
    brand: { "@type": "Brand", name: settings.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingCount: total > 0 ? total : settings.provenExpert?.count,
      reviewCount: total > 0 ? total : settings.provenExpert?.count,
      ratingValue,
      bestRating: settings.ratingScale,
      worstRating: 1,
    },
  };
}

export function webPageSchema(opts: {
  path: string;
  name: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumb?: object;
  domain?: string;
}) {
  const domain = opts.domain || "https://www.pb-fahrzeugpflege.de";
  const url = urlOf(domain, opts.path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    inLanguage: "de-DE",
    isPartOf: { "@id": `${domain}/#website` },
    about: { "@id": `${domain}/#organization` },
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.breadcrumb ? { breadcrumb: opts.breadcrumb } : {}),
  };
}

export function breadcrumbList(items: { name: string; path: string }[], domain?: string) {
  const d = domain || "https://www.pb-fahrzeugpflege.de";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: urlOf(d, item.path),
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  domain?: string;
}) {
  const domain = opts.domain || "https://www.pb-fahrzeugpflege.de";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? "Fahrzeugpflege",
    provider: { "@id": `${domain}/#organization` },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Saarland" },
      { "@type": "Country", name: "Luxemburg" },
    ],
    url: urlOf(domain, opts.path),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      url: urlOf(domain, opts.path),
    },
  };
}

type FaqInput = { q: string; a: string } | { question: string; answer: string };
export function faqPageSchema(faqs: FaqInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => {
      const q = "question" in f ? f.question : f.q;
      const a = "question" in f ? f.answer : f.a;
      return {
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      };
    }),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  domain?: string;
}) {
  const domain = opts.domain || "https://www.pb-fahrzeugpflege.de";
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    mainEntityOfPage: urlOf(domain, opts.path),
    author: { "@type": "Organization", name: "PB Fahrzeugpflege Saarlouis" },
    publisher: {
      "@type": "Organization",
      name: "PB Fahrzeugpflege Saarlouis",
      logo: {
        "@type": "ImageObject",
        url: `${domain}/images/logo/pb-fahrzeugpflege-logo-black.png`,
      },
    },
  };
}
