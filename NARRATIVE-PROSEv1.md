# Brian Lembuss — Professional Narrative

---

Brian grew up wanting to understand how aircraft worked. That instinct — to trace a system back to its first principles, to understand not just that it flies but *why* — has shaped every chapter of his career since.

He studied aerospace engineering at the Middle East Technical University in Northern Cyprus, graduating with honours. The degree was rigorous and mathematical: aerodynamics, propulsion, structures, numerical methods, finite element analysis, CFD. He learned to build solvers from scratch in FORTRAN and MATLAB, to model composite beams, to size a turbofan compressor, to take a blank page and produce a complete conceptual aircraft design. It was the kind of training that teaches you to trust the physics.

Before he finished, he spent a summer at ALS in Nairobi — his first encounter with real aircraft as a working engineer. Fuel nozzle replacements on a PT6A turboprop engine. De-icer boot reinstallation on a DHC-8. Nose landing gear servicing on an ERJ145 during a C-check. Unglamorous work, and exactly the right start. You cannot claim to be an aircraft systems engineer without having stood next to a real aircraft and understood what it takes to keep it flying.

---

He enrolled in the M.Sc. Aerospace Engineering programme at TU Munich in 2021 — and while the degree is not yet complete, what happened in Munich over the following years is significant in its own right.

At TU Munich, he worked on four research projects that would each have been strong standalone experiences. He refactored the data logging architecture of an Actuator Control and Monitoring Unit in embedded C++ — using test-driven development and dependency injection to achieve an 80% reduction in log frame size and a five-times improvement in data throughput. He built the autonomous perception and mapping pipeline for a sub-terrain UAV challenge: depth-to-point-cloud processing, 3D OctoMap voxel grid generation, full autonomous flight in an unknown cave environment. He developed a Python simulation toolchain modelling eVTOL throughput at Munich Airport — work that was published as a co-authored AIAA paper — and ran CFD simulations on multirotor flow fields in OpenFOAM. This is not the profile of someone who attended a postgraduate programme. It is the profile of someone who used it.

Around the same time, he took on an instructor role at the TU Munich Institute for Rotorcraft and Vertical Flight, guiding student cohorts through IFR helicopter operations on a fixed-base EC135 simulator. He also completed a LEAD! leadership programme at the University of Cologne, producing a full MBSE-based system architecture for an agricultural UAS — work graded *Sehr gut*.

---

In parallel with TUM, Brian spent two years at Amazilia Aerospace in Munich as a systems engineering working student. This is where his systems lifecycle credentials became concrete.

He worked across four simultaneous engineering projects. The first was a ground control station for the Wings for Aid MiniFreighter — a real cargo UAS actively deployed with the World Food Programme in Africa. He took it from a joint design evaluation with the Wings for Aid CEO and chief pilot through procurement, mechanical assembly, electrical integration, functional testing, customer acceptance, and serial production of five units. Five GCS units built and delivered to an operational programme. That is not a student project.

Alongside it, he designed a hardware-in-the-loop test rig for Amazilia's aircraft fleet from scratch — specifying requirements, designing the full server rack assembly in CAD, procuring components, performing mechanical and electrical integration, and running verification and validation testing until the rig could simulate, monitor and control aircraft systems in-lab. Real flight hardware throughout. The kind of infrastructure that gives a small UAV company its in-house test capability.

When a polarity reversal incident damaged a Pipistrel aircraft during field testing, he was the one who analysed the failure, established the requirements, developed the system architecture for a dual-voltage aircraft battery charging unit with polarity protection, and produced the complete design package — wiring diagrams, enclosure CAD, panel designs, BOM — before handing it over on departure. Nothing was lost. The work was done.

---

Running concurrently with Amazilia, Brian was also a member of HORYZN — the TU Munich student aerospace team developing the Kolibri, a hybrid lift-and-cruise eVTOL UAS.

He joined as Aerodynamics Project Engineer. The programme had a problem: its predecessor configuration, called Frankenstein, had failed in transition. The aerodynamics team needed to select a new configuration that could actually make the transition from hover to forward flight. Brian proposed the Cessna-type fixed-wing configuration with a front tractor propeller. It was adopted. The Kolibri was built around it.

