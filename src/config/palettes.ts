/**
 * ============================================================
 *  PALETAS DE COLOR — punto único de configuración visual
 * ============================================================
 *
 * Cambia `SITE_THEME` (abajo del todo) para elegir qué paleta
 * se usa en cada tema. Los valores están en formato OKLCH
 * (`L C H`) porque garantiza contraste perceptualmente uniforme.
 *
 *  - Tema OSCURO  -> paletas moradas  (DARK_PALETTES)
 *  - Tema CLARO   -> paletas verdes   (LIGHT_PALETTES)
 *
 * Para crear una paleta nueva: copia un objeto, cámbiale el `id`
 * y ajusta los tokens. Aparecerá automáticamente en el selector
 * de paletas de la interfaz.
 */

export type PaletteTokens = {
  /** Fondo base de la página */
  background: string;
  /** Fondo de superficies elevadas (tarjetas, popovers) */
  surface: string;
  /** Fondo de superficies con un nivel más de elevación */
  surfaceStrong: string;
  /** Bordes y separadores */
  border: string;
  /** Texto principal */
  foreground: string;
  /** Texto secundario / apoyo */
  muted: string;
  /** Texto terciario / metadatos */
  subtle: string;
  /** Color de marca principal (CTAs, links, énfasis) */
  primary: string;
  /** Texto sobre `primary` */
  onPrimary: string;
  /** Color de acento secundario (gradientes, detalles) */
  accent: string;
  /** Tercer color para gradientes de 3 paradas */
  tertiary: string;
  /** Glow ambiental del fondo (blobs, auroras) */
  glow: string;
};

export type Palette = {
  id: string;
  /** Nombre visible en el selector de paletas */
  label: string;
  tokens: PaletteTokens;
};

/* ------------------------------------------------------------------ */
/*  PALETAS OSCURAS — familia MORADA                                   */
/* ------------------------------------------------------------------ */

