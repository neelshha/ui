import "./separator.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

type SeparatorOrientation = "horizontal" | "vertical";

export type SeparatorProps = {
  orientation?: SeparatorOrientation;
  className?: string;
} & Omit<ComponentProps<"hr">, "className">;

export function Separator({
  orientation = "horizontal",
  className,
  ...rest
}: SeparatorProps) {
  if (orientation === "vertical") {
    return (
      <div
        {...rest}
        role="separator"
        aria-orientation="vertical"
        className={cx("ns-separator", className)}
        data-orientation="vertical"
      />
    );
  }

  return (
    <hr
      className={cx("ns-separator", className)}
      data-orientation="horizontal"
      {...rest}
    />
  );
}
