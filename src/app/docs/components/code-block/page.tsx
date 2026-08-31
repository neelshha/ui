import type { Metadata } from "next";
import { CodeBlock } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";

export const metadata: Metadata = {
  title: "Code block",
  description: "A silver key for code. Header bar, copy in one tap.",
};

const rows = [
  {
    name: "code",
    type: "string",
    notes: "The code text. Copied verbatim by the copy key.",
  },
  {
    name: "title",
    type: "string",
    notes: "A filename or label in the header bar. Optional.",
  },
  {
    name: "language",
    type: "string",
    notes: "A tiny language chip, like tsx or bash. Optional.",
  },
  {
    name: "figure",
    type: "element",
    notes: "The shell is a figure with a figcaption bar. Pass your own className to restyle it.",
  },
] as const;

const demo = `import { Card } from "@/components/ui/card";

export function Page() {
  return <Card>Notes</Card>;
}`;

export default function CodeBlockPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Code block</h1>
        <p>
          A silver key for code, like a card with a header bar. The bar holds
          a name, a language chip, and a copy key. The body is a native{" "}
          <code>pre</code>. This file is a client component because of the{" "}
          <code>copy</code> key.
        </p>
      </header>

      <CodeBlock title="page.tsx" language="tsx" code={demo} />

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="code-block" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { CodeBlock } from "@/components/ui/code-block";

<CodeBlock
  title="page.tsx"
  language="tsx"
  code={\`import { Card } from "@/components/ui/card";\`}
/>`}</Code>
        <p>
          The copy key writes the <code>code</code> string to the clipboard.
          It flips to a check for a beat. When a secure context is missing it
          falls back to a hidden textarea.
        </p>
      </div>

      <div className="docBlock">
        <h2>No header text</h2>
        <p>Omit title and language. The bar keeps just the copy key.</p>
        <CodeBlock code={`npx @neelshha/ui@latest add code-block`} />
      </div>

      <div className="docBlock">
        <h2>Language chip</h2>
        <p>The chip reads the mono type and the key face.</p>
        <CodeBlock
          language="bash"
          code={`npm install
npm run dev`}
        />
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
