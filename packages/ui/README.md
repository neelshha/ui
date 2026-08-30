# @neelshha/ui

Interface components. Docs: [ui.neelshha.com](https://ui.neelshha.com). Field essay: [neelshha.com/experiments/field](https://www.neelshha.com/experiments/field).

## CLI (copy source into your app)

Works in React and Next. Files land in your repo so you own them.

```bash
npx @neelshha/ui@latest init
npx @neelshha/ui@latest add field
```

`init` writes `ns.json` and `tokens.css`. `add field` writes `field.tsx` and `field.css`.

From this repo, before the packages are on npm:

```bash
npm run build:cli
npm run ns -- init
npm run ns -- add field
```

Publish (cli first, then ui). Requires `npm login` and the `@neelshha` org:

```bash
npm publish -w @neelshha/cli
npm publish -w @neelshha/ui
```

This repo is the site. Attach `ui.neelshha.com` to the Vercel project and CNAME the subdomain to Vercel.

## Package import

```tsx
import { TextField, TextArea } from "@neelshha/ui";
import "@neelshha/ui/styles.css";

<TextField label="Email" type="email" name="email" />

<TextArea label="Notes" name="notes" optional />
```

`react` and `react-dom` are peer dependencies (`^18` or `^19`). Styles use the `--text-*` / `--bg` / `--radius` / `--leading` tokens when present, and fall back to light/dark defaults.
