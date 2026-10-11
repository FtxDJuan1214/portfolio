"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { LocaleToggle } from "@/components/layout/locale-toggle";
import { PaletteSwitcher } from "@/components/layout/palette-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { scrollToSection } from "@/components/providers/lenis-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { SITE_THEME } from "@/config/palettes";
import { navSections, siteConfig } from "@/config/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

export function Header() {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Un sentinel evita escuchar el scroll sólo para saber si pasamos 24px.
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:24px;height:1px;width:1px;";
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    if (isHome) scrollToSection(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-primary via-accent to-tertiary"
        style={{ scaleX: progress }}
      />

      <div className="mx-auto flex h-14 w-[min(1180px,92vw)] items-center justify-between gap-4">
        {isHome ? (
          <button
            type="button"
            onClick={() => go("hero")}
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors",
              scrolled && "panel panel-blur",
            )}
          >
            <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-[0.7rem] font-bold text-on-primary">
              {siteConfig.initials}
            </span>
            <span className="hidden text-sm font-semibold sm:inline">
              {siteConfig.shortName}
            </span>
          </button>
        ) : (
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors",
              scrolled && "panel panel-blur",
            )}
          >
            <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-[0.7rem] font-bold text-on-primary">
              {siteConfig.initials}
            </span>
            <span className="hidden text-sm font-semibold sm:inline">
              {siteConfig.shortName}
            </span>
          </Link>
        )}

        {isHome ? (
          <nav
            className={cn(
              "hidden items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 lg:flex",
              scrolled ? "panel panel-blur" : "border border-transparent",
            )}
          >
            {navSections.map((section) => {
              const isActive = active === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => go(section.id)}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-xs transition-colors",
                    isActive ? "text-primary" : "text-muted hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary/12"
                      transition={{ type: "spring", stiffness: 340, damping: 30 }}
                    />
                  )}
                  <span className="relative">
                    {locale === "es" ? section.labelEs : section.labelEn}
                  </span>
                </button>
              );
            })}
            <Link
              href="/sobre-mi"
              className="rounded-full px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground"
            >
              {t("aboutMeLink")}
            </Link>
          </nav>
        ) : (
          <nav className="hidden items-center gap-1 rounded-full px-2 py-1.5 panel panel-blur lg:flex">
            {navSections.map((section) => (
              <Link
                key={section.id}
                href={`/#${section.id}`}
                className="rounded-full px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground"
              >
                {locale === "es" ? section.labelEs : section.labelEn}
              </Link>
            ))}
            <Link
              href="/sobre-mi"
              className={cn(
                "rounded-full px-3 py-1.5 text-xs transition-colors",
                pathname === "/sobre-mi"
                  ? "bg-primary/12 text-primary"
                  : "text-muted hover:text-foreground",
              )}
            >
              {t("aboutMeLink")}
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-2">
          <LocaleToggle />
          {SITE_THEME.showPaletteSwitcher && <PaletteSwitcher />}
          <ThemeToggle />
          {isHome ? (
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("menu")}
              className="grid size-9 place-items-center rounded-full border border-line/60 bg-surface/60 text-muted transition-colors hover:border-primary/60 hover:text-primary lg:hidden"
            >
              <Menu className="size-4" />
            </button>
          ) : (
            <Link
              href="/#projects"
              aria-label={t("menu")}
              className="grid size-9 place-items-center rounded-full border border-line/60 bg-surface/60 text-muted transition-colors hover:border-primary/60 hover:text-primary lg:hidden"
            >
              <Menu className="size-4" />
            </Link>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && isHome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-14 w-[min(1180px,92vw)] items-center justify-end py-4 mx-auto">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("close")}
                className="grid size-9 place-items-center rounded-full border border-line/60 bg-surface/60 text-muted"
              >
                <X className="size-4" />
              </button>
            </div>
            <nav className="mx-auto flex w-[min(1180px,92vw)] flex-col gap-1 pt-8">
              {navSections.map((section, index) => (
                <motion.button
                  key={section.id}
                  type="button"
                  onClick={() => go(section.id)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 + index * 0.05,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    "flex items-baseline gap-4 border-b border-line/40 py-4 text-left text-2xl transition-colors",
                    active === section.id
                      ? "text-primary"
                      : "text-foreground hover:text-primary",
                  )}
                >
                  <span className="text-xs text-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {locale === "es" ? section.labelEs : section.labelEn}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.05 + navSections.length * 0.05,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href="/sobre-mi"
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-line/40 py-4 text-left text-2xl text-foreground transition-colors hover:text-primary"
                >
                  <span className="text-xs text-subtle">
                    {String(navSections.length + 1).padStart(2, "0")}
                  </span>
                  {t("aboutMeLink")}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
