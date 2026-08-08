import type {
  Experience, ExperienceDetail, Project, ProjectDetail,
  Activity, ActivityDetail, Tag, ExperienceInput, ProjectInput, ActivityInput, TagInput,
} from '../../../shared/schemas.js';

const BASE = '/api';

async function req<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ? JSON.stringify(body.error) : res.statusText);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  // Experiences
  listExperiences: () => req<Experience[]>('/experiences'),
  getExperience: (id: string) => req<ExperienceDetail>(`/experiences/${id}`),
  createExperience: (data: ExperienceInput) => req<Experience>('/experiences', { method: 'POST', body: JSON.stringify(data) }),
  updateExperience: (id: string, data: Partial<ExperienceInput>) => req<Experience>(`/experiences/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteExperience: (id: string) => req<void>(`/experiences/${id}`, { method: 'DELETE' }),

  // Projects
  listProjects: (params?: { experienceId?: string; tagId?: string; search?: string }) => {
    const q = new URLSearchParams();
    if (params?.experienceId) q.set('experienceId', params.experienceId);
    if (params?.tagId) q.set('tagId', params.tagId);
    if (params?.search) q.set('search', params.search);
    return req<Project[]>(`/projects${q.size ? '?' + q : ''}`);
  },
  getProject: (id: string) => req<ProjectDetail>(`/projects/${id}`),
  createProject: (data: ProjectInput) => req<Project>('/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id: string, data: Partial<ProjectInput>) => req<Project>(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id: string) => req<void>(`/projects/${id}`, { method: 'DELETE' }),

  // Activities
  listActivities: (params?: { experienceId?: string; projectId?: string; responsibility?: string; tagId?: string; search?: string }) => {
    const q = new URLSearchParams();
    if (params?.experienceId) q.set('experienceId', params.experienceId);
    if (params?.projectId) q.set('projectId', params.projectId);
    if (params?.responsibility) q.set('responsibility', params.responsibility);
    if (params?.tagId) q.set('tagId', params.tagId);
    if (params?.search) q.set('search', params.search);
    return req<Activity[]>(`/activities${q.size ? '?' + q : ''}`);
  },
  getActivity: (id: string) => req<ActivityDetail>(`/activities/${id}`),
  createActivity: (data: ActivityInput) => req<Activity>('/activities', { method: 'POST', body: JSON.stringify(data) }),
  updateActivity: (id: string, data: Partial<ActivityInput>) => req<Activity>(`/activities/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteActivity: (id: string) => req<void>(`/activities/${id}`, { method: 'DELETE' }),

  // Tags
  listTags: () => req<Tag[]>('/tags'),
  createTag: (data: TagInput) => req<Tag>('/tags', { method: 'POST', body: JSON.stringify(data) }),
  updateTag: (id: string, data: Partial<TagInput>) => req<Tag>(`/tags/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTag: (id: string) => req<void>(`/tags/${id}`, { method: 'DELETE' }),

  // Dashboard
  getDashboard: () => req<{ counts: { experiences: number; projects: number; activities: number; tags: number }; recentActivities: Activity[] }>('/dashboard'),
};
