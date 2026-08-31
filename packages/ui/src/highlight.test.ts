import { describe, expect, it } from "vitest";
import { highlight } from "./highlight";

const text = (tokens: ReturnType<typeof highlight>) =>
  tokens.map((t) => t.text).join("");

const types = (tokens: ReturnType<typeof highlight>) =>
  tokens.filter((t) => t.type !== "plain").map((t) => [t.text, t.type]);

describe("highlight", () => {
  it("is lossless for every language", () => {
    for (const [lang, code] of [
      ["tsx", `import { Card } from "./card";\nconst n = 1.5;`],
      ["bash", "npx @neelshha/ui@latest add field --yes # install\n"],
      ["json", '{"name": "ui", "n": 2, "ok": true}\n'],
      [undefined, "whatever <text>"],
    ] as const) {
      expect(text(highlight(code, lang))).toBe(code);
    }
  });

  it("colors tsx keywords, strings, comments, tags, attrs, and functions", () => {
    const tokens = types(
      highlight(
        `import { Card } from "./card";\n// note\n<Card name="x" />\nrender(a);`,
        "tsx",
      ),
    );
    const flat = tokens.flat().join(" ");
    expect(flat).toContain("import keyword");
    expect(flat).toContain('"./card" string');
    expect(flat).toContain("Card type");
    expect(flat).toContain("note comment");
    expect(flat).toContain("Card tag");
    expect(flat).toContain("name attr");
    expect(flat).toContain("render function");
  });

  it("colors bash commands, flags, and comments", () => {
    const tokens = types(
      highlight("npx ns add field --yes # installs", "bash"),
    );
    const flat = tokens.flat().join(" ");
    expect(flat).toContain("npx command");
    expect(flat).toContain("--yes flag");
    expect(flat).toContain("installs comment");
  });

  it("colors json keys, values, and literals", () => {
    const tokens = types(highlight('{"a": 1, "b": true}', "json"));
    const flat = tokens.flat().join(" ");
    expect(flat).toContain('"a" key');
    expect(flat).toContain("1 number");
    expect(flat).toContain('"b" key');
    expect(flat).toContain("true keyword");
  });

  it("escapes do not break strings", () => {
    const tokens = types(highlight('const s = "a\\"b";', "ts"));
    const stringToken = tokens.find(([, type]) => type === "string");
    expect(stringToken?.[0]).toBe('"a\\"b"');
  });

  it("returns one plain token for unknown languages", () => {
    const tokens = highlight("<xml>a</xml>", "xml");
    expect(tokens).toEqual([{ text: "<xml>a</xml>", type: "plain" }]);
  });
});
