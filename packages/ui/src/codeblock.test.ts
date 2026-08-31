import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CodeBlock } from "./codeblock";

const css = readFileSync(join(__dirname, "codeblock.css"), "utf8");

describe("CodeBlock CSS", () => {
  it("resets the figure UA margin so blocks fill their column", () => {
    const rule = css.slice(css.indexOf(".ns-codeblock {"), css.indexOf(".ns-codeblock__bar"));
    expect(rule).toContain("margin: 0;");
  });

  it("sizes the bar's copy key to the compact bar rhythm, like navbar toggles", () => {
    expect(css).toContain(".ns-codeblock__bar .ns-button[data-icon]");
    expect(css).toContain("var(--control-sm)");
  });
});

describe("CodeBlock", () => {
  const code = "const hi = \"hello\";";

  it("renders the bar, body, and copy key", () => {
    const markup = renderToStaticMarkup(
      h(CodeBlock, { title: "hi.ts", language: "ts", code }),
    );
    expect(markup).toContain("<figure");
    expect(markup).toContain("ns-codeblock");
    expect(markup).toContain("ns-codeblock__bar");
    expect(markup).toContain("hi.ts");
    expect(markup).toContain("ns-codeblock__lang");
    expect(markup).toContain(">ts<");
    expect(markup).toContain("<pre");
    expect(markup).toContain("<code");
    expect(markup).toContain("const hi");
    expect(markup).toContain("Copy code");
  });

  it("omits the title and chip when they are not passed", () => {
    const markup = renderToStaticMarkup(h(CodeBlock, { code }));
    expect(markup).not.toContain("ns-codeblock__title");
    expect(markup).not.toContain("ns-codeblock__lang");
    expect(markup).toContain("Copy code");
  });
});
