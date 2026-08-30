import "./spinner.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type SpinnerProps = ComponentProps<"span"> & {
  label?: string | undefined;
};

function Ticks() {
  return (
    <>
      <span />
      <span />
      <span />
    </>
  );
}

export function Spinner({ className, label, ...rest }: SpinnerProps) {
  if (label) {
    return (
      <span
        className={cx("ns-spinner", className)}
        role="status"
        aria-label={label}
        {...rest}
      >
        <Ticks />
      </span>
    );
  }

  return (
    <span
      className={cx("ns-spinner", className)}
      aria-hidden="true"
      {...rest}
    >
      <Ticks />
    </span>
  );
}
