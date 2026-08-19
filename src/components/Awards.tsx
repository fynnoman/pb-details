"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { mediaUrl } from "@/lib/site-data";
import type { MediaDoc } from "@/lib/site-data";

export type AwardItem = {
  id: string | number;
  title: string;
  type: "badge" | "story";
  image: MediaDoc;
  storyLabel?: string;
  storyText?: string;
  order: number;
};

export default function Awards({
  awards,
  showStoryCards = true,
}: {
  awards: AwardItem[];
  showStoryCards?: boolean;
}) {
  const badges = awards.filter((a) => a.type === "badge");
  const stories = awards.filter((a) => a.type === "story");
  const marqueeBadges = [...badges, ...badges];

  return (
    <section className="relative py-20 sm:py-32 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-12 sm:mb-16 items-end">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                Ausgezeichnet
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.02] tracking-[-0.025em] max-w-[22ch]">
                Mehrfach zertifiziert, jährlich{" "}
                <span className="italic text-gold">bestätigt.</span>
              </h2>
            </Reveal>
          </div>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-[var(--bg)] to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-[var(--bg)] to-transparent"
          />
          <div className="marquee-track flex gap-6 sm:gap-10 md:gap-14 items-center">
            {marqueeBadges.map((b, i) => {
              const url = mediaUrl(b.image, "thumbnail") || mediaUrl(b.image);
              return (
                <div
                  key={`${String(b.id)}-${i}`}
                  className="glass-flat rounded-2xl aspect-square h-24 sm:h-32 md:h-36 shrink-0 flex items-center justify-center p-3 sm:p-4 md:p-5"
                >
                  {url && (
                    <img
                      src={url}
                      alt={b.image?.alt || b.title}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showStoryCards && stories.length > 0 && (
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10 mt-16 sm:mt-24 md:mt-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {stories.map((s, i) => {
              const url = mediaUrl(s.image, "card") || mediaUrl(s.image);
              return (
                <Reveal key={String(s.id)} delay={i * 0.06}>
                  <figure className="glass rounded-[1.5rem] overflow-hidden h-full flex flex-col group">
                    <div className="relative aspect-[4/3] overflow-hidden bg-black">
                      {url && (
                        <img
                          src={url}
                          alt={s.image?.alt || s.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <figcaption className="p-6 flex-1 flex flex-col">
                      <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-3">
                        {s.storyLabel || s.title}
                      </div>
                      {s.storyText && (
                        <p className="text-sm text-[var(--ink-dim)] leading-relaxed">
                          {s.storyText}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-14 text-center">
              <Link
                href="/referenzen/"
                className="inline-flex items-center gap-2 text-sm tracking-wide text-[var(--ink-dim)] hover:text-[var(--gold)] transition-colors group"
              >
                Alle Auszeichnungen &amp; Referenzen ansehen
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}
