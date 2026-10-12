# Plan — Dashboard

**Phase:** Roadmap Phase 5

Executing all groups in one pass.

## Group 1 — Aggregation data layer

1. Create `src/db/dashboard.ts`:
   - `getStats()` — counts for agents/ailments/therapies/appointments +
     per-status appointment counts.
   - `getUpcomingAppointments(limit)` — status='scheduled', ORDER BY
     scheduled_at ASC, joined with agent/therapy names.
   - `getRecentCompleted(limit)` — status='completed', ORDER BY scheduled_at
     DESC.
   - `getTopAilments(limit)` — ailments LEFT JOIN agent_ailments, grouped,
     ordered by agent count DESC.

**Done when:** functions compile and return typed results against the seed.

## Group 2 — Dashboard page as home

2. Replace `src/app/page.tsx` with the dashboard: stat cards, upcoming list,
   recently-completed list, top-ailments list, quick-action buttons.
3. Add dashboard styles (stat grid) to `globals.css`.

**Done when:** `/` renders all sections with seeded data and empty states.

## Group 3 — Verify

4. `npm run typecheck` — exit 0.
5. `npm run build` — exit 0.
6. Dev server + curl: `/` shows counts, upcoming, completed, top ailments, and
   quick-action links; sections degrade to empty states when cleared.
7. Reset DB to clean seed.

**Done when:** all `validation.md` checks pass.

## Notes / decisions

- **Read-only, no schema change.** Pure aggregation over existing tables.
- **Reuse** the existing `.rows`, `.badge`, `.card`, `.btn` styles; add only a
  stat-grid.
- The dashboard replaces the Phase 0 placeholder hero at `/`.
