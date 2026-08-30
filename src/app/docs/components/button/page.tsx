import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Button, ButtonGroup } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { ButtonPendingDemo } from "@/components/ButtonPendingDemo";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Button",
  description: "A native button that inherits type.",
};

const rows = [
  {
    name: "variant",
    type: '"solid" | "outline" | "ghost" | "danger" | "link"',
    def: '"solid"',
    notes:
      "Solid is the ink key. Outline is a hairline. Ghost is text until hover. Link is text.",
  },
  {
    name: "icon",
    type: "boolean",
    def: "false",
    notes: "Square key for a lone SVG. Requires aria-label or aria-labelledby.",
  },
  {
    name: "round",
    type: "boolean",
    def: "false",
    notes: "Pill radius.",
  },
  {
    name: "pending",
    type: "boolean",
    def: "false",
    notes: "Shows a spinner and blocks presses. Stays focusable. Sets aria-busy.",
  },
  {
    name: "href",
    type: "string",
    notes:
      "Renders an a. Same chrome. href stays when disabled or pending. No Slot.",
  },
  {
    name: "type",
    type: '"button" | "submit" | "reset"',
    def: '"button"',
    notes: "Defaults to button so it does not submit a form by accident.",
  },
  {
    name: "disabled",
    type: "boolean",
    def: "false",
    notes: "Native disabled on a button. A link keeps href, leaves the tab order, and sets aria-disabled.",
  },
  {
    name: "ButtonGroup",
    type: "div",
    notes: 'Joins keys. role="group". Pass aria-label when the group has no visible name.',
  },
] as const;

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

function Plus() {
  return (
    <Icon>
      <path
        d="M8 3v10M3 8h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Icon>
  );
}

function Check() {
  return (
    <Icon>
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function Trash() {
  return (
    <Icon>
      <path
        d="M3.5 5h9M6 5V3.5h4V5M5 5l.5 8h5L11 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function Arrow() {
  return (
    <Icon>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export default function ButtonPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Button</h1>
        <p>
          A native button. Solid is a raised key. Outline is a hairline. Press
          stamps it in. SVG children size to the type. <code>href</code> makes
          an <code>a</code>.
        </p>
      </header>

      <Example>
        <Button>Save</Button>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="button" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Button } from "@/components/ui/button";

<Button>Save</Button>`}</Code>
      </div>

      <Example
        title="Variants"
        description="Solid is the key. Outline is a hairline. Ghost is text until you hover. Danger uses error. Link is type."
        wide
        code={`<Button>Save</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Delete</Button>
<Button variant="link">Link</Button>`}
      >
        <div className="demoRow">
          <Button>Save</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Delete</Button>
          <Button variant="link">Link</Button>
        </div>
      </Example>

      <Example
        title="Compact"
        description={
          <>
            Set <code>data-density=&quot;compact&quot;</code> on a region.
            Controls shrink. The language stays.
          </>
        }
        wide
        code={`<div data-density="compact">
  <Button>Save</Button>
  <Button variant="outline">Outline</Button>
</div>`}
      >
        <div className="demoRow" data-density="compact">
          <Button>Save</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </Example>

      <Example
        title="With an icon"
        description={
          <>
            The SVG is a child. Put it first or last. It inherits{" "}
            <code>currentColor</code> and sizes to <code>1em</code>.
          </>
        }
        wide
        code={`<Button>
  <Plus />
  New branch
</Button>`}
      >
        <div className="demoRow">
          <Button>
            <Plus />
            New branch
          </Button>
          <Button variant="outline">
            Fork
            <Arrow />
          </Button>
        </div>
      </Example>

      <Example
        title="Icon only"
        description={
          <>
            <code>icon</code> is a square. Name it with <code>aria-label</code>.
          </>
        }
        wide
        code={`<Button icon aria-label="Save">
  <Check />
</Button>`}
      >
        <div className="demoRow">
          <Button icon aria-label="Save">
            <Check />
          </Button>
          <Button icon variant="outline" aria-label="Add">
            <Plus />
          </Button>
          <Button icon variant="ghost" aria-label="Add">
            <Plus />
          </Button>
          <Button icon variant="danger" aria-label="Delete">
            <Trash />
          </Button>
        </div>
      </Example>

      <Example
        title="Rounded"
        description={
          <>
            <code>round</code> is a pill. Works on a label or a square.
          </>
        }
        wide
        code={`<Button round>Get started</Button>`}
      >
        <div className="demoRow">
          <Button round>
            Get started
            <Arrow />
          </Button>
          <Button icon round variant="outline" aria-label="Add">
            <Plus />
          </Button>
        </div>
      </Example>

      <Example
        title="Pending"
        description={
          <>
            <code>pending</code> shows a spinner and blocks presses. Focus
            stays on the key.
          </>
        }
        code={`<Button pending>Save</Button>`}
      >
        <ButtonPendingDemo />
      </Example>

      <Example
        title="Group"
        description={
          <>
            <code>ButtonGroup</code> joins keys. Outer corners keep the radius.
            Press does not travel, so the seam stays closed.
          </>
        }
        wide
        code={`import { Button, ButtonGroup } from "@/components/ui/button";

<ButtonGroup>
  <Button variant="outline">Archive</Button>
  <Button variant="outline">Report</Button>
  <Button variant="outline">Snooze</Button>
</ButtonGroup>`}
      >
        <ButtonGroup>
          <Button variant="outline">Archive</Button>
          <Button variant="outline">Report</Button>
          <Button variant="outline">Snooze</Button>
        </ButtonGroup>
      </Example>

      <Example
        title="As a link"
        description={
          <>
            Pass <code>href</code> and it is an <code>a</code>. Same chrome. Do
            not wrap a link in a button.
          </>
        }
        wide
        code={`<Button href="/docs">Docs</Button>`}
      >
        <div className="demoRow">
          <Button href="/docs">Docs</Button>
          <Button href="/docs/installation" variant="link">
            Installation
          </Button>
        </div>
      </Example>

      <Example
        title="Disabled"
        description="The lift comes off. Opacity drops. A disabled link keeps its href and leaves the tab order."
        wide
        code={`<Button disabled>Save</Button>`}
      >
        <div className="demoRow">
          <Button disabled>
            <Check />
            Save
          </Button>
          <Button href="/docs" disabled>
            Docs
          </Button>
        </div>
      </Example>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
