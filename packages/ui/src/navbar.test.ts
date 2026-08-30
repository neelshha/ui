import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Navbar, NavbarBrand, NavbarItem, NavbarList } from "./navbar";

describe("Navbar", () => {
  it("renders a native nav", () => {
    const markup = renderToStaticMarkup(h(Navbar, {}, "Acme"));
    expect(markup).toContain("<nav");
    expect(markup).toContain("ns-navbar");
  });

  it("renders brand as an a when href is set", () => {
    const markup = renderToStaticMarkup(
      h(NavbarBrand, { href: "/" }, "Acme"),
    );
    expect(markup).toContain("<a");
    expect(markup).toContain('href="/"');
    expect(markup).not.toContain("<span");
  });

  it("marks the current item", () => {
    const markup = renderToStaticMarkup(
      h(NavbarList, {}, h(NavbarItem, { href: "/docs", current: true }, "Docs")),
    );
    expect(markup).toContain("<ul");
    expect(markup).toContain("<a");
    expect(markup).toContain('href="/docs"');
    expect(markup).toContain('aria-current="page"');
    expect(markup).toContain("ns-navbar__item");
    expect(markup).toContain("ns-button");
  });
});
