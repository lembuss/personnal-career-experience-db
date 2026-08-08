import { z } from 'zod';
export declare const ExperienceTypeValues: readonly ["Professional", "Research", "Academic", "Teaching", "Leadership", "StudentProject", "Other"];
export type ExperienceType = (typeof ExperienceTypeValues)[number];
export declare const ResponsibilityValues: readonly ["Exposure", "Assisted", "Contributed", "IndependentlyExecuted", "Led", "OwnedArchitected"];
export type Responsibility = (typeof ResponsibilityValues)[number];
export declare const TagCategoryValues: readonly ["Lifecycle", "TechnicalDomain", "SkillTool", "Other"];
export type TagCategory = (typeof TagCategoryValues)[number];
export declare const experienceInput: z.ZodObject<{
    title: z.ZodString;
    organization: z.ZodString;
    role: z.ZodString;
    location: z.ZodDefault<z.ZodString>;
    startDate: z.ZodString;
    endDate: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    current: z.ZodDefault<z.ZodBoolean>;
    type: z.ZodEnum<["Professional", "Research", "Academic", "Teaching", "Leadership", "StudentProject", "Other"]>;
    description: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    organization: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string | null;
    current: boolean;
    type: "Professional" | "Research" | "Academic" | "Teaching" | "Leadership" | "StudentProject" | "Other";
    description: string;
}, {
    title: string;
    organization: string;
    role: string;
    startDate: string;
    type: "Professional" | "Research" | "Academic" | "Teaching" | "Leadership" | "StudentProject" | "Other";
    location?: string | undefined;
    endDate?: string | null | undefined;
    current?: boolean | undefined;
    description?: string | undefined;
}>;
export type ExperienceInput = z.infer<typeof experienceInput>;
export declare const projectInput: z.ZodObject<{
    experienceId: z.ZodString;
    name: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    system: z.ZodDefault<z.ZodString>;
    objective: z.ZodDefault<z.ZodString>;
    outcome: z.ZodDefault<z.ZodString>;
    isRnD: z.ZodDefault<z.ZodBoolean>;
    notes: z.ZodDefault<z.ZodString>;
    tagIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    description: string;
    experienceId: string;
    name: string;
    system: string;
    objective: string;
    outcome: string;
    isRnD: boolean;
    notes: string;
    tagIds: string[];
}, {
    experienceId: string;
    name: string;
    description?: string | undefined;
    system?: string | undefined;
    objective?: string | undefined;
    outcome?: string | undefined;
    isRnD?: boolean | undefined;
    notes?: string | undefined;
    tagIds?: string[] | undefined;
}>;
export type ProjectInput = z.infer<typeof projectInput>;
export declare const activityInput: z.ZodObject<{
    experienceId: z.ZodString;
    projectId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    what: z.ZodString;
    how: z.ZodDefault<z.ZodString>;
    responsibility: z.ZodEnum<["Exposure", "Assisted", "Contributed", "IndependentlyExecuted", "Led", "OwnedArchitected"]>;
    result: z.ZodDefault<z.ZodString>;
    problem: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    diagnosis: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    intervention: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    interventionResult: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    notes: z.ZodDefault<z.ZodString>;
    tagIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    experienceId: string;
    notes: string;
    tagIds: string[];
    projectId: string | null;
    what: string;
    how: string;
    responsibility: "Exposure" | "Assisted" | "Contributed" | "IndependentlyExecuted" | "Led" | "OwnedArchitected";
    result: string;
    problem: string | null;
    diagnosis: string | null;
    intervention: string | null;
    interventionResult: string | null;
}, {
    experienceId: string;
    what: string;
    responsibility: "Exposure" | "Assisted" | "Contributed" | "IndependentlyExecuted" | "Led" | "OwnedArchitected";
    notes?: string | undefined;
    tagIds?: string[] | undefined;
    projectId?: string | null | undefined;
    how?: string | undefined;
    result?: string | undefined;
    problem?: string | null | undefined;
    diagnosis?: string | null | undefined;
    intervention?: string | null | undefined;
    interventionResult?: string | null | undefined;
}>;
export type ActivityInput = z.infer<typeof activityInput>;
export declare const tagInput: z.ZodObject<{
    name: z.ZodString;
    category: z.ZodEnum<["Lifecycle", "TechnicalDomain", "SkillTool", "Other"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    category: "Other" | "Lifecycle" | "TechnicalDomain" | "SkillTool";
}, {
    name: string;
    category: "Other" | "Lifecycle" | "TechnicalDomain" | "SkillTool";
}>;
export type TagInput = z.infer<typeof tagInput>;
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
