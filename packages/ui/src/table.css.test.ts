import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const css = readFileSync(join(__dirname, "table.css"), "utf8");

describe("Table CSS", () => {
  it("draws column rules between cells but not after the last column", () => {
    expect(css).toContain(".ns-table__head:not(:last-child)");
    expect(css).toContain(".ns-table__cell:not(:last-child)");
    expect(css.match(/border-inline-end/g)?.length).toBe(1);
    // Row hairline stays on the base cell rule.
    expect(css).toContain("border-bottom");
  });

  it("scopes the row hover wash to interactive tables", () => {
    expect(css).toContain(
      ".ns-table[data-interactive] .ns-table__body .ns-table__row:hover",
    );
    // Every :hover line on a table row must carry the interactive scope.
    const hoverLines = css
      .split("\n")
      .filter((line) => line.includes("row:hover"));
    expect(hoverLines.length).toBeGreaterThan(0);
    for (const line of hoverLines) {
      expect(line).toContain("[data-interactive]");
    }
  });
});
