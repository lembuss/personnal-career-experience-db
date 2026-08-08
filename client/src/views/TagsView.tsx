import { useEffect, useState, useCallback } from 'react';
import { api } from '../lib/api';
import type { Tag, TagInput, TagCategory } from '../../../shared/schemas.js';
import { TagCategoryValues, tagCategoryLabels } from '../lib/constants';
import { SidePanel } from '../components/SidePanel';
import { Field, FormActions } from '../components/ExperienceForm';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export function TagsView() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [panel, setPanel] = useState<{ mode: 'create' | 'edit'; data?: Tag } | null>(null);

  const load = useCallback(() => {
    api.listTags().then(setTags);
  }, []);

  useEffect(() => { load(); }, [load]);

  const grouped = tags.reduce<Record<string, Tag[]>>((acc, t) => {
    (acc[t.category] ||= []).push(t);
    return acc;
  }, {});

  const handleDelete = async (t: Tag) => {
    if (!confirm(`Delete tag "${t.name}"?`)) return;
    await api.deleteTag(t.id);
    load();
  };

  const handleSubmit = async (data: TagInput) => {
    if (panel?.mode === 'edit' && panel.data) {
      await api.updateTag(panel.data.id, data);
    } else {
      await api.createTag(data);
    }
    setPanel(null);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-900">Tags</h1>
        <button onClick={() => setPanel({ mode: 'create' })} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-800 text-white rounded hover:bg-gray-700">
          <Plus size={16} /> Add
        </button>
      </div>

      {TagCategoryValues.map((cat) => (
        <div key={cat} className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">{tagCategoryLabels[cat]} ({grouped[cat]?.length ?? 0})</h2>
          {(grouped[cat] ?? []).length === 0 ? (
            <p className="text-sm text-gray-400">No tags.</p>
          ) : (
            <div className="border border-gray-200 rounded divide-y divide-gray-100">
              {grouped[cat].map((t) => (
                <div key={t.id} className="px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-gray-900">{t.name}</span>
                  <div className="flex gap-1">
                    <button onClick={() => setPanel({ mode: 'edit', data: t })} className="p-1 text-gray-400 hover:text-gray-700">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => handleDelete(t)} className="p-1 text-rose-400 hover:text-rose-600">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {panel && (
        <SidePanel title={panel.mode === 'create' ? 'Add Tag' : 'Edit Tag'} onClose={() => setPanel(null)}>
          <TagForm initial={panel.mode === 'edit' ? panel.data : null} onSubmit={handleSubmit} onCancel={() => setPanel(null)} />
        </SidePanel>
      )}
    </div>
  );
}

function TagForm({ initial, onSubmit, onCancel }: { initial?: Tag | null; onSubmit: (d: TagInput) => void; onCancel: () => void }) {
  const [form, setForm] = useState<TagInput>({ name: '', category: 'Lifecycle' });

  useEffect(() => {
    if (initial) setForm({ name: initial.name, category: initial.category });
  }, [initial]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Name" required>
        <input className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
      </Field>
      <Field label="Category">
        <select className="input" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as TagCategory }))}>
          {TagCategoryValues.map((c) => <option key={c} value={c}>{tagCategoryLabels[c]}</option>)}
        </select>
      </Field>
      <FormActions onCancel={onCancel} />
    </form>
  );
}
