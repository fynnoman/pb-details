import "../globals.css";

export const metadata = {
  title: "Verwaltung · PB Fahrzeugpflege",
  robots: { index: false, follow: false },
};

export default function VerwaltungLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body
        style={{
          fontFamily:
            "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
          margin: 0,
          background: "#f7f6f4",
          color: "#14120d",
        }}
      >
        {children}
      </body>
    </html>
  );
}
