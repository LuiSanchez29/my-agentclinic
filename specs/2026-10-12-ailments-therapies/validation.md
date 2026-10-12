# Validation — Ailments & Therapies

**Phase:** Roadmap Phase 3

Explicit done-criteria. Every item must pass before the phase is considered
complete.

## Build & types

- [ ] `npm run typecheck` exits 0.
- [ ] `npm run build` exits 0.
- [ ] Build route table lists: `/ailments`, `/ailments/new`, `/ailments/[id]`,
      `/ailments/[id]/edit`, `/therapies`, `/therapies/new`, `/therapies/[id]`,
      `/therapies/[id]/edit`.

## Data layer (via tsx, against the DB)

- [ ] `listAilments()` and `listTherapies()` return the seeded rows.
- [ ] `attachAilmentToAgent(agentId, ailmentId)` adds a link; calling it again
      with the same pair does **not** add a second row.
- [ ] `removeAilmentFromAgent(agentId, ailmentId)` removes the link.
- [ ] `associateTherapyAilment(therapyId, ailmentId)` is idempotent (no dupes).
- [ ] `listAilmentsForTherapy`, `listTherapiesForAilment`,
      `listAilmentsForAgent`, `listAgentsForAilment` return the expected linked
      rows.

## Pages (via dev server + curl/browser)

- [ ] `GET /ailments` renders the seeded ailment names.
- [ ] `GET /ailments/[id]` renders description, severity, "Treated by"
      therapies, and "Affected agents".
- [ ] `GET /therapies` renders the seeded therapy names and durations.
- [ ] `GET /therapies/[id]` renders the "Treats these ailments" section.
- [ ] `GET /agents/[id]` renders the agent's attached ailments.
- [ ] A missing id (e.g. `/ailments/999`) returns HTTP 404.

## Seed

- [ ] `npm run db:seed` reports non-zero counts for `agent_ailments` and
      `therapy_ailments`.
- [ ] Re-running the seed keeps counts stable (idempotent).

## Cleanup

- [ ] DB reset to the clean seed after verification.
- [ ] No stray test rows left behind.
