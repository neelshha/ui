"use client";

import "./popover.css";

import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import {
  popoverAnchorStyle,
  triggerAnchorStyle,
  watchPopoverPlacement,
} from "./anchor";
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
  const ref = useRef<HTMLDivElement>(null);

  // In fallback browsers the open popover follows its invoker on
  // resize/scroll; native anchor positioning needs no help.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return watchPopoverPlacement(node);
  }, []);

  return (
    <div
      {...rest}
      ref={ref}
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
    };
    node.addEventListener("toggle", onToggle);
    setExpanded(node.matches(":popover-open"));
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
