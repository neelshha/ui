"use client";

import "./menu.css";

import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  popoverAnchorStyle,
  triggerAnchorStyle,
  watchPopoverPlacement,
} from "./anchor";
import { Button, type ButtonVariant } from "./button";
import { cx } from "./cx";

export type MenuProps = ComponentProps<"div">;

export type MenuTriggerProps = {
  menu: string;
  children?: ReactNode;
  className?: string | undefined;
  variant?: ButtonVariant | undefined;
  disabled?: boolean | undefined;
};

export type MenuItemProps = {
  children?: ReactNode;
  className?: string | undefined;
  disabled?: boolean | undefined;
  onClick?: ((event: MouseEvent<HTMLButtonElement>) => void) | undefined;
};

/** Index of the item to focus after an arrow move, given the enabled items
    and the currently focused index (-1 when focus is not on an item — e.g.
    right after the menu opened). Wraps at both ends. Disabled items never
    reach this function: the caller filters them out of `count`. */
export function menuFocusTarget(
  count: number,
  currentIndex: number,
  delta: 1 | -1,
): number {
  if (count === 0) return -1;
  if (currentIndex < 0) return 0;
  return (currentIndex + delta + count) % count;
}

function menuItems(root: HTMLElement | null) {
  return Array.from(
    root?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])') ??
      [],
  );
}

function hidePopover(node: HTMLElement | null) {
  if (node && "hidePopover" in node) {
    (node as HTMLElement & { hidePopover: () => void }).hidePopover();
  }
}

export function Menu({ className, onKeyDown, id, style, ...rest }: MenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  // The placement watcher also handles the open state: it repositions on
  // open, on resize, and on scroll in fallback browsers, and fires the
  // onOpen hook once per open so the first item takes focus.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return watchPopoverPlacement(node, () => menuItems(node)[0]?.focus());
  }, []);

  function move(event: KeyboardEvent<HTMLDivElement>, delta: 1 | -1) {
    const list = menuItems(ref.current);
    const current = list.indexOf(event.target as HTMLElement);
    const next = list[menuFocusTarget(list.length, current, delta)];
    if (!next) return;
    event.preventDefault();
    next.focus();
  }

  return (
    <div
      {...rest}
      id={id}
      ref={ref}
      popover="auto"
      role="menu"
      aria-orientation="vertical"
      className={cx("ns-popover ns-menu", className)}
      style={{ ...popoverAnchorStyle(id), ...style }}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") move(event, 1);
        else if (event.key === "ArrowUp") move(event, -1);
        else if (event.key === "Home") {
          const first = menuItems(ref.current)[0];
          if (first) {
            event.preventDefault();
            first.focus();
          }
        } else if (event.key === "End") {
          const list = menuItems(ref.current);
          const last = list[list.length - 1];
          if (last) {
            event.preventDefault();
            last.focus();
          }
        } else if (event.key === "Tab") {
          hidePopover(ref.current);
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
  disabled,
}: MenuTriggerProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const node = document.getElementById(menu);
    if (!node) return;
    const onToggle = (event: Event) => {
      setExpanded(
        "newState" in event && (event as ToggleEvent).newState === "open",
      );
    };
    node.addEventListener("toggle", onToggle);
    setExpanded(node.matches(":popover-open"));
    return () => node.removeEventListener("toggle", onToggle);
  }, [menu]);

  return (
    <Button
      variant={variant}
      className={className}
      popoverTarget={menu}
      style={triggerAnchorStyle(menu)}
      aria-haspopup="menu"
      aria-expanded={expanded}
      aria-controls={menu}
      {...(disabled ? { disabled: true } : {})}
    >
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
      tabIndex={-1}
      className={cx("ns-menu__item", className)}
      {...(disabled ? { disabled: true } : {})}
      onClick={(event) => {
        onClick?.(event);
        hidePopover(event.currentTarget.closest("[popover]"));
      }}
    >
      {children}
    </Button>
  );
}
