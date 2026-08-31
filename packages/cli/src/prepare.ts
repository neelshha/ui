const HOOKS =
  /\buse(State|Effect|Memo|Callback|Ref|Context|Reducer|LayoutEffect|ImperativeHandle|SyncExternalStore|Transition|DeferredValue|ActionState|Optimistic|FormState|SearchParams|Pathname|Router)\b/;

const USE_CLIENT = /^["']use client["']\s*;?/m;

function cssImportLine(cssName: string) {
  return `import "./${cssName}";`;
}

export function prepareFile(
  path: string,
  content: string,
  siblingCss: string[],
): string {
  let next = content.replace(/\r\n/g, "\n");

  if (path.endsWith(".tsx") || path.endsWith(".jsx") || path.endsWith(".ts")) {
    if (HOOKS.test(next) && !USE_CLIENT.test(next)) {
      next = `"use client";\n\n${next}`;
    }

    for (const css of siblingCss) {
      const line = cssImportLine(css);
      if (!next.includes(line) && !next.includes(`from "./${css}"`)) {
        next = insertImport(next, line);
      }
    }
  }

  return next.endsWith("\n") ? next : `${next}\n`;
}

function insertImport(source: string, line: string) {
  const client = source.match(/^(["']use client["']\s*;?\s*\n+)/);
  if (client?.[0]) {
    const rest = source.slice(client[0].length);
    return `${client[0]}${line}\n\n${rest.replace(/^\n+/, "")}`;
  }
  return `${line}\n\n${source}`;
}
