import { Router } from 'express';
import { projectService } from '../services.js';
import { projectInput } from '../../../shared/schemas.js';

export const projectRouter = Router();

projectRouter.get('/', async (req, res) => {
  const { experienceId, tagId, search } = req.query;
  const items = await projectService.list({
    experienceId: experienceId as string | undefined,
    tagId: tagId as string | undefined,
    search: search as string | undefined,
  });
  res.json(items);
});

projectRouter.get('/:id', async (req, res) => {
  const item = await projectService.get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

projectRouter.post('/', async (req, res) => {
  const parsed = projectInput.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { tagIds, ...data } = parsed.data;
  const item = await projectService.create(data, tagIds);
  res.status(201).json(item);
});

projectRouter.put('/:id', async (req, res) => {
  const parsed = projectInput.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { tagIds, ...data } = parsed.data;
  try {
    const item = await projectService.update(req.params.id, data, tagIds);
    res.json(item);
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});

projectRouter.delete('/:id', async (req, res) => {
  try {
    await projectService.remove(req.params.id);
    res.status(204).end();
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});
