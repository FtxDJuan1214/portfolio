import type { Variants } from "motion/react";
import { motionConfig } from "@/config/site";

const { duration, ease, distance, stagger } = motionConfig;

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

function offsetFor(direction: RevealDirection, amount: number) {
  switch (direction) {
    case "up":
      return { y: amount, x: 0 };
    case "down":
      return { y: -amount, x: 0 };
    case "left":
      return { x: amount, y: 0 };
    case "right":
      return { x: -amount, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

/**
 * Reveal bidireccional: el elemento entra desde la dirección natural del
 * scroll, así que al bajar aparece desde abajo y al subir desde arriba.
 */
export function createReveal(
  direction: RevealDirection = "up",
  amount: number = distance,
): Variants {
  const offset = offsetFor(direction, amount);
  return {
    hidden: {
      opacity: 0,
      ...offset,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, ease },
    },
  };
}

export const revealUp = createReveal("up");

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  },
};

export const charVariants: Variants = {
  hidden: { opacity: 0, y: "0.55em", rotateX: -70 },
  visible: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    transition: { duration: 0.55, ease },
  },
};

export const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.6, ease },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease },
  },
};
