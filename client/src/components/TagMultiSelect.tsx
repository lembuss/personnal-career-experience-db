import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { Tag, TagCategory } from '../../../shared/schemas.js';
import { tagCategoryColors, tagCategoryLabels } from '../lib/constants';

interface Props {
  tags: Tag[];
  selected: string[];
  onChange: (ids: string[]) => void;
  placeholder?: string;
}

export function TagMultiSelect({ tags, selected, onChange, placeholder = 'Select tags' }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const grouped = tags.reduce<Record<string, Tag[]>>((acc, t) => {
    (acc[t.category] ||= []).push(t);
    return acc;
  }, {});

  const filtered = search
    ? Object.fromEntries(
        Object.entries(grouped).map(([cat, items]) => [
          cat,
          items.filter((t) => t.name.toLowerCase().includes(search.toLowerCase())),
        ])
      )
    : grouped;

  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  };

  const selectedTags = tags.filter((t) => selected.includes(t.id));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full min-h-[38px] px-3 py-1.5 text-left border border-gray-300 rounded text-sm flex items-center justify-between gap-2 hover:border-gray-400"
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {selectedTags.length === 0 ? (
            <span className="text-gray-400">{placeholder}</span>
          ) : (
            selectedTags.map((t) => (
              <span key={t.id} className={`inline-block px-1.5 py-0.5 text-xs rounded ${tagCategoryColors[t.category as TagCategory]}`}>
                {t.name}
              </span>
            ))
          )}
        </div>
        <ChevronDown size={16} className="text-gray-400 shrink-0" />
      </button>
      {open && (
        <div className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-64 overflow-y-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tags..."
            className="w-full px-3 py-2 text-sm border-b border-gray-100 sticky top-0 bg-white"
            autoFocus
          />
          {Object.entries(filtered).map(([cat, items]) =>
            items.length === 0 ? null : (
              <div key={cat}>
                <div className="px-3 py-1 text-xs font-semibold text-gray-500 bg-gray-50">
                  {tagCategoryLabels[cat as TagCategory]}
                </div>
                {items.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggle(t.id)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-50 text-left"
                  >
                    <span className={`w-4 h-4 flex items-center justify-center rounded border ${selected.includes(t.id) ? 'bg-gray-800 border-gray-800' : 'border-gray-300'}`}>
                      {selected.includes(t.id) && <Check size={12} className="text-white" />}
                    </span>
                    {t.name}
                  </button>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
