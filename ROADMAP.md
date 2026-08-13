# Career Positioning & CV System — Master Roadmap

## The Ultimate Goal

The goal is **not simply to make a better CV**.

The goal is to build a structured, reusable representation of your professional and academic career that allows us to:

> **Capture everything you've actually done → structure the evidence → identify your strongest professional narratives → build a comprehensive Master CV → derive targeted CVs → support job, research, academic and scholarship applications.**

Your central professional positioning is:

> **Aircraft Systems Engineer / Aerospace R&D Engineer with end-to-end systems lifecycle experience across requirements, architecture, allocation, implementation, integration, verification, validation, testing and deployment, spanning manned aircraft and complete UAS, with particular strength at the hardware/software boundary.**

The system we are building should make that positioning **demonstrable**, rather than merely claiming it.

---

## Overall Architecture

```
                    YOUR CAREER
                        │
                        ▼
              ┌───────────────────┐
              │ CAREER DATABASE   │
              │                   │
              │ Everything done   │
              │ Structured data   │
              │ Evidence/context  │
              └─────────┬─────────┘
                        │
              Manual selection/review
                        │
                        ▼
              ┌───────────────────┐
              │   MASTER CV       │
              │                   │
              │ Complete career   │
              │ narrative         │
              └─────────┬─────────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
      Industry       Research     Scholarship
         CV             CV             CV
          │             │             │
          └─────────────┼─────────────┘
                        ▼
                 TARGETED APPLICATION
```

The **database is the source of truth**. The CVs are interpretations of that source.

---

## Phase 1 — Build and Stabilize the Database

- [x] Finish `career-experience-db` V1
- [x] Verify Experiences, Projects, Activities, Tags all work
- [x] Verify search and filtering
- [x] Confirm data persistence
- [x] Confirm backup/export mechanism
- [x] Establish a simple workflow for adding new experiences

**Principle:** adding information must remain easier than forgetting it.

---

## Phase 2 — Build the Complete Career Inventory

### Professional
- [x] Amazilia Aerospace
- [x] HORYZN
- [x] Kipepeo Aerospace
- [x] Kendrone
- [x] ALS

### Academic
- [x] TUM MSc
- [x] LEAD! Program
- [x] METU BSc
- [x] TUM student assistantship
- [x] METU student assistantship
- [x] SI-PASS Calculus I & II

### Projects
- [x] Kolibri eVTOL
- [x] UAM throughput modelling
- [x] Autonomous Sub-Terrain UAV
- [x] Agricultural UAS
- [x] Other significant university projects

### Relevant Trainings
- [x] KCAA RPL & Instructor @ Kendrone 2021
- [x] Full Stack Software Develoment @ eMobilis 2020
- [x] KCAA PPL @ Skylink flight services 2015

### Independent Project Work & Volunteering
- [x] GIS work with Shalom
- [x] Project Mentor @ Young scientist kenya with two projects
    - [x] Aircraft refueling rig
    - [x] hydrogen hybrid engine

### Leadership - deprecated
- [ ] Aerospace Society Vice President @ METU
- [ ] International Student Association Secretary General @ METU
- [ ] MUN President @ METU


We should **not trust the current CV to be complete**. It is our starting point, not the definitive record.

---

## Phase 3 — Reconstruct Each Experience Deeply

For every major experience, answer:

- **Context** — What was the organization/project trying to achieve?
- **Role** — What were you actually responsible for?
- **Systems** — What aircraft/system/subsystems did you work on?
- **Lifecycle** — Which stages did you personally perform?
- **Technical domains** — What disciplines were involved?
- **Tools** — What technologies did you actually use?
- **Problems** — What went wrong?
- **Engineering decisions** — What did you personally decide?
- **Results** — What changed because of your work?
- **R&D** — What was novel, experimental or exploratory?
- **Evidence** — What can substantiate the claim?

---

## Phase 4 — Establish Your Actual Technical Competency Map

Once the database is populated, analyze it — not "I know Python" but:

> "Where have I demonstrated Python, at what level, and in what engineering context?"

| Domain | Evidence | Depth | Context |
|---|---|---|---|
| Aircraft Systems | Multiple projects | High | Manned + UAS |
| Avionics | Multiple roles | High | Integration/R&D |
| Embedded Systems | Multiple projects | Medium/High | UAS |
| Autonomy | Multiple projects | High | UAS/eVTOL |
| HIL | Amazilia | High | Aircraft systems |
| Flight Testing | HORYZN/Kipepeo | High | UAS |
| MBSE | Kipepeo | Medium/High | UAS architecture |

---

## Phase 5 — Identify Your Professional Narrative

