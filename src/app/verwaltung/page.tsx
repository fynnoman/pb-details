"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const PW_KEY = "pb_verwaltung_pw";

export default function VerwaltungLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Auto-Redirect wenn bereits eingeloggt (Session-Passwort verifizieren)
    const saved = sessionStorage.getItem(PW_KEY);
    if (!saved) return;
    fetch("/api/verwaltung/auth", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: saved }),
    }).then((r) => {
      if (r.ok) router.push("/verwaltung/editor");
    });
  }, [router]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/verwaltung/auth", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      sessionStorage.setItem(PW_KEY, password);
      router.push("/verwaltung/editor");
    } else {
      const b = await res.json().catch(() => ({}));
      setError(b.error || "Falsches Passwort.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f6f4", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img
            src="/images/logo/pb-fahrzeugpflege-logo-black.png"
            alt="PB Fahrzeugpflege"
            style={{ height: 72, marginBottom: 16 }}
          />
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#14120d", letterSpacing: "-0.01em" }}>
            Website-Verwaltung
          </h1>
          <p style={{ margin: "6px 0 0", color: "#928c81", fontSize: 14 }}>
            PB Fahrzeugpflege Saarlouis
          </p>
        </div>

        <form
          onSubmit={login}
          style={{
            background: "#ffffff",
            border: "1px solid #ebe6da",
            borderRadius: 22,
            padding: 32,
            boxShadow: "0 20px 60px -30px rgba(0,0,0,0.15)",
          }}
        >
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#55524d", marginBottom: 8 }}>
            Passwort
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort eingeben"
            autoFocus
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #d6d0c1",
              borderRadius: 12,
              fontSize: 15,
              color: "#14120d",
              background: "#fbfaf7",
              boxSizing: "border-box",
              marginBottom: error ? 8 : 16,
              outline: "none",
              fontFamily: "inherit",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#a37b3f";
              e.target.style.boxShadow = "0 0 0 3px rgba(163,123,63,0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d6d0c1";
              e.target.style.boxShadow = "none";
            }}
          />
          {error && (
            <p style={{ color: "#b8523d", fontSize: 13, margin: "0 0 12px" }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%",
              padding: "12px",
              background: loading || !password ? "#d6cfbf" : "linear-gradient(180deg, #c9a25c, #a37b3f)",
              color: "#ffffff",
              border: "none",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 500,
              cursor: loading || !password ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              transition: "filter 160ms cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            {loading ? "Wird geprüft …" : "Anmelden"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: "#a09b91" }}>
          Nur für autorisierten Zugriff.
        </p>
      </div>
    </div>
  );
}
