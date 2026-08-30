"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { useTheme } from "./theme-provider";

export type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
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

  return (
    <Button
      variant="solid"
      className={className}
      onClick={() => setTheme(next)}
      aria-label={hint}
    >
      {label}
    </Button>
  );
}
