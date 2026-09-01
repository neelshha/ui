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
          Every palette token carries both faces with{" "}
          <code>light-dark()</code> — the light and dark values sit side by
          side in one <code>:root</code> block, and the element&apos;s{" "}
          <code>color-scheme</code> picks the side. <code>:root</code> declares{" "}
          <code>light dark</code>, so the page follows the OS until you force a
          mode with <code>.dark</code> or <code>.light</code> on{" "}
          <code>&lt;html&gt;</code>. There is no second copy of the dark palette
          to keep in sync.
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
        <Code title="Terminal" language="bash">{`npx @neelshha/ui@latest add theme-toggle`}</Code>
      </div>

      <Example
        title="Theme toggle"
        description="A solid key with a sun or moon glyph. Light and dark only — it does not restore system."
        code={`import { ThemeToggle } from "@/components/ui/theme-toggle";

<ThemeToggle icon />`}
      >
        <ThemeToggle icon />
      </Example>

      <Example
        title="Alternate key"
        description={
          <>
            The same action on an outline key — the quieter chrome this site
            header uses. Pass <code>variant</code> to pick any Button chrome.
          </>
        }
        code={`<ThemeToggle icon variant="outline" />`}
      >
        <ThemeToggle icon variant="outline" />
      </Example>

      <div className="docBlock">
        <h2>Tokens</h2>
        <p>One set. Override a primitive; the chrome follows.</p>
        <Code title="tokens.css" language="css">{`/* ink */
--text-heading
--text-body
--text-sub
--text-disabled
--link

/* type */
--font-sans      /* Onest */
--font-mono      /* DM Mono */

/* surface */
--bg
--bg-hover
--bg-well
--bg-overlay     /* scrim under drawers and dialogs */

/* key */
--ink
--on-ink
--key            /* sky candy */
--key-line
--on-key         /* #111 on the candy */
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
--accent-surface
--accent-line
--success-surface
--success-line
--warning-surface
--warning-line
--error-surface
--error-line
--info-surface
--info-line
--line
--line-strong
--focus
--selection

/* stack */
--z-base         /* 0 */
--z-nav          /* 10 */
--z-overlay      /* 20 */
--z-toast        /* 30 */
--bp-md          /* 48rem — media queries cannot use var() */

/* scale — shadcn's type and space steps */
--type-xs        /* 0.75rem */
--type-sm        /* 0.875rem — control text */
--type-md        /* 1rem — Onest */
--type-lg        /* 1.125rem */
--type-xl        /* 1.25rem */
--type-2xl       /* 1.5rem — page titles */
--type-mono      /* 0.875rem — DM Mono */
--type-mono-sm   /* 0.75rem */
--control        /* 2.25rem — button / navbar height */
--control-sm     /* 2rem — compact bar key */
--space          /* 0.25rem */
--space-1 … --space-14  /* N × 0.25rem, linear */
--leading-tight  /* 1.25 / 0.875 */
--leading        /* 1.5 */
--weight-regular
--weight-medium
--radius         /* 0.625rem */
--inset-list     /* --space-1, pad around a list row */
--radius-list    /* --radius + --inset-list */

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
--face-line
--face-hover
--face-press
--float
--float-press
--key-face
--key-face-hover
--key-face-press

/* motion */
--ease
--duration       /* 0ms when prefers-reduced-motion */`}</Code>
        <p>
          Type and space use shadcn&apos;s steps — the Tailwind text sizes and
          the linear <code>N × 0.25rem</code> space ladder — under the same
          <code>--type-*</code> and <code>--space-*</code> names. Fonts stay
          yours. <code>--well</code> is the recessed field.
          <code>--face</code> is the silver candy. <code>--focus</code> is the
          ink ring. Unlayered rules win over the token layer.
        </p>
      </div>

      <div className="docBlock">
        <h2>Where chrome lives</h2>
        <p>
          The page follows the active color scheme. Solid keys use the sky candy face and{" "}
          <code>--float</code>. Outline keys — buttons, accordion, card,
          alert, dialog, menu, popover, toast, tooltip, badge, avatar — use
          the silver face, <code>--face-line</code>, and <code>--float</code>.
          Docs example stages wear the outline key&apos;s chrome —{" "}
          <code>--face</code>, <code>--face-line</code>, and{" "}
          <code>--float</code> — the same silver key the code block below is.
          Fields use{" "}
          <code>--well</code>. Progress fill is <code>--key</code>.
          Inline <code>code</code> is a wash; a <code>pre</code> block is a
          hairline plate. Press uses the press face and{" "}
          <code>--float-press</code>, then travels 2px. Ghost hover is a wash,
          not a plate.
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
          Focus is a 2px ink ring at 70% (<code>--focus</code>). Solid and outline keys
          press to their press face and <code>--float-press</code>, then travel
          2px. Ghost press is the hover wash. Fields use <code>--well</code>.
          No scale. Reduced motion turns the travel off.
        </p>
      </div>
    </article>
  );
}
