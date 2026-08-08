import { useEffect, useState, useCallback } from 'react';
import { api } from '../lib/api';
import type { Experience, ExperienceDetail, ExperienceInput } from '../../../shared/schemas.js';
import { SidePanel } from '../components/SidePanel';
import { ExperienceForm } from '../components/ExperienceForm';
import { ExperienceTypeValues } from '../lib/constants';
import { Plus, Pencil, Trash2, Search, ArrowLeft } from 'lucide-react';

export function ExperiencesView() {
  const [list, setList] = useState<Experience[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<ExperienceDetail | null>(null);
  const [panel, setPanel] = useState<{ mode: 'create' | 'edit'; data?: Experience } | null>(null);

  const loadList = useCallback(() => {
    api.listExperiences().then(setList);
  }, []);

  const loadDetail = useCallback((id: string) => {
    api.getExperience(id).then((d) => setSelected(d ?? null));
  }, []);

  useEffect(() => { loadList(); }, [loadList]);

  const filtered = search
    ? list.filter((e) =>
        [e.title, e.organization, e.role, e.location, e.description]
          .join(' ').toLowerCase().includes(search.toLowerCase())
      )
    : list;

  const handleSubmit = async (data: ExperienceInput) => {
    if (panel?.mode === 'edit' && panel.data) {
      await api.updateExperience(panel.data.id, data);
      if (selected) loadDetail(selected.id);
    } else {
      await api.createExperience(data);
    }
    setPanel(null);
    loadList();
  };

  const handleDelete = async (e: Experience) => {
    if (!confirm(`Delete "${e.title}"? This also deletes its projects and activities.`)) return;
    await api.deleteExperience(e.id);
    setSelected(null);
    loadList();
  };

  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-3">
          <ArrowLeft size={16} /> Back to list
        </button>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{selected.title}</h1>
            <p className="text-sm text-gray-500">{selected.organization} · {selected.role} · {selected.location}</p>
            <p className="text-sm text-gray-500">{selected.startDate} → {selected.endDate ?? 'Present'}</p>
            <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">{selected.type}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setPanel({ mode: 'edit', data: selected })} className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded">
              <Pencil size={16} />
            </button>
            <button onClick={() => handleDelete(selected)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        {selected.description && <p className="text-sm text-gray-700 mb-6 whitespace-pre-wrap">{selected.description}</p>}

        <h2 className="text-sm font-semibold text-gray-700 mb-2">Projects ({selected.projects.length})</h2>
        {selected.projects.length === 0 ? (
          <p className="text-sm text-gray-400 mb-6">No projects.</p>
        ) : (
          <div className="border border-gray-200 rounded divide-y divide-gray-100 mb-6">
            {selected.projects.map((p) => (
              <div key={p.id} className="px-4 py-2.5">
                <div className="text-sm font-medium text-gray-900">{p.name}{p.isRnD && <span className="ml-2 text-xs text-amber-600">R&D</span>}</div>
                <div className="text-xs text-gray-500">{p.system} · {p.objective}</div>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-sm font-semibold text-gray-700 mb-2">Activities ({selected.activities.length})</h2>
        {selected.activities.length === 0 ? (
          <p className="text-sm text-gray-400">No activities.</p>
        ) : (
          <div className="border border-gray-200 rounded divide-y divide-gray-100">
            {selected.activities.map((a) => (
              <div key={a.id} className="px-4 py-2.5">
                <div className="text-sm text-gray-900">{a.what}</div>
                <div className="text-xs text-gray-500 mt-0.5">{a.responsibility}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-900">Experiences</h1>
        <button onClick={() => setPanel({ mode: 'create' })} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-800 text-white rounded hover:bg-gray-700">
          <Plus size={16} /> Add
        </button>
      </div>
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search experiences..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded"
        />
      </div>
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400">No experiences found.</p>
      ) : (
        <div className="border border-gray-200 rounded divide-y divide-gray-100">
          {filtered.map((e) => (
            <button
              key={e.id}
              onClick={() => loadDetail(e.id)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-medium text-gray-900">{e.title}</div>
                <div className="text-xs text-gray-500">{e.organization} · {e.role}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{e.startDate} — {e.endDate ?? 'Present'}</span>
                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">{e.type}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {panel && (
        <SidePanel title={panel.mode === 'create' ? 'Add Experience' : 'Edit Experience'} onClose={() => setPanel(null)}>
          <ExperienceForm
            initial={panel.mode === 'edit' ? panel.data : null}
            onSubmit={handleSubmit}
            onCancel={() => setPanel(null)}
          />
        </SidePanel>
      )}
    </div>
  );
}
