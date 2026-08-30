#!/usr/bin/env node
import { parseArgs } from "node:util";
import { add } from "./commands/add.js";
import { init } from "./commands/init.js";
import { list } from "./commands/list.js";

const HELP = `ns — install @neelshha/ui components into a React or Next app

Usage:
  npx @neelshha/ui init [--path src/components/ui]
  npx @neelshha/ui add <name...>
  npx @neelshha/ui list
`;

async function main() {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    options: {
      path: { type: "string" },
      help: { type: "boolean", short: "h" },
    },
  });

  if (values.help || positionals.length === 0) {
    console.log(HELP);
    process.exit(values.help ? 0 : 1);
  }

  const [command, ...rest] = positionals;
  const cwd = process.cwd();

  switch (command) {
    case "init":
      await init(cwd, { ...(values.path ? { path: values.path } : {}) });
      break;
    case "add":
      await add(cwd, rest);
      break;
    case "list":
      await list();
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
