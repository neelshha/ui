import "./kbd.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type KbdProps = ComponentProps<"kbd">;

export function Kbd({ className, ...rest }: KbdProps) {
  return <kbd className={cx("ns-kbd", className)} {...rest} />;
}
