# @neelshha/ui

Interface components. Docs: [ui.neelshha.com/docs](https://ui.neelshha.com/docs). Field essay: [neelshha.com/experiments/field](https://www.neelshha.com/experiments/field).

## CLI (the default)

Copy source into a React or Next app. The files land in your repo so you own them.

```bash
npx @neelshha/ui@latest init
npx @neelshha/ui@latest add field
```

`init` writes `ns.json`, `tokens.css`, `cx.ts`, `theme.tsx`, and `theme-provider.tsx`. `add` copies the component and its registry dependencies. Tokens, theme, and `cx` are not overwritten unless you pass `--overwrite-foundation`. Component CSS is imported from the TSX.

If the project has no `@/` alias, init prints a path relative to a CSS file in `src/` instead of inventing one.

From this repo, before the packages are on npm:

```bash
npm run build:cli
npm run ns -- init
npm run ns -- add field
```

Publish the CLI first, then the UI package. Requires `npm login` and the `@neelshha` org:

```bash
npm publish -w @neelshha/cli
npm publish -w @neelshha/ui
```

`npx @neelshha/ui` is a thin bin. It runs `@neelshha/cli` when that package is installed, otherwise it npx's it. Installing `@neelshha/ui` as a library does not pull the CLI.

This repo is the site. Attach `ui.neelshha.com` to the Vercel project and CNAME the subdomain to Vercel.

## Theme

Import tokens once. Inject `THEME_SCRIPT` before paint so the first frame is not wrong. Wrap the tree in `ThemeProvider`. Add `suppressHydrationWarning` on `<html>`.

Next.js 16 will not execute a `<script>` rendered from a React component. Use `next/script`:

```tsx
import Script from "next/script";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { THEME_SCRIPT } from "@/components/ui/theme";

<html lang="en" suppressHydrationWarning>
  <body>
    <Script id="ns-theme" strategy="beforeInteractive">
      {THEME_SCRIPT}
    </Script>
    <ThemeProvider>{children}</ThemeProvider>
  </body>
</html>
```

Tokens follow the system palette unless `<html>` has `.light` or `.dark`. `ThemeToggle` flips light and dark. Until you touch it, the page follows the system.

In Vite or a plain React app, put `ThemeScript` first in the root, or paste `THEME_SCRIPT` into `index.html`.

## Appendix: package import

```tsx
import { TextField, TextArea, Button } from "@neelshha/ui";
import "@neelshha/ui/tokens.css";

<TextField label="Email" type="email" name="email" />
```

Or a single file: `import { Button } from "@neelshha/ui/button"`. Next should set `transpilePackages: ["@neelshha/ui"]`. Vite needs to transpile the TypeScript. `react` and `react-dom` are peer dependencies (`^18` or `^19`).
