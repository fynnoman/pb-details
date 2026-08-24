"use client";

import { useEffect, useRef, useState } from "react";
import { useEdit } from "./EditProvider";

type BaseProps = {
  path: string;
  value: string;
  render?: (v: string) => React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
};

type GlobalProps = BaseProps & { globalSlug: string; collection?: never; docId?: never };
type DocProps = BaseProps & {
  collection: string;
  docId: string | number;
  globalSlug?: never;
};

type Props = GlobalProps | DocProps;

export default function EditableText(props: Props) {
  const ctx = useEdit();
  const {
    value,
    render,
    as = "span",
    className = "",
    multiline = false,
    placeholder = "Klicken zum Bearbeiten",
  } = props;
  const Tag = as as any;

  if (!ctx?.isEditMode) {
    if (render) return <>{render(value)}</>;
    return <Tag className={className}>{value}</Tag>;
  }

  const setter = (v: unknown) => {
    if ("globalSlug" in props && props.globalSlug) {
      ctx.setGlobal(props.globalSlug, props.path, v);
    } else if ("collection" in props && props.collection) {
      ctx.setDoc(props.collection, props.docId, props.path, v);
    }
  };

  return (
    <EditableTextInner
      value={value}
      Tag={Tag}
      className={className}
      multiline={multiline}
      placeholder={placeholder}
      onCommit={(v) => setter(v)}
    />
  );
}

function EditableTextInner({
  value,
  Tag,
  className,
  multiline,
  placeholder,
  onCommit,
}: {
  value: string;
  Tag: any;
  className: string;
  multiline: boolean;
  placeholder: string;
  onCommit: (v: string) => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [focused, setFocused] = useState(false);
  // `localValue` merkt sich, was der User zuletzt geschrieben (oder was der
  // Server initial geliefert) hat. Ohne das würde der useEffect nach onBlur
  // den frisch getippten Text mit dem alten prop-Wert überschreiben.
  const [localValue, setLocalValue] = useState(value);

  // Wenn der prop-Wert von aussen sich ändert (z.B. nach Reload), sync.
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // innerText nur setzen, wenn er vom aktuell gemerkten Wert abweicht
  // und der Cursor nicht drin ist (sonst zerstört man die Selektion).
  useEffect(() => {
    if (ref.current && !focused && ref.current.innerText !== localValue) {
      ref.current.innerText = localValue;
    }
  }, [localValue, focused]);

  const onBlur = (e: React.FocusEvent<HTMLElement>) => {
    setFocused(false);
    const next = e.currentTarget.innerText.trim();
    setLocalValue(next);
    if (next !== value) onCommit(next);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      (e.currentTarget as HTMLElement).blur();
    }
    if (e.key === "Escape") (e.currentTarget as HTMLElement).blur();
  };

  return (
    <Tag
      ref={ref as any}
      className={`edit-text ${className}`}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setFocused(true)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      spellCheck={false}
      data-empty={localValue === ""}
      data-placeholder={placeholder}
    >
      {localValue}
    </Tag>
  );
}
