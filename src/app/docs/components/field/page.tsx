import type { Metadata } from "next";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";
import { FieldDemo } from "@/components/FieldDemo";

export const metadata: Metadata = {
  title: "Field",
  description: "A text field with a label that stays.",
};

const rows = [
  {
    name: "label",
    type: "ReactNode",
    notes: "Required. The name of the field.",
  },
  {
    name: "chrome",
    type: '"stack" | "float" | "placeholder"',
    def: '"stack"',
    notes:
      "TextField and TextArea. Stack and float both keep the label above the well — they look the same. Placeholder drops the visible label when you type.",
  },
  {
    name: "optionalLabel / requiredLabel",
    type: "ReactNode",
    def: '"Optional" / "Required"',
    notes: "The mark text. Pass another language if you need it.",
  },
  {
    name: "type",
    type: '"text" | "email" | "password" | "url" | "tel" | "search" | "number"',
    def: '"text"',
    notes: "TextField only. Other input types fall back to text.",
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
    notes: "Renders a Required mark. Sets required and aria-required on the control.",
  },
  {
    name: "description",
    type: "ReactNode",
    notes: "Help under the field. Stays when error is set.",
  },
  {
    name: "error",
    type: "ReactNode",
    notes: "A sentence. The field height does not jump.",
  },
  {
    name: "disabled",
    type: "boolean",
    def: "false",
    notes: "Dashed border. Native disabled.",
  },
  {
    name: "readOnly",
    type: "boolean",
    def: "false",
    notes: "Dotted border. Native readOnly.",
  },
] as const;

export default function FieldPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Field</h1>
        <p>
          A label above a recessed well. Native input. Help and error stay
          associated. <code>TextField</code> and <code>TextArea</code>.
        </p>
      </header>

      <Example>
        <FieldDemo />
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="field" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Field, TextField, TextArea } from "@/components/ui/field";

<TextField label="Email" type="email" name="email" />
<TextArea label="Notes" name="notes" optional />`}</Code>
        <p>
          <code>Field</code> is public. Pass one control as the child. It
          receives <code>id</code>, <code>aria-describedby</code>, and invalid
          for you. Checkbox, Radio, Select, and Switch compose it.{" "}
          <code>chrome</code> is for text only.
        </p>
      </div>

      <Example
        title="Placeholder"
        description="The name is gone the moment you type."
        code={`<TextField label="Name" name="name" chrome="placeholder" />`}
      >
        <FieldDemo chrome="placeholder" />
      </Example>

      <Example
        title="Required"
        description="A Required mark on the label. The input is required."
        code={`<TextField label="Name" name="name" required />`}
      >
        <FieldDemo required />
      </Example>

      <Example
        title="Error"
        description="A sentence under the field. Height is reserved so the form does not jump."
        code={`<TextField label="Name" name="name" error="Enter a name." />`}
      >
        <FieldDemo error="Enter a name." />
      </Example>

      <Example
        title="Text area"
        description="Same chrome. The control grows with the text."
        code={`<TextArea label="Notes" name="notes" optional />`}
      >
        <FieldDemo multiline />
      </Example>

      <Example
        title="Disabled"
        description="Dashed border. Native disabled."
        code={`<TextField label="Name" name="name" disabled />`}
      >
        <FieldDemo disabled />
      </Example>

      <Example
        title="Read only"
        description="Dotted border. Native readOnly."
        code={`<TextField label="Name" name="name" readOnly defaultValue="Ada Lovelace" />`}
      >
        <FieldDemo readOnly />
      </Example>

      <Example
        title="Compact"
        description={
          <>
            Set <code>data-density=&quot;compact&quot;</code> on a region. The
            well shrinks. The label stays above.
          </>
        }
        code={`<div data-density="compact">
  <TextField label="Name" name="name" />
</div>`}
      >
        <div data-density="compact">
          <FieldDemo />
        </div>
      </Example>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
