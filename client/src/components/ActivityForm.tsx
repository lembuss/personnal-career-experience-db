import { useState, useEffect } from 'react';
import type { Activity, ActivityInput, Experience, Project, Tag } from '../../../shared/schemas.js';
import { Field, FormActions } from './ExperienceForm';
import { TagMultiSelect } from './TagMultiSelect';
import { ResponsibilityValues } from '../lib/constants';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface Props {
  initial?: Activity | null;
  experiences: Experience[];
  projects: Project[];
  tags: Tag[];
  lockedExperienceId?: string;
  lockedProjectId?: string;
  onSubmit: (data: ActivityInput) => void;
  onCancel: () => void;
}

export function ActivityForm({ initial, experiences, projects, tags, lockedExperienceId, lockedProjectId, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<ActivityInput>({
    experienceId: '', projectId: null, what: '', how: '',
    responsibility: 'Exposure', result: '', problem: null, diagnosis: null,
    intervention: null, interventionResult: null, notes: '', tagIds: [],
  });
  const [showProblem, setShowProblem] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        experienceId: initial.experienceId, projectId: initial.projectId,
        what: initial.what, how: initial.how, responsibility: initial.responsibility,
        result: initial.result, problem: initial.problem, diagnosis: initial.diagnosis,
        intervention: initial.intervention, interventionResult: initial.interventionResult,
        notes: initial.notes, tagIds: initial.tags.map((t) => t.id),
      });
      setShowProblem(!!(initial.problem || initial.diagnosis || initial.intervention || initial.interventionResult));
    } else {
      if (lockedExperienceId) setForm((f) => ({ ...f, experienceId: lockedExperienceId }));
      if (lockedProjectId) setForm((f) => ({ ...f, projectId: lockedProjectId }));
    }
  }, [initial, lockedExperienceId, lockedProjectId]);

  const set = (k: keyof ActivityInput, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const filteredProjects = form.experienceId
    ? projects.filter((p) => p.experienceId === form.experienceId)
    : projects;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Experience" required>
          <select className="input" value={form.experienceId} onChange={(e) => set('experienceId', e.target.value)} required disabled={!!lockedExperienceId}>
            <option value="">Select...</option>
            {experiences.map((exp) => <option key={exp.id} value={exp.id}>{exp.title} — {exp.organization}</option>)}
          </select>
        </Field>
        <Field label="Project (optional)">
          <select className="input" value={form.projectId ?? ''} onChange={(e) => set('projectId', e.target.value || null)} disabled={!!lockedProjectId}>
            <option value="">None</option>
            {filteredProjects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </Field>
      </div>
      <Field label="What" required>
        <textarea className="input min-h-[60px]" value={form.what} onChange={(e) => set('what', e.target.value)} required placeholder="What was actually done" />
      </Field>
      <Field label="How">
        <textarea className="input min-h-[60px]" value={form.how} onChange={(e) => set('how', e.target.value)} placeholder="Technical methods and tools used" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Responsibility" required>
          <select className="input" value={form.responsibility} onChange={(e) => set('responsibility', e.target.value)}>
            {ResponsibilityValues.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>
        <Field label="Result">
          <input className="input" value={form.result} onChange={(e) => set('result', e.target.value)} placeholder="What happened as a result" />
        </Field>
      </div>
      <Field label="Tags">
        <TagMultiSelect tags={tags} selected={form.tagIds} onChange={(ids) => set('tagIds', ids)} />
      </Field>

      <button
        type="button"
        onClick={() => setShowProblem(!showProblem)}
        className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        {showProblem ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        Problem & Solution
      </button>
      {showProblem && (
        <div className="space-y-3 pl-4 border-l-2 border-gray-100">
          <Field label="Problem">
            <textarea className="input min-h-[50px]" value={form.problem ?? ''} onChange={(e) => set('problem', e.target.value || null)} />
          </Field>
          <Field label="Diagnosis">
            <textarea className="input min-h-[50px]" value={form.diagnosis ?? ''} onChange={(e) => set('diagnosis', e.target.value || null)} />
          </Field>
          <Field label="Intervention">
            <textarea className="input min-h-[50px]" value={form.intervention ?? ''} onChange={(e) => set('intervention', e.target.value || null)} />
          </Field>
          <Field label="Intervention Result">
            <textarea className="input min-h-[50px]" value={form.interventionResult ?? ''} onChange={(e) => set('interventionResult', e.target.value || null)} />
          </Field>
        </div>
      )}

      <Field label="Notes">
        <textarea className="input min-h-[50px]" value={form.notes} onChange={(e) => set('notes', e.target.value)} />
      </Field>
      <FormActions onCancel={onCancel} />
    </form>
  );
}
