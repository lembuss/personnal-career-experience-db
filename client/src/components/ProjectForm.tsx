import { useState, useEffect } from 'react';
import type { Project, ProjectInput, Experience, Tag } from '../../../shared/schemas.js';
import { Field, FormActions } from './ExperienceForm';
import { TagMultiSelect } from './TagMultiSelect';

interface Props {
  initial?: Project | null;
  experiences: Experience[];
  tags: Tag[];
  lockedExperienceId?: string;
  onSubmit: (data: ProjectInput) => void;
  onCancel: () => void;
}

export function ProjectForm({ initial, experiences, tags, lockedExperienceId, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<ProjectInput>({
    experienceId: '', name: '', description: '', system: '',
    objective: '', outcome: '', isRnD: false, notes: '', tagIds: [],
  });

  useEffect(() => {
    if (initial) {
      setForm({
        experienceId: initial.experienceId, name: initial.name, description: initial.description,
        system: initial.system, objective: initial.objective, outcome: initial.outcome,
        isRnD: initial.isRnD, notes: initial.notes, tagIds: initial.tags.map((t) => t.id),
      });
    } else if (lockedExperienceId) {
      setForm((f) => ({ ...f, experienceId: lockedExperienceId }));
    }
  }, [initial, lockedExperienceId]);

  const set = (k: keyof ProjectInput, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Experience" required>
        <select className="input" value={form.experienceId} onChange={(e) => set('experienceId', e.target.value)} required disabled={!!lockedExperienceId}>
          <option value="">Select experience...</option>
          {experiences.map((exp) => <option key={exp.id} value={exp.id}>{exp.title} — {exp.organization}</option>)}
        </select>
      </Field>
      <Field label="Name" required>
        <input className="input" value={form.name} onChange={(e) => set('name', e.target.value)} required />
      </Field>
      <Field label="Description">
        <textarea className="input min-h-[60px]" value={form.description} onChange={(e) => set('description', e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="System">
          <input className="input" value={form.system} onChange={(e) => set('system', e.target.value)} />
        </Field>
        <Field label="Objective">
          <input className="input" value={form.objective} onChange={(e) => set('objective', e.target.value)} />
        </Field>
      </div>
      <Field label="Outcome">
        <input className="input" value={form.outcome} onChange={(e) => set('outcome', e.target.value)} />
      </Field>
      <Field label="Tags">
        <TagMultiSelect tags={tags} selected={form.tagIds} onChange={(ids) => set('tagIds', ids)} />
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.isRnD} onChange={(e) => set('isRnD', e.target.checked)} />
        R&D project
      </label>
      <Field label="Notes">
        <textarea className="input min-h-[60px]" value={form.notes} onChange={(e) => set('notes', e.target.value)} />
      </Field>
      <FormActions onCancel={onCancel} />
    </form>
  );
}
