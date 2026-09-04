import type { Viewport } from "next";
import localFont from "next/font/local";
import "../globals.css";
import "@/styles/edit.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0d0c0a",
};
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import CookieBanner from "@/components/CookieBanner";
import GoogleTagManager from "@/components/GoogleTagManager";
import CustomCursor from "@/components/motion/CustomCursor";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/schema";
import { loadFooter, loadNavigation, loadSettings } from "@/lib/site-data";

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

/**
 * Frontend-Layout: rendert <html>/<body> für alle öffentlichen Seiten,
 * inkl. Site-Chrome (Nav, Footer, JSON-LD, Consent-Management).
 * Payload-Admin unter (payload)/ hat sein eigenes HTML-Dokument.
 */
export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, navigation, footer] = await Promise.all([
    loadSettings(),
    loadNavigation(),
    loadFooter(),
  ]);

  return (
    <html
      lang="de"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--ink)]">
        <CustomCursor />
        <CookieBanner />
        <GoogleTagManager />
        <JsonLd data={buildOrganizationSchema(settings)} />
        <JsonLd data={buildWebsiteSchema(settings)} />
        <Nav items={navigation.items} cta={navigation.cta} />
        {children}
        <Footer settings={settings} footer={footer} />
      </body>
    </html>
  );
}
