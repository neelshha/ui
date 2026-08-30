import "./button.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type ButtonGroupProps = ComponentProps<"div">;

export function ButtonGroup({ className, ...rest }: ButtonGroupProps) {
  return <div className={cx("ns-button-group", className)} role="group" {...rest} />;
}
