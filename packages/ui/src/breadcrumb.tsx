import "./breadcrumb.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type BreadcrumbProps = ComponentProps<"nav">;
export type BreadcrumbListProps = ComponentProps<"ol">;
export type BreadcrumbItemProps = ComponentProps<"li">;
export type BreadcrumbLinkProps = ComponentProps<"a">;
export type BreadcrumbPageProps = ComponentProps<"span">;

export function Breadcrumb({ className, ...rest }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cx("ns-breadcrumb", className)}
      {...rest}
    />
  );
}

export function BreadcrumbList({ className, ...rest }: BreadcrumbListProps) {
  return <ol className={cx("ns-breadcrumb__list", className)} {...rest} />;
}

export function BreadcrumbItem({ className, ...rest }: BreadcrumbItemProps) {
  return <li className={cx("ns-breadcrumb__item", className)} {...rest} />;
}

export function BreadcrumbLink({ className, ...rest }: BreadcrumbLinkProps) {
  return <a className={cx("ns-breadcrumb__link", className)} {...rest} />;
}

export function BreadcrumbPage({ className, ...rest }: BreadcrumbPageProps) {
  return (
    <span
      aria-current="page"
      className={cx("ns-breadcrumb__page", className)}
      {...rest}
    />
  );
}
