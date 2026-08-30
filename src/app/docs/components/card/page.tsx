import type { Metadata } from "next";
import { Card, Text } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Card",
  description: "A hairline group. Children go in.",
};

const rows = [
  {
    name: "children",
    type: "ReactNode",
    notes: "The content. One surface, no header tree.",
  },
] as const;

export default function CardPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Card</h1>
        <p>
          A hairline group on paper. No raise. Use it to hold a cluster, not
          every block on the page.
        </p>
      </header>

      <Example
        code={`<Card>
  <Text as="h2" tone="heading">Notes</Text>
  <Text>A place for a short block of copy or a form.</Text>
</Card>`}
      >
        <Card>
          <Text as="h2" tone="heading">
            Notes
          </Text>
          <Text>A place for a short block of copy or a form.</Text>
        </Card>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="card" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Card } from "@/components/ui/card";

<Card>Notes</Card>`}</Code>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
