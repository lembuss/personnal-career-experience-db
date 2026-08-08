# Career Experience Database

A local personal career experience tracking tool for an aerospace engineer. Records experiences, projects, activities, and tags with full CRUD, filtering, and search.

## Tech Stack

- **Frontend:** React + TypeScript + Vite, Tailwind CSS, Lucide icons
- **Backend:** Node.js + Express + TypeScript
- **Database:** SQLite via Prisma ORM
- **Validation:** Zod (shared schemas)

## Folder Structure

```
project/
├── package.json                  # Root workspace config + scripts
├── shared/
│   └── schemas.ts                # Zod schemas + shared TypeScript types
│
├── client/                       # React + Vite frontend
│   ├── package.json
│   ├── vite.config.ts            # Vite config with /api proxy to port 3001
│   ├── index.html
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.tsx              # React entry point
│       ├── App.tsx               # Sidebar nav + view router
│       ├── index.css             # Tailwind + .input component class
│       ├── vite-env.d.ts
│       ├── lib/
│       │   ├── api.ts            # Fetch wrapper for all /api endpoints
│       │   └── constants.ts      # Enum values, badge colors, category labels
│       ├── components/
│       │   ├── SidePanel.tsx     # Slide-over panel for forms
│       │   ├── Badges.tsx        # ResponsibilityBadge, TagChip, CategoryLabel
│       │   ├── TagMultiSelect.tsx
│       │   ├── ExperienceForm.tsx
│       │   ├── ProjectForm.tsx
│       │   └── ActivityForm.tsx  # Includes collapsible Problem & Solution section
│       └── views/
│           ├── DashboardView.tsx
│           ├── ExperiencesView.tsx
│           ├── ProjectsView.tsx
│           ├── ActivitiesView.tsx
│           └── TagsView.tsx
│
└── server/                       # Node.js + Express backend
    ├── package.json
    ├── tsconfig.json
    ├── .env                      # DATABASE_URL (file:./dev.db)
    ├── prisma/
    │   ├── schema.prisma          # Experience, Project, Activity, Tag + junction tables
    │   └── seed.ts               # Seeds 63 tags across 3 categories on first run
    └── src/
        ├── index.ts              # Express app, routes, /api/dashboard endpoint
        ├── prisma.ts             # PrismaClient singleton
        ├── services.ts           # Service layer (all DB logic lives here)
        └── routes/
            ├── experiences.ts
            ├── projects.ts
            ├── activities.ts
            └── tags.ts
```

## Prerequisites

- Node.js 18 or newer
- npm

## Setup & Run

From the project root:

```bash
# 1. Install all dependencies (root, client, and server workspaces)
npm install

# 2. Start both frontend and backend in dev mode
npm run dev
```

That single `npm run dev` command does the following automatically on the server side:
- Runs `prisma db push` — creates the SQLite database file and tables
- Runs `prisma seed` — inserts the 63 predefined tags (idempotent, safe to re-run)
- Starts the Express server with `tsx watch` (auto-restarts on file changes)

The Vite dev server starts on `http://localhost:5173` and proxies all `/api/*` requests to the backend on port 3001.

Open `http://localhost:5173` in your browser to use the app.

## First Run Details

On first `npm run dev`:
1. A `server/dev.db` SQLite file is created.
2. 63 tags are seeded across three categories:
   - **Lifecycle** (16 tags): Requirements, CONOPS, Functional Analysis, Architecture, Allocation, Interface Definition, Design, Implementation, Integration, Verification, Validation, Ground Testing, Flight Testing, Deployment, Operations, Maintenance
   - **Technical Domain** (23 tags): Aircraft Systems, Systems Engineering, Avionics, Electrical Systems, Flight Controls, Embedded Systems, Software, Autonomy, Robotics, Communications, Sensors, Payloads, Ground Control Systems, Propulsion, Aerodynamics, Structures, Flight Test, Safety, Certification, Operations, Research, Simulation, Data Processing
   - **Skill / Tool** (24 tags): Python, C, C++, Embedded C, MATLAB, ROS, HIL, CAN, Ethernet, RS-232, RS-422, UART, MBSE, Simulink, Raspberry Pi, Arduino, ANSYS, OpenFOAM, XFLR5, CATIA, SolidWorks, Autodesk Inventor, QGIS, Git
3. No experiences, projects, or activities are created — the database starts empty for you to populate.

## Available Scripts

| Command | Description |
|---|---|
| `npm install` | Install all workspace dependencies |
| `npm run dev` | Start frontend + backend in dev mode (both auto-reload) |
| `npm run build` | Type-check and build both client and server |
| `npm run dev:server` | Start only the backend |
| `npm run dev:client` | Start only the frontend |

## API Endpoints

All endpoints are prefixed with `/api`.

**Experiences**
- `GET /api/experiences` — list all
- `POST /api/experiences` — create
- `GET /api/experiences/:id` — detail (includes projects + activities)
- `PUT /api/experiences/:id` — update
- `DELETE /api/experiences/:id` — delete (cascades to projects + activities)

**Projects** (supports `?experienceId=`, `?tagId=`, `?search=` on GET list)
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:id` — detail (includes activities)
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

**Activities** (supports `?experienceId=`, `?projectId=`, `?responsibility=`, `?tagId=`, `?search=` on GET list)
- `GET /api/activities`
- `POST /api/activities`
- `GET /api/activities/:id`
- `PUT /api/activities/:id`
- `DELETE /api/activities/:id`

**Tags**
- `GET /api/tags`
- `POST /api/tags`
- `PUT /api/tags/:id`
- `DELETE /api/tags/:id`

**Dashboard**
- `GET /api/dashboard` — counts + 5 most recently updated activities

## Notes

- The database is a local SQLite file at `server/dev.db`. No external database server is required.
- All request bodies are validated with Zod schemas defined in `shared/schemas.ts`.
- The Responsibility field is always a dropdown (six enum values), never a text input — enforced at the schema, API, and UI levels.
- The Problem & Solution section in the activity form is collapsible and optional.
