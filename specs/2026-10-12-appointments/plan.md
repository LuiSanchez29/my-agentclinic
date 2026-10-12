# Plan — Appointments

**Phase:** Roadmap Phase 4

Small, independently verifiable task groups. Data layer first, then read pages,
then write actions, then integration, then verify. Executing all groups in one
pass.

## Group 1 — Data access

1. Create `src/db/appointments.ts` with a joined read model
   (`AppointmentWithRefs`: appointment fields + agent_name, therapy_name,
   ailment_name).
2. Functions: `listAppointments`, `getAppointment`, `getAppointmentWithRefs`,
   `createAppointment`, `updateAppointment`, `setAppointmentStatus`,
   `listAppointmentsForAgent`.

**Done when:** functions compile and return typed rows against the seed.

## Group 2 — List & detail pages

3. `src/app/appointments/page.tsx` — list, soonest first, upcoming vs. past
   badges, agent/therapy/ailment/status columns.
4. `src/app/appointments/[id]/page.tsx` — detail with linked refs and status
   controls (complete / cancel buttons via Server Actions).

**Done when:** both routes render seeded appointments; 404 on missing id.

## Group 3 — Book & edit

5. `src/app/appointments/AppointmentForm.tsx` — client form (agent select,
   therapy select optional, ailment select optional, datetime-local, status,
   notes) using `useActionState`.
6. `src/app/appointments/new/page.tsx` + `[id]/edit/page.tsx`.
7. `src/app/appointments/actions.ts` — `createAppointmentAction`,
   `updateAppointmentAction`, `setStatusAction` with validation (agent +
   scheduled_at required; status in enum).

**Done when:** booking and editing work; validation rejects bad input.

## Group 4 — Agent detail integration & nav

8. Add an "Appointments" section to `src/app/agents/[id]/page.tsx` listing the
   agent's appointments with a "Book appointment" link prefilled for them.
9. Add an "Appointments" link to the top nav in `layout.tsx`.

**Done when:** agent detail shows appointments; nav link works.

## Group 5 — Verify

10. `npm run typecheck` — exit 0.
11. `npm run build` — exit 0; new routes in the table.
12. Dev server + curl: list renders seeded appointments; detail renders with
    links; status change reflects; agent detail shows appointments; 404 on
    missing id.
13. Reset DB to clean seed.

**Done when:** all `validation.md` checks pass.

## Notes / decisions

- **No schema change** — the `appointments` table already exists (Phase 1).
- **Reuse patterns** from Phases 2–3: Server Components for reads, Server
  Actions for writes, inline `<form action={…}>` for status changes,
  `useActionState` for the main form.
- **"Upcoming vs past"** is derived from `status` plus `scheduled_at` compared
  to now; keep it simple (string comparison on ISO-ish datetimes).
