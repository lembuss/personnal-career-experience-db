import { prisma } from './prisma.js';
import type { Experience, Project, Activity, Tag, ExperienceDetail, ProjectDetail, ActivityDetail } from '../../shared/schemas.js';
import {
  ExperienceTypeValues, ResponsibilityValues, TagCategoryValues,
  type ExperienceType, type Responsibility, type TagCategory,
} from '../../shared/schemas.js';

// === Mappers: Prisma rows -> API response types ===

function mapTag(t: { id: string; name: string; category: string }): Tag {
  return { id: t.id, name: t.name, category: t.category as TagCategory };
}

function mapExperience(e: any): Experience {
  return {
    id: e.id, title: e.title, organization: e.organization, role: e.role,
    location: e.location, startDate: e.startDate, endDate: e.endDate,
    current: e.current, type: e.type as ExperienceType, description: e.description,
    createdAt: e.createdAt.toISOString(), updatedAt: e.updatedAt.toISOString(),
  };
}

function mapProject(p: any): Project {
  return {
    id: p.id, experienceId: p.experienceId, name: p.name, description: p.description,
    system: p.system, objective: p.objective, outcome: p.outcome, isRnD: p.isRnD,
    notes: p.notes, createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString(),
    tags: (p.tags ?? []).map((t: any) => mapTag(t.tag)),
  };
}

function mapActivity(a: any): Activity {
  return {
    id: a.id, experienceId: a.experienceId, projectId: a.projectId,
    what: a.what, how: a.how, responsibility: a.responsibility as Responsibility,
    result: a.result, problem: a.problem, diagnosis: a.diagnosis,
    intervention: a.intervention, interventionResult: a.interventionResult,
    notes: a.notes, createdAt: a.createdAt.toISOString(), updatedAt: a.updatedAt.toISOString(),
    tags: (a.tags ?? []).map((t: any) => mapTag(t.tag)),
  };
}

function mapExperienceDetail(e: any): ExperienceDetail {
  return {
    ...mapExperience(e),
    projects: (e.projects ?? []).map(mapProject),
    activities: (e.activities ?? []).map(mapActivity),
  };
}

function mapProjectDetail(p: any): ProjectDetail {
  return {
    ...mapProject(p),
    experience: mapExperience(p.experience),
    activities: (p.activities ?? []).map(mapActivity),
  };
}

function mapActivityDetail(a: any): ActivityDetail {
  return {
    ...mapActivity(a),
    experience: mapExperience(a.experience),
    project: a.project ? mapProject(a.project) : null,
  };
}

// === Tag helpers ===

async function setActivityTags(activityId: string, tagIds: string[]) {
  await prisma.activityTag.deleteMany({ where: { activityId } });
  if (tagIds.length) {
    await prisma.activityTag.createMany({
      data: tagIds.map((tagId) => ({ activityId, tagId })),
    });
  }
}

async function setProjectTags(projectId: string, tagIds: string[]) {
  await prisma.projectTag.deleteMany({ where: { projectId } });
  if (tagIds.length) {
    await prisma.projectTag.createMany({
      data: tagIds.map((tagId) => ({ projectId, tagId })),
    });
  }
}

// === Tag service ===

export const tagService = {
  async list(): Promise<Tag[]> {
    const rows = await prisma.tag.findMany({ orderBy: [{ category: 'asc' }, { name: 'asc' }] });
    return rows.map(mapTag);
  },
  async create(name: string, category: TagCategory): Promise<Tag> {
    const row = await prisma.tag.create({ data: { name, category } });
    return mapTag(row);
  },
  async update(id: string, name: string, category: TagCategory): Promise<Tag> {
    const row = await prisma.tag.update({ where: { id }, data: { name, category } });
    return mapTag(row);
  },
  async remove(id: string): Promise<void> {
    await prisma.tag.delete({ where: { id } });
  },
};

// === Experience service ===

export const experienceService = {
  async list(): Promise<Experience[]> {
    const rows = await prisma.experience.findMany({ orderBy: { startDate: 'desc' } });
    return rows.map(mapExperience);
  },
  async get(id: string): Promise<ExperienceDetail | null> {
    const row = await prisma.experience.findUnique({
      where: { id },
      include: {
        projects: { orderBy: { createdAt: 'asc' }, include: { tags: { include: { tag: true } } } },
        activities: {
          orderBy: { updatedAt: 'desc' },
          include: { tags: { include: { tag: true } } },
        },
      },
    });
    return row ? mapExperienceDetail(row) : null;
  },
  async create(data: {
    title: string; organization: string; role: string; location: string;
    startDate: string; endDate: string | null; current: boolean;
    type: ExperienceType; description: string;
  }): Promise<Experience> {
    const row = await prisma.experience.create({ data });
    return mapExperience(row);
  },
  async update(id: string, data: Partial<{
    title: string; organization: string; role: string; location: string;
    startDate: string; endDate: string | null; current: boolean;
    type: ExperienceType; description: string;
  }>): Promise<Experience> {
    const row = await prisma.experience.update({ where: { id }, data });
    return mapExperience(row);
  },
  async remove(id: string): Promise<void> {
    await prisma.experience.delete({ where: { id } });
  },
};

