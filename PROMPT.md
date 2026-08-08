# Initial Bolt Prompt 

Build a local personal Career Experience Database web application for an aerospace engineer.

This is a personal tool, not a commercial product. Keep it minimal, clean and fully functional.

## Stack
- React + TypeScript + Vite (frontend)
- Node.js + Express + TypeScript (backend)
- SQLite via Prisma ORM (database)
- Tailwind CSS (styling)
- Zod (validation)

Do not use PostgreSQL, MongoDB, Firebase, GraphQL, Redux, or any authentication library.

## Project Structure
```bash
/client    React + Vite frontend
/server    Node.js + Express backend
/shared    Shared TypeScript types and Zod schemas
```

Keep database logic in a service layer. Keep business logic out of React components.

## Database Schema

Four entities: Experience, Project, Activity, Tag.

### Experience
```bash
id, title, organization, role, location,
startDate, endDate (nullable), current (boolean),
type (enum), description, createdAt, updatedAt
```

**Type enum:** Professional, Research, Academic, Teaching, Leadership, StudentProject, Other

### Project
```bash
id, experienceId (FK), name, description,
system, objective, outcome, isRnD (boolean),
notes, createdAt, updatedAt
```

### Activity
```bash
id, experienceId (FK), projectId (nullable FK),
what, how, responsibility (enum), result,
problem (nullable), diagnosis (nullable),
intervention (nullable), interventionResult (nullable),
notes, createdAt, updatedAt
```

**Responsibility enum** — enforce at DB, API and UI level. Must always render as a dropdown, never a text input:
- Exposure
- Assisted
- Contributed
- IndependentlyExecuted
- Led
- OwnedArchitected

### Tag
```bash
-id, name, category (enum: Lifecycle, TechnicalDomain, SkillTool, Other)
```

### Junction tables
ActivityTag (activityId, tagId)
ProjectTag (projectId, tagId)


## Seed Data

Seed these tags on first run. Do not create any Experience, Project or Activity records — leave those empty for the user to populate.

**Lifecycle:** Requirements, CONOPS, Functional Analysis, Architecture, Allocation, Interface Definition, Design, Implementation, Integration, Verification, Validation, Ground Testing, Flight Testing, Deployment, Operations, Maintenance

**Technical Domain:** Aircraft Systems, Systems Engineering, Avionics, Electrical Systems, Flight Controls, Embedded Systems, Software, Autonomy, Robotics, Communications, Sensors, Payloads, Ground Control Systems, Propulsion, Aerodynamics, Structures, Flight Test, Safety, Certification, Operations, Research, Simulation, Data Processing

**Skill/Tool:** Python, C, C++, Embedded C, MATLAB, ROS, HIL, CAN, Ethernet, RS-232, RS-422, UART, MBSE, Simulink, Raspberry Pi, Arduino, ANSYS, OpenFOAM, XFLR5, CATIA, SolidWorks, Autodesk Inventor, QGIS, Git

## API Endpoints
```bash
GET    /api/experiences
POST   /api/experiences
GET    /api/experiences/:id
PUT    /api/experiences/:id
DELETE /api/experiences/:id

GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id

GET    /api/activities
POST   /api/activities
GET    /api/activities/:id
PUT    /api/activities/:id
DELETE /api/activities/:id

GET    /api/tags
POST   /api/tags
PUT    /api/tags/:id
DELETE /api/tags/:id
```

Support these query params on GET /api/activities:

- experienceId
- projectId
- responsibility
- tagId
- search (across what, how, result, notes)

Support these query params on GET /api/projects:

- experienceId
- tagId
- search

Validate all request bodies with Zod.

## Frontend

Sidebar navigation: Dashboard · Experiences · Projects · Activities · Tags

### Dashboard

Counts only: total Experiences, Projects, Activities, Tags. List the 5 most recently updated Activities below the counts. No charts.

### Experiences

Searchable list. Add, edit, delete. Clicking an experience shows its detail view with its Projects and Activities listed beneath.

### Projects

Searchable list. Filter by Experience. Add, edit, delete. Clicking a project shows its detail view with Activities listed beneath.

### Activities

This is the primary interface. Display as a list showing: what, responsibility badge, linked experience and project, tags.

Filters:

- Experience (dropdown)
- Project (dropdown)
- Responsibility (dropdown)
- Tags (multi-select)
- Text search across what, how, result, notes

Add/edit form fields:

- Experience (required, dropdown)
- Project (optional, dropdown filtered by selected experience)
- What — what was actually done (required)
- How — technical methods and tools used
- Responsibility (required, dropdown — enum values only)
- Result — what happened as a result
- Tags (multi-select)
- Notes
- Problem & Solution (collapsible section containing: Problem, Diagnosis, Intervention, Intervention Result)

### Tags

List grouped by category. Add, rename, delete. User can create tags in any category.

## UI Rules

- Sidebar layout, dark or light neutral theme — no gradients
- Tables and lists for data display
- Responsibility level shown as a coloured badge (six distinct colours, one per level)
- Tag category shown as a subtle coloured chip
- Forms open in a side panel or inline — not full-page navigation
- No animations, no decorative graphics, no excessive whitespace
- The app must feel like a personal engineering tool, not a SaaS product

## Coding Rules

- Simplicity over abstraction
- Working functionality over visual polish
- Do not add features not listed in this spec
- Do not add dependencies unless clearly necessary
- The codebase must be small enough for a single developer to read and modify entirely

## Deliver

A fully working application where:

1. The database initializes and seeds correctly on first run
2. All four entities support full CRUD
3. Activity filtering and search work correctly
4. The responsibility field is always a dropdown, never a text input
5. The Problem & Solution section is present but collapsible
6. The app runs with a single command after npm install