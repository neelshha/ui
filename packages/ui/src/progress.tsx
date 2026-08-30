import "./progress.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type ProgressProps = ComponentProps<"progress">;
export type MeterProps = ComponentProps<"meter">;

export function Progress({ className, ...rest }: ProgressProps) {
  return <progress className={cx("ns-progress", className)} {...rest} />;
}

export function Meter({ className, ...rest }: MeterProps) {
  return <meter className={cx("ns-meter", className)} {...rest} />;
}
