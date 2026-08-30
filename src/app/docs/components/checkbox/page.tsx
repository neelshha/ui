import type { Metadata } from "next";
import { Checkbox } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Checkbox",
  description: "A native checkbox in Field chrome.",
};

const rows = [
  {
    name: "label",
    type: "ReactNode",
    notes: "Required. Sits beside the box.",
  },
  {
    name: "optional",
    type: "boolean",
    def: "false",
    notes: "Renders an Optional mark on the label. Wins over required.",
  },
  {
    name: "required",
    type: "boolean",
    def: "false",
    notes: "Renders a Required mark. Sets required and aria-required.",
  },
  {
    name: "description",
    type: "ReactNode",
    notes: "Help under the row.",
  },
  {
    name: "error",
    type: "ReactNode",
    notes: "A sentence. Marks the box invalid.",
  },
  {
    name: "disabled",
    type: "boolean",
    def: "false",
    notes: "Native disabled.",
  },
] as const;

export default function CheckboxPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Checkbox</h1>
        <p>
          A native checkbox. The box is a well. Checked stamps it in. The label
          is beside it, not floating. Composes <code>Field</code>.
        </p>
      </header>

      <Example>
        <Checkbox label="Remember me" name="remember" defaultChecked />
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="checkbox" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Checkbox } from "@/components/ui/checkbox";

<Checkbox label="Remember me" name="remember" />`}</Code>
      </div>

      <Example
        title="Required"
        description="A Required mark. The input is required."
        code={`<Checkbox label="Terms" name="terms" required />`}
      >
        <Checkbox label="Terms" name="terms-req" required />
      </Example>

      <Example
        title="Description"
        description="Help stays under the row."
        code={`<Checkbox
  label="Marketing"
  name="marketing"
  description="We will not sell your address."
/>`}
      >
        <Checkbox
          label="Marketing"
          name="marketing"
          description="We will not sell your address."
        />
      </Example>

      <Example
        title="Error"
        description="A sentence under the row. The box picks up the error line."
        code={`<Checkbox label="Terms" name="terms" error="Accept the terms." />`}
      >
        <Checkbox label="Terms" name="terms" error="Accept the terms." />
      </Example>

      <Example
        title="Disabled"
        description="Native disabled. The label greys out."
        code={`<Checkbox label="Remember me" name="remember" disabled defaultChecked />`}
      >
        <Checkbox label="Remember me" name="remember" disabled defaultChecked />
      </Example>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
