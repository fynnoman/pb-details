"use client";

import EditableText from "./EditableText";
import EditableImage from "./EditableImage";
import { mediaUrl } from "@/lib/media";
import type { MediaDoc } from "@/lib/media";

type ServiceDoc = {
  id: string | number;
  slug: string;
  title: string;
  intro: string;
  tagline?: string;
  heroImage?: MediaDoc;
  features?: Array<{ text: string }>;
  metaTitle?: string;
  metaDescription?: string;
};

export default function EditServiceSimple({ service }: { service: ServiceDoc }) {
  const url = mediaUrl(service.heroImage, "card") || mediaUrl(service.heroImage);
  return (
    <div className="edit-canvas">
      <div className="edit-canvas__inner">
        <Section title={`Leistung: ${service.title}`}>
          <Field label="Titel">
            <EditableText collection="services" docId={service.id} path="title" value={service.title} as="span" />
          </Field>
          <Field label="Kurzclaim (unter Titel)">
            <EditableText collection="services" docId={service.id} path="tagline" value={service.tagline || ""} as="span" />
          </Field>
          <Field label="Kurzbeschreibung (Übersicht + Homepage)">
            <EditableText collection="services" docId={service.id} path="intro" value={service.intro} as="span" multiline />
          </Field>
          <Field label="Hauptbild">
            <div style={{ position: "relative", width: 200, height: 130 }}>
              <EditableImage
                collection="services"
                docId={service.id}
                path="heroImage"
                className="edit-thumb"
              >
                {url ? (
                  <img src={url} alt="" style={{ width: 200, height: 130, objectFit: "cover", borderRadius: 10, border: "1px solid #ebe6da", background: "#f2efe8", display: "block" }} />
                ) : (
                  <div style={{ width: 200, height: 130, borderRadius: 10, border: "1px dashed #ebe6da", background: "#fbfaf7" }} />
                )}
              </EditableImage>
            </div>
          </Field>

          {service.features && service.features.length > 0 && (
            <Field label="Features (Bulletpoints)">
              {service.features.map((f, fi) => (
                <div key={fi} className="edit-canvas__bullet">
                  <span>•</span>
                  <EditableText
                    collection="services"
                    docId={service.id}
                    path={`features.${fi}.text`}
                    value={f.text}
                    as="span"
                  />
                </div>
              ))}
            </Field>
          )}
        </Section>

        <Section title="SEO">
          <Field label="Meta-Titel (Browser-Tab)">
            <EditableText collection="services" docId={service.id} path="metaTitle" value={service.metaTitle || ""} as="span" />
          </Field>
          <Field label="Meta-Description (Google-Snippet)">
            <EditableText collection="services" docId={service.id} path="metaDescription" value={service.metaDescription || ""} as="span" multiline />
          </Field>
        </Section>

        <div className="edit-canvas__note">
          Der ausführliche Fließtext dieser Leistung enthält Formatierungen
          (Überschriften, Listen, Tabellen). Bitte im Voll-Editor unter{" "}
          <code>/admin/collections/services</code> bearbeiten.
        </div>

        <div className="edit-canvas__spacer" />
      </div>

      <style>{`
        html.edit-mode, html.edit-mode body { background: #ffffff !important; }
        .edit-canvas {
          background: #ffffff; color: #14120d;
          min-height: 100vh;
          font-family: var(--font-roboto), -apple-system, "SF Pro Text", system-ui, sans-serif;
          padding-top: 56px;
        }
        .edit-canvas__inner { max-width: 900px; margin: 0 auto; padding: 32px 24px 100px; }
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
          background: #f2efe8; padding: 2px 6px; border-radius: 4px;
          font-family: ui-monospace, monospace; font-size: 12px;
        }
        .edit-canvas__bullet {
          display: flex; gap: 10px; padding: 6px 0;
          border-bottom: 1px solid #f2efe8;
        }
        .edit-canvas__bullet:last-child { border-bottom: none; }
        .edit-canvas__bullet > span:first-child {
          color: #a37b3f; font-weight: 600; min-width: 16px;
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="edit-section">
      <h2 className="edit-section__title">{title}</h2>
      <div className="edit-section__body">{children}</div>
      <style>{`
        .edit-section { margin-bottom: 40px; border: 1px solid #ebe6da; border-radius: 16px; overflow: hidden; background: #ffffff; }
        .edit-section__title { margin: 0; padding: 16px 22px; font-size: 12px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; color: #928c81; background: #fbfaf7; border-bottom: 1px solid #ebe6da; font-family: inherit; }
        .edit-section__body { padding: 22px; display: flex; flex-direction: column; gap: 18px; }
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
        .edit-field__label { font-size: 11px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #928c81; }
        .edit-field__control { font-size: 15px; line-height: 1.5; color: #14120d; padding: 10px 12px; background: #ffffff; border: 1px solid #e6e0d1; border-radius: 10px; min-height: 42px; }
        .edit-field__control:focus-within { border-color: #a37b3f; box-shadow: 0 0 0 3px rgba(163, 123, 63, 0.15); }
        .edit-field__control .edit-text { background: transparent !important; box-shadow: none !important; padding: 0 !important; margin: 0 !important; color: #14120d !important; -webkit-text-fill-color: #14120d !important; }
        .edit-field__control .edit-text:focus { background: transparent !important; box-shadow: none !important; }
      `}</style>
    </label>
  );
}
