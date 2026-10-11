"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  tag: string;
  title: string;
  children: ReactNode;
  className?: string;
};

/** Envoltura de sección con encabezado animado consistente. */
export function Section({ id, tag, title, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-24 sm:py-32", className)}
    >
      <div className="mx-auto w-[min(1180px,92vw)]">
        <Reveal className="mb-12 flex flex-col gap-3 sm:mb-16">
          <span className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            {tag}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            <SplitText text={title} by="char" />
          </h2>
          <span className="h-px w-24 bg-gradient-to-r from-primary to-transparent" />
        </Reveal>
        {children}
      </div>
    </section>
  );
}
