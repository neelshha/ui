import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "./accordion";
import { Avatar, AvatarFallback } from "./avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "./breadcrumb";
import { Kbd } from "./kbd";
import { Link } from "./link";
import { Menu, MenuItem, MenuTrigger } from "./menu";
import { Popover, PopoverTrigger } from "./popover";
import { Progress } from "./progress";
import { Separator } from "./separator";
import { Skeleton } from "./skeleton";
import { Spinner } from "./spinner";
import { Tooltip } from "./tooltip";

describe("Phase 4 primitives", () => {
  it("Accordion clones name onto details", () => {
    const markup = renderToStaticMarkup(
      h(Accordion, {
        name: "faq",
        children: [
          h(AccordionItem, { key: "a" }, [
            h(AccordionTrigger, { key: "t" }, "One"),
            h(AccordionPanel, { key: "p" }, "Body"),
          ]),
        ],
      }),
    );
    expect(markup).toContain("<details");
    expect(markup).toContain('name="faq"');
    expect(markup).toContain("<summary");
  });

  it("renders Avatar, Breadcrumb, Kbd, Link, Progress, Skeleton, Spinner", () => {
    expect(
      renderToStaticMarkup(
        h(Avatar, {}, h(AvatarFallback, {}, "AS")),
      ),
    ).toContain("AS");
    expect(
      renderToStaticMarkup(
        h(Breadcrumb, {}, h(BreadcrumbList, {}, [
          h(BreadcrumbItem, { key: "a" }, h(BreadcrumbLink, { href: "/" }, "Home")),
          h(BreadcrumbItem, { key: "b" }, h(BreadcrumbPage, {}, "Docs")),
        ])),
      ),
    ).toContain('aria-current="page"');
    expect(
      renderToStaticMarkup(
        h(Breadcrumb, {}, h(BreadcrumbList, {}, [
          h(BreadcrumbItem, { key: "a" }, h(BreadcrumbLink, { href: "/" }, "Home")),
          h(BreadcrumbItem, { key: "b" }, h(BreadcrumbPage, {}, "Docs")),
        ])),
      ),
    ).toContain('aria-hidden="true"');
    expect(renderToStaticMarkup(h(Kbd, {}, "⌘K"))).toContain("<kbd");
    expect(renderToStaticMarkup(h(Link, { href: "/docs" }, "Docs"))).toContain(
      'href="/docs"',
    );
    expect(
      renderToStaticMarkup(
        h(Link, { href: "https://example.com", target: "_blank" }, "Out"),
      ),
    ).toContain('rel="noopener noreferrer"');
    expect(renderToStaticMarkup(h(Progress, { value: 40 }))).toContain(
      "<progress",
    );
    expect(renderToStaticMarkup(h(Skeleton, {}))).toContain("ns-skeleton");
    expect(renderToStaticMarkup(h(Spinner, {}))).toContain("ns-spinner");
    expect(renderToStaticMarkup(h(Spinner, {}))).toContain("aria-hidden");
    expect(
      renderToStaticMarkup(h(Spinner, { label: "Loading" })),
    ).toContain('aria-label="Loading"');
  });

  it("Popover and Menu use the popover attribute", () => {
    expect(
      renderToStaticMarkup(
        h(Popover, { id: "more" }, "Notes"),
      ),
    ).toContain("popover");
    expect(
      renderToStaticMarkup(
        h(PopoverTrigger, { popoverTarget: "more" }, "Open"),
      ),
    ).toContain("Open");
    expect(
      renderToStaticMarkup(
        h(Menu, { id: "actions" }, h(MenuItem, {}, "Archive")),
      ),
    ).toContain('role="menu"');
    expect(
      renderToStaticMarkup(h(MenuTrigger, { menu: "actions" }, "Actions")),
    ).toContain("Actions");
    expect(
      renderToStaticMarkup(h(MenuTrigger, { menu: "actions" }, "Actions")),
    ).toContain("--ns-actions");
    expect(
      renderToStaticMarkup(
        h(Menu, { id: "actions" }, h(MenuItem, {}, "Archive")),
      ),
    ).toContain("--ns-actions");
    expect(
      renderToStaticMarkup(h(MenuTrigger, { menu: "actions" }, "Actions")),
    ).toContain('aria-expanded="false"');
    expect(
      renderToStaticMarkup(
        h(Menu, { id: "actions" }, h(MenuItem, {}, "Archive")),
      ),
    ).toContain('aria-orientation="vertical"');
    expect(
      renderToStaticMarkup(
        h(Menu, { id: "actions" }, h(MenuItem, {}, "Archive")),
      ),
    ).toContain('tabindex="-1"');
    expect(
      renderToStaticMarkup(
        h(PopoverTrigger, { popoverTarget: "more" }, "Open"),
      ),
    ).toContain('aria-haspopup="true"');
  });

  it("Tooltip wraps a hint", () => {
    const markup = renderToStaticMarkup(
      h(Tooltip, { content: "Saved." }, "Hover"),
    );
    expect(markup).toContain('role="tooltip"');
    expect(markup).toContain("Saved.");
    expect(markup).toContain("aria-describedby");
  });

  it("keeps an existing describedby on the trigger", () => {
    const markup = renderToStaticMarkup(
      h(
        Tooltip,
        { content: "Saved." },
        h("button", { "aria-describedby": "hint" }, "Hover"),
      ),
    );
    expect(markup).toContain("hint");
    expect(markup).toMatch(/aria-describedby="hint /);
  });

  it("hides a decorative separator", () => {
    expect(renderToStaticMarkup(h(Separator, { decorative: true }))).toContain(
      "aria-hidden",
    );
    expect(
      renderToStaticMarkup(
        h(Separator, { orientation: "vertical", decorative: true }),
      ),
    ).not.toContain('role="separator"');
  });
});
