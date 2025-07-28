import themes from "../constants/themes.json";
import React from "react";

export type ThemeMode = "dark" | "white";
export type Theme = typeof themes.dark;

// Theme context and management
export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: ThemeMode = "dark";
  private listeners: Set<(theme: ThemeMode) => void> = new Set();

  private constructor() {
    // Initialize theme from localStorage if available
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as ThemeMode;
      if (savedTheme && (savedTheme === "dark" || savedTheme === "white")) {
        this.currentTheme = savedTheme;
      }
    }
  }

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  getCurrentTheme(): ThemeMode {
    return this.currentTheme;
  }

  getTheme(): Theme {
    return themes[this.currentTheme];
  }

  setTheme(theme: ThemeMode): void {
    if (this.currentTheme === theme) return;

    this.currentTheme = theme;

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }

    // Apply theme to document
    this.applyTheme();

    // Notify listeners
    this.listeners.forEach((listener) => listener(theme));
  }

  toggleTheme(): void {
    this.setTheme(this.currentTheme === "dark" ? "white" : "dark");
  }

  subscribe(listener: (theme: ThemeMode) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private applyTheme(): void {
    if (typeof window === "undefined") return;

    const theme = this.getTheme();
    const root = document.documentElement;

    // Apply CSS custom properties
    Object.entries(theme).forEach(([key, value]) => {
      if (typeof value === "object") {
        // Handle nested objects like gradients and shadows
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          root.style.setProperty(
            `--${key}-${nestedKey}`,
            nestedValue as string
          );
        });
      } else {
        root.style.setProperty(`--${key}`, value as string);
      }
    });
  }

  // Initialize theme on mount
  initialize(): void {
    this.applyTheme();
  }
}

// Export singleton instance
export const themeManager = ThemeManager.getInstance();

// Utility functions
export function getThemeColors(theme: ThemeMode = "dark"): Theme {
  return themes[theme];
}

export function applyThemeToElement(element: HTMLElement, theme: Theme): void {
  Object.entries(theme).forEach(([key, value]) => {
    if (typeof value === "object") {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        element.style.setProperty(
          `--${key}-${nestedKey}`,
          nestedValue as string
        );
      });
    } else {
      element.style.setProperty(`--${key}`, value as string);
    }
  });
}

// React hook for theme management
export function useTheme() {
  const [theme, setTheme] = React.useState<ThemeMode>(
    themeManager.getCurrentTheme()
  );

  React.useEffect(() => {
    const unsubscribe = themeManager.subscribe(setTheme);
    return unsubscribe;
  }, []);

  return {
    theme,
    setTheme: (newTheme: ThemeMode) => themeManager.setTheme(newTheme),
    toggleTheme: () => themeManager.toggleTheme(),
    getThemeColors: () => themeManager.getTheme(),
  };
}
