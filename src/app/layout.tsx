import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pb-fahrzeugpflege.de"),
  title: {
    default: "PB Fahrzeugpflege Saarlouis — The Art of Detailing",
    template: "%s | PB Fahrzeugpflege Saarlouis",
  },
  description:
    "Premium-Fahrzeugaufbereitung und Keramikversiegelung im Saarland und in Luxemburg. Inhabergeführt seit 1997. Sportwagen, Luxusfahrzeuge, Oldtimer.",
  openGraph: {
    siteName: "PB Fahrzeugpflege Saarlouis",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--ink)]">
        {children}
      </body>
    </html>
  );
}
