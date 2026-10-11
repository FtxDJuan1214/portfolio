"use client";

import { useRef, type ElementType } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { motionConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { charVariants, wordVariants } from "./variants";

type SplitTextProps = {
  text: string;
  className?: string;
  /**
   * Clase para cada fragmento animado. Necesaria para efectos que dependen
   * del pintado del propio elemento (p. ej. `text-gradient`), ya que los
   * fragmentos con transform no participan del `background-clip` del padre.
   */
  itemClassName?: string;
  /** Granularidad de la animación */
  by?: "char" | "word";
  delay?: number;
  stagger?: number;
  repeat?: boolean;
  as?: ElementType;
};

/**
 * Anima un texto letra a letra o palabra a palabra al entrar en viewport.
 * El texto completo queda en un `sr-only` para no romper la accesibilidad
 * ni el copiado.
 */
export function SplitText({
  text,
  className,
  itemClassName,
  by = "char",
  delay = 0,
  stagger,
  repeat = true,
  as = "span",
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, {
    once: !repeat,
    amount: 0.4,
    margin: motionConfig.viewportMargin,
  });

  const Tag = as as ElementType;

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");
  const step = stagger ?? (by === "char" ? 0.022 : 0.05);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.span;

  let index = 0;

  return (
    <MotionTag
      ref={ref}
      className={cn("inline-block", className)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      aria-label={text}
      style={{ perspective: by === "char" ? 800 : undefined }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className="inline-block whitespace-nowrap"
          aria-hidden
        >
          {by === "word" ? (
            <motion.span
              className={cn("inline-block", itemClassName)}
              variants={wordVariants}
              transition={{ delay: delay + wordIndex * step }}
            >
              {word}
            </motion.span>
          ) : (
            Array.from(word).map((char, charIndex) => {
              const currentDelay = delay + index * step;
              index += 1;
              return (
                <motion.span
                  key={`${char}-${charIndex}`}
                  className={cn("inline-block", itemClassName)}
                  variants={charVariants}
                  transition={{ delay: currentDelay }}
                >
                  {char}
                </motion.span>
              );
            })
          )}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </MotionTag>
  );
}
