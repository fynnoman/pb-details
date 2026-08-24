import Link from "next/link";
import Reveal from "./Reveal";
import LexicalRenderer from "./LexicalRenderer";
import FAQ from "./FAQ";
import Awards, { type AwardItem } from "./Awards";
import Region from "./Region";
import Contact from "./Contact";
import {
  loadAwards,
  loadFaqsByTopic,
  loadSettings,
  loadHomeGlobal,
} from "@/lib/site-data";
import { mediaUrl } from "@/lib/media";
import type { MediaDoc } from "@/lib/media";

type BaseBlock<T extends string, D = Record<string, unknown>> = {
  blockType: T;
  id?: string;
} & D;

type Section =
  | BaseBlock<"hero", { kicker?: string; title: string; subtitle?: string; backgroundImage?: MediaDoc | string; primaryCta?: { label?: string; href?: string } }>
  | BaseBlock<"text", { heading?: string; body: any }>
  | BaseBlock<"leistungsblock", { heading: string; description?: string; features?: Array<{ text: string }>; image?: MediaDoc; linkHref?: string }>
  | BaseBlock<"faq-block", { kicker?: string; heading?: string; faqs?: Array<string | number | { id: string | number; question: string; answer: string }> }>
  | BaseBlock<"galerie", { heading?: string; images?: Array<{ image?: MediaDoc }> }>
  | BaseBlock<"cta", { kicker?: string; heading: string; text?: string; primaryLabel?: string; primaryHref?: string }>
  | BaseBlock<"vergleichstabelle", { heading?: string; intro?: string; columnA: string; columnB: string; rows?: Array<{ kriterium: string; valueA: string; valueB: string }> }>
  | BaseBlock<"prozess-schritte", { kicker?: string; heading: string; steps?: Array<{ title: string; description: string }>; footnote?: string }>
  | BaseBlock<"preistabelle", { kicker?: string; heading: string; intro?: string; packages?: Array<{ name: string; price: string; priceNote?: string; description?: string; positions?: Array<{ text: string }>; highlighted?: boolean; ctaLabel?: string; ctaHref?: string }>; footnote?: string }>
  | BaseBlock<"why-us-bento", { kicker?: string; heading: string; metrics?: Array<{ headline: string; body: string }>; bullets?: Array<{ text: string }> }>
  | BaseBlock<"awards-marquee", { kicker?: string; heading: string; showStoryCards?: boolean }>
  | BaseBlock<"region-block", { kicker?: string; heading: string; text?: string; regions?: Array<{ label: string }>; showMap?: boolean }>
  | BaseBlock<"kontakt-block", { kicker?: string; heading: string; text?: string; showCalendly?: boolean }>;

export default async function SectionRenderer({ sections }: { sections?: Section[] }) {
  if (!sections || sections.length === 0) return null;
  return (
    <>
      {sections.map((s, i) => (
        <RenderSection key={s.id || i} section={s} index={i} />
      ))}
    </>
  );
}

