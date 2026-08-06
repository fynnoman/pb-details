import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pb-fahrzeugpflege.de"),
  title: {
    default: "PB Fahrzeugpflege Saarlouis — The Art of Detailing",
    template: "%s | PB Fahrzeugpflege Saarlouis",
  },
  description:
    "Premium-Fahrzeugaufbereitung und Keramikversiegelung im Saarland und in Luxemburg. Inhabergeführt seit 1997.",
};

/**
 * Root-Layout ist bewusst leer. Sowohl (frontend) als auch (payload)
 * rendern eigenständige <html>/<body>-Bäume, damit das Payload-Admin
 * seine eigene UI-Chrome bekommt und die öffentliche Site unangetastet
 * bleibt. Zulässig in Next.js 15/16, wenn genau ein Layout tiefer html
 * rendert.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
