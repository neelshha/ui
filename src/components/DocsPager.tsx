"use client";

import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@neelshha/ui";
import { pagerNav } from "@/lib/docs";
import { icon } from "@/components/icons";

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
        <Button href={prev.href} variant="outline" className="pagerLink">
          <span className="pagerDir">
            <ChevronLeft {...icon} />
            Previous
          </span>
          {prev.label}
        </Button>
      ) : (
        <span />
      )}
      {next ? (
        <Button href={next.href} className="pagerLink pagerLinkNext">
          <span className="pagerDir">
            Next
            <ChevronRight {...icon} />
          </span>
          {next.label}
        </Button>
      ) : null}
    </nav>
  );
}
