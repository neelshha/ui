import type { Metadata } from "next";
import { Code } from "@/components/Code";

export const metadata: Metadata = {
  title: "CLI",
  description: "init, add, and list.",
};

export default function CliPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>CLI</h1>
        <p>
          <code>npx @neelshha/ui</code> copies source into a React or Next app.
        </p>
      </header>

      <div className="docBlock">
        <h2>init</h2>
        <Code title="Terminal" language="bash">{`npx @neelshha/ui init
npx @neelshha/ui init --path src/components/ui`}</Code>
        <p>
          Writes <code>ns.json</code>, tokens, <code>cx.ts</code>, and the theme
          module. Skips files that already exist. If the project has no{" "}
          <code>@/</code> alias, the token import hint is a path relative to{" "}
          <code>src/</code> — not a fake alias.
        </p>
      </div>

      <div className="docBlock">
        <h2>add</h2>
        <Code title="Terminal" language="bash">{`npx @neelshha/ui add field
npx @neelshha/ui add button card
npx @neelshha/ui add button --diff --dry-run`}</Code>
        <p>
          Resolves registry dependencies. <code>add theme-toggle</code> also
          writes theme and button. Tokens, theme, and <code>cx</code> are skipped
          if they already exist unless you pass{" "}
          <code>--overwrite-foundation</code>. Presentational files are
          overwritten so you can pull updates. <code>--diff</code> prints the
          line changes. <code>--dry-run</code> writes nothing. The CLI uses the
          bundled registry; <code>--latest</code> or <code>NS_REGISTRY</code>{" "}
          fetches remote. Component CSS is imported from the TSX; add does not
          ask you to import a CSS file.
        </p>
      </div>

      <div className="docBlock">
        <h2>list</h2>
        <Code title="Terminal" language="bash">{`npx @neelshha/ui list`}</Code>
        <p>Prints the registry. The live index is at /r/index.json.</p>
      </div>

      <div className="docBlock">
        <h2>From this repo</h2>
        <Code title="Terminal" language="bash">{`npm run build:cli
npm run ns -- init
npm run ns -- add field`}</Code>
      </div>
    </article>
  );
}
