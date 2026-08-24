import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wir bauen um · PB Fahrzeugpflege Saarlouis",
  description:
    "Unsere Website wird gerade überarbeitet. Für Terminanfragen erreichen Sie uns telefonisch oder per E-Mail.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background:
            "radial-gradient(1000px 700px at 78% -10%, rgba(163,123,63,0.14), transparent 55%), radial-gradient(800px 600px at 5% 105%, rgba(163,123,63,0.08), transparent 60%), #f6f4f0",
          color: "#14120d",
          fontFamily:
            "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <main
          style={{
            maxWidth: 520,
            width: "100%",
            textAlign: "center",
            background: "#ffffff",
            border: "1px solid rgba(20,15,5,0.08)",
            borderRadius: 22,
            padding: "44px 32px",
            boxShadow: "0 24px 60px -20px rgba(20,15,5,0.14)",
          }}
        >
          <img
            src="/images/logo/pb-fahrzeugpflege-logo-black.png"
            alt="PB Fahrzeugpflege Saarlouis"
            style={{ height: 84, marginBottom: 24 }}
          />
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#a37b3f",
              marginBottom: 14,
            }}
          >
            Umbauphase
          </div>
          <h1
            style={{
              fontFamily: '"Fraunces", "New York", "Times New Roman", serif',
              fontWeight: 400,
              fontSize: "clamp(1.9rem, 5vw, 2.6rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "0 0 18px",
            }}
          >
            Wir befinden uns gerade in einer Umbauphase.
          </h1>
          <p
            style={{
              color: "#55524d",
              fontSize: 16,
              lineHeight: 1.55,
              margin: "0 0 32px",
              maxWidth: "48ch",
              marginInline: "auto",
            }}
          >
            Unsere Website wird gerade überarbeitet. Für Terminanfragen und
            Beratung sind wir wie gewohnt persönlich für Sie da.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
            }}
          >
            <a
              href="tel:+496831461229"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "linear-gradient(180deg, #c9a25c, #a37b3f)",
                color: "#ffffff",
                padding: "12px 22px",
                borderRadius: 999,
                textDecoration: "none",
                fontWeight: 500,
                fontSize: 15,
              }}
            >
              +49 (0) 6831 461229
            </a>
            <a
              href="mailto:info@pb-fahrzeugpflege.de"
              style={{
                color: "#55524d",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              info@pb-fahrzeugpflege.de
            </a>
          </div>

          <div
            style={{
              marginTop: 32,
              paddingTop: 20,
              borderTop: "1px solid rgba(20,15,5,0.06)",
              fontSize: 12,
              color: "#928c81",
              lineHeight: 1.6,
            }}
          >
            PB Fahrzeugpflege Saarlouis
            <br />
            Provinzialstraße 243 · 66806 Ensdorf
            <br />
            Mo–Fr 09–12 · 13–17 · Sa 09–12
          </div>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              gap: 20,
              justifyContent: "center",
              fontSize: 12,
            }}
          >
            <a
              href="/impressum/"
              style={{ color: "#928c81", textDecoration: "none" }}
            >
              Impressum
            </a>
            <a
              href="/datenschutzerklaerung/"
              style={{ color: "#928c81", textDecoration: "none" }}
            >
              Datenschutz
            </a>
            <a
              href="/allgemeine-geschaeftsbedingungen/"
              style={{ color: "#928c81", textDecoration: "none" }}
            >
              AGB
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
