/**
 * Minimaler Lexical-Node-Builder für Payload Rich-Text-Felder.
 * Deckt Paragraph, Heading (h2/h3), Bullet-Liste, Blockquote und Tabelle ab.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "table"; header: string[]; rows: string[][] };

type LexicalTextNode = {
  type: "text";
  text: string;
  format: number;
  version: number;
  detail?: number;
  mode?: string;
  style?: string;
};

function textNode(text: string): LexicalTextNode {
  return { type: "text", text, format: 0, version: 1 };
}

function paragraph(text: string) {
  return {
    type: "paragraph",
    format: "" as const,
    indent: 0,
    version: 1,
    direction: "ltr" as const,
    children: [textNode(text)],
  };
}

function heading(text: string, tag: "h2" | "h3") {
  return {
    type: "heading",
    tag,
    format: "" as const,
    indent: 0,
    version: 1,
    direction: "ltr" as const,
    children: [textNode(text)],
  };
}

function list(items: string[]) {
  return {
    type: "list",
    tag: "ul",
    listType: "bullet",
    start: 1,
    format: "" as const,
    indent: 0,
    version: 1,
    direction: "ltr" as const,
    children: items.map((item, i) => ({
      type: "listitem",
      value: i + 1,
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: [textNode(item)],
    })),
  };
}

function quote(text: string) {
  return {
    type: "quote",
    format: "" as const,
    indent: 0,
    version: 1,
    direction: "ltr" as const,
    children: [textNode(text)],
  };
}

function table(header: string[], rows: string[][]) {
  const buildRow = (cells: string[], isHeader = false) => ({
    type: "tablerow",
    format: "" as const,
    indent: 0,
    version: 1,
    children: cells.map((c) => ({
      type: "tablecell",
      headerState: isHeader ? 1 : 0,
      colSpan: 1,
      rowSpan: 1,
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: [paragraph(c)],
    })),
  });

  return {
    type: "table",
    format: "" as const,
    indent: 0,
    version: 1,
    children: [buildRow(header, true), ...rows.map((r) => buildRow(r))],
  };
}

export function buildLexical(blocks: Block[]) {
  const children = blocks.map((b) => {
    switch (b.type) {
      case "p":
        return paragraph(b.text);
      case "h2":
        return heading(b.text, "h2");
      case "h3":
        return heading(b.text, "h3");
      case "ul":
        return list(b.items);
      case "blockquote":
        return quote(b.text);
      case "table":
        return table(b.header, b.rows);
    }
  });

  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children,
    },
  };
}
