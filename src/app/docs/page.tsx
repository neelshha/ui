import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introduction",
  description: "A small component library you copy into your app.",
};

export default function DocsPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Introduction</h1>
        <p>
          A set of interface components you copy into a React or Next app. A
          CLI writes the files. After that, they are yours.
        </p>
      </header>

      <div className="docBlock">
        <h2>What this is</h2>
        <p>
          A CLI and a registry. <code>init</code> writes tokens, <code>cx</code>,
          and a theme script. <code>add</code> writes a component and its CSS
          into your repo. That is the product.
        </p>
      </div>

      <div className="docBlock">
        <h2>What this is not</h2>
        <p>
          Not Tailwind. Not Radix. Not shadcn. Components are native HTML, styled
          with CSS variables. Pages are paper. Chrome is skeuomorphic and rare:
          raised keys, recessed wells, ink on focus.
        </p>
      </div>

      <div className="docBlock">
        <h2>Works with</h2>
        <p>
          React 18 or 19. Next App Router or Pages. Vite. The CLI detects the
          framework and writes files where your app already keeps components.
          Presentational pieces are server components. Theme toggle, Dialog,
          Tabs, Menu, Toast, and Avatar are the exceptions — they have to run
          in the browser.
        </p>
      </div>
    </article>
  );
}
