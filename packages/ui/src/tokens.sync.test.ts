import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(__dirname, "tokens.css"), "utf8");

/**
 * The dark palette is written twice on purpose — a media query cannot be
 * merged with a class selector in plain CSS. That duplication is a drift
 * hazard (a token edited in one block and forgotten in the other), so this
 * contract pins the two blocks to identical declarations.
 */
function declarationsOf(block: string): Map<string, string> {
  const map = new Map<string, string>();
  const rule = /--[\w-]+\s*:\s*[^;]+;/g;
  for (const match of block.matchAll(rule)) {
    const [prop, value] = match[0].split(":");
    if (!prop || !value) continue;
    // Normalize whitespace so formatting differences don't count as drift.
    map.set(prop.trim(), value.replace(/\s+/g, " ").trim().replace(/;$/, ""));
  }
  return map;
}

function blockBetween(from: string, to: string): string {
  const start = css.indexOf(from);
  const end = css.indexOf(to, start);
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  return css.slice(start, end);
}

describe("Dark token blocks stay in sync", () => {
  it("system dark and forced dark declare the same tokens with the same values", () => {
    const system = declarationsOf(
      blockBetween(
        "@media (prefers-color-scheme: dark) {",
        ":root.dark {",
      ),
    );
    const forced = declarationsOf(
      blockBetween(":root.dark {", ":root.light {"),
    );

    const systemKeys = [...system.keys()].sort();
    const forcedKeys = [...forced.keys()].sort();
    expect(forcedKeys).toEqual(systemKeys);

    for (const [prop, value] of system) {
      expect(forced.get(prop), `${prop} drifted`).toBe(value);
    }
  });
});
