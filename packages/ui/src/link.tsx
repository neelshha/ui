import "./link.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type LinkProps = ComponentProps<"a">;

export function Link({ className, ...rest }: LinkProps) {
  return <a className={cx("ns-link", className)} {...rest} />;
}
