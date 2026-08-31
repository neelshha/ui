import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(__dirname, "globals.css"), "utf8");

describe("Site CSS contract", () => {
  it("keeps the tablet/mobile breakpoint at the documented 48rem", () => {
    expect(css).toContain("@media (max-width: 48rem)");
  });

  it("shows the On This Page rail from 52rem up, in the frame's third column", () => {
    // Base: hidden. From 52rem the frame gains a 9rem rail column; the
    // scoped selector must out-rank the base rule, so the media block has
    // to come before it in source order.
    expect(css).toContain(".tocSlot {\n  display: none;\n}");
    expect(css).toContain("@media (min-width: 52rem)");
    expect(css).toContain(
      ".frame {\n    grid-template-columns: var(--sidebar) minmax(0, 1fr) 9rem;\n  }",
    );
    expect(css).toContain(".frame > .tocSlot {\n    display: block;");
    expect(css.indexOf("@media (min-width: 52rem)")).toBeLessThan(
      css.indexOf(".tocSlot {\n  display: none;\n}"),
    );
    // At 65rem the content centers and loses the frame gap, so the rail
    // pays its own start pad and widens back to 10rem.
    expect(css).toContain("@media (min-width: 65rem)");
    expect(css).toContain(
      ".frame > .tocSlot {\n    width: 10rem;\n    padding-inline-start: var(--rail);\n  }",
    );
  });

  it("boxes the rail in the library's raised face and aligns it with the article top", () => {
    expect(css).toContain(".toc {");
    expect(css).toContain("border: 1px solid var(--face-line)");
    expect(css).toContain("border-radius: var(--radius-list)");
    expect(css).toContain("box-shadow: var(--float)");
    expect(css).toContain(
      "top: calc(var(--header-height) + var(--space-10));",
    );
    // The rail's inner rhythm is the sidebar's: same rail pad before the
    // label and the same 4px label-to-list gap.
    expect(css).toContain("gap: var(--space-1);");
    expect(css).toContain("padding: var(--space-10) var(--space-5);");
    expect(css).toContain(".tocList a[aria-current=\"location\"] {");
    expect(css).toContain("box-shadow: var(--flat);");
  });

  it("aligns the mobile navbar contents with the page content gutter", () => {
    expect(css).toContain(
      ".header .ns-navbar {\n    /* Align the bar's contents with the page content gutter. */\n    padding-inline: var(--gutter);",
    );
  });

  it("gives the sticky rails runway — rail slots stretch inside the frame grid", () => {
    // The frame caps item heights with align-items: start; the slots must
    // opt back into stretch or the sticky sidebar/TOC scroll away.
    expect(css).toContain(".docsNavSlot {\n  min-width: 0;\n  /* Runway for the sticky sidebar");
    expect(css).toContain("align-self: stretch;");
  });

  it("insets the mobile drawer's rail and scrims with real ink", () => {
    // Items hug the screen edge without the start pad, and the scrim must
    // never resolve to the page background (--bg-overlay used to be --bg).
    expect(css).toContain(".headerDocsDrawer .ns-sidebar {");
    expect(css).toContain(
      "padding-inline: var(--space-10) var(--space-5, 0.61rem);",
    );
    // No fixed height on the drawer rail, or the bottom pad stops
    // following the list and the last item lands flush on the edge.
    expect(css).toContain(
      ".headerDocsDrawer .ns-sidebar {\n  position: static;\n  /* No fixed height",
    );
    expect(css).not.toContain("height: 100%;\n  max-height: none;");
  });

  it("keeps the scrim under the navbar so the bar never dulls", () => {
    // The scrim and the drawer both start at the bar's bottom edge, so
    // nothing paints over the bar's face while the sidebar is open — the
    // old lift-the-controls rule is gone for good.
    expect(css).toContain(
      ".headerDocsBackdrop {\n  position: fixed;\n  /* The scrim starts under the bar",
    );
    expect(css).toContain("inset: var(--header-height) 0 0;");
    expect(css).toContain(
      ".headerDocsDrawer {\n  position: fixed;\n  top: var(--header-height);",
    );
    expect(css).not.toContain("z-index: calc(var(--z-nav, 10) + 1)");
  });

  it("keeps the docs pager content-sized with the next key pushed right", () => {
    expect(css).toContain(".pagerLinkNext {\n  margin-inline-start: auto;\n}");
    expect(css).not.toContain(".pager .ns-button {\n    width: 100%;");
  });

  it("centers shrink-to-content pieces in the demo stage and stretches fillers", () => {
    expect(css).toContain(".demoInner {\n  display: flex;\n  flex-direction: column;\n  /* Shrink-to-content pieces (keys, choice rows, ribbons) center in the\n     stage; full-bleed pieces keep filling via the stretch list below. */\n  align-items: center;");
    expect(css).toContain(".demoInner > .ns-codeblock");
  });

  it("keeps the dead .api rule out — the library table scrolls itself", () => {
    expect(css).not.toContain(".api {");
  });
});
