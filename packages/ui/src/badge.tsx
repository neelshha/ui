import "./badge.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type BadgeTone = "default" | "accent" | "success" | "warning" | "danger";

export type BadgeProps = ComponentProps<"span"> & {
  tone?: BadgeTone | undefined;
};

export function Badge({ tone = "default", className, ...rest }: BadgeProps) {
  return (
    <span className={cx("ns-badge", className)} data-tone={tone} {...rest} />
  );
}
