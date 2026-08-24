"use client";

import { usePathname } from "next/navigation";
import { useEdit } from "./EditProvider";
import PageSwitcher from "./PageSwitcher";

export default function EditToolbar({ userName }: { userName?: string }) {
  const ctx = useEdit();
  const pathname = usePathname();
  if (!ctx) return null;
  const { hasPending, pending, save, discard, saving, lastSavedAt } = ctx;
  const count = Object.keys(pending).length;

  return (
    <>
      <aside className="edit-toolbar">
        <div className="edit-toolbar__inner">
          <div className="edit-toolbar__brand">
            <span className="edit-toolbar__dot" aria-hidden />
            <div>
              <div className="edit-toolbar__title">Bearbeitungs-Modus</div>
              <div className="edit-toolbar__sub">
                {userName ? `Angemeldet als ${userName}` : "Angemeldet"}
              </div>
            </div>
          </div>

          <PageSwitcher currentHref={pathname || "/edit"} />

          <div className="edit-toolbar__status">
            {hasPending ? (
              <>
                <strong>{count}</strong> ungespeicherte Änderung{count === 1 ? "" : "en"}
              </>
            ) : lastSavedAt ? (
              <span>
                Zuletzt gespeichert:{" "}
                {lastSavedAt.toLocaleTimeString("de-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            ) : (
              <span>Klicken Sie auf einen Text um ihn zu bearbeiten.</span>
            )}
          </div>

          <div className="edit-toolbar__actions">
            <button
              type="button"
              className="edit-btn edit-btn--ghost"
              onClick={discard}
              disabled={!hasPending || saving}
            >
              Verwerfen
            </button>
            <button
              type="button"
              className="edit-btn edit-btn--primary"
              onClick={save}
              disabled={!hasPending || saving}
            >
              {saving ? "Speichere…" : "Speichern"}
            </button>
          </div>
        </div>
      </aside>
      <div className="edit-toolbar-spacer" aria-hidden />
    </>
  );
}
