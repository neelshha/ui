import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

const badgeCss = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "badge.css"),
  "utf8",
);

function html(props: Record<string, unknown> = {}, children: string = "Draft") {
  return renderToStaticMarkup(h(Badge, props as never, children));
}

describe("Badge", () => {
  it("renders a span with the badge class", () => {
    const markup = html();
    expect(markup).toContain("<span");
    expect(markup).toContain("ns-badge");
  });

  it("defaults to the default tone", () => {
    expect(html()).toContain('data-tone="default"');
  });

  it.each(["accent", "success", "warning", "danger"] as const)(
    "sets data-tone=%s when tone=%s",
    (tone) => {
      expect(html({ tone })).toContain(`data-tone="${tone}"`);
    },
  );

  it("renders its children", () => {
    expect(html({}, "Live")).toContain(">Live</span>");
  });

  it("passes through extra props", () => {
    expect(html({ "data-testid": "b", title: "t" })).toContain("title=\"t\"");
  });
});

describe("Badge styling contract (light/dark)", () => {
  it("is theme-driven: colors come from tokens, not hardcoded values", () => {
    // Every color must flow through a theme token so the badge adapts to
    // both light and dark themes. Hardcoded hex colors would break parity.
    const tokenUses = badgeCss.match(/var\(--[a-z-]+/g) ?? [];
    expect(tokenUses).toContain("var(--text-sub");
    expect(tokenUses).toContain("var(--key-line");
    expect(tokenUses).toContain("var(--key");
    expect(tokenUses).toContain("var(--success");
    expect(tokenUses).toContain("var(--warning");
    expect(tokenUses).toContain("var(--error");
    // Hex colors are allowed only as token fallbacks (inside var(..., #hex));
    // any hex outside a var() fallback would be a hardcoded color.
    const withoutFallbacks = badgeCss.replace(/var\([^)]*\)/g, "");
    const bareHex = withoutFallbacks.match(/#[0-9a-fA-F]{3,8}\b/g) ?? [];
    expect(bareHex).toEqual([]);
  });

  it("is a flat mark: no float shadow, pill radius, hairline border", () => {
    // A badge is a mark, not a key: it must not borrow the button's
    // key-face gradient, float shadow, or rectangular control radius.
    expect(badgeCss).toContain("border-radius: 999px");
    expect(badgeCss).toContain("box-shadow: var(--flat)");
    expect(badgeCss).not.toContain("var(--float");
    expect(badgeCss).not.toContain("var(--key-face");
  });

  it("renders the same markup regardless of theme class", () => {
    // The markup is theme-agnostic; theming happens via CSS tokens on :root,
    // so light and dark render identical DOM.
    expect(html()).toBe(
      renderToStaticMarkup(h(Badge, { tone: "default" } as never, "Draft")),
    );
  });
});
