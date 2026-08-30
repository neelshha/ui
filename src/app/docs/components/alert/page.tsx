import type { Metadata } from "next";
import { Alert } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Alert",
  description: "A hairline status. Tone is color.",
};

const rows = [
  {
    name: "tone",
    type: '"default" | "success" | "warning" | "danger" | "info"',
    def: '"default"',
    notes: "Intent color on the border and copy. Uses the tone tokens.",
  },
  {
    name: "role",
    type: "string",
    def: '"status"',
    notes: 'Use role="alert" when the message must interrupt.',
  },
] as const;

export default function AlertPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Alert</h1>
        <p>
          A hairline on paper for a short status. Children go in. Tone is
          color, not a wash.
        </p>
      </header>

      <Example>
        <Alert>Saved.</Alert>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="alert" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Alert } from "@/components/ui/alert";

<Alert>Saved.</Alert>`}</Code>
      </div>

      <Example
        title="Tones"
        description="Success, warning, danger, and info. Danger should set role=alert when it interrupts."
        wide
        code={`<Alert tone="success">Saved.</Alert>
<Alert tone="warning">This will replace the file.</Alert>
<Alert tone="danger" role="alert">Payment failed.</Alert>
<Alert tone="info">A new version is ready.</Alert>`}
      >
        <div className="stack">
          <Alert tone="success">Saved.</Alert>
          <Alert tone="warning">This will replace the file.</Alert>
          <Alert tone="danger" role="alert">
            Payment failed.
          </Alert>
          <Alert tone="info">A new version is ready.</Alert>
        </div>
      </Example>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
