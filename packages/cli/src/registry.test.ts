import { describe, expect, it } from "vitest";
import { asRegistryItem, registryBase } from "./registry.js";

const validPayload = {
  name: "button",
  title: "Button",
  files: [{ path: "button.tsx", content: "export function Button() {}" }],
  dependencies: { npm: [], registry: ["cx"] },
};

describe("asRegistryItem", () => {
  it("accepts a well-formed payload", () => {
    const item = asRegistryItem(validPayload);
    expect(item?.name).toBe("button");
    expect(item?.files).toHaveLength(1);
  });

  it("normalizes a payload missing the dependencies block", () => {
    const item = asRegistryItem({ name: "cx", files: [{ path: "cx.ts", content: "" }] });
    expect(item).not.toBeNull();
    expect(item?.dependencies).toEqual({ npm: [], registry: [] });
  });

  it("falls back to the name when title is missing", () => {
    const item = asRegistryItem({
      name: "cx",
      files: [{ path: "cx.ts", content: "" }],
    });
    expect(item?.title).toBe("cx");
  });

  it("keeps a docs note when present", () => {
    const item = asRegistryItem({ ...validPayload, docs: "Import tokens.css." });
    expect(item?.docs).toBe("Import tokens.css.");
  });

  it("rejects null, non-objects, and arrays of junk", () => {
    expect(asRegistryItem(null)).toBeNull();
    expect(asRegistryItem("button")).toBeNull();
    expect(asRegistryItem(42)).toBeNull();
  });

  it("rejects a payload without a name", () => {
    expect(asRegistryItem({ ...validPayload, name: undefined })).toBeNull();
    expect(asRegistryItem({ ...validPayload, name: "" })).toBeNull();
  });

  it("rejects a payload with empty or malformed files", () => {
    expect(asRegistryItem({ ...validPayload, files: [] })).toBeNull();
    expect(asRegistryItem({ ...validPayload, files: "button.tsx" })).toBeNull();
    expect(
      asRegistryItem({ ...validPayload, files: [{ path: "button.tsx" }] }),
    ).toBeNull();
  });
});

describe("registryBase", () => {
  it("defaults to the published registry", () => {
    expect(registryBase()).toBe("https://ui.neelshha.com/r");
  });

  it("prefers NS_REGISTRY over the ns.json base", () => {
    const previous = process.env.NS_REGISTRY;
    try {
      process.env.NS_REGISTRY = "https://example.com/r";
      expect(registryBase({ base: "https://internal.lan/r" })).toBe(
        "https://example.com/r",
      );
    } finally {
      if (previous === undefined) delete process.env.NS_REGISTRY;
      else process.env.NS_REGISTRY = previous;
    }
  });

  it("uses the ns.json base when no env override is set", () => {
    const previous = process.env.NS_REGISTRY;
    delete process.env.NS_REGISTRY;
    try {
      expect(registryBase({ base: "https://internal.lan/r" })).toBe(
        "https://internal.lan/r",
      );
    } finally {
      if (previous !== undefined) process.env.NS_REGISTRY = previous;
    }
  });
});
