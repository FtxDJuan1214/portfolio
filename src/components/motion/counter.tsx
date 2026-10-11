"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type CounterProps = {
  /** Valor con sufijos opcionales, p. ej. "6+" */
  value: string;
  className?: string;
  duration?: number;
};

/** Cuenta desde cero hasta el número contenido en `value` al entrar en vista. */
export function Counter({ value, className, duration = 1.4 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState("0");

  const target = Number.parseFloat(value) || 0;
  const suffix = value.replace(/[\d.,]/g, "");

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest).toString()),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, target, duration]);

  return (
    <span ref={ref} className={className}>
      {reduceMotion ? value : `${display}${suffix}`}
    </span>
  );
}
