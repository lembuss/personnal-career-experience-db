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
];
export const ResponsibilityValues = [
    'Exposure',
    'Assisted',
    'Contributed',
    'IndependentlyExecuted',
    'Led',
    'OwnedArchitected',
];
export const TagCategoryValues = [
    'Lifecycle',
    'TechnicalDomain',
    'SkillTool',
    'Other',
];
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
export const tagInput = z.object({
    name: z.string().min(1, 'Name is required'),
    category: z.enum(TagCategoryValues),
});
