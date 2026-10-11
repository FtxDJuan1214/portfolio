"use client";

import { motion } from "motion/react";
import { useLocale } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/config/content";

const OPTIONS: Locale[] = ["es", "en"];

export function LocaleToggle() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t("langToggle")}
      className="relative flex items-center rounded-full border border-line/60 bg-surface/60 p-0.5"
    >
      {OPTIONS.map((option) => {
        const active = option === locale;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLocale(option)}
            aria-pressed={active}
            className={cn(
              "relative rounded-full px-2.5 py-1 text-[0.7rem] uppercase tracking-wider transition-colors",
              active ? "text-on-primary" : "text-subtle hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId="locale-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
