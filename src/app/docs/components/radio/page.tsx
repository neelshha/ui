import type { Metadata } from "next";
import { Radio, RadioGroup } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Radio",
  description: "A native radio. Group sets the name.",
};

const rows = [
  {
    name: "label",
    type: "ReactNode",
    notes: "Required on Radio and RadioGroup.",
  },
  {
    name: "name",
    type: "string",
    notes: "Required on RadioGroup. Cloned onto each Radio. No context.",
  },
  {
    name: "description",
    type: "ReactNode",
    notes: "Help under the group or a single radio.",
  },
  {
    name: "error",
    type: "ReactNode",
    notes: "A sentence. Marks the group invalid.",
  },
  {
    name: "disabled",
    type: "boolean",
    def: "false",
    notes: "Fieldset disabled, or one radio.",
  },
] as const;

export default function RadioPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Radio</h1>
        <p>
          A native radio in the same choice chrome as Checkbox.{" "}
          <code>RadioGroup</code> is a fieldset. It sets <code>name</code> by
          cloning children. No context, so it stays a server component.
        </p>
      </header>

      <Example>
        <RadioGroup label="Notify" name="notify">
          <Radio label="Mail" value="mail" defaultChecked />
          <Radio label="None" value="none" />
        </RadioGroup>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="radio" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Radio, RadioGroup } from "@/components/ui/radio";

<RadioGroup label="Notify" name="notify">
  <Radio label="Mail" value="mail" />
  <Radio label="None" value="none" />
</RadioGroup>`}</Code>
      </div>

      <Example
        title="Error"
        description="The group can carry the sentence. Each radio stays a native input."
        code={`<RadioGroup label="Plan" name="plan" error="Pick a plan.">
  <Radio label="Monthly" value="month" />
  <Radio label="Yearly" value="year" />
</RadioGroup>`}
      >
        <RadioGroup label="Plan" name="plan" error="Pick a plan.">
          <Radio label="Monthly" value="month" />
          <Radio label="Yearly" value="year" />
        </RadioGroup>
      </Example>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
