"use client";

import { GraduationCap } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/layout/section";
import { useLocale } from "@/components/providers/locale-provider";
import { education } from "@/config/content";

export function Education() {
  const { locale, t } = useLocale();

  return (
    <Section id="education" tag={t("educationTag")} title={t("educationTitle")}>
      <div className="grid gap-4 md:grid-cols-3">
        {education.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.07}>
            <article className="panel flex h-full flex-col gap-3 rounded-card p-5 transition-colors hover:border-primary/45">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary">
                <GraduationCap className="size-5" />
              </span>
              <h3 className="text-base font-semibold leading-snug">
                {item.title[locale]}
              </h3>
              <p className="text-sm text-primary">{item.institution}</p>
              <p className="mt-auto flex items-center gap-2 text-xs text-subtle">
                {item.current && (
                  <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[0.65rem] text-primary">
                    {t("current")}
                  </span>
                )}
                {item.period[locale]}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
