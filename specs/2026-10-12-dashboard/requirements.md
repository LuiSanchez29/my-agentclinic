# Requirements — Dashboard

**Phase:** Roadmap Phase 5
**Status:** Done (implemented and verified)

## Goal

A single dashboard view that pulls together agents, ailments, therapies, and
appointments so agents and staff get easy, at-a-glance access — the "dashboard"
Mary (engineering) asked for in the mission.

## Scope

### In scope

1. **Summary stats.** Counts of agents, ailments, therapies, and appointments
   (and a breakdown of appointments by status).
2. **Upcoming appointments.** The next few `scheduled` appointments, soonest
   first, with agent + therapy + time, linking to detail.
3. **Recently completed.** A short list of the latest `completed` appointments.
4. **Clinic snapshot.** Most common ailments (by how many agents have them) and
   the therapies on offer.
5. **Quick actions.** Buttons to book an appointment, admit an agent, and add
   an ailment/therapy.
6. **Make it the home page.** The dashboard becomes `/` (replacing the Phase 0
   placeholder hero), so it's the first thing you land on.

### Out of scope

- Auth / per-user personalization (no accounts yet).
- Charts/graphs (keep it text + lists for now; Phase 6 can prettify).
- Date filtering / pagination.

## Data

Read-only aggregation over existing tables and data functions. Add a small
`src/db/dashboard.ts` with query helpers:

- `getStats()` → counts per table + appointment status breakdown.
- `getUpcomingAppointments(limit)` → scheduled, soonest first.
- `getRecentCompleted(limit)` → completed, most recent first.
- `getTopAilments(limit)` → ailments ranked by agent count.

No schema changes.

## Routes

- `/` — the dashboard (replaces the placeholder home page).

## Acceptance criteria

- [ ] `/` shows summary counts for agents, ailments, therapies, appointments.
- [ ] `/` lists upcoming scheduled appointments (soonest first) with working
      links.
- [ ] `/` lists recently completed appointments.
- [ ] `/` shows top ailments by affected-agent count.
- [ ] Quick-action buttons link to the right create pages.
- [ ] Empty states render gracefully when a section has no data.
- [ ] `npm run typecheck` and `npm run build` pass.
