import type { Viewport } from "next";
import localFont from "next/font/local";
import "../globals.css";

const roboto = localFont({
  src: [
    {
      path: "../../fonts/Roboto-Variable.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../../fonts/Roboto-Italic-Variable.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-roboto",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: "Verwaltung · PB Fahrzeugpflege",
  robots: { index: false, follow: false },
};

export default function VerwaltungLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={roboto.variable}>
      <body
        style={{
          fontFamily:
            "var(--font-roboto), -apple-system, 'SF Pro Text', system-ui, sans-serif",
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
