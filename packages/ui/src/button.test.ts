import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button } from "./button";

function html(props: Record<string, unknown> = {}, children: string = "Save") {
  return renderToStaticMarkup(h(Button, props as never, children));
}

describe("Button", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a native button", () => {
    const markup = html();
    expect(markup).toContain("<button");
    expect(markup).toContain('type="button"');
    expect(markup).not.toContain("<a");
  });

  it("marks tone variants with data-variant", () => {
    for (const variant of ["danger", "success", "warning"] as const) {
      const markup = html({ variant });
      expect(markup).toContain(`<button`);
      expect(markup).toContain(`data-variant="${variant}"`);
    }
  });

  it("renders an a when href is set", () => {
    const markup = html({ href: "/docs" }, "Docs");
    expect(markup).toContain("<a");
    expect(markup).toContain('href="/docs"');
    expect(markup).not.toContain("<button");
  });

  it("keeps href when the link is disabled", () => {
    const markup = html({ href: "/docs", disabled: true }, "Docs");
    expect(markup).toContain('href="/docs"');
    expect(markup).toContain('aria-disabled="true"');
    expect(markup).toContain('tabindex="-1"');
  });

  it("keeps href when the link is pending", () => {
    const markup = html({ href: "/docs", pending: true }, "Docs");
    expect(markup).toContain('href="/docs"');
    expect(markup).toContain('aria-busy="true"');
    expect(markup).not.toContain('tabindex="-1"');
  });

  it("stays focusable while pending", () => {
    const markup = html({ pending: true });
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-busy="true"');
    expect(markup).not.toContain("disabled");
  });

  it("drops submit while pending so the form cannot fire", () => {
    const markup = html({ pending: true, type: "submit" });
    expect(markup).toContain('type="button"');
    expect(markup).not.toContain('type="submit"');
  });

  it("warns in development when icon has no accessible name", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    html({ icon: true }, "");
    expect(warn).toHaveBeenCalledWith(
      "Button: icon requires aria-label or aria-labelledby.",
    );
  });

  it("does not warn when icon has an accessible name", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    html({ icon: true, "aria-label": "Add" }, "");
    expect(warn).not.toHaveBeenCalled();
  });
});
