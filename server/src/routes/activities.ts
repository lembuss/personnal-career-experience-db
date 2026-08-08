import { Router } from 'express';
import { activityService } from '../services.js';
import { activityInput } from '../../../shared/schemas.js';

export const activityRouter = Router();

activityRouter.get('/', async (req, res) => {
  const { experienceId, projectId, responsibility, tagId, search } = req.query;
  const items = await activityService.list({
    experienceId: experienceId as string | undefined,
    projectId: projectId as string | undefined,
    responsibility: responsibility as string | undefined,
    tagId: tagId as string | undefined,
    search: search as string | undefined,
  });
  res.json(items);
});

activityRouter.get('/:id', async (req, res) => {
  const item = await activityService.get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

activityRouter.post('/', async (req, res) => {
  const parsed = activityInput.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { tagIds, ...data } = parsed.data;
  const item = await activityService.create(data, tagIds);
  res.status(201).json(item);
});

activityRouter.put('/:id', async (req, res) => {
  const parsed = activityInput.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { tagIds, ...data } = parsed.data;
  try {
    const item = await activityService.update(req.params.id, data, tagIds);
    res.json(item);
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});

activityRouter.delete('/:id', async (req, res) => {
  try {
    await activityService.remove(req.params.id);
    res.status(204).end();
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});
