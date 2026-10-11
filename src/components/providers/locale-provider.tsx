"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { ui, type Locale } from "@/config/content";
import { useStoredValue } from "@/hooks/use-stored-value";

const STORAGE_KEY = "locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  /** Traduce una clave de `ui` al idioma activo */
  t: (key: keyof (typeof ui)["es"]) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useStoredValue(STORAGE_KEY, "en");
  const locale: Locale = stored === "es" ? "es" : "en";

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      setStored(next);
    },
    [setStored],
  );

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale(locale === "es" ? "en" : "es"),
      t: (key) => ui[locale][key] ?? key,
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale debe usarse dentro de LocaleProvider");
  return context;
}
