import type { ReactNode } from "react";
import { slugify } from "@/lib/docs";
import { Code } from "@/components/Code";
import { Preview } from "@/components/Preview";

type ExampleProps = {
  title?: string;
  description?: ReactNode;
  code?: string;
  wide?: boolean;
  children: ReactNode;
};

export function Example({
  title,
  description,
  code,
  wide,
  children,
}: ExampleProps) {
  return (
    <section className="example">
      {title ? <h2 id={slugify(title)}>{title}</h2> : null}
      {description ? <p>{description}</p> : null}
      <div className="exampleStage">
        <Preview wide={wide ?? false}>{children}</Preview>
        {code ? <Code>{code}</Code> : null}
      </div>
    </section>
  );
}
