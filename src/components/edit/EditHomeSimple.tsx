"use client";

import { mediaUrl } from "@/lib/media";
import EditableText from "./EditableText";
import EditableImage from "./EditableImage";
import type { HomeData, SiteSettings } from "@/lib/site-types";
import type { MediaDoc } from "@/lib/media";

type Service = {
  id: string | number;
  slug: string;
  title: string;
  intro: string;
  heroImage?: MediaDoc;
  features?: Array<{ text: string }>;
};
type Vehicle = {
  id: string | number;
  label: string;
  description: string;
  image?: MediaDoc;
};
type Award = {
  id: string | number;
  title: string;
  type: "badge" | "story";
  image?: MediaDoc;
  storyLabel?: string;
  storyText?: string;
};
type Faq = { id: string | number; question: string; answer: string };

export default function EditHomeSimple({
  home,
  settings,
  services,
  vehicles,
  awards,
  faqs,
}: {
  home: HomeData;
  settings: SiteSettings;
  services: Service[];
  vehicles: Vehicle[];
  awards: Award[];
  faqs: Faq[];
}) {
  const badges = awards.filter((a) => a.type === "badge");
  const stories = awards.filter((a) => a.type === "story");

  return (
    <div className="edit-canvas">
      <div className="edit-canvas__inner">
        {/* HERO ─────────────────────────────────────────────────────── */}
        <Section id="hero" title="Hero (oben auf der Seite)">
          <Field label="Kicker">
            <EditableText
              globalSlug="home"
              path="kicker"
              value={home.kicker || ""}
              as="span"
            />
          </Field>
          <Field label="Große Überschrift">
            <EditableText
              globalSlug="home"
              path="title"
              value={home.title}
              as="span"
            />
          </Field>
          <Field label="Untertitel">
            <EditableText
              globalSlug="home"
              path="subtitle"
              value={home.subtitle || ""}
              as="span"
              multiline
            />
          </Field>
          <Field label="Hintergrundbild">
            <ImageThumb
              globalSlug="home"
              path="backgroundImage"
              current={home.backgroundImage}
              fallback="/images/hero/schwarzes-auto-keramikversiegelung.jpg"
            />
          </Field>
          <Row>
            <Field label="Primärer Button (Text)">
              <EditableText globalSlug="home" path="primaryCta.label" value={home.primaryCta?.label || ""} as="span" />
            </Field>
            <Field label="Sekundärer Button (Text)">
              <EditableText globalSlug="home" path="secondaryCta.label" value={home.secondaryCta?.label || ""} as="span" />
            </Field>
          </Row>
        </Section>

        {/* ANSPRUCH ─────────────────────────────────────────────────── */}
        <Section id="anspruch" title="Unser Anspruch (Über uns)">
          <Field label="Kicker">
            <EditableText globalSlug="home" path="anspruch.kicker" value={home.anspruch?.kicker || "Unser Anspruch"} as="span" />
          </Field>
          <Field label="Überschrift">
            <EditableText globalSlug="home" path="anspruch.title" value={home.anspruch?.title || "Kompromisslose Qualität bis ins Detail."} as="span" />
          </Field>
          <Field label="Absatz 1">
            <EditableText globalSlug="home" path="anspruch.para1" value={home.anspruch?.para1 || ""} as="span" multiline />
          </Field>
          <Field label="Absatz 2">
            <EditableText globalSlug="home" path="anspruch.para2" value={home.anspruch?.para2 || ""} as="span" multiline />
          </Field>
          <Field label="Zitat">
            <EditableText globalSlug="home" path="anspruch.quoteText" value={home.anspruch?.quoteText || ""} as="span" multiline />
          </Field>
          <Field label="Gründer (unter Zitat)">
            <EditableText globalSlug="settings" path="founders" value={settings.founders || ""} as="span" />
          </Field>
        </Section>

        {/* SERVICES ─────────────────────────────────────────────────── */}
        <Section id="services" title="Leistungen">
          <Field label="Kicker">
            <EditableText globalSlug="home" path="services.kicker" value={home.services?.kicker || "Unsere Leistungen"} as="span" />
          </Field>
          <Field label="Überschrift">
            <EditableText globalSlug="home" path="services.title" value={home.services?.title || ""} as="span" />
          </Field>
          <Field label="Intro">
            <EditableText globalSlug="home" path="services.intro" value={home.services?.intro || ""} as="span" multiline />
          </Field>

          <SubHeading>Einzelne Leistungen</SubHeading>
          {services.map((s) => (
            <Card key={String(s.id)}>
              <Row>
                <Field label="Bild">
                  <ImageThumb collection="services" docId={s.id} path="heroImage" current={s.heroImage} />
                </Field>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                  <Field label="Titel">
                    <EditableText collection="services" docId={s.id} path="title" value={s.title} as="span" />
                  </Field>
                  <Field label="Beschreibung">
                    <EditableText collection="services" docId={s.id} path="intro" value={s.intro} as="span" multiline />
                  </Field>
                </div>
              </Row>
              {s.features && s.features.length > 0 && (
                <Field label="Features">
                  {s.features.map((f, fi) => (
                    <div key={fi} className="edit-canvas__bullet">
                      <span>•</span>
                      <EditableText
                        collection="services"
                        docId={s.id}
                        path={`features.${fi}.text`}
                        value={f.text}
                        as="span"
                      />
                    </div>
                  ))}
                </Field>
              )}
            </Card>
          ))}
        </Section>

        {/* VEHICLES ─────────────────────────────────────────────────── */}
        <Section id="vehicles" title="Fahrzeug-Kategorien (Spezialisierung)">
          <Field label="Kicker">
            <EditableText globalSlug="home" path="vehicles.kicker" value={home.vehicles?.kicker || "Spezialisierung"} as="span" />
          </Field>
          <Field label="Überschrift">
            <EditableText globalSlug="home" path="vehicles.title" value={home.vehicles?.title || ""} as="span" />
          </Field>
          <Field label="Intro">
            <EditableText globalSlug="home" path="vehicles.intro" value={home.vehicles?.intro || ""} as="span" multiline />
          </Field>

          <SubHeading>Einzelne Fahrzeug-Kategorien</SubHeading>
          {vehicles.map((v) => (
            <Card key={String(v.id)}>
              <Row>
                <Field label="Bild">
                  <ImageThumb collection="vehicles" docId={v.id} path="image" current={v.image} />
                </Field>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                  <Field label="Name">
                    <EditableText collection="vehicles" docId={v.id} path="label" value={v.label} as="span" />
                  </Field>
                  <Field label="Beschreibung">
                    <EditableText collection="vehicles" docId={v.id} path="description" value={v.description} as="span" multiline />
                  </Field>
                </div>
              </Row>
            </Card>
          ))}
        </Section>

        {/* PROZESS ──────────────────────────────────────────────────── */}
        <Section id="process" title="So läuft es ab (3-Schritte-Prozess)">
          <Field label="Kicker">
            <EditableText globalSlug="home" path="processKicker" value={home.processKicker || ""} as="span" />
          </Field>
          <Field label="Überschrift">
            <EditableText globalSlug="home" path="processHeading" value={home.processHeading || ""} as="span" />
          </Field>
          <SubHeading>Schritte</SubHeading>
          {(home.processSteps || []).map((step, i) => (
            <Card key={i}>
              <div className="edit-canvas__step-num">Schritt {String(i + 1).padStart(2, "0")}</div>
              <Field label="Titel">
                <EditableText globalSlug="home" path={`processSteps.${i}.title`} value={step.title} as="span" />
              </Field>
              <Field label="Beschreibung">
                <EditableText globalSlug="home" path={`processSteps.${i}.description`} value={step.description} as="span" multiline />
              </Field>
            </Card>
          ))}
          <Field label="Fußnote (klein, unter den Schritten)">
            <EditableText globalSlug="home" path="processFootnote" value={home.processFootnote || ""} as="span" multiline />
          </Field>
        </Section>

        {/* WHYUS ────────────────────────────────────────────────────── */}
        <Section id="whyus" title="Warum uns (Bento)">
          <Field label="Kicker">
            <EditableText globalSlug="home" path="whyUs.kicker" value={home.whyUs?.kicker || "Warum PB Fahrzeugpflege"} as="span" />
          </Field>
          <Field label="Überschrift">
            <EditableText globalSlug="home" path="whyUsHeading" value={home.whyUsHeading || ""} as="span" multiline />
          </Field>
          <Field label="Motto-Label (klein)">
            <EditableText globalSlug="home" path="mottoLabel" value={home.mottoLabel || "Motto"} as="span" />
          </Field>
          <Field label="Motto-Text">
            <EditableText globalSlug="home" path="mottoText" value={home.mottoText || ""} as="span" />
          </Field>

          <SubHeading>Bulletpoints</SubHeading>
          {(home.whyUsBullets || []).map((b, i) => (
            <div key={i} className="edit-canvas__bullet">
              <span>{i + 1}.</span>
              <EditableText globalSlug="home" path={`whyUsBullets.${i}.text`} value={b.text} as="span" multiline />
            </div>
          ))}
        </Section>

        {/* AWARDS ───────────────────────────────────────────────────── */}
        <Section id="awards" title="Auszeichnungen">
          <Field label="Kicker">
            <EditableText globalSlug="home" path="awards.kicker" value={home.awards?.kicker || "Ausgezeichnet"} as="span" />
          </Field>
          <Field label="Überschrift">
            <EditableText globalSlug="home" path="awards.title" value={home.awards?.title || ""} as="span" />
          </Field>
          <Field label="Link-Label unten">
            <EditableText globalSlug="home" path="awards.linkLabel" value={home.awards?.linkLabel || ""} as="span" />
          </Field>

          <SubHeading>Badges (Marquee-Logos)</SubHeading>
          <div className="edit-canvas__badge-grid">
            {badges.map((b) => (
              <div key={String(b.id)} className="edit-canvas__badge">
                <ImageThumb collection="awards" docId={b.id} path="image" current={b.image} small />
                <div className="edit-canvas__badge-title">{b.title}</div>
              </div>
            ))}
          </div>

          <SubHeading>Story-Karten</SubHeading>
          {stories.map((s) => (
            <Card key={String(s.id)}>
              <Row>
                <Field label="Bild">
                  <ImageThumb collection="awards" docId={s.id} path="image" current={s.image} />
                </Field>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                  <Field label="Label (klein, oben)">
                    <EditableText collection="awards" docId={s.id} path="storyLabel" value={s.storyLabel || ""} as="span" />
                  </Field>
                  <Field label="Text">
                    <EditableText collection="awards" docId={s.id} path="storyText" value={s.storyText || ""} as="span" multiline />
                  </Field>
                </div>
              </Row>
            </Card>
          ))}
        </Section>

        {/* REGION ───────────────────────────────────────────────────── */}
        <Section id="region" title="Region / Standort">
          <Field label="Kicker">
            <EditableText globalSlug="home" path="region.kicker" value={home.region?.kicker || "Einzugsgebiet"} as="span" />
          </Field>
          <Field label="Überschrift">
            <EditableText globalSlug="home" path="regionHeading" value={home.regionHeading || ""} as="span" />
          </Field>
          <Field label="Text">
            <EditableText globalSlug="home" path="regionText" value={home.regionText || ""} as="span" multiline />
          </Field>
          <Row>
            <Field label="Firmenname">
              <EditableText globalSlug="settings" path="name" value={settings.name} as="span" />
            </Field>
            <Field label="Straße">
              <EditableText globalSlug="settings" path="address.street" value={settings.address.street} as="span" />
            </Field>
            <Field label="PLZ / Ort">
              <EditableText globalSlug="settings" path="address.zip" value={settings.address.zip} as="span" />
              {" "}
              <EditableText globalSlug="settings" path="address.city" value={settings.address.city} as="span" />
            </Field>
          </Row>
        </Section>

        {/* FAQ ──────────────────────────────────────────────────────── */}
        <Section id="faq" title="Häufige Fragen">
          <Field label="Kicker">
            <EditableText globalSlug="home" path="faq.kicker" value={home.faq?.kicker || "Häufige Fragen"} as="span" />
          </Field>
          <Field label="Überschrift">
            <EditableText globalSlug="home" path="faq.title" value={home.faq?.title || ""} as="span" />
          </Field>

          <SubHeading>Fragen &amp; Antworten</SubHeading>
          {faqs.map((f) => (
            <Card key={String(f.id)}>
              <Field label="Frage">
                <EditableText collection="faqs" docId={f.id} path="question" value={f.question} as="span" />
              </Field>
              <Field label="Antwort">
                <EditableText collection="faqs" docId={f.id} path="answer" value={f.answer} as="span" multiline />
              </Field>
            </Card>
          ))}
        </Section>

        {/* CONTACT ──────────────────────────────────────────────────── */}
        <Section id="contact" title="Kontakt / Termin">
          <Field label="Kicker">
            <EditableText globalSlug="home" path="contact.kicker" value={home.contact?.kicker || "Termin vereinbaren"} as="span" />
          </Field>
          <Field label="Überschrift">
            <EditableText globalSlug="home" path="contact.title" value={home.contact?.title || ""} as="span" />
          </Field>
          <Field label="Intro">
            <EditableText globalSlug="home" path="contact.intro" value={home.contact?.intro || ""} as="span" multiline />
          </Field>
          <Row>
            <Field label="Telefon (Anzeige)">
              <EditableText globalSlug="settings" path="phone.display" value={settings.phone.display} as="span" />
            </Field>
            <Field label="E-Mail">
              <EditableText globalSlug="settings" path="email" value={settings.email} as="span" />
            </Field>
            <Field label="Antwortzeit">
              <EditableText globalSlug="home" path="contact.response" value={home.contact?.response || "Antwort in 24 h"} as="span" />
            </Field>
          </Row>
        </Section>

        <div className="edit-canvas__spacer" />
      </div>

      <style>{`
        html.edit-mode, html.edit-mode body { background: #ffffff !important; }
        .edit-canvas {
          background: #ffffff;
          color: #14120d;
          min-height: 100vh;
          font-family: -apple-system, "SF Pro Text", "Inter", system-ui, sans-serif;
          padding-top: 56px; /* Toolbar */
        }
        .edit-canvas__inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 32px 24px 100px;
        }
        .edit-canvas__spacer { height: 60px; }
        .edit-canvas__step-num {
          font-size: 11px; font-weight: 600; letter-spacing: 0.28em;
          text-transform: uppercase; color: #a37b3f; margin-bottom: 4px;
        }
        .edit-canvas__bullet {
          display: flex; gap: 10px; padding: 8px 0;
          border-bottom: 1px solid #f2efe8;
        }
        .edit-canvas__bullet:last-child { border-bottom: none; }
        .edit-canvas__bullet > span:first-child {
          color: #a37b3f; font-weight: 600; min-width: 20px;
        }
        .edit-canvas__badge-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 12px;
        }
        .edit-canvas__badge {
          padding: 12px; border: 1px solid #ebe6da; border-radius: 12px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .edit-canvas__badge-title {
          font-size: 11px; color: #928c81;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
      `}</style>
    </div>
  );
}

