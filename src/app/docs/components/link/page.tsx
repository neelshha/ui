import type { Metadata } from "next";
import { Link, Text } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Link",
  description: "An a. Dotted underline. Reads --link.",
};

const rows = [
  {
    name: "href",
    type: "string",
    notes: "A native a. Color is --link, not ink. target=_blank adds rel=noopener noreferrer unless you pass rel.",
  },
] as const;

export default function LinkPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Link</h1>
        <p>
          A native <code>a</code>. Dotted underline. Reads{" "}
          <code>--link</code>. Not a ghost button.
        </p>
      </header>

      <Example
        code={`<Text>
  See the <Link href="/docs/theming">theming</Link> notes.
</Text>`}
      >
        <Text>
          See the <Link href="/docs/theming">theming</Link> notes.
        </Text>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="link" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Link } from "@/components/ui/link";

<Link href="/docs">Docs</Link>`}</Code>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
