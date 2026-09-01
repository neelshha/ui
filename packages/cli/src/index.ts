#!/usr/bin/env node
import { parseArgs } from "node:util";
import { add } from "./commands/add.js";
import { info } from "./commands/info.js";
import { init } from "./commands/init.js";
import { list } from "./commands/list.js";

const HELP = `ns — install @neelshha/ui components into a React or Next app

Usage:
  npx @neelshha/ui init [--path src/components/ui]
  npx @neelshha/ui add <name...> [--diff] [--dry-run] [--overwrite-foundation]
  npx @neelshha/ui list
  npx @neelshha/ui info

init writes tokens.css, cx.ts, theme.tsx, and theme-provider.tsx.
If the project has no @/ alias, the token import hint is relative to src/.
add resolves registry dependencies (theme-toggle pulls theme and button).
Presentational files are overwritten so you can pull updates. tokens, theme,
and cx are skipped unless --overwrite-foundation. --diff prints a line diff.
--dry-run writes nothing. Component CSS is imported from the TSX.
--latest fetches the live registry instead of the bundled copy. NS_REGISTRY
overrides the registry URL and also prefers remote. init records the registry
URL in ns.json. info prints framework, paths, alias, registry, and installed
components.
`;

async function main() {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    options: {
      path: { type: "string" },
      help: { type: "boolean", short: "h" },
      diff: { type: "boolean" },
      "dry-run": { type: "boolean" },
      "overwrite-foundation": { type: "boolean" },
      latest: { type: "boolean" },
    },
  });

  if (values.help || positionals.length === 0) {
    console.log(HELP);
    process.exit(values.help ? 0 : 1);
  }

  const [command, ...rest] = positionals;
  const cwd = process.cwd();
  const latest = Boolean(values.latest);

  switch (command) {
    case "init":
      await init(cwd, {
        ...(values.path ? { path: values.path } : {}),
        ...(latest ? { latest } : {}),
      });
      break;
    case "add":
      await add(cwd, rest, {
        ...(values.diff ? { diff: true } : {}),
        ...(values["dry-run"] ? { dryRun: true } : {}),
        ...(values["overwrite-foundation"] ? { overwriteFoundation: true } : {}),
        ...(latest ? { latest } : {}),
      });
      break;
    case "list":
      await list({ ...(latest ? { latest } : {}) });
      break;
    case "info":
      await info(cwd, { ...(latest ? { latest } : {}) });
      break;
    default:
      throw new Error(`Unknown command "${command}".\n${HELP}`);
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
