import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const uiRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(uiRoot, "../..");

/** @typedef {{ name: string, title: string, files: string[], docs?: string, dependencies: { npm: string[], registry: string[] } }} ManifestItem */

/** @type {{ items: ManifestItem[] }} */
const manifest = JSON.parse(
  readFileSync(join(uiRoot, "registry/manifest.json"), "utf8"),
);

/** Every problem here would otherwise surface as a broken install for a
    user of the registry, so the build fails loudly instead of shipping it. */
function validate(manifest, uiRoot) {
  const problems = [];
  const byName = new Map();

  for (const def of manifest.items) {
    if (byName.has(def.name)) {
      problems.push(`duplicate item name "${def.name}"`);
    }
    byName.set(def.name, def);
  }

  for (const def of manifest.items) {
    for (const file of def.files) {
      if (!existsSync(join(uiRoot, file))) {
        problems.push(`${def.name}: file not found: ${file}`);
      }
    }
    for (const dep of def.dependencies.registry) {
      if (!byName.has(dep)) {
        problems.push(
          `${def.name}: registry dependency "${dep}" is not in the manifest`,
        );
      }
    }
  }

  // A dependency cycle would still resolve (resolveItems dedupes by name),
  // but it is always a manifest mistake — fail the build instead.
  const VISITING = 1;
  const DONE = 2;
  const state = new Map();
  const visit = (name, stack) => {
    const current = state.get(name);
    if (current === DONE) return;
    if (current === VISITING) {
      problems.push(`registry dependency cycle: ${[...stack, name].join(" -> ")}`);
      return;
    }
    state.set(name, VISITING);
    for (const dep of byName.get(name)?.dependencies.registry ?? []) {
      if (byName.has(dep)) visit(dep, [...stack, name]);
    }
    state.set(name, DONE);
  };
  for (const def of manifest.items) visit(def.name, []);

  return problems;
}

function toItem(def) {
  return {
    name: def.name,
    title: def.title,
    files: def.files.map((file) => ({
      path: file.replace(/^src\//, ""),
      content: readFileSync(join(uiRoot, file), "utf8"),
    })),
    // Items with CSS need the tokens note on install; pure-TSX items do not.
    ...(def.docs ??
    def.files.some((file) => file.endsWith(".css"))
      ? {
          docs:
            def.docs ??
            "CSS is imported from the TSX. Import tokens.css once if you have not already.",
        }
      : {}),
    dependencies: def.dependencies,
  };
}

const problems = validate(manifest, uiRoot);
if (problems.length > 0) {
  console.error("Invalid registry manifest:");
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

const items = manifest.items.map(toItem);
const index = {
  items: items.map(({ name, title }) => ({ name, title })),
};

const targets = [
  join(repoRoot, "packages/cli/bundled"),
  join(repoRoot, "public/r"),
];

for (const dir of targets) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.json"), `${JSON.stringify(index, null, 2)}\n`);
  for (const item of items) {
    writeFileSync(
      join(dir, `${item.name}.json`),
      `${JSON.stringify(item, null, 2)}\n`,
    );
  }
}

console.log(
  `Wrote ${items.length} registry items to ${targets
    .map((dir) => dir.slice(repoRoot.length + 1))
    .join(" and ")}`,
);
