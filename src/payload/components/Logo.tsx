/**
 * Custom Logo für Payload-Admin (Login-Screen + Nav-Header).
 * Hellstes Layout — kein Drop-Shadow-Overkill, klare Typographie.
 */

export default function Logo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        paddingBlock: 8,
      }}
    >
      <img
        src="/images/logo/pb-fahrzeugpflege-logo-black.png"
        alt="PB Fahrzeugpflege Saarlouis"
        style={{
          height: 64,
          width: "auto",
          objectFit: "contain",
        }}
      />
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--pb-ink-mute, #928c81)",
          fontFamily: "var(--font-body)",
          fontWeight: 500,
        }}
      >
        Redaktion · PB Fahrzeugpflege
      </span>
    </div>
  );
}
