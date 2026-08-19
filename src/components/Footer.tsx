import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
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
              The Art of Detailing. Premium-Fahrzeugaufbereitung und
              Keramikversiegelung – inhabergeführt seit {SITE.founded}.
            </p>
            <div className="mt-8 text-xs tracking-[0.32em] uppercase text-[var(--gold)]">
              „Glanz oder gar nicht."
            </div>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)] mb-4">
              Kontakt
            </div>
            <address className="not-italic text-sm text-[var(--ink-dim)] leading-relaxed">
              {SITE.address.street}
              <br />
              {SITE.address.zip} {SITE.address.city}
              <br />
              <br />
              <a
                href={SITE.phone.href}
                className="text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
              >
                {SITE.phone.display}
              </a>
              <br />
              <a
                href={`mailto:${SITE.email}`}
                className="text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
              >
                {SITE.email}
              </a>
            </address>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)] mb-4">
              Öffnungszeiten
            </div>
            <div className="text-sm text-[var(--ink-dim)] leading-relaxed">
              Mo – Fr<br />
              09 – 12 · 13 – 17<br />
              <br />
              Sa<br />
              09 – 12<br />
              <span className="text-[var(--ink-mute)] text-xs">
                Abweichungen möglich
              </span>
            </div>
            {SITE.hours.holidayNotice && (
              <div className="mt-4 rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/[0.05] px-3 py-2 text-[11px] text-[var(--ink)] leading-snug">
                <span className="text-[var(--gold)] font-semibold">
                  Hinweis:
                </span>{" "}
                {SITE.hours.holidayNotice.text}
              </div>
            )}
          </div>

          <div className="col-span-12 md:col-span-2">
            <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)] mb-4">
              Bewertungen
            </div>
            <a
              href={SITE.social.provenExpert}
              target="_blank"
              rel="noopener"
              className="glass rounded-2xl p-4 block hover:ring-1 hover:ring-[var(--gold)]/30 transition"
            >
              <div className="font-display text-3xl text-chrome">
                {SITE.ratings.value.toString().replace(".", ",")}
              </div>
              <div className="text-xs text-[var(--ink-dim)] mt-1">
                {SITE.ratings.count} · {SITE.ratings.source}
              </div>
            </a>
            <a
              href={SITE.social.googleMaps}
              target="_blank"
              rel="noopener"
              className="glass rounded-2xl p-4 block mt-3 hover:ring-1 hover:ring-[var(--gold)]/30 transition"
            >
              <div className="font-display text-3xl text-chrome">
                {SITE.ratings.googleCount}
              </div>
              <div className="text-xs text-[var(--ink-dim)] mt-1">
                Google-Bewertungen
              </div>
            </a>
            <div className="glass rounded-2xl p-4 mt-3">
              <div className="font-display text-3xl text-chrome">
                {SITE.ratings.wkdbCount}
              </div>
              <div className="text-xs text-[var(--ink-dim)] mt-1">
                {SITE.ratings.wkdbValue.toString().replace(".", ",")} · werkenntdenBESTEN
              </div>
            </div>
          </div>
        </div>

        <div className="hairline mb-8" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[var(--ink-mute)]">
          <div>© {year} {SITE.name} ® — Alle Rechte vorbehalten.</div>
          <div className="flex gap-6">
            <Link
              href="/impressum/"
              className="hover:text-[var(--ink)] transition-colors"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutzerklaerung/"
              className="hover:text-[var(--ink)] transition-colors"
            >
              Datenschutz
            </Link>
            <Link
              href="/allgemeine-geschaeftsbedingungen/"
              className="hover:text-[var(--ink)] transition-colors"
            >
              AGB
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] tracking-[0.24em] uppercase text-[var(--ink-mute)]/70 leading-relaxed">
            Diese Website wurde mit Unterstützung von Künstlicher Intelligenz erstellt.
          </p>
        </div>
      </div>
    </footer>
  );
}
