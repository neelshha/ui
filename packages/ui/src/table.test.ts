import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Tab, TabList, TabPanel, Tabs } from "./tabs";

describe("Table", () => {
  it("renders a native table", () => {
    const markup = renderToStaticMarkup(
      h(
        Table,
        {},
        h(TableCaption, {}, "Projects"),
        h(
          TableHeader,
          {},
          h(TableRow, {}, h(TableHead, {}, "Name"), h(TableHead, {}, "Status")),
        ),
        h(
          TableBody,
          {},
          h(TableRow, {}, h(TableCell, {}, "Atlas"), h(TableCell, {}, "Live")),
        ),
      ),
    );
    expect(markup).toContain("<table");
    expect(markup).toContain("<caption");
    expect(markup).toContain("Projects");
    expect(markup).toContain("<th");
    expect(markup).toContain("<td");
    expect(markup).toContain("Atlas");
  });
});

describe("Tabs", () => {
  it("selects the default tab and hides the rest", () => {
    const markup = renderToStaticMarkup(
      h(Tabs, { defaultValue: "one" }, [
        h(TabList, { key: "list" }, [
          h(Tab, { key: "one", value: "one" }, "Profile"),
          h(Tab, { key: "two", value: "two" }, "Billing"),
        ]),
        h(TabPanel, { key: "p1", value: "one" }, "Profile copy"),
        h(TabPanel, { key: "p2", value: "two" }, "Billing copy"),
      ]),
    );
    expect(markup).toContain('role="tablist"');
    expect(markup).toContain('role="tab"');
    expect(markup).toContain('aria-selected="true"');
    expect(markup).toContain("Profile copy");
    expect(markup).not.toContain("Billing copy");
    expect(markup).toContain("hidden");
  });
});
