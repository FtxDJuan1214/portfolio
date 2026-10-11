"use client";

import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/layout/section";
import { useLocale } from "@/components/providers/locale-provider";
import { about } from "@/config/content";
import { siteConfig } from "@/config/site";

const CONTACT = [
  { href: `mailto:${siteConfig.email}`, label: siteConfig.email, Icon: Mail },
  { href: `tel:${siteConfig.phoneHref}`, label: siteConfig.phone, Icon: Phone },
  { href: siteConfig.github, label: siteConfig.githubUser, Icon: Github },
  { href: siteConfig.linkedin, label: "LinkedIn", Icon: Linkedin },
];

export function About() {
  const { locale, t } = useLocale();

  return (
    <Section id="about" tag={t("aboutTag")} title={t("aboutTitle")}>
      <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-6">
          {about[locale].map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.08}>
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <Parallax offset={34}>
          <Reveal direction="left">
            <ul className="panel flex flex-col gap-1 rounded-card p-3">
              {CONTACT.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted transition-colors hover:bg-surface-strong/60 hover:text-foreground"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary transition-transform group-hover:scale-110">
                      <Icon className="size-4" />
                    </span>
                    <span className="truncate">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </Parallax>
      </div>
    </Section>
  );
}
