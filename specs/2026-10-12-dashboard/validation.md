# Validation — Dashboard

**Phase:** Roadmap Phase 5

## Build & types

- [ ] `npm run typecheck` exits 0.
- [ ] `npm run build` exits 0.

## Data layer (via tsx)

- [ ] `getStats()` returns correct counts matching the seed.
- [ ] `getUpcomingAppointments(5)` returns only scheduled, ascending.
- [ ] `getRecentCompleted(5)` returns only completed, descending.
- [ ] `getTopAilments(5)` returns ailments ordered by agent count desc.

## Page (dev server + curl)

- [ ] `GET /` renders stat counts.
- [ ] `GET /` lists upcoming appointment(s) with agent names + links.
- [ ] `GET /` lists recently completed appointment(s).
- [ ] `GET /` shows top ailments.
- [ ] Quick-action links point to /appointments/new, /agents/new,
      /ailments/new, /therapies/new.

## Cleanup

- [ ] DB reset to clean seed.
