"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { cx } from "./cx";

function copyText(code: string) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(code);
  }
  const area = document.createElement("textarea");
  area.value = code;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.append(area);
  area.select();
  const ok = document.execCommand("copy");
  area.remove();
  if (!ok) throw new Error("Copy failed");
  return Promise.resolve();
}

function CopyGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="1em"
      height="1em"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="1em"
      height="1em"
      aria-hidden="true"
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export type CodeCopyProps = {
  code: string;
  className?: string | undefined;
};

/** Icon Button key that copies code and flips to a check for a beat. */
export function CodeCopy({ code, className }: CodeCopyProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  return (
    <Button
      type="button"
      variant="outline"
      icon
      className={cx("ns-code-copy", className)}
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={() => {
        copyText(code)
          .then(() => {
            setCopied(true);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), 1400);
          })
          .catch(() => {});
      }}
    >
      {copied ? <CheckGlyph /> : <CopyGlyph />}
    </Button>
  );
}
