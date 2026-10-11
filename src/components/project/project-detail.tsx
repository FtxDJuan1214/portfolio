"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Atom,
  BadgeCheck,
  BarChart3,
  Beaker,
  BookOpen,
  Boxes,
  Building2,
  Bug,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  ClipboardCheck,
  ClipboardList,
  Database,
  Download,
  ExternalLink,
  Eye,
  FileDown,
  FileSignature,
  FileText,
  FlaskConical,
  FolderKanban,
  FolderOpen,
  GitBranch,
  Globe,
  GraduationCap,
  Handshake,
  Hash,
  History,
  Home,
  Layers,
  Library,
  Link2,
  Map,
  Maximize2,
  Network,
  Newspaper,
  Package,
  PenLine,
  Play,
  Receipt,
  Route,
  Search,
  Server,
  Share2,
  Shovel,
  ShoppingCart,
  SprayCan,
  ShieldCheck,
  Sprout,
  Table2,
  Tractor,
  Upload,
  UserCog,
  Users,
  UsersRound,
  Wheat,
  X,
} from "lucide-react";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Section } from "@/components/layout/section";
import { useLocale } from "@/components/providers/locale-provider";
import type { ProjectItem } from "@/config/content";
import type { ProjectDetail, ProjectDocument } from "@/config/projects";
import { cn } from "@/lib/utils";

const MODULE_ICONS: Record<string, typeof Building2> = {
  sedes: Building2,
  programas: GraduationCap,
  lineas: Route,
  grupos: Users,
  semilleros: Sprout,
  proyectos: FolderKanban,
  actualizaciones: History,
  lideres: UserCog,
  personas: UsersRound,
  noticias: Newspaper,
  terceros: UsersRound,
  fincas: Tractor,
  lotes: Map,
  cultivos: Wheat,
  convenios: Handshake,
  fertilizantes: FlaskConical,
  semilleros_agro: Sprout,
  gastos: Receipt,
  compras: ShoppingCart,
  stock: Boxes,
  labores: Shovel,
  tareas: ClipboardList,
  "tipos-produccion": Package,
  produccion: Wheat,
  informes: BarChart3,
  agroquimicos: SprayCan,
  "ingredientes-activos": Atom,
  plagas: Bug,
  "proceso-fitosanitario": Beaker,
  planificacion: CalendarDays,
};

const PUBLIC_ICONS = [Home, Newspaper, Hash, Library, Share2];

const FEATURE_ICONS = [Table2, Search, ClipboardCheck, Upload, Eye, Link2, FileDown, Network];

const ROLE_ICONS = [ShieldCheck, PenLine, Users, Sprout];

const INSTALL_ICONS = [Server, FolderOpen, Database, Globe];

type DetailProps = {
  project: ProjectItem;
  detail: ProjectDetail;
};

