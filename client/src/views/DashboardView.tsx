import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { Activity } from '../../../shared/schemas.js';
import { ResponsibilityBadge, TagChip } from '../components/Badges';

export function DashboardView() {
  const [data, setData] = useState<{ counts: { experiences: number; projects: number; activities: number; tags: number }; recentActivities: Activity[] } | null>(null);

  useEffect(() => {
    api.getDashboard().then(setData);
  }, []);

  if (!data) return <div className="text-gray-400 text-sm">Loading...</div>;

  const cards = [
    { label: 'Experiences', value: data.counts.experiences },
    { label: 'Projects', value: data.counts.projects },
    { label: 'Activities', value: data.counts.activities },
    { label: 'Tags', value: data.counts.tags },
  ];

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-900 mb-4">Dashboard</h1>
      <div className="grid grid-cols-4 gap-3 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="border border-gray-200 rounded p-4">
            <div className="text-2xl font-semibold text-gray-900">{c.value}</div>
            <div className="text-xs text-gray-500 mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mb-3">Recently Updated Activities</h2>
      {data.recentActivities.length === 0 ? (
        <p className="text-sm text-gray-400">No activities yet.</p>
      ) : (
        <div className="border border-gray-200 rounded divide-y divide-gray-100">
          {data.recentActivities.map((a) => (
            <div key={a.id} className="px-4 py-3 flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900">{a.what}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {a.tags.map((t) => <TagChip key={t.id} name={t.name} category={t.category} />)}
                </div>
              </div>
              <ResponsibilityBadge value={a.responsibility} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
