"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  STORAGE_KEY,
  applyTheme,
  readTheme,
  resolveTheme,
  type ResolvedTheme,
  type Theme,
} from "./theme";

export type { Theme } from "./theme";

type ThemeContextValue = {
  theme: Theme;
  resolved: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: {
  children: ReactNode;
  defaultTheme?: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolved, setResolved] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const next = readTheme(defaultTheme);
    setThemeState(next);
    applyTheme(next);
    setResolved(resolveTheme(next));

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      setThemeState((current) => {
        if (current === "system") {
          applyTheme("system");
          setResolved(media.matches ? "dark" : "light");
        }
        return current;
      });
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [defaultTheme]);

  const setTheme = (next: Theme) => {
    // Storage can throw in private modes; the toggle must still work.
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Keep the in-memory theme even when the write is refused.
    }
    setThemeState(next);
    applyTheme(next);
    setResolved(resolveTheme(next));
  };

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return value;
}
