import { useEffect, useState, useCallback } from 'react';
import { api } from '../lib/api';
import type { Activity, ActivityInput, Experience, Project, Tag } from '../../../shared/schemas.js';
import { SidePanel } from '../components/SidePanel';
import { ActivityForm } from '../components/ActivityForm';
import { ResponsibilityBadge, TagChip } from '../components/Badges';
import { TagMultiSelect } from '../components/TagMultiSelect';
import { ResponsibilityValues } from '../lib/constants';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';

export function ActivitiesView() {
  const [list, setList] = useState<Activity[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [search, setSearch] = useState('');
  const [fExperience, setFExperience] = useState('');
  const [fProject, setFProject] = useState('');
  const [fResponsibility, setFResponsibility] = useState('');
  const [fTagIds, setFTagIds] = useState<string[]>([]);

  const [panel, setPanel] = useState<{ mode: 'create' | 'edit'; data?: Activity; lockedExperienceId?: string; lockedProjectId?: string } | null>(null);

  const loadList = useCallback(() => {
    api.listActivities({
      experienceId: fExperience || undefined,
      projectId: fProject || undefined,
      responsibility: fResponsibility || undefined,
      search: search || undefined,
    }).then(setList);
  }, [fExperience, fProject, fResponsibility, search]);

  useEffect(() => {
    api.listExperiences().then(setExperiences);
    api.listProjects().then(setProjects);
    api.listTags().then(setTags);
  }, []);

  useEffect(() => { loadList(); }, [loadList]);

  // Client-side tag filter (multi-tag)
  const filtered = fTagIds.length > 0
    ? list.filter((a) => fTagIds.every((tid) => a.tags.some((t) => t.id === tid)))
    : list;

  const filteredProjects = fExperience
    ? projects.filter((p) => p.experienceId === fExperience)
    : projects;

  const expName = (id: string) => {
    const e = experiences.find((x) => x.id === id);
    return e ? `${e.title}` : 'Unknown';
  };
  const projName = (id: string | null) => {
    if (!id) return null;
    const p = projects.find((x) => x.id === id);
    return p ? p.name : 'Unknown';
  };

  const handleSubmit = async (data: ActivityInput) => {
    if (panel?.mode === 'edit' && panel.data) {
      await api.updateActivity(panel.data.id, data);
    } else {
      await api.createActivity(data);
    }
    setPanel(null);
    loadList();
  };

  const handleDelete = async (a: Activity) => {
    if (!confirm('Delete this activity?')) return;
    await api.deleteActivity(a.id);
    loadList();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-900">Activities</h1>
        <button onClick={() => setPanel({ mode: 'create' })} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-800 text-white rounded hover:bg-gray-700">
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <select value={fExperience} onChange={(e) => { setFExperience(e.target.value); setFProject(''); }} className="px-3 py-2 text-sm border border-gray-300 rounded">
          <option value="">All experiences</option>
          {experiences.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
        </select>
        <select value={fProject} onChange={(e) => setFProject(e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded">
          <option value="">All projects</option>
          {filteredProjects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={fResponsibility} onChange={(e) => setFResponsibility(e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded">
          <option value="">All responsibilities</option>
          {ResponsibilityValues.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search what, how, result, notes..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="mb-4">
        <TagMultiSelect tags={tags} selected={fTagIds} onChange={setFTagIds} placeholder="Filter by tags" />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400">No activities found.</p>
      ) : (
        <div className="border border-gray-200 rounded divide-y divide-gray-100">
          {filtered.map((a) => (
            <div key={a.id} className="px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-900">{a.what}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {expName(a.experienceId)}
                    {projName(a.projectId) && <> · {projName(a.projectId)}</>}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {a.tags.map((t) => <TagChip key={t.id} name={t.name} category={t.category} />)}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <ResponsibilityBadge value={a.responsibility} />
                  <button onClick={() => setPanel({ mode: 'edit', data: a })} className="p-1 text-gray-400 hover:text-gray-700">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(a)} className="p-1 text-rose-400 hover:text-rose-600">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {panel && (
        <SidePanel title={panel.mode === 'create' ? 'Add Activity' : 'Edit Activity'} onClose={() => setPanel(null)}>
          <ActivityForm
            initial={panel.mode === 'edit' ? panel.data : null}
            experiences={experiences}
            projects={projects}
            tags={tags}
            lockedExperienceId={panel.lockedExperienceId}
            lockedProjectId={panel.lockedProjectId}
            onSubmit={handleSubmit}
            onCancel={() => setPanel(null)}
          />
        </SidePanel>
      )}
    </div>
  );
}
