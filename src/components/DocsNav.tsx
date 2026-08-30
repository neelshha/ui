"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarGroup,
  SidebarItem,
  SidebarLabel,
  SidebarList,
  SidebarNav,
} from "@neelshha/ui";
import { componentNav, startNav } from "@/lib/docs";

function current(pathname: string, href: string) {
  return pathname === href;
}

export function DocsNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarNav aria-label="Docs">
        <SidebarGroup>
          <SidebarLabel>Get started</SidebarLabel>
          <SidebarList>
            {startNav.map((item) => (
              <SidebarItem
                key={item.href}
                current={current(pathname, item.href)}
              >
                <Link href={item.href}>{item.label}</Link>
              </SidebarItem>
            ))}
          </SidebarList>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarLabel>Components</SidebarLabel>
          <SidebarList>
            {componentNav.map((item) => (
              <SidebarItem
                key={item.href}
                current={current(pathname, item.href)}
              >
                <Link href={item.href}>{item.label}</Link>
              </SidebarItem>
            ))}
          </SidebarList>
        </SidebarGroup>
      </SidebarNav>
    </Sidebar>
  );
}
