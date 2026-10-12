# Plan — Polish

**Phase:** Roadmap Phase 6

Executing all groups in one pass, then deploying to localhost.

## Group 1 — Shared helpers

1. `src/lib/format.ts` — `formatDateTime(value: string): string` using
   `Intl.DateTimeFormat`, tolerant of the stored "YYYY-MM-DD HH:MM" format.

## Group 2 — Navigation polish

2. Extract the nav into `src/components/SiteNav.tsx` (client component) that
   uses `usePathname()` to add an `is-active` class to the current section.
3. Use it in `layout.tsx`. Add active-link styles to `globals.css`.

## Group 3 — Loading & not-found

4. `src/app/loading.tsx` — simple centered loading state.
5. `src/app/not-found.tsx` — friendly 404 with a link home.
6. Styles for both.

## Group 4 — Readable dates & metadata

7. Apply `formatDateTime` where `scheduled_at` is shown: appointments list &
   detail, agent detail, dashboard (upcoming + completed).
8. Add `metadata` title exports to section pages (agents, ailments, therapies,
   appointments) and keep the root layout title.

## Group 5 — Consistency & responsiveness

9. Review `globals.css`: ensure nav wraps on small screens, grids use
   auto-fit, page padding is consistent. Minor tweaks only.

## Group 6 — Verify

10. `npm run typecheck` — exit 0.
11. `npm run build` — exit 0.

## Group 7 — Deploy to localhost

12. Start the production server: `npm run build` (done) then `npm run start`.
13. Confirm `/`, `/agents`, `/ailments`, `/therapies`, `/appointments` all
    return HTTP 200 against the production server.
14. Report the local URL. Reset DB to clean seed.

**Done when:** all `validation.md` checks pass and the prod build serves
locally.

## Notes / decisions

- Keep changes additive and low-risk; no feature/data changes.
- `formatDateTime` must not throw on unexpected input — fall back to the raw
  string.
