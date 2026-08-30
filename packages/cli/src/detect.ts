import { existsSync } from "node:fs";
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

export function defaultUiAlias(path: string): string {
  if (path.startsWith("src/")) return `@/${path.slice("src/".length)}`;
  return `@/${path}`;
}
