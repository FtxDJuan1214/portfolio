"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/layout/section";
import { useLocale } from "@/components/providers/locale-provider";
import { projects, type ProjectItem } from "@/config/content";
import { projectDetails } from "@/config/projects";
import { cn } from "@/lib/utils";

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const { locale } = useLocale();
  const [open, setOpen] = useState(project.featured);
  const hasDetail = Boolean(projectDetails[project.id]);

  return (
    <Reveal
      delay={index * 0.06}
      className={cn(project.featured && "md:col-span-2")}
    >
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="border-gradient panel group h-full overflow-hidden rounded-card p-5 sm:p-6"
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-subtle">
              {project.period}
            </p>
            <h3 className="mt-1 text-xl font-semibold transition-colors group-hover:text-primary sm:text-2xl">
              {project.name}
            </h3>
          </div>
          {project.featured && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/12 px-2.5 py-1 text-[0.65rem] text-primary">
              <Sparkles className="size-3" />
              {locale === "es" ? "Destacado" : "Featured"}
            </span>
          )}
        </header>

        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
          {project.summary[locale]}
        </p>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary transition-opacity hover:opacity-80"
        >
          {locale === "es" ? "Detalles técnicos" : "Technical details"}
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="size-3.5" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {project.highlights[locale].map((highlight, i) => (
                <li
                  key={i}
                  className={cn(
                    "flex gap-3 text-sm leading-relaxed text-muted",
                    i === 0 && "pt-3",
                  )}
                >
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  {highlight}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line/60 px-2.5 py-1 text-[0.7rem] text-subtle transition-colors group-hover:border-primary/35"
            >
              {tech}
            </li>
          ))}
        </ul>

        {hasDetail && (
          <Link
            href={`/proyectos/${project.id}`}
            className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary transition-all hover:gap-2.5 hover:bg-primary/10"
          >
            {locale === "es" ? "Ver caso de estudio" : "View case study"}
            <ArrowUpRight className="size-3.5" />
          </Link>
        )}
      </motion.article>
    </Reveal>
  );
}

export function Projects() {
  const { t } = useLocale();

  return (
    <Section id="projects" tag={t("projectsTag")} title={t("projectsTitle")}>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
