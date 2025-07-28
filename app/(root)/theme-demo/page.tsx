"use client";

import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/lib/theme";

export default function ThemeDemo() {
  const { theme, getThemeColors } = useTheme();
  const colors = getThemeColors();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Theme System Demo</h1>
        </div>

        {/* Current theme info */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Current Theme: {theme}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Background</div>
              <div
                className="h-8 rounded border"
                style={{ backgroundColor: colors.background }}
              ></div>
              <div className="text-xs text-muted-foreground">
                {colors.background}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Primary</div>
              <div
                className="h-8 rounded border"
                style={{ backgroundColor: colors.primary }}
              ></div>
              <div className="text-xs text-muted-foreground">
                {colors.primary}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Secondary</div>
              <div
                className="h-8 rounded border"
                style={{ backgroundColor: colors.secondary }}
              ></div>
              <div className="text-xs text-muted-foreground">
                {colors.secondary}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Card</div>
              <div
                className="h-8 rounded border"
                style={{ backgroundColor: colors.card }}
              ></div>
              <div className="text-xs text-muted-foreground">{colors.card}</div>
            </div>
          </div>
        </div>

        {/* Component examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buttons */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4">Buttons</h3>
            <div className="space-y-3">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              <button className="btn-call">Success Button</button>
              <button className="btn-disconnect">Destructive Button</button>
            </div>
          </div>

          {/* Cards */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4">Cards</h3>
            <div className="space-y-3">
              <div className="card p-4">
                <h4 className="font-medium mb-2">Sample Card</h4>
                <p className="text-sm text-muted-foreground">
                  This is a sample card with the current theme applied.
                </p>
              </div>
              <div className="card-border">
                <div className="card p-4">
                  <h4 className="font-medium mb-2">Bordered Card</h4>
                  <p className="text-sm text-muted-foreground">
                    This card has a gradient border.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form elements */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4">Form Elements</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Text input"
                className="input w-full"
              />
              <select className="input w-full" aria-label="Select an option">
                <option>Select option</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
              <textarea
                placeholder="Textarea"
                className="input w-full h-20"
              ></textarea>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4">Alerts</h3>
            <div className="space-y-3">
              <div className="p-3 rounded bg-success text-success-foreground">
                Success alert
              </div>
              <div className="p-3 rounded bg-destructive text-destructive-foreground">
                Error alert
              </div>
              <div className="p-3 rounded bg-warning text-warning-foreground">
                Warning alert
              </div>
              <div className="p-3 rounded bg-info text-info-foreground">
                Info alert
              </div>
            </div>
          </div>
        </div>

        {/* Gradient examples */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-4">Gradients</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="h-20 rounded-lg"
              style={{ background: colors.gradients.dark }}
            ></div>
            <div
              className="h-20 rounded-lg"
              style={{ background: colors.gradients.blueDark }}
            ></div>
            <div
              className="h-20 rounded-lg"
              style={{ background: colors.gradients.blue }}
            ></div>
          </div>
        </div>

        {/* Theme JSON */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-4">
            Current Theme Configuration
          </h3>
          <pre className="bg-muted p-4 rounded text-xs overflow-auto">
            {JSON.stringify(colors, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
