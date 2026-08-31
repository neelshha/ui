import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Framework } from "./types.js";

const NEXT_CONFIGS = [
  "next.config.ts",
  "next.config.js",
  "next.config.mjs",
  "next.config.cjs",
];

const VITE_CONFIGS = [
  "vite.config.ts",
  "vite.config.js",
  "vite.config.mjs",
  "vite.config.cjs",
];

const ALIAS_SOURCES = [
  "tsconfig.json",
  "tsconfig.app.json",
  "jsconfig.json",
  ...VITE_CONFIGS,
];

function hasAny(cwd: string, names: string[]) {
  return names.some((name) => existsSync(join(cwd, name)));
}

export function detectFramework(cwd: string): Framework {
  if (hasAny(cwd, NEXT_CONFIGS)) return "next";
  if (hasAny(cwd, VITE_CONFIGS)) return "vite";
  return "react";
}

export function defaultComponentPath(cwd: string): string {
  if (existsSync(join(cwd, "src"))) return "src/components/ui";
  return "components/ui";
}

export function inferAtAlias(sources: string[]): boolean {
  return sources.some(
    (text) => /["']@\/\*["']/.test(text) || /["']@["']\s*:/.test(text),
  );
}

export function hasAtAlias(cwd: string): boolean {
  const sources: string[] = [];
  for (const name of ALIAS_SOURCES) {
    const file = join(cwd, name);
    if (!existsSync(file)) continue;
    sources.push(readFileSync(file, "utf8"));
  }
  return inferAtAlias(sources);
}

export function uiImportPrefix(path: string, hasAlias: boolean): string {
  const clean = path.replace(/^\.\//, "");
  if (hasAlias) {
    return clean.startsWith("src/") ? `@/${clean.slice(4)}` : `@/${clean}`;
  }
  return `./${clean}`;
}

export function tokensImportHint(
  path: string,
  hasAlias: boolean,
): { line: string; fontsLine: string; note?: string } {
  if (hasAlias) {
    const base = uiImportPrefix(path, true);
    return {
      line: `@import "${base}/tokens.css";`,
      fontsLine: `@import "${base}/fonts.css";`,
    };
  }
  const clean = path.replace(/^\.\//, "");
  const base = clean.startsWith("src/")
    ? `./${clean.slice(4)}`
    : `./${clean}`;
  return {
    line: `@import "${base}/tokens.css";`,
    fontsLine: `@import "${base}/fonts.css";`,
    note: "Relative to a CSS file in src/. Adjust if your entry CSS lives elsewhere.",
  };
}

export function defaultUiAlias(path: string, hasAlias = false): string {
  return uiImportPrefix(path, hasAlias);
}
