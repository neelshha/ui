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
