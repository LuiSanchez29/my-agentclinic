# Requirements — Ailments & Therapies

**Phase:** Roadmap Phase 3
**Status:** Draft for review

## Goal

Give each agent (patient) a record of their ailments, and let the clinic
associate therapies with those ailments. This builds on the existing agents
feature (Phase 2) and the data layer (Phase 1).

## Scope

### In scope

1. **Attach ailments to agents.**
   - An agent can have zero or more ailments.
   - From an agent's detail page, staff can attach an existing ailment to the
     agent and remove one.
   - The agent detail page lists that agent's current ailments.

2. **Manage therapies.**
   - List all therapies the clinic offers.
   - View a single therapy.
   - Create and edit a therapy (name, description, duration).

3. **Associate therapies with ailments.**
   - A therapy can treat zero or more ailments; an ailment can be treated by
     zero or more therapies (many-to-many).
   - From a therapy's detail page, staff can associate/disassociate ailments.
   - From an ailment's detail page, show which therapies treat it.

4. **Manage ailments (catalog).**
   - List all ailments, view a single ailment, create and edit an ailment
     (name, description, severity).

### Out of scope (later phases)

- Appointments / booking (Phase 4).
- The unified dashboard (Phase 5).
- Deleting agents, ailments, or therapies (not required yet).
- Authentication / staff accounts.

## Data model changes

The `agents`, `ailments`, `therapies`, `appointments` tables already exist
(Phase 1). This phase adds two join tables:

- `agent_ailments` — links an agent to an ailment (many-to-many).
  - `agent_id` → agents(id) ON DELETE CASCADE
  - `ailment_id` → ailments(id) ON DELETE CASCADE
  - unique on (agent_id, ailment_id)
  - `noted_at` timestamp

- `therapy_ailments` — links a therapy to an ailment (many-to-many).
  - `therapy_id` → therapies(id) ON DELETE CASCADE
  - `ailment_id` → ailments(id) ON DELETE CASCADE
  - unique on (therapy_id, ailment_id)

No changes to existing columns. Schema additions use `IF NOT EXISTS` so the
change is additive and safe to re-apply.

## UX / routes

- `/ailments` — list ailments
- `/ailments/new`, `/ailments/[id]`, `/ailments/[id]/edit`
- `/therapies` — list therapies
- `/therapies/new`, `/therapies/[id]`, `/therapies/[id]/edit`
- Agent detail (`/agents/[id]`) gains an "Ailments" section with attach/remove.
- Therapy detail gains an "Treats these ailments" section with associate/remove.
- Ailment detail shows "Treated by" therapies and "Affected agents".

Follows the existing Server Component (reads) + Server Action (writes) pattern,
reusing the current styling in `globals.css`.

## Acceptance criteria

- [ ] An ailment can be attached to an agent and removed; the agent detail page
      reflects it.
- [ ] Therapies can be listed, viewed, created, and edited.
- [ ] Ailments can be listed, viewed, created, and edited.
- [ ] A therapy can be associated with one or more ailments and disassociated;
      both the therapy and ailment detail pages reflect it.
- [ ] Attaching the same ailment twice (to an agent, or to a therapy) does not
      create duplicates.
- [ ] `npm run typecheck` and `npm run build` pass.
- [ ] Seed data demonstrates the relationships out of the box.
