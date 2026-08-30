import "./button.css";

import type { ComponentProps, KeyboardEvent, MouseEvent, ReactNode } from "react";
import { cx } from "./cx";
import { Spinner } from "./spinner";

export { ButtonGroup } from "./button-group";
export type { ButtonGroupProps } from "./button-group";

export type ButtonVariant = "solid" | "outline" | "ghost" | "danger" | "link";

type Shared = {
  variant?: ButtonVariant;
  round?: boolean;
  pending?: boolean;
  disabled?: boolean;
};

type Named =
  | { icon?: false }
  | { icon: true; "aria-label": string }
  | { icon: true; "aria-labelledby": string };

type AsButton = Shared &
  Named &
  Omit<ComponentProps<"button">, "href"> & {
    href?: undefined;
  };

type AsLink = Shared &
  Named &
  Omit<ComponentProps<"a">, "href" | "type"> & {
    href: string;
  };

export type ButtonProps = AsButton | AsLink;

function warnIconName(
  icon: boolean,
  named: {
    "aria-label"?: string | undefined;
    "aria-labelledby"?: string | undefined;
  },
) {
  if (process.env.NODE_ENV === "production" || !icon) return;
  if (named["aria-label"] || named["aria-labelledby"]) return;
  console.warn("Button: icon requires aria-label or aria-labelledby.");
}

function blocked(
  pending: boolean,
  disabled: boolean | undefined,
  event: MouseEvent | KeyboardEvent,
) {
  if (!pending && !disabled) return false;
  event.preventDefault();
  event.stopPropagation();
  return true;
}

export function Button({
  variant = "solid",
  icon = false,
  round = false,
  pending = false,
  className,
  disabled,
  children,
  onClick,
  onKeyDown,
  ...rest
}: ButtonProps) {
  const href = "href" in rest ? rest.href : undefined;
  const type = "type" in rest && rest.type ? rest.type : "button";
  const classNames = cx("ns-button", className);
  const body: ReactNode = (
    <>
      {pending ? <Spinner /> : null}
      {children}
    </>
  );

  warnIconName(icon, rest);

  const marks = {
    className: classNames,
    "data-variant": variant,
    "data-icon": icon ? "" : undefined,
    "data-round": round ? "" : undefined,
    "data-pending": pending ? "" : undefined,
    "aria-busy": pending || undefined,
  } as const;

  const guards =
    pending || onClick || onKeyDown
      ? {
          onClick: (
            event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
          ) => {
            if (blocked(pending, disabled, event)) return;
            onClick?.(event as never);
          },
          onKeyDown: (
            event: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
          ) => {
            if (
              (pending || disabled) &&
              (event.key === "Enter" || event.key === " ")
            ) {
              blocked(true, disabled, event);
              return;
            }
            onKeyDown?.(event as never);
          },
        }
      : {};

  if (href) {
    const { href: dest, ...linkRest } = rest as AsLink;
    return (
      <a
        {...linkRest}
        {...marks}
        {...guards}
        href={dest}
        {...(disabled ? { tabIndex: -1, "aria-disabled": true as const } : {})}
      >
        {body}
      </a>
    );
  }

  const { type: _type, ...buttonRest } = rest as AsButton;
  return (
    <button
      {...buttonRest}
      {...marks}
      {...guards}
      type={pending ? "button" : type}
      disabled={disabled}
    >
      {body}
    </button>
  );
}