/* ── Bausteine ──────────────────────────────────────────────────── */

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="edit-section">
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
        .edit-field {
          display: flex; flex-direction: column; gap: 6px;
        }
        .edit-field__label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #928c81;
        }
        .edit-field__control {
          font-size: 15px;
          line-height: 1.5;
          color: #14120d;
          padding: 10px 12px;
          background: #ffffff;
          border: 1px solid #e6e0d1;
          border-radius: 10px;
          min-height: 42px;
        }
        .edit-field__control:focus-within {
          border-color: #a37b3f;
          box-shadow: 0 0 0 3px rgba(163, 123, 63, 0.15);
        }
        /* Kein extra gold-hover für die Text-Node hier — der Wrapper macht das */
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
      `}</style>
    </label>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="edit-row">
      {children}
      <style>{`
        .edit-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
        }
      `}</style>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="edit-subheading">
      {children}
      <style>{`
        .edit-subheading {
          margin: 8px 0 4px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #14120d;
          border-top: 1px solid #ebe6da;
          padding-top: 20px;
        }
      `}</style>
    </h3>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="edit-card">
      {children}
      <style>{`
        .edit-card {
          padding: 16px;
          background: #fbfaf7;
          border: 1px solid #ebe6da;
          border-radius: 12px;
          display: flex; flex-direction: column; gap: 14px;
        }
      `}</style>
    </div>
  );
}

type ImageThumbProps = {
  current?: MediaDoc | string;
  fallback?: string;
  small?: boolean;
} & (
  | { globalSlug: string; path: string; collection?: never; docId?: never }
  | { collection: string; docId: string | number; path: string; globalSlug?: never }
);

function ImageThumb(props: ImageThumbProps) {
  const { current, fallback, small } = props;
  const url = mediaUrl(current, "thumbnail") || mediaUrl(current) || fallback;
  const size = small ? 80 : 120;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {props.globalSlug ? (
        <EditableImage
          globalSlug={props.globalSlug}
          path={props.path}
          className="edit-thumb"
        >
          {url ? (
            <img
              src={url}
              alt=""
              style={{
                width: size,
                height: size,
                objectFit: "cover",
                borderRadius: 10,
                border: "1px solid #ebe6da",
                background: "#f2efe8",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: size,
                height: size,
                borderRadius: 10,
                border: "1px dashed #ebe6da",
                background: "#fbfaf7",
              }}
            />
          )}
        </EditableImage>
      ) : (
        <EditableImage
          collection={props.collection as string}
          docId={props.docId as string | number}
          path={props.path}
          className="edit-thumb"
        >
          {url ? (
            <img
              src={url}
              alt=""
              style={{
                width: size,
                height: size,
                objectFit: "cover",
                borderRadius: 10,
                border: "1px solid #ebe6da",
                background: "#f2efe8",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: size,
                height: size,
                borderRadius: 10,
                border: "1px dashed #ebe6da",
                background: "#fbfaf7",
              }}
            />
          )}
        </EditableImage>
      )}
    </div>
  );
}
