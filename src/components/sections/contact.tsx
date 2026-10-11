"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Download, Github, Linkedin, Mail } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { useLocale } from "@/components/providers/locale-provider";
import { siteConfig } from "@/config/site";

export function Contact() {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="noise relative scroll-mt-24 overflow-hidden py-28 sm:py-36">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-14rem] mx-auto size-[42rem] rounded-full opacity-25 blur-[130px] animate-float"
        style={{ background: "oklch(var(--c-glow) / 0.6)" }}
      />

      <div className="relative mx-auto flex w-[min(1180px,92vw)] flex-col items-center text-center">
        <Reveal>
          <span className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            {t("contactTag")}
          </span>
        </Reveal>

        <h2 className="mt-5 text-[clamp(2rem,6vw,4.2rem)] font-bold leading-tight tracking-tight">
          <SplitText
            text={t("contactTitle")}
            by="word"
            itemClassName="text-gradient pb-[0.14em] -mb-[0.14em]"
          />
        </h2>

        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
            {t("contactLead")}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${siteConfig.email}`}
                className="glow-primary inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition-transform hover:scale-[1.03]"
              >
                <Mail className="size-4" />
                {siteConfig.email}
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-muted transition-colors hover:border-primary hover:text-primary"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "ok" : "copy"}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                  className="grid place-items-center"
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </motion.span>
              </AnimatePresence>
              {copied ? t("copied") : t("copyEmail")}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm text-subtle">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Github className="size-4" />
              GitHub
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </a>
            <a
              href={siteConfig.cvPath}
              download
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Download className="size-4" />
              {t("downloadCv")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
