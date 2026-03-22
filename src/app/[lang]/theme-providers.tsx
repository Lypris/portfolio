"use client";

import * as React from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("light");
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const classTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    const initialTheme: Theme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : classTheme;

    applyTheme(initialTheme);
    setThemeState(initialTheme);
    setIsReady(true);
  }, []);

  React.useEffect(() => {
    if (!isReady) return;

    applyTheme(theme);
    window.localStorage.setItem("theme", theme);
  }, [theme, isReady]);

  const setTheme = React.useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ resolvedTheme: theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}