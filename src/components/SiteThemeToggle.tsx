"use client";

import { Moon, Sun } from "lucide-react";
import { Button, useTheme } from "@neelshha/ui";
import { useEffect, useState } from "react";
import { icon } from "@/components/icons";

export function SiteThemeToggle({ className }: { className?: string }) {
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
      variant="outline"
      icon
      className={className}
      onClick={() => setTheme(next)}
      aria-label={hint}
    >
      {mounted && resolved === "dark" ? <Moon {...icon} /> : <Sun {...icon} />}
    </Button>
  );
}
