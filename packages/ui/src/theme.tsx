export const STORAGE_KEY = "ns-theme";

export type Theme = "light" | "dark" | "system";

export type ResolvedTheme = "light" | "dark";

export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");var r=document.documentElement;var s=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var v=t==="dark"||t==="light"||t==="system"?t:"system";var x=v==="system"?s:v;r.dataset.nsTheme=v;r.dataset.nsResolved=x;if(v==="dark"||v==="light"){r.classList.add(v);r.style.colorScheme=v}}catch(e){}})();`;

export function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === "light" || theme === "dark") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const resolved = resolveTheme(theme);
  root.classList.remove("light", "dark");
  root.dataset.nsTheme = theme;
  root.dataset.nsResolved = resolved;
  if (theme === "light" || theme === "dark") {
    root.classList.add(theme);
    root.style.colorScheme = theme;
    return;
  }
  root.style.removeProperty("color-scheme");
}

export function readTheme(fallback: Theme): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return fallback;
}

export function ThemeScript() {
  return (
    <script id="ns-theme" dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
  );
}
