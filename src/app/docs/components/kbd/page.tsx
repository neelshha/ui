import type { Metadata } from "next";
import { Kbd, Text } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Kbd",
  description: "A tiny raised key.",
};

const rows = [
  {
    name: "Kbd",
    type: "kbd",
    notes: "A raised key. Mono. One of the few places raise stays.",
  },
] as const;

export default function KbdPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Kbd</h1>
        <p>
          A tiny raised key. Mono face. Use it next to copy, not as a button.
        </p>
      </header>

      <Example
        code={`<Text>Open the palette with <Kbd>⌘K</Kbd>.</Text>`}
      >
        <Text>
          Open the palette with <Kbd>⌘K</Kbd>.
        </Text>
      </Example>

      <Example
        title="Chord"
        description="One key per glyph. Space is type."
        code={`<Text>
  <Kbd>⌘</Kbd> <Kbd>⇧</Kbd> <Kbd>P</Kbd>
</Text>`}
      >
        <Text>
          <Kbd>⌘</Kbd> <Kbd>⇧</Kbd> <Kbd>P</Kbd>
        </Text>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="kbd" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Kbd } from "@/components/ui/kbd";

<Kbd>⌘K</Kbd>`}</Code>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
