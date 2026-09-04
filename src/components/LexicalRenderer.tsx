/**
 * Minimaler Renderer für Payload-Lexical-Rich-Text.
 * Unterstützt Paragraph, Heading (h2/h3), Bullet-Liste, Quote, Tabelle
 * (also alles, was der Seed via scripts/lib/lexical.ts erzeugt).
 * Der Kunde kann im Admin natürlich mehr Nodes anlegen — die werden
 * dann als Absatz gerendert, damit nichts verloren geht.
 */

type LexicalNode = {
  type: string;
  tag?: string;
  text?: string;
  children?: LexicalNode[];
  headerState?: number;
};

type LexicalRoot = {
  root: {
    children: LexicalNode[];
  };
};

function renderChildren(nodes: LexicalNode[] | undefined): React.ReactNode {
  if (!nodes) return null;
  return nodes.map((n, i) => renderNode(n, i));
}

function renderNode(node: LexicalNode, key: number): React.ReactNode {
  switch (node.type) {
    case "text":
      return node.text;
    case "linebreak":
      return <br key={key} />;
    case "paragraph":
      return (
        <p key={key} className="text-[var(--ink-dim)] leading-relaxed max-w-[70ch]">
          {renderChildren(node.children)}
        </p>
      );
    case "heading": {
      const tag = node.tag || "h2";
      if (tag === "h2") {
        return (
          <h2
            key={key}
            className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] pt-4"
          >
            {renderChildren(node.children)}
          </h2>
        );
      }
      if (tag === "h3") {
        return (
          <h3
            key={key}
            className="font-display text-2xl sm:text-3xl leading-snug tracking-[-0.015em] text-[var(--ink)]"
          >
            {renderChildren(node.children)}
          </h3>
        );
      }
      return (
        <h4 key={key} className="font-display text-xl text-[var(--ink)]">
          {renderChildren(node.children)}
        </h4>
      );
    }
    case "list":
      return (
        <ul key={key} className="space-y-3 text-[var(--ink-dim)] leading-relaxed">
          {renderChildren(node.children)}
        </ul>
      );
    case "listitem":
      return (
        <li key={key} className="flex gap-3">
          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
          <span>{renderChildren(node.children)}</span>
        </li>
      );
    case "quote":
      return (
        <blockquote
          key={key}
          className="pl-6 border-l border-[var(--gold)]/40 font-display italic text-2xl sm:text-3xl leading-snug text-chrome"
        >
          {renderChildren(node.children)}
        </blockquote>
      );
    case "table":
      return (
        <div
          key={key}
          className="glass rounded-[1.5rem] overflow-x-auto not-prose -mx-4 sm:mx-0 rounded-none sm:rounded-[1.5rem]"
        >
          <table className="w-full min-w-[520px] border-collapse">
            <tbody>{renderChildren(node.children)}</tbody>
          </table>
        </div>
      );
    case "tablerow":
      return <tr key={key}>{renderChildren(node.children)}</tr>;
    case "tablecell": {
      const isHeader = node.headerState === 1;
      const Tag = isHeader ? "th" : "td";
      return (
        <Tag
          key={key}
          className={
            isHeader
              ? "text-left px-4 sm:px-6 py-4 text-[11px] tracking-[0.28em] uppercase text-[var(--gold)] border-b border-white/5"
              : "px-4 sm:px-6 py-4 text-[var(--ink-dim)] text-sm sm:text-base border-b border-white/5 align-top"
          }
        >
          {renderChildren(node.children)}
        </Tag>
      );
    }
    default:
      // Unknown node — render children if present
      return <div key={key}>{renderChildren(node.children)}</div>;
  }
}

export default function LexicalRenderer({ data }: { data?: LexicalRoot | null }) {
  if (!data?.root?.children) return null;
  return <div className="space-y-8">{renderChildren(data.root.children)}</div>;
}
