"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { componentNav, startNav } from "@/lib/docs";

function current(pathname: string, href: string) {
  return pathname === href;
}

function sectionFor(pathname: string) {
  const start = startNav.find((item) => item.href === pathname);
  if (start) return start.label;
  const component = componentNav.find((item) => item.href === pathname);
  if (component) return component.label;
  return "Navigation";
}

export function MobileDocsNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const items = [...startNav, ...componentNav];

  return (
    <nav className="mobileDocsNav" aria-label="Docs">
      <button
        type="button"
        className="mobileDocsNavToggle ns-button"
        data-variant="outline"
        aria-expanded={open}
        aria-controls="mobile-docs-list"
        onClick={() => setOpen((value) => !value)}
      >
        {sectionFor(pathname)}
        <span className="mobileDocsNavChevron" aria-hidden="true">
          {open ? "▴" : "▾"}
        </span>
      </button>
      {open ? (
        <ul id="mobile-docs-list" className="mobileDocsNavList">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={current(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
}
