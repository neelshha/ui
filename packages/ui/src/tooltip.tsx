import "./tooltip.css";

import {
  cloneElement,
  isValidElement,
  useId,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";
import { cx } from "./cx";

export type TooltipProps = Omit<ComponentProps<"span">, "content"> & {
  content: ReactNode;
};

export function Tooltip({ content, className, children, ...rest }: TooltipProps) {
  const tipId = useId();
  const trigger = isValidElement(children)
    ? cloneElement(
        children as ReactElement<{ "aria-describedby"?: string }>,
        { "aria-describedby": tipId },
      )
    : (
        <span tabIndex={0} aria-describedby={tipId}>
          {children}
        </span>
      );

  return (
    <span className={cx("ns-tooltip", className)} {...rest}>
      {trigger}
      <span className="ns-tooltip__tip" id={tipId} role="tooltip">
        {content}
      </span>
    </span>
  );
}
