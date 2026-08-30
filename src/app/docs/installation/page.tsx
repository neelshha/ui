import type { Metadata } from "next";
import { Code } from "@/components/Code";

export const metadata: Metadata = {
  title: "Installation",
  description: "Copy the components into a React or Next app.",
};

export default function InstallationPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Installation</h1>
        <p>
          Initialize the theme, then add a component. The files land in your
          repo. That is the default.
        </p>
      </header>

      <div className="docBlock">
        <h2>CLI</h2>
        <Code>{`npx @neelshha/ui@latest init
npx @neelshha/ui@latest add field`}</Code>
        <p>
          <code>init</code> writes <code>ns.json</code>, <code>tokens.css</code>,{" "}
          <code>cx.ts</code>, <code>theme.tsx</code>, and{" "}
          <code>theme-provider.tsx</code>. It looks for Next or Vite and picks{" "}
          <code>src/components/ui</code> when <code>src</code> exists.
        </p>
      </div>

      <div className="docBlock">
        <h2>Import tokens</h2>
        <p>
          Once, in your global CSS. If the project has a <code>@/</code> alias
          (Next usually does), init prints that path:
        </p>
        <Code>{`@import "@/components/ui/tokens.css";`}</Code>
        <p>
          Vite often has no <code>@/</code>. Init will say so and print a path
          relative to a CSS file in <code>src/</code>:
        </p>
        <Code>{`@import "./components/ui/tokens.css";`}</Code>
        <p>
          Component CSS is imported from the TSX. You do not import{" "}
          <code>button.css</code> yourself.
        </p>
      </div>

      <div className="docBlock">
        <h2>Next.js</h2>
        <p>
          Inject <code>THEME_SCRIPT</code> with <code>next/script</code> before
          the page is interactive so the first paint is not wrong. Do not render
          a raw <code>&lt;script&gt;</code> from a React component — Next 16
          will refuse it. Wrap the tree in <code>ThemeProvider</code>. Add{" "}
          <code>suppressHydrationWarning</code> on <code>&lt;html&gt;</code>.
        </p>
        <Code>{`import Script from "next/script";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { THEME_SCRIPT } from "@/components/ui/theme";

<html lang="en" suppressHydrationWarning>
  <body>
    <Script id="ns-theme" strategy="beforeInteractive">
      {THEME_SCRIPT}
    </Script>
    <ThemeProvider>{children}</ThemeProvider>
  </body>
</html>`}</Code>
      </div>

      <div className="docBlock">
        <h2>Vite or React</h2>
        <p>
          Same provider. Put <code>ThemeScript</code> first in the root, or paste
          the script into <code>index.html</code>. If <code>@/</code> is missing,
          import the copied files with a relative path.
        </p>
      </div>

      <div className="docBlock">
        <h2>Appendix: package import</h2>
        <p>
          This repo also publishes <code>@neelshha/ui</code> if you want the
          package instead of copied source. Import tokens once. Component CSS
          arrives with the module. Vite and webpack need to transpile the
          TypeScript, or import a single file:
        </p>
        <Code>{`import { TextField, Button } from "@neelshha/ui";
import "@neelshha/ui/tokens.css";

// or
import { Button } from "@neelshha/ui/button";`}</Code>
        <p>
          <code>styles.css</code> is an optional barrel if you want every
          component&apos;s CSS without importing the modules.
        </p>
      </div>
    </article>
  );
}
