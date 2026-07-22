export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12 md:col-span-5">
            <div className="font-display text-3xl sm:text-4xl leading-[1.05] tracking-[-0.02em] max-w-md">
              <span className="text-chrome">PB Fahrzeugpflege</span>{" "}
              <span className="italic text-gold">Saarlouis®</span>
            </div>
            <p className="mt-5 text-sm text-[var(--ink-dim)] max-w-sm leading-relaxed">
              The Art of Detailing. Premium-Fahrzeugaufbereitung und
              Keramikversiegelung — inhabergeführt seit 1997.
            </p>
            <div className="mt-8 text-xs tracking-[0.32em] uppercase text-[var(--gold)]">
              „Glanz oder gar nicht.“
            </div>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)] mb-4">
              Kontakt
            </div>
            <address className="not-italic text-sm text-[var(--ink-dim)] leading-relaxed">
              Provinzialstraße 243
              <br />
              66806 Ensdorf
              <br />
              <br />
              <a
                href="tel:+4968314612 29"
                className="text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
              >
                +49 (0) 6831 461229
              </a>
              <br />
              <a
                href="mailto:info@pb-fahrzeugpflege.de"
                className="text-[var(--ink)] hover:text-[var(--gold)] transition-colors"
              >
                info@pb-fahrzeugpflege.de
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
          </div>

          <div className="col-span-12 md:col-span-2">
            <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink-mute)] mb-4">
              Bewertungen
            </div>
            <div className="glass rounded-2xl p-4">
              <div className="font-display text-3xl text-chrome">4,9</div>
              <div className="text-xs text-[var(--ink-dim)] mt-1">
                646 · ProvenExpert
              </div>
              <div className="text-xs text-[var(--ink-mute)] mt-3">
                440 · werkenntdenBESTEN
              </div>
            </div>
          </div>
        </div>

        <div className="hairline mb-8" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[var(--ink-mute)]">
          <div>© {year} PB Fahrzeugpflege Saarlouis ® — Alle Rechte vorbehalten.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--ink)] transition-colors">
              Impressum
            </a>
            <a href="#" className="hover:text-[var(--ink)] transition-colors">
              Datenschutz
            </a>
            <a href="#" className="hover:text-[var(--ink)] transition-colors">
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
