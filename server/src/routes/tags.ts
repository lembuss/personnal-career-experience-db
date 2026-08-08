import { Router } from 'express';
import { tagService } from '../services.js';
import { tagInput } from '../../../shared/schemas.js';

export const tagRouter = Router();

tagRouter.get('/', async (_req, res) => {
  const items = await tagService.list();
  res.json(items);
});

tagRouter.post('/', async (req, res) => {
  const parsed = tagInput.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const item = await tagService.create(parsed.data.name, parsed.data.category);
    res.status(201).json(item);
  } catch {
    res.status(409).json({ error: 'Tag already exists' });
  }
});

tagRouter.put('/:id', async (req, res) => {
  const parsed = tagInput.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const item = await tagService.update(req.params.id, parsed.data.name!, parsed.data.category!);
    res.json(item);
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});

tagRouter.delete('/:id', async (req, res) => {
  try {
    await tagService.remove(req.params.id);
    res.status(204).end();
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});
