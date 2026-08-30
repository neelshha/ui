import "./card.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type CardProps = ComponentProps<"div">;

export function Card({ className, ...rest }: CardProps) {
  return <div className={cx("ns-card", className)} {...rest} />;
}
