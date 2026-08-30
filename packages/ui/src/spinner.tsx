import "./spinner.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type SpinnerProps = ComponentProps<"span"> & {
  label?: string | undefined;
};

export function Spinner({ className, label, ...rest }: SpinnerProps) {
  if (label) {
    return (
      <span
        className={cx("ns-spinner", className)}
        role="status"
        aria-label={label}
        {...rest}
      />
    );
  }

  return (
    <span
      className={cx("ns-spinner", className)}
      aria-hidden="true"
      {...rest}
    />
  );
}
