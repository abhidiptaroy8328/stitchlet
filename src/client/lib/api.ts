import type { CreateProjectInput, Project, UpdateProjectInput } from "../../shared/schemas";

type ProjectsResponse = {
  projects: Project[];
};

type ProjectResponse = {
  project: Project;
};

export async function listProjects() {
  return request<ProjectsResponse>("/api/projects");
}

export async function createProject(input: CreateProjectInput) {
  return request<ProjectResponse>("/api/projects", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getProject(id: string) {
  return request<ProjectResponse>(`/api/projects/${id}`);
}

export async function updateProject(id: string, input: UpdateProjectInput) {
  return request<ProjectResponse>(`/api/projects/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function deleteProject(id: string) {
  const response = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Project could not be deleted.");
  }
}

async function request<T>(path: string, init?: RequestInit) {
  const response = await fetch(path, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed.");
  }

  return response.json() as Promise<T>;
}
