"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Book,
  Camera,
  Code,
  Coffee,
  Gamepad2,
  Map,
  Mountain,
  Music,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { useLocale } from "@/components/providers/locale-provider";
import { TravelMap } from "@/components/about/travel-map";
import { aboutMe, type AboutMeInterest } from "@/config/about-me";

const ICONS: Record<AboutMeInterest["icon"], LucideIcon> = {
  camera: Camera,
  map: Map,
  music: Music,
  book: Book,
  code: Code,
  coffee: Coffee,
  mountain: Mountain,
  gamepad: Gamepad2,
};

export function AboutMeView() {
  const { locale, t } = useLocale();
  const es = locale === "es";

  return (
    <>
      <section className="noise relative overflow-hidden pt-36 pb-12 sm:pb-16">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div
          className="pointer-events-none absolute -right-24 top-0 size-[28rem] rounded-full opacity-25 blur-[120px] animate-float"
          style={{ background: "oklch(var(--c-glow) / 0.55)" }}
        />

        <div className="relative mx-auto w-[min(1180px,92vw)]">
          <Reveal>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-line/60 bg-surface/50 px-4 py-2 text-xs text-muted transition-colors hover:border-primary/60 hover:text-primary"
            >
              <ArrowLeft className="size-3.5" />
              {es ? "Volver al inicio" : "Back home"}
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-8 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              {t("aboutMeTag")}
            </p>
          </Reveal>

          <h1 className="mt-4 max-w-4xl text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
            <SplitText text={t("aboutMeTitle")} by="char" />
          </h1>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {aboutMe.intro[locale]}
            </p>
          </Reveal>
        </div>
      </section>

      <Section id="sobre-mi" tag={t("aboutTag")} title={t("aboutMeInterests")}>
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div className="space-y-6">
            {aboutMe.paragraphs[locale].map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal direction="left">
            <ul className="panel grid grid-cols-2 gap-1 rounded-card p-3">
              {aboutMe.interests.map((interest) => {
                const Icon = ICONS[interest.icon];
                return (
                  <li key={interest.id}>
                    <span className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted transition-colors hover:bg-surface-strong/60 hover:text-foreground">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary transition-transform group-hover:scale-110">
                        <Icon className="size-4" />
                      </span>
                      <span className="truncate">{interest.label[locale]}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section id="viajes" tag={t("travelTag")} title={t("travelTitle")}>
        <Reveal className="mb-8">
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted">
            {t("travelLead")}
          </p>
        </Reveal>
        <TravelMap />
      </Section>
    </>
  );
}
