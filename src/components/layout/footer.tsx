"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { scrollToTop } from "@/components/providers/lenis-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { siteConfig } from "@/config/site";

const LINKS = [
  { href: siteConfig.github, label: "GitHub", Icon: Github },
  { href: siteConfig.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${siteConfig.email}`, label: "Email", Icon: Mail },
];

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-line/50 bg-surface/30">
      <div className="mx-auto flex w-[min(1180px,92vw)] flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm">
            © {new Date().getFullYear()} {siteConfig.name}.{" "}
            <span className="text-subtle">{t("rightsReserved")}</span>
          </p>
          <p className="text-xs text-subtle">{t("builtWith")}</p>
        </div>

        <div className="flex items-center gap-2">
          {LINKS.map(({ href, label, Icon }) => (
            <Magnetic key={label} strength={0.35}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-line/60 bg-surface/60 text-muted transition-colors hover:border-primary/60 hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            </Magnetic>
          ))}

          <Magnetic strength={0.35}>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label={t("backToTop")}
              className="grid size-10 place-items-center rounded-full bg-primary text-on-primary transition-transform hover:scale-105"
            >
              <ArrowUp className="size-4" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
