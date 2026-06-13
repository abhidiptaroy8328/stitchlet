import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../../shared/schemas";

type ProjectCardProps = {
  project: Project;
};

const statusLabels: Record<Project["status"], string> = {
  active: "Active",
  paused: "Paused",
  finished: "Finished",
  frogged: "Frogged",
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      className="group block rounded-lg border border-(--border) bg-(--surface) p-3 transition hover:-translate-y-0.5 hover:border-(--accent-pink) hover:bg-(--surface-strong)"
      to={`/projects/${project.id}`}
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-md border border-(--border) bg-(--surface-strong)">
        {project.photoPath ? (
          <img
            alt={project.title}
            className="h-full w-full object-cover"
            src={`/api/projects/${project.id}/photo`}
          />
        ) : null}
        <div className="absolute inset-0 flex items-end justify-between p-3">
          <div className="rounded-md bg-(--chip) px-2 py-1 text-xs font-medium text-(--text)" style={{ backdropFilter: "blur(4px)" }}>
            {statusLabels[project.status]}
          </div>
          {project.pdfFilename ? <FileText className="text-(--accent-purple) drop-shadow" size={20} /> : null}
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-base font-semibold leading-tight group-hover:text-(--accent-pink)">
            {project.title}
          </h2>
          <span className="whitespace-nowrap text-xs text-(--muted)">Updated today</span>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs text-(--muted)">Hook</dt>
            <dd className="mt-1 font-medium">{project.hookSize ?? "Not set"}</dd>
          </div>
          <div>
            <dt className="text-xs text-(--muted)">Yarn</dt>
            <dd className="mt-1 truncate font-medium">{project.yarnWeight ?? project.yarnType ?? "Not set"}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
