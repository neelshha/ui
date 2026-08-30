import "./spinner.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type SpinnerProps = ComponentProps<"span">;

export function Spinner({ className, ...rest }: SpinnerProps) {
  return (
    <span
      className={cx("ns-spinner", className)}
      aria-hidden="true"
      {...rest}
    />
  );
}
