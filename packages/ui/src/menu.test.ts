import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { menuFocusTarget, Menu, MenuItem, MenuTrigger } from "./menu";

describe("menuFocusTarget", () => {
  it("moves down and wraps from the last item to the first", () => {
    expect(menuFocusTarget(3, 0, 1)).toBe(1);
    expect(menuFocusTarget(3, 1, 1)).toBe(2);
    expect(menuFocusTarget(3, 2, 1)).toBe(0);
  });

  it("moves up and wraps from the first item to the last", () => {
    expect(menuFocusTarget(3, 2, -1)).toBe(1);
    expect(menuFocusTarget(3, 1, -1)).toBe(0);
    expect(menuFocusTarget(3, 0, -1)).toBe(2);
  });

  it("lands on the first item when focus is not on an item yet", () => {
    // Right after the menu opens, focus has not reached an item (-1) —
    // both arrows start from the top so ArrowDown never skips the first row.
    expect(menuFocusTarget(3, -1, 1)).toBe(0);
    expect(menuFocusTarget(3, -1, -1)).toBe(0);
  });

  it("targets nothing in an empty menu", () => {
    expect(menuFocusTarget(0, -1, 1)).toBe(-1);
  });

  it("moves within a two-item menu", () => {
    expect(menuFocusTarget(2, 0, 1)).toBe(1);
    expect(menuFocusTarget(2, 1, -1)).toBe(0);
  });
});

describe("Menu", () => {
  it("renders a native popover menu", () => {
    const markup = renderToStaticMarkup(
      h(Menu, { id: "actions" }, h(MenuItem, {}, "Archive")),
    );
    expect(markup).toContain('popover="auto"');
    expect(markup).toContain('role="menu"');
    expect(markup).toContain('aria-orientation="vertical"');
    expect(markup).toContain('id="actions"');
  });
});

describe("MenuItem", () => {
  it("renders a menuitem button out of the tab order", () => {
    const markup = renderToStaticMarkup(h(MenuItem, {}, "Archive"));
    expect(markup).toContain('role="menuitem"');
    expect(markup).toContain('tabindex="-1"');
    expect(markup).toContain("ns-menu__item");
  });

  it("renders a disabled item as natively disabled", () => {
    const markup = renderToStaticMarkup(
      h(MenuItem, { disabled: true }, "Delete"),
    );
    // The enabled-item selector in menu.tsx filters on [disabled], so the
    // attribute must be present for arrows to skip it.
    expect(markup).toContain("disabled");
  });
});

describe("MenuTrigger", () => {
  it("wires the trigger to the popover with menu semantics", () => {
    const markup = renderToStaticMarkup(h(MenuTrigger, { menu: "actions" }, "Actions"));
    expect(markup).toContain('popoverTarget="actions"');
    expect(markup).toContain('aria-haspopup="menu"');
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain('aria-controls="actions"');
  });
});
