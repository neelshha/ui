import type { Metadata } from "next";
import { Text } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Text",
  description: "Typed copy that reads the tone tokens.",
};

const rows = [
  {
    name: "as",
    type: '"p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "strong"',
    def: '"p"',
    notes: "The element.",
  },
  {
    name: "tone",
    type: '"heading" | "body" | "sub"',
    def: '"body"',
    notes:
      "Color and size on the type scale. heading is lg, body is md, sub is sm.",
  },
] as const;

export default function TextPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Text</h1>
        <p>
          Typed copy that reads the tone tokens. Size follows the type scale so
          heading, body, and sub stay a step apart.
        </p>
      </header>

      <Example>
        <div className="stack">
          <Text as="h2" tone="heading">
            Heading
          </Text>
          <Text tone="body">Body copy sits in the middle.</Text>
          <Text tone="sub">Sub is quieter.</Text>
        </div>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="text" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Text } from "@/components/ui/text";

<Text as="h2" tone="heading">Heading</Text>
<Text tone="body">Body</Text>
<Text tone="sub">Sub</Text>`}</Code>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
