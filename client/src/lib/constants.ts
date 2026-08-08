import {
  ResponsibilityValues, TagCategoryValues, ExperienceTypeValues,
  type Responsibility, type TagCategory, type ExperienceType,
} from '../../../shared/schemas.js';

export const responsibilityColors: Record<Responsibility, string> = {
  Exposure: 'bg-gray-200 text-gray-800',
  Assisted: 'bg-blue-100 text-blue-800',
  Contributed: 'bg-teal-100 text-teal-800',
  IndependentlyExecuted: 'bg-amber-100 text-amber-800',
  Led: 'bg-orange-100 text-orange-800',
  OwnedArchitected: 'bg-rose-100 text-rose-800',
};

export const tagCategoryColors: Record<TagCategory, string> = {
  Lifecycle: 'bg-slate-200 text-slate-700',
  TechnicalDomain: 'bg-cyan-100 text-cyan-700',
  SkillTool: 'bg-emerald-100 text-emerald-700',
  Other: 'bg-gray-200 text-gray-700',
};

export const tagCategoryLabels: Record<TagCategory, string> = {
  Lifecycle: 'Lifecycle',
  TechnicalDomain: 'Technical Domain',
  SkillTool: 'Skill / Tool',
  Other: 'Other',
};

export { ResponsibilityValues, TagCategoryValues, ExperienceTypeValues };
