"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { motionConfig } from "@/config/site";

let instance: Lenis | null = null;

/** Navega suavemente a una sección (usa Lenis si está activo). */
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (instance) {
    instance.scrollTo(target, { offset: -72 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Vuelve al inicio de la página. */
export function scrollToTop() {
  if (instance) instance.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Smooth scroll con Lenis. Se desactiva si el usuario prefiere menos
 * movimiento o si `motionConfig.smoothScroll` está en false.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !motionConfig.smoothScroll) return;

    // `lerp` sigue la rueda de forma incremental: mantiene la suavidad pero
    // responde al instante, a diferencia de `duration`, que impone una
    // animación fija a cada gesto y se percibe como retraso.
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1.1 });
    instance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      instance = null;
    };
  }, [reduceMotion]);

  return <>{children}</>;
}
