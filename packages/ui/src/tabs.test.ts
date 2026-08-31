import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Tab, TabList, Tabs } from "./tabs";

function render(children: React.ReactNode) {
  return renderToStaticMarkup(
    h(Tabs, { children }, children as never),
  );
}

/** The `<button …>` element that renders a given tab label. */
function buttonFor(markup: string, label: string) {
  const at = markup.indexOf(`>${label}<`);
  const start = markup.lastIndexOf("<button", at);
  const end = markup.indexOf("</button>", at);
  return markup.slice(start, end);
}

describe("Tabs", () => {
  it("starts on the first enabled tab", () => {
    const markup = render(
      h(TabList, {}, [
        h(Tab, { key: "a", value: "a", disabled: true }, "Locked"),
        h(Tab, { key: "b", value: "b" }, "Open"),
      ]),
    );
    expect(buttonFor(markup, "Locked")).toContain('aria-selected="false"');
    expect(buttonFor(markup, "Open")).toContain('aria-selected="true"');
  });

  it("marks a disabled tab with aria-disabled, not the disabled attribute", () => {
    const markup = render(
      h(TabList, {}, [
        h(Tab, { key: "a", value: "a" }, "One"),
        h(Tab, { key: "b", value: "b", disabled: true }, "Two"),
      ]),
    );
    expect(buttonFor(markup, "Two")).toContain('aria-disabled="true"');
    // A role=tab must not carry the native disabled attribute.
    expect(markup).not.toMatch(/<button[^>]*\sdisabled[> =]/);
  });

  it("keeps a plain tab free of aria-disabled", () => {
    const markup = render(
      h(TabList, {}, h(Tab, { value: "a" }, "One")),
    );
    expect(markup).not.toContain("aria-disabled");
  });
});
