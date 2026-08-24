"use client";

import { useRef, useState } from "react";
import { useEdit } from "./EditProvider";

type BaseProps = {
  path: string;
  children: React.ReactNode;
  className?: string;
};
type GlobalProps = BaseProps & { globalSlug: string; collection?: never; docId?: never };
type DocProps = BaseProps & { collection: string; docId: string | number; globalSlug?: never };
type Props = GlobalProps | DocProps;

export default function EditableImage(props: Props) {
  const ctx = useEdit();
  const { children, className = "" } = props;

  if (!ctx?.isEditMode) return <>{children}</>;

  const setter = (v: unknown) => {
    if ("globalSlug" in props && props.globalSlug) {
      ctx.setGlobal(props.globalSlug, props.path, v);
    } else if ("collection" in props && props.collection) {
      ctx.setDoc(props.collection, props.docId, props.path, v);
    }
  };

  return (
    <EditableImageInner className={className} onNewMedia={(id) => setter(id)}>
      {children}
    </EditableImageInner>
  );
}

function EditableImageInner({
  children,
  className,
  onNewMedia,
}: {
  children: React.ReactNode;
  className: string;
  onNewMedia: (id: number | string) => void;
}) {
  const [drag, setDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("alt", file.name.replace(/\.[^.]+$/, ""));
      const res = await fetch("/api/edit/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        throw new Error(b.error || `HTTP ${res.status}`);
      }
      const json = (await res.json()) as { id: number | string };
      onNewMedia(json.id);
    } catch (err) {
      alert("Upload fehlgeschlagen: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className={`edit-image ${className} ${drag ? "edit-image--drag" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
    >
      {children}
      <button
        type="button"
        className="edit-image__badge"
        onClick={() => fileInput.current?.click()}
      >
        {uploading ? "Lädt …" : drag ? "Loslassen" : "Bild ersetzen"}
      </button>
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
    </div>
  );
}
