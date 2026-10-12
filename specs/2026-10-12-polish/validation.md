# Validation — Polish

**Phase:** Roadmap Phase 6

## Build & types

- [ ] `npm run typecheck` exits 0.
- [ ] `npm run build` exits 0.

## Visual / UX (dev or prod server + curl/browser)

- [ ] Active nav link is highlighted on the current section.
- [ ] Every list page has a friendly empty state (already present; verify).
- [ ] A root `loading.tsx` and `not-found.tsx` exist and render.
- [ ] Datetimes render in a readable format (not raw "2026-10-14 10:00").
- [ ] Page has a sensible favicon / metadata title per route.
- [ ] Responsive: nav and grids don't overflow on a narrow viewport
      (manual check).

## Deploy (localhost)

- [ ] `npm run build` then `npm run start` serves a production build.
- [ ] `GET /` returns HTTP 200 and renders the dashboard.
- [ ] Key routes (/agents, /ailments, /therapies, /appointments) return 200.

## Cleanup

- [ ] DB at clean seed.
