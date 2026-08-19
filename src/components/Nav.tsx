"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NAV } from "@/lib/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };

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
            href="/"
            className="flex items-center gap-2 shrink-0 mr-2"
            aria-label="PB Fahrzeugpflege Saarlouis"
          >
            <img
              src="/images/logo/pb-fahrzeugpflege-logo-black.png"
              alt="PB Fahrzeugpflege Saarlouis"
              className="h-8 sm:h-10 md:h-11 w-auto object-contain drop-shadow-[0_2px_8px_rgba(212,180,131,0.25)]"
            />
            <span className="hidden md:flex flex-col leading-tight ml-1">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--ink-mute)]">
                The Art of Detailing
              </span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1 ml-auto text-[13px] tracking-wide">
            {NAV.map((item) => {
              const hasChildren = "children" in item && item.children;
              if (hasChildren) {
                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={openDropdown}
                    onMouseLeave={scheduleClose}
                  >
                    <Link
                      href={item.href}
                      className="px-3 py-2 rounded-full text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors relative group inline-flex items-center gap-1.5"
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 10 6"
                        className={`w-2.5 h-1.5 transition-transform duration-300 ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      >
                        <path
                          d="M1 1l4 4 4-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="absolute left-3 right-6 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                    </Link>
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-300 ${
                        dropdownOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="glass-strong rounded-2xl p-2 min-w-[240px] shadow-2xl">
                        <ul className="flex flex-col">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={() => setDropdownOpen(false)}
                                className="block px-4 py-2.5 rounded-xl text-[13px] text-[var(--ink-dim)] hover:text-[var(--ink)] hover:bg-white/[0.04] transition-colors"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="px-3 py-2 rounded-full text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/kontakt/#termin"
            className="hidden sm:inline-flex btn-gold ml-auto lg:ml-2 text-[12px] sm:text-[13px] py-2 sm:py-2.5 px-4 sm:px-5"
          >
            <span className="hidden md:inline">Jetzt anfragen</span>
            <span className="md:hidden">Termin</span>
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
            open ? "max-h-[85vh] mt-3" : "max-h-0"
          }`}
        >
          <div className="glass-strong rounded-3xl p-4">
            <ul className="flex flex-col divide-y divide-white/5">
              {NAV.map((item) => {
                const hasChildren = "children" in item && item.children;
                if (hasChildren) {
                  return (
                    <li key={item.href} className="flex flex-col">
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex-1 py-3 px-2 text-[var(--ink-dim)] hover:text-[var(--ink)] text-sm tracking-wide"
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          aria-label="Untermenü öffnen"
                          onClick={() => setMobileSubOpen((v) => !v)}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--ink-mute)]"
                        >
                          <svg
                            viewBox="0 0 10 6"
                            className={`w-3 h-2 transition-transform duration-300 ${
                              mobileSubOpen ? "rotate-180" : ""
                            }`}
                          >
                            <path
                              d="M1 1l4 4 4-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-400 ${
                          mobileSubOpen ? "max-h-72" : "max-h-0"
                        }`}
                      >
                        <ul className="pl-4 pb-2 flex flex-col">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={() => setOpen(false)}
                                className="block py-2.5 px-2 text-[13px] text-[var(--ink-mute)] hover:text-[var(--ink)]"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 px-2 text-[var(--ink-dim)] hover:text-[var(--ink)] text-sm tracking-wide"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/kontakt/#termin"
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
