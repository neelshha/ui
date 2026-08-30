import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

type ManifestItem = {
  name: string;
  title: string;
  files: string[];
  dependencies: { npm: string[]; registry: string[] };
};

type Manifest = { items: ManifestItem[] };

function uiRoot() {
  const candidates = [
    join(process.cwd(), "packages/ui"),
    join(process.cwd(), "../../packages/ui"),
  ];
  const found = candidates.find((dir) =>
    existsSync(join(dir, "registry/manifest.json")),
  );
  if (!found) throw new Error("Could not find packages/ui.");
  return found;
}

function manifest(): Manifest {
  return JSON.parse(
    readFileSync(join(uiRoot(), "registry/manifest.json"), "utf8"),
  ) as Manifest;
}

export function registryIndex() {
  return {
    items: manifest().items.map(({ name, title }) => ({ name, title })),
  };
}

export function registryItem(name: string) {
  const item = manifest().items.find((entry) => entry.name === name);
  if (!item) return null;
  return {
    name: item.name,
    title: item.title,
    files: item.files.map((file) => ({
      path: file.replace(/^src\//, ""),
      content: readFileSync(join(uiRoot(), file), "utf8"),
    })),
    dependencies: item.dependencies,
  };
}

export function registryNames() {
  return ["index", ...manifest().items.map((item) => item.name)];
}
