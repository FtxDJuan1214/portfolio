"use client";

import { useCallback, useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

/**
 * Preferencia persistida en localStorage. El snapshot del servidor devuelve
 * el fallback y el cliente sincroniza tras hidratar, así que no hace falta
 * escribir estado desde un efecto.
 */
export function useStoredValue(key: string, fallback: string) {
  const value = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key) ?? fallback,
    () => fallback,
  );

  const setValue = useCallback(
    (next: string) => {
      localStorage.setItem(key, next);
      listeners.forEach((listener) => listener());
    },
    [key],
  );

  return [value, setValue] as const;
}
