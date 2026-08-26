import { Inter, Fraunces } from "next/font/google";
import "../globals.css";
import "@/styles/edit.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import CookieBanner from "@/components/CookieBanner";
import GoogleTagManager from "@/components/GoogleTagManager";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/schema";
import { loadFooter, loadNavigation, loadSettings } from "@/lib/site-data";

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
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--ink)]">
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
