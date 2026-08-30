"use client";

import { usePathname } from "next/navigation";
import { NavbarItem, NavbarList, NavbarMenu } from "@neelshha/ui";
import { headerNav } from "@/lib/docs";

function current(pathname: string, href: string) {
  if (pathname === href) return true;
  if (!pathname.startsWith(`${href}/`)) return false;
  return !headerNav.some(
    (item) =>
      item.href !== href &&
      (pathname === item.href || pathname.startsWith(`${item.href}/`)),
  );
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <NavbarMenu>
      <NavbarList>
        {headerNav.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            current={current(pathname, item.href)}
          >
            {item.label}
          </NavbarItem>
        ))}
      </NavbarList>
    </NavbarMenu>
  );
}
