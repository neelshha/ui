import type { ReactNode } from "react";
import { Code } from "@/components/Code";
import { Preview } from "@/components/Preview";

type ExampleProps = {
  title?: string;
  description?: ReactNode;
  code?: string;
  wide?: boolean;
  children: ReactNode;
};

function slug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function Example({
  title,
  description,
  code,
  wide,
  children,
}: ExampleProps) {
  return (
    <section className="example" {...(title ? { id: slug(title) } : {})}>
      {title ? <h2>{title}</h2> : null}
      {description ? <p>{description}</p> : null}
      <Preview wide={wide ?? false}>{children}</Preview>
      {code ? <Code>{code}</Code> : null}
    </section>
  );
}
