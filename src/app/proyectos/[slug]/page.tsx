import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/project/project-detail";
import { projects } from "@/config/content";
import { projectDetails } from "@/config/projects";

export function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  const detail = projectDetails[slug];
  if (!project || !detail) return {};

  return {
    title: `${project.name} — Proyecto`,
    description: project.summary.es,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  const detail = projectDetails[slug];
  if (!project || !detail) notFound();

  return <ProjectDetailView project={project} detail={detail} />;
}
