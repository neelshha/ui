import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(__dirname, "globals.css"), "utf8");

describe("Site CSS contract", () => {
  it("keeps the tablet/mobile breakpoint at the documented 48rem", () => {
    expect(css).toContain("@media (max-width: 48rem)");
  });

  it("shows the On This Page rail from 48rem up, in the frame's third column", () => {
    // Base: hidden. From 48rem — the same band the docs sidebar appears —
    // the frame gains a 9rem rail column; the scoped selector must out-rank
    // the base rule, so the media block has to come before it in source order.
    expect(css).toContain(".tocSlot {\n  display: none;\n}");
    expect(css).toContain("@media (min-width: 48rem)");
    expect(css).toContain(
      ".frame {\n    grid-template-columns: var(--sidebar) minmax(0, 1fr) 9rem;\n  }",
    );
    expect(css).toContain(".frame > .tocSlot {\n    display: block;");
    expect(css.indexOf("@media (min-width: 48rem)")).toBeLessThan(
      css.indexOf(".tocSlot {\n  display: none;\n}"),
    );
    // At 65rem the content centers; the rail's slot then mirrors the
    // sidebar's exactly — the same 12rem column pinned to the frame's
    // right edge, hairline facing the article, spare width breathing on
    // both sides.
    expect(css).toContain("@media (min-width: 65rem)");
    expect(css).toContain(
      ".frame > .tocSlot {\n    justify-self: end;\n    width: var(--sidebar);\n  }",
    );
  });

  it("makes the rail a bento tile — one face, edge-to-edge seam, level sticky top", () => {
    // One chrome like the catalog tiles: face fill, face-line border,
    // list radius, flat (no shadow at rest).
    expect(css).toContain(".toc {");
    expect(css).toContain("border: 1px solid var(--face-line);");
    expect(css).toContain("border-radius: var(--radius-list);");
    expect(css).toContain("background: var(--face);");
    // The card's top edge rides the article's top pad — level with the
    // page title's line; the space is above the card, not inside it.
    expect(css).toContain("top: calc(var(--header-height) + var(--space-10));");
    expect(css).toContain(
      "max-height: calc(100dvh - var(--header-height) - var(--space-10));",
    );
    // The label and list are the tile's two bento sections, split by an
    // edge-to-edge hairline seam.
    expect(css).toContain("border-block-end: 1px solid var(--line);");
    expect(css).toContain(".tocList {\n  display: flex;");
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
