import { Toaster } from "sonner";
import type { Metadata } from "next";
import ThemeProvider from "../components/ThemeProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Key2Carrer",
  description: "An AI-powered platform for preparing for mock interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
