import { Router } from 'express';
import { experienceService } from '../services.js';
import { experienceInput } from '../../../shared/schemas.js';

export const experienceRouter = Router();

experienceRouter.get('/', async (_req, res) => {
  const items = await experienceService.list();
  res.json(items);
});

experienceRouter.get('/:id', async (req, res) => {
  const item = await experienceService.get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

experienceRouter.post('/', async (req, res) => {
  const parsed = experienceInput.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const item = await experienceService.create(parsed.data);
  res.status(201).json(item);
});

experienceRouter.put('/:id', async (req, res) => {
  const parsed = experienceInput.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const item = await experienceService.update(req.params.id, parsed.data);
    res.json(item);
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});

experienceRouter.delete('/:id', async (req, res) => {
  try {
    await experienceService.remove(req.params.id);
    res.status(204).end();
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});
