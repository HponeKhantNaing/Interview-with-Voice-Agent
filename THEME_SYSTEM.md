# Theme System Documentation

## Overview

This project implements a comprehensive theme system that allows easy switching between dark and white modes, with all theme configurations stored in an external JSON file for easy maintenance and customization.

## Features

- **External JSON Configuration**: All theme colors and styles are defined in `constants/themes.json`
- **Easy Theme Switching**: Toggle between dark and white modes with a single click
- **Persistent Storage**: Theme preference is saved in localStorage
- **Multiple Toggle Variants**: Button, icon, and switch styles available
- **Reusable Components**: Theme system can be used throughout the entire application
- **Type Safety**: Full TypeScript support with proper type definitions

## File Structure

```
├── constants/
│   └── themes.json          # Theme configuration
├── lib/
│   └── theme.ts             # Theme management utilities
├── components/
│   ├── ThemeToggle.tsx      # Theme toggle component
│   └── ThemeProvider.tsx    # Theme provider wrapper
└── app/
    └── (root)/
        └── theme-demo/
            └── page.tsx     # Demo page showcasing themes
```

## Usage

### 1. Basic Theme Toggle

```tsx
import ThemeToggle from '@/components/ThemeToggle';

// Simple icon toggle
<ThemeToggle variant="icon" size="md" />

// Button with text
<ThemeToggle variant="button" size="lg" />

// Switch style
<ThemeToggle variant="switch" />
```

### 2. Using Theme in Components

```tsx
import { useTheme } from "@/lib/theme";

function MyComponent() {
  const { theme, toggleTheme, getThemeColors } = useTheme();
  const colors = getThemeColors();

  return (
    <div style={{ backgroundColor: colors.background }}>
      <h1 style={{ color: colors.foreground }}>Current theme: {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### 3. Accessing Theme Colors

```tsx
import { getThemeColors } from "@/lib/theme";

// Get colors for a specific theme
const darkColors = getThemeColors("dark");
const whiteColors = getThemeColors("white");

// Use in your components
<div style={{ backgroundColor: darkColors.primary }}>Content</div>;
```

## Theme Configuration

### Adding New Themes

1. **Update `constants/themes.json`**:

```json
{
  "dark": {
    /* existing dark theme */
  },
  "white": {
    /* existing white theme */
  },
  "custom": {
    "background": "#your-color",
    "foreground": "#your-color"
    // ... add all required properties
  }
}
```

2. **Update TypeScript types** in `lib/theme.ts`:

```typescript
export type ThemeMode = "dark" | "white" | "custom";
```

### Theme Properties

Each theme must include these properties:

#### Core Colors

- `background`: Main background color
- `foreground`: Main text color
- `card`: Card background color
- `cardForeground`: Card text color
- `popover`: Popover background color
- `popoverForeground`: Popover text color

#### Interactive Colors

- `primary`: Primary action color
- `primaryForeground`: Text on primary background
- `secondary`: Secondary action color
- `secondaryForeground`: Text on secondary background
- `muted`: Muted background color
- `mutedForeground`: Muted text color
- `accent`: Accent color
- `accentForeground`: Text on accent background

#### Status Colors

- `destructive`: Error/danger color
- `destructiveForeground`: Text on destructive background
- `success`: Success color
- `successForeground`: Text on success background
- `warning`: Warning color
- `warningForeground`: Text on warning background
- `info`: Info color
- `infoForeground`: Text on info background

#### Form Colors

- `border`: Border color
- `input`: Input background color
- `ring`: Focus ring color

#### Sidebar Colors

- `sidebar`: Sidebar background
- `sidebarForeground`: Sidebar text
- `sidebarPrimary`: Sidebar primary color
- `sidebarPrimaryForeground`: Text on sidebar primary
- `sidebarAccent`: Sidebar accent color
- `sidebarAccentForeground`: Text on sidebar accent
- `sidebarBorder`: Sidebar border color
- `sidebarRing`: Sidebar focus ring color

#### Gradients

- `gradients.dark`: Dark gradient
- `gradients.blueDark`: Blue dark gradient
- `gradients.blue`: Blue gradient
- `gradients.border`: Border gradient

#### Shadows

- `shadows.sm`: Small shadow
- `shadows.md`: Medium shadow
- `shadows.lg`: Large shadow
- `shadows.xl`: Extra large shadow

## CSS Integration

The theme system automatically applies CSS custom properties to the document root. You can use these in your CSS:

```css
.my-component {
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
}

.my-button {
  background-color: var(--primary);
  color: var(--primary-foreground);
}
```

## Customization Examples

### 1. Adding a New Theme Variant

```json
{
  "dark": {
    /* existing */
  },
  "white": {
    /* existing */
  },
  "purple": {
    "background": "#1a1a2e",
    "foreground": "#ffffff",
    "primary": "#a855f7",
    "primaryForeground": "#ffffff"
    // ... add all other properties
  }
}
```

### 2. Creating Custom Theme Toggle

```tsx
import { useTheme } from "@/lib/theme";

function CustomThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme("dark")}
        className={theme === "dark" ? "active" : ""}
      >
        Dark
      </button>
      <button
        onClick={() => setTheme("white")}
        className={theme === "white" ? "active" : ""}
      >
        Light
      </button>
    </div>
  );
}
```

### 3. Theme-Aware Components

```tsx
import { useTheme } from "@/lib/theme";

function ThemeAwareCard({ children }) {
  const { getThemeColors } = useTheme();
  const colors = getThemeColors();

  return (
    <div
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: colors.card,
        color: colors.cardForeground,
        borderColor: colors.border,
      }}
    >
      {children}
    </div>
  );
}
```

## Best Practices

1. **Always use theme variables** instead of hardcoded colors
2. **Test both themes** when developing new components
3. **Use semantic color names** in your theme configuration
4. **Keep gradients and shadows consistent** across themes
5. **Document any new theme properties** you add

## Troubleshooting

### Theme not applying

- Ensure `ThemeProvider` is wrapping your app
- Check that `themeManager.initialize()` is called
- Verify CSS custom properties are being set correctly

### Colors not updating

- Make sure all required properties are defined in your theme
- Check that the property names match exactly
- Verify the color values are valid CSS colors

### Performance issues

- The theme system uses a singleton pattern for efficiency
- Theme changes are batched and applied once per change
- localStorage operations are minimal and non-blocking

## Demo

Visit `/theme-demo` to see the theme system in action with various components and color previews.
