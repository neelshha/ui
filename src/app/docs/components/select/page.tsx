import type { Metadata } from "next";
import { Select } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Select",
  description: "A native select in the Field well.",
};

const rows = [
  {
    name: "label",
    type: "ReactNode",
    notes: "Required. Sits above the well.",
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
    notes: "Help under the field.",
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
] as const;

export default function SelectPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Select</h1>
        <p>
          A native <code>select</code> in the Field well. The label sits
          above it. Options are children. No listbox, no combobox.
        </p>
      </header>

      <Example>
        <Select label="Role" name="role" defaultValue="editor">
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </Select>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="select" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Select } from "@/components/ui/select";

<Select label="Role" name="role">
  <option value="editor">Editor</option>
  <option value="admin">Admin</option>
</Select>`}</Code>
      </div>

      <Example
        title="Required"
        description="A Required mark. The select is required."
        code={`<Select label="Role" name="role" required>
  <option value="">Choose</option>
  <option value="editor">Editor</option>
</Select>`}
      >
        <Select label="Role" name="role-req" required defaultValue="">
          <option value="">Choose</option>
          <option value="editor">Editor</option>
        </Select>
      </Example>

      <Example
        title="Error"
        description="A sentence under the field."
        code={`<Select label="Role" name="role" error="Pick a role.">
  <option value="">Choose</option>
  <option value="editor">Editor</option>
</Select>`}
      >
        <Select label="Role" name="role-error" error="Pick a role." defaultValue="">
          <option value="">Choose</option>
          <option value="editor">Editor</option>
        </Select>
      </Example>

      <Example
        title="Disabled"
        description="Dashed border. Native disabled."
        code={`<Select label="Role" name="role" disabled>
  <option>Editor</option>
</Select>`}
      >
        <Select label="Role" name="role-disabled" disabled defaultValue="editor">
          <option value="editor">Editor</option>
        </Select>
      </Example>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
