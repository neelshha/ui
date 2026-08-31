import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Checkbox } from "./checkbox";
import { Dialog, DialogDescription, DialogTitle } from "./dialog";
import { Radio, RadioGroup } from "./radio";
import { Select } from "./select";
import { Switch } from "./switch";
import { Badge } from "./badge";
import { TextField } from "./field";

describe("Field", () => {
  it("keeps description when error is set", () => {
    const markup = renderToStaticMarkup(
      h(TextField, {
        label: "Name",
        description: "Your full name.",
        error: "Enter a name.",
      }),
    );
    expect(markup).toContain("Your full name.");
    expect(markup).toContain("Enter a name.");
    expect(markup).toContain("aria-describedby");
    expect(markup).not.toContain("aria-errormessage");
    expect(markup).not.toContain('role="alert"');
  });

  it("marks required on the label and the input", () => {
    const markup = renderToStaticMarkup(
      h(TextField, { label: "Email", required: true }),
    );
    expect(markup).toContain("ns-field__required");
    expect(markup).toContain("*");
    expect(markup).toContain(" Required");
    expect(markup).toContain("aria-required");
    expect(markup).toContain("required");
  });

  it("renders a custom required label instead of the asterisk", () => {
    const markup = renderToStaticMarkup(
      h(TextField, { label: "Email", required: true, requiredLabel: "Obligatorisk" }),
    );
    expect(markup).toContain("Obligatorisk");
    expect(markup).not.toContain("aria-hidden");
  });

  it("keeps Optional when both optional and required are set", () => {
    const markup = renderToStaticMarkup(
      h(TextField, { label: "Name", optional: true, required: true }),
    );
    expect(markup).toContain(" Optional");
    expect(markup).not.toContain(" Required");
  });

  it("uses a custom optional label", () => {
    const markup = renderToStaticMarkup(
      h(TextField, { label: "Name", optional: true, optionalLabel: "Facultatif" }),
    );
    expect(markup).toContain("Facultatif");
    expect(markup).not.toContain(" Optional");
  });

  it("keeps a float label above the well", () => {
    const markup = renderToStaticMarkup(
      h(TextField, { label: "Name", chrome: "stack" }),
    );
    expect(markup).toContain('data-label="stack"');
    expect(markup).toContain("<label");
    expect(markup).not.toContain('placeholder=" "');
  });

  it("omits meta when there is no help or error", () => {
    const markup = renderToStaticMarkup(
      h(TextField, { label: "Name" }),
    );
    expect(markup).not.toContain("ns-field__meta");
    expect(markup).toContain('data-label="stack"');
  });

  it("wires a composed control without ids from the caller", () => {
    const markup = renderToStaticMarkup(
      h(TextField, { label: "Name", name: "name" }),
    );
    expect(markup).toContain("<label");
    expect(markup).toContain("for=");
    expect(markup).toContain('id="');
  });

  it("falls back from unsupported input types", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const markup = renderToStaticMarkup(
      h(TextField, { label: "When", type: "date" as never }),
    );
    expect(markup).toContain('type="text"');
    expect(markup).not.toContain('type="date"');
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});

describe("Badge", () => {
  it("accepts intent tones", () => {
    const markup = renderToStaticMarkup(
      h(Badge, { tone: "success" }, "Live"),
    );
    expect(markup).toContain('data-tone="success"');
    expect(markup).toContain("Live");
  });
});

describe("Checkbox", () => {
  it("renders a native checkbox in Field chrome", () => {
    const markup = renderToStaticMarkup(
      h(Checkbox, { label: "Remember me", name: "remember" }),
    );
    expect(markup).toContain('type="checkbox"');
    expect(markup).toContain("ns-choice");
    expect(markup).toContain('data-kind="choice"');
    expect(markup).toContain("Remember me");
  });
});

describe("Radio", () => {
  it("clones name onto each radio", () => {
    const markup = renderToStaticMarkup(
      h(RadioGroup, {
        label: "Notify",
        name: "notify",
        children: [
          h(Radio, { key: "mail", label: "Mail" }),
          h(Radio, { key: "none", label: "None" }),
        ],
      }),
    );
    expect(markup).toContain("<fieldset");
    expect(markup).toContain("Notify");
    expect(markup.split('name="notify"').length - 1).toBe(2);
    expect(markup).toContain('type="radio"');
  });

  it("marks radios required when the group is required", () => {
    const markup = renderToStaticMarkup(
      h(RadioGroup, {
        label: "Notify",
        name: "notify-req",
        required: true,
        children: [h(Radio, { key: "mail", label: "Mail" })],
      }),
    );
    expect(markup).toMatch(/<input[^>]*required/);
  });
});

describe("Select", () => {
  it("renders a native select with a raised label", () => {
    const markup = renderToStaticMarkup(
      h(Select, { label: "Role", name: "role" }, h("option", {}, "Editor")),
    );
    expect(markup).toContain("<select");
    expect(markup).toContain('data-kind="select"');
    expect(markup).toContain("Editor");
  });
});

describe("Switch", () => {
  it("renders a checkbox with switch role", () => {
    const markup = renderToStaticMarkup(
      h(Switch, { label: "Alerts", name: "alerts" }),
    );
    expect(markup).toContain('type="checkbox"');
    expect(markup).toContain('role="switch"');
    expect(markup).toContain('data-kind="switch"');
  });
});

describe("Alert", () => {
  it("defaults to status and accepts a tone", () => {
    const markup = renderToStaticMarkup(
      h(Alert, { tone: "success" }, "Saved."),
    );
    expect(markup).toContain('role="status"');
    expect(markup).toContain('data-tone="success"');
    expect(markup).toContain("Saved.");
  });

  it("uses alert for danger", () => {
    const markup = renderToStaticMarkup(
      h(Alert, { tone: "danger" }, "Failed."),
    );
    expect(markup).toContain('role="alert"');
    expect(markup).toContain('data-tone="danger"');
  });

  it("renders a title and description", () => {
    const markup = renderToStaticMarkup(
      h(Alert, { tone: "success" }, [
        h(AlertTitle, { key: "t" }, "Saved."),
        h(AlertDescription, { key: "d" }, "Your changes are on the server."),
      ]),
    );
    expect(markup).toContain("ns-alert__title");
    expect(markup).toContain("ns-alert__description");
    expect(markup).toContain("Your changes are on the server.");
  });
});

describe("Dialog", () => {
  it("renders a native dialog closed", () => {
    const markup = renderToStaticMarkup(
      h(Dialog, {}, h(DialogTitle, {}, "Delete?")),
    );
    expect(markup).toContain("<dialog");
    expect(markup).toContain("ns-dialog");
    expect(markup).toContain("<h2");
    expect(markup).toContain("Delete?");
    expect(markup).toContain("aria-labelledby");
    expect(markup).not.toContain("open");
  });

  it("wires DialogDescription into aria-describedby", () => {
    const markup = renderToStaticMarkup(
      h(Dialog, {}, [
        h(DialogTitle, { key: "t" }, "Delete?"),
        h(DialogDescription, { key: "d" }, "This cannot be undone."),
      ]),
    );
    expect(markup).toContain("aria-describedby");
    expect(markup).toContain("This cannot be undone.");
  });
});
