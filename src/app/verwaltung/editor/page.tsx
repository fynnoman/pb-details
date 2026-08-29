"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const PW_KEY = "pb_verwaltung_pw";

type Snapshot = {
  home: any;
  settings: any;
  footer: any;
  navigation: any;
  services: any[];
  vehicles: any[];
  awards: any[];
  faqs: any[];
  posts: any[];
  pages: any[];
};

type SaveState = "idle" | "saving" | "saved" | "error";

/* ── Kleine Bausteine ───────────────────────────────────────────── */

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  const commonStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    minHeight: multiline ? undefined : 44,
    border: "1px solid #d6d0c1",
    borderRadius: 10,
    fontSize: 16,
    color: "#14120d",
    background: "#fbfaf7",
    fontFamily: "inherit",
    boxSizing: "border-box",
    outline: "none",
    resize: multiline ? "vertical" : undefined,
  };
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#928c81", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 6 }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = "#a37b3f";
            e.target.style.boxShadow = "0 0 0 3px rgba(163,123,63,0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#d6d0c1";
            e.target.style.boxShadow = "none";
          }}
          style={commonStyle}
        />
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = "#a37b3f";
            e.target.style.boxShadow = "0 0 0 3px rgba(163,123,63,0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#d6d0c1";
            e.target.style.boxShadow = "none";
          }}
          style={commonStyle}
        />
      )}
    </div>
  );
}

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ background: "#ffffff", border: "1px solid #ebe6da", borderRadius: 18, marginBottom: 16, overflow: "hidden" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px clamp(14px, 3vw, 22px)",
          background: "#fbfaf7",
          border: "none",
          borderBottom: open ? "1px solid #ebe6da" : "none",
          cursor: "pointer",
          fontFamily: "inherit",
          textAlign: "left",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 500, color: "#14120d", fontSize: 15 }}>
          <span style={{ fontSize: 20 }}>{icon}</span> {title}
        </span>
        <span style={{ color: "#a09b91", fontSize: 12 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && <div style={{ padding: "18px clamp(14px, 3vw, 22px)" }}>{children}</div>}
    </div>
  );
}

function ImageUpload({
  label,
  currentUrl,
  password,
  onChange,
}: {
  label: string;
  currentUrl?: string;
  password: string;
  onChange: (id: number | string, url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(currentUrl);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => setPreviewUrl(currentUrl), [currentUrl]);

  const upload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Nur Bilder erlaubt.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("password", password);
      fd.append("file", file);
      fd.append("alt", file.name.replace(/\.[^.]+$/, ""));
      const res = await fetch("/api/verwaltung/upload-image", { method: "POST", body: fd });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const d = await res.json();
      setPreviewUrl(d.url);
      onChange(d.id, d.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload fehlgeschlagen.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#928c81", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 6 }}>
        {label}
      </label>
      {previewUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={previewUrl} alt="" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 10, marginBottom: 8, border: "1px solid #ebe6da" }} />
      )}
      <div
        onClick={() => ref.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files[0];
          if (f) upload(f);
        }}
        style={{
          border: "2px dashed #d6d0c1",
          borderRadius: 10,
          padding: 14,
          textAlign: "center",
          cursor: "pointer",
          background: "#fbfaf7",
          color: "#928c81",
          fontSize: 13,
        }}
      >
        {uploading ? "Lädt hoch …" : "Bild hier reinziehen oder klicken"}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.target.value = "";
          }}
        />
      </div>
      {error && <p style={{ color: "#b8523d", fontSize: 12, margin: "6px 0 0" }}>{error}</p>}
    </div>
  );
}

/* ── Editor ────────────────────────────────────────────────────── */

