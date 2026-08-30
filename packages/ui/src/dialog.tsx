"use client";

import "./dialog.css";

import {
  useEffect,
  useRef,
  type ComponentProps,
  type ReactNode,
  type Ref,
} from "react";
import { Button, type ButtonVariant } from "./button";
import { cx } from "./cx";

export type DialogProps = Omit<ComponentProps<"dialog">, "open"> & {
  open?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
};

export type DialogTitleProps = ComponentProps<"h2">;

export type DialogCloseProps = {
  children?: ReactNode;
  variant?: ButtonVariant | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
};

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  if (ref) ref.current = value;
}

export function Dialog({
  open,
  onOpenChange,
  className,
  onClose,
  ref: forwardedRef,
  ...rest
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || open === undefined) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  return (
    <dialog
      {...rest}
      ref={(node) => {
        ref.current = node;
        assignRef(forwardedRef, node);
      }}
      className={cx("ns-dialog", className)}
      onClose={(event) => {
        onClose?.(event);
        onOpenChange?.(false);
      }}
    />
  );
}

export function DialogTitle({ className, ...rest }: DialogTitleProps) {
  return <h2 className={cx("ns-dialog__title", className)} {...rest} />;
}

export function DialogClose({
  children = "Close",
  variant = "outline",
  disabled,
  className,
}: DialogCloseProps) {
  return (
    <form method="dialog">
      <Button
        variant={variant}
        type="submit"
        {...(disabled ? { disabled: true } : {})}
        {...(className ? { className } : {})}
      >
        {children}
      </Button>
    </form>
  );
}

export function DialogActions({ children }: { children: ReactNode }) {
  return <div className="ns-dialog__actions">{children}</div>;
}