- **Primary identity:** Aircraft Systems Engineer
- **Secondary identity:** Aerospace R&D / Systems Integration Engineer
- **Specialist themes:** Avionics · Embedded systems · UAS · Autonomous aircraft · Hardware/software integration · Advanced Air Mobility

Do not finalize the hierarchy until the database is complete.

---

## Phase 6 — Build the Master CV

Target structure:

1. Header — name, title, contact
2. Professional Profile — concise positioning statement
3. Core Engineering Competencies
4. Professional Experience
5. Selected Engineering / R&D Projects
6. Education — including accurately represented TUM MSc status
7. Research & Publications — including AIAA work
8. Teaching & Academic Experience
9. Leadership
10. Certifications & Licences
11. Technical Skills — organized, not a keyword dump
12. Languages

---

## Phase 7 — CV Variants

| Variant | Target Roles | Emphasis |
|---|---|---|
| CV A — Aircraft Systems | Systems/Avionics/Flight Systems Engineer | Lifecycle · avionics · integration · V&V |
| CV B — UAS / Autonomy | UAS/UAV/Autonomous Systems Engineer | UAS · autonomy · embedded · sensors · comms |
| CV C — Aerospace R&D | R&D/Research/Advanced Systems Engineer | Experimental systems · research · simulation |
| CV D — Academic/Research | Research Assistant · PhD · University positions | Research · publication · teaching · depth |
| CV E — Scholarship | TUM funding · MSc completion | Academic trajectory · research · future direction |

---

## Phase 8 — Technical Portfolio

Case studies for 5–7 major projects. Likely candidates:

- Kolibri eVTOL
- Amazilia aircraft systems
- Kipepeo UAS
- Autonomous Sub-Terrain UAV
- UAM throughput model
- Agricultural UAS

Each case study: Problem → Requirements → Architecture → Contribution → Implementation → Integration → Testing → V&V → Result

---

## Phase 9 — Job Strategy

**Primary geographies:** Germany, Netherlands, France, Belgium, Austria, Switzerland, UK, broader Europe. Also Kenya and African aerospace/UAS opportunities.

**Target sectors:** Aircraft OEMs · Aerospace suppliers · UAS companies · eVTOL/AAM · Autonomous systems · Avionics · Robotics · Aerospace R&D · Deep-tech startups

Search for the actual roles matching your evidence — not just "Aerospace Engineer."

---

## Phase 10 — Scholarship / MSc Completion Strategy

Runs **in parallel** with employment. Potential routes:

- TUM funding
- External scholarships
- Research assistant positions
- Thesis/industry collaboration opportunities

Objective: get income quickly while simultaneously creating a credible pathway back to TUM.

---

## Phase 11 — Application System

```
JOB DESCRIPTION → Identify requirements → Match against Career Database
→ Select relevant evidence → Select CV variant → Tailor CV
→ Cover letter → Application → Record application → Interview prep
```

---

## Phase 12 — Interview Preparation

Build a library of evidence-backed stories:

- **Technical** — hardest integration problem solved
- **Systems** — a system you designed end-to-end
- **Failure** — something that didn't work and what you did
- **Leadership** — leading a technical team
- **Research** — your research contribution
- **Verification** — how you demonstrated requirements were met

---

## Things We Must Never Do

- Inflate responsibilities
- Invent metrics
- Claim qualifications not awarded
- Turn exposure into expertise
- Confuse team achievements with personal achievements
- Use buzzwords without evidence
- Hide the incomplete MSc
- Let the CV become a biography

**The database can be exhaustive. The CV must be selective.**

---

## Important Unresolved Issue — TUM MSc

Exact formal status must be established before the final CV. Substantial coursework completed, thesis not completed, 17 credits remaining, intends to return. Potential presentation:

> M.Sc. Aerospace Engineering — Technical University of Munich  
> *Degree completion pending*

---

## Immediate Next Actions

1. Test the data-entry workflow
2. Enter **Amazilia** first — work through it activity by activity
3. Refine database structure if something cannot be represented cleanly
4. Move to HORYZN → Kipepeo → academic/teaching → projects
5. Once sufficiently populated: perform career evidence analysis
6. Only then build the Master CV

**Resist the temptation to start polishing the CV halfway through the inventory. The database comes first.**

---

## Definition of Success

- [ ] Career Database — structured, continuously maintainable
- [ ] Master CV — comprehensive, polished
- [ ] Industry CV — optimized for aircraft/UAS systems roles
- [ ] R&D CV — optimized for aerospace research roles
- [ ] Academic CV — optimized for research/university opportunities
- [ ] Scholarship CV — optimized for MSc completion/funding
- [ ] Technical Portfolio — evidence-backed case studies
- [ ] Application workflow — repeatable system
- [ ] Interview library — evidence-backed stories