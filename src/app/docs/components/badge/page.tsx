import type { Metadata } from "next";
import { Badge } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Badge",
  description: "A small mark for status.",
};

const rows = [
  {
    name: "tone",
    type: '"default" | "accent" | "success" | "warning" | "danger"',
    def: '"default"',
    notes:
      "Default is a hairline. Accent is the sky key. Intent tones color the border and copy. No role unless you pass one.",
  },
] as const;

export default function BadgePage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Badge</h1>
        <p>A flat mark for status. Accent is the sky key.</p>
      </header>

      <Example>
        <div className="demoRow">
          <Badge>Draft</Badge>
        </div>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="badge" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Badge } from "@/components/ui/badge";

<Badge>Draft</Badge>`}</Code>
      </div>

      <Example
        title="Tones"
        description="Default is a hairline. Accent is the sky key. Intent is color, not a wash."
        wide
        code={`<Badge>Draft</Badge>
<Badge tone="accent">Live</Badge>
<Badge tone="success">Ok</Badge>
<Badge tone="warning">Hold</Badge>
<Badge tone="danger">Down</Badge>`}
      >
        <div className="demoRow">
          <Badge>Draft</Badge>
          <Badge tone="accent">Live</Badge>
          <Badge tone="success">Ok</Badge>
          <Badge tone="warning">Hold</Badge>
          <Badge tone="danger">Down</Badge>
        </div>
      </Example>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
