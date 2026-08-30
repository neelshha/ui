import "./popover.css";

import type { ComponentProps, ReactNode } from "react";
import { Button, type ButtonVariant } from "./button";
import { cx } from "./cx";

export type PopoverProps = ComponentProps<"div">;

export type PopoverTriggerProps = {
  popoverTarget: string;
  children?: ReactNode;
  className?: string | undefined;
  variant?: ButtonVariant | undefined;
};

export function Popover({ className, ...rest }: PopoverProps) {
  return (
    <div
      popover="auto"
      className={cx("ns-popover", className)}
      {...rest}
    />
  );
}

export function PopoverTrigger({
  popoverTarget,
  children,
  className,
  variant = "outline",
}: PopoverTriggerProps) {
  return (
    <Button variant={variant} className={className} popoverTarget={popoverTarget}>
      {children}
    </Button>
  );
}
