import { useState, useEffect } from 'react';
import type { Experience, ExperienceInput } from '../../../shared/schemas.js';
import { ExperienceTypeValues } from '../lib/constants';

interface Props {
  initial?: Experience | null;
  onSubmit: (data: ExperienceInput) => void;
  onCancel: () => void;
}

export function ExperienceForm({ initial, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<ExperienceInput>({
    title: '', organization: '', role: '', location: '',
    startDate: '', endDate: null, current: false,
    type: 'Professional', description: '',
  });

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title, organization: initial.organization, role: initial.role,
        location: initial.location, startDate: initial.startDate, endDate: initial.endDate,
        current: initial.current, type: initial.type, description: initial.description,
      });
    }
  }, [initial]);

  const set = (k: keyof ExperienceInput, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Title" required>
        <input className="input" value={form.title} onChange={(e) => set('title', e.target.value)} required />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Organization" required>
          <input className="input" value={form.organization} onChange={(e) => set('organization', e.target.value)} required />
        </Field>
        <Field label="Role" required>
          <input className="input" value={form.role} onChange={(e) => set('role', e.target.value)} required />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Location">
          <input className="input" value={form.location} onChange={(e) => set('location', e.target.value)} />
        </Field>
        <Field label="Type">
          <select className="input" value={form.type} onChange={(e) => set('type', e.target.value)}>
            {ExperienceTypeValues.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Start Date" required>
          <input type="date" className="input" value={form.startDate} onChange={(e) => set('startDate', e.target.value)} required />
        </Field>
        <Field label="End Date">
          <input type="date" className="input" value={form.endDate ?? ''} onChange={(e) => set('endDate', e.target.value || null)} disabled={form.current} />
        </Field>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.current} onChange={(e) => set('current', e.target.checked)} />
        Current position
      </label>
      <Field label="Description">
        <textarea className="input min-h-[80px]" value={form.description} onChange={(e) => set('description', e.target.value)} />
      </Field>
      <FormActions onCancel={onCancel} />
    </form>
  );
}

export function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}{required && <span className="text-rose-500"> *</span>}
      </label>
      {children}
    </div>
  );
}

export function FormActions({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <button type="button" onClick={onCancel} className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">Cancel</button>
      <button type="submit" className="px-3 py-1.5 text-sm bg-gray-800 text-white rounded hover:bg-gray-700">Save</button>
    </div>
  );
}
