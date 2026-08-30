import type { Metadata } from "next";
import { ThemeToggle } from "@neelshha/ui";
import { Code } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Theming",
  description: "Tokens, class-based light and dark, and the theme script.",
};

export default function ThemingPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Theming</h1>
        <p>
          CSS variables are the only theme API. Components never read{" "}
          <code>prefers-color-scheme</code> themselves.
        </p>
      </header>

      <div className="docBlock">
        <h2>How the class works</h2>
        <p>
          Light tokens live on <code>:root</code>. System dark applies when the
          OS is dark and <code>&lt;html&gt;</code> is not <code>.light</code>.
          Force a mode with <code>.dark</code> or <code>.light</code> on{" "}
          <code>&lt;html&gt;</code>. Dark and light override type, surface,
          key ink, shine, and the two light knobs. Chrome is derived from those.
        </p>
      </div>

      <div className="docBlock">
        <h2>No flash</h2>
        <p>
          <code>THEME_SCRIPT</code> reads <code>localStorage</code> (
          <code>ns-theme</code>: <code>light</code>, <code>dark</code>, or{" "}
          <code>system</code>) and sets the class before paint. In Next, inject
          it with <code>next/script</code> and{" "}
          <code>strategy=&quot;beforeInteractive&quot;</code>.{" "}
          <code>ThemeProvider</code> keeps it in sync.{" "}
          <code>ThemeToggle</code> flips light and dark. Until you touch it,
          the page follows the system. It lives here, not in the catalog.
        </p>
        <Code>{`npx @neelshha/ui@latest add theme-toggle`}</Code>
      </div>

      <Example
        title="Theme toggle"
        description="The same key as the header. Light and dark only — it does not restore system."
        code={`import { ThemeToggle } from "@/components/ui/theme-toggle";

<ThemeToggle />`}
      >
        <ThemeToggle />
      </Example>

      <div className="docBlock">
        <h2>Tokens</h2>
        <p>One set. Override a primitive; the chrome follows.</p>
        <Code>{`/* ink */
--text-heading
--text-body
--text-sub
--text-disabled
--link

/* type */
--font-sans
--font-mono

/* surface */
--bg
--bg-hover
--bg-well
--bg-overlay

/* key */
--ink
--on-ink
--shine

/* intent */
--error
--on-error
--success
--on-success
--warning
--on-warning
--info
--on-info
--line
--focus

/* stack */
--z-base         /* 0 */
--z-nav          /* 10 */
--z-overlay      /* 20 */
--z-toast        /* 30 */
--bp-md          /* 48rem — media queries cannot use var() */

/* scale — every step is × --ratio */
--ratio          /* 1.25 */
--type-xs
--type-sm
--type-md        /* 1rem */
--type-lg
--type-xl
--type-2xl       /* page titles */
--control        /* button / navbar height */
--space          /* 0.25rem */
--space-1 … --space-14
--leading-tight  /* --ratio */
--leading        /* --ratio² */
--weight-regular
--weight-medium
--radius         /* --space-3 */

/* light */
--highlight
--shade

/* chrome — derived */
--tool
--lift
--raise
--flat
--well
--press
--face
--face-press
--key-face
--key-face-hover
--key-face-press

/* motion */
--ease
--duration       /* 0ms when prefers-reduced-motion */`}</Code>
        <p>
          Type and space share <code>--ratio</code>. Change that one number and
          the ladder stays even. <code>--raise</code> is the bevel plus the
          drop. <code>--well</code> inverts it. <code>--press</code> is the sunk
          key. <code>--face</code> is the paper light. Unlayered rules win over
          the token layer.
        </p>
      </div>

      <div className="docBlock">
        <h2>Where chrome lives</h2>
        <p>
          The page is paper. Cards, badges, alerts, outline buttons, and the
          navbar rail are hairlines on <code>--bg</code>. <code>--raise</code>{" "}
          is for the solid key and the dialog. Fields use <code>--well</code>.
          Press stamps a key in. Ghost hover is a wash, not a plate.
        </p>
      </div>

      <div className="docBlock">
        <h2>Density</h2>
        <p>
          Set <code>data-density=&quot;compact&quot;</code> on{" "}
          <code>&lt;html&gt;</code> or a region. It shrinks{" "}
          <code>--control</code> and Field insets. Comfortable is the default.
        </p>
        <Code>{`<div data-density="compact">
  <Button>Save</Button>
</div>`}</Code>
      </div>

      <div className="docBlock">
        <h2>Focus and chrome</h2>
        <p>
          Focus is ink at 70% (<code>--focus</code>). Solid buttons and dialogs
          use <code>--raise</code>. Fields use <code>--well</code>. Press swaps
          to <code>--press</code> and travels 2px with the label. No scale.
          Reduced motion turns the travel off.
        </p>
      </div>
    </article>
  );
}
