import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { readConfig } from "../config.js";
import { prepareFile } from "../prepare.js";
import { loadItem } from "../registry.js";

export async function add(cwd: string, names: string[]) {
  if (names.length === 0) {
    throw new Error("Name a component to add. Try: npx @neelshha/ui add field");
  }

  const config = readConfig(cwd);
  if (!config) {
    throw new Error("No ns.json here. Run: npx @neelshha/ui init");
  }

  const destDir = join(cwd, config.path);

  for (const name of names) {
    const item = await loadItem(name);
    const cssFiles = item.files
      .filter((file) => file.path.endsWith(".css"))
      .map((file) => file.path);

    for (const file of item.files) {
      const dest = join(destDir, file.path);
      mkdirSync(dirname(dest), { recursive: true });
      const siblingCss = file.path.endsWith(".tsx")
        ? cssFiles.filter((css) => css !== file.path)
        : [];
      writeFileSync(dest, prepareFile(file.path, file.content, siblingCss));
      console.log(`Wrote ${config.path}/${file.path}`);
    }

    const css = cssFiles[0];
    if (css) {
      console.log(
        `Import styles once:\n  import "${config.aliases.ui}/${css}";`,
      );
    }
  }
}
