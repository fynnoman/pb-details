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
  title: "PB Fahrzeugpflege Saarlouis — The Art of Detailing",
  description:
    "Premium-Fahrzeugaufbereitung, Keramikversiegelung und Lackschutz im Saarland und in Luxemburg. Inhabergeführt seit 1997. Sportwagen, Luxusfahrzeuge, Oldtimer.",
  metadataBase: new URL("https://www.pb-fahrzeugpflege.de"),
  openGraph: {
    title: "PB Fahrzeugpflege Saarlouis — The Art of Detailing",
    description:
      "Keramikversiegelung, Fahrzeugaufbereitung und Lackschutz auf Studio-Niveau. Seit 1997.",
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
