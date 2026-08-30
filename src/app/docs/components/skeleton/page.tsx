import type { Metadata } from "next";
import { Skeleton } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Skeleton",
  description: "A pulsing well. Holds still if you reduce motion.",
};

const rows = [
  {
    name: "Skeleton",
    type: "span",
    notes: "aria-hidden. Size it with style or className. Pulse stops under reduced motion.",
  },
] as const;

export default function SkeletonPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Skeleton</h1>
        <p>
          A pulsing well. Holds still if you reduce motion. Size it yourself —
          it has no default width.
        </p>
      </header>

      <Example
        code={`<Skeleton style={{ width: "10rem", height: "0.7rem" }} />
<Skeleton style={{ width: "7rem", height: "0.7rem" }} />`}
      >
        <div className="stack">
          <Skeleton style={{ width: "10rem", height: "0.7rem" }} />
          <Skeleton style={{ width: "7rem", height: "0.7rem" }} />
        </div>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="skeleton" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Skeleton } from "@/components/ui/skeleton";

<Skeleton style={{ width: "10rem", height: "0.7rem" }} />`}</Code>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
