export function Code({ children }: { children: string }) {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  );
}

export function Install({ name }: { name: string }) {
  return <Code>{`npx @neelshha/ui@latest add ${name}`}</Code>;
}
