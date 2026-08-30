import "./separator.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

type SeparatorOrientation = "horizontal" | "vertical";

export type SeparatorProps = {
  orientation?: SeparatorOrientation;
  decorative?: boolean;
  className?: string;
} & Omit<ComponentProps<"hr">, "className">;

export function Separator({
  orientation = "horizontal",
  decorative,
  className,
  ...rest
}: SeparatorProps) {
  const hidden = decorative ? ({ "aria-hidden": true } as const) : {};

  if (orientation === "vertical") {
    return (
      <div
        {...rest}
        {...hidden}
        role={decorative ? undefined : "separator"}
        aria-orientation={decorative ? undefined : "vertical"}
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
      {...hidden}
    />
  );
}
