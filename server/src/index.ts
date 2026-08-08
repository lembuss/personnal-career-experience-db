import express from 'express';
import cors from 'cors';
import { experienceRouter } from './routes/experiences.js';
import { projectRouter } from './routes/projects.js';
import { activityRouter } from './routes/activities.js';
import { tagRouter } from './routes/tags.js';
import { experienceService, projectService, activityService, tagService } from './services.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/experiences', experienceRouter);
app.use('/api/projects', projectRouter);
app.use('/api/activities', activityRouter);
app.use('/api/tags', tagRouter);

app.get('/api/dashboard', async (_req, res) => {
  const [experiences, projects, activities, tags, recent] = await Promise.all([
    experienceService.list(),
    projectService.list(),
    activityService.list(),
    tagService.list(),
    activityService.recent(5),
  ]);
  res.json({
    counts: {
      experiences: experiences.length,
      projects: projects.length,
      activities: activities.length,
      tags: tags.length,
    },
    recentActivities: recent,
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
