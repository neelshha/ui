"use client";

import { useEffect, useState } from "react";
import { Button, type ButtonVariant } from "./button";
import { useTheme } from "./theme-provider";

export type ThemeToggleProps = {
  className?: string;
  /** Square key with a sun or moon glyph instead of text. */
  icon?: boolean;
  /** Button chrome. Solid is the default; outline is the quieter key. */
  variant?: ButtonVariant;
};

function SunGlyph() {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonGlyph() {
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export function ThemeToggle({ className, icon, variant = "solid" }: ThemeToggleProps) {
  const { resolved, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const next = resolved === "dark" ? "light" : "dark";
  const label = mounted ? (resolved === "dark" ? "Dark" : "Light") : "Theme";
  const hint = mounted
    ? `Theme: ${label}. Click for ${next}.`
    : "Theme";

  if (icon) {
    return (
      <Button
        variant={variant}
        icon
        className={className}
        onClick={() => setTheme(next)}
        aria-label={hint}
      >
        {mounted && resolved === "dark" ? <MoonGlyph /> : <SunGlyph />}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => setTheme(next)}
      aria-label={hint}
    >
      {label}
    </Button>
  );
}
