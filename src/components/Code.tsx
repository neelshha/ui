import { CopyCode } from "@/components/CopyCode";

export function Code({ children }: { children: string }) {
  return (
    <div className="code">
      <CopyCode value={children} />
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function Install({ name }: { name: string }) {
  return <Code>{`npx @neelshha/ui@latest add ${name}`}</Code>;
}
