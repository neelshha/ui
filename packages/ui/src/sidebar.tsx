import "./sidebar.css";

import {
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cx } from "./cx";

type LinkChild = {
  className?: string | undefined;
  "aria-current"?: "page" | undefined;
};

export type SidebarProps = ComponentProps<"aside">;

export function Sidebar({ className, ...rest }: SidebarProps) {
  return <aside className={cx("ns-sidebar", className)} {...rest} />;
}

export type SidebarNavProps = ComponentProps<"nav">;

export function SidebarNav({ className, ...rest }: SidebarNavProps) {
  return <nav className={cx("ns-sidebar__nav", className)} {...rest} />;
}

export type SidebarGroupProps = ComponentProps<"div">;

export function SidebarGroup({ className, ...rest }: SidebarGroupProps) {
  return <div className={cx("ns-sidebar__group", className)} {...rest} />;
}

export type SidebarLabelProps = {
  children?: ReactNode;
  className?: string | undefined;
  href?: string | undefined;
  current?: boolean | undefined;
};

export function SidebarLabel({
  href,
  current,
  className,
  children,
}: SidebarLabelProps) {
  const classNames = cx("ns-sidebar__label", className);
  if (href) {
    return (
      <p className={classNames}>
        <a
          href={href}
          className="ns-sidebar__label-link"
          {...(current ? { "aria-current": "page" as const } : {})}
        >
          {children}
        </a>
      </p>
    );
  }

  if (isValidElement<LinkChild>(children)) {
    return (
      <p className={classNames}>
        {cloneElement(children, {
          className: cx("ns-sidebar__label-link", children.props.className),
          ...(current ? { "aria-current": "page" as const } : {}),
        })}
      </p>
    );
  }

  return <p className={classNames}>{children}</p>;
}

export type SidebarListProps = ComponentProps<"ul">;

export function SidebarList({ className, ...rest }: SidebarListProps) {
  return <ul className={cx("ns-sidebar__list", className)} {...rest} />;
}

export type SidebarItemProps = {
  children?: ReactNode;
  className?: string | undefined;
  href?: string | undefined;
  current?: boolean | undefined;
};

export function SidebarItem({
  href,
  current,
  className,
  children,
}: SidebarItemProps) {
  const classNames = cx("ns-sidebar__item", className);
  const currentMark = current ? { "aria-current": "page" as const } : {};

  if (href) {
    return (
      <li>
        <a href={href} className={classNames} {...currentMark}>
          {children}
        </a>
      </li>
    );
  }

  if (isValidElement<LinkChild>(children)) {
    return (
      <li>
        {cloneElement(children, {
          className: cx(classNames, children.props.className),
          ...currentMark,
        })}
      </li>
    );
  }

  return (
    <li>
      <span className={classNames} {...currentMark}>
        {children}
      </span>
    </li>
  );
}
