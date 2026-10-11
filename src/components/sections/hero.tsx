"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { Counter } from "@/components/motion/counter";
import { Magnetic } from "@/components/motion/magnetic";
import { SplitText } from "@/components/motion/split-text";
import { scrollToSection } from "@/components/providers/lenis-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { heroTitles, stats } from "@/config/content";
import { siteConfig } from "@/config/site";

export function Hero() {
  const { locale, t } = useLocale();
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const titles = heroTitles[locale];
  const title = titles[index % titles.length];

  const { scrollYProgress } = useScroll();
  const contentY = useTransform(scrollYProgress, [0, 0.18], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((value) => (value + 1) % titles.length);
    }, 3200);
    return () => clearInterval(id);
  }, [titles.length]);

  return (
    <section
      id="hero"
      className="noise relative flex min-h-svh items-center overflow-hidden pt-28"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div
        className="pointer-events-none absolute -left-32 top-10 size-[38rem] rounded-full opacity-30 blur-[120px] animate-float"
        style={{ background: "oklch(var(--c-glow) / 0.55)" }}
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 size-[30rem] rounded-full opacity-25 blur-[120px] animate-float"
        style={{
          background: "oklch(var(--c-accent) / 0.5)",
          ["--float-duration" as string]: "18s",
        }}
      />

      <motion.div
        className="relative mx-auto w-[min(1180px,92vw)]"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-line/60 bg-surface/50 px-3 py-1.5 text-xs text-muted"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          {t("heroGreeting")}
        </motion.p>

        <h1 className="max-w-4xl text-[clamp(2.4rem,7vw,5.2rem)] font-bold leading-[1.05] tracking-tight">
          <SplitText text={siteConfig.name} by="char" repeat={false} />
        </h1>

        <div className="mt-4 flex h-9 items-center overflow-hidden text-lg text-muted sm:text-2xl">
          <AnimatePresence mode="wait">
            <motion.span
              key={`${locale}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-gradient font-semibold"
            >
              {title}
            </motion.span>
          </AnimatePresence>
          <span className="ml-1 inline-block h-6 w-[2px] bg-primary animate-caret" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex items-center gap-2 text-sm text-subtle"
        >
          <MapPin className="size-4" />
          {siteConfig.location}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="glow-primary rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition-transform hover:scale-[1.03]"
            >
              {t("heroCtaProjects")}
            </button>
          </Magnetic>
          <Magnetic>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {t("heroCtaContact")}
            </button>
          </Magnetic>
          <a
            href={siteConfig.cvPath}
            download
            className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm text-muted transition-colors hover:text-primary"
          >
            <Download className="size-4" />
            {t("downloadCv")}
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/60 bg-line/40 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background/70 px-5 py-5">
              <dt className="sr-only">{t(stat.label)}</dt>
              <dd>
                <Counter
                  value={stat.value}
                  className="text-gradient block text-3xl font-bold"
                />
                <span className="mt-1 block text-[0.7rem] leading-snug text-subtle">
                  {t(stat.label)}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollToSection("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute inset-x-0 bottom-6 mx-auto flex w-fit flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-subtle transition-colors hover:text-primary"
      >
        {t("heroScroll")}
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
