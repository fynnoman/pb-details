import Link from "next/link";
import type { SiteSettings, FooterData } from "@/lib/site-types";
import EditableText from "./edit/EditableText";
import CookieSettingsButton from "./CookieSettingsButton";

export default function Footer({
  settings,
  footer,
}: {
  settings: SiteSettings;
  footer: FooterData;
}) {
  const year = new Date().getFullYear();
  const holidayActive =
    settings.holidayNotice?.text &&
    (!settings.holidayNotice.until ||
      new Date(settings.holidayNotice.until) >= new Date());

  return (
    <footer className="relative border-t border-white/5 pt-12 sm:pt-20 pb-10 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-12 gap-8 sm:gap-8 mb-10 sm:mb-16">
          <div className="col-span-12 md:col-span-5">
            <img
              src="/images/logo/pb-fahrzeugpflege-logo-black.png"
              alt="PB Fahrzeugpflege Saarlouis"
              className="h-16 sm:h-24 md:h-28 w-auto object-contain mb-5 sm:mb-6 drop-shadow-[0_2px_12px_rgba(212,180,131,0.25)]"
            />
            <p className="mt-2 text-sm text-[var(--ink-dim)] max-w-sm leading-relaxed">
              <EditableText globalSlug="footer" path="intro" value={footer.intro || ""} multiline />
            </p>
            <div className="mt-6 sm:mt-8 text-xs tracking-[0.32em] uppercase text-[var(--gold)]">
              <EditableText globalSlug="footer" path="motto" value={footer.motto || ""} />
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)] mb-4">
              Kontakt
            </div>
            <address className="not-italic text-sm text-[var(--ink-dim)] leading-relaxed">
              {settings.address.street}
              <br />
              {settings.address.zip} {settings.address.city}
              <br />
              <br />
              <a
                href={`tel:${settings.phone.e164}`}
                className="text-[var(--ink)] hover:text-[var(--gold)] transition-colors inline-block min-h-[24px]"
              >
                {settings.phone.display}
              </a>
              <br />
              <a
                href={`mailto:${settings.email}`}
                className="text-[var(--ink)] hover:text-[var(--gold)] transition-colors break-all inline-block min-h-[24px]"
              >
                {settings.email}
              </a>
            </address>
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-2">
            <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)] mb-4">
              Öffnungszeiten
            </div>
            <div className="text-sm text-[var(--ink-dim)] leading-relaxed">
              Mo – Fr<br />
              {settings.weekdayHours}
              <br />
              <br />
              Sa<br />
              {settings.saturdayHours}
              <br />
              {settings.hoursNote && (
                <span className="text-[var(--ink-mute)] text-xs">
                  {settings.hoursNote}
                </span>
              )}
            </div>
            {holidayActive && (
              <div className="mt-4 rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/[0.05] px-3 py-2 text-[11px] text-[var(--ink)] leading-snug">
                <span className="text-[var(--gold)] font-semibold">Hinweis:</span>{" "}
                {settings.holidayNotice!.text}
              </div>
            )}
          </div>

          <div className="col-span-12 md:col-span-2">
            <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)] mb-4">
              Bewertungen
            </div>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
              {settings.provenExpert && (
                <a
                  href={settings.provenExpert.url || "#"}
                  target="_blank"
                  rel="noopener"
                  className="glass rounded-2xl p-3 sm:p-4 block hover:ring-1 hover:ring-[var(--gold)]/30 transition min-h-[48px]"
                >
                  <div className="font-display text-2xl sm:text-3xl text-chrome leading-none">
                    {settings.provenExpert.value.toString().replace(".", ",")}
                  </div>
                  <div className="text-[10px] sm:text-xs text-[var(--ink-dim)] mt-1 leading-tight">
                    {settings.provenExpert.count} · ProvenExpert
                  </div>
                </a>
              )}
              {settings.google && (
                <a
                  href={settings.google.mapsUrl || settings.google.url || "#"}
                  target="_blank"
                  rel="noopener"
                  className="glass rounded-2xl p-3 sm:p-4 block hover:ring-1 hover:ring-[var(--gold)]/30 transition min-h-[48px]"
                >
                  <div className="font-display text-2xl sm:text-3xl text-chrome leading-none">
                    {settings.google.count}
                  </div>
                  <div className="text-[10px] sm:text-xs text-[var(--ink-dim)] mt-1 leading-tight">
                    Google-Bewertungen
                  </div>
                </a>
              )}
              {settings.wkdb && (
                <div className="glass rounded-2xl p-3 sm:p-4 min-h-[48px]">
                  <div className="font-display text-2xl sm:text-3xl text-chrome leading-none">
                    {settings.wkdb.count}
                  </div>
                  <div className="text-[10px] sm:text-xs text-[var(--ink-dim)] mt-1 leading-tight">
                    {settings.wkdb.value.toString().replace(".", ",")} · WKDB
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hairline mb-8" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[var(--ink-mute)]">
          <div className="leading-relaxed">© {year} {settings.name} ® — Alle Rechte vorbehalten.</div>
          <div className="flex gap-x-5 gap-y-2 flex-wrap">
            {footer.legalLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-[var(--ink)] transition-colors min-h-[32px] inline-flex items-center"
              >
                <EditableText globalSlug="footer" path={`legalLinks.${i}.label`} value={l.label} />
              </Link>
            ))}
            <CookieSettingsButton />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] tracking-[0.24em] uppercase text-[var(--ink-mute)]/70 leading-relaxed">
            <EditableText globalSlug="footer" path="aiNote" value={footer.aiNote || ""} multiline />
          </p>
          <p className="mt-4 text-xs text-[var(--ink-mute)] leading-none">
            Erstellt von{" "}
            <a
              href="https://fylumarketing.de"
              target="_blank"
              rel="noopener"
              className="hover:text-[var(--ink)] transition-colors underline underline-offset-4"
            >
              Fylu Marketing
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
