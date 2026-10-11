"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/layout/section";
import { useLocale } from "@/components/providers/locale-provider";
import { experience } from "@/config/content";

export function Experience() {
  const { locale, t } = useLocale();
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <Section id="experience" tag={t("experienceTag")} title={t("experienceTitle")}>
      <div ref={timelineRef} className="relative pl-8 sm:pl-12">
        <div className="absolute left-[7px] top-2 h-full w-px bg-line/60 sm:left-[15px]" />
        <motion.div
          className="absolute left-[7px] top-2 h-full w-px origin-top bg-gradient-to-b from-primary via-accent to-transparent sm:left-[15px]"
          style={reduceMotion ? { scaleY: 1 } : { scaleY: progress }}
        />

        <div className="flex flex-col gap-12">
          {experience.map((item) => (
            <Reveal key={item.id} className="relative">
              <span className="absolute -left-8 top-2 grid size-4 place-items-center sm:-left-12">
                <span className="size-4 rounded-full border-2 border-primary bg-background" />
                {item.current && (
                  <span className="absolute size-4 animate-ping rounded-full bg-primary/50" />
                )}
              </span>

              <article className="panel rounded-card p-5 transition-colors hover:border-primary/45 sm:p-6">
                <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div>
                    <h3 className="text-lg font-semibold sm:text-xl">
                      {item.role[locale]}
                    </h3>
                    <p className="text-sm text-primary">{item.company}</p>
                  </div>
                  <div className="text-right text-xs text-subtle">
                    <p className="flex items-center justify-end gap-2">
                      {item.current && (
                        <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[0.65rem] text-primary">
                          {t("current")}
                        </span>
                      )}
                      {item.period[locale]}
                    </p>
                    <p className="mt-1">{item.place}</p>
                  </div>
                </header>

                <ul className="mt-4 flex flex-col gap-2">
                  {item.bullets[locale].map((bullet, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {item.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line/60 px-2.5 py-1 text-[0.7rem] text-subtle"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
