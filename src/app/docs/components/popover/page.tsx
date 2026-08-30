import type { Metadata } from "next";
import { Popover, PopoverTrigger, Text } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Popover",
  description: "A native popover. Top layer, light dismiss.",
};

const rows = [
  {
    name: "id",
    type: "string",
    notes: "Required. Matches PopoverTrigger popoverTarget.",
  },
  {
    name: "popoverTarget",
    type: "string",
    notes: "Native invoker. Light dismiss and Escape are the browser's.",
  },
] as const;

export default function PopoverPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Popover</h1>
        <p>
          A native <code>popover=&quot;auto&quot;</code> panel. Top layer.
          Light dismiss. No portal. Trigger is an outline key.
        </p>
      </header>

      <Example
        code={`<PopoverTrigger popoverTarget="notes">Notes</PopoverTrigger>
<Popover id="notes">
  <Text>A short note on the project.</Text>
</Popover>`}
      >
        <PopoverTrigger popoverTarget="notes">Notes</PopoverTrigger>
        <Popover id="notes">
          <Text>A short note on the project.</Text>
        </Popover>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="popover" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Popover, PopoverTrigger } from "@/components/ui/popover";

<PopoverTrigger popoverTarget="notes">Notes</PopoverTrigger>
<Popover id="notes">A short note.</Popover>`}</Code>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