async function RenderSection({ section, index }: { section: Section; index: number }) {
  switch (section.blockType) {
    case "hero": {
      const bg =
        typeof section.backgroundImage === "string"
          ? section.backgroundImage
          : mediaUrl(section.backgroundImage, "hero");
      return (
        <section className="relative min-h-[60vh] flex items-end pt-32 sm:pt-44 pb-16 sm:pb-24 overflow-hidden">
          {bg && (
            <div aria-hidden className="absolute inset-0">
              <img src={bg} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[var(--bg)]" />
            </div>
          )}
          <div className="relative z-10 mx-auto max-w-[1200px] w-full px-5 sm:px-10">
            {section.kicker && (
              <p className="text-[11px] sm:text-xs tracking-[0.42em] uppercase text-[var(--ink-dim)] mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                {section.kicker}
              </p>
            )}
            <h1 className="font-display text-[clamp(2rem,5vw,4.2rem)] leading-[1.02] tracking-[-0.025em] max-w-[22ch]">
              {section.title}
            </h1>
            {section.subtitle && (
              <p className="mt-6 max-w-2xl text-[var(--ink-dim)] text-base sm:text-lg leading-relaxed">
                {section.subtitle}
              </p>
            )}
            {section.primaryCta?.href && (
              <div className="mt-8">
                <Link href={section.primaryCta.href} className="btn-gold">
                  {section.primaryCta.label || "Mehr erfahren"}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            )}
          </div>
        </section>
      );
    }

    case "text": {
      return (
        <section className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-[820px] px-5 sm:px-10">
            {section.heading && (
              <Reveal>
                <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
                  {section.heading}
                </h2>
              </Reveal>
            )}
            <Reveal delay={0.05}>
              <LexicalRenderer data={section.body} />
            </Reveal>
          </div>
        </section>
      );
    }

    case "leistungsblock": {
      const img = mediaUrl(section.image, "card") || mediaUrl(section.image);
      const inner = (
        <div className="glass rounded-[1.5rem] overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {img && (
            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-black">
              <img
                src={img}
                alt={section.image?.alt || section.heading}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            <h3 className="font-display text-2xl sm:text-3xl leading-tight tracking-[-0.015em] mb-4">
              {section.heading}
            </h3>
            {section.description && (
              <p className="text-[var(--ink-dim)] leading-relaxed">{section.description}</p>
            )}
            {section.features && (
              <ul className="mt-6 space-y-2">
                {section.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-3 text-sm text-[var(--ink)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                    {f.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
      return (
        <section className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10">
            <Reveal delay={index * 0.04}>
              {section.linkHref ? <Link href={section.linkHref}>{inner}</Link> : inner}
            </Reveal>
          </div>
        </section>
      );
    }

    case "faq-block": {
      // Payload gibt bei depth=3 direkt die verlinkten Doks zurück
      const faqDocs = (section.faqs || []).filter(
        (x): x is { id: string | number; question: string; answer: string } =>
          typeof x === "object" && x !== null && "question" in x,
      );
      const faqs = faqDocs.map((f) => ({ question: f.question, answer: f.answer }));
      if (faqs.length === 0) return null;
      return (
        <FAQ
          kicker={section.kicker || "Häufige Fragen"}
          title={section.heading || "Antworten auf häufige Fragen"}
          faqs={faqs}
          showAllLink={false}
          id={`faq-${index}`}
        />
      );
    }

    case "galerie": {
      const items = (section.images || []).filter((i) => i.image);
      if (items.length === 0) return null;
      return (
        <section className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10">
            {section.heading && (
              <Reveal>
                <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-10">
                  {section.heading}
                </h2>
              </Reveal>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((it, i) => {
                const url = mediaUrl(it.image, "card") || mediaUrl(it.image);
                return (
                  <Reveal key={String(it.image?.id ?? i)} delay={i * 0.04}>
                    <div className="glass rounded-[1.25rem] overflow-hidden aspect-[4/3] relative">
                      {url && (
                        <img
                          src={url}
                          alt={it.image?.alt || ""}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      );
    }

    case "cta": {
      return (
        <section className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-[900px] px-5 sm:px-10">
            <div className="glass-strong rounded-[1.75rem] p-8 sm:p-12 text-center">
              {section.kicker && (
                <p className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                  {section.kicker}
                </p>
              )}
              <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
                {section.heading}
              </h2>
              {section.text && (
                <p className="mt-5 text-[var(--ink-dim)] leading-relaxed max-w-lg mx-auto">
                  {section.text}
                </p>
              )}
              {section.primaryHref && (
                <div className="mt-8">
                  <Link href={section.primaryHref} className="btn-gold">
                    {section.primaryLabel || "Kontakt aufnehmen"}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      );
    }

    case "vergleichstabelle": {
      return (
        <section className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-[1100px] px-5 sm:px-10">
            {section.heading && (
              <Reveal>
                <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-6">
                  {section.heading}
                </h2>
              </Reveal>
            )}
            {section.intro && (
              <Reveal delay={0.05}>
                <p className="text-[var(--ink-dim)] leading-relaxed text-lg max-w-[70ch] mb-10">
                  {section.intro}
                </p>
              </Reveal>
            )}
            <Reveal delay={0.1}>
              <div className="glass rounded-[1.5rem] overflow-hidden">
                <div className="grid grid-cols-12 gap-0 text-[11px] tracking-[0.28em] uppercase text-[var(--ink-mute)] px-6 sm:px-8 py-5 border-b border-white/5">
                  <div className="col-span-12 sm:col-span-4">Kriterium</div>
                  <div className="col-span-6 sm:col-span-4 text-[var(--gold)]">
                    {section.columnA}
                  </div>
                  <div className="col-span-6 sm:col-span-4">{section.columnB}</div>
                </div>
                <ul className="divide-y divide-white/5">
                  {(section.rows || []).map((row) => (
                    <li
                      key={row.kriterium}
                      className="grid grid-cols-12 gap-4 px-6 sm:px-8 py-5 text-sm sm:text-base"
                    >
                      <div className="col-span-12 sm:col-span-4 font-medium text-[var(--ink)]">
                        {row.kriterium}
                      </div>
                      <div className="col-span-6 sm:col-span-4 text-[var(--ink-dim)]">
                        {row.valueA}
                      </div>
                      <div className="col-span-6 sm:col-span-4 text-[var(--ink-dim)]">
                        {row.valueB}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      );
    }

    case "prozess-schritte": {
      return (
        <section className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10">
            {section.kicker && (
              <Reveal>
                <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                  <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                  {section.kicker}
                </p>
              </Reveal>
            )}
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-12">
                {section.heading}
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {(section.steps || []).map((s, i) => (
                <Reveal key={s.title} delay={0.1 + i * 0.05}>
                  <div className="glass rounded-[1.5rem] p-8 h-full">
                    <div className="text-xs tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
                      Schritt {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-display text-2xl leading-tight mb-3">{s.title}</h3>
                    <p className="text-[var(--ink-dim)] leading-relaxed">{s.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            {section.footnote && (
              <Reveal delay={0.3}>
                <p className="mt-10 text-center text-sm text-[var(--ink-mute)]">
                  {section.footnote}
                </p>
              </Reveal>
            )}
          </div>
        </section>
      );
    }

    case "preistabelle": {
      const packages = section.packages || [];
      return (
        <section className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10">
            {section.kicker && (
              <Reveal>
                <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                  <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                  {section.kicker}
                </p>
              </Reveal>
            )}
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-6">
                {section.heading}
              </h2>
            </Reveal>
            {section.intro && (
              <Reveal delay={0.1}>
                <p className="text-[var(--ink-dim)] leading-relaxed text-lg max-w-[70ch] mb-12">
                  {section.intro}
                </p>
              </Reveal>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {packages.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.05}>
                  <div
                    className={`glass rounded-[1.5rem] p-8 h-full flex flex-col ${
                      p.highlighted ? "ring-1 ring-[var(--gold)]" : ""
                    }`}
                  >
                    <h3 className="font-display text-2xl leading-tight tracking-[-0.015em]">{p.name}</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-display text-3xl text-chrome">{p.price}</span>
                      {p.priceNote && (
                        <span className="text-xs text-[var(--ink-mute)]">{p.priceNote}</span>
                      )}
                    </div>
                    {p.description && (
                      <p className="mt-4 text-sm text-[var(--ink-dim)] leading-relaxed">
                        {p.description}
                      </p>
                    )}
                    {p.positions && (
                      <ul className="mt-6 space-y-2 flex-1">
                        {p.positions.map((pos) => (
                          <li key={pos.text} className="flex items-start gap-3 text-sm text-[var(--ink-dim)]">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                            <span>{pos.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {p.ctaHref && (
                      <Link
                        href={p.ctaHref}
                        className={`mt-8 ${p.highlighted ? "btn-gold" : "btn-glass"} justify-center`}
                      >
                        {p.ctaLabel || "Anfragen"}
                        <span aria-hidden>→</span>
                      </Link>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
            {section.footnote && (
              <Reveal delay={0.3}>
                <p className="mt-10 text-sm text-[var(--ink-mute)] text-center">
                  {section.footnote}
                </p>
              </Reveal>
            )}
          </div>
        </section>
      );
    }

    case "why-us-bento": {
      return (
        <section className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10">
            {section.kicker && (
              <Reveal>
                <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                  <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                  {section.kicker}
                </p>
              </Reveal>
            )}
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-12 max-w-[22ch]">
                {section.heading}
              </h2>
            </Reveal>
            {section.metrics && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {section.metrics.map((m, i) => (
                  <Reveal key={m.headline} delay={0.1 + i * 0.05}>
                    <div className="glass rounded-[1.25rem] p-6 min-h-[130px] flex flex-col justify-between">
                      <div className="font-display text-3xl sm:text-4xl leading-none text-chrome">
                        {m.headline}
                      </div>
                      <div className="text-xs text-[var(--ink-dim)] mt-3 leading-relaxed">
                        {m.body}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
            {section.bullets && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {section.bullets.map((b, i) => (
                  <Reveal key={b.text} delay={i * 0.04}>
                    <div className="glass-flat rounded-2xl px-5 py-4 flex items-start gap-3 text-sm text-[var(--ink-dim)]">
                      <span className="mt-1 shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-[#f5e2b8] to-[#8a6a3f] flex items-center justify-center text-[8px] text-black">
                        ✓
                      </span>
                      <span>{b.text}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      );
    }

    case "awards-marquee": {
      const awards = (await loadAwards()) as AwardItem[];
      return <Awards awards={awards} showStoryCards={section.showStoryCards ?? true} />;
    }

    case "region-block": {
      const [settings, home] = await Promise.all([loadSettings(), loadHomeGlobal()]);
      // Override region-Details wenn im Block explizit gesetzt
      const merged = {
        ...home,
        regionHeading: section.heading || home.regionHeading,
        regionText: section.text || home.regionText,
        regionTags: section.regions?.length ? section.regions : home.regionTags,
      };
      return <Region home={merged as any} settings={settings} />;
    }

    case "kontakt-block": {
      const settings = await loadSettings();
      return <Contact settings={settings} />;
    }

    default:
      return null;
  }
}
