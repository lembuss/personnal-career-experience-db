import { useEffect, useState, useCallback } from 'react';
import { api } from '../lib/api';
import type { Project, ProjectDetail, ProjectInput, Experience, Tag } from '../../../shared/schemas.js';
import { SidePanel } from '../components/SidePanel';
import { ProjectForm } from '../components/ProjectForm';
import { TagChip } from '../components/Badges';
import { Plus, Pencil, Trash2, Search, ArrowLeft } from 'lucide-react';

export function ProjectsView() {
  const [list, setList] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [search, setSearch] = useState('');
  const [filterExperience, setFilterExperience] = useState('');
  const [selected, setSelected] = useState<ProjectDetail | null>(null);
  const [panel, setPanel] = useState<{ mode: 'create' | 'edit'; data?: Project } | null>(null);

  const loadList = useCallback(() => {
    api.listProjects({ experienceId: filterExperience || undefined, search: search || undefined }).then(setList);
  }, [filterExperience, search]);

  const loadDetail = useCallback((id: string) => {
    api.getProject(id).then((d) => setSelected(d ?? null));
  }, []);

  useEffect(() => {
    api.listExperiences().then(setExperiences);
    api.listTags().then(setTags);
  }, []);

  useEffect(() => { loadList(); }, [loadList]);

  const handleSubmit = async (data: ProjectInput) => {
    if (panel?.mode === 'edit' && panel.data) {
      await api.updateProject(panel.data.id, data);
      if (selected) loadDetail(selected.id);
    } else {
      await api.createProject(data);
    }
    setPanel(null);
    loadList();
  };

  const handleDelete = async (p: Project) => {
    if (!confirm(`Delete project "${p.name}"?`)) return;
    await api.deleteProject(p.id);
    setSelected(null);
    loadList();
  };

  const expName = (id: string) => {
    const e = experiences.find((x) => x.id === id);
    return e ? `${e.title} — ${e.organization}` : 'Unknown';
  };

  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-3">
          <ArrowLeft size={16} /> Back to list
        </button>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{selected.name}{selected.isRnD && <span className="ml-2 text-xs text-amber-600">R&D</span>}</h1>
            <p className="text-sm text-gray-500">{expName(selected.experienceId)}</p>
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

        {selected.description && <p className="text-sm text-gray-700 mb-4 whitespace-pre-wrap">{selected.description}</p>}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          {selected.system && <div><span className="text-gray-500">System: </span>{selected.system}</div>}
          {selected.objective && <div><span className="text-gray-500">Objective: </span>{selected.objective}</div>}
          {selected.outcome && <div><span className="text-gray-500">Outcome: </span>{selected.outcome}</div>}
        </div>
        {selected.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {selected.tags.map((t) => <TagChip key={t.id} name={t.name} category={t.category} />)}
          </div>
        )}
        {selected.notes && <p className="text-sm text-gray-600 mb-6 whitespace-pre-wrap">{selected.notes}</p>}

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
        <h1 className="text-lg font-semibold text-gray-900">Projects</h1>
        <button onClick={() => setPanel({ mode: 'create' })} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-800 text-white rounded hover:bg-gray-700">
          <Plus size={16} /> Add
        </button>
      </div>
      <div className="flex gap-3 mb-4">
        <select
          value={filterExperience}
          onChange={(e) => setFilterExperience(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 rounded"
        >
          <option value="">All experiences</option>
          {experiences.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
        </select>
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded"
          />
        </div>
      </div>
      {list.length === 0 ? (
        <p className="text-sm text-gray-400">No projects found.</p>
      ) : (
        <div className="border border-gray-200 rounded divide-y divide-gray-100">
          {list.map((p) => (
            <button
              key={p.id}
              onClick={() => loadDetail(p.id)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900">{p.name}{p.isRnD && <span className="ml-2 text-xs text-amber-600">R&D</span>}</div>
                <div className="flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map((t) => <TagChip key={t.id} name={t.name} category={t.category} />)}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{expName(p.experienceId)}</div>
            </button>
          ))}
        </div>
      )}

      {panel && (
        <SidePanel title={panel.mode === 'create' ? 'Add Project' : 'Edit Project'} onClose={() => setPanel(null)}>
          <ProjectForm
            initial={panel.mode === 'edit' ? panel.data : null}
            experiences={experiences}
            tags={tags}
            onSubmit={handleSubmit}
            onCancel={() => setPanel(null)}
          />
        </SidePanel>
      )}
    </div>
  );
}