export default function EditorPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [data, setData] = useState<Snapshot | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(PW_KEY);
    if (!saved) {
      router.push("/verwaltung");
      return;
    }
    setPassword(saved);
    fetch("/api/verwaltung/data")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((err) => setLoadError(err instanceof Error ? err.message : String(err)));
  }, [router]);

  const logout = () => {
    sessionStorage.removeItem(PW_KEY);
    router.push("/verwaltung");
  };

  const save = async () => {
    if (!data) return;
    setSaveState("saving");
    setSaveError(null);
    const payload = {
      password,
      globals: {
        home: stripDoc(data.home),
        settings: stripDoc(data.settings),
        footer: stripDoc(data.footer),
        navigation: stripDoc(data.navigation),
      },
      docs: [
        ...data.services.map((s) => ({ collection: "services", id: s.id, data: stripDoc(s) })),
        ...data.vehicles.map((v) => ({ collection: "vehicles", id: v.id, data: stripDoc(v) })),
        ...data.awards.map((a) => ({ collection: "awards", id: a.id, data: stripDoc(a) })),
        ...data.faqs.map((f) => ({ collection: "faqs", id: f.id, data: stripDoc(f) })),
        ...data.posts.map((p) => ({ collection: "blog-posts", id: p.id, data: stripDoc(p) })),
      ],
    };
    // Debug-Log: erlaubt uns bei Problemen sofort zu sehen, was raus geht.
    // eslint-disable-next-line no-console
    console.log("[verwaltung] Speichere Snapshot", {
      docs: payload.docs.length,
      globals: Object.keys(payload.globals),
    });
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 45_000);
      const res = await fetch("/api/verwaltung/save", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const b = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        errors?: string[];
      };
      if (!res.ok || !b.ok) {
        const msg =
          (b.errors && b.errors.join("\n")) ||
          b.error ||
          `HTTP ${res.status}`;
        // eslint-disable-next-line no-console
        console.error("[verwaltung] Save fehlgeschlagen:", msg, b);
        throw new Error(msg);
      }
      // eslint-disable-next-line no-console
      console.log("[verwaltung] Save erfolgreich");
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 4000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // eslint-disable-next-line no-console
      console.error("[verwaltung] Save Exception:", err);
      setSaveState("error");
      setSaveError(msg);
    }
  };

  if (loadError) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#b8523d" }}>
        Fehler beim Laden: {loadError}
      </div>
    );
  }
  if (!data) {
    return <div style={{ padding: 40, textAlign: "center", color: "#928c81" }}>Lade Inhalte …</div>;
  }

  // Setter Helpers
  const setHome = (patch: any) => setData({ ...data, home: { ...data.home, ...patch } });
  const setHomeSub = (key: string, patch: any) =>
    setData({ ...data, home: { ...data.home, [key]: { ...(data.home[key] || {}), ...patch } } });
  const setSettings = (patch: any) => setData({ ...data, settings: { ...data.settings, ...patch } });
  const setSettingsSub = (key: string, patch: any) =>
    setData({ ...data, settings: { ...data.settings, [key]: { ...(data.settings[key] || {}), ...patch } } });
  const setFooter = (patch: any) => setData({ ...data, footer: { ...data.footer, ...patch } });
  const setService = (idx: number, patch: any) => {
    const services = [...data.services];
    services[idx] = { ...services[idx], ...patch };
    setData({ ...data, services });
  };
  const setVehicle = (idx: number, patch: any) => {
    const vehicles = [...data.vehicles];
    vehicles[idx] = { ...vehicles[idx], ...patch };
    setData({ ...data, vehicles });
  };
  const setAward = (idx: number, patch: any) => {
    const awards = [...data.awards];
    awards[idx] = { ...awards[idx], ...patch };
    setData({ ...data, awards });
  };
  const setFaq = (idx: number, patch: any) => {
    const faqs = [...data.faqs];
    faqs[idx] = { ...faqs[idx], ...patch };
    setData({ ...data, faqs });
  };
  const setPost = (idx: number, patch: any) => {
    const posts = [...data.posts];
    posts[idx] = { ...posts[idx], ...patch };
    setData({ ...data, posts });
  };
  const setPage = (idx: number, patch: any) => {
    const pages = [...data.pages];
    pages[idx] = { ...pages[idx], ...patch };
    setData({ ...data, pages });
  };
  const setNav = (patch: any) =>
    setData({ ...data, navigation: { ...data.navigation, ...patch } });
  const setNavItem = (idx: number, patch: any) => {
    const items = [...(data.navigation?.items || [])];
    items[idx] = { ...items[idx], ...patch };
    setNav({ items });
  };
  const setNavChild = (itemIdx: number, childIdx: number, patch: any) => {
    const items = [...(data.navigation?.items || [])];
    const children = [...(items[itemIdx].children || [])];
    children[childIdx] = { ...children[childIdx], ...patch };
    items[itemIdx] = { ...items[itemIdx], children };
    setNav({ items });
  };

  const home = data.home;
  const settings = data.settings;
  const footer = data.footer;

  return (
    <div style={{ minHeight: "100vh", background: "#f7f6f4" }}>
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#ffffff",
          borderBottom: "1px solid #ebe6da",
          padding: "12px clamp(12px, 3vw, 20px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <img src="/images/logo/pb-fahrzeugpflege-logo-black.png" alt="" style={{ height: 32 }} />
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#14120d" }}>
              Website-Verwaltung
            </p>
            <p style={{ margin: 0, fontSize: 12, color: "#928c81" }} className="pb-adm-sub">
              Änderungen werden nach dem Speichern sofort live
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <a
            href="/"
            target="_blank"
            style={{ fontSize: 13, color: "#928c81", textDecoration: "none" }}
          >
            Website ansehen ↗
          </a>
          <button
            type="button"
            onClick={save}
            disabled={saveState === "saving"}
            style={{
              padding: "10px 16px",
              minHeight: 44,
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 500,
              cursor: saveState === "saving" ? "wait" : "pointer",
              border: "none",
              fontFamily: "inherit",
              background:
                saveState === "saved"
                  ? "#4a8f5b"
                  : saveState === "error"
                  ? "#b8523d"
                  : "linear-gradient(180deg, #c9a25c, #a37b3f)",
              color: "#ffffff",
              transition: "filter 160ms cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            {saveState === "saving"
              ? "Speichert …"
              : saveState === "saved"
              ? "✓ Gespeichert & live"
              : saveState === "error"
              ? "Fehler"
              : "Speichern & Veröffentlichen"}
          </button>
          <button
            type="button"
            onClick={logout}
            style={{ fontSize: 13, color: "#a09b91", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
          >
            Abmelden
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "24px clamp(12px, 3vw, 20px) 80px" }}>
        {saveError && (
          <div
            style={{
              background: "#fdecea",
              border: "1px solid #f5c2b8",
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 20,
              color: "#8f2b1d",
              fontSize: 13,
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
            }}
          >
            <strong style={{ display: "block", marginBottom: 6 }}>
              Speichern fehlgeschlagen
            </strong>
            {saveError}
            <button
              type="button"
              onClick={() => setSaveError(null)}
              style={{
                marginTop: 10,
                background: "none",
                border: "1px solid rgba(143,43,29,0.3)",
                borderRadius: 8,
                padding: "6px 12px",
                color: "#8f2b1d",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "inherit",
              }}
            >
              Ausblenden
            </button>
          </div>
        )}
        <div style={{ background: "#eef3fb", border: "1px solid #d6e4f5", borderRadius: 12, padding: "12px 16px", marginBottom: 20, color: "#3b5878", fontSize: 13 }}>
          <strong>Hinweis:</strong> Nach dem Klick auf „Speichern & Veröffentlichen" sind alle Änderungen sofort auf der Website sichtbar.
        </div>

        {/* HERO */}
        <SectionCard title="Startseite (Hero)" icon="🏠">
          <ImageUpload
            label="Hintergrundbild"
            currentUrl={home.backgroundImage?.url}
            password={password}
            onChange={(id) => setHome({ backgroundImage: id })}
          />
          <Field label="Kicker (kleiner Text)" value={home.kicker || ""} onChange={(v) => setHome({ kicker: v })} />
          <Field label="Große Überschrift" value={home.title || ""} onChange={(v) => setHome({ title: v })} />
          <Field label="Untertitel" value={home.subtitle || ""} onChange={(v) => setHome({ subtitle: v })} multiline />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Primärer Button" value={home.primaryCta?.label || ""} onChange={(v) => setHomeSub("primaryCta", { label: v })} />
            <Field label="Sekundärer Button" value={home.secondaryCta?.label || ""} onChange={(v) => setHomeSub("secondaryCta", { label: v })} />
          </div>
        </SectionCard>

        {/* ANSPRUCH */}
        <SectionCard title="Unser Anspruch (Über uns)" icon="⚙️">
          <Field label="Kicker" value={home.anspruch?.kicker || ""} onChange={(v) => setHomeSub("anspruch", { kicker: v })} />
          <Field label="Überschrift" value={home.anspruch?.title || ""} onChange={(v) => setHomeSub("anspruch", { title: v })} />
          <Field label="Absatz 1" value={home.anspruch?.para1 || ""} onChange={(v) => setHomeSub("anspruch", { para1: v })} multiline />
          <Field label="Absatz 2" value={home.anspruch?.para2 || ""} onChange={(v) => setHomeSub("anspruch", { para2: v })} multiline />
          <Field label="Zitat" value={home.anspruch?.quoteText || ""} onChange={(v) => setHomeSub("anspruch", { quoteText: v })} multiline />
          <Field label="Gründer-Namen (unter Zitat)" value={settings.founders || ""} onChange={(v) => setSettings({ founders: v })} />
        </SectionCard>

        {/* LEISTUNGEN */}
        <SectionCard title="Leistungen" icon="🔧">
          <Field label="Kicker" value={home.services?.kicker || ""} onChange={(v) => setHomeSub("services", { kicker: v })} />
          <Field label="Überschrift" value={home.services?.title || ""} onChange={(v) => setHomeSub("services", { title: v })} />
          <Field label="Intro" value={home.services?.intro || ""} onChange={(v) => setHomeSub("services", { intro: v })} multiline />
          <div style={{ marginTop: 20, borderTop: "1px solid #ebe6da", paddingTop: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#928c81", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>
              Einzelne Leistungen ({data.services.length})
            </p>
            {data.services.map((s, i) => (
              <div key={s.id} style={{ background: "#fbfaf7", border: "1px solid #ebe6da", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                <ImageUpload
                  label={`${s.title} – Bild`}
                  currentUrl={s.heroImage?.url}
                  password={password}
                  onChange={(id) => setService(i, { heroImage: id })}
                />
                <Field label="Titel" value={s.title || ""} onChange={(v) => setService(i, { title: v })} />
                <Field label="Kurzclaim" value={s.tagline || ""} onChange={(v) => setService(i, { tagline: v })} />
                <Field label="Kurzbeschreibung" value={s.intro || ""} onChange={(v) => setService(i, { intro: v })} multiline />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* FAHRZEUGE */}
        <SectionCard title="Fahrzeug-Kategorien" icon="🚗">
          <Field label="Kicker" value={home.vehicles?.kicker || ""} onChange={(v) => setHomeSub("vehicles", { kicker: v })} />
          <Field label="Überschrift" value={home.vehicles?.title || ""} onChange={(v) => setHomeSub("vehicles", { title: v })} />
          <Field label="Intro" value={home.vehicles?.intro || ""} onChange={(v) => setHomeSub("vehicles", { intro: v })} multiline />
          <div style={{ marginTop: 20, borderTop: "1px solid #ebe6da", paddingTop: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#928c81", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>
              Kategorien ({data.vehicles.length})
            </p>
            {data.vehicles.map((v, i) => (
              <div key={v.id} style={{ background: "#fbfaf7", border: "1px solid #ebe6da", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                <ImageUpload
                  label={`${v.label} – Bild`}
                  currentUrl={v.image?.url}
                  password={password}
                  onChange={(id) => setVehicle(i, { image: id })}
                />
                <Field label="Name" value={v.label || ""} onChange={(x) => setVehicle(i, { label: x })} />
                <Field label="Beschreibung" value={v.description || ""} onChange={(x) => setVehicle(i, { description: x })} multiline />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* PROZESS */}
        <SectionCard title="Prozess (3 Schritte)" icon="📋">
          <Field label="Kicker" value={home.processKicker || ""} onChange={(v) => setHome({ processKicker: v })} />
          <Field label="Überschrift" value={home.processHeading || ""} onChange={(v) => setHome({ processHeading: v })} />
          {(home.processSteps || []).map((step: any, i: number) => (
            <div key={i} style={{ background: "#fbfaf7", border: "1px solid #ebe6da", borderRadius: 12, padding: 16, marginBottom: 12 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#a37b3f", textTransform: "uppercase", letterSpacing: "0.22em", margin: "0 0 8px" }}>
                Schritt {i + 1}
              </p>
              <Field label="Titel" value={step.title || ""} onChange={(v) => {
                const processSteps = [...home.processSteps];
                processSteps[i] = { ...step, title: v };
                setHome({ processSteps });
              }} />
              <Field label="Beschreibung" value={step.description || ""} multiline onChange={(v) => {
                const processSteps = [...home.processSteps];
                processSteps[i] = { ...step, description: v };
                setHome({ processSteps });
              }} />
            </div>
          ))}
          <Field label="Fußnote" value={home.processFootnote || ""} onChange={(v) => setHome({ processFootnote: v })} multiline />
        </SectionCard>

        {/* WHYUS */}
        <SectionCard title="Warum uns (Bento)" icon="⭐">
          <Field label="Kicker" value={home.whyUs?.kicker || ""} onChange={(v) => setHomeSub("whyUs", { kicker: v })} />
          <Field label="Überschrift" value={home.whyUsHeading || ""} onChange={(v) => setHome({ whyUsHeading: v })} multiline />
          <Field label="Motto-Label" value={home.mottoLabel || ""} onChange={(v) => setHome({ mottoLabel: v })} />
          <Field label="Motto-Text" value={home.mottoText || ""} onChange={(v) => setHome({ mottoText: v })} />
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#928c81", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8 }}>
              Bulletpoints
            </p>
            {(home.whyUsBullets || []).map((b: any, i: number) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <input
                  type="text"
                  value={b.text || ""}
                  onChange={(e) => {
                    const whyUsBullets = [...home.whyUsBullets];
                    whyUsBullets[i] = { ...b, text: e.target.value };
                    setHome({ whyUsBullets });
                  }}
                  style={{ width: "100%", padding: "8px 12px", border: "1px solid #d6d0c1", borderRadius: 8, fontSize: 14, background: "#fbfaf7", fontFamily: "inherit", boxSizing: "border-box" }}
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* AWARDS */}
        <SectionCard title="Auszeichnungen" icon="🏆">
          <Field label="Kicker" value={home.awards?.kicker || ""} onChange={(v) => setHomeSub("awards", { kicker: v })} />
          <Field label="Überschrift" value={home.awards?.title || ""} onChange={(v) => setHomeSub("awards", { title: v })} />
          <Field label="Link-Text unten" value={home.awards?.linkLabel || ""} onChange={(v) => setHomeSub("awards", { linkLabel: v })} />
          <div style={{ marginTop: 20, borderTop: "1px solid #ebe6da", paddingTop: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#928c81", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>
              Awards ({data.awards.length})
            </p>
            {data.awards.map((a, i) => (
              <div key={a.id} style={{ background: "#fbfaf7", border: "1px solid #ebe6da", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                <p style={{ fontSize: 12, color: "#a37b3f", margin: "0 0 8px", fontWeight: 500 }}>
                  {a.type === "badge" ? "Badge" : "Story-Karte"} · {a.title}
                </p>
                <ImageUpload
                  label="Bild"
                  currentUrl={a.image?.url}
                  password={password}
                  onChange={(id) => setAward(i, { image: id })}
                />
                {a.type === "story" && (
                  <>
                    <Field label="Label" value={a.storyLabel || ""} onChange={(v) => setAward(i, { storyLabel: v })} />
                    <Field label="Text" value={a.storyText || ""} onChange={(v) => setAward(i, { storyText: v })} multiline />
                  </>
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        {/* REGION */}
        <SectionCard title="Region / Standort" icon="📍">
          <Field label="Kicker" value={home.region?.kicker || ""} onChange={(v) => setHomeSub("region", { kicker: v })} />
          <Field label="Überschrift" value={home.regionHeading || ""} onChange={(v) => setHome({ regionHeading: v })} />
          <Field label="Beschreibungstext" value={home.regionText || ""} onChange={(v) => setHome({ regionText: v })} multiline />
        </SectionCard>

        {/* FAQ */}
        <SectionCard title={`Häufige Fragen (${data.faqs.length})`} icon="❓">
          <Field label="Sektion-Kicker" value={home.faq?.kicker || ""} onChange={(v) => setHomeSub("faq", { kicker: v })} />
          <Field label="Sektion-Überschrift" value={home.faq?.title || ""} onChange={(v) => setHomeSub("faq", { title: v })} />
          <div style={{ marginTop: 20, borderTop: "1px solid #ebe6da", paddingTop: 16 }}>
            {data.faqs.map((f, i) => (
              <div key={f.id} style={{ background: "#fbfaf7", border: "1px solid #ebe6da", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                <p style={{ fontSize: 11, color: "#a37b3f", margin: "0 0 8px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em" }}>
                  Thema: {f.topic || "—"}
                </p>
                <Field label="Frage" value={f.question || ""} onChange={(v) => setFaq(i, { question: v })} />
                <Field label="Antwort" value={f.answer || ""} onChange={(v) => setFaq(i, { answer: v })} multiline />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* KONTAKT */}
        <SectionCard title="Kontakt / Termin" icon="📞">
          <Field label="Kicker" value={home.contact?.kicker || ""} onChange={(v) => setHomeSub("contact", { kicker: v })} />
          <Field label="Überschrift" value={home.contact?.title || ""} onChange={(v) => setHomeSub("contact", { title: v })} />
          <Field label="Intro" value={home.contact?.intro || ""} onChange={(v) => setHomeSub("contact", { intro: v })} multiline />
        </SectionCard>

        {/* BETRIEBSDATEN */}
        <SectionCard title="Betriebsdaten (Kontakt & Öffnungszeiten)" icon="🏢">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Firmenname" value={settings.name || ""} onChange={(v) => setSettings({ name: v })} />
            <Field label="Inhaber" value={settings.owner || ""} onChange={(v) => setSettings({ owner: v })} />
          </div>
          <Field label="Straße & Hausnummer" value={settings.address?.street || ""} onChange={(v) => setSettingsSub("address", { street: v })} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12 }}>
            <Field label="PLZ" value={settings.address?.zip || ""} onChange={(v) => setSettingsSub("address", { zip: v })} />
            <Field label="Ort" value={settings.address?.city || ""} onChange={(v) => setSettingsSub("address", { city: v })} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Telefon (Anzeige)" value={settings.phone?.display || ""} onChange={(v) => setSettingsSub("phone", { display: v })} />
            <Field label="Telefon (E.164)" value={settings.phone?.e164 || ""} onChange={(v) => setSettingsSub("phone", { e164: v })} placeholder="+496831461229" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="E-Mail" value={settings.email || ""} onChange={(v) => setSettings({ email: v })} />
            <Field label="WhatsApp-URL" value={settings.whatsapp || ""} onChange={(v) => setSettings({ whatsapp: v })} />
          </div>
          <Field label="Öffnungszeiten Mo–Fr" value={settings.weekdayHours || ""} onChange={(v) => setSettings({ weekdayHours: v })} />
          <Field label="Öffnungszeiten Sa" value={settings.saturdayHours || ""} onChange={(v) => setSettings({ saturdayHours: v })} />
          <Field label="Öffnungszeiten-Hinweis" value={settings.hoursNote || ""} onChange={(v) => setSettings({ hoursNote: v })} />
          <div style={{ marginTop: 12, padding: 12, background: "#fbfaf7", borderRadius: 10 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#928c81", textTransform: "uppercase", letterSpacing: "0.14em", margin: "0 0 8px" }}>
              Feiertags-/Urlaubs-Hinweis (optional, wird auf Region/Kontakt/Footer angezeigt)
            </p>
            <Field label="Text" value={settings.holidayNotice?.text || ""} onChange={(v) => setSettingsSub("holidayNotice", { text: v })} />
            <Field label="Anzeigen bis (YYYY-MM-DD)" value={settings.holidayNotice?.until || ""} onChange={(v) => setSettingsSub("holidayNotice", { until: v })} placeholder="2026-12-31" />
          </div>
        </SectionCard>

        {/* BEWERTUNGEN */}
        <SectionCard title="Bewertungszahlen (ProvenExpert / Google / WKDB)" icon="⭐">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="ProvenExpert – Anzahl" value={String(settings.provenExpert?.count ?? "")} onChange={(v) => setSettingsSub("provenExpert", { count: parseInt(v, 10) || 0 })} />
            <Field label="ProvenExpert – Wert" value={String(settings.provenExpert?.value ?? "")} onChange={(v) => setSettingsSub("provenExpert", { value: parseFloat(v) || 0 })} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Google – Anzahl" value={String(settings.google?.count ?? "")} onChange={(v) => setSettingsSub("google", { count: parseInt(v, 10) || 0 })} />
            <Field label="WKDB – Anzahl" value={String(settings.wkdb?.count ?? "")} onChange={(v) => setSettingsSub("wkdb", { count: parseInt(v, 10) || 0 })} />
          </div>
          <Field label="Weiterempfehlungsquote in %" value={String(settings.recommendation ?? "")} onChange={(v) => setSettings({ recommendation: parseInt(v, 10) || 0 })} />
        </SectionCard>

        {/* FOOTER */}
        <SectionCard title="Footer" icon="📄">
          <Field label="Einleitungstext" value={footer.intro || ""} onChange={(v) => setFooter({ intro: v })} multiline />
          <Field label="Motto" value={footer.motto || ""} onChange={(v) => setFooter({ motto: v })} />
          <Field label="AI-Hinweis (ganz unten)" value={footer.aiNote || ""} onChange={(v) => setFooter({ aiNote: v })} multiline />
        </SectionCard>

        {/* NAVIGATION / MENÜ */}
        <SectionCard title="Menü (Navigation oben)" icon="🧭">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <Field label="CTA-Button (lang)" value={data.navigation?.cta?.label || ""} onChange={(v) => setNav({ cta: { ...(data.navigation?.cta || {}), label: v } })} />
            <Field label="CTA-Button (kurz, Mobile)" value={data.navigation?.cta?.shortLabel || ""} onChange={(v) => setNav({ cta: { ...(data.navigation?.cta || {}), shortLabel: v } })} />
          </div>
          <Field label="CTA-Ziel-URL" value={data.navigation?.cta?.href || ""} onChange={(v) => setNav({ cta: { ...(data.navigation?.cta || {}), href: v } })} />

          <div style={{ marginTop: 20, borderTop: "1px solid #ebe6da", paddingTop: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#928c81", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>
              Menüeinträge ({(data.navigation?.items || []).length})
            </p>
            {(data.navigation?.items || []).map((item: any, i: number) => (
              <div key={i} style={{ background: "#fbfaf7", border: "1px solid #ebe6da", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12 }}>
                  <Field label="Beschriftung" value={item.label || ""} onChange={(v) => setNavItem(i, { label: v })} />
                  <Field label="URL" value={item.href || ""} onChange={(v) => setNavItem(i, { href: v })} />
                </div>
                {item.children && item.children.length > 0 && (
                  <div style={{ marginTop: 8, paddingTop: 12, borderTop: "1px dashed #d6d0c1" }}>
                    <p style={{ fontSize: 10, fontWeight: 600, color: "#a37b3f", textTransform: "uppercase", letterSpacing: "0.14em", margin: "0 0 8px" }}>
                      Unterpunkte (Dropdown)
                    </p>
                    {item.children.map((c: any, ci: number) => (
                      <div key={ci} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12, marginBottom: 6 }}>
                        <Field label={`${ci + 1}. Beschriftung`} value={c.label || ""} onChange={(v) => setNavChild(i, ci, { label: v })} />
                        <Field label="URL" value={c.href || ""} onChange={(v) => setNavChild(i, ci, { href: v })} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        {/* BLOG POSTS */}
        <SectionCard title={`Blogbeiträge (${data.posts.length})`} icon="✍️">
          <p style={{ fontSize: 13, color: "#928c81", marginTop: 0, marginBottom: 16 }}>
            Titel, Intro und Beitragsbild bearbeitest du hier. Den Volltext des Beitrags mit
            Formatierungen im Voll-Editor unter <code style={{ background: "#f2efe8", padding: "2px 6px", borderRadius: 4, fontFamily: "ui-monospace, monospace", fontSize: 12 }}>/admin</code>.
          </p>
          {data.posts.map((post, i) => (
            <div key={post.id} style={{ background: "#fbfaf7", border: "1px solid #ebe6da", borderRadius: 12, padding: 16, marginBottom: 12 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#a37b3f", textTransform: "uppercase", letterSpacing: "0.14em", margin: "0 0 8px" }}>
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("de-DE") : "Ohne Datum"}
              </p>
              <ImageUpload
                label="Beitragsbild"
                currentUrl={post.heroImage?.url}
                password={password}
                onChange={(id) => setPost(i, { heroImage: id })}
              />
              <Field label="Titel" value={post.title || ""} onChange={(v) => setPost(i, { title: v })} />
              <Field label="Intro-Text" value={post.intro || ""} onChange={(v) => setPost(i, { intro: v })} multiline />
              <Field label="Veröffentlichungsdatum (YYYY-MM-DD)" value={post.publishedAt ? String(post.publishedAt).slice(0, 10) : ""} onChange={(v) => setPost(i, { publishedAt: v ? `${v}T00:00:00.000Z` : null })} />
            </div>
          ))}
        </SectionCard>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24, marginBottom: 40 }}>
          <button
            type="button"
            onClick={save}
            disabled={saveState === "saving"}
            style={{
              padding: "14px 32px",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 500,
              cursor: saveState === "saving" ? "wait" : "pointer",
              border: "none",
              fontFamily: "inherit",
              background:
                saveState === "saved" ? "#4a8f5b"
                : saveState === "error" ? "#b8523d"
                : "linear-gradient(180deg, #c9a25c, #a37b3f)",
              color: "#ffffff",
            }}
          >
            {saveState === "saving" ? "Speichert …" : saveState === "saved" ? "✓ Gespeichert & live" : saveState === "error" ? "Fehler" : "Speichern & Veröffentlichen"}
          </button>
        </div>
      </main>
    </div>
  );
}

/** Entfernt Payload-System-Felder aus einem Doc/Global, bevor es zurückgeschrieben wird. */
function stripDoc(doc: any): any {
  if (!doc || typeof doc !== "object") return doc;
  const out: any = {};
  for (const [k, v] of Object.entries(doc)) {
    if (["id", "createdAt", "updatedAt", "_status", "globalType"].includes(k)) continue;
    // Medien: nur die ID zurückschicken, nicht das ganze Doc
    if (v && typeof v === "object" && "id" in v && "filename" in v) {
      out[k] = (v as any).id;
    } else {
      out[k] = v;
    }
  }
  return out;
}

/** Für Pages: nur die im simplen Editor bearbeiteten Felder zurückschicken,
 *  damit die komplexen `sections`-Blocks nicht überschrieben werden. */
function stripPage(p: any): any {
  return {
    title: p.title,
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
  };
}
