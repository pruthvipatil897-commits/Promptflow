import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  switchable = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (switchable) {
      const stored = localStorage.getItem("theme");
      return stored === "light" || stored === "dark" ? stored : defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const isDark = theme === "system" ? media.matches : theme === "dark";
      root.classList.toggle("dark", isDark);
      root.classList.toggle("light", !isDark);
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      themeColorMeta?.setAttribute("content", isDark ? "#101d20" : "#f7f8f4");
    };
    applyTheme();
    media.addEventListener("change", applyTheme);
    if (switchable) localStorage.setItem("theme", theme);
    return () => media.removeEventListener("change", applyTheme);
  }, [theme, switchable]);

  const toggleTheme = switchable
    ? () => setTheme(previous => previous === "light" ? "dark" : "light")
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
