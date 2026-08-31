import "./codeblock.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";
import { CodeCopy } from "./code-copy";

export type CodeBlockProps = Omit<ComponentProps<"figure">, "title"> & {
  /** Filename or label shown in the header bar. */
  title?: string | undefined;
  /** Language chip, e.g. tsx or bash. */
  language?: string | undefined;
  /** The code text. Copied verbatim by the copy button. */
  code: string;
};

export function CodeBlock({
  title,
  language,
  code,
  className,
  ...rest
}: CodeBlockProps) {
  return (
    <figure className={cx("ns-codeblock", className)} {...rest}>
      <figcaption className="ns-codeblock__bar">
        <span className="ns-codeblock__meta">
          {title ? (
            <span className="ns-codeblock__title">{title}</span>
          ) : null}
          {language ? (
            <span className="ns-codeblock__lang">{language}</span>
          ) : null}
        </span>
        <CodeCopy code={code} />
      </figcaption>
      <pre className="ns-codeblock__pre" tabIndex={0}>
        <code>{code}</code>
      </pre>
    </figure>
  );
}
