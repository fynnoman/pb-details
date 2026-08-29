"use client";

import Reveal from "./Reveal";
import type { HomeData, SiteSettings } from "@/lib/site-types";
import EditableText from "./edit/EditableText";

export default function Region({
  home,
  settings,
}: {
  home: HomeData;
  settings: SiteSettings;
}) {
  const regions = home.regionTags?.map((r) => r.label) || [];
  const heading = home.regionHeading || "Saarland & Luxemburg.";
  const text = home.regionText || "Sie finden uns in der Provinzialstraße 243 in 66806 Ensdorf – direkt bei Saarlouis.";
  const kicker = home.region?.kicker || "Einzugsgebiet";
  const standortLabel = home.region?.standortLabel || "Standort";
  const openMapsLabel = home.region?.openMapsLabel || "In Karten öffnen →";
  const callLabel = home.region?.callLabel || "Anrufen";

  const holidayActive =
    settings.holidayNotice?.text &&
    (!settings.holidayNotice.until ||
      new Date(settings.holidayNotice.until) >= new Date());

  const mapsQuery = encodeURIComponent(
    `${settings.address.street}, ${settings.address.zip} ${settings.address.city}`,
  );

  return (
    <section className="relative py-16 sm:py-24 lg:py-40 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 70% 30%, rgba(212,180,131,0.08), transparent 55%), radial-gradient(900px 700px at 20% 80%, rgba(245,226,184,0.05), transparent 60%), linear-gradient(180deg, var(--bg) 0%, #0a0906 55%, var(--bg) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                <EditableText globalSlug="home" path="region.kicker" value={kicker} />
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(1.75rem,7vw,3.6rem)] leading-[1.05] tracking-[-0.025em]">
                <EditableText globalSlug="home" path="regionHeading" value={heading} />
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[var(--ink-dim)] leading-relaxed max-w-lg">
                <EditableText globalSlug="home" path="regionText" value={text} multiline />
              </p>
            </Reveal>
            {regions.length > 0 && (
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {regions.map((r) => (
                    <span
                      key={r}
                      className="glass-flat rounded-full px-4 py-1.5 text-xs tracking-wide text-[var(--ink-dim)]"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Reveal delay={0.1}>
              <div className="glass-strong rounded-2xl sm:rounded-[1.75rem] p-6 sm:p-8">
                <div className="text-xs tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                  <EditableText globalSlug="home" path="region.standortLabel" value={standortLabel} />
                </div>
                <div className="font-display text-2xl leading-tight">
                  <EditableText globalSlug="settings" path="name" value={settings.name} />
                </div>
                <div className="mt-3 text-[var(--ink-dim)] leading-relaxed">
                  <EditableText globalSlug="settings" path="address.street" value={settings.address.street} />
                  <br />
                  <EditableText globalSlug="settings" path="address.zip" value={settings.address.zip} />
                  {" "}
                  <EditableText globalSlug="settings" path="address.city" value={settings.address.city} />
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-mute)]">Mo – Fr</span>
                    <span className="text-[var(--ink)]">{settings.weekdayHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-mute)]">Sa</span>
                    <span className="text-[var(--ink)]">{settings.saturdayHours}</span>
                  </div>
                  {settings.hoursNote && (
                    <div className="text-[11px] text-[var(--ink-mute)] pt-2">
                      {settings.hoursNote}
                    </div>
                  )}
                  {holidayActive && (
                    <div className="mt-3 rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/[0.05] px-3 py-2.5 text-xs text-[var(--ink)] leading-snug">
                      <span className="text-[var(--gold)] font-semibold">
                        Feiertagshinweis:
                      </span>{" "}
                      {settings.holidayNotice!.text}
                    </div>
                  )}
                </div>
                <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
                  {settings.google?.mapsUrl && (
                    <a
                      href={settings.google.mapsUrl}
                      target="_blank"
                      rel="noopener"
                      className="btn-glass text-sm py-3 px-4 justify-center min-h-[48px] w-full sm:w-auto"
                    >
                      In Karten öffnen →
                    </a>
                  )}
                  <a
                    href={`tel:${settings.phone.e164}`}
                    className="btn-gold text-sm py-3 px-4 justify-center min-h-[48px] w-full sm:w-auto"
                  >
                    Anrufen
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 sm:mt-12 lg:mt-16 rounded-2xl sm:rounded-[1.75rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]">
            <div className="relative aspect-[4/3] sm:aspect-[21/9] bg-black">
              <iframe
                title={`Standort ${settings.name} – ${settings.address.street}, ${settings.address.city}`}
                src={`https://maps.google.com/maps?q=${mapsQuery}&hl=de&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 w-full h-full grayscale-[15%] contrast-[1.05]"
                style={{ border: 0, colorScheme: "normal" }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
