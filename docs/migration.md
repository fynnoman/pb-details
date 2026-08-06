# Migrations-Dokument – pb-fahrzeugpflege.de → Next.js

**Domain:** https://www.pb-fahrzeugpflege.de
**Erhebungsdatum:** 6. August 2026
**Quellen:** `/sitemap_index.xml`, `/page-sitemap.xml`, `/wp-json/wp/v2/pages`, `/wp-json/wp/v2/posts`, Live-HTML aller Seiten, WP-Admin-Seitenübersicht
**Ziel:** Vollständige Inhalts- und SEO-Übernahme beim Relaunch auf Next.js – kein Inhalt, kein Meta-Tag, kein Redirect geht verloren.

---

## 0. Executive Summary / Systemumgebung

| Punkt | Wert |
|---|---|
| CMS | WordPress |
| Theme | `colibri-wp` (Colibri Page Builder Pro) |
| SEO-Plugin | **Rank Math SEO** (liefert Title, Description, Robots, Canonical, Schema, Redirects, 404-Monitor) |
| Weitere Plugins | `colibri-page-builder-pro`, `sv-provenexpert` (ProvenExpert-Widget), `wordfence`, `forminator` (Formulare), `limit-login-attempts`, `gtm4wp` (Google Tag Manager for WordPress), CookieYes (Consent) |
| Seiten gesamt (WP-Admin) | **18** – 17 veröffentlicht + 1 privat („Gutschein") |
| Seiten in Sitemap | **14** (Impressum, Datenschutz, AGB sind `noindex`, daher nicht in der Sitemap) |
| Blogbeiträge | **4** (veröffentlicht, `index,follow`) – **⚠️ NICHT in der Sitemap enthalten** |
| Medien-Dateien | **441** (WP-Medienbibliothek) |
| Kategorien | 2 |
| Sprache | de / de-DE |
| Formular-Technik | Forminator + hCaptcha (`js.hcaptcha.com/1/api.js`) |

### Wichtigste Befunde für den Relaunch

1. **Sitemap unvollständig:** `sitemap_index.xml` enthält nur `page-sitemap.xml`. Die 4 Blogbeiträge (Stand 25.11.2025) sind indexierbar, aber nicht in der Sitemap. Beim Relaunch mit aufnehmen.
2. **Blog-URL-Struktur:** Beiträge nutzen `/JAHR/MONAT/TAG/slug/` – in Next.js empfehlenswert auf `/blog/slug/` umzustellen, dann zwingend 301-Redirects setzen (siehe Kapitel 2.3).
3. **Zwei Verzeichnis-Ebenen:** `/leistungen/*` ist eine echte Hierarchie (Parent-Page ID 4543). Muss in Next.js als verschachteltes Routing abgebildet werden.
4. **Kryptische URL:** `/9555-2/` (Teilnahmebedingungen Facebook Gewinnspiel) – ideal für einen sprechenden Slug + 301.
5. **`/leistungen/` ist eine reine Kachel-Seite** ohne Fließtext – SEO-schwach, beim Relaunch Content ergänzen.
6. **Impressum, Datenschutz und AGB haben `noindex` und KEIN Canonical** – Verhalten beim Relaunch bewusst übernehmen oder korrigieren.
7. **Zahlen-Inkonsistenz:** Auf der Website stehen wechselnd „über 600", „642" und „648" Bewertungen. Für den Relaunch eine Quelle definieren (ProvenExpert-API liefert live 648 / 4,92 ★).

---

## 1. Kontaktdaten, Öffnungszeiten, Auszeichnungen & Zertifikate

### 1.1 Stammdaten (NAP – exakt so übernehmen, SEO-relevant)

| Feld | Wert |
|---|---|
| Firmenname | **PB Fahrzeugpflege Saarlouis®** |
| Inhaber | Thomas Paul-Mohm |
| Geschäftsführung / Gründer | Thomas Paul & Karsten Becker (seit 1997) |
| Straße | Provinzialstraße 243 |
| PLZ / Ort | 66806 Ensdorf |
| Region | Saarland, Deutschland |
| Telefon | +49 (0) 6831 461229 · `tel:+496831461229` |
| WhatsApp | https://wa.me/+496831461229 |
| Fax | 06831 645425 |
| E-Mail | info@pb-fahrzeugpflege.de (auf der Website als „info(ät)pb-fahrzeugpflege.de" maskiert) |
| USt-IdNr. | DE268106468 |
| Website | www.pb-fahrzeugpflege.de |
| Geo-Koordinaten | 49.2973359 / 6.7782342 |
| Google Maps | https://g.page/pbfahrzeugpflege?share |
| Preisniveau (Schema) | €€€€ |

### 1.2 Öffnungszeiten

**Wie im Footer / auf der Kontaktseite ausgegeben:**

| Tag | Zeiten |
|---|---|
| Montag – Freitag | 09:00 – 12:00 Uhr und 13:00 – 17:00 Uhr |
| Samstag | 09:00 – 12:00 Uhr |

Zusatz im Footer: „Abweichungen möglich!" (verlinkt auf das Google-Unternehmensprofil: https://share.google/ctOJCy04RFzGMWZIt)

> **⚠️ Datenkonflikt:** Im JSON-LD (`openingHours`) steht für Samstag **09:00-12:30**, im sichtbaren Text jedoch **09:00-12:00**. Vor dem Relaunch klären und beide Stellen vereinheitlichen.

### 1.3 Social Media & Profile

| Kanal | URL |
|---|---|
| Facebook | https://de-de.facebook.com/pbfahrzeugpflege |
| Instagram | https://www.instagram.com/pbfahrzeugpflege/ |
| YouTube | https://www.youtube.com/channel/UC7Xmy1J1uXXCQCz9rvTxuNA |
| WhatsApp | https://wa.me/+496831461229 |
| Google Maps | https://g.page/pbfahrzeugpflege?share |
| ProvenExpert | https://www.provenexpert.com/pb-fahrzeugpflege-saarlouis/ |

### 1.4 Auszeichnungen, Zertifikate & Presse (vollständige Liste)

**Zertifikate / Qualitätssiegel**

- **Q-Siegel** – Deutschlands **erster** Fahrzeugpflege-Betrieb mit Q-Siegel
  - 1. Auszeichnung durch Minister **Heiko Maas**
  - 2. Auszeichnung in Folge durch Ministerin **Anke Rehlinger**
- **BRILA zertifizierter Fachbetrieb** für Keramikversiegelungen (BRILA Certified Installer) – Urkunde: `Brila-Urkunde-Keramikversiegelung.jpg`
- **Werkstatt des Vertrauens** – Urkunde
- Eigener **Qualitäts-Coach** im Betrieb

**ProvenExpert-Auszeichnungen**

- TOP Dienstleister 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
- TOP Empfehlung 2017, 2018, 2019, 2020, 2021
- ProvenExpert Bewertungssiegel 2026
- „Von Kunden empfohlen 2019"
- TOP Kundenempfehlung / Dienstleister 2017 (über 95 % Empfehlungen, Note „sehr gut")

**Weitere Siegel**

- WerKenntDenBesten-Siegel (wkdb-siegel.de Widget)
- Siegel Marktplatz Mittelstand
- Webwiki Badge 2024
- Gold-Bewertung/Empfehlung (`gold_wert.png`)

**Jubiläen & Presse**

- 20. Jubiläum – Gratulation durch Ensdorfer Bürgermeister Hartwin Faust
- 25. Jubiläum – Gratulation vom Ensdorfer Bürgermeister
- **ZDF** – Fernsehteam der Sendung „Drehscheibe", Thema „Ein Tag Aushilfe als Fahrzeugpfleger"
- **SR3 Radio** (Saarlandwelle) – Fahrzeug-Beschriftung/Karosseriearbeiten
- **IHK Saar Wirtschaft 10/15** – Pressebericht über die Q-Siegel-Auszeichnung
- KITT und Herbie zu Besuch bei PB Fahrzeugpflege Saarlouis

**Kennzahlen (Trust-Signale, mehrfach auf der Site verwendet)**

- Seit **1997** inhabergeführt · über **29 Jahre** Erfahrung
- **648 Bewertungen** auf ProvenExpert, **Ø 4,92 / 5** (Stand Erhebung)
- Über **95 % Weiterempfehlungsquote**
- Einer der dienstältesten Fahrzeugaufbereiter Deutschlands
- Ausschließlich Privatkunden

---

## 2. URL-Verzeichnis

### 2.1 Alle Seiten (17 veröffentlicht) mit Titeln

| # | URL-Pfad | Seitentitel (WP) | Meta-Titel | WP-ID | Parent | Zuletzt geändert | Indexierung |
|---|---|---|---|---|---|---|---|
| 1 | `/` | Home | Fahrzeugaufbereitung Saarlouis & Keramikversiegelung | 5151 | – | 2026-07-21 | index, follow |
| 2 | `/ueber-uns/` | Über uns | Über uns – Fahrzeugaufbereitung im Saarland | 4539 | – | 2026-06-15 | index, follow |
| 3 | `/leistungen/` | Leistungen | Leistungen - PB Fahrzeugpflege Saarlouis | 4543 | – | 2026-03-09 | index, follow |
| 4 | `/leistungen/keramikversiegelung/` | Keramikversiegelung | Keramikversiegelung fürs Auto in Saarlouis & im Saarland | 4548 | 4543 | 2026-07-21 | index, follow |
| 5 | `/leistungen/nanoversiegelung/` | Nanoversiegelung | Nanoversiegelung fürs Auto in Saarlouis & im Saarland | 4550 | 4543 | 2026-06-16 | index, follow |
| 6 | `/leistungen/fahrzeugaufbereitung/` | Fahrzeugaufbereitung | Fahrzeugaufbereitung in Saarlouis & im Saarland | 4546 | 4543 | 2026-06-15 | index, follow |
| 7 | `/leistungen/lack-und-beulendoktor/` | Lack- und Beulendoktor | Beulendoktor & Smart Repair in Saarlouis & im Saarland | 4552 | 4543 | 2026-06-15 | index, follow |
| 8 | `/unfallschaden/` | Unfallschaden | Unfallschaden & Unfallinstandsetzung in Saarlouis & im Saarland | 10873 | – | 2026-07-21 | index, follow |
| 9 | `/preise/` | Preise | Preise – Fahrzeugaufbereitung im Saarland | 4558 | – | 2026-06-15 | index, follow |
| 10 | `/faq/` | FAQ | FAQ Keramikversiegelung und Fahrzeugaufbereitung Saarlouis | 4564 | – | 2026-06-16 | index, follow |
| 11 | `/referenzen/` | Referenzen | Referenzen & Bewertungen – Saarland | 4561 | – | 2026-06-18 | index, follow |
| 12 | `/kontakt/` | Kontakt | Kontakt & Anfahrt – Ensdorf \| PB Fahrzeugpflege Saarlouis | 4571 | – | 2026-07-21 | index, follow |
| 13 | `/danke/` | Danke für Ihre Kontaktaufnahme. | Danke für Ihre Kontaktaufnahme. - PB Fahrzeugpflege Saarlouis | 11235 | – | 2026-04-22 | index, follow ⚠️ |
| 14 | `/9555-2/` | Teilnahmebedingungen Facebook Gewinnspiel | Teilnahmebedingungen Facebook Gewinnspiel - PB Fahrzeugpflege Saarlouis | 9555 | – | 2025-09-12 | index, follow |
| 15 | `/impressum/` | Impressum | Impressum - PB Fahrzeugpflege Saarlouis | 4574 | – | 2025-11-25 | **noindex**, follow |
| 16 | `/datenschutzerklaerung/` | Datenschutzerklärung | Datenschutzerklärung - PB Fahrzeugpflege Saarlouis | 4577 | – | 2025-11-25 | **noindex**, follow |
| 17 | `/allgemeine-geschaeftsbedingungen/` | Allgemeine Geschäftsbedingungen | Allgemeine Geschäftsbedingungen - PB Fahrzeugpflege Saarlouis | 4590 | – | 2025-11-25 | **noindex**, follow |

⚠️ `/danke/` ist eine Danke-Seite nach Formularversand und sollte auf `noindex` gesetzt werden.

**Zusätzlich (nicht öffentlich):** Seite „Gutschein" – Status **privat**, nicht über die REST-API/Sitemap erreichbar. Vor der Migration im WP-Backend prüfen, ob der Inhalt übernommen werden soll.

### 2.2 Blogbeiträge (4)

| URL-Pfad | Titel | Meta-Titel | Datum |
|---|---|---|---|
| `/2025/11/25/warum-neuwagen-im-rohzustand-sind-und-sofort-geschuetzt-werden-sollten/` | Warum Neuwagen im Rohzustand sind und sofort geschützt werden sollten | Warum Neuwagen im Rohzustand sind und sofort geschützt werden sollten - PB Fahrzeugpflege Saarlouis | 25.11.2025 |
| `/2025/11/25/warum-immer-mehr-kunden-aus-luxemburg-ihre-keramikversiegelung-im-saarland-durchfuehren-lassen/` | Warum Luxemburger Kunden bis ins Saarland fahren | Warum Luxemburger Kunden bis ins Saarland fahren - PB Fahrzeugpflege Saarlouis | 25.11.2025 |
| `/2025/11/25/die-haeufigsten-fehler-bei-billigen-keramikversiegelungen-und-wie-du-sie-erkennst/` | Keramikversiegelung – warum billig am Ende teuer ist | Keramikversiegelung - warum billig am Ende teuer ist - PB Fahrzeugpflege Saarlouis | 25.11.2025 |
| `/2025/11/25/warum-schwarze-fahrzeuge-hoechste-praezision-erfordern-und-wie-eine-professionelle-keramikversiegelung-sie-schuetzt/` | Schwarzes Fahrzeug richtig polieren & versiegeln | Schwarzes Fahrzeug richtig polieren & versiegeln - PB Fahrzeugpflege Saarlouis | 25.11.2025 |

### 2.3 Redirect-Empfehlung für den Relaunch

**Regel Nr. 1: Alle 17 Seiten-URLs 1:1 beibehalten.** Sie sind indexiert, verlinkt und teilweise seit Jahren stabil. Jede Änderung kostet Rankings.

Nur diese Änderungen sind sinnvoll – jeweils mit **301**:

| Alt | Neu (Vorschlag) | Status |
|---|---|---|
| `/9555-2/` | `/teilnahmebedingungen-gewinnspiel/` | 301 |
| `/2025/11/25/<slug>/` (4 Beiträge) | `/blog/<slug>/` | 301 |
| `/datenschutz` (im Impressum verlinkt) | `/datenschutzerklaerung/` | 301 – ⚠️ **defekter interner Link im Impressum!** |
| `/preise` (ohne Slash, aus Home verlinkt) | `/preise/` | 301 (Trailing-Slash-Regel global setzen) |
| `/kontakt`, `/ueber-uns`, `/leistungen/keramikversiegelung` (ohne Slash) | jeweils mit Slash | 301 |

Zusätzlich in Next.js abbilden:

- `www` erzwingen (aktuell läuft alles auf `www.`)
- HTTPS erzwingen
- Trailing Slash **an** (`trailingSlash: true` in `next.config.js`) – die gesamte Site nutzt Trailing Slashes
- Rank-Math-Redirects vor der Abschaltung exportieren (`/wp-admin/admin.php?page=rank-math-redirections`) und in `next.config.js` übernehmen
- 404-Monitor-Log von Rank Math auswerten und häufige 404s mitnehmen

### 2.4 robots.txt (aktuell)

```
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php

Sitemap: https://www.pb-fahrzeugpflege.de/sitemap_index.xml
```

Für Next.js: `/wp-admin/`-Regeln entfallen, Sitemap-Pfad auf `/sitemap.xml` anpassen und **Blogbeiträge aufnehmen**.

---
## 3. Globale Elemente (Header, Navigation, Footer)

### 3.1 Header / Hauptnavigation

Logo: `theartofdetailing_seit_pure_black-png.png` – Alt-Text: **„PB Fahrzeugpflege Saarlouis – The Art of Detailing"** (verlinkt auf `/`)
Zusätzliches Logo im Schema: `PB_Logo_RGB.png` (559 × 150 px)

| Menüpunkt | Ziel |
|---|---|
| Home | `/` |
| Über uns | `/ueber-uns/` |
| Leistungen | `/leistungen/` |
| ↳ Keramikversiegelung | `/leistungen/keramikversiegelung/` |
| ↳ Nanoversiegelung | `/leistungen/nanoversiegelung/` |
| ↳ Fahrzeugaufbereitung | `/leistungen/fahrzeugaufbereitung/` |
| ↳ Lack- und Beulendoktor | `/leistungen/lack-und-beulendoktor/` |
| Unfallschaden | `/unfallschaden/` |
| Preise | `/preise/` |
| FAQ | `/faq/` |
| Referenzen | `/referenzen/` |
| Kontakt | `/kontakt/` |

**Header-CTA-Button:** „JETZT ANFRAGEN" → `/kontakt/`
Weitere Elemente: Suche, „Zum Inhalt springen" (`#content`, Skip-Link – barrierefreiheitsrelevant, in Next.js beibehalten)

### 3.2 Footer (identisch auf allen Seiten)

**Bewertungs-Widget**
„PB Fahrzeugpflege Saarlouis – 648 Bewertungen auf ProvenExpert.com" → https://www.provenexpert.com/pb-fahrzeugpflege-saarlouis/ (mit 5 Sternen aus `star.svg`)

**Kontaktblock**
```
Provinzialstraße 243
66806 Ensdorf
+49 (0) 6831 461229        → tel:+496831461229
info(ät)pb-fahrzeugpflege.de → mailto:info@pb-fahrzeugpflege.de
```

**Öffnungszeiten-Block**
```
Mo - Fr   09:00 - 12:00
          13:00 - 17:00
Sa        09:00 - 12:00
Abweichungen möglich!   → https://share.google/ctOJCy04RFzGMWZIt
```

**Social-Icons:** Facebook · Instagram · YouTube · WhatsApp · Google Maps (URLs siehe Kapitel 1.3)

**Rechtliche Links:** Impressum (`/impressum/`) · Datenschutz (`/datenschutzerklaerung/`) · AGBs (`/allgemeine-geschaeftsbedingungen/`)

**Copyright:** `© 2026 PB Fahrzeugpflege Saarlouis ®` (Jahr dynamisch generieren)

**Back-to-Top:** Anker `#page-top`

---

## 4. Eingesetzte Tools & Tracking-Codes

### 4.1 Tracking & Consent

| Tool | ID / Endpoint | Hinweis für Next.js |
|---|---|---|
| **Google Tag Manager** | **`GTM-PM4LRKZ`** | Eingebunden über das Plugin *GTM4WP*. In Next.js über `@next/third-parties/google` oder eigenes Script-Tag – **erst nach Consent laden**. |
| **GTM dataLayer** | Variablenname `dataLayer` | Push-Objekt: `{"pagePostType":"page"\|"frontpage","pagePostType2":"single-page","pagePostAuthor":"pbwpadm"\|"yankle"}` – Equivalent in Next.js nachbauen, falls GTM-Trigger darauf basieren. **Im GTM-Container prüfen, welche Variablen tatsächlich verwendet werden.** |
| **Google Analytics 4** | Über GTM ausgeliefert (laut Datenschutzerklärung GA4 im Einsatz). Im Quelltext gefundene ID-Fragmente: `UA-5339934-2` (Altbestand Universal Analytics) | GA4-Measurement-ID direkt im GTM-Container auslesen und übernehmen. UA ist seit 2023 abgeschaltet – Tag entfernen. |
| **Meta / Facebook Pixel** | Laut Datenschutzerklärung im Einsatz; wird über GTM nachgeladen (kein `fbq`-Init im Quelltext) | Im GTM-Container Pixel-ID auslesen. |
| **CookieYes (Consent Management)** | `https://cdn-cookieyes.com/client_data/882f35b4b9e022f15719da7e/script.js` | Client-ID `882f35b4b9e022f15719da7e` – 1:1 übernehmbar. Muss GA4, Meta Pixel und ProvenExpert blockieren, bis eingewilligt wurde. |
| **hCaptcha** | `https://js.hcaptcha.com/1/api.js` | Für das Kontaktformular. Site-Key aus der Forminator-Konfiguration übernehmen. |

### 4.2 Bewertungs- & Siegel-Widgets

| Widget | Einbindung |
|---|---|
| **ProvenExpert** | Plugin `sv-provenexpert`; Profil `pb-fahrzeugpflege-saarlouis`; liefert Bewertungs-Badge im Footer und das Product/AggregateRating-Schema. Bild: `https://images.provenexpert.com/ef/b9/3d60d4a03daa2350b473db243e4c/pb-fahrzeugpflege-saarlouis_full_1722936411.jpg` |
| **WerKenntDenBesten (wkdb)** | `https://www.wkdb-siegel.de/v1/widget-<token>.js` – Token vollständig im Quelltext der Seiten hinterlegt, beim Umzug aus dem Live-Quelltext übernehmen |
| **Weitere Siegel** | Statische Bilder (Marktplatz Mittelstand, Webwiki 2024, Q-Siegel) – als Assets migrieren |

### 4.3 Frontend-Libraries (können in Next.js entfallen)

`jquery`, `jquery-migrate`, `imagesloaded`, `masonry`, `colibri.js`, `typed.js`, `fancybox`, `swiper.js`, Forminator-Skripte, `intlTelInput`.

→ In Next.js ersetzen durch: Swiper React oder natives Scroll-Snap (Slider), CSS Grid/Columns statt Masonry, ein Lightbox-Paket statt Fancybox, React Hook Form + eigene API-Route statt Forminator.

### 4.4 Formulare

**Kontaktformular** (`/kontakt/`, Forminator + hCaptcha), Zielseite nach Absenden: `/danke/`

| Feld | Typ | Pflicht |
|---|---|---|
| Vorname | Text | ✅ |
| E-Mail-Adresse | E-Mail | ✅ |
| Telefonnummer | Tel (intlTelInput) | – |
| Nachricht | Textarea, max. **180 Zeichen** (Counter „0 / 180") | ✅ |
| Absenden | Button | – |

Zusätzlich auf `/unfallschaden/`: CTA „Schaden checken lassen" mit dem Hinweis „Foto per WhatsApp oder Formular, Rückmeldung kurzfristig".

---

## 5. Strukturierte Daten (Schema.org) – 1:1 zu übernehmen

Rank Math erzeugt aktuell folgende Schema-Typen. In Next.js über JSON-LD-Komponenten nachbauen.

### 5.1 Globaler Graph (auf allen Seiten)

- **Place** (`#place`): Geo 49.2973359 / 6.7782342, PostalAddress Provinzialstraße 243, 66806 Ensdorf, Saarland, Deutschland; hasMap Google-Maps-Link
- **AutoRepair + Organization** (`#organization`):
  - name: PB Fahrzeugpflege Saarlouis
  - url, email `info@pb-fahrzeugpflege.de`, telephone `+49 6831 461229`
  - sameAs: `https://www.facebook.com/pbfahrzeugpflege/` — ⚠️ **Instagram, YouTube und ProvenExpert fehlen hier. Beim Relaunch ergänzen.**
  - logo: `https://www.pb-fahrzeugpflege.de/wp-content/uploads/2021/03/PB_Logo_RGB.png` (559×150)
  - priceRange: `€€€€`
  - openingHours: `Mo-Fr 09:00-12:00`, `Sa 09:00-12:30`, `Mo-Fr 13:00-17:00`
  - ⚠️ `legalName` ist fehlerhaft mit `info@pb-fahrzeugpflege.de` befüllt – korrigieren auf „PB Fahrzeugpflege Saarlouis"
- **WebSite** (`#website`) inkl. `SearchAction` auf `/?s={search_term_string}` – in Next.js nur beibehalten, wenn eine Suche existiert
- **WebPage** je Seite (datePublished / dateModified)
- **Service** je Seite (serviceType „Fahrzeugpflege", Offer availability InStock)
- **BreadcrumbList** je Seite

### 5.2 FAQPage-Schema

Auf Startseite und allen Leistungsseiten mit FAQ-Block ausgespielt (`@id: .../#faq`, `inLanguage: de-DE`). **Alle FAQ-Blöcke in Next.js wieder mit FAQPage-Markup versehen** – das sind wertvolle Rich-Snippet-Chancen.

> ⚠️ Auf der Startseite weichen die FAQ-Antworten im Schema leicht vom sichtbaren Text ab (Schema: „Glanz oder gar nicht" / „642 Bewertungen"; sichtbar: „Wir schützen Werte" / „über 600 Bewertungen"). Google verlangt Übereinstimmung – beim Relaunch angleichen.

### 5.3 Product / AggregateRating (ProvenExpert)

```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "PB Fahrzeugpflege Saarlouis",
  "description": "Keramikversiegelung, Autoaufbereitung, Smart Repair & Beulendoktor im Saarland",
  "image": "https://images.provenexpert.com/ef/b9/3d60d4a03daa2350b473db243e4c/pb-fahrzeugpflege-saarlouis_full_1722936411.jpg",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingCount": 648, "reviewCount": 648,
    "ratingValue": 4.92, "bestRating": 5, "worstRating": 1
  }
}
```

---
## 6. Seiten im Detail

Jede Seite enthält: Meta-Daten · Überschriftenstruktur · kompletter Fließtext · Bilder mit Alt-Text · FAQ-Block.

---

### 6.1 Startseite — `/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Fahrzeugaufbereitung Saarlouis & Keramikversiegelung |
| **Meta-Description** | Premium-Fahrzeugaufbereitung & Keramikversiegelung im Saarland und Luxemburg – seit 1997. Spezialist für Neuwagen, Sportwagen & Luxusfahrzeuge. Über 642 Top-Bewertungen. |
| **Canonical** | https://www.pb-fahrzeugpflege.de/ |
| **Robots** | follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large |
| **OG-Titel / OG-Description** | identisch mit Meta-Titel / Meta-Description |
| **OG-Image** | ⚠️ nicht gesetzt – beim Relaunch ergänzen |

**Überschriftenstruktur**

- **H1:** Fahrzeugaufbereitung & Keramikversiegelung in Saarlouis, dem Saarland & Luxemburg
- H2: Unser Anspruch: Kompromisslose Qualität bis ins detail *(Schreibweise „detail" klein – im Original so)*
- H2: Unsere Leistungen im Überblick
- H2: Auf welche Fahrzeuge wir spezialisiert sind
- H2: So läuft es bei uns ab
- H2: Unser Einzugsgebiet: Saarland & Luxemburg
- H2: Warum PB Fahrzeugpflege Saarlouis?
- H2: Häufige Fragen
  - H3: Was unterscheidet PB Fahrzeugpflege von anderen Aufbereitern im Saarland?
  - H3: Bieten Sie auch Aufbereitung für Sportwagen, Oldtimer und Luxusfahrzeuge an?
  - H3: Seit wann gibt es PB Fahrzeugpflege?
  - H3: Aus welchen Regionen kommen Ihre Kunden?
  - H3: Wo befindet sich PB Fahrzeugpflege?

**Bilder**

| Datei | Alt-Text | Verwendung |
|---|---|---|
| `theartofdetailing_seit_pure_black-png.png` | PB Fahrzeugpflege Saarlouis – The Art of Detailing | Logo |
| `star.svg` | *(leer)* ⚠️ | Bewertungssterne |
| `ville-kaisla-HNCSCpWrVJA-unsplash-scaled.jpg` | *(CSS-Hintergrund, kein Alt)* | Hero-Hintergrund |
| `cropped-Jubilaeum-29.png` | *(CSS-Hintergrund)* | 29-Jahre-Jubiläums-Badge |
| `cropped-cropped-cropped-IMG-20250404-WA0022-1-1.jpg` | *(CSS-Hintergrund)* | Sektions-Hintergrund |

**Fließtext (vollständig)**

> **Fahrzeugaufbereitung & Keramikversiegelung in Saarlouis, dem Saarland & Luxemburg**
>
> PB Fahrzeugpflege Saarlouis® ist ein auf Premium-Fahrzeugaufbereitung und Keramikversiegelung spezialisierter Betrieb im Saarland – seit 1997. Ob Neuwagen, Sportwagen, Luxusfahrzeug oder Oldtimer: Wenn es um professionelle Fahrzeugaufbereitung im Saarland und in Luxemburg geht, sind Sie bei uns in den besten Händen. Von der High-End-Keramikversiegelung über die Nanoversiegelung bis zur kompletten Fahrzeugaufbereitung erhalten Sie alles aus einer Hand.
>
> **Unser Anspruch: Kompromisslose Qualität bis ins detail**
>
> Unser Qualitäts- und Leistungsanspruch beginnt dort, wo andere ihre Arbeit bereits als beendet ansehen. Wir nehmen uns die Zeit, die eine perfekte Aufbereitung braucht, und hören erst auf, wenn das Ergebnis stimmt. Da wir ausschließlich private Kundenfahrzeuge betreuen – darunter viele Sportwagen, Oldtimer und Luxusfahrzeuge – ist Ihr Fahrzeug bei uns in besten Händen. Billig kann jeder – deshalb lautet unser Motto: „Glanz oder gar nicht!" Wie unsere Kunden das erleben, lesen Sie in unseren Referenzen.
>
> „Für andere reicht das Erzählte, für uns zählt das Erreichte!"
>
> *[Button: Mehr Über uns → /ueber-uns/]*
>
> **Unsere Leistungen im Überblick**
>
> Bei PB Fahrzeugpflege Saarlouis erhalten Sie alle Leistungen rund um Lackschutz, Aufbereitung und Schadenbehebung aus einer Hand:
>
> - Keramikversiegelung – High-End 9H-Lackschutz für Neuwagen, Sport- und Luxusfahrzeuge.
> - Nanoversiegelung – die preisbewusste Alternative zur Keramikversiegelung.
> - Fahrzeugaufbereitung – mehrstufige Innen- und Außenaufbereitung, auch für Leasingrückgabe und Fahrzeugverkauf.
> - Lack- & Beulendoktor / Smart Repair – Dellen und Lackschäden ohne Lackieren beheben.
> - Unfallschaden – komplette Schadenabwicklung aus einer Hand, von Gutachter bis Karosserie.
>
> Eine Übersicht zu Leistungen und Preisen finden Sie auf unserer Seite Preise.
>
> **Auf welche Fahrzeuge wir spezialisiert sind**
>
> Wir sind auf die Aufbereitung und den Lackschutz hochwertiger Fahrzeuge spezialisiert und betreuen ausschließlich private Kundenfahrzeuge:
>
> - Neuwagen – Lackschutz ab dem ersten Kilometer durch eine Keramikversiegelung, bevor Flugrost, Insektenreste und Waschkratzer den empfindlichen Klarlack erreichen.
> - Sportwagen, Luxusfahrzeuge & Oldtimer – kompromisslose Aufbereitung und Werterhalt mit dem nötigen Fingerspitzengefühl.
> - Gebrauchtwagen vor Leasingrückgabe oder Verkauf – gezielte Aufbereitung, die sichtbare Mängel reduziert und teure Nachberechnungen vermeidet.
>
> Jede Aufbereitung beginnt mit einer persönlichen Begutachtung – so erhalten Sie ein realistisches Angebot statt eines Pauschalversprechens.
>
> **So läuft es bei uns ab**
>
> In drei Schritten zu Ihrem Ergebnis:
>
> 1. Begutachtung – kommen Sie während der Öffnungszeiten auch ohne Termin vorbei; wir sehen uns Ihr Fahrzeug direkt an.
> 2. Individuelles Angebot – auf Basis von Lackzustand, Aufwand und Ihrem Ziel (Verkauf, Leasingrückgabe, Werterhalt) erstellen wir ein transparentes Angebot.
> 3. Aufbereitung – wir nehmen uns die nötige Zeit und arbeiten, bis das Ergebnis stimmt.
>
> Bei weiterer Anfahrt – etwa aus Luxemburg – lohnt sich ein kurzer Anruf vorab.
>
> **Unser Einzugsgebiet: Saarland & Luxemburg**
>
> Sie finden uns in der Provinzialstraße 243 in 66806 Ensdorf – direkt bei Saarlouis. Zu uns kommen Kunden aus dem gesamten Saarland, u. a. aus Saarlouis, Saarbrücken, Merzig und St. Wendel, sowie aus Luxemburg und dem grenznahen Raum.
>
> Eine unverbindliche Begutachtung ist während der Öffnungszeiten auch ohne Termin möglich – oder Sie vereinbaren vorab einen Termin über unsere Seite Kontakt.
>
> **Warum PB Fahrzeugpflege Saarlouis?**
>
> - ✓ Seit 1997 inhabergeführt von Thomas Paul & Karsten Becker
> - ✓ Einer der dienstältesten Fahrzeugaufbereiter Deutschlands
> - ✓ Über 600 positive, verifizierte Kundenbewertungen
> - ✓ Über 95 % Weiterempfehlungsquote
> - ✓ Deutschlands erster Fahrzeugpflegebetrieb mit Q-Siegel
> - ✓ Auszeichnungen durch Heiko Maas und Anke Rehlinger für besondere Servicequalität
> - ✓ BRILA zertifizierter Fachbetrieb für Keramikversiegelungen
> - ✓ Eigener Qualitäts-Coach
> - ✓ Spezialisierung auf Sportwagen, Luxusfahrzeuge und Sammlerfahrzeuge
> - ✓ Kunden aus dem Saarland, Luxemburg und ganz Deutschland
> - ✓ Ausschließlich Privatkunden statt Massenabfertigung
> - ✓ Bekannt aus ZDF Fernsehen, SR3 Radio sowie weiteren Medienberichten
>
> Mehr über unsere Geschichte und unser Team erfahren Sie auf der Seite Über uns.

**FAQ – Startseite** *(sichtbarer Text; Schema-Variante siehe Kapitel 5.2)*

**F: Was unterscheidet PB Fahrzeugpflege von anderen Aufbereitern im Saarland?**
A: PB Fahrzeugpflege Saarlouis arbeitet inhabergeführt seit 1997 ausschließlich an privaten Kundenfahrzeugen und ist auf Sportwagen, Oldtimer und Luxusfahrzeuge spezialisiert. Statt schneller Massenabfertigung nehmen wir uns die Zeit für ein perfektes Ergebnis – nach dem Motto „Wir schützen Werte". Über 600 positive Bewertungen und eine Weiterempfehlungsrate von über 95 % bestätigen das.

**F: Bieten Sie auch Aufbereitung für Sportwagen, Oldtimer und Luxusfahrzeuge an?**
A: Ja. Hochwertige Fahrzeuge sind unsere Spezialität – vom High-End-Lackschutz per Keramikversiegelung bis zur kompletten Innen- und Außenaufbereitung.

**F: Seit wann gibt es PB Fahrzeugpflege?**
A: PB Fahrzeugpflege Saarlouis besteht seit 1997 und gehört mit über 29 Jahren Erfahrung zu den ältesten und erfahrensten Fahrzeugaufbereitern Deutschlands.

**F: Aus welchen Regionen kommen Ihre Kunden?**
A: Unsere Kunden kommen aus Saarlouis und dem gesamten Saarland, aus Luxemburg sowie aus den angrenzenden Regionen. Unser Standort in Ensdorf an der B51 liegt verkehrsgünstig mit unmittelbarer Zuganbindung.

**F: Wo befindet sich PB Fahrzeugpflege?**
A: Sie finden uns in der Provinzialstraße 243, 66806 Ensdorf – direkt bei Saarlouis. Begutachtung und Angebot sind auch ohne Termin möglich; alle Details auf der Seite Kontakt.

**Interne Links auf dieser Seite:** `/ueber-uns/`, `/preise`, `/leistungen/keramikversiegelung`, `/kontakt`

---

### 6.2 Über uns — `/ueber-uns/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Über uns – Fahrzeugaufbereitung im Saarland |
| **Meta-Description** | Seit 1997 stehen Thomas Paul & Karsten Becker für professionelle Fahrzeugaufbereitung im Saarland – mit Leidenschaft, Qualität und fast 30 Jahren Erfahrung. |
| **Canonical** | https://www.pb-fahrzeugpflege.de/ueber-uns/ |
| **Robots** | index, follow |
| **OG-Image** | ⚠️ nicht gesetzt |

**Überschriften**

- **H1:** Thomas Paul & Karsten Becker von PB Fahrzeugpflege Saarlouis®
- H2: Im Jahr 1997…

**Bilder**

| Datei | Alt-Text |
|---|---|
| `cropped-cropped-Karsten_und_Thomas_Firma-_TQw6dnLg-transformed-1.jpeg` | *(CSS-Hintergrund – Team-Foto Karsten & Thomas)* ⚠️ Alt-Text ergänzen |
| `cropped-tim-meyer-timm-jpeg-9tzGmvumnHM-unsplash-scaled-1.jpg` | *(CSS-Hintergrund)* |
| `theartofdetailing_seit_pure_black-png.png` | PB Fahrzeugpflege Saarlouis – The Art of Detailing |

**Fließtext (vollständig)**

> **Thomas Paul & Karsten Becker von PB Fahrzeugpflege Saarlouis®**
>
> **Im Jahr 1997…**
>
> …als junge und ambitionierte Unternehmer im Alter von 18 und 24 Jahren, haben wir – Thomas Paul und Karsten Becker – die professionelle Fahrzeugaufbereitung im Saarland auf ein neues Level gehoben. Während andere sich auf die Massenabfertigung für Autohäuser und Gebrauchtwagenhändler konzentrierten, hatten wir ein anderes Ziel:
>
> Wir wollten der beste Fahrzeugaufbereiter im Saarland werden, mit einem klaren Fokus auf den Privatkunden!
>
> Unsere Leidenschaft für Perfektion und unser unermüdlicher Ehrgeiz haben uns zum Erfolg geführt. Fast drei Jahrzehnte später haben wir nicht nur unser Ziel erreicht, sondern weit übertroffen. Heute dürfen wir Kunden aus ganz Deutschland und sogar darüber hinaus bei PB Fahrzeugpflege Saarlouis® begrüßen. Unsere Liebe zum Detail und unser Engagement für höchste Qualität haben uns zu einer festen Größe in der Branche gemacht.
>
> **Erfahrung, die Vertrauen schafft**
>
> In den vergangenen Jahrzehnten haben wir nicht nur unser Handwerk perfektioniert, sondern auch ein tiefes Verständnis für die Bedürfnisse unserer Kunden entwickelt. Unsere Geschichte ist geprägt von stetiger Weiterentwicklung und der Fähigkeit, uns immer wieder neu zu erfinden, um den hohen Ansprüchen unserer Kunden gerecht zu werden.
>
> **Warum PB Fahrzeugpflege Saarlouis®?**
>
> Unsere Expertise und unser kompromissloser Qualitätsanspruch machen uns zur ersten Wahl, wenn es um die professionelle Fahrzeugaufbereitung geht. Ob es um eine gründliche Reinigung, eine Lackkorrektur oder eine hochmoderne Keramikversiegelung geht – bei PB Fahrzeugpflege Saarlouis® erhalten Sie Ergebnisse, die Ihren Erwartungen nicht nur gerecht werden, sondern sie übertreffen.
>
> Wir sehen nicht nur Autos, sondern Werte. Jedes Fahrzeug ist für uns ein Unikat und bekommt eine maßgeschneiderte Behandlung.
>
> Bei uns gibt's keine leeren Versprechungen aus Hochglanzprospekten, sondern 100% ehrliche Handwerkskunst mit Ergebnissen, die dauerhaft überzeugen.
>
> Wenn Sie Wert auf Qualität legen, wenn für Sie Klasse statt Kompromisse zählt, dann sind wir für Sie genau die Richtigen!
>
> Kontaktieren Sie uns noch heute und erleben Sie den Unterschied, den echte Leidenschaft und fast 30 Jahre Erfahrung in der Fahrzeugaufbereitung machen können.
>
> *[Button: Kontakt → /kontakt/]*

**FAQ:** keine
**Hinweis:** Die Textabschnitte „Erfahrung, die Vertrauen schafft" und „Warum PB Fahrzeugpflege Saarlouis®?" sind im Original **keine echten Überschriften-Tags**, sondern formatierter Fließtext. Beim Relaunch als H2/H3 auszeichnen (SEO-Gewinn).

---

### 6.3 Leistungen (Übersicht) — `/leistungen/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Leistungen - PB Fahrzeugpflege Saarlouis |
| **Meta-Description** | UNSERE LEISTUNGEN Keramikversiegelung Nanoversiegelung Fahrzeugaufbereitung Lack/Beulendoktor |
| **Canonical** | https://www.pb-fahrzeugpflege.de/leistungen/ |
| **Robots** | index, follow |
| **OG-Image** | `https://www.pb-fahrzeugpflege.de/wp-content/uploads/2019/12/cropped-cropped-Fotolia-Kermikversiegelung-Auftragung.jpg` |

**Überschriften**

- **H1:** UNSERE LEISTUNGEN

**Fließtext (vollständig)**

> **UNSERE LEISTUNGEN**
>
> - Keramikversiegelung *(→ /leistungen/keramikversiegelung/)*
> - Nanoversiegelung *(→ /leistungen/nanoversiegelung/)*
> - Fahrzeugaufbereitung *(→ /leistungen/fahrzeugaufbereitung/)*
> - Lack/Beulendoktor *(→ /leistungen/lack-und-beulendoktor/)*

**Bilder**

| Datei | Alt-Text |
|---|---|
| `cropped-cropped-Fotolia-Kermikversiegelung-Auftragung.jpg` | Fahrzeugaufbereiter poliert einen Fahrzeuglack – PB Fahrzeugpflege Saarlouis |
| `cropped-cropped-cropped-ussama-azam-lSja7Rr30SY-unsplash-scaled-1.jpg` | cropped cropped cropped ussama azam lSja7Rr30SY unsplash scaled 1 Leistungen ⚠️ |
| `cropped-cropped-cropped-cropped-cropped-Car-Detailing-goldenes-Auto-Fotolia-Vecteezy-scaled-2.jpeg` | Keramikversiegelung wird in Handarbeit auf einen gelben Sportwagen aufgetragen - PB Fahrzeugpflege |
| `cropped-Beule-vorher-e1487154482797.jpg` | Beulendoktor vorher |
| `felipe-simo-NjLDPRFmvM4-unsplash-scaled.jpg` | *(CSS-Hintergrund)* |

> ⚠️ **Handlungsbedarf:** Diese Seite hat **keinen Fließtext** – nur vier Kacheln. Die Meta-Description ist automatisch aus den Kachel-Labels generiert. Beim Relaunch mit einem echten Einleitungstext + Teaser je Leistung aufwerten. Zudem: Alt-Texte sind teils Dateinamen.

---
### 6.4 Keramikversiegelung — `/leistungen/keramikversiegelung/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Keramikversiegelung fürs Auto in Saarlouis & im Saarland |
| **Meta-Description** | Professionelle Keramikversiegelung fürs Auto im Saarland & Luxemburg – glasartiger Lackschutz in über 20 Stunden Handarbeit. Seit 1997, über 642 Top-Bewertungen. |
| **Canonical** | https://www.pb-fahrzeugpflege.de/leistungen/keramikversiegelung/ |
| **Robots** | index, follow |
| **OG-Image** | ⚠️ nicht gesetzt |

**Überschriftenstruktur** *(im Original teils unsauber verschachtelt – siehe Hinweis am Ende)*

- **H1:** Keramikversiegelung fürs Auto in Saarlouis, dem Saarland & Luxemburg
- H3: Warum sollte die Neuwagen Keramikversiegelung von PB Fahrzeugpflege Saarlouis® durchgeführt werden?
  - H4: Neuwagen Lackschutz ab dem ersten Kilometer – Weil Perfektion keine Kompromisse kennt
  - H4: Vergessen Sie die Märchen – Vertrauen Sie auf Expertise
  - H4: *(überlanger H4-Block, siehe Fließtext)*
    - H5: Präzision und Perfektion in jeder Phase
    - H5: Der Schutz, den Ihr Fahrzeug verdient
    - H5: Widerstandsfähigkeit, die sich bewährt hat
    - H5: Warum PB Fahrzeugpflege Saarlouis®?
- H2: Was kostet eine Keramikversiegelung?
- H2: Was bringt eine Keramikversiegelung – und für wen lohnt sie sich?
- H2: Keramik- oder Nanoversiegelung – was ist besser? (H3-Spaltenköpfe: Kriterium / Keramikversiegelung / Nanoversiegelung)
- H2: Vorteile und Nachteile einer Keramikversiegelung (H3: Vorteile: / Nachteile / worauf Sie achten sollten:)
- H2: Häufige Fragen zur Keramikversiegelung (8 × H3, siehe FAQ)

**Bilder**

| Datei | Alt-Text / Rolle |
|---|---|
| `ville-kaisla-HNCSCpWrVJA-unsplash-scaled.jpg` | Hero-Hintergrund |
| `cropped-cropped-cropped-cropped-Car-Detailing-goldenes-Auto-Fotolia-Vecteezy-scaled-2.jpeg` | Sektions-Hintergrund (goldener Sportwagen) |
| `cropped-cropped-cropped-enrico-mantegazza-XH1DTvS1qCQ-unsplash-scaled-1.jpg` | Sektions-Hintergrund |
| `Fotolia_111261168_S-e1552037415870.jpg` | Sektions-Hintergrund |
| `cropped-cropped-cropped-Fotolia-Kermikversiegelung-Auftragung.jpg` | Sektions-Hintergrund |
| `cropped-20220421_143510-scaled-e1728466778968.jpg` | Sektions-Hintergrund |
| `theartofdetailing_seit_pure_black-png.png` | PB Fahrzeugpflege Saarlouis – The Art of Detailing |

**Fließtext (vollständig)**

> **Keramikversiegelung fürs Auto in Saarlouis, dem Saarland & Luxemburg**
>
> Seit fast drei Jahrzehnten, zertifizierter Fachbetrieb für Keramikversiegelung im Saarland und in Luxemburg – für Neuwagen ebenso wie für Sport-, Luxus- und gepflegte Gebrauchtfahrzeuge.
>
> Eine Keramikversiegelung ist eine glasartige Schutzschicht auf Basis von Siliziumoxid, die sich dauerhaft mit dem Autolack verbindet und ihn vor Umwelteinflüssen, Mikrokratzern und Korrosion schützt. Da wir uns bei PB Fahrzeugpflege Saarlouis höchster Qualität verschrieben haben, dauert eine solche Behandlung nicht selten 2-3 Tage.
>
> Der Lack bei Neuwagen befindet sich im absoluten Rohzustand und ist äußeren Einflüssen wie Flugrost, Insektenresten, Baumharz und Mikrokratzern (z. B. durch die Waschanlage) schutzlos ausgesetzt. Gerade in den ersten Kilometern können sich diese Schäden in den noch frischen Klarlack einbrennen. Deshalb ist unsere Keramikversiegelung direkt ab dem ersten Kilometer die beste Wahl, um den Lack langfristig zu schützen.
>
> **Warum sollte die Neuwagen Keramikversiegelung von PB Fahrzeugpflege Saarlouis® durchgeführt werden?**
>
> Ihr neues Fahrzeug ist ein Statement, eine Investition und oft ein lang ersehnter Wunsch der in Erfüllung geht. Doch genau in diesem Neuzustand ist der Lack Ihres Fahrzeugs am empfindlichsten – sozusagen im ungeschützten Rohzustand. Dieser Moment, bevor Ihr Auto den ersten Kilometer auf der Straße zurückgelegt hat, ist der entscheidende Zeitpunkt, um den Lack optimal zu schützen. Und genau hier kommt unsere glasartige Keramikversiegelung für Neuwagen und hochwertige Sportfahrzeuge ins Spiel.
>
> **Neuwagen Lackschutz ab dem ersten Kilometer – Weil Perfektion keine Kompromisse kennt**
>
> Stellen Sie sich vor, Ihr Fahrzeuglack – unberührt, makellos – trifft auf die raue Realität der Straße: Insekten, Vogelkot, Baumharz, Sahara-Sand, Industriestaub, Blütenstaub, Streusalz, Eis und Schnee. All diese Elemente sind nicht nur störend, sondern können den empfindlichen Lack Ihres Neuwagens in kürzester Zeit angreifen und irreparable Schäden verursachen. Schon wenige Tage können ausreichen, um den Wert und die Ästhetik Ihres Fahrzeugs nachhaltig zu beeinträchtigen.
>
> **Vergessen Sie die Märchen – Vertrauen Sie auf Expertise**
>
> Vielleicht wurde Ihnen beim Kauf gesagt, dass das Autohaus den Lack bereits „versiegelt" hat. In der Praxis handelt es sich dabei meist nur um eine einfache Wachs- oder Polymerbehandlung – nicht um eine vollwertige Keramikversiegelung. Lassen Sie sich genau erklären, was tatsächlich aufgetragen wurde, bevor Sie auf zusätzlichen Schutz verzichten.
>
> **Warum aber ausgerechnet die PB Fahrzeugpflege Saarlouis Keramikversiegelung**
>
> Unsere Keramikversiegelung bietet weit mehr als nur oberflächlichen Schutz. Sie bildet eine unsichtbare, aber extrem widerstandsfähige Schutzbarriere, die das Eindringen von Schadstoffen verhindert und den Lack Ihres Fahrzeugs langfristig in neuwertigem Zustand erhält. Mit unserer Keramikversiegelung legen Sie den Grundstein für eine Werterhaltung, die dem Anspruch Ihres Neufahrzeugs gerecht wird.
>
> Bei PB Fahrzeugpflege Saarlouis® setzen wir auf höchste Präzision, erstklassige Produkte und jahrzehntelange Erfahrung, um Ihnen den besten Schutz für Ihr Fahrzeug zu bieten. Schützen Sie Ihre Investition – von Anfang an. Vertrauen Sie auf die Profis, die wissen, was Ihr Fahrzeug wirklich braucht.
>
> **Präzision und Perfektion in jeder Phase**
>
> Unsere speziell geschulten Mitarbeiter nehmen sich die Zeit, die Ihr Fahrzeug verdient. In penibler Handarbeit – oft sind dafür mehr als 20 Stunden erforderlich – tragen wir eine hochmoderne, keramische Siliziumoxid-Beschichtung auf den empfindlichen Klarlack Ihres Fahrzeugs auf. Diese glasartige Schicht wirkt wie ein unsichtbarer Schutzpanzer und schützt den Lack Ihres Neuwagens vor den täglichen Herausforderungen, denen er auf der Straße ausgesetzt ist.
>
> **Der Schutz, den Ihr Fahrzeug verdient**
>
> Die von uns verwendete Keramikversiegelung basiert auf speziellen keramischen Verbindungen, die eine extreme Widerstandsfähigkeit gewährleisten. Diese Versiegelung ist so robust, dass sie in unseren internen Tests nur mit Schleifpaste und Poliermaschine wieder entfernt werden konnte. Das bedeutet, dass Ihr Lack ab sofort besser geschützt ist als je zuvor – gegen alles, was die Umwelt Ihrem Fahrzeug entgegensetzen könnte.
>
> **Widerstandsfähigkeit, die sich bewährt hat**
>
> Sobald die Keramikversiegelung aufgetragen ist, wird der Lack Ihres Neuwagens deutlich widerstandsfähiger gegenüber Umwelteinflüssen wie UV-Strahlung, Schmutz, Insektenrückständen und vielem mehr. Dieser Schutz ist nicht nur äußerlich sichtbar, sondern bewahrt den Wert und die Ästhetik Ihres Fahrzeugs langfristig.
>
> **Warum PB Fahrzeugpflege Saarlouis®?**
>
> PB Fahrzeugpflege Saarlouis® gehört zu den Dienstältesten Fahrzeugaufbereitungsbetrieben Deutschlands. Als BRILA zertifizierter Fachbetrieb für Keramikversiegelungen (BRILA Certified Installer), Q-Siegel zertifizierter Qualitätsbetrieb und Anbieter mit über 600 positiven Kundenbewertungen vertrauen seit 1997 Fahrzeugbesitzer aus dem Saarland, Luxemburg und weit darüber hinaus auf unsere Erfahrung. Unsere Leidenschaft für Perfektion und unser unermüdlicher Einsatz für Qualität machen uns zu den führenden Experten für Keramikversiegelung in Saarlouis, dem Saarland und Luxemburg. Vertrauen Sie uns Ihr Fahrzeug an, und wir sorgen dafür, dass es optimal geschützt und immer in bestmöglichem Zustand bleibt.
>
> „Für andere reicht das Erzählte, für uns zählt das Erreichte!"
>
> Sie haben noch weitere Fragen zu unserer Keramikversiegelung? Dann rufen Sie uns einfach an oder kommen Sie einfach ohne Termin zur unverbindlichen Beratung und Angebotserstellung bei uns in Saarlouis / Ensdorf vorbei!
>
> *[Button: JETZT KONTAKTIEREN → /kontakt/]*
>
> **Was kostet eine Keramikversiegelung?**
>
> Die Kosten einer Keramikversiegelung hängen von Fahrzeuggröße, Lackzustand und dem gewünschten Schutzaufbau ab. Da wir jedes Fahrzeug vor der Versiegelung gründlich aufbereiten, erstellen wir Ihnen nach einer kurzen Begutachtung ein transparentes Festpreis-Angebot – unverbindlich und auch ohne Termin. Eine Übersicht finden Sie auf unserer Seite Preise.
>
> **Was bringt eine Keramikversiegelung – und für wen lohnt sie sich?**
>
> Eine Keramikversiegelung bringt vor allem dreierlei: dauerhaften Schutz vor Umwelteinflüssen, einen intensiven, tiefen Glanz und eine spürbar leichtere Reinigung dank Abperleffekt. Besonders lohnt sie sich bei Fahrzeugen, deren Wert und Erscheinungsbild langfristig erhalten bleiben sollen:
>
> - Neuwagen – Schutz des empfindlichen Klarlacks ab dem ersten Kilometer.
> - Sport- und Luxusfahrzeuge – kompromissloser Werterhalt und dauerhafter Glanz.
> - Gebrauchtwagen – nach vorheriger Lackaufbereitung, ideal für hochwertige Fahrzeuge zum Werterhalt.
>
> Ob sich die Versiegelung für Ihr Fahrzeug lohnt, sagen wir Ihnen ehrlich nach einer kurzen Begutachtung.
>
> **Keramik- oder Nanoversiegelung – was ist besser?**
>
> Die Keramikversiegelung ist härter und hält deutlich länger, die Nanoversiegelung ist günstiger und schneller aufgetragen. Welche Lösung „besser" ist, hängt von Anspruch, Budget und Fahrzeug ab – hier die wichtigsten Unterschiede im Überblick:

**Vergleichstabelle (als Tabellen-Komponente übernehmen)**

| Kriterium | Keramikversiegelung | Nanoversiegelung |
|---|---|---|
| Haltbarkeit | Mehrere Jahre | Kürzer – ca. 12-18 Monate |
| Schutz & Härte | Sehr hart, glasartig – hoher Schutz | Guter Schutz, jedoch weicher |
| Glanz & Abperleffekt | Sehr intensiv | Gut |
| Aufwand | Meist 2-3 Tage | Deutlich geringer |
| Preis | Höher | Günstiger |
| Ideal für | Neuwagen, Sport-, Luxus- & Wertfahrzeuge | Preisbewusste Pflege mit kürzerer Haltedauer |

> Für Neuwagen, Sport- und Luxusfahrzeuge empfehlen wir in der Regel die Keramikversiegelung. Wer eine günstigere Lösung mit kürzerer Haltedauer sucht, ist mit unserer Nanoversiegelung gut beraten.
>
> **Vorteile und Nachteile einer Keramikversiegelung**
>
> Eine Keramikversiegelung bietet erhebliche Vorteile, hat aber auch Punkte, die man kennen sollte. Ein ehrlicher Überblick:
>
> **Vorteile:**
> - Langfristiger Lackschutz und Werterhalt
> - Intensiver Glanz und starker Abperleffekt
> - Leichtere Reinigung, weniger Anhaftung von Schmutz
> - Schutz vor UV-Strahlung, Chemie und Mikrokratzern
>
> **Nachteile / worauf Sie achten sollten:**
> - Höhere Kosten als Wachs oder eine Nanoversiegelung
> - Aufwendige Anwendung – der Lack muss vorher fachgerecht aufbereitet werden
> - Kein Schutz vor tiefen Kratzern und Steinschlägen
> - regelmäßige Wagenwäsche weiterhin erforderlich
>
> Genau deshalb führen wir jede Versiegelung in sorgfältiger Handarbeit und nach gründlicher Lackaufbereitung durch.

**FAQ – Keramikversiegelung (8 Fragen, mit FAQPage-Schema)**

**F: Was kostet eine Keramikversiegelung?**
A: Die Kosten richten sich nach Fahrzeuggröße, Lackzustand und Aufbau. Nach einer kurzen Begutachtung erhalten Sie ein transparentes Festpreis-Angebot – unverbindlich und auch ohne Termin. Aktuelle Preise finden Sie auf unserer Seite Preise.

**F: Wie lange hält eine Keramikversiegelung?**
A: Eine professionell aufgetragene Keramikversiegelung hält in der Regel mehrere Jahre. Die genaue Haltbarkeit hängt von Nutzung und Pflege ab – mit der richtigen Pflege bleibt der Schutz besonders lange erhalten.

**F: Wie lange dauert eine Keramikversiegelung?**
A: Je nach Fahrzeug und Lackzustand dauert die komplette Aufbereitung und Versiegelung in der Regel zwei bis vier Tage, da wir den Lack vor dem Auftragen gründlich vorbereiten.

**F: Lohnt sich eine Keramikversiegelung beim Neuwagen?**
A: Ja. Gerade beim Neuwagen ist der Klarlack noch im Rohzustand und besonders empfindlich. Eine Keramikversiegelung ab dem ersten Kilometer schützt den Lack, bevor erste Schäden entstehen, und erhält den Wert des Fahrzeugs.

**F: Keramikversiegelung oder Nanoversiegelung – was ist besser?**
A: Die Keramikversiegelung ist härter und langlebiger, die Nanoversiegelung günstiger und mit kürzerer Haltbarkeit. Für Neuwagen sowie Sport- und Luxusfahrzeuge empfehlen wir meist die Keramikversiegelung; wir beraten Sie gern individuell.

**F: Eignet sich eine Keramikversiegelung auch für Gebrauchtwagen?**
A: Ja. Bei Gebrauchtfahrzeugen bereiten wir den Lack vorher auf und entfernen Kratzer und Verunreinigungen, bevor wir die Keramikversiegelung auftragen – ideal zur Werterhaltung.

**F: Schützt eine Keramikversiegelung vor Steinschlag und Kratzern?**
A: Sie schützt zuverlässig vor Mikrokratzern, UV-Strahlung, Chemie und Verschmutzung. Tiefe Steinschläge kann sie nicht verhindern – dafür ist eine Lackschutzfolie die richtige Wahl. Gern beraten wir Sie zur passenden Lösung.

**F: Kann eine Keramikversiegelung wieder entfernt werden?**
A: Ja, allerdings nur mechanisch: In unseren internen Tests ließ sich die Versiegelung ausschließlich mit Schleifpaste und Poliermaschine entfernen. Das zeigt, wie widerstandsfähig die Schicht im Alltag ist.

> ⚠️ **Handlungsbedarf Überschriften:** Nach der H1 folgt direkt ein H3 (H2 wird übersprungen), und ein kompletter Textabsatz ist als H4 ausgezeichnet. In Next.js sauber H1 → H2 → H3 aufbauen.

---

### 6.5 Nanoversiegelung — `/leistungen/nanoversiegelung/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Nanoversiegelung fürs Auto in Saarlouis & im Saarland |
| **Meta-Description** | Auto-Nanoversiegelung im Saarland & Luxemburg – die preisbewusste Alternative zur Keramikversiegelung, Schutz bis zu 18 Monate. Seit 1997, über 642 Top-Bewertungen. |
| **Canonical** | https://www.pb-fahrzeugpflege.de/leistungen/nanoversiegelung/ |
| **Robots** | index, follow |
| **OG-Image** | `https://www.pb-fahrzeugpflege.de/wp-content/uploads/2021/03/jasper-geys-NyRe1Mj1pm4-unsplash-1024x684.jpg` |

**Überschriften**

- **H1:** Nanoversiegelung fürs Auto in Saarlouis, dem Saarland & Luxemburg
- H2: Easy-to-Clean: müheloser Glanz
- H2: Was kostet eine Nanoversiegelung?
- H2: Was bringt eine Nanoversiegelung – und ist sie sinnvoll?
- H2: Nano- oder Keramikversiegelung – was ist besser? (H3: Kriterium / Nanoversiegelung / Keramikversiegelung)
- H2: Vorteile und Nachteile einer Nanoversiegelung (H3: Vorteile: / Nachteile / worauf Sie achten sollten:)
- H2: Häufige Fragen zur Nanoversiegelung (7 × H3)

**Bilder**

| Datei | Alt-Text |
|---|---|
| `jasper-geys-NyRe1Mj1pm4-unsplash-scaled.jpg` | Fahrzeug auf einer Landstraße bei Sonnenuntergang – langanhaltender Lackschutz durch Nanoversiegelung |
| `erik-mclean-ZRns2R5azu0-unsplash-scaled.jpg` | *(CSS-Hintergrund)* |
| `245999_245001.png` | *(CSS-Hintergrund)* |
| `enrico-mantegazza-XH1DTvS1qCQ-unsplash-scaled.jpg` | *(CSS-Hintergrund)* |
| `cropped-jasper-geys-NyRe1Mj1pm4-unsplash-scaled-1.jpg` | *(CSS-Hintergrund)* |
| `cropped-cropped-cropped-cropped-Car-Detailing-goldenes-Auto-Fotolia-Vecteezy-scaled-2-1.jpeg` | *(CSS-Hintergrund)* |
| `cropped-20230220_171139-scaled-1.jpg` | *(CSS-Hintergrund)* |
| `theartofdetailing_seit_pure_black-png.png` | PB Fahrzeugpflege Saarlouis – The Art of Detailing |

**Fließtext (vollständig)**

> **Nanoversiegelung fürs Auto in Saarlouis, dem Saarland & Luxemburg**
>
> Eine Nanoversiegelung ist eine flüssige Schutzschicht, die sich fest mit dem Autolack verbindet und ihn – einfacher und günstiger als eine Keramikversiegelung – vor Umwelteinflüssen schützt. Bei PB Fahrzeugpflege Saarlouis verwenden wir eine hochwertige 1K-Nanoversiegelung, die bis zu viermal länger hält als eine herkömmliche Wachsversiegelung.
>
> Sie ist damit die preisbewusste Alternative zur Keramikversiegelung – für alle, die guten, langanhaltenden Lackschutz zu einem attraktiven Preis möchten.
>
> Die von uns verwendete 1K Nanoversiegelung ist den herkömmlichen Wachsversiegelungen deutlich überlegen. Diese legen sich nur auf die Lackoberfläche und werden durch Autowäsche, Waschanlage und Umwelteinwirkungen schnell wieder abgetragen. Selbst bei den teuersten Wachsen kann eine Standzeit über 4 Monate selten erreicht werden. Ganz anders die von uns verwendete 1K Nanoversiegelung. Diese verbindet sich fest mit der Lackstruktur und bietet Ihnen einen bisher unerreichten Glanz- und Glättegrad. Der langanhaltende Schutz bis zu 18 Monaten reduziert die Auswirkungen von aggressiven Umwelteinflüssen, UV-Strahlung und Streusalz.
>
> **Easy-to-Clean: müheloser Glanz**
>
> Dank des Abperleffekts lassen sich Anhaftungen wie Insekten, Vogelkot und Blütenstaub deutlich einfacher entfernen. Diese Easy-to-Clean-Performance sorgt für eine spürbar leichtere Wagenwäsche – Wasser und Schmutz perlen einfach ab.
>
> Sie möchten den bestmöglichen Schutz für Ihren Autolack? dann gehts hier zu unserer Keramikversiegelung!
>
> **Was kostet eine Nanoversiegelung?**
>
> Die Kosten einer Nanoversiegelung hängen von Fahrzeuggröße und Lackzustand ab. Als preisbewusste Alternative zur Keramikversiegelung ist sie deutlich günstiger. Nach einer kurzen Begutachtung erhalten Sie ein transparentes Angebot – unverbindlich und auch ohne Termin. Eine Übersicht finden Sie auf unserer Seite Preise.
>
> **Was bringt eine Nanoversiegelung – und ist sie sinnvoll?**
>
> Eine Nanoversiegelung schützt den Lack vor UV-Strahlung, Streusalz und Umwelteinflüssen, sorgt für intensiven Glanz und macht dank Abperleffekt die Wäsche leichter. Sinnvoll ist sie vor allem dann, wenn Sie guten, langanhaltenden Lackschutz zu einem attraktiven Preis möchten:
>
> - Alltags- und Gebrauchtfahrzeuge mit gutem Preis-Leistungs-Verhältnis
> - Als günstiger Einstieg in den professionellen Lackschutz
> - Wenn ein Schutz für etwa 1–1,5 Jahre statt mehrerer Jahre ausreicht
>
> Wünschen Sie den höchstmöglichen, langjährigen Schutz, ist unsere Keramikversiegelung die richtige Wahl – wir beraten Sie gern ehrlich.
>
> **Nano- oder Keramikversiegelung – was ist besser?**
>
> Die Nanoversiegelung ist günstiger und schneller aufgetragen, die Keramikversiegelung härter und langlebiger. Welche Lösung „besser" ist, hängt von Budget, Anspruch und Fahrzeug ab – hier die wichtigsten Unterschiede im Überblick:

| Kriterium | Nanoversiegelung | Keramikversiegelung |
|---|---|---|
| Haltbarkeit | Bis zu ca. 18 Monate | Mehrere Jahre |
| Schutz & Härte | Guter Schutz, flüssig aufgetragen | Sehr hart, glasartig – höherer Schutz |
| Glanz & Abperleffekt | Sehr gut (Easy-to-Clean) | Sehr intensiv |
| Aufwand | Geringer, schneller aufgetragen | sehr hoher Aufwand (2-3 Tage) |
| Preis | Günstiger | Höher |
| Ideal für | Preisbewusste Pflege, gutes Preis-Leistungs-Verhältnis | Neuwagen, Sport-, Luxus- & Wertfahrzeuge |

> Kurz gesagt: Wer ein gutes Preis-Leistungs-Verhältnis sucht, ist mit der Nanoversiegelung bestens beraten. Für maximalen, langjährigen Schutz empfehlen wir die Keramikversiegelung.
>
> **Vorteile und Nachteile einer Nanoversiegelung**
>
> Ein ehrlicher Überblick, damit Sie die richtige Wahl treffen:
>
> **Vorteile:**
> - Schutz bis zu 18 Monate – hält bis zu viermal länger als Wachs
> - Intensiver Glanz und Easy-to-Clean-Effekt
> - Schutz vor UV-Strahlung, Streusalz und Umwelteinflüssen
> - Deutlich günstiger als eine Keramikversiegelung
>
> **Nachteile / worauf Sie achten sollten:**
> - Kürzere Haltbarkeit als eine Keramikversiegelung
> - Weniger kratzbeständig als eine Keramikbeschichtung
> - Muss nach einiger Zeit erneuert werden

**FAQ – Nanoversiegelung (7 Fragen)**

**F: Was kostet eine Nanoversiegelung?**
A: Die Kosten richten sich nach Fahrzeuggröße und Lackzustand. Als preisbewusste Alternative zur Keramikversiegelung ist die Nanoversiegelung deutlich günstiger. Nach einer kurzen Begutachtung erhalten Sie ein transparentes Angebot – auch ohne Termin. Aktuelle Preise finden Sie auf unserer Seite Preise.

**F: Wie lange hält eine Nanoversiegelung?**
A: Unsere 1K-Nanoversiegelung bietet langanhaltenden Schutz von bis zu 18 Monaten – deutlich länger als herkömmliches Wachs, das selten über vier Monate hält. Die genaue Standzeit hängt von Nutzung und Pflege ab.

**F: Was ist der Unterschied zwischen Nano- und Keramikversiegelung?**
A: Die Keramikversiegelung ist härter und hält mehrere Jahre, ist aber teurer und aufwendiger. Die Nanoversiegelung ist die günstigere Lösung mit Schutz bis zu 18 Monaten. Für höchsten, langjährigen Schutz empfehlen wir Keramik; für ein gutes Preis-Leistungs-Verhältnis die Nanoversiegelung.

**F: Was bringt eine Nanoversiegelung beim Auto?**
A: Sie schützt den Lack vor UV-Strahlung, Streusalz und Umwelteinflüssen, sorgt für intensiven Glanz und einen Abperleffekt, der die Wäsche erleichtert (Easy-to-Clean). Außerdem hält sie deutlich länger als Wachs.

**F: Ist eine Nanoversiegelung sinnvoll?**
A: Ja, wenn Sie guten Lackschutz zu einem attraktiven Preis möchten. Sie hält deutlich länger als Wachs und lässt sich bei Bedarf später auf eine Keramikversiegelung upgraden.

**F: Nanoversiegelung oder Wachs – was hält länger?**
A: Die Nanoversiegelung hält klar länger: Während selbst teure Wachse selten über vier Monate halten, schützt unsere 1K-Nanoversiegelung bis zu 18 Monate und verbindet sich fest mit dem Lack, statt nur aufzuliegen.

**F: Hat eine Nanoversiegelung Nachteile?**
A: Im Vergleich zur Keramikversiegelung ist sie weniger kratzbeständig und muss früher erneuert werden. Dafür ist sie günstiger und schneller aufgetragen – ein sehr gutes Preis-Leistungs-Verhältnis

---
### 6.6 Fahrzeugaufbereitung — `/leistungen/fahrzeugaufbereitung/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Fahrzeugaufbereitung in Saarlouis & im Saarland |
| **Meta-Description** | Professionelle Fahrzeugaufbereitung innen & außen im Saarland & Luxemburg – Lack- und Innenraum Aufbereitung vom Profi, seit 1997. Über 642 Top-Bewertungen. |
| **Canonical** | https://www.pb-fahrzeugpflege.de/leistungen/fahrzeugaufbereitung/ |
| **Robots** | index, follow |
| **OG-Image** | ⚠️ nicht gesetzt |

**Überschriften**

- **H1:** Fahrzeugaufbereitung in Saarlouis, dem Saarland & Luxemburg
- H3: Lackaufbereitung – Perfekter Glanz und langanhaltender Schutz
- H3: Innenraumaufbereitung – Sauberkeit und Komfort auf höchstem Niveau
- H2: Was kostet eine Fahrzeugaufbereitung?
- H2: Fahrzeugaufbereitung im Saarland, in Saarlouis & Umgebung
- H2: Autowäsche oder Fahrzeugaufbereitung – der Unterschied (H3: Kriterium / Autowäsche / Fahrzeugaufbereitung)
- H2: Häufige Fragen zur Fahrzeugaufbereitung (6 × H3)

**Bilder**

| Datei | Rolle |
|---|---|
| `tim-meyer-timm-jpeg-9tzGmvumnHM-unsplash-scaled.jpg` | Hero-Hintergrund |
| `cropped-20240626_151618-scaled-1.jpg` | Sektions-Hintergrund |
| `cropped-cropped-cropped-cropped-cropped-Fotolia-Kermikversiegelung-Auftragung.jpg` | Sektions-Hintergrund |
| `cropped-20220421_143510-scaled-e1728466778968.jpg` | Sektions-Hintergrund |
| `theartofdetailing_seit_pure_black-png.png` | Logo |

**Fließtext (vollständig)**

> **Fahrzeugaufbereitung in Saarlouis, dem Saarland & Luxemburg**
>
> *[Tab-/Sprungmarken: Lackaufbereitung · Innenraumaufbereitung]*
>
> Bei einer professionellen Fahrzeugaufbereitung – auch Autoaufbereitung genannt – wird Ihr Fahrzeug innen und außen gründlich gereinigt, aufbereitet und geschützt: weit mehr als eine normale Autowäsche.
>
> Bei PB Fahrzeugpflege Saarlouis umfasst unser Premium-Detailing-Paket ein mehrstufiges, individuell abgestimmtes Programm aus Lack- und Innenraumaufbereitung und dauert je nach Umfang in der Regel zwei bis drei Werktage.
>
> **Lackaufbereitung – Perfekter Glanz und langanhaltender Schutz**
>
> Für Fahrzeugliebhaber, die ihr Auto in perfektem Zustand genießen möchten:
>
> - Vorreinigung mit Hochdruck: Gründliche Entfernung von grobem Schmutz.
> - Handwäsche von Profis: Schonende Reinigung, die jedes Detail berücksichtigt.
> - Spezialreinigung: Embleme, Schriftzüge und Auspuffblenden werden akribisch gepflegt.
> - Entfernung von Lackverunreinigungen: Beseitigung von Insekten, Teer, Flugrost und mehr.
> - Felgenreinigung: Tiefenreinigung für strahlenden Glanz.
> - Maschinelle & manuelle Lackreinigung: Entfernt tiefsitzenden Schmutz und Kratzer.
> - Politur: Anti-Hologramm Hochglanzpolitur für makellosen Glanz.
> - Versiegelung: Auswahl aus Carnaubawachs, Nanoversiegelung oder 9H High-End Keramikversiegelung für optimalen Schutz.
>
> Für Verkauf oder Leasingrückgabe:
>
> - Wertsteigerung: Der makellose Zustand optimiert den Verkaufspreis.
> - Erster Eindruck: Ein glänzendes Fahrzeug hinterlässt bleibenden Eindruck.
> - Nachberechnungen bei Leasingrückgabe minimieren: Perfekte Vorbereitung für die Leasingrückgabe.
>
> …sowie weitere, individuelle Leistungen nach Absprache
>
> Je nach Zweck der Aufbereitung (Hochzeit, Fahrzeugverkauf, Leasingrückgabe, Werterhalt etc.) bieten wir verschiedene Detailing Levels an. Gerne beraten wir Sie ausführlich in einem persönlichen Gespräch direkt bei uns vor Ort. Hierzu ist kein Termin erforderlich.
>
> Dauer ca. 2-3 Werktage
>
> **Innenraumaufbereitung – Sauberkeit und Komfort auf höchstem Niveau**
>
> Für Fahrzeugbesitzer, die das Beste aus ihrem Innenraum herausholen möchten:
>
> - Gründliche Staubsaugung: Erfasst auch schwer zugängliche Bereiche.
> - Tiefenreinigung von Polstern und Teppichen: Entfernt tiefsitzenden Schmutz und Flecken.
> - Lederpflege: Reinigung und Pflege für langanhaltenden Schutz und Geschmeidigkeit.
> - Kunststoff- und Armaturenpflege: Sorgt für ein makelloses Finish.
> - Scheibenreinigung: Für eine klare Sicht und strahlende Sauberkeit.
> - Desinfektion & Geruchsbeseitigung: Frisches, hygienisches Innenraumklima.
> - Wertsteigerung: Ein sauberer, gepflegter Innenraum erhöht den Wiederverkaufswert.
> - Positiver erster Eindruck: Ein neuwertiger Innenraum überzeugt sofort.
> - Minimierung von Nachberechnungen: Optimale Vorbereitung für eine problemlose Rückgabe.
>
> **Was kostet eine Fahrzeugaufbereitung?**
>
> Die Kosten einer Fahrzeugaufbereitung hängen von Fahrzeuggröße, Zustand und gewünschtem Umfang ab – eine reine Innenraumaufbereitung kostet weniger als eine komplette Aufbereitung mit Lackpolitur und Versiegelung. Da wir jedes Fahrzeug individuell beurteilen, erstellen wir Ihnen nach einer kurzen Begutachtung ein transparentes Angebot, unverbindlich und ohne Termin. Eine Übersicht finden Sie auf unserer Seite Preise.
>
> **Fahrzeugaufbereitung im Saarland, in Saarlouis & Umgebung**
>
> Sie finden uns in der Provinzialstraße 243 in 66806 Ensdorf – direkt bei Saarlouis. Zu uns kommen Kunden aus dem gesamten Saarland, u. a. aus Saarlouis, Saarbrücken, Dillingen und St. Wendel, sowie aus Trier, Luxemburg und dem grenznahen Raum. Eine unverbindliche Begutachtung ist während der Öffnungszeiten auch ohne Termin möglich.
>
> **Autowäsche oder Fahrzeugaufbereitung – der Unterschied**
>
> Eine Autowäsche reinigt das Fahrzeug oberflächlich, eine Fahrzeugaufbereitung reinigt, bereitet auf und schützt Innenraum und Lack mehrstufig. Der Unterschied im Überblick:

| Kriterium | Autowäsche | Fahrzeugaufbereitung |
|---|---|---|
| Umfang | Schnelle Außenreinigung | Mehrstufige Reinigung & Aufbereitung innen und außen |
| Lack | Nur oberflächlich sauber | Reinigung, Politur und Versiegelung |
| Innenraum | Meist nicht enthalten | Tiefenreinigung von Polstern, Leder, Desinfektion |
| Dauer | Wenige Minuten | In der Regel 2–3 Werktage |
| Ergebnis | Sauberkeit auf Zeit | Werterhalt & langanhaltender Schutz |

**FAQ – Fahrzeugaufbereitung (6 Fragen)**

**F: Was kostet eine Fahrzeugaufbereitung?**
A: Die Kosten richten sich nach Fahrzeuggröße, Zustand und Umfang. Eine reine Innenraumaufbereitung ist günstiger als eine komplette Aufbereitung mit Lackpolitur und Versiegelung. Nach einer kurzen Begutachtung erhalten Sie ein transparentes Angebot – auch ohne Termin. Preise finden Sie auf unserer Seite Preise.

**F: Wie lange dauert eine Fahrzeugaufbereitung?**
A: Je nach Umfang und Fahrzeugzustand dauert eine komplette Fahrzeugaufbereitung in der Regel zwei bis drei Werktage, da wir in mehreren Stufen und in Handarbeit arbeiten.

**F: Was gehört zu einer professionellen Fahrzeugaufbereitung?**
A: Eine professionelle Fahrzeugaufbereitung umfasst die Außen- bzw. Lackaufbereitung (Vorwäsche, Handwäsche, Lackreinigung, Politur und Versiegelung) sowie die Innenraumaufbereitung (Staubsaugen, Polster- und Lederreinigung, Kunststoffpflege, Scheiben und Desinfektion).

**F: Lohnt sich eine Fahrzeugaufbereitung vor dem Verkauf?**
A: Ja. Ein makelloser Zustand steigert den Verkaufspreis, sorgt für einen starken ersten Eindruck und minimiert bei einer Leasingrückgabe mögliche Nachberechnungen.

**F: Was kostet eine Innenraumaufbereitung?**
A: Eine reine Innenraumaufbereitung kostet weniger als eine komplette Aufbereitung. Der genaue Preis hängt vom Verschmutzungsgrad und der Fahrzeuggröße ab – ein verbindliches Angebot erhalten Sie nach kurzer Begutachtung.

**F: Was ist der Unterschied zwischen einer Autowäsche und einer Fahrzeugaufbereitung?**
A: Eine Autowäsche reinigt das Fahrzeug nur oberflächlich. Eine Fahrzeugaufbereitung reinigt, poliert, versiegelt und bereitet zusätzlich den Innenraum auf – das Ergebnis ist Werterhalt und langanhaltender Schutz statt kurzfristiger Sauberkeit.

---

### 6.7 Lack- und Beulendoktor / Smart Repair — `/leistungen/lack-und-beulendoktor/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Beulendoktor & Smart Repair in Saarlouis & im Saarland |
| **Meta-Description** | Beulendoktor & Smart Repair im Saarland & Luxemburg – Dellen und Lackschäden ohne Lackieren reparieren, bis zu 70 % günstiger. Seit 1997, über 600 Top-Bewertungen. |
| **Canonical** | https://www.pb-fahrzeugpflege.de/leistungen/lack-und-beulendoktor/ |
| **Robots** | index, follow |
| **OG-Image** | ⚠️ nicht gesetzt |

**Überschriften**

- **H1:** Beulendoktor & Smart Repair in Saarlouis, dem Saarland & Luxemburg
- H3: Smart Repair Saarland – Lackschäden günstig reparieren
- H3: Beulendoktor Saarland – Ausbeulen ohne Lackieren
- H2: Was kostet Smart Repair?
- H2: Wie funktioniert die Ausbeultechnik? Dellen ohne Lackieren
- H2: Smart Repair oder klassische Lackierung – der Unterschied (H3: Merkmal / Smart Repair / Klassische Lackierung)
- H2: Typische Schäden: Parkdellen, Steinschläge & mehr
- H2: Smart Repair & Beulendoktor im Saarland
- H2: Häufige Fragen zu Smart Repair & Beulendoktor (6 × H3)

**Bilder**

| Datei | Rolle |
|---|---|
| `joshua-fuller-LZdNqhJgSK8-unsplash-scaled.jpg` | Hero-Hintergrund |
| `cropped-cropped-20220531_183200-scaled-1.jpg` | Sektions-Hintergrund |
| `cropped-cropped-cropped-Fotolia-Kermikversiegelung-Auftragung.jpg` | Sektions-Hintergrund |
| `cropped-cropped-cropped-cropped-Car-Detailing-goldenes-Auto-Fotolia-Vecteezy-scaled-2-1.jpeg` | Sektions-Hintergrund |
| `cropped-20240827_141559-scaled-e1728466843212.jpg` | Sektions-Hintergrund (roter BMW nach Smart Repair) |
| `cropped-maxresdefault-20.jpg` | Sektions-Hintergrund |
| `theartofdetailing_seit_pure_black-png.png` | Logo |

**Fließtext (vollständig)**

> **Beulendoktor & Smart Repair in Saarlouis, dem Saarland & Luxemburg**
>
> *[Tabs: Smart Repair · Beulendoktor]*
>
> **Smart Repair Saarland – Lackschäden günstig reparieren**
>
> Beulendoktor & Smart Repair bei PB Fahrzeugpflege Saarlouis
>
> Lackschäden und Beulen am Fahrzeug schnell, effektiv und kostengünstig reparieren. Das haben wir von PB Fahrzeugpflege Saarlouis® uns auf die Fahnen geschrieben. Wir wissen, dass Ihr Fahrzeug mehr ist als nur ein Transportmittel – es ist ein wertvolles Gut, das perfekte Pflege verdient. Unser Smart Repair Verfahren bietet Ihnen die ideale Lösung, um Lackschäden schnell, effektiv und kostengünstig zu beheben – und das in einer Qualität, die nur ein Premiumbetrieb wie unserer garantieren kann.
>
> Ihre Smart Repair Vorteile:
>
> - Über 29 Jahre Erfahrung: Vertrauen Sie auf unsere langjährige Expertise in der Reparatur von Beulen und Lackschäden.
> - Ausgezeichnete Qualität: Wir wurden mehrfach für unseren erstklassigen Service und unsere herausragende Qualität ausgezeichnet.
> - Hohe Kundenzufriedenheit: Mit einer Weiterempfehlungsrate von über 95% wissen Sie, dass Sie bei uns in besten Händen sind.
> - Schnelle Reparaturzeit: Beulenreparatur ca. 0,5 Werktage, Lackreparaturen ca. 3 Werktage – perfekt für Leasingrückgaben oder den Fahrzeugverkauf.
> - Kostenersparnis: Mit Smart Repair bis zu 70% sparen gegenüber herkömmlichen Lackierungen, ohne Kompromisse bei der Qualität.
> - Umweltschonend: Durch geringeren Materialverbrauch und nachhaltige Lackreparatur tragen wir aktiv zum Umweltschutz bei.
> - Wertsteigerung: Kleinere Reparaturflächen bedeuten weniger Wertminderung – Ihr Fahrzeug bleibt wertvoll.
>
> Unsere Philosophie: Qualität steht bei uns an erster Stelle. Wir setzen modernste Techniken ein, um sicherzustellen, dass die Reparatur den höchsten Standards entspricht – ohne Kompromisse. Sollten wir mit Smart Repair Grenzen erreichen, bieten wir dank unserer Zusammenarbeit mit den besten KFZ Gutachtern, Karosseriebauern und KFZ Lackierbetrieben auch umfangreichere Reparaturmethoden an.
>
> Ihr Vorteil: Alles aus einer Hand, alles in Premiumqualität. Sie brauchen sich um nichts zu kümmern!
>
> Zögern Sie nicht – kommen Sie einfach ohne Termin vorbei und lassen Sie sich persönlich von uns beraten.
>
> Sie haben einen Unfallschaden am Auto? Dann klicken Sie bitte unten auf den Button UNFALLSCHADEN
>
> *[Buttons: Jetzt anfragen → /kontakt/ · Unfallschaden → /unfallschaden/]*
>
> **Beulendoktor Saarland – Ausbeulen ohne Lackieren**
>
> Warum unnötig viel Geld für Spachteln und Lackieren ausgeben, wenn es auch einfacher geht? Bei PB Fahrzeugpflege Saarlouis® bieten wir Ihnen eine hochwertige Lösung, um kleinere Dellen und Beulen am Auto zu entfernen – ohne den Lack Ihres Fahrzeugs zu beschädigen. Unser Beulendoktor bzw Dellendoktor Verfahren setzt auf modernste Hebel- und Klebetechniken, die den Wert Ihres Fahrzeugs erhalten und perfekte Ergebnisse liefern.
>
> Ihre Vorteile mit unserem Beulendoktor:
>
> - Lackschadenfreie Ausbeultechnik: Entfernt Beulen und Dellen, ohne den Lack zu beeinträchtigen.
> - Über 27 Jahre Erfahrung: Vertrauen Sie auf unsere Beulendoktor Expertise und Präzision
> - Spezialisierung auf moderne Materialien: Sicheres Arbeiten auch bei Aluminiumbauteilen und Thermoglas.
> - Erfahrung zählt: Fachgerechte Reparaturen, die verhindern, dass aus kleinen Beulen große Probleme werden.
> - Über 600 positive Bewertungen: Zufriedene Kunden sprechen für sich.
>
> Vermeiden Sie unnötige Schäden durch unprofessionelle Beulen Reparaturen und kommen Sie direkt zu den Experten. Wir bieten Ihnen eine unverbindliche Begutachtung Ihres Schadens – jederzeit und ohne Termin. Vertrauen Sie auf Qualität, die überzeugt, und erleben Sie den Unterschied, den nur echte Profis bieten können.
>
> Größerer Schaden? Dann klicken Sie bitte UNFALLSCHADEN
>
> *[Buttons: JETZT ANFRAGEN → /kontakt/ · UNFALLSCHADEN → /unfallschaden/]*
>
> **Was kostet Smart Repair?**
>
> Die Kosten für Smart Repair hängen von Art, Größe und Lage des Schadens ab. Da nur die beschädigte Stelle bearbeitet wird, ist Smart Repair bis zu 70 % günstiger als eine herkömmliche Lackierung des gesamten Bauteils. Den genauen Preis nennen wir Ihnen nach einer kurzen, unverbindlichen Begutachtung – auch ohne Termin. Eine Übersicht finden Sie auf unserer Seite Preise.
>
> **Wie funktioniert die Ausbeultechnik? Dellen ohne Lackieren**
>
> Ja – kleinere Dellen und Beulen lassen sich ohne Lackieren entfernen. Bei der lackschadenfreien Ausbeultechnik (auch Paintless Dent Repair) wird die Delle mit speziellen Hebel- und Klebewerkzeugen vorsichtig von hinten oder außen zurück in ihre ursprüngliche Form gebracht – der Originallack bleibt dabei vollständig erhalten. Das ist schneller und günstiger als Spachteln und Lackieren und vermeidet eine Wertminderung durch nachlackierte Teile.
>
> **Smart Repair oder klassische Lackierung – der Unterschied**
>
> Smart Repair repariert kleine Schäden punktuell und günstig, eine klassische Lackierung erneuert ganze Bauteile. Der Unterschied im Überblick:

| Merkmal | Smart Repair | Klassische Lackierung |
|---|---|---|
| Kosten | Bis zu 70 % günstiger | Höher – ganzes Bauteil |
| Umfang | Punktuelle Reparatur kleiner Schäden | Lackierung kompletter Bauteile |
| Dauer | Beule ca. 0,5, Lack ca. 3 Werktage | Meist länger |
| Wertminderung | Gering – kleine Reparaturfläche | Höher, ggf. dokumentationspflichtig |
| Ideal für | Parkdellen, kleine Lack- & Karosserieschäden | Großflächige oder tiefe Schäden |

> Bei größeren oder tiefen Schäden – etwa nach einem Unfall – bieten wir dank unserer Zusammenarbeit mit Gutachtern, Karosseriebauern und Lackierbetrieben auch umfangreichere Reparaturen an: alles aus einer Hand
>
> **Typische Schäden: Parkdellen, Steinschläge & mehr**
>
> Mit Smart Repair und unserer Ausbeultechnik beheben wir unter anderem Parkdellen, Türkantendellen, kleinere Beulen, Steinschläge und kleine Lackkratzer. So bleibt Ihr Fahrzeug optisch und im Wert erhalten – ohne aufwendige Komplettlackierung.
>
> **Smart Repair & Beulendoktor im Saarland**
>
> Sie finden uns in der Provinzialstraße 243 in 66806 Ensdorf – direkt bei Saarlouis. Als Lack- und Beulendoktor sind wir für Kunden aus dem gesamten Saarland da, u. a. aus Saarlouis, Saarbrücken, Dillingen und St. Wendel, sowie aus Luxemburg und dem grenznahen Raum. Eine unverbindliche Begutachtung Ihres Schadens ist während der Öffnungszeiten auch ohne Termin möglich.

**FAQ – Smart Repair & Beulendoktor (6 Fragen)**

**F: Was kostet Smart Repair?**
A: Die Kosten richten sich nach Art, Größe und Lage des Schadens. Da nur die beschädigte Stelle bearbeitet wird, ist Smart Repair bis zu 70 % günstiger als eine herkömmliche Lackierung. Den genauen Preis nennen wir Ihnen nach einer kurzen Begutachtung – auch ohne Termin.

**F: Kann man Dellen ohne Lackieren entfernen?**
A: Ja. Kleinere Dellen und Beulen lassen sich mit der lackschadenfreien Ausbeultechnik entfernen, ohne den Originallack zu beschädigen – das ist schneller und günstiger als Spachteln und Lackieren.

**F: Wie funktioniert die Ausbeultechnik beim Beulendoktor?**
A: Bei der Ausbeultechnik wird die Delle mit speziellen Hebel- und Klebewerkzeugen vorsichtig zurück in die ursprüngliche Form gebracht. Der Lack bleibt dabei vollständig erhalten – auch bei modernen Materialien wie Aluminium.

**F: Was ist der Unterschied zwischen Smart Repair und einer Lackierung?**
A: Smart Repair repariert kleine Schäden punktuell und ist deutlich günstiger und schneller. Eine klassische Lackierung erneuert ganze Bauteile und ist aufwendiger. Für kleine Dellen und Lackschäden ist Smart Repair meist die bessere Wahl.

**F: Wie lange dauert eine Beulenreparatur?**
A: Eine Beulenreparatur dauert in der Regel etwa einen halben Werktag, eine Lackreparatur ca. drei Werktage – ideal vor einer Leasingrückgabe oder einem Fahrzeugverkauf.

**F: Lohnt sich Smart Repair?**
A: Ja. Smart Repair ist bis zu 70 % günstiger als eine Lackierung, schneller erledigt und verursacht durch die kleine Reparaturfläche weniger Wertminderung – Ihr Fahrzeug bleibt wertvoll.

> ⚠️ **Inkonsistenz:** Auf derselben Seite steht einmal „Über 29 Jahre Erfahrung" (Smart Repair) und einmal „Über 27 Jahre Erfahrung" (Beulendoktor). Beim Relaunch vereinheitlichen – idealerweise dynamisch aus dem Gründungsjahr 1997 berechnen.

---
### 6.8 Unfallschaden — `/unfallschaden/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Unfallschaden & Unfallinstandsetzung in Saarlouis & im Saarland |
| **Meta-Description** | Unfallschaden im Saarland? Wir regeln alles aus einer Hand – Gutachter, Anwalt, Leihwagen & fachgerechte Karosserieinstandsetzung. Freie Werkstattwahl, ohne Termin. |
| **Canonical** | https://www.pb-fahrzeugpflege.de/unfallschaden/ |
| **Robots** | index, follow |
| **OG-Image** | `https://www.pb-fahrzeugpflege.de/wp-content/uploads/2026/02/cropped-iStock-1892181739.jpg` |

**Überschriften**

- **H1:** Unfallschaden im Saarland – Abwicklung & Unfallinstandsetzung aus einer Hand
- H2: Unfall gehabt? Bleiben Sie entspannt – wir sind für Sie da!
  - H3: Was jetzt Ihre Aufgabe ist:
  - H3: …den kompletten Rest übernehmen wir kostenlos* für Sie:
  - H3: Sie sprechen mit uns – Wir sprechen mit allen anderen.
  - H3: Besonders wichtig bei hochwertigen Fahrzeugen
- H2: Versicherungswerkstatt oder eigene Entscheidung?
- H2: Wer zahlt nach einem Unfall?
- H2: Unfallinstandsetzung & Karosseriearbeiten im Saarland
- H2: Häufige Fragen zum Unfallschaden (6 × H3)

**Bilder**

| Datei | Alt-Text |
|---|---|
| `cropped-iStock-1892181739.jpg` | Fahrzeug mit geöffneter Motorhaube in der Werkstatt – Unfallinstandsetzung bei PB Fahrzeugpflege Saarlouis |
| `cropped-felipe-simo-NjLDPRFmvM4-unsplash-scaled-1.jpg` | *(CSS-Hintergrund)* |
| `cropped-20240701_084701_resized-scaled-e1728466903608.jpg` | *(CSS-Hintergrund – grüner VW-Bus SR3 Saarlandwelle)* |
| `cropped-20220421_143510-scaled-e1728466778968.jpg` | *(CSS-Hintergrund)* |
| `theartofdetailing_seit_pure_black-png.png` | PB Fahrzeugpflege Saarlouis – The Art of Detailing |

**Fließtext (vollständig)**

> **Unfallschaden im Saarland – Abwicklung & Unfallinstandsetzung aus einer Hand**
>
> Wir kümmern uns um alles!
>
> Nach einem unverschuldeten Unfall im Saarland übernehmen wir für Sie die komplette Schadenabwicklung und die fachgerechte Reparatur Ihres Fahrzeugs – von der Begutachtung über die Kommunikation mit der Versicherung bis zur Karosserieinstandsetzung nach Herstellervorgaben. Alles aus einer Hand, ganz ohne Stress.
>
> Unfall gehabt? Bleiben Sie entspannt – wir sind für Sie da. Bei einem Autounfall geht es nicht nur um einen Schaden, sondern um Kontrolle, um Ihr Recht und um den tatsächlichen Wert Ihres Fahrzeugs. Genau dabei unterstützen wir Sie.
>
> **Unfall gehabt? Bleiben Sie entspannt – wir sind für Sie da!**
>
> Bei einem Autounfall geht es nicht nur um einen Schaden. Es geht um Kontrolle. Um Ihr Recht. Um den tatsächlichen Wert Ihres Fahrzeugs.
>
> Vielleicht fragen Sie sich gerade:
>
> - Wer zahlt das alles?
> - Versucht die Versicherung mich abzuzocken?
> - Muss ich in eine Partnerwerkstatt oder habe ich freie Werkstattwahl?
> - Was ist mit einer evtl. Wertminderung?
> - Wie lange bin ich ohne Fahrzeug?
>
> **Was jetzt Ihre Aufgabe ist:**
>
> - Erste Hilfe/Polizei (falls erforderlich)
> - Unfallstelle absichern
> - Beweisfotos von der Unfallstelle (wichtig wegen Schuldfrage/Zeugen)
> - Datenaustausch (Personalausweis zeigen lassen, Versicherungsnummer, Kennzeichen)
>
> **…den kompletten Rest übernehmen wir kostenlos\* für Sie:**
>
> - Unabhängiger Gutachter
> - Fachanwalt für Verkehrsrecht
> - Leihfahrzeug
> - Kommunikation mit der gegnerischen Versicherung
> - Karosserieinstandsetzung/Lackierung nach Herstellervorgaben
> - Dokumentation für Wiederverkauf oder Leasingrückgabe
> - nur ein Ansprechpartner für Alles
>
> (\*kostenlos für Sie bei Haftpflichtschäden)
>
> **Sie sprechen mit uns – Wir sprechen mit allen anderen.**
>
> Sie erhalten eine klare Einschätzung.
> Was sinnvoll ist.
> Was wirtschaftlich ist.
> Und was Sie besser nicht akzeptieren sollten.
>
> Keine Werkstattkette.
> Keine Schnellabfertigung.
> Keine Kompromisse auf Kosten des Fahrzeugwertes.
>
> **Besonders wichtig bei hochwertigen Fahrzeugen**
>
> Bei Premium- und Sportfahrzeugen entscheidet die Qualität der Instandsetzung direkt über den Marktwert.
>
> - Unsachgemäße Reparaturen
> - Falsche Lackschichtstärken
> - Fehlende Dokumentation
> - Unprofessionelle Smart Repair Lösungen
>
> All das bleibt im Fahrzeug. Und spätestens beim Verkauf oder bei der Leasingrückgabe kommt es ans Licht. Gerade bei höherwertigen Fahrzeugen ist die merkantile Wertminderung ein ernstes Thema. Hier geht es nicht um ein paar Euro. Hier geht es um Substanz. Wer hier billig repariert, zahlt später doppelt.
>
> **Versicherungswerkstatt oder eigene Entscheidung?**
>
> Viele Versicherer versuchen, Sie in die „Partnerwerkstatt" zu bekommen. Das geht dann „schnell, standardisiert, kosteneffizient". Hört sich gut an, ist aber für Sie die denkbarste, schlechteste Lösung!
>
> Denn: Die Versicherung denkt in Schadenssummen. Wir denken in Werterhalt.
>
> Sie haben das Recht auf eine fachgerechte Reparatur. Und das Recht auf unabhängige Unterstützung. Nutzen Sie es!
>
> Wenn Sie gerade betroffen sind, handeln Sie jetzt. Lassen Sie den Schaden von uns professionell und kostenlos prüfen, bevor Sie irgendetwas unterschreiben oder zusagen.
>
> Rufen Sie uns an oder kommen Sie direkt vorbei, ohne Termin! Wir schaffen Klarheit. Und Ihnen den Stress vom Hals.
>
> *[Button: Schaden checken lassen]* — Foto per WhatsApp oder Formular, Rückmeldung kurzfristig
>
> **Wer zahlt nach einem Unfall?**
>
> Bei einem unverschuldeten Unfall trägt in der Regel die Haftpflichtversicherung des Unfallverursachers die Kosten – darunter die Reparatur, ein unabhängiges Gutachten, ein Ersatzfahrzeug und in vielen Fällen auch einen Anwalt. Für Sie ist unsere Unterstützung in diesen Fällen daher kostenlos. Im Zweifel prüfen wir Ihren Fall unverbindlich, bevor Sie etwas unterschreiben.
>
> **Unfallinstandsetzung & Karosseriearbeiten im Saarland**
>
> Wir setzen Ihr Fahrzeug nach einem Unfall fachgerecht und nach Herstellervorgaben instand – von der Karosserieinstandsetzung über die Lackierung bis zur Dokumentation für Wiederverkauf oder Leasingrückgabe. Dank unseres Netzwerks aus Karosseriebauern, Lackierern und unabhängigen Gutachtern erhalten Sie alles aus einer Hand.
>
> Sie finden uns in der Provinzialstraße 243 in 66806 Ensdorf – direkt bei Saarlouis. Wir sind für Kunden aus dem gesamten Saarland da, u. a. aus Saarlouis, Saarbrücken, Dillingen und St. Wendel, sowie aus dem grenznahen Raum. Eine unverbindliche Begutachtung ist auch ohne Termin möglich – senden Sie uns gern vorab ein Foto per WhatsApp oder über unser Formular.

**FAQ – Unfallschaden (6 Fragen)**

**F: Was tun nach einem Autounfall?**
A: Sichern Sie zuerst die Unfallstelle, leisten Sie bei Bedarf Erste Hilfe und rufen Sie die Polizei, machen Sie Beweisfotos und tauschen Sie die Daten mit dem Unfallgegner aus (Versicherungsnummer, Kennzeichen). Die weitere Abwicklung übernehmen wir für Sie.

**F: Wer zahlt nach einem Unfall?**
A: Bei einem unverschuldeten Unfall trägt in der Regel die Haftpflichtversicherung des Unfallverursachers die Kosten – Reparatur, Gutachten, Ersatzfahrzeug und häufig auch den Anwalt. Für Sie ist unsere Unterstützung in diesen Fällen kostenlos.

**F: Muss ich in die Partnerwerkstatt der Versicherung?**
A: Nein. Bei einem unverschuldeten Unfall müssen Sie sich nicht in die Partnerwerkstatt schicken lassen – Sie entscheiden selbst, wer Ihr Fahrzeug repariert.

**F: Habe ich freie Werkstattwahl?**
A: Ja. Bei einem unverschuldeten Unfall haben Sie das Recht auf freie Werkstattwahl und auf eine fachgerechte, unabhängige Reparatur.

**F: Was ist eine merkantile Wertminderung?**
A: Das ist der Wertverlust, den ein Fahrzeug trotz fachgerechter Reparatur allein dadurch erleidet, dass es als Unfallfahrzeug gilt. Gerade bei hochwertigen Fahrzeugen kann dieser Betrag erheblich sein.

**F: Ist ein Parkschaden ein Unfallschaden?**
A: Grundsätzlich ja: Ein Parkschaden zählt als Unfallschaden, da er durch ein äußeres Ereignis entstanden ist. Ob und wie er reguliert wird, hängt vom Einzelfall und der Schuldfrage ab – wir prüfen das gern unverbindlich für Sie.

---

### 6.9 Preise — `/preise/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Preise – Fahrzeugaufbereitung im Saarland |
| **Meta-Description** | Was kostet eine Fahrzeugaufbereitung oder Keramikversiegelung? Da jedes Fahrzeug anders ist, erstellen wir nach einer Begutachtung Ihr individuelles Angebot. |
| **Canonical** | https://www.pb-fahrzeugpflege.de/preise/ |
| **Robots** | index, follow |
| **OG-Image** | ⚠️ nicht gesetzt |

**Überschriften**

- **H1:** Preise

**Bilder:** `alessio-lin-6LYjG0H32E-unsplash-scaled.jpg` (Hero-Hintergrund), Logo, `star.svg`

**Fließtext (vollständig)**

> **Preise**
>
> Die Frage nach dem Preis ist naheliegend. Doch jeder Auftrag und jeder Kunde hat sein eigenes Motiv. Worum geht es bei Ihrem Fahrzeug?
>
> **Leasingrückgabe – Kosten vermeiden**
> Wir sorgen dafür, dass Ihr Fahrzeug so übergeben wird, dass unnötige Nachzahlungen an den Leasinggeber vermieden werden. Gründlich, zielgerichtet und ohne Überraschungen.
>
> **Fahrzeugverkauf – Wert steigern**
> Ein aufbereitetes Fahrzeug verkauft sich schneller und zu besseren Konditionen. Wir holen optisch und technisch das Maximum heraus, damit Ihr Wagen den bestmöglichen Eindruck hinterlässt.
>
> **Sammlerfahrzeug – Wert erhalten**
> Hier geht es nicht um den schnellen Glanz, sondern um langfristigen Werterhalt. Mit Fingerspitzengefühl und Erfahrung schützen wir, was Ihnen wichtig ist – über Jahre hinweg.
>
> **Lack- & Beulendoktor-Arbeiten – Präzision statt Flickwerk**
> Ob kleine Dellen oder Lackschäden: Unser Anspruch ist, dass Sie nachher nichts mehr sehen. Präzise, sauber und fachgerecht – ohne billige Kompromisse.
>
> **Keramikversiegelung – Schutz & Perfektion**
> Die Königsklasse unserer Arbeit: Ein mehrstufiger Prozess, der für maximalen Schutz, langanhaltenden Glanz und ein perfektes Finish sorgt. Kein Produkt von der Stange, sondern Handwerk auf höchstem Niveau.
>
> Sicher verstehen Sie jetzt, warum bei uns jeder Auftrag mit einer Analyse beginnt. Wir sehen uns Ihr Fahrzeug im Detail an, sprechen über Ihre Ziele und sagen offen, was wirklich sinnvoll ist – und was nicht.
>
> Um es klar zu sagen: Jahrzehntelange Erfahrung, durchdachte Abläufe, hochwertigste Materialien und vor allem Zeit gibt es nicht zum Billigpreis. Ja, es gibt günstigere Anbieter – die meisten sogar. Doch wer nur nach dem niedrigsten Preis sucht, bekommt selten den höchsten Wert.
>
> Wir stehen für Qualität statt Kompromisse. Für eine klare Linie. Für Ergebnisse, die überzeugen – unabhängig davon, welches Ziel Sie mit Ihrem Fahrzeug verfolgen. Darum geben wir keine Pauschalpreise am Telefon oder per Mail.
>
> Wenn all das für Sie logisch klingt, sind Sie bei uns richtig.
>
> Kommen Sie ohne Termin vorbei – lassen Sie uns Ihr Fahrzeug gemeinsam ansehen. So entsteht ein individuelles Angebot, das zu Ihrem Fahrzeug und Ihrem Ziel passt. Denn bei uns beginnt Premium schon bei der Beratung.

**Konkrete Preisangaben auf der Website** (stehen nicht auf `/preise/`, sondern in der FAQ – beim Relaunch prüfen, ob sie auf die Preisseite gehören):

- Keramikversiegelung: **1.500 – 1.900 €** (Orientierungswert, `/faq/`)
- Leihwagen: **ab 55 € pro Tag** (`/faq/`)
- Smart Repair: bis zu **70 % günstiger** als klassische Lackierung
- Kostenvoranschlag: bis zu **15 %** des voraussichtlichen Auftragswertes (AGB § 3)

**FAQ:** keine auf dieser Seite. Die H2-artigen Zwischentitel sind im Original **kein** Überschriften-Markup – beim Relaunch als H2 auszeichnen.

---

### 6.10 FAQ — `/faq/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | FAQ Keramikversiegelung und Fahrzeugaufbereitung Saarlouis |
| **Meta-Description** | Häufige Fragen zu Keramikversiegelung & Fahrzeugaufbereitung: Kosten, Haltbarkeit, Ablauf, Pflege und Waschanlage – klar und praxisnah beantwortet. |
| **Canonical** | https://www.pb-fahrzeugpflege.de/faq/ |
| **Robots** | index, follow |
| **OG-Image** | ⚠️ nicht gesetzt |

**Überschriften**

- **H1:** FAQ – Keramikversiegelung und Fahrzeugaufbereitung
- H4: *(Intro-Text, siehe unten – im Original fälschlich als H4 ausgezeichnet)*

**Bilder:** `enrico-mantegazza-XH1DTvS1qCQ-unsplash-scaled.jpg` (Hero-Hintergrund), Logo, `star.svg`

**Intro**

> Hier findest du die häufigsten Fragen rund um Keramikversiegelung und Fahrzeugaufbereitung. Die Antworten sind bewusst klar und praxisnah, ohne Showversprechen. Wenn du es genau wissen willst, komm kurz ohne Termin vorbei oder ruf uns an.

**FAQ – 13 Fragen (Akkordeon, Du-Ansprache)**

**F: Was kostet eine Keramikversiegelung am Auto?**
A: Als Orientierung liegt eine Keramikversiegelung meist zwischen 1.500 und 1.900 EUR. Entscheidend sind Lackzustand, nötige Lackkorrektur, Größe des Fahrzeugs und der gewünschte Umfang, zum Beispiel Felgen oder Scheiben. Wir machen erst eine kurze Begutachtung und sagen dir dann transparent, was sinnvoll ist. Pauschalpreise ohne diese Angaben sind schlicht unseriös.

**F: Wie lange hält eine Keramikversiegelung wirklich?**
A: Die Schutzwirkung liegt in der Regel bei etwa 3 Jahren. Wie gut die Optik über die Zeit bleibt, hängt stark von Pflege und Waschmethode ab. Wer regelmäßig falsch wäscht oder aggressive Chemie nutzt, kann die Oberfläche schneller stumpf wirken lassen. Wir erklären dir nach der Abholung kurz, was du tun und lassen solltest.

**F: Wie läuft eine Keramikversiegelung bei Ihnen ab?**
A: Wir prüfen zuerst den Lackzustand und klären, welches Ergebnis realistisch ist. Danach folgt die gründliche Reinigung, Dekontamination und je nach Zustand die Lackkorrektur. Erst wenn der Lack wirklich sauber vorbereitet ist, wird die Keramik aufgetragen. Am Ende zählt nicht die Keramik, sondern die Vorbereitung, weil dort die Qualität entsteht.

**F: Kann ich mit Keramikversiegelung in die Waschanlage?**
A: Technisch ja, aber es ist nicht die beste Lösung, wenn du den Lack dauerhaft sauber halten willst. Bürstenanlagen erzeugen auf Dauer Waschkratzer, Keramik verhindert das nicht komplett. Wenn Waschanlage, dann möglichst schonend, und du solltest wissen, dass dunkle Lacke solche Spuren schneller zeigen. Besser ist eine passende Handwäsche oder eine wirklich gute Textilwaschanlage mit sauberer Vorwäsche.

**F: Wie pflege ich ein Auto mit Keramikversiegelung**
A: Schonend waschen, keine Bürsten, keine aggressiven Reiniger ohne Grund. Regelmäßige Wäsche mit saurem Autoshampoo erhält Glanz und Abperlen deutlich länger. Wir geben Dir nach der Abholung klare Pflegehinweise, damit das Ergebnis im Alltag so bleibt, wie du es abholst.

**F: Wie schnell sollte ein Neuwagen versiegelt werden?**
A: So früh wie möglich. Viele Neuwagen sind im Rohzustand, also ohne echten Lackschutz, und sammeln schnell die ersten Spuren durch Wäsche, Insekten, Staub und Standzeit. Wer früh versiegelt, hält den Lack länger in einem sauberen Zustand. Je länger du wartest, desto höher ist meistens der Korrekturaufwand.

**F: Wie lange dauert eine Aufbereitung oder Keramikversiegelung?**
A: Das hängt vom Paket und vom Zustand ab. Eine Außenaufbereitung mit Lackkorrektur wie auch die Innenraumaufbereitung (Trocknung) liegt meist bei 2 Tagen. Eine Keramikversiegelung mit Vorbereitung dauert in der Regel 2 bis 4 Tage. Nach der Begutachtung nennen wir dir eine realistische Dauer.

**F: Wird mein Fahrzeug danach wie neu?**
A: Manchmal sehr nah dran, aber nicht immer. Tiefe Kratzer, Lackschäden oder bereits nachlackierte Bereiche setzen Grenzen. Unser Anspruch ist ein sichtbar besseres Ergebnis ohne Blender-Versprechen. Bei der Begutachtung zeigen wir dir, was möglich ist und wo man fairerweise Grenzen anerkennen muss.

**F: Warum ist eine Begutachtung vor Ort so wichtig?**
A: Weil Licht, Fotos und Winkel täuschen. Lackhärte, Kratzerbild, Vorarbeiten, Fahrzeuggröße und Details wie Felgen oder Klavierlack im Innenraum bestimmen den Aufwand. Erst wenn wir das Fahrzeug live sehen, können wir Preis, Dauer und Ergebnis seriös einschätzen.

**F: Muss ich für ein Angebot einen Termin vereinbaren?**
A: Nein. Du kannst während der Öffnungszeiten ohne Termin vorbeikommen. Wir schauen das Fahrzeug direkt an und klären, was realistisch ist und was nicht. Bei weiterer Anfahrt ist ein kurzer Anruf sinnvoll, damit sicher Zeit für dich ist.

**F: Verfügen Sie über Leihwagen?**
A: Ja. Ein Leihwagen ist nach Verfügbarkeit möglich. Preis: ab 55 EUR pro Tag. Bitte frühzeitig Bescheid geben, damit wir planen können.

**F: Lohnt sich eine Aufbereitung vor der Leasingrückgabe?**
A: Sehr oft ja. Viele Rückgaben werden wegen sichtbarer Kleinigkeiten teuer, zum Beispiel matte Lackflächen, Umweltablagerungen, starke Waschkratzer, eingebrannte Insektenreste bzw. Vogelkot oder Innenraumabnutzung und Gerüche. Ebenso werden kleinere Dellen und Abschürfungen am Lack gerne zur Berechnung herangezogen. Durch eine gezielte Aufbereitung können wir die Optik deutlich verbessern und Stress bei der Rückgabe reduzieren. Wir sagen dir vorher ehrlich, was sich rechnet und was nicht.

**F: Neuwagen oder Gebrauchtwagen polieren – Wozu überhaupt?**
A: Ein Neuwagen ist selten wirklich "neu" im Lack. Transport, Standzeit, Händlerwäsche und schnelle Aufbereitung hinterlassen oft feine Kratzer, Schleier oder Hologramme. Bei Gebrauchtwagen kommen Waschkratzer, Insektenreste, Teer, Flugrost und matte Stellen dazu. Polieren heißt nicht "glänzend machen", sondern Lackzustand sichtbar verbessern und die Basis für Schutz schaffen. Wenn du Werterhalt willst, führt an einer sauberen Lackkorrektur kaum ein Weg vorbei.

**Abschluss-CTA**

> Für eine unverbindliche Einschätzung kommen Sie einfach ohne Termin vorbei oder rufen uns an. Dann schauen wir Ihr Fahrzeug gemeinsam an und sagen Ihnen klar, was sinnvoll ist.
>
> *[Button: JETZT ANFRAGEN → /kontakt/]*

> ⚠️ **Ansprache-Bruch:** Die FAQ-Seite duzt („du"), der Rest der Website siezt. Beim Relaunch bewusst entscheiden.
> ⚠️ **Widerspruch:** `/faq/` nennt eine Haltbarkeit von „etwa 3 Jahren", `/leistungen/keramikversiegelung/` schreibt „mehrere Jahre". Die AGB nennen „bis zu 3 Jahre". Vereinheitlichen.

---

### 6.11 Referenzen — `/referenzen/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Referenzen & Bewertungen – Saarland |
| **Meta-Description** | Über 642 Bewertungen, mehr als 95 % Weiterempfehlung und als erster deutscher Fahrzeugpflege-Betrieb mit Q-Siegel ausgezeichnet. Überzeugen Sie sich selbst. |
| **Canonical** | https://www.pb-fahrzeugpflege.de/referenzen/ |
| **Robots** | index, follow |
| **OG-Image** | `https://www.pb-fahrzeugpflege.de/wp-content/uploads/2019/01/cropped-Werkstatt-des-Vertrauens-PB-Fahrzeugpflege-Saarlouis-e1552035560700.jpg` |

**Überschriften**

- **H1:** Unsere Referenzen
- H5: Auszeichnung mit dem Q-Siegel durch Minister Heiko Maas
- H5: Zweite Auszeichnung mit dem Q-Siegel durch Ministerin Anke Rehlinger

**Fließtext / Bildunterschriften (vollständig – in dieser Reihenfolge)**

> **Unsere Referenzen**
>
> PB Fahrzeugpflege Saarlouis – 648 Bewertungen auf ProvenExpert.com
>
> - Auszeichnung als Werkstatt des Vertrauens
> - PB Fahrzeugpflege ist Deutschlands erster Fahrzeugpflege-Betrieb mit Q-Siegel
> - **Auszeichnung mit dem Q-Siegel durch Minister Heiko Maas**
> - Zweite Auszeichnung als zertifizierter Fahrzeugpflegebetrieb mit Q-Siegel in Folge
> - **Zweite Auszeichnung mit dem Q-Siegel durch Ministerin Anke Rehlinger**
> - Gratulation vom Ensdorfer Bürgermeister zum 20. Jubiläum
> - Gratulation vom Ensdorfer Bürgermeister zum 25. Jubiläum von PB Fahrzeugpflege
> - KITT und Herbie zu Besuch bei PB Fahrzeugpflege Saarlouis
> - Auszeichnung als TOP Dienstleister 2017
> - Auszeichnung als TOP Dienstleister 2018
> - Auszeichnung als TOP Dienstleister 2019
> - Auszeichnung als TOP Dienstleister 2020
> - Auszeichnung als TOP Dienstleister 2021
> - Auszeichnung als TOP Dienstleister 2022
> - Auszeichnung als TOP Dienstleister 2023
> - Auszeichnung als TOP Dienstleister 2024
> - Auszeichnung als TOP Empfehlung 2017
> - Auszeichnung als TOP Empfehlung 2018
> - Auszeichnung als TOP Empfehlung 2019
> - Auszeichnung als TOP Empfehlung 2020
> - Auszeichnung als TOP Empfehlung 2021
>
> Das ZDF war mit einem Fernsehteam für die Sendung „Drehscheibe" zum Thema „Ein Tag Aushilfe als Fahrzeugpfleger" bei uns.
>
> Bericht über unsere Q-Siegel Auszeichnung von der IHK
>
> *[Galerie-Labels: PLATZ 1 · PLATZ 2]*

**Bilder – vollständiges Inventar dieser Seite (mit Alt-Texten)**

*Urkunden & Auszeichnungen*

| Datei | Alt-Text |
|---|---|
| `cropped-Werkstatt-des-Vertrauens-PB-Fahrzeugpflege-Saarlouis-e1552035560700.jpg` | Urkunde / Auszeichnung zur Werkstatt des Vertrauens |
| `ref1-e1552037028348.jpg` | Ehrung als erster deutscher Q-Siegel Betrieb der Branche |
| `Q-Siegel-2015-Rehlinger-e1552037757140.jpg` | PB Fahrzeugpflege Auszeichnung |
| `Q-Siegel-Saarland-300x300.jpg` | Q Siegel Saarland referenzen ⚠️ |
| `20-Jubiläum-Bürgermeister-Gratulation-1-e1552037133333.jpg` | 20 Jahre PB Fahrzeugpflege Saarlouis - Bürgermeister Hartwin Faust gratuliert Karsten Becker & Thomas Paul |
| `cropped-25-Jahre-PB-Fahrzeugpflege-Saarlouis-scaled-1.jpg` | 25. Jubiläum Bürgermeister |
| `cropped-Team-KITT-Foto-092019.jpg` | Kitt und Herbie bei PB Fahrzeugpflege Saarlouis |
| `Pressebericht-IHK-Saar-Wirtschaft-10-15-e1552036068181.jpg` | Pressebericht IHK Saar Wirtschaft 10 15 ⚠️ |

*ProvenExpert- & sonstige Siegel*

| Datei | Alt-Text |
|---|---|
| `cropped-ProvenExpert-Auszeichnung-PB-Fahrzeugpflege-Top-Dienstleister.png` | Auszeichnung als Top Dienstleister 2017 |
| `ProvenExpert-Auszeichnung-1.png` | Auszeichnung PB Fahrzeugpflege Top Dienstleister |
| `Provenexpert-Top_Dienstleister_2019.jpg` | Provenexpert Top Dienstleister 2019 ⚠️ |
| `Provenexpert-Top-Dienstleister-2020-Badge-scaled.jpg` | Provenexpert Top Dienstleister 2020 Badge ⚠️ |
| `Provenexpert-Badge-Top-Dienstleister-2021.jpg` | Provenexpert Badge Top Dienstleister 2021 ⚠️ |
| `cropped-topservice_300.png` / `topservice_300.png` | cropped topservice 300 ⚠️ |
| `Top-Dienstleister-Provenexpert-2023.png` | Top Dienstleister Provenexpert 2023 ⚠️ |
| `Provenexpert-Top-Dienstleister-2024.webp` / `.png` | Provenexpert Top Dienstleister 2024 ⚠️ |
| `ProvenExpert-Auszeichnung-Top-Empfehlung.png` | ProvenExpert Auszeichnung Top Empfehlung ⚠️ |
| `ProvenExpert-Auszeichnung-Top-Empfehlung-2018.png` | ProvenExpert Auszeichnung Top Empfehlung 2018 ⚠️ |
| `Provenexpert-Top-Empfehlung-2019.jpg` | Provenexpert Top Empfehlung 2019 ⚠️ |
| `Provenexpert-Top-Empfehlung-2020-Badge-scaled.jpg` | Provenexpert Top Empfehlung 2020 Badge ⚠️ |
| `Provenexpert-Badge-Top-Empfehlung-2021.jpg` | Provenexpert Badge Top Empfehlung 2021 ⚠️ |
| `ProvenExpert-Bewertungssiegel-2026-PB-Fahrzeugpflege-Saarlouis.png` | ProvenExpert Bewertungssiegel 2026 ⚠️ |
| `TOP-Kundenempfehlung-Dienstleister-2017.png` | Auszeichnung als Kundenempfehlung - Über 95% Empfehlungen und zusätzlich die Note "sehr gut" |
| `ProvenExpert-Auszeichnung-300x300.png` | Kundenempfehlung PB Fahrzeugpflege |
| `Provenexpert-Von-Kunden-empfohlen-2019-300x300.jpg` | Provenexpert Von Kunden empfohlen 2019 ⚠️ |
| `gold_wert.png` | Gold Bewertung/Empfehlung für PB Fahrzeugpflege |
| `Werkenntdenbesten-Badge-Siegel.png` | Werkenntdenbesten Badge Siegel ⚠️ |
| `Siegel-Marktplatz-Mittelstand.png` | Siegel Marktplatz Mittelstand ⚠️ |
| `Webwiki-Badge-2024.png` | Webwiki Badge 2024 ⚠️ |
| `Screenshot_20220323-223526_Chrome-250x300.jpg` | Screenshot 20220323 223526 Chrome ⚠️ |

*Fahrzeug-Galerie (Referenzfotos)*

`20230617_114642` · `20230316_140720` · `20230414_164130` · `20240830_142459` · `20220421_143510` · `20240827_141559` (Alt: „Roter BMW nach Smart Repair und Aufbereitung bei PB Fahrzeugpflege Saarlouis") · `20240730_112830` · `20221102_141910` · `20221006_090039` · `20220708_085445` · `20221017_163144` · `20230227_092738` · `IMG_20220716_161022_222` · `20240824_083222` · `IMG-20220520-WA0061` · `20220720_084205` · `20230322_103139` · `IMG-20220520-WA0042` · `20220628_165249` · `20220909_112100` · `20230524_102055` · `Referenzen-Ford-Focus-RS` · `Referenzen-BMW-5er-anthrazit-7-18` · `20230602_151811` · `20230220_171139` (Alt: „Dunkles Fahrzeug im Hintergrund – Häufige Fragen zur Nanoversiegelung") · `20240903_170006` · `IMG-20220514-WA0005` · `20220402_102510` · `IMG-20220514-WA0010` · `20240902_142058` · `20240704_152257` · `20240705_093253` · `IMG_20220520_193505_398` · `20240701_084701_resized` (Alt: „Grüner VW-Bus mit SR3-Saarlandwelle-Beschriftung – Karosseriearbeiten bei PB Fahrzeugpflege Saarloui") · `20220531_183200` (Alt: „Fahrzeug im Hintergrund – Smart Repair bei PB Fahrzeugpflege Saarlouis") · `20230510_170532` · `20220225_143911`
Hero-Hintergrund: `ixography-05Q_XPF_YKs-unsplash-scaled.jpg`

> ⚠️ **Größter Alt-Text-Handlungsbedarf der ganzen Website.** Rund 50 Bilder tragen als Alt-Text nur ihren Dateinamen + „referenzen". Beim Relaunch beschreibende Alt-Texte vergeben (z. B. „Schwarzer Porsche nach Keramikversiegelung – PB Fahrzeugpflege Saarlouis").
> ⚠️ Ein Element hat den Text `_empty` – Bug im aktuellen Build, beim Relaunch entfernen.
> ⚠️ Diese Seite lädt sehr viele Bilder auf einmal → in Next.js `next/image` mit Lazy Loading und WebP/AVIF nutzen.

---
### 6.12 Kontakt — `/kontakt/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Kontakt & Anfahrt – Ensdorf \| PB Fahrzeugpflege Saarlouis |
| **Meta-Description** | PB Fahrzeugpflege Saarlouis, Provinzialstraße 243, 66806 Ensdorf. Telefon & WhatsApp: +49 6831 461229. Kommen Sie gern ohne Termin vorbei – wir beraten Sie. |
| **Canonical** | https://www.pb-fahrzeugpflege.de/kontakt/ |
| **Robots** | index, follow |
| **OG-Image** | ⚠️ nicht gesetzt |

**Überschriften**

- H2: Lassen Sie uns über Ihr Fahrzeug sprechen:
- H5: Besuchen Sie uns, ganz ohne Termin: …

> ⚠️ **Kritisch: Diese Seite hat KEINE H1.** Beim Relaunch zwingend eine H1 setzen, z. B. „Kontakt & Anfahrt – PB Fahrzeugpflege Saarlouis in Ensdorf".

**Bilder:** `enrico-mantegazza-XH1DTvS1qCQ-unsplash-scaled.jpg` (Hero-Hintergrund), Logo, `star.svg`

**Fließtext (vollständig)**

> **Lassen Sie uns über Ihr Fahrzeug sprechen:**
>
> In einem persönlichen Gespräch nehmen wir uns Zeit für Ihr Anliegen und erstellen Ihnen ein individuelles Konzept für Ihr Fahrzeug.
>
> **Besuchen Sie uns, ganz ohne Termin:**
>
> PB Fahrzeugpflege Saarlouis®
> Provinzialstraße 243
> 66806 Ensdorf
>
> Telefon & WhatsApp: +49 6831 461229
>
> Öffnungszeiten:
> Montag bis Freitag 09:00-12:00 Uhr / 13:00-17:00 Uhr
> Samstag 09:00-12:00 Uhr

**Formular** (siehe auch Kapitel 4.4)

| Feld | Typ | Pflicht |
|---|---|---|
| Vorname | Text | ✅ |
| E-Mail-Adresse | E-Mail | ✅ |
| Telefonnummer | Tel | – |
| Nachricht | Textarea, max. 180 Zeichen | ✅ |
| Absenden | Submit | – |

Weiterleitung nach Absenden → `/danke/`. Spam-Schutz: hCaptcha.

> ⚠️ Es ist **keine Karte** (Google Maps o. ä.) eingebunden – nur Textadresse. Für Next.js optional ergänzen (datenschutzkonform, z. B. statisches Kartenbild mit Klick-Consent).
> ⚠️ Das Nachrichtenfeld ist auf 180 Zeichen limitiert – für Anfragen sehr knapp. Beim Relaunch erhöhen.

---

### 6.13 Danke — `/danke/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Danke für Ihre Kontaktaufnahme. - PB Fahrzeugpflege Saarlouis |
| **Meta-Description** | Vielen Dank für Ihre Kontaktaufnahme! Wir werden uns schnellstmöglich bei Ihnen melden |
| **Canonical** | https://www.pb-fahrzeugpflege.de/danke/ |
| **Robots** | index, follow ⚠️ → auf `noindex` ändern |

**Überschriften**

- **H1:** Vielen Dank für Ihre Kontaktaufnahme!
- **H1:** Wir werden uns schnellstmöglich bei Ihnen melden ⚠️ *(zwei H1 auf einer Seite – zweite auf H2 ändern)*

**Fließtext**

> Vielen Dank für Ihre Kontaktaufnahme!
> Wir werden uns schnellstmöglich bei Ihnen melden

**Hinweis:** Dies ist die Conversion-Zielseite. In GTM/GA4 sehr wahrscheinlich als Conversion-Trigger konfiguriert – im neuen Setup mit gleicher URL beibehalten oder Trigger auf ein Event umstellen.

---

### 6.14 Teilnahmebedingungen Facebook Gewinnspiel — `/9555-2/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Teilnahmebedingungen Facebook Gewinnspiel - PB Fahrzeugpflege Saarlouis |
| **Meta-Description** | Mit dieser Aktion möchten wir unseren Kunden und Followern eine besondere Gewinnchance bieten. Grundlage der Teilnahme sind die folgenden Bedingungen: |
| **Canonical** | https://www.pb-fahrzeugpflege.de/9555-2/ |
| **Robots** | index, follow |

**Überschriften**

- **H1:** Teilnahmebedingungen „PB Fahrzeugpflege Eurojackpot-Aktion"
- H2: 1. Anerkennung der Teilnahmebedingungen
- H2: 2. Teilnahmeberechtigung
- H2: 3. Aktionszeitraum
- H2: 4. Teilnahme & Ablauf
- H2: 5. Gewinn
- H2: 6. Datenschutz & Veröffentlichung
- H2: 7. Haftungsausschluss
- H2: 8. Schriftformerfordernis / Salvatorische Klausel
- H2: 9. Rechtsweg

**Fließtext (vollständig)**

> **Teilnahmebedingungen „PB Fahrzeugpflege Eurojackpot-Aktion"**
>
> Die PB Fahrzeugpflege Saarlouis, Provinzialstraße 243, 66806 Ensdorf (nachfolgend „PB Fahrzeugpflege") veranstaltet das Gewinnspiel „PB Fahrzeugpflege Eurojackpot-Aktion" über die firmeneigene Facebook-Seite.
>
> Mit dieser Aktion möchten wir unseren Kunden und Followern eine besondere Gewinnchance bieten. Grundlage der Teilnahme sind die folgenden Bedingungen:
>
> **1. Anerkennung der Teilnahmebedingungen**
> Mit der Teilnahme am Gewinnspiel erkennt der Teilnehmer verbindlich die nachfolgenden Teilnahmebedingungen an.
>
> **2. Teilnahmeberechtigung**
> Teilnahmeberechtigt sind alle natürlichen Personen ab 18 Jahren. Eine Gewinnauszahlung an Minderjährige ist ausgeschlossen.
> Von der Teilnahme ausgeschlossen sind:
> - Mitarbeiter von PB Fahrzeugpflege sowie deren Angehörige ersten und zweiten Grades,
> - Personen, die mit der Durchführung der Aktion beschäftigt sind oder waren,
> - Teilnehmer, die versuchen, den Ablauf zu manipulieren oder gegen diese Teilnahmebedingungen verstoßen.
>
> PB Fahrzeugpflege behält sich vor, das Alter der Gewinner vor der Gewinnübergabe zu überprüfen.
>
> **3. Aktionszeitraum**
> Die Teilnahme ist ab Veröffentlichung des offiziellen Facebook-Posts bis zum Annahmeschluss der jeweiligen Eurojackpot-Ziehung möglich.
> PB Fahrzeugpflege behält sich das Recht vor, die Aktion jederzeit ohne Angabe von Gründen abzubrechen oder zu ändern, sofern eine ordnungsgemäße Durchführung nicht gewährleistet werden kann.
>
> **4. Teilnahme & Ablauf**
> - Die Teilnahme erfolgt durch ein „Gefällt mir", einen Kommentar oder das Teilen des Gewinnspiel-Posts auf der offiziellen Facebook-Seite von PB Fahrzeugpflege.
> - Der Inhalt des Kommentars hat keinen Einfluss auf die Gewinnchance, darf jedoch nicht gegen geltendes Recht oder die guten Sitten verstoßen.
> - PB Fahrzeugpflege nimmt mit den im Post veröffentlichten Zahlen an der Eurojackpot-Ziehung teil.
> - Sollte PB Fahrzeugpflege den Jackpot (5 + 2 Zahlen) gewinnen, wird der Gewinn gleichmäßig auf alle teilnehmenden Personen sowie PB Fahrzeugpflege verteilt.
> - Bei Gewinnen außerhalb des Jackpots erfolgt keine Ausschüttung.
>
> **5. Gewinn**
> Der Gewinn besteht in einer Gewinnbeteiligung an der Gewinnsumme des Eurojackpots, sofern dieser von PB Fahrzeugpflege mit den getippten Zahlen tatsächlich gewonnen wird.
> Die Gewinnsumme wird gleichmäßig pro Kopf unter allen gültigen Teilnehmern und PB Fahrzeugpflege aufgeteilt. Eine Ausschüttung erfolgt ausschließlich dann, wenn und sobald der jeweilige Gewinnbetrag von der zuständigen Lotteriegesellschaft tatsächlich an PB Fahrzeugpflege ausgezahlt wurde.
> Der Gewinn ist nicht übertragbar.
>
> **6. Datenschutz & Veröffentlichung**
> Die personenbezogenen Daten der Teilnehmer werden ausschließlich zum Zwecke der Durchführung des Gewinnspiels verarbeitet und anschließend gelöscht.
> Mit Teilnahme erklärt sich der Gewinner damit einverstanden, dass sein Vorname, Nachname sowie Wohnort im Falle eines Gewinns auf der Website und den Social-Media-Kanälen von PB Fahrzeugpflege veröffentlicht werden dürfen. Eine medienwirksame Gewinnübergabe (Foto oder Video) kann durch PB Fahrzeugpflege durchgeführt werden.
>
> **7. Haftungsausschluss**
> PB Fahrzeugpflege haftet nicht für technische Störungen, Übertragungsverzögerungen oder Datenverluste, die eine Teilnahme am Gewinnspiel verhindern. Ebenso übernimmt PB Fahrzeugpflege keine Haftung für fehlerhafte Angaben durch Teilnehmer.
>
> **8. Schriftformerfordernis / Salvatorische Klausel**
> Änderungen oder Ergänzungen dieser Teilnahmebedingungen bedürfen der Schriftform. Sollte eine Bestimmung unwirksam sein, bleiben die übrigen Bestimmungen davon unberührt.
>
> **9. Rechtsweg**
> Der Rechtsweg ist ausgeschlossen.

---

### 6.15 Impressum — `/impressum/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Impressum - PB Fahrzeugpflege Saarlouis |
| **Meta-Description** | Inhaber: Thomas Paul-Mohm USt.Id.Nr. DE268106468 |
| **Canonical** | ⚠️ **nicht gesetzt** |
| **Robots** | **follow, noindex** |

**Überschrift:** H1 – IMPRESSUM Angaben gemäß § 5 TMG

**Fließtext (vollständig – juristischer Text, 1:1 übernehmen)**

> **IMPRESSUM – Angaben gemäß § 5 TMG**
>
> PB Fahrzeugpflege Saarlouis
> Provinzialstraße 243
> 66806 Ensdorf
> Telefon: 06831 461229
> Fax: 06831 645425
> E-Mail: info@pb-fahrzeugpflege.de
> Webseite: www.pb-fahrzeugpflege.de
>
> Inhaber: Thomas Paul-Mohm
> USt.Id.Nr. DE268106468
>
> **Haftung für Inhalte**
> Wir sind gemäß § 7 Absatz 1 TMG für eigene Inhalte auf diesen Seiten verantwortlich. Nach den §§ 8 bis 10 TMG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben davon unberührt. Eine Haftung ist erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entfernen wir entsprechende Inhalte umgehend.
>
> **Haftung für Links**
> Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links umgehend.
>
> **Urheberrecht**
> Die durch uns erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Inhalte Dritter werden als solche gekennzeichnet. Sollten Sie dennoch eine Urheberrechtsverletzung bemerken, bitten wir um einen Hinweis. Bei Bekanntwerden entfernen wir entsprechende Inhalte umgehend.
>
> **Datenschutz**
> Unsere Datenschutzerklärung finden Sie unter www.pb-fahrzeugpflege.de/datenschutz

> ⚠️ **Defekter Link:** `www.pb-fahrzeugpflege.de/datenschutz` existiert nicht – die Seite liegt unter `/datenschutzerklaerung/`. Beim Relaunch korrigieren **und** einen 301 von `/datenschutz` einrichten.
> ⚠️ Es fehlt der Hinweis auf die **EU-Streitschlichtungsplattform (OS-Plattform)** und die Erklärung zur Verbraucherschlichtung (§ 36 VSBG). Vor dem Relaunch juristisch prüfen lassen.

---

### 6.16 Datenschutzerklärung — `/datenschutzerklaerung/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Datenschutzerklärung - PB Fahrzeugpflege Saarlouis |
| **Meta-Description** | Allgemeine Hinweise zur Datenverarbeitung Wir verarbeiten personenbezogene Daten ausschließlich im Einklang mit der Datenschutzgrundverordnung sowie den |
| **Canonical** | ⚠️ nicht gesetzt |
| **Robots** | **follow, noindex** |

**Überschrift:** H1 – DATENSCHUTZERKLÄRUNG

**Fließtext (vollständig)**

> **Verantwortliche Stelle**
> PB Fahrzeugpflege Saarlouis, Inhaber: Thomas Paul-Mohm, Provinzialstraße 243, 66806 Ensdorf, Telefon: 06831 461229, E-Mail: info@pb-fahrzeugpflege.de
>
> **Allgemeine Hinweise zur Datenverarbeitung**
> Wir verarbeiten personenbezogene Daten ausschließlich im Einklang mit der Datenschutzgrundverordnung sowie den geltenden nationalen Datenschutzgesetzen. Die Nutzung unserer Website ist grundsätzlich ohne Angabe personenbezogener Daten möglich. Personenbezogene Daten werden nur verarbeitet, soweit dies zur Bereitstellung einer funktionsfähigen Website oder zur Bearbeitung Ihrer Anfrage erforderlich ist.
>
> **Server Log Dateien**
> Beim Besuch unserer Website werden automatisch Daten erfasst, die Ihr Browser übermittelt. Dazu zählen Browsertyp und Version, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP Adresse. Diese Daten sind technisch notwendig, um die Website anzuzeigen und die Stabilität zu gewährleisten. Eine Zusammenführung dieser Daten mit anderen Datenquellen findet nicht statt.
>
> **Cookies und Einwilligungsverwaltung**
> Unsere Website verwendet Cookies. Grundlage hierfür ist das Consent Management System CookieYes. Nutzer können selbst bestimmen, in welche Kategorien sie einwilligen möchten. Technisch notwendige Cookies werden ohne Einwilligung gesetzt, da sie für den Betrieb der Website erforderlich sind. Alle anderen Cookies werden nur nach ausdrücklicher Zustimmung aktiviert. Ihre Cookie Einstellungen können jederzeit über die CookieYes Oberfläche angepasst werden.
>
> **Google Analytics 4**
> Unsere Website verwendet Google Analytics 4. Dieser Dienst erfasst Daten über Besucherbewegungen auf der Website. Die Daten werden anonymisiert ausgewertet. Google Analytics 4 nutzt Cookies und andere Technologien. Die Verarbeitung erfolgt ausschließlich auf Basis einer Einwilligung gemäß Artikel 6 Absatz 1 Buchstabe a DSGVO. Sie können Ihre Zustimmung jederzeit über das CookieYes System widerrufen. Die IP Adressen werden automatisch gekürzt und nicht vollständig gespeichert.
>
> **Meta Facebook Pixel**
> Unsere Website verwendet das Meta Facebook Pixel des Anbieters Meta Platforms Ireland Ltd. Dies ermöglicht uns, das Besucherverhalten zu analysieren und zielgerichtete Werbeanzeigen zu schalten. Der Einsatz erfolgt nur mit Ihrer Einwilligung gemäß Artikel 6 Absatz 1 Buchstabe a DSGVO. Die Daten können in die USA übertragen werden. Grundlage dafür sind die Standardvertragsklauseln von Meta. Die Einwilligung kann jederzeit über CookieYes widerrufen werden.
>
> **Kontaktformular**
> Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die von Ihnen eingegebenen Daten wie Name, E Mail Adresse und Nachricht. Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihres Anliegens. Die Verarbeitung erfolgt auf Grundlage von Artikel 6 Absatz 1 Buchstabe b DSGVO. Die Daten werden gelöscht, sobald sie nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
>
> **WhatsApp Button**
> Der WhatsApp Button führt direkt zu einer Kommunikation über WhatsApp. Durch das Öffnen des Buttons werden Daten an WhatsApp übertragen. Verantwortlicher Dienstanbieter ist WhatsApp Ireland Ltd. Bitte beachten Sie, dass WhatsApp unter Umständen Nutzerdaten an Meta Unternehmen weitergibt. Die Nutzung erfolgt freiwillig. Wir raten dazu, über WhatsApp keine sensiblen Informationen zu versenden.
>
> **Weitergabe von Daten**
> Eine Weitergabe personenbezogener Daten erfolgt nur, wenn dies zur Vertragserfüllung notwendig ist, eine gesetzliche Verpflichtung besteht oder Sie ausdrücklich eingewilligt haben. Eine Weitergabe zu Werbezwecken findet nicht statt.
>
> **Speicherdauer**
> Personenbezogene Daten werden nur so lange gespeichert, wie es für die jeweiligen Zwecke erforderlich ist. Gesetzliche Aufbewahrungsfristen bleiben unberührt.
>
> **Sicherheit**
> Wir treffen technische und organisatorische Maßnahmen, um Ihre Daten gegen Verlust, Missbrauch oder unbefugten Zugriff zu schützen. Diese Maßnahmen entsprechen dem aktuellen Stand der Technik.
>
> **Ihre Rechte**
> Sie haben folgende Rechte: Auskunft über gespeicherte Daten · Berichtigung unrichtiger Daten · Löschung Ihrer Daten · Einschränkung der Verarbeitung · Widerspruch gegen die Verarbeitung · Datenübertragbarkeit · Beschwerderecht bei einer Datenschutzaufsichtsbehörde
>
> **Aktualität dieser Erklärung**
> Diese Datenschutzerklärung wird regelmäßig aktualisiert. Es gilt stets die aktuelle Fassung auf dieser Seite.

> ⚠️ **Nicht erwähnt, aber im Einsatz:** hCaptcha, ProvenExpert-Widget, WerKenntDenBesten-Siegel, Google Tag Manager (als eigenständiger Dienst), Wordfence. Beim Relaunch die Datenschutzerklärung um diese Dienste ergänzen (juristisch prüfen lassen).

---

### 6.17 Allgemeine Geschäftsbedingungen — `/allgemeine-geschaeftsbedingungen/`

| Feld | Wert |
|---|---|
| **Meta-Titel** | Allgemeine Geschäftsbedingungen - PB Fahrzeugpflege Saarlouis |
| **Meta-Description** | PB Fahrzeugpflege Saarlouis Stand: November 2025 |
| **Canonical** | ⚠️ nicht gesetzt |
| **Robots** | **follow, noindex** |

**Überschriften:** H2 – Allgemeine Geschäftsbedingungen (AGB) ⚠️ *(keine H1 – beim Relaunch H1 setzen)*, dann H3 für §§ 1–11

**Fließtext (vollständig – juristischer Text, 1:1 übernehmen)**

> **Allgemeine Geschäftsbedingungen (AGB)**
> PB Fahrzeugpflege Saarlouis – Stand: November 2025
>
> **1. Geltungsbereich**
> Diese AGB gelten für alle Dienstleistungen und Warenlieferungen der PB Fahrzeugpflege Saarlouis, Provinzialstraße 243, 66806 Ensdorf. Sie gelten für Verbraucher und Unternehmer im Sinne der §§ 13, 14 BGB gleichermaßen.
>
> **2. Angebot und Vertragsschluss**
> Angebote erfolgen grundsätzlich nach Besichtigung des Fahrzeugs und einer individuellen Abstimmung des Leistungsumfangs. Der Vertrag kommt spätestens mit Abgabe des Fahrzeugs zur Durchführung der Arbeiten zustande. Terminvereinbarungen gelten als verbindliche Reservierung des Arbeitszeitraums.
>
> **3. Kostenvoranschläge**
> Kostenvoranschläge sind unverbindlich. Für Kostenvoranschläge kann eine Gebühr in Höhe von bis zu 15 Prozent des voraussichtlichen Auftragswertes berechnet werden. Voraussetzung ist, dass der Kunde vor Erstellung des Kostenvoranschlags ausdrücklich auf die Kosten hingewiesen wurde und dem zugestimmt hat. Die Zustimmung kann mündlich, schriftlich oder in Textform (z. B. E-Mail, WhatsApp) erfolgen. Die Gebühr wird bei Auftragserteilung vollständig auf den Endpreis angerechnet.
> Lehnt der Kunde den Auftrag nach Erstellung des Kostenvoranschlags ab, verbleibt die Gebühr als Vergütung für den erbrachten Aufwand.
>
> **4. Terminvergabe, Absagefristen, Ausfallentschädigung, Anzahlungen**
> Termine sind verbindlich. Viele unserer Leistungen erfordern umfangreiche Vorbereitungen und können kurzfristig nicht neu vergeben werden. Eine Absage oder Terminverschiebung ist daher bis spätestens 72 Stunden vor dem vereinbarten Termin kostenfrei möglich.
> Erfolgt eine Absage weniger als 72 Stunden vorher oder erscheint der Kunde nicht, behalten wir uns vor, eine angemessene Ausfallentschädigung in Höhe von bis zu 80 Prozent des vereinbarten oder geschätzten Auftragswertes zu berechnen. Dies gilt insbesondere, wenn reservierte Arbeitszeit, Werkflächen, Vorbereitung oder eingeplantes Personal kurzfristig nicht mehr anderweitig genutzt werden können. Dem Kunden bleibt der Nachweis vorbehalten, dass kein oder ein geringerer Schaden entstanden ist.
> Für bestimmte Leistungen, insbesondere Keramikversiegelungen sowie zeitintensive oder mehrtägige Aufbereitungen, kann eine Anzahlung verlangt werden. Die Anzahlung stellt eine Abschlagszahlung auf den späteren Gesamtpreis dar und wird vollständig auf die Endrechnung angerechnet. Wird ein solcher Termin weniger als 72 Stunden vorher abgesagt oder erscheint der Kunde nicht, verfällt die geleistete Anzahlung als Teil der Ausfallentschädigung. Ist der tatsächliche Schaden höher als die Anzahlung, können zusätzlich bis zu 80 Prozent des Auftragswertes berechnet werden, soweit dies den entstandenen Ausfall abbildet.
> Absagen oder Terminänderungen, die außerhalb unserer Geschäftszeiten eingehen, gelten erst mit Beginn des nächsten Werktages als zugegangen. Nachrichten auf dem Anrufbeantworter, per E-Mail, WhatsApp oder anderen Messengern werden erst mit tatsächlicher Kenntnisnahme während unserer regulären Öffnungszeiten wirksam. Absagen am Wochenende, an Feiertagen oder spät abends gelten daher frühestens ab dem folgenden Werktag als eingegangen. Die 72 Stunden Frist wird ab diesem Zeitpunkt berechnet.
>
> **5. Zahlungsbedingungen**
> Die Zahlung erfolgt ausschließlich vor Ort in bar oder per EC-Karte. Zahlungen auf Rechnung sind nicht möglich. Die Vergütung ist mit Abschluss der Arbeiten sofort fällig.
>
> **6. Durchführung der Arbeiten / Übergabe**
> Das Fahrzeug muss zum vereinbarten Termin zugänglich übergeben werden und vollständig leergeräumt sein. Für Schäden oder Verluste an im Fahrzeug zurückgelassenen Gegenständen übernehmen wir keine Haftung, sofern diese nicht auf Vorsatz oder grober Fahrlässigkeit unsererseits beruhen. Mängel oder Vorschäden sind bei Fahrzeugabgabe mitzuteilen. Nach Fertigstellung erfolgt die Abnahme vor Ort. Spätere Reklamationen, die bei üblicher Sorgfalt bei Abnahme erkennbar gewesen wären, können nicht berücksichtigt werden.
>
> **7. Keramikversiegelung: Schutzdauer, Pflegepflicht & Haftung**
> Die Haltbarkeit unserer Keramikversiegelungen beträgt bis zu 3 Jahre, bei entsprechender Pflege noch deutlich länger. Dies ist jedoch stark von regelmäßiger und sachgemäßer Pflege abhängig. Wir übernehmen keine Garantie für die Haltbarkeit. Der Kunde ist verpflichtet, unsere Pflegehinweise einzuhalten. Eine unsachgemäße Pflege kann zu frühzeitigem Versagen der Versiegelung führen. Eine Nachbesserung erfolgt nur nach Kulanz und Einzelfallprüfung.
>
> **8. Haftung bei Lackzuständen, Vorschäden und Altarbeiten**
> Viele Fahrzeuge weisen bei Übergabe Vorschäden, verdeckte Mängel oder zuvor instandgesetzte Bereiche auf. Diese sind häufig ohne Demontage, Spezialwerkzeuge oder tiefere Reinigung nicht erkennbar. Im Zuge unserer fachgerechten Arbeiten, beispielsweise bei Politur, Lackkorrektur, Reinigung oder Versiegelung, können solche Altzustände sichtbar werden oder sich verstärken. Dies beruht ausschließlich auf dem bestehenden Zustand des Fahrzeugs und stellt keinen Mangel unserer Leistung dar.
> Gleiches gilt für altersbedingt instabile, gealterte oder vorgeschädigte Bauteile wie Clips, Halterungen, Zierleisten, Befestigungen, Kunststoffe oder Klebestellen, die aufgrund von Materialermüdung, Vorreparaturen, Spannungsrissen oder unsachgemäßen Vorarbeiten empfindlich reagieren oder versagen können. Lösen sich solche Bauteile, brechen sie oder treten weitere optische Veränderungen auf, liegt dies regelmäßig in den bestehenden Vorschäden oder Materialschwächen begründet.
> Wir übernehmen keine Haftung für Schäden, Ablösungen, sichtbare Übergänge, Farbveränderungen, Materialbrüche oder andere Folgeerscheinungen, die durch solche Altzustände, Vorschäden, Materialermüdung oder nicht fachgerecht ausgeführte Vorarbeiten verursacht werden, soweit dies gesetzlich zulässig ist.
> Der Kunde ist verpflichtet, bei Auftragserteilung bekannte Vorschäden oder frühere Reparaturen mitzuteilen. Eine Haftung für verdeckte Vorschäden besteht nur im Rahmen der gesetzlichen Bestimmungen.
>
> **9. Versicherungsaufträge & Fremdaufträge**
> Bei Aufträgen im Namen oder im Auftrag Dritter, zum Beispiel durch Versicherungen, Gutachter, Leasinggeber oder sonstige Institutionen, haftet der jeweilige Auftraggeber für die Richtigkeit und Vollständigkeit der übermittelten Angaben. Wir übernehmen keine Verantwortung für fehlerhafte oder unvollständige Vorgaben Dritter.
> Unsere Einschätzungen, Bewertungen oder Stellungnahmen zu Schäden, Zuständen oder Reparaturmöglichkeiten ersetzen kein Gutachten und basieren ausschließlich auf dem sichtbaren Zustand zum Zeitpunkt der Begutachtung. Verdeckte Mängel oder Schäden, die ohne Demontage, Spezialwerkzeuge oder weitergehende Prüfverfahren nicht erkennbar sind, fallen nicht in unsere Haftung.
> Jegliche Kostenschätzungen oder Einschätzungen zu Reparaturmaßnahmen erfolgen nach bestem Wissen und auf Grundlage unserer Erfahrung. Eine Haftung für Abweichungen oder spätere Feststellungen besteht nur im Rahmen der gesetzlichen Bestimmungen.
>
> **10. Datenschutz / Videoüberwachung**
> Zum Schutz unserer Kunden und Mitarbeiter sind unsere Räumlichkeiten kameraüberwacht. Dies ist durch deutliche Hinweisschilder vor Ort kenntlich gemacht. Die Aufzeichnung dient ausschließlich internen Sicherheits- und Dokumentationszwecken. Eine Verwendung zur Beweisführung bei Auftragsstreitigkeiten behalten wir uns vor. Daten werden DSGVO-konform verarbeitet und nach maximal 7 Tagen automatisch gelöscht, sofern sie nicht aus berechtigtem Grund länger gespeichert werden müssen (z. B. bei Rechtsstreitigkeiten).
>
> **11. Gerichtsstand / Schlussbestimmungen**
> Es gilt deutsches Recht. Gerichtsstand ist Saarlouis, sofern der Kunde Kaufmann ist. Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
>
> PB Fahrzeugpflege Saarlouis · Inhaber: Thomas Paul-Mohm · Provinzialstraße 243, 66806 Ensdorf · www.pb-fahrzeugpflege.de

---
## 7. Blogbeiträge (4) – vollständiger Inhalt

Alle 4 Beiträge: veröffentlicht am **25.11.2025**, `index, follow`, aber **nicht in der Sitemap**. Kategorie-Struktur: 2 Kategorien im System.

---

### 7.1 Warum Neuwagen im Rohzustand sind und sofort geschützt werden sollten

- **URL:** `/2025/11/25/warum-neuwagen-im-rohzustand-sind-und-sofort-geschuetzt-werden-sollten/`
- **Meta-Titel:** Warum Neuwagen im Rohzustand sind und sofort geschützt werden sollten - PB Fahrzeugpflege Saarlouis
- **Meta-Description:** Ein Neuwagen steht beim Kunden oft für Perfektion. Viele gehen davon aus, dass ein Fahrzeug, das frisch vom Band kommt, in einem makellosen Zustand übergeben
- **Beitragsbild:** ⚠️ keines
- **Überschriften:** ⚠️ **keine H1/H2/H3 im Beitragstext** – beim Relaunch Überschriftenstruktur ergänzen

**Text (vollständig)**

> Ein Neuwagen steht beim Kunden oft für Perfektion. Viele gehen davon aus, dass ein Fahrzeug, das frisch vom Band kommt, in einem makellosen Zustand übergeben wird. Lack, Oberfläche, Glanz – alles wie im Prospekt. Die Realität sieht jedoch anders aus. Und genau hier beginnt ein Missverständnis, das Fahrzeugbesitzern im Saarland und Luxemburg jedes Jahr viel Geld kostet.
>
> Ein Neuwagen ist zunächst ein Rohprodukt. Der Lack ist zwar durchgehärtet, allerdings liegt keinerlei echter Schutz darüber. Die glänzende Erscheinung entsteht allein durch die Werkslackierung, nicht durch eine Schutzschicht. Schon auf dem Transportweg sammeln sich erste Mikrokratzer, Staubpartikel und leichte Defekte. Händler versuchen diese mit einer schnellen Politur zu kaschieren, doch das Ergebnis ist selten sauber und oft mit Hologrammen und Schleiern verbunden. Das ist einer der Gründe, weshalb wir bei PB Fahrzeugpflege Saarlouis immer wieder brandneue Fahrzeuge sehen, die schlechter aussehen als drei Jahre alte Gebrauchtwagen.
>
> Die empfindlichste Phase beginnt nach der Zulassung. Das Fahrzeug steht ungeschützt in der Umwelt, noch bevor der Besitzer überhaupt realisiert, wie anfällig der frische Lack ist. Saharastaub, feiner Industrie-Fallout, Blütenstaub, Insektenreste oder Baumharz sind typische Belastungen im Saarland, die auf einem ungeschützten Lack direkt haften und sich regelrecht einbrennen können. Schon ein einziger Waschvorgang in einer unzureichenden Waschanlage kann feine Waschkratzer hinterlassen, die später deutlich sichtbar werden. Je dunkler der Lack, desto deutlicher zeigt sich das Problem. Besonders schwarzer Lack gehört zur Königsklasse der Aufbereitung, da er jedes Detail schonungslos preisgibt.
>
> Genau deshalb empfehlen wir eine frühzeitige Keramikversiegelung, am besten bevor das Fahrzeug im Alltag benutzt wird. Eine professionelle Keramikbeschichtung bildet eine widerstandsfähige Barriere über dem Lack und schützt dauerhaft vor Umweltbelastungen. Sie reduziert das Risiko von Mikrokratzern, verhindert das Einbrennen von Schmutz und sorgt dafür, dass das Fahrzeug optisch auf einem Niveau bleibt, das weit über die normale Händlerqualität hinausgeht. Viele unserer Kunden aus Saarlouis, dem gesamten Saarland und Luxemburg nutzen diese Möglichkeit, weil sie den Wert ihres Fahrzeugs langfristig erhalten wollen, besonders bei hochwertigen Modellen und Sammlerfahrzeugen.
>
> Die Entscheidung für eine Keramikversiegelung ist somit keine kosmetische Maßnahme, sondern eine Investition in den Werterhalt. Ein Fahrzeug, das von Anfang an geschützt wird, bleibt nicht nur schöner, sondern lässt sich auch deutlich leichter pflegen. Die Oberfläche fühlt sich glatt an, Schmutz haftet weniger und selbst nach Jahren zeigt der Lack eine Tiefe und Klarheit, die ohne Schutz schlicht nicht erreichbar ist. Während viele Fahrer erst nach Monaten oder Jahren reagieren, setzen erfahrene Fahrzeugliebhaber auf Prävention, weil sie wissen, dass jeder ungeschützte Kilometer Spuren hinterlässt.
>
> Wer sein Fahrzeug liebt, schützt es von Anfang an. Und wer schon einmal erlebt hat, wie ein perfekt versiegelter Neuwagen aussieht, wird diesen Unterschied nie wieder missen wollen.
>
> Am besten kommst du für eine kurze Sichtung einfach ohne Termin bei uns vorbei. Wir schauen uns dein Fahrzeug an und erklären dir, welche Schritte sinnvoll sind, um den Lack sofort auf das Niveau zu bringen, das er verdient.
>
> *[CTA: Jetzt unverbindlich beraten lassen]*

---

### 7.2 Warum Luxemburger Kunden bis ins Saarland fahren

- **URL:** `/2025/11/25/warum-immer-mehr-kunden-aus-luxemburg-ihre-keramikversiegelung-im-saarland-durchfuehren-lassen/`
- **Meta-Titel:** Warum Luxemburger Kunden bis ins Saarland fahren - PB Fahrzeugpflege Saarlouis
- **Meta-Description:** Immer mehr Kunden aus Luxemburg kommen bewusst ins Saarland, um ihre Keramikversiegelung professionell durchführen zu lassen. Und sie tun das nicht wegen des
- **Bild:** `20250828_091820-scaled.jpg` (Alt: „20250828 091820 scaled" ⚠️)
- **H2:** Luxemburg ist bekannt für hochwertige Fahrzeuge und anspruchsvolle Autobesitzer. Doch was viele überrascht: ⚠️ *(keine H1)*

**Text (vollständig)**

> **Luxemburg ist bekannt für hochwertige Fahrzeuge und anspruchsvolle Autobesitzer. Doch was viele überrascht:**
>
> Immer mehr Kunden aus Luxemburg kommen bewusst ins Saarland, um ihre Keramikversiegelung professionell durchführen zu lassen. Und sie tun das nicht wegen des Preises, sondern wegen der Qualität.
>
> Wir erleben es fast täglich. Ein Kunde aus Luxemburg fährt bei uns auf den Hof und sagt, dass er im eigenen Land niemanden findet, der die gleiche Kombination aus Erfahrung, Spezialisierung und Handschlagqualität bietet. Viele Aufbereiter stehen zwar zur Verfügung und wirken auf den ersten Blick modern, aber nur selten wird die Arbeit mit der Präzision durchgeführt, die ein hochwertiges Fahrzeug verdient. Besonders bei dunklen Lacken zeigt sich dieser Unterschied sofort. Wer ein Fahrzeug im sechsstelligen Bereich fährt, erwartet mehr als einen schnellen Durchlauf.
>
> Was Kunden aus Luxemburg bei uns besonders schätzen, ist die klare Beratung. Wir erklären ehrlich, was möglich ist und was nicht. Wir arbeiten seit Jahrzehnten ausschließlich mit hochwertigen Privatfahrzeugen, nicht mit Masse oder Billigversiegelungen. Diese Spezialisierung sorgt dafür, dass die Ergebnisse reproduzierbar sind, unabhängig von Marke, Modell oder Lackfarbe. Und genau das schafft Vertrauen.
>
> Besonders bei Neuwagen ist der Besuch bei uns oft ein Aha-Erlebnis. Viele Kunden aus Luxemburg sind überrascht, wie viel versteckter Lackschaden bereits ab Werk vorhanden ist. Kleine Polierspuren, Waschkratzer oder Transportdefekte sind keine Seltenheit. Erst wenn ein Fahrzeug fachgerecht korrigiert und anschließend versiegelt wird, erkennt man, welches Niveau überhaupt möglich ist.
>
> Wer die Qualität auf Dauer sichern möchte, investiert von Anfang an richtig. Deshalb vertrauen immer mehr Luxemburger auf unsere Handarbeit. Sie fahren lieber einmal zu uns, als sich später über schlechte Ergebnisse zu ärgern.
>
> Wenn du aus Luxemburg kommst und dein Fahrzeug langfristig schützen möchtest, schauen wir uns dein Auto gerne unverbindlich an. Einfach vorbeikommen, ganz ohne Termin.
>
> *[CTA: Jetzt unverbindlich beraten lassen]*

---

### 7.3 Keramikversiegelung – warum billig am Ende teuer ist

- **URL:** `/2025/11/25/die-haeufigsten-fehler-bei-billigen-keramikversiegelungen-und-wie-du-sie-erkennst/`
- **Meta-Titel:** Keramikversiegelung - warum billig am Ende teuer ist - PB Fahrzeugpflege Saarlouis
- **Meta-Description:** Keramikversiegelungen werden mittlerweile überall angeboten. Werkstätten, Autohäuser, Waschstraßen und mobile Aufbereiter werben mit großen Versprechen und
- **Bild:** `Brila-Urkunde-Keramikversiegelung-1024x1024.jpg` (Alt: „Brila Urkunde Keramikversiegelung")
- **H2:** Die häufigsten Fehler bei billigen Keramikversiegelungen – und wie du sie erkennst ⚠️ *(keine H1)*

**Text (vollständig)**

> **Die häufigsten Fehler bei billigen Keramikversiegelungen – und wie du sie erkennst**
>
> Keramikversiegelungen werden mittlerweile überall angeboten. Werkstätten, Autohäuser, Waschstraßen und mobile Aufbereiter werben mit großen Versprechen und kleinen Preisen. Doch gerade im Premiumsegment führt das zu enttäuschenden Ergebnissen und teuren Korrekturen. Die meisten Fehler erkennt man erst nach einigen Wochen, wenn es zu spät ist.
>
> Der häufigste Fehler ist die unzureichende Vorbereitung. Wer eine Keramikversiegelung „an einem Nachmittag" anbietet, kann unmöglich alle Schritte korrekt durchführen. Eine hochwertige Versiegelung braucht eine gründliche Lackkorrektur, denn jede Unebenheit und jeder Mikrokratzer wird später unter der Keramik sichtbar. Viele Billiganbieter überspielen diese Defekte mit Glanzmitteln. Nach einigen Wäschen ist die Wahrheit dann schonungslos sichtbar.
>
> Ein weiterer typischer Fehler ist die unsachgemäße Anwendung der Keramik. Wird das Produkt zu dick oder zu lange auf der Oberfläche gelassen, entstehen Wolken, Schlieren oder matte Bereiche. DIe Experten nennen das „High Spots". Besonders bei schwarzem Lack wirkt das Fahrzeug dann fleckig und unruhig. Hochwertige Kunden bemerken diese Fehler sofort und ärgern sich zu Recht.
>
> Viele Kunden kommen zu uns, nachdem eine andere Werkstatt bereits versiegelt hat. Das Problem: Eine echte Keramikversiegelung lässt sich nicht einfach „wegpolieren". Ist sie erstmal aufgetragen, bekommt man sie nicht mehr runter. Sämtliche Spuren wie Schlieren, Wolken, Hologrammme sind nun dauerhaft unter der Keramikschicht verewigt. Für die vollständige Entfernung bräuchte man Tage, und zudem muss sie anschließend ja wieder neu aufgebaut werden. Das kostet tausende von Euro!
>
> Wer langfristig ein perfektes Ergebnis möchte, sollte auf erfahrene Spezialisten setzen. Unsere Kunden kommen nicht wegen des Preises zu uns, sondern wegen der Sicherheit, dass ihr Fahrzeug exakt so behandelt wird, wie es ein hochwertiges Auto verdient. Auf diesem Niveau wird nicht experimentiert.
>
> Wenn du vermeiden möchtest, dass du nach Monaten, ja sogar schon nach der Abholung enttäuscht bist, komm am besten vorab auf eine kurze Beratung vorbei. Wir sehen sofort, was Sache ist und beraten dich völlig unverbindlich und ausführlich.
>
> *[CTA: Jetzt unverbindlich beraten lassen]*

*(Tippfehler im Original: „DIe Experten", „Hologrammme" – beim Relaunch korrigieren.)*

---

### 7.4 Schwarzes Fahrzeug richtig polieren & versiegeln

- **URL:** `/2025/11/25/warum-schwarze-fahrzeuge-hoechste-praezision-erfordern-und-wie-eine-professionelle-keramikversiegelung-sie-schuetzt/`
- **Meta-Titel:** Schwarzes Fahrzeug richtig polieren & versiegeln - PB Fahrzeugpflege Saarlouis
- **Meta-Description:** Schwarzer Lack ist die Königsklasse. Er zeigt jede Spur, jede Unsauberkeit und jede noch so kleine Polierfehler. Viele Besitzer hochwertiger Fahrzeuge wissen
- **Bild:** `20240824_083222-scaled-e1728467161205-823x1024.jpg` (Alt: „20240824 083222 scaled e1728467161205" ⚠️)
- **H1:** Warum schwarze Fahrzeuge höchste Präzision erfordern und wie eine professionelle Keramikversiegelung sie schützt

**Text (vollständig)**

> **Warum schwarze Fahrzeuge höchste Präzision erfordern und wie eine professionelle Keramikversiegelung sie schützt**
>
> Schwarzer Lack ist die Königsklasse. Er zeigt jede Spur, jede Unsauberkeit und jede noch so kleine Polierfehler. Viele Besitzer hochwertiger Fahrzeuge wissen das, dennoch sind sie überrascht, wie empfindlich ein schwarzer Neuwagen tatsächlich ist. Die Probleme beginnen schon beim Händler. Transportspuren, Hologramme, Waschkratzer und matte Stellen sind bei schwarzem Lack ab Werk fast normal.
>
> Wer ein schwarzes Fahrzeug wirklich in Perfektion sehen möchte, benötigt Erfahrung, Ruhe und vor allem das richtige Licht. Genau das unterscheidet eine schnelle Händleraufbereitung von einem spezialisierten Premiumbetrieb. Die Korrektur eines schwarzen Fahrzeugs ist präzise Handarbeit. Jede Stelle muss kontrolliert, geprüft und mehrfach im Fokuslicht betrachtet werden. Fehler sieht man sofort.
>
> Eine Keramikversiegelung bringt bei schwarzem Lack zwei entscheidende Vorteile. Sie schützt den empfindlichen Untergrund vor neuen Mikrokratzern und sie intensiviert die Tiefe und Spiegelung des Lacks. Ein sauber korrigiertes und versiegeltes schwarzes Fahrzeug sieht nicht nur besser aus, es bleibt auch deutlich länger auf diesem Niveau.
>
> Viele unserer Kunden aus Luxemburg und dem Saarland legen besonderen Wert auf genau diese Perfektion. Sie wissen, dass ein schwarzes Fahrzeug schnell an Eleganz verliert, wenn es nicht fachgerecht behandelt wird. Wer einmal erlebt hat, wie ein perfekt vorbereiteter schwarzer Lack unter Licht aussieht, versteht sofort, warum diese Arbeit nicht jeder anbieten sollte.
>
> Wenn du ein schwarzes Fahrzeug besitzt und sicher sein möchtest, dass es so aussieht, wie es aussehen kann, komm einfach ohne Termin vorbei. Wir beurteilen den Zustand direkt vor Ort und erklären dir, welche Schritte sinnvoll sind.
>
> *[CTA: Jetzt unverbindlich beraten lassen]*

---

## 8. FAQ-Gesamtverzeichnis (51 Fragen)

Kompakte Übersicht aller FAQ-Blöcke – Antworten siehe jeweilige Seite in Kapitel 6.

| Seite | Anzahl | Fragen (Kurzform) |
|---|---|---|
| `/` | 5 | Unterschied zu anderen Aufbereitern · Sportwagen/Oldtimer/Luxus · seit wann · Regionen · Standort |
| `/faq/` | 13 | Kosten Keramik · Haltbarkeit · Ablauf · Waschanlage · Pflege · Neuwagen wie schnell · Dauer · wie neu · Begutachtung · Termin nötig · Leihwagen · Leasingrückgabe · Polieren wozu |
| `/leistungen/keramikversiegelung/` | 8 | Kosten · Haltbarkeit · Dauer · Neuwagen lohnend · Keramik vs. Nano · Gebrauchtwagen · Steinschlag/Kratzer · entfernbar |
| `/leistungen/nanoversiegelung/` | 7 | Kosten · Haltbarkeit · Unterschied Nano/Keramik · Was bringt es · sinnvoll · Nano vs. Wachs · Nachteile |
| `/leistungen/fahrzeugaufbereitung/` | 6 | Kosten · Dauer · Leistungsumfang · vor Verkauf · Innenraum-Kosten · Autowäsche vs. Aufbereitung |
| `/leistungen/lack-und-beulendoktor/` | 6 | Kosten Smart Repair · Dellen ohne Lackieren · Ausbeultechnik · Smart Repair vs. Lackierung · Dauer · lohnt sich |
| `/unfallschaden/` | 6 | Was tun nach Unfall · wer zahlt · Partnerwerkstatt · freie Werkstattwahl · merkantile Wertminderung · Parkschaden |
| **Gesamt** | **51** | |

**Dubletten-Hinweis für Next.js:** „Was kostet eine Keramikversiegelung?", „Wie lange hält eine Keramikversiegelung?" und „Keramik oder Nano?" kommen jeweils auf zwei Seiten mit unterschiedlichem Wortlaut vor. Empfehlung: eine zentrale FAQ-Datenquelle (z. B. JSON/CMS) anlegen und Fragen per ID auf Seiten referenzieren – dann gibt es genau eine gepflegte Antwort pro Frage.

---
## 9. Bild-Inventar

**Gesamtbestand Medienbibliothek: 441 Dateien.** Alle liegen unter `https://www.pb-fahrzeugpflege.de/wp-content/uploads/JAHR/MONAT/`.

### 9.1 Migrationsempfehlung

1. **Kompletten `wp-content/uploads/`-Ordner per FTP/SFTP sichern** – die REST-API listet 441 Einträge, die Seiten referenzieren aber nur einen Teil davon. Ein Full-Dump ist die sichere Variante.
2. Struktur in Next.js: `public/images/…` oder besser ein Bild-CDN / `next/image` mit Remote-Loader.
3. **Alte Pfade als Redirect erhalten**, falls Bilder in Google Images ranken: `/wp-content/uploads/:path*` → neuer Pfad.
4. Formate: aktuell überwiegend JPG/PNG, teils `.webp`. In Next.js automatisch zu WebP/AVIF konvertieren lassen.
5. Die WordPress-Thumbnail-Größen (`-300x300`, `-1024x1024`, `-scaled` …) werden **nicht** mehr gebraucht – nur die Originaldateien migrieren, Next.js erzeugt Größen selbst.

### 9.2 Zentrale Marken-Assets

| Datei | Verwendung | Alt-Text |
|---|---|---|
| `theartofdetailing_seit_pure_black-png.png` | Logo, auf jeder Seite | PB Fahrzeugpflege Saarlouis – The Art of Detailing |
| `PB_Logo_RGB.png` (2021/03) | Logo im Schema.org-Markup, 559×150 | PB Fahrzeugpflege Saarlouis |
| `star.svg` | Bewertungssterne (5×), auf jeder Seite | ⚠️ leer – ergänzen |
| `cropped-Jubilaeum-29.png` | 29-Jahre-Badge, Startseite | *(CSS)* |

### 9.3 Hero-/Sektionsbilder je Seite (CSS-Hintergründe – in Next.js als `<Image>` mit `fill` umsetzen)

| Seite | Bilddateien |
|---|---|
| `/` | `ville-kaisla-HNCSCpWrVJA-unsplash-scaled.jpg`, `cropped-Jubilaeum-29.png`, `cropped-cropped-cropped-IMG-20250404-WA0022-1-1.jpg` |
| `/ueber-uns/` | `cropped-tim-meyer-timm-jpeg-9tzGmvumnHM-unsplash-scaled-1.jpg`, `cropped-cropped-Karsten_und_Thomas_Firma-_TQw6dnLg-transformed-1.jpeg` |
| `/leistungen/` | `felipe-simo-NjLDPRFmvM4-unsplash-scaled.jpg` |
| `/leistungen/keramikversiegelung/` | `ville-kaisla-HNCSCpWrVJA-unsplash-scaled.jpg`, `cropped-cropped-cropped-cropped-Car-Detailing-goldenes-Auto-Fotolia-Vecteezy-scaled-2.jpeg`, `cropped-cropped-cropped-enrico-mantegazza-XH1DTvS1qCQ-unsplash-scaled-1.jpg`, `Fotolia_111261168_S-e1552037415870.jpg`, `cropped-cropped-cropped-Fotolia-Kermikversiegelung-Auftragung.jpg`, `cropped-20220421_143510-scaled-e1728466778968.jpg` |
| `/leistungen/nanoversiegelung/` | `erik-mclean-ZRns2R5azu0-unsplash-scaled.jpg`, `245999_245001.png`, `enrico-mantegazza-XH1DTvS1qCQ-unsplash-scaled.jpg`, `jasper-geys-NyRe1Mj1pm4-unsplash-scaled.jpg`, `cropped-jasper-geys-NyRe1Mj1pm4-unsplash-scaled-1.jpg`, `cropped-20230220_171139-scaled-1.jpg` |
| `/leistungen/fahrzeugaufbereitung/` | `tim-meyer-timm-jpeg-9tzGmvumnHM-unsplash-scaled.jpg`, `cropped-20240626_151618-scaled-1.jpg`, `cropped-cropped-cropped-cropped-cropped-Fotolia-Kermikversiegelung-Auftragung.jpg`, `cropped-20220421_143510-scaled-e1728466778968.jpg` |
| `/leistungen/lack-und-beulendoktor/` | `joshua-fuller-LZdNqhJgSK8-unsplash-scaled.jpg`, `cropped-cropped-20220531_183200-scaled-1.jpg`, `cropped-cropped-cropped-Fotolia-Kermikversiegelung-Auftragung.jpg`, `cropped-cropped-cropped-cropped-Car-Detailing-goldenes-Auto-Fotolia-Vecteezy-scaled-2-1.jpeg`, `cropped-20240827_141559-scaled-e1728466843212.jpg`, `cropped-maxresdefault-20.jpg` |
| `/unfallschaden/` | `cropped-felipe-simo-NjLDPRFmvM4-unsplash-scaled-1.jpg`, `cropped-iStock-1892181739.jpg`, `cropped-20240701_084701_resized-scaled-e1728466903608.jpg`, `cropped-20220421_143510-scaled-e1728466778968.jpg` |
| `/preise/` | `alessio-lin-6LYjG0H32E-unsplash-scaled.jpg` |
| `/faq/` | `enrico-mantegazza-XH1DTvS1qCQ-unsplash-scaled.jpg` |
| `/kontakt/` | `enrico-mantegazza-XH1DTvS1qCQ-unsplash-scaled.jpg` |
| `/referenzen/` | `ixography-05Q_XPF_YKs-unsplash-scaled.jpg` + komplette Urkunden-/Siegel-/Fahrzeuggalerie (siehe 6.11) |

### 9.4 Alt-Text-Status

| Kategorie | Anzahl (ca.) | Status |
|---|---|---|
| Gute, beschreibende Alt-Texte | ~15 | ✅ übernehmen |
| Alt-Text = Dateiname (+ „referenzen") | ~50 | ⚠️ neu schreiben |
| Leerer Alt-Text (`star.svg`, dekorativ) | mehrfach | ✅ bei rein dekorativen Bildern korrekt (`alt=""`), bei `star.svg` in Bewertungskontext besser `alt="5 von 5 Sternen"` |
| CSS-Hintergründe (kein Alt möglich) | ~35 | ⚠️ In Next.js als `<Image>` mit Alt-Text umsetzen – SEO-Gewinn |

**Beispiele für gute vorhandene Alt-Texte (als Vorlage für die Nacharbeit):**

- „Keramikversiegelung wird in Handarbeit auf einen gelben Sportwagen aufgetragen - PB Fahrzeugpflege"
- „Fahrzeug mit geöffneter Motorhaube in der Werkstatt – Unfallinstandsetzung bei PB Fahrzeugpflege Saarlouis"
- „20 Jahre PB Fahrzeugpflege Saarlouis - Bürgermeister Hartwin Faust gratuliert Karsten Becker & Thomas Paul"
- „Fahrzeug auf einer Landstraße bei Sonnenuntergang – langanhaltender Lackschutz durch Nanoversiegelung"

---

## 10. Interne Verlinkung (für Next.js nachzubauen)

| Von | Nach |
|---|---|
| `/` | `/ueber-uns/`, `/preise`, `/leistungen/keramikversiegelung`, `/kontakt` |
| `/ueber-uns/` | `/kontakt/` |
| `/leistungen/` | alle 4 Unterseiten |
| `/leistungen/keramikversiegelung/` | `/leistungen/nanoversiegelung/`, `/preise/`, `/kontakt/` |
| `/leistungen/nanoversiegelung/` | `/leistungen/keramikversiegelung/`, `/preise/` |
| `/leistungen/fahrzeugaufbereitung/` | `/leistungen/nanoversiegelung/`, `/leistungen/keramikversiegelung/`, `/preise/` |
| `/leistungen/lack-und-beulendoktor/` | `/unfallschaden/`, `/preise/`, `/kontakt/` |
| `/unfallschaden/` | `/kontakt/`, WhatsApp |
| `/faq/` | `/kontakt/` |
| `/impressum/` | `/datenschutz` ⚠️ **404 – korrigieren auf `/datenschutzerklaerung/`** |
| Footer (alle Seiten) | `/impressum/`, `/datenschutzerklaerung/`, `/allgemeine-geschaeftsbedingungen/`, ProvenExpert, Social, Google |

**Externe Links (alle Seiten):** ProvenExpert-Profil, Facebook, Instagram, YouTube, WhatsApp, Google Maps / share.google.

---

## 11. SEO-Übernahme-Checkliste für den Relaunch

### Vor dem Go-live

- [ ] Alle 17 Seiten-URLs und 4 Beitrags-URLs im neuen System angelegt (URL-Mapping-Tabelle aus Kapitel 2 abarbeiten)
- [ ] Meta-Titel und Meta-Descriptions **exakt** aus Kapitel 6 übernommen
- [ ] Canonical-Tags gesetzt (auch für Impressum/Datenschutz/AGB, die aktuell keine haben)
- [ ] `robots`-Meta je Seite gesetzt: 3 × `noindex` (Impressum, Datenschutz, AGB) + `/danke/` neu auf `noindex`
- [ ] H1 auf jeder Seite vorhanden und einmalig (aktuell fehlt sie auf `/kontakt/` und `/allgemeine-geschaeftsbedingungen/`; `/danke/` hat zwei)
- [ ] Überschriftenhierarchie sauber (H1 → H2 → H3), keine Textabsätze als H4/H5
- [ ] JSON-LD: Organization/AutoRepair, Place, WebSite, WebPage, BreadcrumbList, FAQPage, Product/AggregateRating (Kapitel 5)
- [ ] `sameAs` im Organization-Schema um Instagram, YouTube, ProvenExpert, Google-Profil ergänzen
- [ ] `legalName` im Schema korrigieren (steht aktuell auf der E-Mail-Adresse)
- [ ] Öffnungszeiten Samstag vereinheitlichen (12:00 vs. 12:30)
- [ ] Alle 441 Medien-Dateien übertragen, Bildpfade prüfen
- [ ] OG-Images für alle Seiten hinterlegen (aktuell nur 4 von 17 gesetzt)
- [ ] Alt-Texte nacharbeiten (Kapitel 9.4)
- [ ] Kontaktformular funktionsfähig inkl. Spam-Schutz + Weiterleitung auf `/danke/`
- [ ] GTM `GTM-PM4LRKZ` eingebunden, CookieYes (`882f35b4b9e022f15719da7e`) blockiert Tags vor Consent
- [ ] Neue XML-Sitemap **inkl. Blogbeiträge**, in robots.txt referenziert
- [ ] Trailing-Slash-Verhalten identisch zu heute (`trailingSlash: true`)
- [ ] Rank-Math-Redirect-Liste und 404-Monitor exportiert und übernommen

### Am Go-live-Tag

- [ ] 301-Weiterleitungen live testen (Screaming Frog o. ä. gegen die URL-Liste aus Kapitel 2)
- [ ] Google Search Console: neue Sitemap einreichen, Indexierung der Startseite anfordern
- [ ] Live-Test: Rich Results Test für FAQPage + LocalBusiness
- [ ] Core Web Vitals messen (Referenzen-Seite ist bildlastig – besonders prüfen)

### Nach dem Go-live (erste 4 Wochen)

- [ ] Search Console: Abdeckungsfehler und 404s täglich prüfen
- [ ] Rankings der Hauptkeywords beobachten: „Keramikversiegelung Saarland", „Fahrzeugaufbereitung Saarlouis", „Beulendoktor Saarland", „Smart Repair Saarland", „Unfallschaden Saarland", „Keramikversiegelung Luxemburg"
- [ ] Conversion-Tracking auf `/danke/` verifizieren
- [ ] ProvenExpert-Widget und Bewertungszahl live prüfen

---

## 12. Zusammenfassung der Handlungsempfehlungen

| Priorität | Punkt | Seite(n) |
|---|---|---|
| 🔴 Hoch | Fehlende H1 ergänzen | `/kontakt/`, `/allgemeine-geschaeftsbedingungen/` |
| 🔴 Hoch | Defekter Link `/datenschutz` korrigieren | `/impressum/` |
| 🔴 Hoch | Blogbeiträge in die Sitemap aufnehmen | global |
| 🔴 Hoch | `/danke/` auf `noindex` setzen | `/danke/` |
| 🟠 Mittel | Alt-Texte für ~50 Bilder neu schreiben | `/referenzen/` u. a. |
| 🟠 Mittel | Überschriftenhierarchie bereinigen (H4/H5 als Fließtext) | Keramikversiegelung, FAQ, Preise |
| 🟠 Mittel | OG-Images für alle Seiten hinterlegen | 13 Seiten |
| 🟠 Mittel | Zahlen vereinheitlichen (600/642/648 Bewertungen, 27/29 Jahre, Öffnungszeiten Sa) | global |
| 🟠 Mittel | `/leistungen/` mit echtem Content aufwerten | `/leistungen/` |
| 🟡 Niedrig | Sprechende URL statt `/9555-2/` | `/9555-2/` |
| 🟡 Niedrig | Du/Sie-Ansprache vereinheitlichen | `/faq/`, Blog |
| 🟡 Niedrig | Nachrichtenfeld-Limit von 180 Zeichen erhöhen | `/kontakt/` |
| 🟡 Niedrig | Datenschutzerklärung um hCaptcha, ProvenExpert, GTM, Wordfence ergänzen | `/datenschutzerklaerung/` |
| 🟡 Niedrig | Impressum um OS-Plattform/VSBG-Hinweis ergänzen (juristisch prüfen) | `/impressum/` |

---

*Dokument erstellt am 6. August 2026. Grundlage: Live-Abzug aller öffentlichen Seiten von www.pb-fahrzeugpflege.de, Sitemap, WordPress-REST-API und WP-Admin-Seitenübersicht.*
