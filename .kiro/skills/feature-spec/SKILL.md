---
name: feature-spec
description: >-
  Start the next feature in AgentClinic using the spec-driven workflow. Use when
  the user wants to plan, spec, or begin the next roadmap phase/feature — e.g.
  "start the next phase", "spec the next feature", "let's do Phase N", or "create
  a feature spec". Finds the next phase in specs/roadmap.md, creates a branch,
  confirms scope with the user, and writes a dated feature-spec folder
  (requirements.md, plan.md, validation.md) before any code is written.
---

# Feature spec workflow

A repeatable, spec-driven way to begin a feature in this repo. Follow it in
order. **Do not write feature code until the spec is written and the user has
approved the plan.**

## Steps

1. **Find the next phase.** Read `specs/roadmap.md` and identify the next phase
   or feature that is not yet implemented. Also read `specs/mission.md` and
   `specs/tech-stack.md` for guidance so the spec stays consistent with the
   product and stack. Check `specs/mvp.md` for scope boundaries.

2. **Confirm scope with the user BEFORE writing to disk.** Ask the user to
   confirm (grouped into a few focused questions):
   - what's in scope vs. explicitly out of scope,
   - any data-model / schema changes,
   - the routes/UX,
   - whether deletes/auth are included.
   If an AskUserQuestion-style tool is available, use it, grouped. Otherwise ask
   directly and wait for an answer. Do not skip this confirmation.

3. **Create a branch.** From up-to-date `main`, create a feature branch, e.g.
   `git switch main && git pull && git switch -c feature/<short-name>`
   (or `replan/<name>` for cross-cutting work like testing).

4. **Create the dated spec folder.** Under `specs/`, make a directory named
   `YYYY-MM-DD-feature-name/` containing:
   - **`requirements.md`** — phase, status, goal, in-scope / out-of-scope,
     data-model changes, routes/UX, and a checkbox list of acceptance criteria.
     Always include `npm run typecheck` and `npm run build` passing.
   - **`plan.md`** — the implementation broken into small, numbered task groups
     in build order (data layer → read pages → write actions → integration →
     verify). Each group states what "done" means. End with a Notes/decisions
     section.
   - **`validation.md`** — explicit, checkable done-criteria: build & types,
     data-layer checks, page checks (dev server + curl), seed, and cleanup.

5. **Update the roadmap** if a new phase was added (e.g. a replan phase), and
   leave the specs with `Status: Draft` until implemented, then flip to `Done`.

6. **Pause for review.** Present the plan and wait for the user to approve
   before implementing. Offer to execute group-by-group (pausing after each) or
   straight through.

## Conventions (match the existing repo)

- Reads = Server Components; writes = Server Actions; forms use `useActionState`.
- Data access lives in `src/db/*.ts`; many-to-many via join tables with
  composite primary keys and `INSERT OR IGNORE` for idempotency.
- Tests go in `tests/` (Vitest) using an isolated temp DB via `DATABASE_PATH`.
- Verify every phase with `npm run typecheck` and `npm run build`; reset the DB
  to the clean seed (`npm run db:seed`) after any live checks.

## Templates

### requirements.md
```markdown
# Requirements — <Feature>

**Phase:** Roadmap Phase <N>
**Status:** Draft

## Goal
<one or two sentences>

## Scope
### In scope
- ...
### Out of scope (later phases)
- ...

## Data model changes
<tables/columns, or "No schema change">

## Routes / UX
- ...

## Acceptance criteria
- [ ] ...
- [ ] `npm run typecheck` and `npm run build` pass.
```

### plan.md
```markdown
# Plan — <Feature>

**Phase:** Roadmap Phase <N>

## Group 1 — <name>
1. ...
**Done when:** ...

## Group 2 — <name>
...

## Group N — Verify
- `npm run typecheck`, `npm run build`, live checks, reset DB.

## Notes / decisions
- ...
```

### validation.md
```markdown
# Validation — <Feature>

**Phase:** Roadmap Phase <N>

## Build & types
- [ ] `npm run typecheck` exits 0.
- [ ] `npm run build` exits 0.

## Data layer (via tsx)
- [ ] ...

## Pages (dev server + curl)
- [ ] ...
- [ ] Missing id returns HTTP 404.

## Cleanup
- [ ] DB reset to clean seed.
```
