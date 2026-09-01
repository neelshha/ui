// Dependency-free syntax highlighting for CodeBlock. A small scanner per
// language that splits code into typed tokens; rendering maps each token to
// a <span data-token>, and the CSS gives every token its syntax ink (VS
// Code's light/dark pairs, so both themes read the same way).
//
// The scanner is lossless: concatenating every token's text reproduces the
// input byte for byte, so the copy button and the display never diverge.

export type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "function"
  | "tag"
  | "attr"
  | "type"
  | "command"
  | "flag"
  | "key"
  | "plain";

export type Token = { text: string; type: TokenType };

const TS_KEYWORDS = new Set([
  "import", "export", "from", "as", "default", "const", "let", "var",
  "function", "return", "if", "else", "for", "while", "do", "switch", "case",
  "break", "continue", "class", "extends", "implements", "new", "this",
  "super", "async", "await", "yield", "typeof", "instanceof", "in", "of",
  "try", "catch", "finally", "throw", "delete", "void", "interface", "type",
  "enum", "declare", "abstract", "public", "private", "protected", "readonly",
  "static", "true", "false", "null", "undefined",
]);

const IDENT = /[A-Za-z_$][\w$]*/y;
const NUM = /\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?/y;
const PUNCT = /[{}()[\];,.:<>=+\-*/%&|!?~^@#]+/y;
const SPACE = /\s+/y;

type Lang = "tsx" | "bash" | "json" | "plain";

function normalize(language: string | undefined): Lang {
  const l = (language ?? "").trim().toLowerCase();
  if (["tsx", "ts", "jsx", "js", "mjs", "cjs", "javascript", "typescript"].includes(l)) {
    return "tsx";
  }
  if (["bash", "sh", "shell", "zsh", "console", "terminal"].includes(l)) {
    return "bash";
  }
  if (["json", "jsonc"].includes(l)) {
    return "json";
  }
  return "plain";
}

/** Generic scanner driver: accumulates plain runs, emits typed tokens. */
function scanner(
  code: string,
  step: (i: number) => { end: number; type: TokenType } | null,
  onPlain: (text: string) => TokenType = () => "plain",
): Token[] {
  const tokens: Token[] = [];
  let plain = "";
  const flush = () => {
    if (plain) {
      tokens.push({ text: plain, type: onPlain(plain) });
      plain = "";
    }
  };
  let i = 0;
  while (i < code.length) {
    const hit = step(i);
    if (hit) {
      flush();
      tokens.push({ text: code.slice(i, hit.end), type: hit.type });
      i = hit.end;
    } else {
      plain += code[i];
      i += 1;
    }
  }
  flush();
  return tokens;
}

function scanTsx(code: string): Token[] {
  let inTag = false; // just saw `<Name` — next identifier is the tag
  let inClose = false; // just saw `</`

  return scanner(
    code,
    (i) => {
      const c = code[i];

      // Comments.
      if (c === "/" && code[i + 1] === "/") {
        const end = code.indexOf("\n", i);
        const stop = end === -1 ? code.length : end;
        return { end: stop, type: "comment" };
      }
      if (c === "/" && code[i + 1] === "*") {
        const end = code.indexOf("*/", i + 2);
        const stop = end === -1 ? code.length : end + 2;
        return { end: stop, type: "comment" };
      }

      // Strings, with escape handling.
      if (c === '"' || c === "'" || c === "`") {
        let j = i + 1;
        while (j < code.length) {
          if (code[j] === "\\") {
            j += 2;
            continue;
          }
          if (code[j] === c) {
            j += 1;
            break;
          }
          j += 1;
        }
        return { end: Math.min(j, code.length), type: "string" };
      }

      // Numbers.
      NUM.lastIndex = i;
      const num = NUM.exec(code);
      if (num) {
        return { end: NUM.lastIndex, type: "number" };
      }

      // Identifiers.
      IDENT.lastIndex = i;
      const id = IDENT.exec(code);
      if (id) {
        const word = id[0];
        let k = IDENT.lastIndex;
        while (k < code.length && (code[k] === " " || code[k] === "\t")) k += 1;
        const next = code[k] ?? "";
        let type: TokenType = "plain";
        if (inTag || inClose) {
          type = "tag";
          inTag = false;
          inClose = false;
        } else if (TS_KEYWORDS.has(word)) {
          type = "keyword";
        } else if (next === "(") {
          type = "function";
        } else if (next === "=" && next !== code[k + 1]) {
          // JSX attribute or object key.
          type = "attr";
        } else if (/^[A-Z]/.test(word)) {
          type = "type";
        }
        return { end: IDENT.lastIndex, type };
      }

      // Punctuation runs — also track JSX tag context.
      PUNCT.lastIndex = i;
      const p = PUNCT.exec(code);
      if (p) {
        const run = p[0];
        const after = code[PUNCT.lastIndex] ?? "";
        if (run.endsWith("<") && /[A-Za-z]/.test(after)) inTag = true;
        if (run.endsWith("/") && /[A-Za-z]/.test(after)) inClose = true;
        if (run.includes(">")) {
          inTag = false;
          inClose = false;
        }
        return { end: PUNCT.lastIndex, type: "plain" };
      }

      SPACE.lastIndex = i;
      const sp = SPACE.exec(code);
      if (sp) {
        // Whitespace rides the plain run; last stays put.
        return null;
      }

      // Anything else is a single stray char.
      return { end: i + 1, type: "plain" };
    },
  );
}

function scanBash(code: string): Token[] {
  return scanner(
    code,
    (i) => {
      const c = code[i] ?? "";

      // Comments run to end of line.
      if (c === "#") {
        const end = code.indexOf("\n", i);
        return { end: end === -1 ? code.length : end, type: "comment" };
      }

      // Strings.
      if (c === '"' || c === "'") {
        let j = i + 1;
        while (j < code.length) {
          if (code[j] === "\\") {
            j += 2;
            continue;
          }
          if (code[j] === c) {
            j += 1;
            break;
          }
          j += 1;
        }
        return { end: Math.min(j, code.length), type: "string" };
      }

      // Flags.
      if (c === "-" && code[i + 1] === "-") {
        IDENT.lastIndex = i + 2;
        const id = IDENT.exec(code);
        return { end: id ? IDENT.lastIndex : i + 2, type: "flag" };
      }
      if (c === "-") {
        return { end: i + 2, type: "flag" };
      }

      // The first word of a line is the command.
      const before = code[i - 1] ?? "";
      const atLineStart = i === 0 || before === "\n" || before === ";" || before === "|";
      if (atLineStart && /[A-Za-z0-9_./@-]/.test(c)) {
        let j = i;
        while (j < code.length && /[^\s;|&<>"']/.test(code[j] ?? "")) j += 1;
        return { end: j, type: "command" };
      }

      return null;
    },
  );
}

function scanJson(code: string): Token[] {
  return scanner(
    code,
    (i) => {
      const c = code[i];

      if (c === '"') {
        let j = i + 1;
        while (j < code.length) {
          if (code[j] === "\\") {
            j += 2;
            continue;
          }
          if (code[j] === '"') {
            j += 1;
            break;
          }
          j += 1;
        }
        // A string followed by a colon is a key.
        let k = j;
        while (k < code.length && /\s/.test(code[k] ?? "")) k += 1;
        return { end: j, type: (code[k] ?? "") === ":" ? "key" : "string" };
      }

      NUM.lastIndex = i;
      const num = NUM.exec(code);
      if (num) return { end: NUM.lastIndex, type: "number" };

      IDENT.lastIndex = i;
      const id = IDENT.exec(code);
      if (id && ["true", "false", "null"].includes(id[0])) {
        return { end: IDENT.lastIndex, type: "keyword" };
      }

      return null;
    },
  );
}

/** Tokenize `code` for `language`. Unknown languages come back as plain. */
export function highlight(code: string, language: string | undefined): Token[] {
  switch (normalize(language)) {
    case "tsx":
      return scanTsx(code);
    case "bash":
      return scanBash(code);
    case "json":
      return scanJson(code);
    default:
      return [{ text: code, type: "plain" }];
  }
}
