import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const css = readFileSync(join(__dirname, "field.css"), "utf8");

describe("Switch CSS", () => {
  it("keeps the off track on the shared field chrome, like the checkbox", () => {
    // No bespoke off-state paint: the switch off inherits .ns-choice's
    // field fill + face-line border + float, matching the checkbox box.
    expect(css).not.toContain('[data-kind="switch"]:not(:checked)');
  });

  it("gives the thumb a ringed mini-key look with a tight raised shadow", () => {
    const knobBlock = css.slice(
      css.indexOf('.ns-choice[data-kind="switch"]::after'),
      css.indexOf(".ns-choice:focus,"),
    );
    expect(knobBlock).toContain("border: 1px solid var(--face-line");
    expect(knobBlock).toContain("var(--raise");
    // The 8px float shadow smudges below an ~11px thumb — none left here.
    expect(knobBlock).not.toContain("var(--float");
  });
});
