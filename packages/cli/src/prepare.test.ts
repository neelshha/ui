import { describe, expect, it } from "vitest";
import { prepareFile } from "./prepare.js";

describe("prepareFile", () => {
  it("does not duplicate a CSS import already in source", () => {
    const source = `import "./button.css";\n\nexport function Button() {}\n`;
    expect(prepareFile("button.tsx", source, ["button.css"])).toBe(source);
  });

  it("injects a missing sibling CSS import", () => {
    const next = prepareFile("field.tsx", `export function Field() {}\n`, [
      "field.css",
    ]);
    expect(next.startsWith(`import "./field.css";`)).toBe(true);
  });

  it("does not treat a hook mentioned in a comment as client code", () => {
    const source = `// The parent owns the useState here.\nexport function Label() {}\n`;
    expect(prepareFile("label.tsx", source, [])).toBe(source);
  });

  it("does not treat a hook named in a block comment as client code", () => {
    const source = `/*\n * Wraps useEffect-driven popovers.\n */\nexport function Popover() {}\n`;
    expect(prepareFile("popover.tsx", source, [])).toBe(source);
  });

  it("still injects 'use client' for a real hook call", () => {
    const next = prepareFile(
      "toast.tsx",
      `import { useState } from "react";\n\nexport function Toast() {\n  const [open, setOpen] = useState(false);\n}\n`,
      [],
    );
    expect(next.startsWith(`"use client";`)).toBe(true);
  });
});
