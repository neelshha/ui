"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@neelshha/ui";
import { DocsNav } from "@/components/DocsNav";
import { icon } from "@/components/icons";

const DESKTOP_QUERY = "(min-width: 48rem)";

export function MobileDocsNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wasOpen = useRef(false);

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close when the viewport grows into the desktop rail.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus in and out of the drawer.
  useEffect(() => {
    if (open) {
      document
        .getElementById("mobile-docs-drawer")
        ?.querySelector("a")
        ?.focus();
    } else if (wasOpen.current) {
      document
        .querySelector<HTMLButtonElement>(".headerDocsNav .ns-button")
        ?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <div
      className="headerDocsNav"
      data-open={open}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          return;
        }
        if (!open || event.key !== "Tab") return;
        // The trap loops the trigger and the drawer's links: the DOM order
        // already carries Tab from the trigger to the first link and
        // Shift+Tab from the first link back to the trigger, so only the
        // two escapes need intercepting.
        const drawer = document.getElementById("mobile-docs-drawer");
        const links = Array.from(
          drawer?.querySelectorAll<HTMLElement>("a") ?? [],
        );
        const first = links[0];
        const last = links[links.length - 1];
        const trigger = event.currentTarget.querySelector<HTMLButtonElement>(
          ".ns-button",
        );
        if (!first || !last || !trigger) return;
        if (event.shiftKey && document.activeElement === trigger) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          trigger.focus();
        }
      }}
    >
      <button
        type="button"
        className="headerDocsBackdrop"
        aria-label="Close sidebar"
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />
      <Button
        type="button"
        icon
        variant="outline"
        aria-expanded={open}
        aria-controls="mobile-docs-drawer"
        aria-label={open ? "Close sidebar" : "Open sidebar"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X {...icon} /> : <Menu {...icon} />}
      </Button>
      <div
        id="mobile-docs-drawer"
        className="headerDocsDrawer"
        onClickCapture={(event) => {
          // Tapping the current page's link must still close the drawer.
          if ((event.target as HTMLElement | null)?.closest("a")) {
            setOpen(false);
          }
        }}
      >
        <DocsNav />
      </div>
    </div>
  );
}
