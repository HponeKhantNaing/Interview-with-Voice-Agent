"use client";

import React, { useEffect } from "react";
import { themeManager } from "../lib/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // Initialize theme on mount
    themeManager.initialize();
  }, []);

  return <>{children}</>;
}
