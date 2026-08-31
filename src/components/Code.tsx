import { CodeBlock } from "@neelshha/ui";

type CodeProps = {
  children: string;
  /** Bar label. Defaults to the page file the snippet is pasted into. */
  title?: string | undefined;
  /** Language chip. Defaults to tsx. */
  language?: string | undefined;
};

export function Code({ children, title = "page.tsx", language = "tsx" }: CodeProps) {
  return <CodeBlock title={title} language={language} code={children} />;
}

export function Install({ name }: { name: string }) {
  return (
    <CodeBlock
      title="Terminal"
      language="bash"
      code={`npx @neelshha/ui@latest add ${name}`}
    />
  );
}
