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
  const safe = value.replace(/[^A-Za-z0-9_-]/g, "-");
  // "a b" and "a-b" sanitize to the same string; disambiguate with a hash
  // of the raw value so two tabs can never share a DOM id.
  return safe === value ? safe : `${safe}-${hash(value)}`;
}

function hash(value: string) {
  let h = 5381;
  for (let i = 0; i < value.length; i += 1) {
    h = (h * 33) ^ value.charCodeAt(i);
  }
  return (h >>> 0).toString(36);
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

function isDisabled(tab: HTMLElement) {
  return tab.getAttribute("aria-disabled") === "true";
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
  // Lazy initializer: firstTabValue walks the children tree and must not
  // run on every render.
  const [uncontrolled, setUncontrolled] = useState(
    () => defaultValue ?? firstTabValue(children) ?? "",
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

  // Roving focus over every tab — disabled tabs stay focusable (APG) but
  // never activate.
  function move(event: KeyboardEvent<HTMLDivElement>, delta: number) {
    const tabs = Array.from(
      ref.current?.querySelectorAll<HTMLElement>('[role="tab"]') ?? [],
    );
    if (tabs.length === 0) return;
    const current = tabs.indexOf(event.target as HTMLElement);
    if (current < 0) return;
    const next = tabs[(current + delta + tabs.length) % tabs.length];
    if (!next) return;
    event.preventDefault();
    next.focus();
    if (!isDisabled(next)) {
      const nextValue = next.dataset.value;
      if (nextValue) setValue(nextValue);
    }
  }

  function jumpTo(tab: HTMLElement | null | undefined) {
    if (!tab) return;
    tab.focus();
    if (!isDisabled(tab)) {
      const nextValue = tab.dataset.value;
      if (nextValue) setValue(nextValue);
    }
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
          event.preventDefault();
          jumpTo(
            ref.current?.querySelector<HTMLElement>('[role="tab"]'),
          );
        } else if (event.key === "End") {
          const tabs = ref.current?.querySelectorAll<HTMLElement>('[role="tab"]');
          event.preventDefault();
          jumpTo(tabs?.[tabs.length - 1]);
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
      variant={selected ? "solid" : "outline"}
      role="tab"
      id={`${uid}-tab-${token(value)}`}
      aria-controls={`${uid}-panel-${token(value)}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      /* APG: a disabled tab stays focusable and announces itself with
         aria-disabled; activation is refused, not the attribute. */
      {...(disabled ? { "aria-disabled": true as const } : {})}
      data-value={value}
      className={cx("ns-tabs__tab", className)}
      onClick={() => {
        if (disabled) return;
        setValue(value);
      }}
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
