"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent("pb-open-consent"));
      }}
      className="hover:text-[var(--ink)] transition-colors underline-offset-4 hover:underline"
    >
      Cookie-Einstellungen
    </button>
  );
}
