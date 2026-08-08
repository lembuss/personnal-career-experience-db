import { z } from 'zod';

// === Enum values ===

export const ExperienceTypeValues = [
  'Professional',
  'Research',
  'Academic',
  'Teaching',
  'Leadership',
  'StudentProject',
  'Other',
] as const;
export type ExperienceType = (typeof ExperienceTypeValues)[number];

export const ResponsibilityValues = [
  'Exposure',
  'Assisted',
  'Contributed',
  'IndependentlyExecuted',
  'Led',
  'OwnedArchitected',
] as const;
export type Responsibility = (typeof ResponsibilityValues)[number];

export const TagCategoryValues = [
  'Lifecycle',
  'TechnicalDomain',
  'SkillTool',
  'Other',
] as const;
export type TagCategory = (typeof TagCategoryValues)[number];

// === Input schemas (request body validation) ===

export const experienceInput = z.object({
  title: z.string().min(1, 'Title is required'),
  organization: z.string().min(1, 'Organization is required'),
  role: z.string().min(1, 'Role is required'),
  location: z.string().default(''),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().nullable().default(null),
  current: z.boolean().default(false),
  type: z.enum(ExperienceTypeValues),
  description: z.string().default(''),
});
export type ExperienceInput = z.infer<typeof experienceInput>;

export const projectInput = z.object({
  experienceId: z.string().min(1, 'Experience is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().default(''),
  system: z.string().default(''),
  objective: z.string().default(''),
  outcome: z.string().default(''),
  isRnD: z.boolean().default(false),
  notes: z.string().default(''),
  tagIds: z.array(z.string()).default([]),
});
export type ProjectInput = z.infer<typeof projectInput>;

export const activityInput = z.object({
  experienceId: z.string().min(1, 'Experience is required'),
  projectId: z.string().nullable().default(null),
  what: z.string().min(1, 'What is required'),
  how: z.string().default(''),
  responsibility: z.enum(ResponsibilityValues),
  result: z.string().default(''),
  problem: z.string().nullable().default(null),
  diagnosis: z.string().nullable().default(null),
  intervention: z.string().nullable().default(null),
  interventionResult: z.string().nullable().default(null),
  notes: z.string().default(''),
  tagIds: z.array(z.string()).default([]),
});
export type ActivityInput = z.infer<typeof activityInput>;

export const tagInput = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.enum(TagCategoryValues),
});
export type TagInput = z.infer<typeof tagInput>;

// === Entity types (API responses) ===

export interface Tag {
  id: string;
  name: string;
  category: TagCategory;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  type: ExperienceType;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  experienceId: string;
  name: string;
  description: string;
  system: string;
  objective: string;
  outcome: string;
  isRnD: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
}

export interface Activity {
  id: string;
  experienceId: string;
  projectId: string | null;
  what: string;
  how: string;
  responsibility: Responsibility;
  result: string;
  problem: string | null;
  diagnosis: string | null;
  intervention: string | null;
  interventionResult: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
}

// === Detail types (with relations) ===

export interface ExperienceDetail extends Experience {
  projects: Project[];
  activities: Activity[];
}

export interface ProjectDetail extends Project {
  experience: Experience;
  activities: Activity[];
}

export interface ActivityDetail extends Activity {
  experience: Experience;
  project: Project | null;
}
