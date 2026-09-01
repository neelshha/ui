import { readdirSync } from "node:fs";
import { join } from "node:path";
import { readConfig } from "../config.js";
import { detectFramework } from "../detect.js";
import { loadIndex, registryBase } from "../registry.js";

const ITEM_SUFFIXES = [".tsx", ".ts", ".css"];

/** Mirrors `shadcn info`: print the project context an agent (or a human)
    needs before adding components — framework, paths, alias, registry, and
    which registry components are already installed on disk. */
export async function info(cwd: string, flags: { latest?: boolean } = {}) {
  const config = readConfig(cwd);
  if (!config) {
    throw new Error("No ns.json here. Run: npx @neelshha/ui init");
  }

  const loadOptions = {
    ...(flags.latest ? { latest: true } : {}),
    ...(config.registry ? { base: config.registry } : {}),
  };

  console.log(`Framework: ${detectFramework(cwd)}`);
  console.log(`Components: ${config.path}`);
  console.log(`UI alias: ${config.aliases.ui}`);
  const registry = registryBase(
    config.registry ? { base: config.registry } : {},
  );
  const registryNote =
    process.env.NS_REGISTRY !== undefined && process.env.NS_REGISTRY === registry
      ? " (from NS_REGISTRY)"
      : "";
  console.log(`Registry: ${registry}${registryNote}`);

  let installed: string[] = [];
  try {
    const index = await loadIndex(loadOptions);
    const onDisk = new Set(readdirSync(join(cwd, config.path)));
    installed = index.items
      .filter((item) =>
        ITEM_SUFFIXES.some((suffix) => onDisk.has(`${item.name}${suffix}`)),
      )
      .map((item) => item.name);
  } catch {
    console.log("Installed: unknown (registry index unavailable)");
    return;
  }

  console.log(`Installed (${installed.length}):`);
  for (const name of installed) {
    console.log(`  ${name}`);
  }
  if (installed.length === 0) {
    console.log("  none");
  }
  console.log(`Add more:\n  npx @neelshha/ui add <name>`);
}
