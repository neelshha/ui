import type { CSSProperties } from "react";

function ident(id: string) {
  return `--ns-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
}

export function triggerAnchorStyle(id: string): CSSProperties {
  return { anchorName: ident(id) } as CSSProperties;
}

export function popoverAnchorStyle(id: string | undefined): CSSProperties {
  if (!id) return {};
  return { positionAnchor: ident(id) } as CSSProperties;
}

export function supportsAnchorPosition() {
  return (
    typeof CSS !== "undefined" &&
    (CSS.supports("position-area: block-end") ||
      CSS.supports("top: anchor(bottom)"))
  );
}

export function placeFromInvoker(node: HTMLElement) {
  if (!node.id || supportsAnchorPosition()) return;
  const invoker = document.querySelector(
    `[popovertarget="${CSS.escape(node.id)}"]`,
  );
  if (!(invoker instanceof HTMLElement)) return;
  const rect = invoker.getBoundingClientRect();
  node.style.top = `${Math.round(rect.bottom + 6)}px`;
  node.style.left = `${Math.round(rect.left)}px`;
}

/**
 * Fallback browsers without CSS anchor positioning get inline placement from
 * placeFromInvoker — but that position goes stale the moment the page is
 * resized or scrolled. This watcher repositions while the popover is open
 * and hands callers an onOpen hook (Menu focuses its first item there).
 * With native anchor support the browser does the work, so this is a no-op.
 */
export function watchPopoverPlacement(
  node: HTMLElement,
  onOpen?: () => void,
) {
  if (supportsAnchorPosition()) return () => {};

  const open = () => {
    placeFromInvoker(node);
    onOpen?.();
  };
  const onToggle = (event: Event) => {
    if ("newState" in event && (event as ToggleEvent).newState === "open") {
      open();
    }
  };
  const onMove = () => {
    if (node.matches(":popover-open")) placeFromInvoker(node);
  };

  node.addEventListener("toggle", onToggle);
  window.addEventListener("resize", onMove);
  // Capture catches scrolls inside inner containers, not just the window.
  window.addEventListener("scroll", onMove, { capture: true, passive: true });
  if (node.matches(":popover-open")) open();

  return () => {
    node.removeEventListener("toggle", onToggle);
    window.removeEventListener("resize", onMove);
    window.removeEventListener("scroll", onMove, { capture: true });
  };
}
