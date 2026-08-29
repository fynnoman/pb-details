"use client";

import EditableText from "./EditableText";
import EditableImage from "./EditableImage";
import { mediaUrl } from "@/lib/media";
import type { MediaDoc } from "@/lib/media";

/**
 * Simplifizierter Editor für ein `pages`-Dokument.
 * Rendert die Sektionen aus dem Baukasten mit den relevanten Feldern
 * (Kicker/Titel/Untertitel/Buttons/Bild). Rich-Text-Blöcke werden
 * angezeigt als "im Voll-Editor zu bearbeiten".
 */
type PageDoc = {
  id: string | number;
  title: string;
  path: string;
  metaTitle?: string;
  metaDescription?: string;
  sections?: any[];
};

export default function EditPageSimple({ page }: { page: PageDoc }) {
  const sections = page.sections || [];

  return (
    <div className="edit-canvas">
      <div className="edit-canvas__inner">
        <Section title={`Seite: ${page.title}`}>
          <Field label="Interner Titel (nicht öffentlich)">
            <EditableText
              collection="pages"
              docId={page.id}
              path="title"
              value={page.title}
              as="span"
            />
          </Field>
          <Field label="Meta-Titel (SEO, Browser-Tab)">
            <EditableText
              collection="pages"
              docId={page.id}
              path="metaTitle"
              value={page.metaTitle || ""}
              as="span"
            />
          </Field>
          <Field label="Meta-Description (SEO, Google-Snippet)">
            <EditableText
              collection="pages"
              docId={page.id}
              path="metaDescription"
              value={page.metaDescription || ""}
              as="span"
              multiline
            />
          </Field>
          <div className="edit-canvas__note">
            URL: <code>{page.path}</code>
          </div>
        </Section>

        {sections.map((s, i) => (
          <Section key={s.id || i} title={sectionLabel(s.blockType)}>
            {renderSection(page.id, i, s)}
          </Section>
        ))}

        {sections.length === 0 && (
          <div className="edit-canvas__note">
            Diese Seite hat keine Sektionen. Zum Anlegen bitte den
            Voll-Editor unter <code>/admin</code> nutzen.
          </div>
        )}

        <div className="edit-canvas__spacer" />
      </div>

      <style>{`
        html.edit-mode, html.edit-mode body { background: #ffffff !important; }
        .edit-canvas {
          background: #ffffff;
          color: #14120d;
          min-height: 100vh;
          font-family: var(--font-roboto), -apple-system, "SF Pro Text", system-ui, sans-serif;
          padding-top: 56px;
        }
        .edit-canvas__inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 32px 24px 100px;
        }
        .edit-canvas__spacer { height: 60px; }
        .edit-canvas__note {
          padding: 12px 16px;
          background: #fbfaf7;
          border: 1px dashed #ebe6da;
          border-radius: 10px;
          color: #55524d;
          font-size: 13px;
          line-height: 1.6;
        }
        .edit-canvas__note code {
          background: #f2efe8;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: ui-monospace, monospace;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}

/* ── Section-Label je nach blockType ────────────────────────────── */

function sectionLabel(blockType?: string) {
  const map: Record<string, string> = {
    hero: "Hero",
    text: "Textblock",
    leistungsblock: "Leistungsblock",
    "faq-block": "FAQ-Sektion",
    galerie: "Galerie",
    cta: "Call-to-Action",
    vergleichstabelle: "Vergleichstabelle",
    "prozess-schritte": "Prozess-Schritte",
    preistabelle: "Preistabelle",
    "why-us-bento": "Warum uns (Bento)",
    "awards-marquee": "Auszeichnungen",
    "region-block": "Region + Karte",
    "kontakt-block": "Kontakt / Termin",
  };
  return map[blockType || ""] || blockType || "Sektion";
}

/* ── Section-Renderer pro Block ─────────────────────────────────── */

function renderSection(pageId: string | number, i: number, s: any) {
  const p = (field: string) => `sections.${i}.${field}`;
  switch (s.blockType) {
    case "hero":
      return (
        <>
          <Field label="Kicker">
            <EditableText collection="pages" docId={pageId} path={p("kicker")} value={s.kicker || ""} as="span" />
          </Field>
          <Field label="Überschrift">
            <EditableText collection="pages" docId={pageId} path={p("title")} value={s.title || ""} as="span" />
          </Field>
          <Field label="Untertitel">
            <EditableText collection="pages" docId={pageId} path={p("subtitle")} value={s.subtitle || ""} as="span" multiline />
          </Field>
          <Field label="Hintergrundbild">
            <ImageThumb collection="pages" docId={pageId} path={p("backgroundImage")} current={s.backgroundImage} />
          </Field>
          {s.primaryCta && (
            <Row>
              <Field label="Button-Text">
                <EditableText collection="pages" docId={pageId} path={p("primaryCta.label")} value={s.primaryCta?.label || ""} as="span" />
              </Field>
              <Field label="Button-Ziel (URL)">
                <EditableText collection="pages" docId={pageId} path={p("primaryCta.href")} value={s.primaryCta?.href || ""} as="span" />
              </Field>
            </Row>
          )}
        </>
      );

    case "text":
      return (
        <>
          <Field label="Überschrift (H2)">
            <EditableText collection="pages" docId={pageId} path={p("heading")} value={s.heading || ""} as="span" />
          </Field>
          <div className="edit-canvas__note">
            Fließtext dieser Sektion enthält Formatierungen (Überschriften, Listen, Tabellen).
            Bitte im Voll-Editor unter <code>/admin</code> bearbeiten.
          </div>
        </>
      );

    case "cta":
      return (
        <>
          <Field label="Kicker">
            <EditableText collection="pages" docId={pageId} path={p("kicker")} value={s.kicker || ""} as="span" />
          </Field>
          <Field label="Überschrift">
            <EditableText collection="pages" docId={pageId} path={p("heading")} value={s.heading || ""} as="span" />
          </Field>
          <Field label="Beschreibung">
            <EditableText collection="pages" docId={pageId} path={p("text")} value={s.text || ""} as="span" multiline />
          </Field>
          <Row>
            <Field label="Button-Text">
              <EditableText collection="pages" docId={pageId} path={p("primaryLabel")} value={s.primaryLabel || ""} as="span" />
            </Field>
            <Field label="Button-Ziel">
              <EditableText collection="pages" docId={pageId} path={p("primaryHref")} value={s.primaryHref || ""} as="span" />
            </Field>
          </Row>
        </>
      );

    case "leistungsblock":
      return (
        <>
          <Field label="Überschrift">
            <EditableText collection="pages" docId={pageId} path={p("heading")} value={s.heading || ""} as="span" />
          </Field>
          <Field label="Beschreibung">
            <EditableText collection="pages" docId={pageId} path={p("description")} value={s.description || ""} as="span" multiline />
          </Field>
          <Field label="Bild">
            <ImageThumb collection="pages" docId={pageId} path={p("image")} current={s.image} />
          </Field>
          <Field label="Link (URL)">
            <EditableText collection="pages" docId={pageId} path={p("linkHref")} value={s.linkHref || ""} as="span" />
          </Field>
          {s.features && s.features.length > 0 && (
            <Field label="Features">
              {s.features.map((f: any, fi: number) => (
                <div key={fi} className="edit-canvas__bullet">
                  <span>•</span>
                  <EditableText
                    collection="pages"
                    docId={pageId}
                    path={p(`features.${fi}.text`)}
                    value={f.text}
                    as="span"
                  />
                </div>
              ))}
            </Field>
          )}
        </>
      );

    case "prozess-schritte":
      return (
        <>
          <Field label="Kicker">
            <EditableText collection="pages" docId={pageId} path={p("kicker")} value={s.kicker || ""} as="span" />
          </Field>
          <Field label="Überschrift">
            <EditableText collection="pages" docId={pageId} path={p("heading")} value={s.heading || ""} as="span" />
          </Field>
          {(s.steps || []).map((step: any, si: number) => (
            <div key={si} className="edit-canvas__nested">
              <div className="edit-canvas__step-num">Schritt {si + 1}</div>
              <Field label="Titel">
                <EditableText collection="pages" docId={pageId} path={p(`steps.${si}.title`)} value={step.title} as="span" />
              </Field>
              <Field label="Beschreibung">
                <EditableText collection="pages" docId={pageId} path={p(`steps.${si}.description`)} value={step.description} as="span" multiline />
              </Field>
            </div>
          ))}
          <Field label="Fußnote">
            <EditableText collection="pages" docId={pageId} path={p("footnote")} value={s.footnote || ""} as="span" multiline />
          </Field>
        </>
      );

    case "faq-block":
      return (
        <>
          <Field label="Kicker">
            <EditableText collection="pages" docId={pageId} path={p("kicker")} value={s.kicker || ""} as="span" />
          </Field>
          <Field label="Überschrift">
            <EditableText collection="pages" docId={pageId} path={p("heading")} value={s.heading || ""} as="span" />
          </Field>
          <div className="edit-canvas__note">
            Die einzelnen Fragen &amp; Antworten werden im{" "}
            <a href="/edit" style={{ color: "#a37b3f" }}>Startseiten-Editor</a>{" "}
            unter „Häufige Fragen" gepflegt (globales FAQ-Repository).
          </div>
        </>
      );

    case "awards-marquee":
      return (
        <>
          <Field label="Kicker">
            <EditableText collection="pages" docId={pageId} path={p("kicker")} value={s.kicker || ""} as="span" />
          </Field>
          <Field label="Überschrift">
            <EditableText collection="pages" docId={pageId} path={p("heading")} value={s.heading || ""} as="span" />
          </Field>
        </>
      );

    default:
      return (
        <div className="edit-canvas__note">
          Diese Sektion („<code>{s.blockType}</code>") hat Spezial-Felder.
          Bitte im Voll-Editor unter <code>/admin</code> bearbeiten.
        </div>
      );
  }
}

/* ── Reused primitives (leicht überarbeitet) ────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="edit-section">
      <h2 className="edit-section__title">{title}</h2>
      <div className="edit-section__body">{children}</div>
      <style>{`
        .edit-section {
          margin-bottom: 40px;
          border: 1px solid #ebe6da;
          border-radius: 16px;
          overflow: hidden;
          background: #ffffff;
        }
        .edit-section__title {
          margin: 0;
          padding: 16px 22px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #928c81;
          background: #fbfaf7;
          border-bottom: 1px solid #ebe6da;
          font-family: inherit;
        }
        .edit-section__body {
          padding: 22px;
          display: flex; flex-direction: column; gap: 18px;
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="edit-field">
      <span className="edit-field__label">{label}</span>
      <div className="edit-field__control">{children}</div>
      <style>{`
        .edit-field { display: flex; flex-direction: column; gap: 6px; }
        .edit-field__label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: #928c81;
        }
        .edit-field__control {
          font-size: 15px; line-height: 1.5; color: #14120d;
          padding: 10px 12px; background: #ffffff;
          border: 1px solid #e6e0d1; border-radius: 10px; min-height: 42px;
        }
        .edit-field__control:focus-within {
          border-color: #a37b3f;
          box-shadow: 0 0 0 3px rgba(163, 123, 63, 0.15);
        }
        .edit-field__control .edit-text {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
          color: #14120d !important;
          -webkit-text-fill-color: #14120d !important;
        }
        .edit-field__control .edit-text:focus {
          background: transparent !important;
          box-shadow: none !important;
        }
        .edit-canvas__bullet {
          display: flex; gap: 10px; padding: 6px 0;
          border-bottom: 1px solid #f2efe8;
        }
        .edit-canvas__bullet:last-child { border-bottom: none; }
        .edit-canvas__bullet > span:first-child {
          color: #a37b3f; font-weight: 600; min-width: 16px;
        }
        .edit-canvas__nested {
          padding: 14px;
          background: #fbfaf7;
          border: 1px solid #ebe6da;
          border-radius: 10px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .edit-canvas__step-num {
          font-size: 11px; font-weight: 600; letter-spacing: 0.28em;
          text-transform: uppercase; color: #a37b3f;
        }
      `}</style>
    </label>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
      {children}
    </div>
  );
}

function ImageThumb({
  collection,
  docId,
  path,
  current,
}: {
  collection: string;
  docId: string | number;
  path: string;
  current?: MediaDoc | string;
}) {
  const url = mediaUrl(current, "thumbnail") || mediaUrl(current);
  return (
    <div style={{ position: "relative", width: 120, height: 120 }}>
      <EditableImage
        collection={collection}
        docId={docId}
        path={path}
        className="edit-thumb"
      >
        {url ? (
          <img src={url} alt="" style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 10, border: "1px solid #ebe6da", background: "#f2efe8", display: "block" }} />
        ) : (
          <div style={{ width: 120, height: 120, borderRadius: 10, border: "1px dashed #ebe6da", background: "#fbfaf7" }} />
        )}
      </EditableImage>
    </div>
  );
}
