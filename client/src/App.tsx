import { useState } from 'react';
import { LayoutDashboard, Briefcase, FolderKanban, ListTodo, Tag } from 'lucide-react';
import { DashboardView } from './views/DashboardView';
import { ExperiencesView } from './views/ExperiencesView';
import { ProjectsView } from './views/ProjectsView';
import { ActivitiesView } from './views/ActivitiesView';
import { TagsView } from './views/TagsView';

type View = 'dashboard' | 'experiences' | 'projects' | 'activities' | 'tags';

const nav: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'experiences', label: 'Experiences', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'activities', label: 'Activities', icon: ListTodo },
  { id: 'tags', label: 'Tags', icon: Tag },
];

export default function App() {
  const [view, setView] = useState<View>('dashboard');

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white flex flex-col">
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="text-sm font-semibold text-gray-900">Career Experience DB</div>
          <div className="text-xs text-gray-400 mt-0.5">Personal aerospace log</div>
        </div>
        <nav className="flex-1 py-2">
          {nav.map((n) => {
            const Icon = n.icon;
            const active = view === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setView(n.id)}
                className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm ${
                  active ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} />
                {n.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {view === 'dashboard' && <DashboardView />}
          {view === 'experiences' && <ExperiencesView />}
          {view === 'projects' && <ProjectsView />}
          {view === 'activities' && <ActivitiesView />}
          {view === 'tags' && <TagsView />}
        </div>
      </main>
    </div>
  );
}
