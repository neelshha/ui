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
});
