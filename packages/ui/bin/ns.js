#!/usr/bin/env node
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const args = process.argv.slice(2);

try {
  const require = createRequire(import.meta.url);
  require.resolve("@neelshha/cli");
  await import("@neelshha/cli");
} catch {
  const child = spawn(
    "npx",
    ["--yes", "@neelshha/cli@0.1.0", ...args],
    { stdio: "inherit", shell: process.platform === "win32" },
  );
  child.on("exit", (code) => {
    process.exit(code ?? 1);
  });
}
