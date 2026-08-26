"use client";

import { useEffect, useState } from "react";

const CONSENT_COOKIE = "pb_consent_v1";
/** 6 Monate — DSGVO-konform. */
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export type Consent = {
  version: 1;
  timestamp: string; // ISO
  necessary: true; // immer aktiv
  analytics: boolean;
  marketing: boolean;
};

/* ── Cookie-Utility ─────────────────────────────────────────────── */

function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((r) => r.startsWith(`${CONSENT_COOKIE}=`));
  if (!raw) return null;
  try {
    const value = decodeURIComponent(raw.slice(CONSENT_COOKIE.length + 1));
    const parsed = JSON.parse(value) as Consent;
    if (parsed?.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(consent: Consent) {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(consent));
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
  // Signal an andere Skripte (GTM, GA4 usw.), dass sich Consent geändert hat
  window.dispatchEvent(new CustomEvent("pb-consent-changed", { detail: consent }));
}

/** Public Helper: Consent auslesen (auch für Server-Consumer via cookie). */
export function getConsent(): Consent | null {
  return readConsent();
}

/** Public Helper: prüft eine Kategorie. */
export function hasConsent(category: ConsentCategory): boolean {
  const c = readConsent();
  if (!c) return category === "necessary";
  return c[category] === true;
}

/* ── Banner-Komponente ─────────────────────────────────────────── */

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!readConsent()) setVisible(true);
    // Global öffnen von woanders (Footer-Link „Cookie-Einstellungen")
    const openSettings = () => {
      const c = readConsent();
      if (c) {
        setAnalytics(c.analytics);
        setMarketing(c.marketing);
      }
      setShowSettings(true);
      setVisible(true);
    };
    window.addEventListener("pb-open-consent", openSettings);
    return () => window.removeEventListener("pb-open-consent", openSettings);
  }, []);

  const acceptAll = () => {
    writeConsent({
      version: 1,
      timestamp: new Date().toISOString(),
      necessary: true,
      analytics: true,
      marketing: true,
    });
    setVisible(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    writeConsent({
      version: 1,
      timestamp: new Date().toISOString(),
      necessary: true,
      analytics: false,
      marketing: false,
    });
    setVisible(false);
    setShowSettings(false);
  };

  const saveSelection = () => {
    writeConsent({
      version: 1,
      timestamp: new Date().toISOString(),
      necessary: true,
      analytics,
      marketing,
    });
    setVisible(false);
    setShowSettings(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pb-cookie-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(20, 18, 14, 0.55)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: 16,
        pointerEvents: "auto",
        fontFamily:
          "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          color: "#14120d",
          maxWidth: 640,
          width: "100%",
          borderRadius: 20,
          padding: 26,
          boxShadow: "0 24px 60px -20px rgba(0,0,0,0.5)",
          border: "1px solid rgba(20,15,5,0.08)",
        }}
      >
        <h2
          id="pb-cookie-title"
          style={{
            fontFamily:
              '"Fraunces", "New York", "Times New Roman", serif',
            fontWeight: 400,
            fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "0 0 12px",
          }}
        >
          Cookies &amp; Datenschutz
        </h2>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            color: "#55524d",
            margin: "0 0 20px",
          }}
        >
          Wir nutzen Cookies, um unsere Website zu betreiben und – nur mit
          Ihrer Einwilligung – die Nutzung anonym zu analysieren. Sie können
          alle Kategorien akzeptieren, ablehnen oder einzeln auswählen.
          Details in unserer{" "}
          <a
            href="/datenschutzerklaerung/"
            style={{ color: "#a37b3f", textDecoration: "underline" }}
          >
            Datenschutzerklärung
          </a>
          .
        </p>

        {showSettings && (
          <div style={{ marginBottom: 20 }}>
            <CategoryRow
              title="Notwendig"
              description="Für den Betrieb der Website erforderlich (Sicherheit, Formular, Consent-Speicherung). Kann nicht deaktiviert werden."
              locked
              checked
              onChange={() => {}}
            />
            <CategoryRow
              title="Analyse (anonym)"
              description="Hilft uns zu verstehen, wie die Website genutzt wird, damit wir sie verbessern können. Keine personenbezogenen Auswertungen."
              checked={analytics}
              onChange={setAnalytics}
            />
            <CategoryRow
              title="Marketing"
              description="Damit unsere Anzeigen relevanter für Sie sind. Wird gesetzt, wenn Sie Marketing-Kampagnen wiedererkennen möchten."
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {!showSettings && (
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              style={btnGhost}
            >
              Einstellungen
            </button>
          )}
          <button type="button" onClick={rejectAll} style={btnGhost}>
            {showSettings ? "Alle ablehnen" : "Nur notwendige"}
          </button>
          {showSettings ? (
            <button type="button" onClick={saveSelection} style={btnPrimary}>
              Auswahl speichern
            </button>
          ) : (
            <button type="button" onClick={acceptAll} style={btnPrimary}>
              Alle akzeptieren
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Sub-Komponenten ────────────────────────────────────────────── */

function CategoryRow({
  title,
  description,
  checked,
  onChange,
  locked = false,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  locked?: boolean;
}) {
  return (
    <label
      style={{
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        padding: "12px 0",
        borderBottom: "1px solid #ebe6da",
        cursor: locked ? "not-allowed" : "pointer",
      }}
    >
      <div style={{ paddingTop: 3 }}>
        <input
          type="checkbox"
          checked={checked}
          disabled={locked}
          onChange={(e) => onChange(e.target.checked)}
          style={{
            width: 18,
            height: 18,
            accentColor: "#a37b3f",
            cursor: locked ? "not-allowed" : "pointer",
          }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#14120d",
            marginBottom: 2,
          }}
        >
          {title}
          {locked && (
            <span
              style={{
                marginLeft: 8,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#a37b3f",
              }}
            >
              Immer aktiv
            </span>
          )}
        </div>
        <div style={{ fontSize: 12.5, color: "#6d685f", lineHeight: 1.5 }}>
          {description}
        </div>
      </div>
    </label>
  );
}

const btnGhost: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  border: "1px solid rgba(20,15,5,0.12)",
  background: "#ffffff",
  color: "#14120d",
  fontFamily: "inherit",
  transition: "background 160ms cubic-bezier(0.23,1,0.32,1)",
};

const btnPrimary: React.CSSProperties = {
  padding: "10px 22px",
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  border: "none",
  background: "linear-gradient(180deg, #c9a25c, #a37b3f)",
  color: "#ffffff",
  fontFamily: "inherit",
  transition: "filter 160ms cubic-bezier(0.23,1,0.32,1)",
};
