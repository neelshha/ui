import { describe, expect, it } from "vitest";
import {
  inferAtAlias,
  tokensImportHint,
  uiImportPrefix,
} from "./detect";

describe("alias detection", () => {
  it("sees a tsconfig @/* path", () => {
    expect(inferAtAlias(['{ "paths": { "@/*": ["./src/*"] } }'])).toBe(true);
  });

  it("sees a Vite @ alias", () => {
    expect(inferAtAlias(["alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }"])).toBe(
      true,
    );
  });

  it("does not invent an alias", () => {
    expect(inferAtAlias(["export default defineConfig({})"])).toBe(false);
  });

  it("prints @/ when the alias exists", () => {
    expect(uiImportPrefix("src/components/ui", true)).toBe("@/components/ui");
    expect(tokensImportHint("src/components/ui", true).line).toBe(
      '@import "@/components/ui/tokens.css";',
    );
  });

  it("prints a path relative to src when @/ is missing", () => {
    expect(uiImportPrefix("src/components/ui", false)).toBe(
      "./src/components/ui",
    );
    const hint = tokensImportHint("src/components/ui", false);
    expect(hint.line).toBe('@import "./components/ui/tokens.css";');
    expect(hint.note).toBeTruthy();
  });
});
