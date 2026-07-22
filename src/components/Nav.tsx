"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "#home", label: "Home" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#leistungen", label: "Leistungen" },
  { href: "#unfallschaden", label: "Unfallschaden" },
  { href: "#preise", label: "Preise" },
  { href: "#faq", label: "FAQ" },
  { href: "#referenzen", label: "Referenzen" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <nav
          className={`glass rounded-full flex items-center gap-3 pl-5 pr-2 py-2 transition-all duration-500 ${
            scrolled ? "shadow-2xl" : ""
          }`}
        >
          <Link
            href="#home"
            className="flex items-center gap-2 shrink-0 mr-2"
            aria-label="PB Fahrzeugpflege Saarlouis"
          >
            <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#f5e2b8] via-[#d4b483] to-[#8a6a3f] text-[#100e0a] font-display font-bold text-lg shadow-inner">
              PB
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-[13px] font-medium tracking-[0.14em] uppercase text-chrome">
                PB Fahrzeugpflege
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--ink-mute)]">
                The Art of Detailing
              </span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1 ml-auto text-[13px] tracking-wide">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="px-3 py-2 rounded-full text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors relative group"
                >
                  {l.label}
                  <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#kontakt"
            className="hidden sm:inline-flex btn-gold ml-auto lg:ml-2 text-[13px] py-2.5 px-5"
          >
            Jetzt anfragen
            <span aria-hidden>→</span>
          </Link>

          <button
            aria-label="Menü öffnen"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden ml-auto glass-flat rounded-full w-10 h-10 flex items-center justify-center"
          >
            <span className="relative w-4 h-3 block">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-[var(--ink)] transition-transform ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-[var(--ink)] transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px bg-[var(--ink)] transition-transform ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            open ? "max-h-[70vh] mt-3" : "max-h-0"
          }`}
        >
          <div className="glass-strong rounded-3xl p-4">
            <ul className="flex flex-col divide-y divide-white/5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 px-2 text-[var(--ink-dim)] hover:text-[var(--ink)] text-sm tracking-wide"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="btn-gold w-full justify-center mt-3"
            >
              Jetzt anfragen →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
