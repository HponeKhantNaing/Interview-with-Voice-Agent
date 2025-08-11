import themes from "../constants/themes.json";
import React from "react";

export type ThemeMode = "light";
export type Theme = typeof themes.light;

// Theme context and management - Light mode only
export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: ThemeMode = "light";
  private listeners: Set<(theme: ThemeMode) => void> = new Set();

  private constructor() {
    // Always initialize with light theme
    this.currentTheme = "light";
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
    // Only allow light theme
    if (theme !== "light") return;

    if (this.currentTheme === theme) return;

    this.currentTheme = theme;

    // Apply theme to document
    this.applyTheme();

    // Notify listeners
    this.listeners.forEach((listener) => listener(theme));
  }

  toggleTheme(): void {
    // No toggle functionality - always light mode
    return;
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

    // Set theme class on body
    document.body.className = document.body.className.replace(/theme-\w+/g, "");
    document.body.classList.add(`theme-light`);
  }

  // Initialize theme on mount
  initialize(): void {
    this.applyTheme();
  }
}

// Export singleton instance
export const themeManager = ThemeManager.getInstance();

// Utility functions
export function getThemeColors(theme: ThemeMode = "light"): Theme {
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
