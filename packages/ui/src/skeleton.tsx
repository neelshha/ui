import "./skeleton.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type SkeletonProps = ComponentProps<"span">;

export function Skeleton({ className, ...rest }: SkeletonProps) {
  return (
    <span
      className={cx("ns-skeleton", className)}
      aria-hidden="true"
      {...rest}
    />
  );
}
