"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { componentNav, startNav } from "@/lib/docs";

function current(pathname: string, href: string) {
  return pathname === href;
}

export function DocsNav() {
  const pathname = usePathname();

  return (
    <aside className="side">
      <nav aria-label="Site">
        <div className="sideGroup">
          <p className="sideLabel">Get started</p>
          <ul>
            {startNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-current={current(pathname, item.href) ? "true" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="sideGroup">
          <p className="sideLabel">
            <Link
              href="/docs/components"
              data-current={
                pathname === "/docs/components" ? "true" : undefined
              }
            >
              Components
            </Link>
          </p>
          <ul>
            {componentNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-current={current(pathname, item.href) ? "true" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