export const DARK_PALETTES: Palette[] = [
  {
    id: "amethyst",
    label: "Amatista",
    tokens: {
      background: "0.145 0.028 285",
      surface: "0.185 0.034 286",
      surfaceStrong: "0.225 0.042 287",
      border: "0.305 0.052 288",
      foreground: "0.965 0.008 285",
      muted: "0.755 0.030 288",
      subtle: "0.600 0.036 288",
      primary: "0.720 0.185 305",
      onPrimary: "0.145 0.028 285",
      accent: "0.780 0.145 330",
      tertiary: "0.700 0.150 268",
      glow: "0.620 0.220 300",
    },
  },
  {
    id: "nebula",
    label: "Nébula",
    tokens: {
      background: "0.128 0.038 275",
      surface: "0.172 0.048 276",
      surfaceStrong: "0.212 0.056 277",
      border: "0.300 0.062 280",
      foreground: "0.968 0.010 280",
      muted: "0.760 0.036 282",
      subtle: "0.605 0.042 282",
      primary: "0.700 0.200 288",
      onPrimary: "0.128 0.038 275",
      accent: "0.760 0.160 262",
      tertiary: "0.740 0.150 320",
      glow: "0.600 0.230 285",
    },
  },
  {
    id: "orchid",
    label: "Orquídea",
    tokens: {
      background: "0.155 0.030 300",
      surface: "0.196 0.038 302",
      surfaceStrong: "0.236 0.046 303",
      border: "0.315 0.056 305",
      foreground: "0.970 0.010 300",
      muted: "0.765 0.032 305",
      subtle: "0.612 0.038 305",
      primary: "0.760 0.170 325",
      onPrimary: "0.155 0.030 300",
      accent: "0.735 0.175 292",
      tertiary: "0.790 0.135 350",
      glow: "0.660 0.215 320",
    },
  },
  {
    id: "midnight",
    label: "Medianoche",
    tokens: {
      background: "0.112 0.022 292",
      surface: "0.152 0.030 293",
      surfaceStrong: "0.192 0.038 294",
      border: "0.278 0.048 296",
      foreground: "0.962 0.008 292",
      muted: "0.742 0.028 296",
      subtle: "0.588 0.034 296",
      primary: "0.755 0.155 298",
      onPrimary: "0.112 0.022 292",
      accent: "0.700 0.170 275",
      tertiary: "0.800 0.120 315",
      glow: "0.590 0.200 295",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  PALETAS CLARAS — familia VERDE                                     */
/* ------------------------------------------------------------------ */

export const LIGHT_PALETTES: Palette[] = [
  {
    id: "moss",
    label: "Musgo",
    tokens: {
      background: "0.985 0.010 150",
      surface: "0.965 0.016 150",
      surfaceStrong: "0.938 0.024 152",
      border: "0.878 0.032 152",
      foreground: "0.215 0.045 155",
      muted: "0.428 0.036 155",
      subtle: "0.552 0.030 155",
      primary: "0.480 0.140 158",
      onPrimary: "0.985 0.010 150",
      accent: "0.545 0.130 178",
      tertiary: "0.560 0.140 138",
      glow: "0.760 0.130 160",
    },
  },
  {
    id: "jade",
    label: "Jade",
    tokens: {
      background: "0.988 0.008 170",
      surface: "0.968 0.014 172",
      surfaceStrong: "0.942 0.022 173",
      border: "0.882 0.030 174",
      foreground: "0.205 0.042 175",
      muted: "0.420 0.034 175",
      subtle: "0.545 0.028 175",
      primary: "0.500 0.125 175",
      onPrimary: "0.988 0.008 170",
      accent: "0.535 0.120 196",
      tertiary: "0.545 0.135 152",
      glow: "0.780 0.110 178",
    },
  },
  {
    id: "matcha",
    label: "Matcha",
    tokens: {
      background: "0.982 0.014 128",
      surface: "0.960 0.022 128",
      surfaceStrong: "0.932 0.032 130",
      border: "0.872 0.042 132",
      foreground: "0.228 0.050 138",
      muted: "0.438 0.042 138",
      subtle: "0.558 0.036 138",
      primary: "0.505 0.145 138",
      onPrimary: "0.982 0.014 128",
      accent: "0.560 0.130 160",
      tertiary: "0.575 0.135 118",
      glow: "0.790 0.135 135",
    },
  },
  {
    id: "fern",
    label: "Helecho",
    tokens: {
      background: "0.978 0.012 160",
      surface: "0.955 0.020 162",
      surfaceStrong: "0.925 0.028 163",
      border: "0.862 0.038 164",
      foreground: "0.198 0.048 165",
      muted: "0.412 0.040 165",
      subtle: "0.538 0.034 165",
      primary: "0.455 0.135 165",
      onPrimary: "0.978 0.012 160",
      accent: "0.520 0.125 190",
      tertiary: "0.530 0.140 145",
      glow: "0.750 0.125 168",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  CONFIGURACIÓN ACTIVA                                               */
/* ------------------------------------------------------------------ */

export const SITE_THEME = {
  /** Paleta usada por defecto en tema oscuro (id de DARK_PALETTES) */
  defaultDarkPalette: "amethyst",
  /** Paleta usada por defecto en tema claro (id de LIGHT_PALETTES) */
  defaultLightPalette: "moss",
  /** Tema inicial: "dark" | "light" | "system" ("system" sigue el día/noche del SO) */
  defaultMode: "system" as "dark" | "light" | "system",
  /** Muestra el selector de paletas en la interfaz */
  showPaletteSwitcher: true,
} as const;

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

export const paletteVarNames: Record<keyof PaletteTokens, string> = {
  background: "--c-background",
  surface: "--c-surface",
  surfaceStrong: "--c-surface-strong",
  border: "--c-border",
  foreground: "--c-foreground",
  muted: "--c-muted",
  subtle: "--c-subtle",
  primary: "--c-primary",
  onPrimary: "--c-on-primary",
  accent: "--c-accent",
  tertiary: "--c-tertiary",
  glow: "--c-glow",
};

export function getPalettes(mode: "dark" | "light"): Palette[] {
  return mode === "dark" ? DARK_PALETTES : LIGHT_PALETTES;
}

export function findPalette(mode: "dark" | "light", id: string): Palette {
  const list = getPalettes(mode);
  return list.find((p) => p.id === id) ?? list[0];
}

/** Serializa una paleta a texto CSS (`--c-x: L C H;`) */
export function paletteToCss(palette: Palette): string {
  return (Object.keys(paletteVarNames) as (keyof PaletteTokens)[])
    .map((key) => `${paletteVarNames[key]}: ${palette.tokens[key]};`)
    .join("");
}
