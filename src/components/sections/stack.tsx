"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/layout/section";
import { useLocale } from "@/components/providers/locale-provider";
import { stack } from "@/config/content";

const MARQUEE = stack.flatMap((group) => group.items).slice(0, 26);

export function Stack() {
  const { locale, t } = useLocale();

  return (
    <Section id="stack" tag={t("stackTag")} title={t("stackTitle")}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((group, index) => (
          <Reveal key={group.id} delay={index * 0.05}>
            <div className="panel h-full rounded-card p-5">
              <h3 className="text-xs uppercase tracking-[0.16em] text-primary">
                {group.label[locale]}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ y: -3, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 320, damping: 20 }}
                    className="cursor-default rounded-lg border border-line/50 bg-surface-strong/40 px-2.5 py-1 text-[0.72rem] text-muted"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="marquee-mask mt-12 overflow-hidden">
        <div className="animate-marquee flex w-max gap-3">
          {[...MARQUEE, ...MARQUEE].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="whitespace-nowrap rounded-full border border-line/50 px-4 py-2 text-xs text-subtle"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
