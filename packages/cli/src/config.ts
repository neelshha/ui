import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { NsConfig } from "./types.js";

export const CONFIG_NAME = "ns.json";

export function configPath(cwd: string) {
  return join(cwd, CONFIG_NAME);
}

export function readConfig(cwd: string): NsConfig | null {
  const file = configPath(cwd);
  if (!existsSync(file)) return null;
  const parsed = JSON.parse(readFileSync(file, "utf8")) as Partial<NsConfig>;
  if (!parsed.path || !parsed.aliases?.ui) {
    throw new Error(`${CONFIG_NAME} is missing path or aliases.ui. Run init.`);
  }
  return {
    path: parsed.path,
    aliases: { ui: parsed.aliases.ui },
  };
}

export function writeConfig(cwd: string, config: NsConfig) {
  writeFileSync(configPath(cwd), `${JSON.stringify(config, null, 2)}\n`);
}
