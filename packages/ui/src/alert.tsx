import "./alert.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type AlertTone = "default" | "success" | "warning" | "danger" | "info";

export type AlertProps = ComponentProps<"div"> & {
  tone?: AlertTone;
};

export function Alert({
  tone = "default",
  className,
  role = "status",
  ...rest
}: AlertProps) {
  return (
    <div
      className={cx("ns-alert", className)}
      data-tone={tone}
      role={role}
      {...rest}
    />
  );
}
