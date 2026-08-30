import type { Metadata } from "next";
import { Switch } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Switch",
  description: "A checkbox that reads as a switch.",
};

const rows = [
  {
    name: "label",
    type: "ReactNode",
    notes: "Required. Sits beside the track.",
  },
  {
    name: "description",
    type: "ReactNode",
    notes: "Help under the row.",
  },
  {
    name: "error",
    type: "ReactNode",
    notes: "A sentence. Marks the switch invalid.",
  },
  {
    name: "disabled",
    type: "boolean",
    def: "false",
    notes: "Native disabled.",
  },
] as const;

export default function SwitchPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Switch</h1>
        <p>
          A checkbox with <code>role=&quot;switch&quot;</code>. Off is a well.
          On is the sky track with a silver thumb. Same Field chrome as
          Checkbox.
        </p>
      </header>

      <Example>
        <Switch label="Alerts" name="alerts" defaultChecked />
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="switch" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Switch } from "@/components/ui/switch";

<Switch label="Alerts" name="alerts" />`}</Code>
      </div>

      <Example
        title="Description"
        description="Help stays under the row."
        code={`<Switch
  label="Public"
  name="public"
  description="Anyone with the link can view."
/>`}
      >
        <Switch
          label="Public"
          name="public"
          description="Anyone with the link can view."
        />
      </Example>

      <Example
        title="Error"
        description="A sentence. Marks the switch invalid."
        code={`<Switch label="Alerts" name="alerts-err" error="Turn this on to continue." />`}
      >
        <Switch
          label="Alerts"
          name="alerts-err"
          error="Turn this on to continue."
        />
      </Example>

      <Example
        title="Disabled"
        description="Native disabled."
        code={`<Switch label="Alerts" name="alerts" disabled defaultChecked />`}
      >
        <Switch label="Alerts" name="alerts-off" disabled defaultChecked />
      </Example>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