// === Project service ===

export const projectService = {
  async list(params?: { experienceId?: string; tagId?: string; search?: string }): Promise<Project[]> {
    const where: any = {};
    if (params?.experienceId) where.experienceId = params.experienceId;
    if (params?.tagId) where.tags = { some: { tagId: params.tagId } };
    if (params?.search) {
      where.OR = [
        { name: { contains: params.search } },
        { description: { contains: params.search } },
        { system: { contains: params.search } },
        { objective: { contains: params.search } },
        { outcome: { contains: params.search } },
        { notes: { contains: params.search } },
      ];
    }
    const rows = await prisma.project.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: { tags: { include: { tag: true } } },
    });
    return rows.map(mapProject);
  },
  async get(id: string): Promise<ProjectDetail | null> {
    const row = await prisma.project.findUnique({
      where: { id },
      include: {
        experience: true,
        activities: {
          orderBy: { updatedAt: 'desc' },
          include: { tags: { include: { tag: true } } },
        },
        tags: { include: { tag: true } },
      },
    });
    return row ? mapProjectDetail(row) : null;
  },
  async create(data: {
    experienceId: string; name: string; description: string; system: string;
    objective: string; outcome: string; isRnD: boolean; notes: string;
  }, tagIds: string[] = []): Promise<Project> {
    const row = await prisma.project.create({ data, include: { tags: { include: { tag: true } } } });
    await setProjectTags(row.id, tagIds);
    const fresh = await prisma.project.findUnique({
      where: { id: row.id }, include: { tags: { include: { tag: true } } } });
    return mapProject(fresh!);
  },
  async update(id: string, data: Partial<{
    experienceId: string; name: string; description: string; system: string;
    objective: string; outcome: string; isRnD: boolean; notes: string;
  }>, tagIds?: string[]): Promise<Project> {
    await prisma.project.update({ where: { id }, data });
    if (tagIds !== undefined) await setProjectTags(id, tagIds);
    const fresh = await prisma.project.findUnique({
      where: { id }, include: { tags: { include: { tag: true } } } });
    return mapProject(fresh!);
  },
  async remove(id: string): Promise<void> {
    await prisma.project.delete({ where: { id } });
  },
};

// === Activity service ===

export const activityService = {
  async list(params?: {
    experienceId?: string; projectId?: string; responsibility?: string;
    tagId?: string; search?: string;
  }): Promise<Activity[]> {
    const where: any = {};
    if (params?.experienceId) where.experienceId = params.experienceId;
    if (params?.projectId) where.projectId = params.projectId;
    if (params?.responsibility) where.responsibility = params.responsibility;
    if (params?.tagId) where.tags = { some: { tagId: params.tagId } };
    if (params?.search) {
      where.OR = [
        { what: { contains: params.search } },
        { how: { contains: params.search } },
        { result: { contains: params.search } },
        { notes: { contains: params.search } },
      ];
    }
    const rows = await prisma.activity.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: { tags: { include: { tag: true } } },
    });
    return rows.map(mapActivity);
  },
  async get(id: string): Promise<ActivityDetail | null> {
    const row = await prisma.activity.findUnique({
      where: { id },
      include: {
        experience: true,
        project: { include: { tags: { include: { tag: true } } } },
        tags: { include: { tag: true } },
      },
    });
    return row ? mapActivityDetail(row) : null;
  },
  async create(data: {
    experienceId: string; projectId: string | null; what: string; how: string;
    responsibility: Responsibility; result: string;
    problem: string | null; diagnosis: string | null;
    intervention: string | null; interventionResult: string | null;
    notes: string;
  }, tagIds: string[] = []): Promise<Activity> {
    const row = await prisma.activity.create({ data });
    await setActivityTags(row.id, tagIds);
    const fresh = await prisma.activity.findUnique({
      where: { id: row.id }, include: { tags: { include: { tag: true } } } });
    return mapActivity(fresh!);
  },
  async update(id: string, data: Partial<{
    experienceId: string; projectId: string | null; what: string; how: string;
    responsibility: Responsibility; result: string;
    problem: string | null; diagnosis: string | null;
    intervention: string | null; interventionResult: string | null;
    notes: string;
  }>, tagIds?: string[]): Promise<Activity> {
    await prisma.activity.update({ where: { id }, data });
    if (tagIds !== undefined) await setActivityTags(id, tagIds);
    const fresh = await prisma.activity.findUnique({
      where: { id }, include: { tags: { include: { tag: true } } } });
    return mapActivity(fresh!);
  },
  async remove(id: string): Promise<void> {
    await prisma.activity.delete({ where: { id } });
  },
  async recent(limit = 5): Promise<Activity[]> {
    const rows = await prisma.activity.findMany({
      orderBy: { updatedAt: 'desc' },
      take: limit,
      include: { tags: { include: { tag: true } } },
    });
    return rows.map(mapActivity);
  },
};
