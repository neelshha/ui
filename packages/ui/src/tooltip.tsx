import "./tooltip.css";

import type { ComponentProps, ReactNode } from "react";
import { cx } from "./cx";

export type TooltipProps = Omit<ComponentProps<"span">, "content"> & {
  content: ReactNode;
};

export function Tooltip({ content, className, children, ...rest }: TooltipProps) {
  return (
    <span className={cx("ns-tooltip", className)} {...rest}>
      {children}
      <span className="ns-tooltip__tip" role="tooltip">
        {content}
      </span>
    </span>
  );
}
