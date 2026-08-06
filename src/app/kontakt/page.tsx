import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";
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

export default function KontaktPage() {
  const webPage = webPageSchema({
    path: "/kontakt/",
    name: "Kontakt & Anfahrt – Ensdorf | PB Fahrzeugpflege Saarlouis",
    description: `${SITE.name}, ${SITE.address.street}, ${SITE.address.zip} ${SITE.address.city}. Telefon & WhatsApp: ${SITE.phone.display}.`,
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

      {/* Adress- und Zeiten-Info */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal>
              <div className="glass rounded-[1.5rem] p-8 h-full">
                <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                  Adresse
                </div>
                <div className="font-display text-xl leading-snug tracking-[-0.015em]">
                  {SITE.name}
                </div>
                <address className="not-italic mt-3 text-[var(--ink-dim)] leading-relaxed">
                  {SITE.address.street}
                  <br />
                  {SITE.address.zip} {SITE.address.city}
                </address>
                <a
                  href={SITE.social.googleMaps}
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--ink-dim)] hover:text-[var(--gold)] transition-colors group"
                >
                  In Karten öffnen
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="glass rounded-[1.5rem] p-8 h-full">
                <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                  Direkter Draht
                </div>
                <a
                  href={SITE.phone.href}
                  className="font-display text-xl leading-snug tracking-[-0.015em] text-chrome hover:text-gold transition-colors block"
                >
                  {SITE.phone.display}
                </a>
                <div className="mt-4 space-y-2 text-sm text-[var(--ink-dim)]">
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noopener"
                    className="block hover:text-[var(--ink)] transition-colors"
                  >
                    WhatsApp: {SITE.phone.display}
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="block hover:text-[var(--ink)] transition-colors"
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass rounded-[1.5rem] p-8 h-full">
                <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                  Öffnungszeiten
                </div>
                <div className="space-y-2 text-sm text-[var(--ink-dim)]">
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-mute)]">Mo – Fr</span>
                    <span className="text-[var(--ink)]">
                      {SITE.hours.weekday}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-mute)]">Sa</span>
                    <span className="text-[var(--ink)]">
                      {SITE.hours.saturday}
                    </span>
                  </div>
                </div>
                <p className="mt-6 text-xs text-[var(--ink-mute)] leading-relaxed">
                  Besuchen Sie uns ganz ohne Termin. Bei weiterer Anfahrt –
                  etwa aus Luxemburg – lohnt sich ein kurzer Anruf vorab.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
