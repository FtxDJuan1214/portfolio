"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";
import { SITE_THEME } from "@/config/palettes";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={SITE_THEME.defaultMode}
      enableSystem={SITE_THEME.defaultMode === "system"}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
