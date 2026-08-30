import "./navbar.css";

import type { ComponentProps, ReactNode } from "react";
import { Button, type ButtonProps } from "./button";
import { cx } from "./cx";

export type NavbarProps = ComponentProps<"nav">;

export function Navbar({ className, ...rest }: NavbarProps) {
  return <nav className={cx("ns-navbar", className)} {...rest} />;
}

type BrandLink = ComponentProps<"a"> & { href: string };
type BrandText = Omit<ComponentProps<"span">, "href"> & { href?: undefined };

export type NavbarBrandProps = BrandLink | BrandText;

export function NavbarBrand({ className, ...rest }: NavbarBrandProps) {
  const classNames = cx("ns-navbar__brand", className);
  const href = "href" in rest ? rest.href : undefined;

  if (href) {
    return <a className={classNames} {...(rest as BrandLink)} />;
  }

  return <span className={classNames} {...(rest as BrandText)} />;
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

export type NavbarItemProps = ButtonProps & {
  current?: boolean;
};

export function NavbarItem({
  current = false,
  className,
  ...rest
}: NavbarItemProps) {
  return (
    <li>
      <Button
        {...rest}
        variant="ghost"
        className={cx("ns-navbar__item", className)}
        {...(current ? { "aria-current": "page" as const } : {})}
      />
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
