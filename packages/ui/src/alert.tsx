import "./alert.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type AlertTone = "default" | "success" | "warning" | "danger" | "info";

export type AlertProps = ComponentProps<"div"> & {
  tone?: AlertTone;
};

export type AlertTitleProps = ComponentProps<"div">;

export type AlertDescriptionProps = ComponentProps<"div">;

export function Alert({
  tone = "default",
  className,
  role,
  ...rest
}: AlertProps) {
  return (
    <div
      className={cx("ns-alert", className)}
      data-tone={tone}
      role={role ?? (tone === "danger" ? "alert" : "status")}
      {...rest}
    />
  );
}

export function AlertTitle({ className, ...rest }: AlertTitleProps) {
  return <div className={cx("ns-alert__title", className)} {...rest} />;
}

export function AlertDescription({ className, ...rest }: AlertDescriptionProps) {
  return <div className={cx("ns-alert__description", className)} {...rest} />;
}
