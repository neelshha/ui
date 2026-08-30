import type { Metadata } from "next";
import { Spinner } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Spinner",
  description: "The pending glyph, extracted.",
};

const rows = [
  {
    name: "Spinner",
    type: "span",
    notes: "aria-hidden. Button pending renders this. Standalone when you need the glyph without a key.",
  },
] as const;

export default function SpinnerPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Spinner</h1>
        <p>
          The pending glyph, extracted. Button already uses it. Add this when
          you want the same mark next to copy.
        </p>
      </header>

      <Example code={`<Spinner />`}>
        <Spinner />
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="spinner" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Spinner } from "@/components/ui/spinner";

<Spinner />`}</Code>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
