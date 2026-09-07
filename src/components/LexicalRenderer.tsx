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
      return renderTable(node, key);
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

function renderTable(node: LexicalNode, key: number): React.ReactNode {
  const rows = (node.children || []).filter((c) => c.type === "tablerow");
  if (rows.length === 0) return null;

  const cellsFor = (row: LexicalNode) =>
    (row.children || []).filter((c) => c.type === "tablecell");

  const isHeaderRow = (row: LexicalNode) => {
    const cells = cellsFor(row);
    if (cells.length === 0) return false;
    return cells.every((c) => c.headerState === 1);
  };

  let headerCells: LexicalNode[] = [];
  let bodyRows: LexicalNode[] = rows;
  if (isHeaderRow(rows[0])) {
    headerCells = cellsFor(rows[0]);
    bodyRows = rows.slice(1);
  }

  const headerLabels = headerCells.map((c) => nodeText(c).trim());

  return (
    <div key={key} className="not-prose">
      {/* Desktop / Tablet ab 768px: klassische Tabelle */}
      <div className="hidden md:block glass rounded-[1.5rem] overflow-hidden">
        <table className="w-full border-collapse table-fixed">
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {cellsFor(r).map((c, j) => {
                  const isHeader = c.headerState === 1;
                  const Tag = isHeader ? "th" : "td";
                  return (
                    <Tag
                      key={j}
                      className={
                        isHeader
                          ? "text-left px-4 sm:px-6 py-4 text-[11px] tracking-[0.28em] uppercase text-[var(--gold)] border-b border-white/5 break-words"
                          : "px-4 sm:px-6 py-4 text-[var(--ink-dim)] text-sm sm:text-base border-b border-white/5 align-top break-words"
                      }
                    >
                      {renderChildren(c.children)}
                    </Tag>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile < 768px: gestapelte Karten pro Zeile */}
      <div className="md:hidden flex flex-col gap-4">
        {bodyRows.map((row, ri) => {
          const cells = cellsFor(row);
          const [firstCell, ...restCells] = cells;
          return (
            <div
              key={ri}
              className="glass rounded-[1.5rem] p-5"
            >
              {firstCell && (
                <div className="font-medium text-[var(--ink)] leading-snug mb-4 break-words">
                  {renderChildren(firstCell.children)}
                </div>
              )}
              <div className="flex flex-col gap-4">
                {restCells.map((c, ci) => {
                  const label = headerLabels[ci + 1] || "";
                  return (
                    <div key={ci} className="min-w-0">
                      {label && (
                        <div className="text-[10px] tracking-[0.28em] uppercase text-[var(--gold)] mb-1.5 break-words">
                          {label}
                        </div>
                      )}
                      <div className="text-[var(--ink-dim)] text-sm leading-relaxed break-words">
                        {renderChildren(c.children)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const REMOVED_HEADINGS = new Set(["orientierungswerte"]);

function nodeText(node: LexicalNode): string {
  if (node.type === "text") return node.text || "";
  if (!node.children) return "";
  return node.children.map(nodeText).join("");
}

function stripRemovedSections(nodes: LexicalNode[]): LexicalNode[] {
  const out: LexicalNode[] = [];
  let skipping = false;
  for (const n of nodes) {
    if (n.type === "heading") {
      const label = nodeText(n).trim().toLowerCase();
      if (REMOVED_HEADINGS.has(label)) {
        skipping = true;
        continue;
      }
      skipping = false;
    }
    if (skipping) continue;
    out.push(n);
  }
  return out;
}

export default function LexicalRenderer({ data }: { data?: LexicalRoot | null }) {
  if (!data?.root?.children) return null;
  const filtered = stripRemovedSections(data.root.children);
  return <div className="space-y-8">{renderChildren(filtered)}</div>;
}
