import type { Metadata } from "next";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@neelshha/ui";
import { icon } from "@/components/icons";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Alert",
  description: "A silver key. Tone is the title ink.",
};

const rows = [
  {
    name: "tone",
    type: '"default" | "success" | "warning" | "danger" | "info"',
    def: '"default"',
    notes: "Colors the title. The key stays silver.",
  },
  {
    name: "role",
    type: "string",
    def: 'tone === "danger" ? "alert" : "status"',
    notes: "Danger interrupts. Other tones are polite status. Pass role to override.",
  },
  {
    name: "AlertTitle",
    type: "div",
    notes: "The lead line. Medium weight. Tone colors it.",
  },
  {
    name: "AlertDescription",
    type: "div",
    notes: "Supporting copy. Stays body color.",
  },
] as const;

export default function AlertPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Alert</h1>
        <p>
          A silver key, same chrome as an outline button. Tone is the title
          ink. Body stays readable. Compose a title and description when there
          is more than one line.
        </p>
      </header>

      <Example
        wide
        code={`<Alert>
  <AlertTitle>Saved.</AlertTitle>
  <AlertDescription>Your changes are on the server.</AlertDescription>
</Alert>`}
      >
        <Alert>
          <AlertTitle>
            <CircleCheck {...icon} />
            Saved.
          </AlertTitle>
          <AlertDescription>Your changes are on the server.</AlertDescription>
        </Alert>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="alert" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

<Alert>
  <AlertTitle>Saved.</AlertTitle>
  <AlertDescription>Your changes are on the server.</AlertDescription>
</Alert>`}</Code>
      </div>

      <Example
        title="Tones"
        description="Success, warning, danger, and info. Danger should set role=alert when it interrupts."
        wide
        code={`<Alert tone="success">
  <AlertTitle>Saved.</AlertTitle>
  <AlertDescription>Your changes are on the server.</AlertDescription>
</Alert>
<Alert tone="warning">
  <AlertTitle>Replace this file?</AlertTitle>
  <AlertDescription>The current copy will be lost.</AlertDescription>
</Alert>
<Alert tone="danger" role="alert">
  <AlertTitle>Payment failed.</AlertTitle>
  <AlertDescription>Try another card or try again later.</AlertDescription>
</Alert>
<Alert tone="info">
  <AlertTitle>A new version is ready.</AlertTitle>
  <AlertDescription>Reload to pick it up.</AlertDescription>
</Alert>`}
      >
        <div className="stack">
          <Alert tone="success">
            <AlertTitle>
              <CircleCheck {...icon} />
              Saved.
            </AlertTitle>
            <AlertDescription>
              Your changes are on the server.
            </AlertDescription>
          </Alert>
          <Alert tone="warning">
            <AlertTitle>
              <TriangleAlert {...icon} />
              Replace this file?
            </AlertTitle>
            <AlertDescription>The current copy will be lost.</AlertDescription>
          </Alert>
          <Alert tone="danger" role="alert">
            <AlertTitle>
              <CircleAlert {...icon} />
              Payment failed.
            </AlertTitle>
            <AlertDescription>
              Try another card or try again later.
            </AlertDescription>
          </Alert>
          <Alert tone="info">
            <AlertTitle>
              <Info {...icon} />
              A new version is ready.
            </AlertTitle>
            <AlertDescription>Reload to pick it up.</AlertDescription>
          </Alert>
        </div>
      </Example>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
