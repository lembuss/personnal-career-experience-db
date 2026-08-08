import type { Responsibility, TagCategory } from '../../../shared/schemas.js';
import { responsibilityColors, tagCategoryColors, tagCategoryLabels } from '../lib/constants';

export function ResponsibilityBadge({ value }: { value: Responsibility }) {
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${responsibilityColors[value]}`}>
      {value}
    </span>
  );
}

export function TagChip({ name, category }: { name: string; category: TagCategory }) {
  return (
    <span className={`inline-block px-2 py-0.5 text-xs rounded ${tagCategoryColors[category]}`}>
      {name}
    </span>
  );
}

export function CategoryLabel({ category }: { category: TagCategory }) {
  return <span className="text-xs text-gray-500">{tagCategoryLabels[category]}</span>;
}
