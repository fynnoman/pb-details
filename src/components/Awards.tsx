"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { mediaUrl } from "@/lib/media";
import type { MediaDoc } from "@/lib/media";
import EditableImage from "./edit/EditableImage";
import EditableText from "./edit/EditableText";

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
  home,
}: {
  awards: AwardItem[];
  showStoryCards?: boolean;
  home?: import("@/lib/site-types").HomeData;
}) {
  const badges = awards.filter((a) => a.type === "badge");
  const stories = awards.filter((a) => a.type === "story");
  const marqueeBadges = [...badges, ...badges];
  const t = home?.awards || {};
  const kicker = t.kicker || "Ausgezeichnet";
  const title = t.title || "Mehrfach zertifiziert, jährlich";
  const titleHighlight = t.titleHighlight || "bestätigt.";
  const linkLabel = t.linkLabel || "Alle Auszeichnungen & Referenzen ansehen";

  return (
    <section className="relative py-16 sm:py-24 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-10 sm:mb-16 items-end">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <p className="text-[10px] sm:text-[11px] tracking-[0.32em] sm:tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-4 sm:mb-6">
                <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
                <EditableText globalSlug="home" path="awards.kicker" value={kicker} />
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(1.75rem,7vw,3.8rem)] leading-[1.05] tracking-[-0.025em] max-w-[22ch]">
                <EditableText
                  globalSlug="home"
                  path="awards.title"
                  value={title}
                  render={(v) => (
                    <>
                      {v}{" "}
                      <span className="italic text-gold">{titleHighlight}</span>
                    </>
                  )}
                />
              </h2>
            </Reveal>
          </div>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-40 bg-gradient-to-r from-[var(--bg)] to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-40 bg-gradient-to-l from-[var(--bg)] to-transparent"
          />
          <div className="marquee-track flex gap-4 sm:gap-10 md:gap-14 items-center">
            {marqueeBadges.map((b, i) => {
              const url = mediaUrl(b.image, "thumbnail") || mediaUrl(b.image);
              return (
                <div
                  key={`${String(b.id)}-${i}`}
                  className="glass-flat rounded-xl sm:rounded-2xl aspect-square h-20 sm:h-32 md:h-36 shrink-0 flex items-center justify-center p-2.5 sm:p-4 md:p-5"
                >
                  {url && (
                    <EditableImage collection="awards" docId={b.id} path="image" className="w-full h-full flex items-center justify-center">
                      <img
                        src={url}
                        alt={b.image?.alt || b.title}
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    </EditableImage>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showStoryCards && stories.length > 0 && (
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-10 mt-12 sm:mt-24 md:mt-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {stories.map((s, i) => {
              const url = mediaUrl(s.image, "card") || mediaUrl(s.image);
              return (
                <Reveal key={String(s.id)} delay={i * 0.06}>
                  <figure className="glass rounded-2xl sm:rounded-[1.5rem] overflow-hidden h-full flex flex-col group">
                    <div className="relative aspect-[4/3] overflow-hidden bg-black">
                      {url && (
                        <EditableImage collection="awards" docId={s.id} path="image" className="absolute inset-0">
                          <img
                            src={url}
                            alt={s.image?.alt || s.title}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </EditableImage>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <figcaption className="p-5 sm:p-6 flex-1 flex flex-col">
                      <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-3">
                        <EditableText
                          collection="awards"
                          docId={s.id}
                          path="storyLabel"
                          value={s.storyLabel || s.title}
                        />
                      </div>
                      <p className="text-sm text-[var(--ink-dim)] leading-relaxed">
                        <EditableText
                          collection="awards"
                          docId={s.id}
                          path="storyText"
                          value={s.storyText || ""}
                          multiline
                        />
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-10 sm:mt-14 text-center">
              <Link
                href="/referenzen/"
                className="inline-flex items-center gap-2 text-sm tracking-wide text-[var(--ink-dim)] hover:text-[var(--gold)] transition-colors group min-h-[44px]"
              >
                <EditableText globalSlug="home" path="awards.linkLabel" value={linkLabel} />
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
