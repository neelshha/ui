import "./text.css";

import type { ComponentProps, ElementType } from "react";
import { cx } from "./cx";

type TextTone = "heading" | "body" | "sub";

type TextTag = "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "strong";

export type TextProps = Omit<ComponentProps<"p">, "as"> & {
  as?: TextTag;
  tone?: TextTone;
};

export function Text({
  as: Tag = "p",
  tone = "body",
  className,
  ...rest
}: TextProps) {
  const Element = Tag as ElementType;
  return (
    <Element className={cx("ns-text", className)} data-tone={tone} {...rest} />
  );
}
