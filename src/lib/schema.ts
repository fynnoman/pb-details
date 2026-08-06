import { SITE } from "./site";

const base = SITE.domain;

export function urlOf(path: string): string {
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["AutoRepair", "Organization"],
  "@id": `${base}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: `${base}/`,
  email: SITE.email,
  telephone: SITE.phone.e164,
  faxNumber: SITE.fax,
  vatID: SITE.vatId,
  foundingDate: `${SITE.founded}`,
  founder: [
    { "@type": "Person", name: "Thomas Paul" },
    { "@type": "Person", name: "Karsten Becker" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    postalCode: SITE.address.zip,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng,
  },
  hasMap: SITE.social.googleMaps,
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
    SITE.social.facebook,
    SITE.social.instagram,
    SITE.social.youtube,
    SITE.social.provenExpert,
    SITE.social.googleMaps,
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${base}/#website`,
  url: `${base}/`,
  name: SITE.name,
  inLanguage: "de-DE",
  publisher: { "@id": `${base}/#organization` },
};

export const productAggregateRating = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: SITE.name,
  description:
    "Keramikversiegelung, Autoaufbereitung, Smart Repair & Beulendoktor im Saarland",
  brand: { "@type": "Brand", name: SITE.name },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingCount: SITE.ratings.count,
    reviewCount: SITE.ratings.count,
    ratingValue: SITE.ratings.value,
    bestRating: SITE.ratings.scale,
    worstRating: 1,
  },
};

export function webPageSchema(opts: {
  path: string;
  name: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumb?: object;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${urlOf(opts.path)}#webpage`,
    url: urlOf(opts.path),
    name: opts.name,
    inLanguage: "de-DE",
    isPartOf: { "@id": `${base}/#website` },
    about: { "@id": `${base}/#organization` },
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.breadcrumb ? { breadcrumb: opts.breadcrumb } : {}),
  };
}

export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: urlOf(item.path),
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? "Fahrzeugpflege",
    provider: { "@id": `${base}/#organization` },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Saarland" },
      { "@type": "Country", name: "Luxemburg" },
    ],
    url: urlOf(opts.path),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      url: urlOf(opts.path),
    },
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": urlOf(opts.path),
    },
    author: { "@id": `${base}/#organization` },
    publisher: { "@id": `${base}/#organization` },
    inLanguage: "de-DE",
  };
}
