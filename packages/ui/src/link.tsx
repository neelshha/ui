import "./link.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type LinkProps = ComponentProps<"a">;

export function Link({ className, target, rel, ...rest }: LinkProps) {
  return (
    <a
      className={cx("ns-link", className)}
      target={target}
      rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
      {...rest}
    />
  );
}
