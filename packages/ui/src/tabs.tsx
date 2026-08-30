"use client";

import "./tabs.css";

import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Button } from "./button";
import { cx } from "./cx";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
  uid: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tab components must be used inside Tabs.");
  return ctx;
}

function token(value: string) {
  return value.replace(/[^A-Za-z0-9_-]/g, "-");
}

function firstTabValue(children: ReactNode): string | undefined {
  let found: string | undefined;
  Children.forEach(children, (child) => {
    if (found || !isValidElement(child)) return;
    if (child.type === Tab) {
      const props = child.props as TabProps;
      if (!props.disabled) found = props.value;
      return;
    }
    const nested = (child.props as { children?: ReactNode }).children;
    if (nested != null) found = firstTabValue(nested);
  });
  return found;
}

export type TabsProps = ComponentProps<"div"> & {
  value?: string | undefined;
  defaultValue?: string | undefined;
  onValueChange?: ((value: string) => void) | undefined;
};

export type TabListProps = ComponentProps<"div">;

export type TabProps = {
  value: string;
  disabled?: boolean | undefined;
  className?: string | undefined;
  children?: ReactNode;
};

export type TabPanelProps = ComponentProps<"div"> & {
  value: string;
};

export function Tabs({
  value: controlled,
  defaultValue,
  onValueChange,
  className,
  children,
  ...rest
}: TabsProps) {
  const uid = useId();
  const [uncontrolled, setUncontrolled] = useState(
    defaultValue ?? firstTabValue(children) ?? "",
  );
  const value = controlled ?? uncontrolled;

  function setValue(next: string) {
    if (controlled === undefined) setUncontrolled(next);
    onValueChange?.(next);
  }

  return (
    <TabsContext.Provider value={{ value, setValue, uid }}>
      <div className={cx("ns-tabs", className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabList({
  className,
  onKeyDown,
  children,
  ...rest
}: TabListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { setValue } = useTabs();

  function move(event: KeyboardEvent<HTMLDivElement>, delta: number) {
    const tabs = Array.from(
      ref.current?.querySelectorAll<HTMLElement>(
        '[role="tab"]:not([disabled])',
      ) ?? [],
    );
    if (tabs.length === 0) return;
    const current = tabs.indexOf(event.target as HTMLElement);
    if (current < 0) return;
    const next = tabs[(current + delta + tabs.length) % tabs.length];
    if (!next) return;
    const nextValue = next.dataset.value;
    if (!nextValue) return;
    event.preventDefault();
    setValue(nextValue);
    next.focus();
  }

  return (
    <div
      {...rest}
      ref={ref}
      role="tablist"
      className={cx("ns-tabs__list", className)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          move(event, 1);
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          move(event, -1);
        } else if (event.key === "Home") {
          const first = ref.current?.querySelector<HTMLElement>(
            '[role="tab"]:not([disabled])',
          );
          const nextValue = first?.dataset.value;
          if (first && nextValue) {
            event.preventDefault();
            setValue(nextValue);
            first.focus();
          }
        } else if (event.key === "End") {
          const tabs = ref.current?.querySelectorAll<HTMLElement>(
            '[role="tab"]:not([disabled])',
          );
          const last = tabs?.[tabs.length - 1];
          const nextValue = last?.dataset.value;
          if (last && nextValue) {
            event.preventDefault();
            setValue(nextValue);
            last.focus();
          }
        }
        onKeyDown?.(event);
      }}
    >
      {children}
    </div>
  );
}

export function Tab({ value, disabled, className, children }: TabProps) {
  const { value: current, setValue, uid } = useTabs();
  const selected = current === value;

  return (
    <Button
      variant="ghost"
      role="tab"
      id={`${uid}-tab-${token(value)}`}
      aria-controls={`${uid}-panel-${token(value)}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      {...(disabled ? { disabled: true } : {})}
      data-value={value}
      className={cx("ns-tabs__tab", className)}
      onClick={() => setValue(value)}
    >
      {children}
    </Button>
  );
}

export function TabPanel({
  value,
  className,
  children,
  ...rest
}: TabPanelProps) {
  const { value: current, uid } = useTabs();
  const selected = current === value;

  return (
    <div
      {...rest}
      id={`${uid}-panel-${token(value)}`}
      role="tabpanel"
      aria-labelledby={`${uid}-tab-${token(value)}`}
      hidden={!selected}
      className={cx("ns-tabs__panel", className)}
    >
      {selected ? children : null}
    </div>
  );
}