He spent a year developing and maintaining the aerodynamics module within HORYZN's multidisciplinary design optimisation loop — delivering aerodynamic coefficients, forces, moments, and aeromap data to propulsion, structures, and geometry teams — then handed it over with full documentation and moved into a new role: Project Manager for Systems Integration and Flight Testing.

As PM, he coordinated across avionics, flight test, CAD, and systems teams, integrated PX4 avionics on the vehicle, ran ground testing and hover trials, prepared SORA regulatory documentation, secured access to the Oberpfaffenhofen test facility, and participated in the final transition flight test campaign. The transition flight was successful. Mission Pulse Phase 2 concluded. The Kolibri completed its full development lifecycle — from configuration selection to flight — with Brian present across the whole arc.

---

In late 2024, Brian founded Kipepeo Aerospace in Nairobi as Founding CEO and Lead Systems Engineer. The ambition was to build a Kenyan UAV OEM.

What he produced technically over the following period is extensive. The TAI UAS — a 2-metre delta-wing hybrid eVTOL tactical platform — moved from concept through full requirements definition, system architecture, avionics and power distribution design, 3D CAD, and a procurement-ready BOM. The Kilimo Anga agricultural programme developed a quadrotor testbed, integrated a custom multispectral payload called AngaCam (including a 3D-printed housing designed in-house), and built out field operations across Nakuru County and Kericho.

AngaStack — the aerial crop intelligence platform underpinning Kilimo Anga — was built twice. Version 1 delivered a fully functional cloud platform on Azure: automated image ingestion, a photogrammetry pipeline, vegetation index raster generation, a FastAPI backend, and a web application live at angaview.kipepeo.space, validated in the field. Version 2 migrated the entire architecture to GCP, rebuilt the photogrammetry pipeline as an ephemeral serverless batch processor on Cloud Run, added mobile ingestion, and introduced AngAi — an agronomic reasoning engine using retrieval-augmented generation on Vertex AI, producing context-aware crop health action cards in Firestore. Production-grade infrastructure. Built by one person.

The Linda Nchi programme produced a formal system architecture and technical roadmap for a sovereign ISR platform — hybrid VTOL airframe, EO/IR gimbal, COFDM datalink, dual-node GCS, and an air-gapped intelligence pipeline — aligned with Kenyan defense and data protection frameworks.

The company attracted Google Cloud for Startups and Microsoft for Startups credits, secured its first external capital via a SAFE agreement, was selected as one of 16 semi-finalists in an investor readiness programme, and reached Top 50 African Innovator status in the MK-Africa sustainable venture challenge. Brian built the governance structure, executed three strategic MoUs, assembled a seven-member team, and brought in a co-founder as COO. He also validated the market: 93.9% farmer interest rate across the field trial cohort, 325 KES/acre willingness-to-pay baseline, 9,521-acre breakeven threshold. These are not aspirational figures — they came from a 30-day live field deployment.

---

The thread that runs through all of it — from FORTRAN solvers at METU to serverless inference pipelines at Kipepeo — is that Brian operates fluently on both sides of the hardware/software boundary. He has designed mechanical assemblies and written the embedded software that runs inside them. He has integrated avionics hardware and built the ground control systems that command it. He has run flight tests and built the cloud platforms that process the data they generate. That combination — deep aerospace systems engineering with genuine software depth — is not common at this stage of a career, and it is not accidental. It reflects a consistent instinct to own the whole problem.

He taught calculus to undergraduates as an SI-PASS instructor. He graded numerical methods assignments as a TA. He guided student pilots through IFR procedures in a flight simulator. He mentored two secondary school students through engineering projects at Young Scientists Kenya — one of whom demonstrated a 43.6% fuel efficiency improvement on a hydrogen-hybrid engine at a national exhibition. He has always found ways to pass it on.

His M.Sc. at TU Munich remains incomplete — 17 credits and a thesis outstanding. He intends to return and finish. The academic instinct that brought him to Munich has not gone anywhere.

---

Brian is currently based in Nairobi. He is looking for roles in aircraft systems engineering, aerospace R&D, and UAS development — in Europe and globally, and across the emerging aerospace sector in Africa. He brings a systems engineering foundation built across manned aircraft, fixed-wing UAS, rotorcraft, and eVTOL platforms, a hardware/software range that is genuinely unusual, and the disposition of someone who has been responsible for the whole thing — not just his part of it.

He is ready for what is next.