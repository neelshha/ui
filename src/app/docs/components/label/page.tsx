import type { Metadata } from "next";
import { Label } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Label",
  description: "A native label for composing outside Field.",
};

const rows = [
  {
    name: "htmlFor",
    type: "string",
    notes: "Points at the control. Native label behavior.",
  },
] as const;

export default function LabelPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Label</h1>
        <p>A native label. Use it when you are composing outside Field.</p>
      </header>

      <Example
        code={`<Label htmlFor="email">Email</Label>
<input id="email" type="email" name="email" />`}
      >
        <div className="stack">
          <Label htmlFor="docs-email">Email</Label>
          <input id="docs-email" type="email" name="email" />
        </div>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="label" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Label } from "@/components/ui/label";

<Label htmlFor="email">Email</Label>`}</Code>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
