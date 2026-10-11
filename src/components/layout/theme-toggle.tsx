"use client";

import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useLocale } from "@/components/providers/locale-provider";

const CYCLE = ["system", "light", "dark"] as const;
type ThemeOption = (typeof CYCLE)[number];

const ICONS = { system: SunMoon, light: Sun, dark: Moon } as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLocale();
  // next-themes no expone el tema hasta hidratar: hasta entonces no pintamos
  // el icono para evitar desajustes de hidratación.
  const current: ThemeOption = (theme as ThemeOption) ?? "system";
  const Icon = ICONS[current];
  const label =
    current === "system"
      ? t("themeAuto")
      : current === "light"
        ? t("themeLight")
        : t("themeDark");

  return (
    <button
      type="button"
      onClick={() => setTheme(CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length])}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center overflow-hidden rounded-full border border-line/60 bg-surface/60 text-muted transition-colors hover:border-primary/60 hover:text-primary"
    >
      {theme && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="grid place-items-center"
          >
            <Icon className="size-4" />
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
