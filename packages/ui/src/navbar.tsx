import "./navbar.css";

import {
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactNode,
} from "react";
import { Button } from "./button";
import { cx } from "./cx";

export type NavbarProps = ComponentProps<"nav">;

export function Navbar({ className, ...rest }: NavbarProps) {
  return <nav className={cx("ns-navbar", className)} {...rest} />;
}

type BrandLink = ComponentProps<"a"> & { href: string };
type BrandText = Omit<ComponentProps<"span">, "href"> & { href?: undefined };

export type NavbarBrandProps = BrandLink | BrandText;

export function NavbarBrand({ className, children, ...rest }: NavbarBrandProps) {
  const classNames = cx("ns-navbar__brand", className);
  const href = "href" in rest ? rest.href : undefined;

  if (href) {
    return (
      <a className={classNames} {...(rest as BrandLink)}>
        {children}
      </a>
    );
  }

  if (isValidElement<{ className?: string | undefined }>(children)) {
    return cloneElement(children, {
      className: cx(classNames, children.props.className),
    });
  }

  return (
    <span className={classNames} {...(rest as BrandText)}>
      {children}
    </span>
  );
}

export type NavbarMenuProps = ComponentProps<"details"> & {
  label?: ReactNode;
};

export function NavbarMenu({
  label = "Menu",
  className,
  children,
  ...rest
}: NavbarMenuProps) {
  return (
    <details className={cx("ns-navbar__menu", className)} {...rest}>
      <summary className="ns-button ns-navbar__toggle" data-variant="ghost">
        {label}
      </summary>
      {children}
    </details>
  );
}

export type NavbarListProps = ComponentProps<"ul">;

export function NavbarList({ className, ...rest }: NavbarListProps) {
  return <ul className={cx("ns-navbar__list", className)} {...rest} />;
}

export type NavbarItemProps = {
  children?: ReactNode;
  className?: string | undefined;
  href?: string | undefined;
  current?: boolean | undefined;
};

type LinkChild = {
  className?: string | undefined;
  "aria-current"?: "page" | undefined;
  "data-variant"?: string | undefined;
};

export function NavbarItem({
  href,
  current,
  className,
  children,
}: NavbarItemProps) {
  const classNames = cx("ns-navbar__item", className);
  const currentMark = current ? { "aria-current": "page" as const } : {};

  if (href) {
    return (
      <li>
        <Button variant="ghost" href={href} className={classNames} {...currentMark}>
          {children}
        </Button>
      </li>
    );
  }

  if (isValidElement<LinkChild>(children)) {
    return (
      <li>
        {cloneElement(children, {
          className: cx("ns-button", classNames, children.props.className),
          "data-variant": "ghost",
          ...currentMark,
        })}
      </li>
    );
  }

  return (
    <li>
      <span
        className={cx("ns-button", classNames)}
        data-variant="ghost"
        {...currentMark}
      >
        {children}
      </span>
    </li>
  );
}

export type NavbarSpacerProps = ComponentProps<"span">;

export function NavbarSpacer({ className, ...rest }: NavbarSpacerProps) {
  return (
    <span
      className={cx("ns-navbar__spacer", className)}
      aria-hidden="true"
      {...rest}
    />
  );
}
