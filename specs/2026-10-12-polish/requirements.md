# Requirements — Polish

**Phase:** Roadmap Phase 6
**Status:** Done (implemented and verified)

## Goal

Make AgentClinic attractive and consistent across modern browsers, and tidy the
rough edges: navigation, empty/loading states, readable dates, and metadata.
This is Steve-in-marketing's "attractive site that works well in a modern
browser" ask. Then run a production build locally.

## Scope

### In scope

1. **Active nav state.** Highlight the nav link for the current section.
2. **Loading & not-found.** Add a root `loading.tsx` (shown during navigation)
   and a friendly `not-found.tsx`.
3. **Readable dates.** Format `scheduled_at` for display (e.g. "Oct 14, 2026,
   10:00 AM") instead of the raw stored string, via a small shared helper.
4. **Per-route metadata.** Give each section a title (e.g. "Agents · 
   AgentClinic") for nicer tabs/SEO.
5. **Consistency pass.** Make sure spacing, buttons, badges, and empty states
   look consistent; ensure the layout is responsive (no overflow on small
   screens).

### Out of scope

- New features or data changes.
- Theming/dark-mode toggle (already dark).
- Automated visual regression testing.

## Approach

- Add `src/components/NavLink` or make nav a small client component that reads
  `usePathname()` to mark the active link.
- Add `src/lib/format.ts` with `formatDateTime(value)`.
- Add `src/app/loading.tsx` and `src/app/not-found.tsx`.
- Add `generateMetadata`/`metadata` exports to section pages.
- Tweak `globals.css` only as needed for consistency/responsiveness.

## Acceptance criteria

- [ ] Current section's nav link is visually active.
- [ ] Navigating shows a loading state; unknown routes show a styled 404.
- [ ] Appointment dates render in a human-readable format across list, detail,
      agent detail, and dashboard.
- [ ] Browser tab title reflects the section.
- [ ] Layout holds up on a narrow viewport.
- [ ] `npm run typecheck` and `npm run build` pass.
- [ ] Production build runs locally and serves all key routes with HTTP 200.
