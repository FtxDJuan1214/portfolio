"use client";

import { useEffect, useRef } from "react";

export type ScrollDirection = "down" | "up";

const listeners = new Set<(dir: ScrollDirection) => void>();
let current: ScrollDirection = "down";
let lastY = 0;
let bound = false;

function handleScroll() {
  const y = window.scrollY;
  const delta = y - lastY;
  if (Math.abs(delta) < 4) return;
  const next: ScrollDirection = delta > 0 ? "down" : "up";
  lastY = y;
  if (next === current) return;
  current = next;
  listeners.forEach((listener) => listener(next));
}

/**
 * Dirección de scroll compartida por toda la app: un único listener
 * pasivo alimenta a todos los suscriptores, en vez de uno por componente.
 */
export function useScrollDirection(onChange?: (dir: ScrollDirection) => void) {
  const ref = useRef<ScrollDirection>(current);

  useEffect(() => {
    const listener = (dir: ScrollDirection) => {
      ref.current = dir;
      onChange?.(dir);
    };

    listeners.add(listener);

    if (!bound) {
      lastY = window.scrollY;
      window.addEventListener("scroll", handleScroll, { passive: true });
      bound = true;
    }

    return () => {
      listeners.delete(listener);
    };
  }, [onChange]);

  return ref;
}

/** Lee la dirección actual sin suscribirse (para efectos puntuales). */
export function getScrollDirection(): ScrollDirection {
  return current;
}
