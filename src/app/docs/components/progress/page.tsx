import type { Metadata } from "next";
import { Meter, Progress } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Progress",
  description: "Native progress and meter.",
};

const rows = [
  {
    name: "value / max",
    type: "number",
    notes: "Native progress attributes. Default max is 1 — set 100 if you think in percents.",
  },
  {
    name: "Meter",
    type: "meter",
    notes: "A gauge, not a task. min, max, low, high, optimum are native.",
  },
] as const;

export default function ProgressPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Progress</h1>
        <p>
          Native <code>progress</code> and <code>meter</code>. A well, not a
          raised bar. Omit <code>value</code> for indeterminate.
        </p>
      </header>

      <Example
        code={`<Progress value={64} max={100} />
<Meter value={0.4} min={0} max={1} />`}
      >
        <div className="stack">
          <Progress value={64} max={100} />
          <Meter value={0.4} min={0} max={1} />
        </div>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="progress" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Meter, Progress } from "@/components/ui/progress";

<Progress value={64} max={100} />
<Meter value={0.4} min={0} max={1} />`}</Code>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
