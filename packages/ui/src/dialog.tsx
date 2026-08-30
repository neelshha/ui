"use client";

import "./dialog.css";

import {
  Children,
  Fragment,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useId,
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

export type DialogDescriptionProps = ComponentProps<"p">;

export type DialogCloseProps = {
  children?: ReactNode;
  variant?: ButtonVariant | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
};

export type DialogActionsProps = {
  children: ReactNode;
};

type DialogIds = {
  titleId: string;
  descriptionId: string;
};

const DialogContext = createContext<DialogIds | null>(null);

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  if (ref) ref.current = value;
}

function containsType(children: ReactNode, type: unknown): boolean {
  return Children.toArray(children).some((child) => {
    if (!isValidElement(child)) return false;
    if (child.type === type) return true;
    if (child.type === Fragment) {
      return containsType(
        (child.props as { children?: ReactNode }).children,
        type,
      );
    }
    return false;
  });
}

export function Dialog({
  open,
  onOpenChange,
  className,
  onClose,
  ref: forwardedRef,
  children,
  ...rest
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const openRef = useRef(open);
  openRef.current = open;
  const uid = useId();
  const titleId = `${uid}-title`;
  const descriptionId = `${uid}-desc`;
  const labelledBy =
    rest["aria-labelledby"] ??
    (containsType(children, DialogTitle) ? titleId : undefined);
  const describedBy =
    rest["aria-describedby"] ??
    (containsType(children, DialogDescription) ? descriptionId : undefined);

  useEffect(() => {
    const node = ref.current;
    if (!node || open === undefined) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  return (
    <DialogContext.Provider value={{ titleId, descriptionId }}>
      <dialog
        {...rest}
        ref={(node) => {
          ref.current = node;
          assignRef(forwardedRef, node);
        }}
        className={cx("ns-dialog", className)}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        onClose={(event) => {
          onClose?.(event);
          onOpenChange?.(false);
          queueMicrotask(() => {
            const node = ref.current;
            if (openRef.current && node && !node.open) node.showModal();
          });
        }}
      >
        {children}
      </dialog>
    </DialogContext.Provider>
  );
}

export function DialogTitle({ className, id, ...rest }: DialogTitleProps) {
  const ctx = useContext(DialogContext);
  return (
    <h2
      id={id ?? ctx?.titleId}
      className={cx("ns-dialog__title", className)}
      {...rest}
    />
  );
}

export function DialogDescription({
  className,
  id,
  ...rest
}: DialogDescriptionProps) {
  const ctx = useContext(DialogContext);
  return (
    <p
      id={id ?? ctx?.descriptionId}
      className={cx("ns-dialog__description", className)}
      {...rest}
    />
  );
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

export function DialogActions({ children }: DialogActionsProps) {
  return <div className="ns-dialog__actions">{children}</div>;
}
