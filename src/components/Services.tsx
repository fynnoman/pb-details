"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Reveal from "./Reveal";

const services = [
  {
    tag: "01",
    title: "Keramikversiegelung",
    href: "/leistungen/keramikversiegelung/",
    desc: "High-End 9H-Lackschutz für Neuwagen, Sport- und Luxusfahrzeuge. Glasartige Schutzschicht auf Basis von Siliziumoxid, in über 20 Stunden Handarbeit aufgetragen.",
    image:
      "https://images.unsplash.com/photo-1607603750909-408e193868c7?w=1600&q=85&auto=format&fit=crop",
    features: ["Bis zu mehrere Jahre Schutz", "BRILA zertifiziert", "Ideal für Neuwagen ab Kilometer 0"],
  },
  {
    tag: "02",
    title: "Nanoversiegelung",
    href: "/leistungen/nanoversiegelung/",
    desc: "Die preisbewusste Alternative zur Keramikversiegelung – 1K-Nanoversiegelung, die sich fest mit dem Lack verbindet und bis zu viermal länger hält als Wachs.",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1600&q=85&auto=format&fit=crop",
    features: ["Schutz bis zu 18 Monate", "Easy-to-Clean-Effekt", "Günstiger Einstieg"],
  },
  {
    tag: "03",
    title: "Fahrzeugaufbereitung",
    href: "/leistungen/fahrzeugaufbereitung/",
    desc: "Mehrstufige Innen- und Außenaufbereitung – von Vorwäsche über Lackkorrektur bis zur Versiegelung. Auch gezielt für Leasingrückgabe und Fahrzeugverkauf.",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=85&auto=format&fit=crop",
    features: ["Innen & Außen", "In der Regel 2–3 Werktage", "Werterhalt & Wertsteigerung"],
  },
  {
    tag: "04",
    title: "Lack- & Beulendoktor",
    href: "/leistungen/lack-und-beulendoktor/",
    desc: "Smart Repair und lackschadenfreie Ausbeultechnik: Dellen und Lackschäden bis zu 70 % günstiger als eine klassische Lackierung reparieren – der Originallack bleibt erhalten.",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=85&auto=format&fit=crop",
    features: ["Bis zu 70 % günstiger", "Paintless Dent Repair", "Werterhaltend"],
  },
  {
    tag: "05",
    title: "Unfallschaden",
    href: "/unfallschaden/",
    desc: "Komplette Schadenabwicklung aus einer Hand – Gutachter, Anwalt, Leihwagen und Karosserieinstandsetzung nach Herstellervorgaben. Freie Werkstattwahl, ohne Termin.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85&auto=format&fit=crop",
    features: ["Kostenlos bei Haftpflichtschäden*", "Ein Ansprechpartner", "Werterhalt bei Premium-Fahrzeugen"],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.12]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-12 gap-6 lg:gap-16 items-center py-16 sm:py-24 ${
        !isEven ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="col-span-12 lg:col-span-7">
        <Link
          href={service.href}
          className="block relative aspect-[16/11] rounded-[1.8rem] overflow-hidden group"
        >
          <motion.img
            src={service.image}
            alt={service.title}
            style={{ y, scale }}
            className="absolute inset-0 w-full h-full object-cover will-change-transform group-hover:brightness-110 transition-[filter] duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute top-6 left-6 glass rounded-full px-4 py-1.5 text-[10px] tracking-[0.32em] uppercase">
            {service.tag} / Leistung
          </div>
        </Link>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <Reveal>
          <div className="font-display text-[10rem] leading-none text-[var(--ink)]/[0.18] absolute -translate-y-16 select-none pointer-events-none hidden lg:block">
            {service.tag}
          </div>
        </Reveal>
        <Reveal>
          <h3 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-[-0.02em]">
            <Link
              href={service.href}
              className="hover:text-gold transition-colors"
            >
              {service.title}
            </Link>
          </h3>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 text-[var(--ink-dim)] leading-relaxed max-w-md">
            {service.desc}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-8 space-y-2">
            {service.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 text-sm text-[var(--ink)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.15}>
          <Link
            href={service.href}
            className="mt-8 inline-flex items-center gap-2 text-sm tracking-wide text-[var(--ink-dim)] hover:text-[var(--gold)] transition-colors group"
          >
            Mehr erfahren
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="leistungen" className="relative py-32 sm:py-44 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="max-w-3xl mb-20">
          <Reveal>
            <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--ink-mute)] mb-6">
              <span className="inline-block w-8 h-px bg-[var(--gold)] align-middle mr-3" />
              Unsere Leistungen
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02] tracking-[-0.025em]">
              Alles rund um Lackschutz, Aufbereitung und Schadenbehebung
              <span className="italic text-gold"> — aus einer Hand.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[var(--ink-dim)] leading-relaxed max-w-xl">
              Bei PB Fahrzeugpflege Saarlouis erhalten Sie alle Leistungen rund
              um Lackschutz, Aufbereitung und Schadenbehebung aus einer Hand –
              seit 1997 in Ensdorf bei Saarlouis.
            </p>
          </Reveal>
        </div>

        <div className="divide-y divide-white/5">
          {services.map((s, i) => (
            <ServiceCard key={s.tag} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
