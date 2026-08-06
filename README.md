# PB Fahrzeugpflege Saarlouis — Website

Next.js-Relaunch der Website von **PB Fahrzeugpflege Saarlouis®**
(https://www.pb-fahrzeugpflege.de). Migration weg von WordPress
(Colibri Page Builder + Rank Math) auf ein statisches Next-16-Setup
mit App Router, mit Fokus auf SEO-Übernahme (Rankings dürfen nicht
verloren gehen).

## Stack

- **Next.js 16.2** (App Router, React Server Components, Turbopack)
- **React 19.2**
- **TypeScript 5**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **Framer Motion 12** für Animationen
- Hosting: **Vercel** (statisch prerendered, `output: static`-fähig)

## Struktur

```
src/
├── app/                              # App-Router-Routen (17 Seiten + 4 Blogs)
│   ├── layout.tsx                    # Root-Layout mit Nav, Footer, JSON-LD
│   ├── page.tsx                      # Startseite
│   ├── robots.ts / sitemap.ts        # SEO-Files
│   ├── leistungen/                   # /leistungen/ + 4 Unterseiten
│   ├── unfallschaden/
│   ├── ueber-uns/, preise/, faq/, referenzen/, kontakt/, danke/
│   ├── impressum/, datenschutzerklaerung/, allgemeine-geschaeftsbedingungen/
│   ├── teilnahmebedingungen-gewinnspiel/    # Ersatz für Alt-/9555-2/
│   └── blog/                         # Übersicht + [slug]/-Detailseiten
├── components/
│   ├── Nav.tsx, Footer.tsx           # Global
│   ├── Hero.tsx, Anspruch.tsx …       # Startseiten-Sektionen
│   ├── PageHero.tsx                  # Kompakter Hero für Unterseiten
│   ├── CtaSection.tsx                # Wiederverwendbarer CTA-Block
│   ├── FAQ.tsx                       # Wiederverwendbar mit faqs-Prop
│   └── JsonLd.tsx                    # XSS-sichere JSON-LD-Ausgabe
├── lib/
│   ├── site.ts                       # Zentrale Datenquelle: NAP, Bewertungen, Nav
│   ├── schema.ts                     # JSON-LD-Bausteine (Organization, Service …)
│   └── blog.ts                       # Blog-Datenquelle (4 Beiträge)
└── docs/
    └── migration.md                  # Vollständige Inhalts- & SEO-Referenz der Altseite
```

## Setup lokal

```bash
# Node.js 20.9+ und npm erforderlich
npm install
npm run dev
# → http://localhost:3000
```

## Build & Deploy

```bash
npm run build
npm run start   # lokaler Start des Production-Builds
```

Deploy erfolgt über **Vercel**. Der `main`-Branch wird automatisch
deployt. Preview-Deployments für alle anderen Branches.

### Vercel Domain-Konfiguration (Go-live-relevant)

- `www.pb-fahrzeugpflege.de` als **Primary Domain** setzen. Vercel
  erzeugt dann automatisch den 308-Redirect von der non-www-Variante.
- HTTPS wird von Vercel automatisch erzwungen (Managed-Zertifikat).
- HSTS-Header optional über `next.config.ts` bzw. Vercel-Config setzen.

## Umgebungsvariablen

Alle in `.env.local` (wird von Git ignoriert) bzw. in den
Vercel-Umgebungsvariablen setzen. Siehe `.env.example` für die
vollständige Liste.

## SEO-relevante Einstellungen

- `trailingSlash: true` in `next.config.ts` — alle URLs enden auf `/`
  (identisch zur Altseite, kritisch für Rankings)
- 301-Redirects (permanent = 308) für Alt-URLs siehe `next.config.ts`
- Sitemap unter `/sitemap.xml`, Robots unter `/robots.txt`
- JSON-LD (Organization, LocalBusiness, WebSite, WebPage, Breadcrumb,
  Service, FAQPage, Product/AggregateRating, Article) global +
  seitenspezifisch
- Metadata pro Route via `generateMetadata`/`metadata`-Export

## Migrationsdokument

`docs/migration.md` ist die **verbindliche Referenz** für alle Inhalte,
URLs, Meta-Daten, FAQs, Bilder und Schema-Strukturen der Altseite.
Nie Inhalte erfinden — bei Unklarheiten dort nachsehen.

## Content-Management

Aktuell ist der Content in TypeScript-Dateien (`src/lib/blog.ts`,
`src/lib/site.ts` sowie hart in den `page.tsx`) hinterlegt. In einem
späteren Schritt wird **Payload CMS** integriert, damit der Kunde
Inhalte selbst pflegen kann.

## Wichtige externe Konten (für Übergabe)

- **GitHub**: https://github.com/fynnoman/pb-details
- **Vercel**: Projekt "pb-fahrzeugpflege" (nach Deployment)
- **Google Tag Manager**: `GTM-PM4LRKZ` (aus Altseite übernommen)
- **CookieYes**: Client-ID `882f35b4b9e022f15719da7e` (aus Altseite)
- **ProvenExpert**: `pb-fahrzeugpflege-saarlouis` (Bewertungs-Widget)

## Änderungshinweise

- **`src/lib/site.ts`**: zentrale Datenquelle für NAP, Öffnungszeiten,
  Bewertungen. Änderungen hier wirken sich auf alle Seiten aus.
- **`src/lib/blog.ts`**: die 4 Blogbeiträge. Neue Beiträge einfach als
  Objekt hinzufügen (Slug, Meta, Absätze).
- **`docs/migration.md`**: Referenz nicht verändern (Ist-Stand der
  Altseite zum Zeitpunkt der Migration).

## Kontakt

Fragen zum Setup an den entwickelnden Dienstleister. Der Kunde erhält
nach Abschluss der CMS-Integration eine separate Bedienungsanleitung.
