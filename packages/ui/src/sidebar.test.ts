import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Sidebar,
  SidebarGroup,
  SidebarItem,
  SidebarLabel,
  SidebarList,
  SidebarNav,
} from "./sidebar";

describe("Sidebar", () => {
  it("renders a native aside and nav", () => {
    const markup = renderToStaticMarkup(
      h(Sidebar, {}, h(SidebarNav, { "aria-label": "Docs" }, "Start")),
    );
    expect(markup).toContain("<aside");
    expect(markup).toContain("<nav");
    expect(markup).toContain("ns-sidebar");
    expect(markup).toContain('aria-label="Docs"');
  });

  it("marks the current item", () => {
    const markup = renderToStaticMarkup(
      h(
        SidebarList,
        {},
        h(SidebarItem, { href: "/docs", current: true }, "Introduction"),
      ),
    );
    expect(markup).toContain("<ul");
    expect(markup).toContain("<a");
    expect(markup).toContain('href="/docs"');
    expect(markup).toContain('aria-current="page"');
    expect(markup).toContain("ns-sidebar__item");
    expect(markup).not.toContain("ns-button");
  });

  it("clones a child link when href is omitted", () => {
    const markup = renderToStaticMarkup(
      h(
        SidebarItem,
        { current: true },
        h("a", { href: "/docs" }, "Introduction"),
      ),
    );
    expect(markup).toContain('href="/docs"');
    expect(markup).toContain("ns-sidebar__item");
    expect(markup).not.toContain("ns-button");
    expect(markup).toContain('aria-current="page"');
  });

  it("clones a label child when href is omitted", () => {
    const markup = renderToStaticMarkup(
      h(SidebarLabel, {}, h("a", { href: "/components" }, "Components")),
    );
    expect(markup).toContain("<a");
    expect(markup).toContain('href="/components"');
    expect(markup).toContain("ns-sidebar__label-link");
  });

  it("renders a label as an a when href is set", () => {
    const markup = renderToStaticMarkup(
      h(SidebarGroup, {}, [
        h(SidebarLabel, { key: "l", href: "/docs/components", current: true }, "Components"),
        h(SidebarList, { key: "n" }, h(SidebarItem, { href: "/docs/components/field" }, "Field")),
      ]),
    );
    expect(markup).toContain('href="/docs/components"');
    expect(markup).toContain("Components");
    expect(markup).toContain("Field");
  });
});
