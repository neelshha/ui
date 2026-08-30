"use client";

import "./popover.css";

import { useEffect, useState, type ComponentProps, type ReactNode } from "react";
import { placeFromInvoker, popoverAnchorStyle, triggerAnchorStyle } from "./anchor";
import { Button, type ButtonVariant } from "./button";
import { cx } from "./cx";

export type PopoverProps = ComponentProps<"div">;

export type PopoverTriggerProps = {
  popoverTarget: string;
  children?: ReactNode;
  className?: string | undefined;
  variant?: ButtonVariant | undefined;
  disabled?: boolean | undefined;
};

export function Popover({ className, id, style, ...rest }: PopoverProps) {
  return (
    <div
      {...rest}
      id={id}
      popover="auto"
      className={cx("ns-popover", className)}
      style={{ ...popoverAnchorStyle(id), ...style }}
    />
  );
}

export function PopoverTrigger({
  popoverTarget,
  children,
  className,
  variant = "outline",
  disabled,
}: PopoverTriggerProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const node = document.getElementById(popoverTarget);
    if (!node) return;
    const onToggle = (event: Event) => {
      const open =
        "newState" in event && (event as ToggleEvent).newState === "open";
      setExpanded(open);
      if (open) placeFromInvoker(node);
    };
    node.addEventListener("toggle", onToggle);
    setExpanded(node.matches(":popover-open"));
    if (node.matches(":popover-open")) placeFromInvoker(node);
    return () => node.removeEventListener("toggle", onToggle);
  }, [popoverTarget]);

  return (
    <Button
      variant={variant}
      className={className}
      popoverTarget={popoverTarget}
      style={triggerAnchorStyle(popoverTarget)}
      aria-haspopup="true"
      aria-expanded={expanded}
      aria-controls={popoverTarget}
      {...(disabled ? { disabled: true } : {})}
    >
      {children}
    </Button>
  );
}
