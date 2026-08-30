import type { Metadata } from "next";
import { Button, Tooltip } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Tooltip",
  description: "A silver key on hover or focus.",
};

const rows = [
  {
    name: "content",
    type: "ReactNode",
    notes: "The hint. role=tooltip. Shows on hover and focus-within after a short delay. Escape hides it.",
  },
] as const;

export default function TooltipPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Tooltip</h1>
        <p>
          A silver key on hover or focus. No portal. Delay is 400ms so it
          does not flash on a pass. Escape hides it until the next hover or
          focus.
        </p>
      </header>

      <Example
        code={`<Tooltip content="Saved.">
  <Button variant="outline">Hover</Button>
</Tooltip>`}
      >
        <Tooltip content="Saved.">
          <Button variant="outline">Hover</Button>
        </Tooltip>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="tooltip" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Tooltip } from "@/components/ui/tooltip";

<Tooltip content="Saved.">Hover</Tooltip>`}</Code>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
