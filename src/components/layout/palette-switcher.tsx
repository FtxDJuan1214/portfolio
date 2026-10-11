"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Palette } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { usePalette } from "@/components/providers/palette-provider";
import { cn } from "@/lib/utils";

export function PaletteSwitcher() {
  const { palette, palettes, setPalette } = usePalette();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={t("paletteToggle")}
        aria-expanded={open}
        className="grid size-9 place-items-center rounded-full border border-line/60 bg-surface/60 text-muted transition-colors hover:border-primary/60 hover:text-primary"
      >
        <Palette className="size-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="panel panel-blur absolute right-0 top-12 z-50 w-52 rounded-2xl p-2 shadow-2xl"
          >
            <p className="px-2 pb-2 pt-1 text-[0.65rem] uppercase tracking-[0.18em] text-subtle">
              {t("paletteToggle")}
            </p>
            <ul className="flex flex-col gap-0.5">
              {palettes.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setPalette(item.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs transition-colors",
                      item.id === palette.id
                        ? "bg-primary/12 text-primary"
                        : "text-muted hover:bg-surface-strong/70 hover:text-foreground",
                    )}
                  >
                    <span className="flex -space-x-1">
                      {(["primary", "accent", "tertiary"] as const).map((token) => (
                        <span
                          key={token}
                          className="size-3.5 rounded-full ring-1 ring-black/10"
                          style={{ backgroundColor: `oklch(${item.tokens[token]})` }}
                        />
                      ))}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.id === palette.id && <Check className="size-3.5" />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
