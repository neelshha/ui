import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { writeConfig } from "../config.js";
import {
  defaultComponentPath,
  defaultUiAlias,
  detectFramework,
  hasAtAlias,
  tokensImportHint,
} from "../detect.js";
import { loadItem } from "../registry.js";
import { prepareFile } from "../prepare.js";
import type { NsConfig } from "../types.js";

const FOUNDATION = ["tokens", "cx", "theme"] as const;

export async function init(
  cwd: string,
  flags: { path?: string; latest?: boolean },
) {
  const framework = detectFramework(cwd);
  const path = flags.path ?? defaultComponentPath(cwd);
  const alias = hasAtAlias(cwd);
  const config: NsConfig = {
    path,
    aliases: { ui: defaultUiAlias(path, alias) },
  };

  writeConfig(cwd, config);

  const destDir = join(cwd, path);
  mkdirSync(destDir, { recursive: true });

  for (const name of FOUNDATION) {
    const item = await loadItem(name, {
      ...(flags.latest ? { latest: true } : {}),
    });
    for (const file of item.files) {
      const dest = join(destDir, file.path);
      if (existsSync(dest)) continue;
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, prepareFile(file.path, file.content, []));
    }
  }

  const hint = tokensImportHint(path, alias);
  console.log(`Detected ${framework}. Wrote ns.json.`);
  console.log(`Tokens: ${path}/tokens.css`);
  console.log(`cx: ${path}/cx.ts`);
  console.log(`Theme: ${path}/theme.tsx`);
  if (alias) {
    console.log(`Import tokens in your global CSS:\n  ${hint.line}`);
  } else {
    console.log(`No @/ alias found. Import tokens relative to your CSS file:`);
    console.log(`  ${hint.line}`);
    if (hint.note) console.log(hint.note);
  }
  console.log(
    `Inject THEME_SCRIPT with next/script (beforeInteractive) or ThemeScript in Vite. suppressHydrationWarning on <html>. Wrap the tree in ThemeProvider.`,
  );
  console.log(`Then add a component:\n  npx @neelshha/ui add field`);
}
