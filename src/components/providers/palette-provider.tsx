"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useTheme } from "next-themes";
import { useStoredValue } from "@/hooks/use-stored-value";
import {
  DARK_PALETTES,
  LIGHT_PALETTES,
  SITE_THEME,
  findPalette,
  paletteVarNames,
  type Palette,
  type PaletteTokens,
} from "@/config/palettes";

const STORAGE_KEY_DARK = "palette:dark";
const STORAGE_KEY_LIGHT = "palette:light";

type PaletteContextValue = {
  mode: "dark" | "light";
  palette: Palette;
  palettes: Palette[];
  setPalette: (id: string) => void;
};

const PaletteContext = createContext<PaletteContextValue | null>(null);

function applyPalette(palette: Palette) {
  const root = document.documentElement;
  (Object.keys(paletteVarNames) as (keyof PaletteTokens)[]).forEach((key) => {
    root.style.setProperty(paletteVarNames[key], palette.tokens[key]);
  });
}

/**
 * Inyecta las variables OKLCH de la paleta activa en :root y persiste la
 * elección del usuario por separado para tema claro y oscuro.
 */
export function PaletteProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const mode: "dark" | "light" = resolvedTheme === "light" ? "light" : "dark";

  const [darkId, setDarkId] = useStoredValue(
    STORAGE_KEY_DARK,
    SITE_THEME.defaultDarkPalette,
  );
  const [lightId, setLightId] = useStoredValue(
    STORAGE_KEY_LIGHT,
    SITE_THEME.defaultLightPalette,
  );

  const palette = useMemo(
    () => findPalette(mode, mode === "dark" ? darkId : lightId),
    [mode, darkId, lightId],
  );

  useEffect(() => {
    applyPalette(palette);
  }, [palette]);

  const setPalette = useCallback(
    (id: string) => {
      if (mode === "dark") setDarkId(id);
      else setLightId(id);
    },
    [mode, setDarkId, setLightId],
  );

  const value = useMemo<PaletteContextValue>(
    () => ({
      mode,
      palette,
      palettes: mode === "dark" ? DARK_PALETTES : LIGHT_PALETTES,
      setPalette,
    }),
    [mode, palette, setPalette],
  );

  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
}

export function usePalette() {
  const context = useContext(PaletteContext);
  if (!context) throw new Error("usePalette debe usarse dentro de PaletteProvider");
  return context;
}
