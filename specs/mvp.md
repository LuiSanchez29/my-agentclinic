# MVP

The minimum viable product for AgentClinic: the smallest build that satisfies
the mission — "a reliable site with a dashboard where agents and staff can see
and manage ailments, therapies, and appointments."

## Phases in the MVP

| Phase | Name | Why it's in the MVP |
| ----- | ---- | ------------------- |
| 0 | Scaffold | Foundation — the app has to run. |
| 1 | Data layer | Foundation — SQLite + core schema and seed. |
| 2 | Agents | Core entity: the patients. |
| 3 | Ailments & therapies | Core features from the product ask. |
| 4 | Appointments | Core feature: booking visits. |
| 5 | Dashboard | The mission's headline success criterion (Mary's dashboard). |

**MVP = Phases 0–5.**

## Beyond the MVP

| Phase | Name | Classification |
| ----- | ---- | -------------- |
| 6 | Polish | MVP+ — refinement. Supports Steve's "attractive, modern browser" ask but is not core function. |
| 7 | Testing | Post-MVP engineering. Added during a replan on `replan/testing`; not part of the original product scope. |

## MVP acceptance (all met)

- [x] Runs locally with minimal setup (`npm install`, `npm run dev`).
- [x] Agents can be listed, viewed, created, and edited.
- [x] Ailments and therapies can be managed and related to each other.
- [x] Ailments can be attached to agents.
- [x] Appointments can be booked, listed, rescheduled, and have their status
      managed.
- [x] A dashboard at `/` pulls together stats, upcoming/completed appointments,
      and top ailments.
- [x] `npm run build` passes.

## Notes

- This file documents an MVP boundary that was previously only implicit in
  `mission.md` and `roadmap.md`.
- Deferred (not in any shipped phase): authentication/accounts, a distinct
  "staff" entity, deletes for core records (cancellation covers appointments),
  pagination/filtering, and charts.
