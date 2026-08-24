/**
 * Dashboard-Willkommen mit ruhigem Apple-Vibe.
 * Hierarchie: großes „Guten Tag", darunter 3 Primär-Aktionen,
 * dann sekundäre Navigations-Kacheln.
 */

const primary = [
  {
    href: "/admin/globals/home",
    label: "Startseite bearbeiten",
    hint: "Hero, Kennzahlen, Prozess, Region.",
  },
  {
    href: "/admin/collections/services/create",
    label: "Neue Leistung anlegen",
    hint: "Titel, Bild, Text, FAQs.",
  },
  {
    href: "/admin/collections/blog-posts/create",
    label: "Blogbeitrag verfassen",
    hint: "Text, Bild, Veröffentlichungsdatum.",
  },
];

const secondary = [
  { href: "/admin/collections/services", label: "Leistungen" },
  { href: "/admin/collections/pages", label: "Seiten" },
  { href: "/admin/collections/blog-posts", label: "Blog" },
  { href: "/admin/collections/faqs", label: "FAQs" },
  { href: "/admin/collections/media", label: "Medien" },
  { href: "/admin/collections/awards", label: "Auszeichnungen" },
  { href: "/admin/collections/vehicles", label: "Fahrzeuge" },
  { href: "/admin/globals/navigation", label: "Menü" },
  { href: "/admin/globals/footer", label: "Footer" },
  { href: "/admin/globals/settings", label: "Betriebsdaten" },
];

const hour = new Date().getHours();
const greeting =
  hour < 5 ? "Guten Abend"
  : hour < 11 ? "Guten Morgen"
  : hour < 18 ? "Hallo"
  : "Guten Abend";

export default function BeforeDashboard() {
  return (
    <section className="pb-welcome">
      <div className="pb-welcome__hero">
        <span className="pb-welcome__eyebrow">Redaktion</span>
        <h1 className="pb-welcome__title">
          {greeting}. Was möchten Sie heute pflegen?
        </h1>
        <p className="pb-welcome__lead">
          Änderungen werden automatisch als Entwurf gespeichert. Erst mit
          <em> Veröffentlichen</em> gehen sie live.
        </p>
      </div>

      <div className="pb-welcome__primary">
        {primary.map((p) => (
          <a key={p.href} href={p.href} className="pb-tile pb-tile--primary">
            <div className="pb-tile__body">
              <div className="pb-tile__label">{p.label}</div>
              <div className="pb-tile__hint">{p.hint}</div>
            </div>
            <div className="pb-tile__arrow" aria-hidden>→</div>
          </a>
        ))}
      </div>

      <div className="pb-welcome__section-label">Alle Bereiche</div>
      <div className="pb-welcome__secondary">
        {secondary.map((s) => (
          <a key={s.href} href={s.href} className="pb-chip">
            <span>{s.label}</span>
            <span className="pb-chip__arrow" aria-hidden>›</span>
          </a>
        ))}
      </div>

      {/* Scoped Styles nur für den Welcome-Bereich */}
      <style>{`
        .pb-welcome {
          margin: 4px 0 44px;
          font-family: var(--font-body);
          color: var(--pb-ink);
        }
        .pb-welcome__hero {
          padding: 8px 0 26px;
          max-width: 780px;
        }
        .pb-welcome__eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--pb-gold);
          margin-bottom: 14px;
        }
        .pb-welcome__title {
          font-family: var(--font-serif, "Fraunces", serif);
          font-weight: 400;
          font-size: clamp(1.9rem, 3vw, 2.6rem);
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin: 0;
          color: var(--pb-ink);
        }
        .pb-welcome__lead {
          margin: 12px 0 0;
          color: var(--pb-ink-dim);
          font-size: 15px;
          line-height: 1.55;
          max-width: 62ch;
        }
        .pb-welcome__lead em {
          font-style: normal;
          color: var(--pb-ink);
          font-weight: 500;
        }

        .pb-welcome__primary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 12px;
          margin-top: 4px;
        }

        .pb-tile {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 22px;
          background: var(--pb-surface);
          border: 1px solid var(--pb-border);
          border-radius: 18px;
          text-decoration: none;
          box-shadow: var(--pb-shadow-1);
          transition:
            transform 200ms var(--pb-ease),
            box-shadow 220ms var(--pb-ease),
            border-color 200ms var(--pb-ease);
        }
        @media (hover: hover) and (pointer: fine) {
          .pb-tile:hover {
            transform: translateY(-1px);
            box-shadow: var(--pb-shadow-2);
            border-color: var(--pb-gold);
          }
        }
        .pb-tile:active { transform: translateY(0) scale(0.985); }

        .pb-tile__label {
          font-size: 15px;
          font-weight: 600;
          color: var(--pb-ink);
          letter-spacing: -0.005em;
        }
        .pb-tile__hint {
          margin-top: 4px;
          font-size: 13px;
          color: var(--pb-ink-mute);
          line-height: 1.45;
        }
        .pb-tile__arrow {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--pb-gold-tint);
          color: var(--pb-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 500;
          transition: background 180ms var(--pb-ease), color 180ms var(--pb-ease);
          flex-shrink: 0;
        }
        .pb-tile:hover .pb-tile__arrow {
          background: var(--pb-gold);
          color: #ffffff;
        }

        .pb-welcome__section-label {
          margin: 44px 0 12px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--pb-ink-mute);
        }

        .pb-welcome__secondary {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 8px;
        }

        .pb-chip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: var(--pb-surface);
          border: 1px solid var(--pb-border);
          border-radius: 12px;
          text-decoration: none;
          color: var(--pb-ink);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.005em;
          transition:
            border-color 180ms var(--pb-ease),
            background 180ms var(--pb-ease),
            transform 160ms var(--pb-ease);
        }
        @media (hover: hover) and (pointer: fine) {
          .pb-chip:hover {
            border-color: var(--pb-gold);
            background: var(--pb-gold-tint);
          }
        }
        .pb-chip:active { transform: scale(0.98); }

        .pb-chip__arrow {
          color: var(--pb-ink-mute);
          font-size: 16px;
          line-height: 1;
          transition: transform 180ms var(--pb-ease), color 180ms var(--pb-ease);
        }
        .pb-chip:hover .pb-chip__arrow {
          color: var(--pb-gold);
          transform: translateX(2px);
        }

        @media (prefers-reduced-motion: reduce) {
          .pb-tile, .pb-chip, .pb-tile__arrow, .pb-chip__arrow {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
