import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { writeConfig } from "../config.js";
import {
  defaultComponentPath,
  defaultUiAlias,
  detectFramework,
} from "../detect.js";
import { loadItem } from "../registry.js";
import { prepareFile } from "../prepare.js";
import type { NsConfig } from "../types.js";

export async function init(cwd: string, flags: { path?: string }) {
  const framework = detectFramework(cwd);
  const path = flags.path ?? defaultComponentPath(cwd);
  const config: NsConfig = {
    path,
    aliases: { ui: defaultUiAlias(path) },
  };

  writeConfig(cwd, config);

  const tokens = await loadItem("tokens");
  const destDir = join(cwd, path);
  mkdirSync(destDir, { recursive: true });

  for (const file of tokens.files) {
    const dest = join(destDir, file.path);
    if (existsSync(dest)) continue;
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, prepareFile(file.path, file.content, []));
  }

  const importPath = `${config.aliases.ui}/tokens.css`;
  console.log(`Detected ${framework}. Wrote ns.json.`);
  console.log(`Tokens: ${path}/tokens.css`);
  console.log(`Import tokens in your global CSS:\n  @import "${importPath}";`);
  console.log(`Then add a component:\n  npx @neelshha/ui add field`);
}
