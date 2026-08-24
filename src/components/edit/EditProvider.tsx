"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type GlobalChange = {
  kind: "global";
  slug: string;
  path: string;
  value: unknown;
};
type DocChange = {
  kind: "doc";
  collection: string;
  id: string | number;
  path: string;
  value: unknown;
};
type Change = GlobalChange | DocChange;

type Ctx = {
  isEditMode: boolean;
  pending: Record<string, Change>;
  hasPending: boolean;
  /** Setzt einen Wert in einem Global. */
  setGlobal: (slug: string, path: string, value: unknown) => void;
  /** Setzt einen Wert in einem Dokument einer Collection. */
  setDoc: (collection: string, id: string | number, path: string, value: unknown) => void;
  save: () => Promise<void>;
  discard: () => void;
  saving: boolean;
  lastSavedAt: Date | null;
};

const EditContext = createContext<Ctx | null>(null);

function setDeep(obj: any, dottedPath: string, value: unknown) {
  const parts = dottedPath.split(".");
  const last = parts.pop()!;
  let cur = obj;
  for (const p of parts) {
    cur[p] = cur[p] ?? {};
    cur = cur[p];
  }
  cur[last] = value;
}

export function EditProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState<Record<string, Change>>({});
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const pendingRef = useRef(pending);
  pendingRef.current = pending;

  const setGlobal = useCallback((slug: string, path: string, value: unknown) => {
    const key = `global::${slug}::${path}`;
    setPending((prev) => ({
      ...prev,
      [key]: { kind: "global", slug, path, value },
    }));
  }, []);

  const setDoc = useCallback(
    (collection: string, id: string | number, path: string, value: unknown) => {
      const key = `doc::${collection}::${id}::${path}`;
      setPending((prev) => ({
        ...prev,
        [key]: { kind: "doc", collection, id, path, value },
      }));
    },
    [],
  );

  const save = useCallback(async () => {
    const changes = Object.values(pendingRef.current);
    if (changes.length === 0) return;
    setSaving(true);

    // Nach Ziel gruppieren (ein Global/Doc = ein API-Request)
    const perGlobal: Record<string, any> = {};
    const perDoc: Record<string, { collection: string; id: string | number; data: any }> = {};

    for (const c of changes) {
      if (c.kind === "global") {
        perGlobal[c.slug] ??= {};
        setDeep(perGlobal[c.slug], c.path, c.value);
      } else {
        const key = `${c.collection}::${c.id}`;
        perDoc[key] ??= { collection: c.collection, id: c.id, data: {} };
        setDeep(perDoc[key].data, c.path, c.value);
      }
    }

    try {
      // Globals
      for (const [slug, data] of Object.entries(perGlobal)) {
        const res = await fetch("/api/edit/update-global", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ slug, changes: data }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `HTTP ${res.status}`);
        }
      }
      // Docs
      for (const { collection, id, data } of Object.values(perDoc)) {
        const res = await fetch("/api/edit/update-doc", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ collection, id, changes: data }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `HTTP ${res.status}`);
        }
      }

      setPending({});
      setLastSavedAt(new Date());
      location.reload();
    } catch (err) {
      console.error(err);
      alert(
        "Speichern fehlgeschlagen: " +
          (err instanceof Error ? err.message : String(err)),
      );
    } finally {
      setSaving(false);
    }
  }, []);

  const discard = useCallback(() => {
    if (Object.keys(pendingRef.current).length === 0) return;
    if (!confirm("Alle nicht gespeicherten Änderungen verwerfen?")) return;
    setPending({});
    location.reload();
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      isEditMode: true,
      pending,
      hasPending: Object.keys(pending).length > 0,
      setGlobal,
      setDoc,
      save,
      discard,
      saving,
      lastSavedAt,
    }),
    [pending, setGlobal, setDoc, save, discard, saving, lastSavedAt],
  );

  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
}

export function useEdit(): Ctx | null {
  return useContext(EditContext);
}
