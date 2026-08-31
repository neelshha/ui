import "./link.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type LinkProps = ComponentProps<"a">;

export function Link({ className, target, rel, ...rest }: LinkProps) {
  // A custom rel adds to the reverse-tabnabbing guard rather than replacing
  // it — an explicit rel must never drop noopener noreferrer from _blank.
  const safeRel =
    target === "_blank"
      ? rel && rel.includes("noopener")
        ? rel
        : rel
          ? `${rel} noopener noreferrer`
          : "noopener noreferrer"
      : rel;

  return (
    <a
      className={cx("ns-link", className)}
      target={target}
      rel={safeRel}
      {...rest}
    />
  );
}
