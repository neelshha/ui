import "./label.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type LabelProps = ComponentProps<"label">;

export function Label({ className, ...rest }: LabelProps) {
  return <label className={cx("ns-label", className)} {...rest} />;
}
