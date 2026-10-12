# Plan — Ailments & Therapies

**Phase:** Roadmap Phase 3
**Status:** Draft for review — no code until approved

Work is grouped into small, independently verifiable task groups. Each group
leaves the app building and runnable. Order matters: data layer first, then
read pages, then write actions, then the cross-links, then seed + verify.

---

## Group 1 — Schema: join tables

1. Add `agent_ailments` and `therapy_ailments` tables to
   `src/db/schema.sql` (both with `IF NOT EXISTS`, FKs with `ON DELETE
   CASCADE`, and a `UNIQUE` constraint on the pair).
2. Add TypeScript row types for both join tables to `src/db/types.ts`.

**Done when:** schema applies cleanly on next DB open; types compile.

## Group 2 — Data access: ailments & therapies

3. Create `src/db/ailments.ts`: `listAilments`, `getAilment`, `createAilment`,
   `updateAilment`.
4. Create `src/db/therapies.ts`: `listTherapies`, `getTherapy`,
   `createTherapy`, `updateTherapy`.

**Done when:** functions compile and return typed rows.

## Group 3 — Data access: relationships

5. In `src/db/agents.ts` (or a new `relationships.ts`): `attachAilmentToAgent`,
   `removeAilmentFromAgent`, `listAilmentsForAgent`. Use `INSERT OR IGNORE`
   against the unique constraint so duplicates are no-ops.
6. Add `associateTherapyAilment`, `dissociateTherapyAilment`,
   `listAilmentsForTherapy`, `listTherapiesForAilment`, `listAgentsForAilment`.

**Done when:** functions compile; duplicate inserts are no-ops.

## Group 4 — Ailments pages

7. `src/app/ailments/page.tsx` — list ailments (cards, severity shown).
8. `src/app/ailments/[id]/page.tsx` — detail: description, severity,
   "Treated by" therapies, "Affected agents".
9. `src/app/ailments/new/page.tsx` + `[id]/edit/page.tsx` + a shared
   `AilmentForm.tsx` client component.
10. `src/app/ailments/actions.ts` — create/edit Server Actions with validation
    (name required; severity in mild|moderate|severe).

**Done when:** all four ailment routes render; create/edit validated.

## Group 5 — Therapies pages

11. `src/app/therapies/page.tsx` — list therapies (name, duration).
12. `src/app/therapies/[id]/page.tsx` — detail + "Treats these ailments"
    section with associate/remove controls.
13. `src/app/therapies/new/page.tsx` + `[id]/edit/page.tsx` + shared
    `TherapyForm.tsx`.
14. `src/app/therapies/actions.ts` — create/edit + associate/dissociate ailment
    Server Actions.

**Done when:** all therapy routes render; associate/remove works.

## Group 6 — Agent detail: ailments section

15. Add an "Ailments" section to `src/app/agents/[id]/page.tsx` listing the
    agent's ailments with a remove control.
16. Add an attach control (select existing ailment + submit) wired to a Server
    Action in `src/app/agents/actions.ts`.

**Done when:** attach/remove on an agent reflects immediately after submit.

## Group 7 — Navigation & seed

17. Add nav links so Agents / Ailments / Therapies are reachable (home page
    and/or a simple header).
18. Extend `src/db/seed.ts` to populate `agent_ailments` and
    `therapy_ailments` so relationships are visible on first load. Keep it
    idempotent.

**Done when:** `npm run db:seed` shows non-zero link counts; pages show links.

## Group 8 — Verify

19. Run `npm run typecheck` — must exit 0.
20. Run `npm run build` — must exit 0; new routes appear in the route table.
21. Run `npm run dev` and confirm via curl/browser: ailments and therapies
    lists render seeded rows; an agent detail shows attached ailments; a
    therapy detail shows associated ailments.
22. Reset DB to clean seed after verification.

**Done when:** all checks in `validation.md` pass.

---

## Notes / decisions

- **Join tables over arrays:** SQLite has no array type and the relationships
  are genuinely many-to-many, so join tables are the correct model.
- **`INSERT OR IGNORE`** enforces idempotent attach/associate against the unique
  constraints (satisfies the "no duplicates" acceptance criterion).
- **Pattern reuse:** mirrors Phase 2 exactly (Server Components for reads,
  Server Actions for writes, `useActionState` forms) for consistency and easy
  teaching.
