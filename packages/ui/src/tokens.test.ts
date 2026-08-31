import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(__dirname, "tokens.css"), "utf8");

/**
 * Every palette token carries both faces with light-dark() in one :root
 * block; color-scheme picks the side. The old duplicated dark blocks (media
 * query + :root.dark values) are gone for good — this contract locks the
 * single-source architecture in.
 */
describe("Token architecture", () => {
  it("declares one color-scheme that follows the OS until forced", () => {
    expect(css).toContain("color-scheme: light dark;");
    // Forced modes only flip color-scheme; they carry no values.
    expect(css).toContain(":root.light {\n    color-scheme: light;\n  }");
    expect(css).toContain(":root.dark {\n    color-scheme: dark;\n  }");
  });

  it("keeps the duplicated dark blocks out", () => {
    expect(css).not.toContain("prefers-color-scheme: dark");
    expect(css).not.toContain("#f5f5f5;\n    --bg: #1a1a1a;");
  });

  it("carries both faces on the palette tokens", () => {
    for (const token of [
      "--text-heading",
      "--bg",
      "--key",
      "--error",
      "--face-line",
      "--bg-overlay",
    ]) {
      expect(css).toMatch(new RegExp(`${token}:\\s*light-dark\\(`));
    }
  });
});
