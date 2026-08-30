"use client";

import "./menu.css";

import {
  useRef,
  type ComponentProps,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Button } from "./button";
import { cx } from "./cx";

export type MenuProps = ComponentProps<"div">;

export type MenuTriggerProps = {
  menu: string;
  children?: ReactNode;
  className?: string | undefined;
  variant?: "solid" | "outline" | "ghost" | "danger" | "link" | undefined;
};

export type MenuItemProps = {
  children?: ReactNode;
  className?: string | undefined;
  disabled?: boolean | undefined;
  onClick?: ((event: MouseEvent<HTMLButtonElement>) => void) | undefined;
};

export function Menu({ className, onKeyDown, ...rest }: MenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  function items() {
    return Array.from(
      ref.current?.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([disabled])',
      ) ?? [],
    );
  }

  function move(event: KeyboardEvent<HTMLDivElement>, delta: number) {
    const list = items();
    if (list.length === 0) return;
    const current = list.indexOf(event.target as HTMLElement);
    const index = current < 0 ? 0 : (current + delta + list.length) % list.length;
    const next = list[index];
    if (!next) return;
    event.preventDefault();
    next.focus();
  }

  return (
    <div
      {...rest}
      ref={ref}
      popover="auto"
      role="menu"
      className={cx("ns-popover ns-menu", className)}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") move(event, 1);
        else if (event.key === "ArrowUp") move(event, -1);
        else if (event.key === "Home") {
          const first = items()[0];
          if (first) {
            event.preventDefault();
            first.focus();
          }
        } else if (event.key === "End") {
          const list = items();
          const last = list[list.length - 1];
          if (last) {
            event.preventDefault();
            last.focus();
          }
        }
        onKeyDown?.(event);
      }}
    />
  );
}

export function MenuTrigger({
  menu,
  children,
  className,
  variant = "outline",
}: MenuTriggerProps) {
  return (
    <Button variant={variant} className={className} popoverTarget={menu}>
      {children}
    </Button>
  );
}

export function MenuItem({
  children,
  className,
  disabled,
  onClick,
}: MenuItemProps) {
  return (
    <Button
      variant="ghost"
      role="menuitem"
      className={cx("ns-menu__item", className)}
      {...(disabled ? { disabled: true } : {})}
      onClick={(event) => {
        onClick?.(event);
        const root = event.currentTarget.closest("[popover]");
        if (root && "hidePopover" in root) {
          (root as HTMLElement & { hidePopover: () => void }).hidePopover();
        }
      }}
    >
      {children}
    </Button>
  );
}
