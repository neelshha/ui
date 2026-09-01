import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { readConfig } from "../config.js";
import { prepareFile } from "../prepare.js";
import { loadItem, type RegistryLoadOptions } from "../registry.js";
import type { RegistryItem } from "../types.js";

export type AddFlags = {
  dryRun?: boolean;
  diff?: boolean;
  overwriteFoundation?: boolean;
  latest?: boolean;
};

const FOUNDATION_FILES = new Set([
  "tokens.css",
  "theme.tsx",
  "theme-provider.tsx",
  "cx.ts",
]);

export async function add(cwd: string, names: string[], flags: AddFlags = {}) {
  if (names.length === 0) {
    throw new Error("Name a component to add. Try: npx @neelshha/ui add field");
  }

  const config = readConfig(cwd);
  if (!config) {
    throw new Error("No ns.json here. Run: npx @neelshha/ui init");
  }

  const destDir = join(cwd, config.path);
  const loadOptions = {
    ...(flags.latest ? { latest: true } : {}),
    ...(config.registry ? { base: config.registry } : {}),
  };
  const items = await resolveItems(names, loadOptions);

  for (const item of items) {
    const cssFiles = item.files
      .filter((file) => file.path.endsWith(".css"))
      .map((file) => file.path);

    for (const file of item.files) {
      const dest = join(destDir, file.path);
      const siblingCss = file.path.endsWith(".tsx")
        ? cssFiles.filter((css) => css !== file.path)
        : [];
      const next = prepareFile(file.path, file.content, siblingCss);
      const foundation = FOUNDATION_FILES.has(file.path);
      const exists = existsSync(dest);

      if (foundation && exists && !flags.overwriteFoundation) {
        console.log(`Skipped ${config.path}/${file.path}`);
        continue;
      }

      if (exists) {
        const prev = readFileSync(dest, "utf8");
        if (prev === next) {
          console.log(`Unchanged ${config.path}/${file.path}`);
          continue;
        }
        if (flags.diff) {
          console.log(`diff ${config.path}/${file.path}`);
          console.log(lineDiff(prev, next));
        }
        if (flags.dryRun) {
          console.log(`Would update ${config.path}/${file.path}`);
          continue;
        }
        mkdirSync(dirname(dest), { recursive: true });
        writeFileSync(dest, next);
        console.log(`Updated ${config.path}/${file.path}`);
        continue;
      }

      if (flags.dryRun) {
        console.log(`Would write ${config.path}/${file.path}`);
        continue;
      }

      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, next);
      console.log(`Wrote ${config.path}/${file.path}`);
    }

  }

  // The registry schema carries npm dependencies, but the CLI does not run
  // the package manager — surface them so the user isn't left with a broken
  // import after the files are written.
  const npmDeps = [
    ...new Set(items.flatMap((item) => item.dependencies.npm)),
  ];
  if (npmDeps.length > 0) {
    console.log(
      `\nThis component needs npm packages the CLI does not install:\n  npm install ${npmDeps.join(" ")}`,
    );
  }

  // Setup notes come from each registry item's docs field, so an item only
  // prints what it actually needs (CSS items mention tokens.css; pure-TSX
  // items print nothing).
  const notes = [
    ...new Set(
      items.flatMap((item) => (item.docs ? [item.docs] : [])),
    ),
  ];
  for (const note of notes) {
    console.log(`\n${note}`);
  }
}

function lineDiff(before: string, after: string): string {
  const prev = before.split("\n");
  const next = after.split("\n");
  const max = Math.max(prev.length, next.length);
  const lines: string[] = [];
  for (let i = 0; i < max; i += 1) {
    const left = prev[i];
    const right = next[i];
    if (left === right) continue;
    if (left !== undefined) lines.push(`- ${left}`);
    if (right !== undefined) lines.push(`+ ${right}`);
  }
  return lines.join("\n");
}

async function resolveItems(
  names: string[],
  options: RegistryLoadOptions = {},
  seen = new Set<string>(),
): Promise<RegistryItem[]> {
  const items: RegistryItem[] = [];
  for (const name of names) {
    if (seen.has(name)) continue;
    seen.add(name);
    const item = await loadItem(name, options);
    if (item.dependencies.registry.length > 0) {
      items.push(...(await resolveItems(item.dependencies.registry, options, seen)));
    }
    items.push(item);
  }
  return items;
}
