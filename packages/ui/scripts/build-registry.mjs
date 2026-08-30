import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const uiRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(uiRoot, "../..");

/** @typedef {{ name: string, title: string, files: string[], dependencies: { npm: string[], registry: string[] } }} ManifestItem */

/** @type {{ items: ManifestItem[] }} */
const manifest = JSON.parse(
  readFileSync(join(uiRoot, "registry/manifest.json"), "utf8"),
);

function toItem(def) {
  return {
    name: def.name,
    title: def.title,
    files: def.files.map((file) => ({
      path: file.replace(/^src\//, ""),
      content: readFileSync(join(uiRoot, file), "utf8"),
    })),
    dependencies: def.dependencies,
  };
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
