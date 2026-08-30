import type { Metadata } from "next";
import { Separator, Text } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Separator",
  description: "A line between things.",
};

const rows = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    def: '"horizontal"',
    notes: "Horizontal is an hr. Vertical is a div with role=separator.",
  },
] as const;

export default function SeparatorPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Separator</h1>
        <p>A milled groove between things.</p>
      </header>

      <Example
        code={`<Text>Above</Text>
<Separator />
<Text>Below</Text>`}
      >
        <div className="stack">
          <Text>Above</Text>
          <Separator />
          <Text>Below</Text>
        </div>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="separator" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Separator } from "@/components/ui/separator";

<Separator />`}</Code>
      </div>

      <Example
        title="Vertical"
        description="A groove that stands between two pieces of copy."
        wide
        code={`<Separator orientation="vertical" />`}
      >
        <div className="demoSplit">
          <Text>Left</Text>
          <Separator orientation="vertical" />
          <Text>Right</Text>
        </div>
      </Example>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
