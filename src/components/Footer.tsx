import Link from "next/link";
import type { SiteSettings, FooterData } from "@/lib/site-types";
import EditableText from "./edit/EditableText";

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
    <footer className="relative border-t border-white/5 pt-14 sm:pt-20 pb-10 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        <div className="grid grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="col-span-12 md:col-span-5">
            <img
              src="/images/logo/pb-fahrzeugpflege-logo-black.png"
              alt="PB Fahrzeugpflege Saarlouis"
              className="h-20 sm:h-24 md:h-28 w-auto object-contain mb-6 drop-shadow-[0_2px_12px_rgba(212,180,131,0.25)]"
            />
            <p className="mt-2 text-sm text-[var(--ink-dim)] max-w-sm leading-relaxed">
              <EditableText globalSlug="footer" path="intro" value={footer.intro || ""} multiline />
            </p>
            <div className="mt-8 text-xs tracking-[0.32em] uppercase text-[var(--gold)]">
              <EditableText globalSlug="footer" path="motto" value={footer.motto || ""} />
            </div>
          </div>

          <div className="col-span-6 md:col-span-3">
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
                className="text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
              >
                {settings.phone.display}
              </a>
              <br />
              <a
                href={`mailto:${settings.email}`}
                className="text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
              >
                {settings.email}
              </a>
            </address>
          </div>

          <div className="col-span-6 md:col-span-2">
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
            {settings.provenExpert && (
              <a
                href={settings.provenExpert.url || "#"}
                target="_blank"
                rel="noopener"
                className="glass rounded-2xl p-4 block hover:ring-1 hover:ring-[var(--gold)]/30 transition"
              >
                <div className="font-display text-3xl text-chrome">
                  {settings.provenExpert.value.toString().replace(".", ",")}
                </div>
                <div className="text-xs text-[var(--ink-dim)] mt-1">
                  {settings.provenExpert.count} · ProvenExpert
                </div>
              </a>
            )}
            {settings.google && (
              <a
                href={settings.google.mapsUrl || settings.google.url || "#"}
                target="_blank"
                rel="noopener"
                className="glass rounded-2xl p-4 block mt-3 hover:ring-1 hover:ring-[var(--gold)]/30 transition"
              >
                <div className="font-display text-3xl text-chrome">
                  {settings.google.count}
                </div>
                <div className="text-xs text-[var(--ink-dim)] mt-1">
                  Google-Bewertungen
                </div>
              </a>
            )}
            {settings.wkdb && (
              <div className="glass rounded-2xl p-4 mt-3">
                <div className="font-display text-3xl text-chrome">
                  {settings.wkdb.count}
                </div>
                <div className="text-xs text-[var(--ink-dim)] mt-1">
                  {settings.wkdb.value.toString().replace(".", ",")} · werkenntdenBESTEN
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hairline mb-8" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[var(--ink-mute)]">
          <div>© {year} {settings.name} ® — Alle Rechte vorbehalten.</div>
          <div className="flex gap-6 flex-wrap">
            {footer.legalLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-[var(--ink)] transition-colors"
              >
                <EditableText globalSlug="footer" path={`legalLinks.${i}.label`} value={l.label} />
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("pb-open-consent"));
                }
              }}
              className="hover:text-[var(--ink)] transition-colors underline-offset-4 hover:underline"
            >
              Cookie-Einstellungen
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] tracking-[0.24em] uppercase text-[var(--ink-mute)]/70 leading-relaxed">
            <EditableText globalSlug="footer" path="aiNote" value={footer.aiNote || ""} multiline />
          </p>
        </div>
      </div>
    </footer>
  );
}
