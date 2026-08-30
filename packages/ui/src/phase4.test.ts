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
    expect(renderToStaticMarkup(h(Kbd, {}, "⌘K"))).toContain("<kbd");
    expect(renderToStaticMarkup(h(Link, { href: "/docs" }, "Docs"))).toContain(
      'href="/docs"',
    );
    expect(renderToStaticMarkup(h(Progress, { value: 40 }))).toContain(
      "<progress",
    );
    expect(renderToStaticMarkup(h(Skeleton, {}))).toContain("ns-skeleton");
    expect(renderToStaticMarkup(h(Spinner, {}))).toContain("ns-spinner");
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
  });

  it("Tooltip wraps a hint", () => {
    const markup = renderToStaticMarkup(
      h(Tooltip, { content: "Saved." }, "Hover"),
    );
    expect(markup).toContain('role="tooltip"');
    expect(markup).toContain("Saved.");
    expect(markup).toContain("aria-describedby");
  });
});
