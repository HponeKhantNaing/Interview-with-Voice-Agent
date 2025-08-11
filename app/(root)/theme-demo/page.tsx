"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

const ThemeDemo = () => {
  return (
    <div className="min-h-screen p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Enhanced Theme System Demo
        </h1>

        {/* Theme Toggle Section */}
        <section className="mb-12 p-6 bg-card rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Theme Toggle</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <ThemeToggle variant="icon" size="lg" />
            <ThemeToggle variant="switch" />
            <ThemeToggle variant="button" size="lg" />
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="mb-12 p-6 bg-card rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Enhanced Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-primary text-primary-foreground rounded-lg">
              <h3 className="font-semibold">Primary</h3>
              <p className="text-sm opacity-90">#6366f1</p>
            </div>
            <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
              <h3 className="font-semibold">Secondary</h3>
              <p className="text-sm opacity-90">#2d2d2d / #f1f3f4</p>
            </div>
            <div className="p-4 bg-success text-success-foreground rounded-lg">
              <h3 className="font-semibold">Success</h3>
              <p className="text-sm opacity-90">#28a745</p>
            </div>
            <div className="p-4 bg-destructive text-destructive-foreground rounded-lg">
              <h3 className="font-semibold">Destructive</h3>
              <p className="text-sm opacity-90">#dc3545</p>
            </div>
          </div>
        </section>

        {/* Text Contrast Examples */}
        <section className="mb-12 p-6 bg-card rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Text Contrast Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Primary Text</h3>
              <p className="text-foreground">
                This is the main text color that adapts to the theme.
              </p>
              <p className="text-muted-foreground">
                This is muted text for secondary information.
              </p>
              <p className="text-primary">This is primary colored text.</p>
              <p className="text-success">This is success colored text.</p>
              <p className="text-destructive">
                This is destructive colored text.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Headings</h3>
              <h1 className="text-4xl font-bold">Heading 1</h1>
              <h2 className="text-3xl font-semibold">Heading 2</h2>
              <h3 className="text-2xl font-semibold">Heading 3</h3>
              <h4 className="text-xl font-semibold">Heading 4</h4>
            </div>
          </div>
        </section>

        {/* Button Examples */}
        <section className="mb-12 p-6 bg-card rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Enhanced Button Examples
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button className="btn-primary">Primary Button</Button>
            <Button className="btn-secondary">Secondary Button</Button>
            <Button className="btn-call">Call Button</Button>
            <Button className="btn-disconnect">Disconnect Button</Button>
          </div>
        </section>

        {/* Card Examples */}
        <section className="mb-12 p-6 bg-card rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Card Examples with Better Contrast
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-2">Card Title</h3>
              <p className="text-muted-foreground mb-4">
                This card demonstrates improved text contrast. The background
                and text colors are carefully chosen for optimal readability in
                both light and dark themes.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-primary text-primary-foreground rounded text-sm">
                  Primary
                </span>
                <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">
                  Secondary
                </span>
              </div>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-2">Interactive Card</h3>
              <p className="text-muted-foreground mb-4">
                Notice how all text elements maintain proper contrast ratios.
                This ensures accessibility and readability across all devices
                and lighting conditions.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-success text-success-foreground rounded text-sm">
                  Success
                </span>
                <span className="px-2 py-1 bg-destructive text-destructive-foreground rounded text-sm">
                  Error
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Form Example */}
        <section className="mb-12 p-6 bg-card rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Form Example with Enhanced Contrast
          </h2>
          <form className="form space-y-4">
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="input w-full"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input w-full"
              />
            </div>
            <div>
              <label className="label">Select Option</label>
              <select className="input w-full">
                <option>Choose an option</option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <button type="submit" className="btn">
              Submit Form
            </button>
          </form>
        </section>

        {/* Background Pattern Demo */}
        <section className="mb-12 p-6 bg-card rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Enhanced Background Pattern
          </h2>
          <div className="h-32 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.15)_0%,transparent_50%),radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.15)_0%,transparent_50%)]"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <p className="text-foreground font-medium">
                Subtle background pattern with better contrast
              </p>
            </div>
          </div>
        </section>

        {/* Gradient Examples */}
        <section className="mb-12 p-6 bg-card rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Enhanced Gradient Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-24 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-white font-semibold">Primary Gradient</span>
            </div>
            <div className="h-24 rounded-lg bg-gradient-to-br from-success to-success/80 flex items-center justify-center">
              <span className="text-white font-semibold">Success Gradient</span>
            </div>
            <div className="h-24 rounded-lg bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center">
              <span className="text-white font-semibold">
                Destructive Gradient
              </span>
            </div>
          </div>
        </section>

        {/* Accessibility Features */}
        <section className="mb-12 p-6 bg-card rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Accessibility Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Focus States</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Focus this input"
                  className="input w-full"
                />
                <button className="btn-primary">Focusable Button</button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Color Contrast</h3>
              <div className="space-y-2">
                <p className="text-foreground">✓ High contrast text</p>
                <p className="text-muted-foreground">
                  ✓ Proper muted text contrast
                </p>
                <p className="text-primary">✓ Accessible primary color</p>
                <p className="text-success">✓ Accessible success color</p>
              </div>
            </div>
          </div>
        </section>

        {/* Theme Comparison */}
        <section className="mb-12 p-6 bg-card rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Theme Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-card border border-border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Dark Theme</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Dark background (#0a0a0a)</li>
                <li>• White text (#ffffff)</li>
                <li>• High contrast cards</li>
                <li>• Subtle background patterns</li>
              </ul>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Light Theme</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Light background (#ffffff)</li>
                <li>• Dark text (#1a1a1a)</li>
                <li>• Soft contrast cards</li>
                <li>• Gentle background patterns</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ThemeDemo;