export function ProjectDetailView({ project, detail }: DetailProps) {
  const { locale } = useLocale();
  const es = locale === "es";

  const stats = detail.stats;

  const [lightbox, setLightbox] = useState<{ group: number; image: number } | null>(null);

  const activeGroup = lightbox ? detail.imageGroups?.[lightbox.group] : undefined;
  const activeImage = activeGroup?.images[lightbox?.image ?? 0];
  const lightboxCount = activeGroup?.images.length ?? 0;

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight" && lightboxCount > 1)
        setLightbox({ group: lightbox.group, image: (lightbox.image + 1) % lightboxCount });
      if (event.key === "ArrowLeft" && lightboxCount > 1)
        setLightbox({
          group: lightbox.group,
          image: (lightbox.image - 1 + lightboxCount) % lightboxCount,
        });
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightbox, lightboxCount]);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Encabezado del caso de estudio                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="noise relative overflow-hidden pt-36 pb-16 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div
          className="pointer-events-none absolute -right-24 top-0 size-[28rem] rounded-full opacity-25 blur-[120px] animate-float"
          style={{ background: "oklch(var(--c-glow) / 0.55)" }}
        />

        <div className="relative mx-auto w-[min(1180px,92vw)]">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 rounded-full border border-line/60 bg-surface/50 px-4 py-2 text-xs text-muted transition-colors hover:border-primary/60 hover:text-primary"
              >
                <ArrowLeft className="size-3.5" />
                {es ? "Volver a proyectos" : "Back to projects"}
              </Link>
              {detail.repository && (
                <a
                  href={detail.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs text-primary transition-colors hover:bg-primary/20"
                >
                  <GitBranch className="size-3.5" />
                  GitHub
                  <ArrowUpRight className="size-3" />
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-8 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              {es ? "Caso de estudio" : "Case study"} · {detail.year}
            </p>
          </Reveal>

          <h1 className="mt-4 max-w-4xl text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
            <SplitText text={project.name} by="char" />
          </h1>

          <Reveal delay={0.16}>
            <p className="mt-4 max-w-2xl text-lg text-gradient font-semibold">
              {detail.subtitle
                ? detail.subtitle[locale]
                : es
                  ? "Semilleros y Grupos de Investigación de la Facultad de Ingeniería"
                  : "Research Groups and Seedbeds of the Engineering Faculty"}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <dt className="text-subtle">{es ? "Cliente" : "Client"}</dt>
                <dd className="text-foreground">{detail.client}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="text-subtle">{es ? "Versión" : "Version"}</dt>
                <dd className="rounded-full bg-primary/12 px-2.5 py-0.5 text-xs text-primary">
                  {detail.version}
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="text-subtle">{es ? "Periodo" : "Period"}</dt>
                <dd className="text-foreground">{project.period}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-8 flex flex-col gap-4 border-l-2 border-primary/40 pl-5">
              {detail.context[locale].map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="max-w-3xl text-pretty leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <ul className="mt-8 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line/60 px-2.5 py-1 text-[0.7rem] text-subtle"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.4}>
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/60 bg-line/40 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label[locale]} className="bg-background/70 px-5 py-5">
                  <dt className="sr-only">{stat.label[locale]}</dt>
                  <dd>
                    <Counter value={String(stat.value)} className="text-gradient block text-3xl font-bold" />
                    <span className="mt-1 block text-[0.7rem] leading-snug text-subtle">{stat.label[locale]}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Mi rol (con espacio para video vertical)                          */}
      {/* ---------------------------------------------------------------- */}
      {detail.contribution && (
        <Section
          id="mi-rol"
          tag={es ? "Mi rol" : "My role"}
          title={es ? "Liderazgo y contribución" : "Leadership & contribution"}
        >
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <Reveal>
                <div className="flex flex-col gap-4 border-l-2 border-accent/40 pl-5">
                  {detail.contribution.paragraphs[locale].map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 24)}
                      className="max-w-3xl text-pretty leading-relaxed text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
              {detail.contribution.highlights && (
                <Reveal delay={0.1}>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {detail.contribution.highlights[locale].map((highlight) => (
                      <motion.li
                        key={highlight}
                        whileHover={{ y: -3, scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 320, damping: 20 }}
                        className="inline-flex cursor-default items-center gap-2 rounded-full border border-line/50 bg-surface-strong/40 px-3.5 py-1.5 text-xs text-muted"
                      >
                        <FileSignature className="size-3.5 text-accent" />
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>

            {detail.contribution.video && (
              <Reveal delay={0.15} className="mx-auto lg:mx-0">
                <figure className="w-[min(16.5rem,72vw)]">
                  <div className="border-gradient glow-primary relative aspect-[9/16] w-full overflow-hidden rounded-card bg-surface-strong/40">
                    {detail.contribution.video.src ? (
                      <video
                        controls
                        preload="metadata"
                        playsInline
                        className="h-full w-full bg-black object-contain"
                        src={detail.contribution.video.src}
                      />
                    ) : (
                      <>
                        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                          <motion.span
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                            className="grid size-14 place-items-center rounded-full bg-primary/12 text-primary"
                          >
                            <Play className="size-6" />
                          </motion.span>
                          <p className="text-xs leading-relaxed text-subtle">
                            {es ? "Video en formato vertical — próximamente" : "Vertical-format video — coming soon"}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  {detail.contribution.video.caption && (
                    <figcaption className="mt-3 text-center text-xs text-subtle">
                      {detail.contribution.video.caption[locale]}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            )}
          </div>
        </Section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Stack técnico                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section
        id="stack-detalle"
        tag={es ? "Tecnología" : "Technology"}
        title={es ? "Stack del proyecto" : "Project stack"}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {detail.stackGroups.map((group, index) => (
            <Reveal key={group.label.es} delay={index * 0.05}>
              <div className="panel h-full rounded-card p-5">
                <h3 className="text-xs uppercase tracking-[0.16em] text-primary">{group.label[locale]}</h3>
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
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Sitio público (solo si aplica)                                    */}
      {/* ---------------------------------------------------------------- */}
      {detail.publicSite && (
        <Section
          id="sitio-publico"
          tag={es ? "Producto" : "Product"}
          title={es ? "El sitio público" : "The public site"}
        >
          <Reveal className="mb-6">
            <p className="max-w-3xl text-sm leading-relaxed text-muted">
              {es
                ? "La fachada web de la facultad: cualquiera puede explorar el ecosistema de investigación sin iniciar sesión."
                : "The faculty's web front: anyone can explore the research ecosystem without logging in."}
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {detail.publicSite.map((sectionItem, index) => {
              const Icon = PUBLIC_ICONS[index % PUBLIC_ICONS.length];
              return (
                <Reveal key={sectionItem.name.es} delay={index * 0.06}>
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="border-gradient panel group h-full rounded-card p-5"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-semibold transition-colors group-hover:text-primary">
                      {sectionItem.name[locale]}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{sectionItem.description[locale]}</p>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </Section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Módulos administrativos                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section
        id="modulos"
        tag={es ? "Desarrollo" : "Development"}
        title={
          detail.modulesHeading
            ? detail.modulesHeading[locale]
            : es
              ? "Módulos construidos"
              : "Built modules"
        }
      >
        <Reveal className="mb-6">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">
            {detail.modulesIntro
              ? detail.modulesIntro[locale]
              : es
                ? "Cada módulo sigue el mismo patrón: tabla dinámica, buscador en vivo, formularios validados y acciones rápidas. Toca cada uno para ver qué incluye."
                : "Every module follows the same pattern: dynamic table, live search, validated forms and quick actions. Tap each one to see what's inside."}
          </p>
        </Reveal>
        <div className="flex flex-col gap-3">
          {detail.modules.map((module, index) => (
            <ModuleAccordion key={module.id} module={module} index={index} defaultOpen={index === 0} />
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Videos de muestra (solo si aplica)                               */}
      {/* ---------------------------------------------------------------- */}
      {detail.videoGroups && detail.videoGroups.length > 0 && (
        <Section
          id="videos"
          tag={es ? "Demostración" : "Demo"}
          title={es ? "El método en acción" : "The method in action"}
        >
          <Reveal className="mb-8">
            <p className="max-w-3xl text-sm leading-relaxed text-muted">
              {es
                ? "Videos reales procesados por el método: se visualizan las personas detectadas, sus trayectorias y los eventos de evasión identificados."
                : "Real videos processed by the method: detected people, their trajectories and the identified evasion events are visualized."}
            </p>
          </Reveal>
          <div className="flex flex-col gap-10">
            {detail.videoGroups.map((group, groupIndex) => (
              <div key={group.id}>
                <Reveal delay={groupIndex * 0.06}>
                  <h3 className="flex items-center gap-2.5 text-base font-semibold">
                    <Clapperboard className="size-4 text-accent" />
                    {group.title[locale]}
                  </h3>
                  {group.description && (
                    <p className="mt-1.5 max-w-2xl text-[0.8rem] leading-relaxed text-subtle">
                      {group.description[locale]}
                    </p>
                  )}
                </Reveal>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {group.videos.map((video, videoIndex) => (
                    <Reveal key={video.url} delay={videoIndex * 0.08}>
                      <figure className="overflow-hidden rounded-card border border-line/60 bg-surface-strong/40">
                        <video
                          controls
                          preload="metadata"
                          playsInline
                          className="aspect-video w-full bg-black"
                        >
                          <source src={video.url} type="video/mp4" />
                        </video>
                        {video.label && (
                          <figcaption className="border-t border-line/60 px-4 py-2.5 text-xs text-subtle">
                            {video.label[locale]}
                          </figcaption>
                        )}
                      </figure>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Galería de imágenes (gráficas, matrices, solo si aplica)          */}
      {/* ---------------------------------------------------------------- */}
      {detail.imageGroups && detail.imageGroups.length > 0 && (
        <Section
          id="resultados"
          tag={es ? "Resultados" : "Results"}
          title={es ? "Experimentos y resultados" : "Experiments and results"}
        >
          <Reveal className="mb-8">
            <p className="max-w-3xl text-sm leading-relaxed text-muted">
              {es
                ? "Gráficas y matrices de confusión generadas durante la exploración de parámetros y la validación del método, tomadas directamente del repositorio."
                : "Charts and confusion matrices generated during the parameter exploration and method validation, taken directly from the repository."}
            </p>
          </Reveal>
          <div className="flex flex-col gap-10">
            {detail.imageGroups.map((group, groupIndex) => (
              <div key={group.id}>
                <Reveal delay={groupIndex * 0.06}>
                  <h3 className="flex items-center gap-2.5 text-base font-semibold">
                    <BarChart3 className="size-4 text-accent" />
                    {group.title[locale]}
                  </h3>
                  {group.description && (
                    <p className="mt-1.5 max-w-3xl text-[0.8rem] leading-relaxed text-subtle">
                      {group.description[locale]}
                    </p>
                  )}
                  {group.metrics && (
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {group.metrics.map((metric) => (
                        <div
                          key={metric.label.es}
                          className="rounded-lg border border-line/60 bg-surface-strong/40 px-3.5 py-2"
                        >
                          <div className="font-mono text-sm font-semibold text-accent">
                            {metric.value}
                          </div>
                          <div className="mt-0.5 text-[0.7rem] uppercase tracking-wide text-subtle">
                            {metric.label[locale]}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Reveal>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {group.images.map((image, imageIndex) => (
                    <Reveal key={image.src} delay={imageIndex * 0.08}>
                      <figure className="group relative overflow-hidden rounded-card border border-line/60 bg-surface-strong/40">
                        <button
                          type="button"
                          onClick={() => setLightbox({ group: groupIndex, image: imageIndex })}
                          className="block w-full cursor-pointer"
                          aria-label={es ? "Ver imagen en pantalla completa" : "View image fullscreen"}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt[locale]}
                            width={image.width}
                            height={image.height}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="h-auto w-full"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => setLightbox({ group: groupIndex, image: imageIndex })}
                          className="absolute right-3 top-3 flex size-8 cursor-pointer items-center justify-center rounded-lg border border-line/60 bg-background/80 text-muted opacity-0 backdrop-blur transition-opacity hover:text-accent group-hover:opacity-100"
                          aria-label={es ? "Ver imagen en pantalla completa" : "View image fullscreen"}
                        >
                          <Maximize2 className="size-4" />
                        </button>
                        {image.caption && (
                          <figcaption className="border-t border-line/60 px-4 py-2.5 text-xs text-subtle">
                            {image.caption[locale]}
                          </figcaption>
                        )}
                      </figure>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Funcionalidades transversales                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section
        id="funcionalidades"
        tag={es ? "Detalles" : "Details"}
        title={es ? "Funcionalidades transversales" : "Cross-cutting features"}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {detail.generalFeatures[locale].map((feature, index) => {
            const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
            return (
              <Reveal key={feature.slice(0, 24)} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="panel h-full rounded-card p-4"
                >
                  <Icon className="size-4 text-accent" />
                  <p className="mt-3 text-[0.8rem] leading-relaxed text-muted">{feature}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Roles (solo si aplica)                                            */}
      {/* ---------------------------------------------------------------- */}
      {detail.roles && (
        <Section id="roles" tag={es ? "Permisos" : "Permissions"} title={es ? "Roles del sistema" : "System roles"}>
          <div className="grid gap-4 md:grid-cols-2">
            {detail.roles.map((role, index) => {
              const Icon = ROLE_ICONS[index % ROLE_ICONS.length];
              const isAdmin = role.id === "admin";
              return (
                <Reveal key={role.id} delay={index * 0.06} className={cn(isAdmin && "md:col-span-2")}>
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={cn(
                      "panel h-full rounded-card p-5 sm:p-6",
                      isAdmin && "border-gradient glow-primary",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "grid size-10 place-items-center rounded-xl",
                          isAdmin ? "bg-primary text-on-primary" : "bg-primary/12 text-primary",
                        )}
                      >
                        <Icon className="size-5" />
                      </span>
                      <h3 className="text-lg font-semibold">{role.name[locale]}</h3>
                      {isAdmin && (
                        <span className="ml-auto rounded-full bg-primary/12 px-2.5 py-1 text-[0.65rem] uppercase tracking-wider text-primary">
                          {es ? "Acceso total" : "Full access"}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{role.scope[locale]}</p>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </Section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Reportes                                                          */}
      {/* ---------------------------------------------------------------- */}
      {detail.reports && detail.install && (
      <Section id="reportes" tag="PDF" title={es ? "Motor de reportes" : "Reporting engine"}>
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="panel h-full rounded-card p-6 sm:p-8">
              <h3 className="text-lg font-semibold">
                {es ? "Reportes generados desde el sistema" : "Reports generated from the system"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {es
                  ? "Un clic basta: el sistema compone y descarga automáticamente el PDF con la información organizada de cada entidad, tanto en formato listado como ficha individual."
                  : "One click is enough: the system automatically composes and downloads the PDF with each entity's organized data, both as a listing and as an individual sheet."}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {detail.reports[locale].map((report) => (
                  <motion.li
                    key={report}
                    whileHover={{ y: -3, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 320, damping: 20 }}
                    className="inline-flex cursor-default items-center gap-2 rounded-full border border-line/50 bg-surface-strong/40 px-3.5 py-1.5 text-xs text-muted"
                  >
                    <FileText className="size-3.5 text-primary" />
                    {report}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="panel h-full rounded-card p-6 sm:p-8">
              <h3 className="text-lg font-semibold">{es ? "Despliegue del sistema" : "System deployment"}</h3>
              <ol className="mt-6 flex flex-col gap-5">
                {detail.install[locale].map((step, index) => {
                  const Icon = INSTALL_ICONS[index % INSTALL_ICONS.length];
                  return (
                    <li key={step.slice(0, 24)} className="flex gap-4">
                      <span className="relative grid size-9 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
                        <Icon className="size-4" />
                        <span className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full bg-primary text-[0.55rem] font-bold text-on-primary">
                          {index + 1}
                        </span>
                      </span>
                      <p className="pt-1.5 text-sm leading-relaxed text-muted">{step}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Documentación (visor PDF)                                         */}
      {/* ---------------------------------------------------------------- */}
      {detail.documents && detail.documents.length > 0 && (
        <Section
          id="documentacion"
          tag={es ? "Documentación" : "Documentation"}
          title={es ? "Explora los manuales" : "Explore the manuals"}
        >
          <DocumentViewer documents={detail.documents} />
        </Section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Equipo y cierre                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16">
        <div className="mx-auto w-[min(1180px,92vw)]">
          <Reveal>
            <div className="panel rounded-card p-6 sm:p-8">
              {detail.team && (
                <>
                  <p className="text-xs uppercase tracking-[0.24em] text-primary">
                    {es ? "Equipo del proyecto" : "Project team"}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {detail.team.map((member) => (
                      <li
                        key={member}
                        className="inline-flex items-center gap-2 rounded-full border border-line/60 px-4 py-2 text-sm text-muted"
                      >
                        <BadgeCheck className="size-4 text-accent" />
                        {member}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <Link
                href="/#projects"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
              >
                <ArrowLeft className="size-4" />
                {es ? "Ver más proyectos" : "See more projects"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-xl"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="flex items-center justify-between gap-4 border-b border-line/50 px-4 py-3 sm:px-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{activeGroup?.title[locale]}</p>
                {activeImage.caption && (
                  <p className="mt-0.5 truncate text-xs text-subtle">
                    {activeImage.caption[locale]}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {lightboxCount > 1 && (
                  <span className="rounded-full border border-line/60 px-3 py-1 font-mono text-xs text-muted">
                    {lightbox.image + 1} / {lightboxCount}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="grid size-9 cursor-pointer place-items-center rounded-full border border-line/60 text-muted transition-colors hover:border-primary/60 hover:text-primary"
                  aria-label={es ? "Cerrar" : "Close"}
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8">
              <motion.div
                key={activeImage.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-full max-w-full"
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt[locale]}
                  width={activeImage.width}
                  height={activeImage.height}
                  sizes="100vw"
                  quality={100}
                  className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
                />
              </motion.div>
              {lightboxCount > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setLightbox({
                        group: lightbox.group,
                        image: (lightbox.image - 1 + lightboxCount) % lightboxCount,
                      });
                    }}
                    className="absolute left-4 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line/60 bg-background/80 text-muted backdrop-blur transition-colors hover:border-primary/60 hover:text-primary"
                    aria-label={es ? "Anterior" : "Previous"}
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setLightbox({
                        group: lightbox.group,
                        image: (lightbox.image + 1) % lightboxCount,
                      });
                    }}
                    className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line/60 bg-background/80 text-muted backdrop-blur transition-colors hover:border-primary/60 hover:text-primary"
                    aria-label={es ? "Siguiente" : "Next"}
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------- */
/* Acordeón de módulos                                                   */
/* -------------------------------------------------------------------- */

function ModuleAccordion({
  module,
  index,
  defaultOpen,
}: {
  module: ProjectDetail["modules"][number];
  index: number;
  defaultOpen: boolean;
}) {
  const { locale } = useLocale();
  const es = locale === "es";
  const [open, setOpen] = useState(defaultOpen);
  const Icon = MODULE_ICONS[module.id] ?? Layers;

  return (
    <Reveal delay={index * 0.04}>
      <article className="panel overflow-hidden rounded-card transition-colors hover:border-primary/45">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex w-full items-center gap-4 p-5 text-left"
        >
          <span className="text-xs font-bold text-subtle">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
            <Icon className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">{module.name[locale]}</span>
              {module.ownership === "full" && (
                <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-primary">
                  {es ? "100% propio" : "100% mine"}
                </span>
              )}
              {module.ownership === "base" && (
                <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-accent">
                  {es ? "Base propia" : "My base"}
                </span>
              )}
            </span>
            <span className="mt-0.5 block truncate text-sm text-muted">{module.description[locale]}</span>
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="grid size-8 shrink-0 place-items-center rounded-full border border-line/60 text-muted"
          >
            <ChevronDown className="size-4" />
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
              {module.features[locale].map((feature, i) => (
                <li
                  key={feature}
                  className={cn(
                    "flex items-center gap-3 px-5 py-2.5 text-sm text-muted",
                    i === module.features[locale].length - 1 && "pb-5",
                  )}
                >
                  <GitBranch className="size-3.5 shrink-0 text-accent" />
                  {feature}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </article>
    </Reveal>
  );
}

/* -------------------------------------------------------------------- */
/* Visor de PDF con pestañas                                             */
/* -------------------------------------------------------------------- */

function DocumentViewer({ documents }: { documents: ProjectDocument[] }) {
  const { locale } = useLocale();
  const es = locale === "es";
  const [activeId, setActiveId] = useState(documents[0].id);
  const doc = documents.find((d) => d.id === activeId) ?? documents[0];

  return (
    <Reveal>
      <div className="border-gradient panel overflow-hidden rounded-card">
        <div className="flex flex-wrap items-center gap-2 border-b border-line/50 bg-surface-strong/40 p-3">
          <div className="flex flex-wrap gap-1.5">
            {documents.map((document) => (
              <button
                key={document.id}
                type="button"
                onClick={() => setActiveId(document.id)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-xs transition-colors",
                  document.id === activeId
                    ? "text-on-primary"
                    : "text-muted hover:text-foreground",
                )}
              >
                {document.id === activeId && (
                  <motion.span
                    layoutId="doc-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                  />
                )}
                <span className="relative inline-flex items-center gap-2">
                  <BookOpen className="size-3.5" />
                  {document.label[locale]}
                  <span className="text-[0.6rem] opacity-70">{document.pages}p</span>
                </span>
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <a
              href={doc.path}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line/60 px-3 py-1.5 text-[0.7rem] text-muted transition-colors hover:border-primary/60 hover:text-primary"
            >
              <ExternalLink className="size-3" />
              {es ? "Nueva pestaña" : "New tab"}
            </a>
            <a
              href={doc.path}
              download
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[0.7rem] font-semibold text-on-primary transition-transform hover:scale-[1.04]"
            >
              <Download className="size-3" />
              {es ? "Descargar" : "Download"}
            </a>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <iframe
              src={`${doc.path}#view=FitH`}
              title={doc.label[locale]}
              loading="lazy"
              className="h-[75vh] w-full bg-surface-strong/30"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-subtle">
        <ArrowUpRight className="size-3.5 text-primary" />
        {es
          ? "El manual de usuario incluye capturas de cada pantalla del sistema."
          : "The user manual includes screenshots of every system screen."}
      </p>
    </Reveal>
  );
}
