import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { loadSettings } from "@/lib/site-data";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: {
    absolute: "Kontakt & Anfahrt – Ensdorf | PB Fahrzeugpflege Saarlouis",
  },
  description:
    "PB Fahrzeugpflege Saarlouis, Provinzialstraße 243, 66806 Ensdorf. Telefon & WhatsApp: +49 6831 461229. Kommen Sie gern ohne Termin vorbei – wir beraten Sie.",
  alternates: { canonical: "/kontakt/" },
};

export default async function KontaktPage() {
  const settings = await loadSettings();
  const holidayActive =
    settings.holidayNotice?.text &&
    (!settings.holidayNotice.until ||
      new Date(settings.holidayNotice.until) >= new Date());
  const webPage = webPageSchema({
    path: "/kontakt/",
    name: "Kontakt & Anfahrt – Ensdorf | PB Fahrzeugpflege Saarlouis",
    description: `${settings.name}, ${settings.address.street}, ${settings.address.zip} ${settings.address.city}. Telefon & WhatsApp: ${settings.phone.display}.`,
    breadcrumb: breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Kontakt", path: "/kontakt/" },
    ]),
  });
  return (
    <main className="relative">
      <JsonLd data={webPage} />
      <PageHero
        kicker="Kontakt & Anfahrt"
        title="Kontakt & Anfahrt – PB Fahrzeugpflege Saarlouis in Ensdorf"
        subtitle="Lassen Sie uns über Ihr Fahrzeug sprechen. In einem persönlichen Gespräch nehmen wir uns Zeit für Ihr Anliegen und erstellen Ihnen ein individuelles Konzept für Ihr Fahrzeug."
      />

      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Reveal>
              <div className="glass rounded-2xl sm:rounded-[1.5rem] p-6 sm:p-8 h-full">
                <div className="text-[10px] tracking-[0.24em] sm:tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                  Adresse
                </div>
                <div className="font-display text-lg sm:text-xl leading-snug tracking-[-0.015em]">
                  {settings.name}
                </div>
                <address className="not-italic mt-3 text-[var(--ink-dim)] leading-relaxed">
                  {settings.address.street}
                  <br />
                  {settings.address.zip} {settings.address.city}
                </address>
                {settings.google?.mapsUrl && (
                  <a
                    href={settings.google.mapsUrl}
                    target="_blank"
                    rel="noopener"
                    className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--ink-dim)] hover:text-[var(--gold)] transition-colors group min-h-[44px]"
                  >
                    In Karten öffnen
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="glass rounded-2xl sm:rounded-[1.5rem] p-6 sm:p-8 h-full">
                <div className="text-[10px] tracking-[0.24em] sm:tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                  Direkter Draht
                </div>
                <a
                  href={`tel:${settings.phone.e164}`}
                  className="font-display text-lg sm:text-xl leading-snug tracking-[-0.015em] text-chrome hover:text-gold transition-colors block min-h-[32px]"
                >
                  {settings.phone.display}
                </a>
                <div className="mt-4 space-y-2 text-sm text-[var(--ink-dim)]">
                  {settings.whatsapp && (
                    <a
                      href={settings.whatsapp}
                      target="_blank"
                      rel="noopener"
                      className="block hover:text-[var(--ink)] transition-colors min-h-[32px]"
                    >
                      WhatsApp: {settings.phone.display}
                    </a>
                  )}
                  <a
                    href={`mailto:${settings.email}`}
                    className="block hover:text-[var(--ink)] transition-colors break-all min-h-[32px]"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl sm:rounded-[1.5rem] p-6 sm:p-8 h-full">
                <div className="text-[10px] tracking-[0.24em] sm:tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                  Öffnungszeiten
                </div>
                <div className="space-y-2 text-sm text-[var(--ink-dim)]">
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-mute)]">Mo – Fr</span>
                    <span className="text-[var(--ink)]">{settings.weekdayHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-mute)]">Sa</span>
                    <span className="text-[var(--ink)]">{settings.saturdayHours}</span>
                  </div>
                </div>
                <p className="mt-6 text-xs text-[var(--ink-mute)] leading-relaxed">
                  Besuchen Sie uns ganz ohne Termin. Bei weiterer Anfahrt – etwa aus Luxemburg – lohnt sich ein kurzer Anruf vorab.
                </p>
                {holidayActive && (
                  <div className="mt-4 rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/[0.05] px-3 py-2.5 text-xs text-[var(--ink)] leading-snug">
                    <span className="text-[var(--gold)] font-semibold">
                      Feiertagshinweis:
                    </span>{" "}
                    {settings.holidayNotice!.text}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Contact settings={settings} />
      <ContactForm />
    </main>
  );
}
