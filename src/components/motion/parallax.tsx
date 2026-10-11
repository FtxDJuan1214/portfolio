"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Desplazamiento total en px a lo largo del recorrido por el viewport */
  offset?: number;
  /** Suaviza el seguimiento con un muelle */
  smooth?: boolean;
};

export function Parallax({
  children,
  className,
  offset = 60,
  smooth = true,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothed = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.4 });
  const y = smooth ? smoothed : raw;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
