"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { motion, useAnimationControls, useInView, useReducedMotion } from "motion/react";
import { motionConfig } from "@/config/site";
import { getScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";
import { createReveal, type RevealDirection } from "./variants";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Dirección fija. Si se omite, sigue la dirección del scroll. */
  direction?: RevealDirection;
  /** Distancia de desplazamiento en px */
  distance?: number;
  delay?: number;
  /** Repite la animación cada vez que el elemento entra/sale del viewport */
  repeat?: boolean;
  as?: ElementType;
};

/**
 * Reveal con trigger de scroll bidireccional: al bajar, el contenido
 * entra desde abajo; al subir, entra desde arriba. Con `repeat` la
 * animación se rejuega en ambos sentidos.
 */
export function Reveal({
  children,
  className,
  direction,
  distance = motionConfig.distance,
  delay = 0,
  repeat = true,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, {
    once: !repeat,
    amount: motionConfig.viewportAmount,
    margin: motionConfig.viewportMargin,
  });
  const controls = useAnimationControls();

  // La dirección se lee al cruzar el viewport, no en render: así el cambio
  // de sentido del scroll no re-renderiza todos los Reveal de la página.
  useEffect(() => {
    if (reduceMotion) return;
    if (inView) {
      controls.start("visible");
      return;
    }
    const from: RevealDirection =
      direction ?? (getScrollDirection() === "down" ? "up" : "down");
    controls.set(createReveal(from, distance).hidden);
  }, [inView, controls, direction, distance, reduceMotion]);

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduceMotion) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      ref={ref}
      className={cn(className)}
      variants={createReveal(direction ?? "up", distance)}
      initial="hidden"
      animate={controls}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
