"use client";

import { useEffect, useRef, useState } from "react";

type Item = { label: string; href: string; group: string };

/**
 * Dropdown in der Toolbar, um zwischen den editierbaren Seiten zu wechseln.
 * Fetcht die Liste einmalig beim Mount aus der Payload-REST-API.
 */
export default function PageSwitcher({ currentHref }: { currentHref: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const jsonOK = async (url: string) => {
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
      return res.json();
    };
    (async () => {
      try {
        const [pages, services, posts] = await Promise.all([
          jsonOK("/api/pages/?limit=50&depth=0"),
          jsonOK("/api/services/?limit=20&depth=0"),
          jsonOK("/api/blog-posts/?limit=50&depth=0"),
        ]);
        if (cancelled) return;
        const list: Item[] = [
          { label: "Startseite", href: "/edit", group: "Website" },
        ];
        for (const p of pages.docs ?? []) {
          list.push({
            label: p.title || p.path,
            href: `/edit/pages${(p.path || "").replace(/\/$/, "") || ""}`,
            group: "Seiten",
          });
        }
        for (const s of services.docs ?? []) {
          list.push({
            label: s.title || s.slug,
            href: `/edit/services/${s.slug}`,
            group: "Leistungen",
          });
        }
        for (const p of posts.docs ?? []) {
          list.push({
            label: p.title || p.slug,
            href: `/edit/blog/${p.slug}`,
            group: "Blogbeiträge",
          });
        }
        setItems(list);
      } catch (err) {
        console.error("[PageSwitcher] fetch failed:", err);
        if (!cancelled) setLoadError(err instanceof Error ? err.message : String(err));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = items.find((i) => i.href === currentHref);
  const grouped = items.reduce<Record<string, Item[]>>((acc, i) => {
    acc[i.group] ??= [];
    acc[i.group].push(i);
    return acc;
  }, {});

  return (
    <div className="edit-switcher" ref={wrapRef}>
      <button
        type="button"
        className="edit-switcher__btn"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="edit-switcher__label">Seite:</span>
        <span className="edit-switcher__current">
          {current?.label || "Wählen …"}
        </span>
        <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="edit-switcher__menu">
          {Object.entries(grouped).map(([group, list]) => (
            <div key={group} className="edit-switcher__group">
              <div className="edit-switcher__group-label">{group}</div>
              {list.map((i) => (
                <a
                  key={i.href}
                  href={i.href}
                  className={`edit-switcher__item ${i.href === currentHref ? "edit-switcher__item--active" : ""}`}
                >
                  {i.label}
                </a>
              ))}
            </div>
          ))}
          {items.length === 0 && !loadError && (
            <div className="edit-switcher__empty">Lade Seiten …</div>
          )}
          {loadError && (
            <div className="edit-switcher__empty" style={{ color: "#b8523d" }}>
              Fehler: {loadError}
            </div>
          )}
        </div>
      )}

      <style>{`
        .edit-switcher { position: relative; }
        .edit-switcher__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          color: #f4f2ee;
          font-size: 13px;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: background 180ms cubic-bezier(0.23,1,0.32,1);
        }
        .edit-switcher__btn:hover { background: rgba(255, 255, 255, 0.14); }
        .edit-switcher__label { color: #a09b91; font-size: 12px; }
        .edit-switcher__current {
          color: #f4f2ee; font-weight: 500;
          max-width: 240px;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .edit-switcher__menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 280px;
          max-height: 60vh;
          overflow-y: auto;
          background: #ffffff;
          color: #14120d;
          border: 1px solid #ebe6da;
          border-radius: 14px;
          box-shadow: 0 20px 60px -20px rgba(0,0,0,0.35);
          padding: 8px;
          z-index: 300;
        }
        .edit-switcher__group { padding: 6px 0; }
        .edit-switcher__group-label {
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #928c81;
          padding: 6px 12px;
          font-weight: 600;
        }
        .edit-switcher__item {
          display: block;
          padding: 8px 12px;
          border-radius: 8px;
          color: #14120d;
          text-decoration: none;
          font-size: 14px;
          transition: background 140ms cubic-bezier(0.23,1,0.32,1);
        }
        .edit-switcher__item:hover { background: #f7f4ec; }
        .edit-switcher__item--active {
          background: rgba(163, 123, 63, 0.12);
          color: #6f5222;
          font-weight: 500;
        }
        .edit-switcher__empty { padding: 16px; color: #928c81; font-size: 13px; }
      `}</style>
    </div>
  );
}
