"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarItem, NavbarList } from "@neelshha/ui";
import { headerNav } from "@/lib/docs";

function current(pathname: string, href: string) {
  if (href === "/components") {
    return (
      pathname === "/components" || pathname.startsWith("/docs/components")
    );
  }
  if (href === "/docs") {
    return (
      pathname === "/docs" ||
      (pathname.startsWith("/docs/") &&
        !pathname.startsWith("/docs/components"))
    );
  }
  return pathname === href;
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <NavbarList>
      {headerNav.map((item) => (
        <NavbarItem key={item.href} current={current(pathname, item.href)}>
          <Link href={item.href}>{item.label}</Link>
        </NavbarItem>
      ))}
    </NavbarList>
  );
}
