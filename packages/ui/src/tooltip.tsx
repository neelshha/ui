"use client";

import "./tooltip.css";

import {
  cloneElement,
  isValidElement,
  useId,
  useState,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";
import { cx } from "./cx";

export type TooltipProps = Omit<ComponentProps<"span">, "content"> & {
  content: ReactNode;
};

function describedBy(...parts: Array<string | undefined>) {
  const value = parts.filter(Boolean).join(" ");
  return value || undefined;
}

export function Tooltip({
  content,
  className,
  children,
  onKeyDown,
  onBlur,
  onMouseLeave,
  ...rest
}: TooltipProps) {
  const tipId = useId();
  const [dismissed, setDismissed] = useState(false);
  const triggerDescribedBy = isValidElement(children)
    ? describedBy(
        (children.props as { "aria-describedby"?: string })["aria-describedby"],
        tipId,
      )
    : tipId;
  const trigger = isValidElement(children)
    ? cloneElement(
        children as ReactElement<{ "aria-describedby"?: string }>,
        triggerDescribedBy
          ? { "aria-describedby": triggerDescribedBy }
          : {},
      )
    : (
        <span tabIndex={0} aria-describedby={tipId}>
          {children}
        </span>
      );

  return (
    <span
      className={cx("ns-tooltip", className)}
      data-dismissed={dismissed ? "" : undefined}
      onKeyDown={(event) => {
        if (event.key === "Escape") setDismissed(true);
        onKeyDown?.(event);
      }}
      onBlur={(event) => {
        setDismissed(false);
        onBlur?.(event);
      }}
      onMouseLeave={(event) => {
        setDismissed(false);
        onMouseLeave?.(event);
      }}
      {...rest}
    >
      {trigger}
      <span className="ns-tooltip__tip" id={tipId} role="tooltip">
        {content}
      </span>
    </span>
  );
}
