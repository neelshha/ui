import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// The responsive contract: every component must survive a 320px phone
// without widening the page. Width-sensitive pieces either wrap, scroll
// internally, or cap their own width; the two rails flatten at --bp-md.
// If a rule here is removed, a component just lost its device behavior.

const read = (name: string) =>
  readFileSync(join(__dirname, name), "utf8");

describe("Responsive contract", () => {
  it("lets wide tables scroll inside their own box, never the page", () => {
    const css = read("table.css");
    expect(css).toContain("overflow-x: auto");
  });

  it("lets long code lines scroll inside the block", () => {
    const css = read("codeblock.css");
    expect(css).toContain("overflow-x: auto");
    // The bar's title truncates instead of pushing the block wider.
    expect(css).toContain("text-overflow: ellipsis");
  });

  it("caps the dialog to the viewport on small screens and wraps its actions", () => {
    const css = read("dialog.css");
    expect(css).toContain("width: min(28rem, calc(100% - var(--space-10");
    expect(css).toContain(".ns-dialog__actions {\n    display: flex;\n    flex-wrap: wrap;");
  });

  it("wraps tab and breadcrumb rows instead of overflowing", () => {
    expect(read("tabs.css")).toContain("flex-wrap: wrap");
    expect(read("breadcrumb.css")).toContain("flex-wrap: wrap");
  });

  it("keeps field, toast, and sidebar internals shrinkable", () => {
    for (const name of ["field.css", "toast.css", "sidebar.css"]) {
      expect(read(name)).toContain("min-width: 0");
    }
  });

  it("flattens the navbar and sidebar rails at --bp-md (48rem)", () => {
    const navbar = read("navbar.css");
    const sidebar = read("sidebar.css");
    expect(navbar).toContain("@media (max-width: 48rem)");
    expect(sidebar).toContain("@media (max-width: 48rem)");
    // Inside the breakpoint the sidebar stacks its nav again (the library
    // flattens it into a row for inline headers).
    expect(sidebar).toContain("flex-direction: column");
  });
});
