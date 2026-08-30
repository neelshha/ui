"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pagerNav } from "@/lib/docs";

export function DocsPager() {
  const pathname = usePathname();
  const index = pagerNav.findIndex((item) => item.href === pathname);
  if (index === -1) return null;

  const prev = index > 0 ? pagerNav[index - 1] : undefined;
  const next = index < pagerNav.length - 1 ? pagerNav[index + 1] : undefined;
  if (!prev && !next) return null;

  return (
    <nav className="pager" aria-label="Page">
      {prev ? (
        <Link href={prev.href} className="pagerLink">
          <span className="pagerDir">Previous</span>
          {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="pagerLink pagerLinkNext">
          <span className="pagerDir">Next</span>
          {next.label}
        </Link>
      ) : null}
    </nav>
  );
}
