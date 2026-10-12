# Plan — Testing (Replan)

**Phase:** Roadmap Phase 7 (added on branch `replan/testing`)

Introduce an automated test suite so the data layer and aggregation logic are
covered and regressions are caught before build.

## Group 1 — Harness (done)

- Add **Vitest** as the test runner.
- `vitest.config.ts` — node environment, `@` → `src` alias, serial file
  execution (shared SQLite file), `tests/setup.ts` setup file.
- `tests/setup.ts` — point `DATABASE_PATH` at a throwaway temp SQLite file so
  tests never touch the real `agentclinic.db`; clean it up after the run.
- `tests/helpers.ts` — `resetDb()` to clear all tables between tests.
- Scripts: `npm test` (run once) and `npm run test:watch`.

## Group 2 — Data-layer tests (done)

- `tests/agents.test.ts` — create/read/list(order)/update/missing.
- `tests/relationships.test.ts` — attach/remove, associate/dissociate,
  idempotency.
- `tests/dashboard.test.ts` — stats, upcoming (scheduled asc), recent completed
  (desc), top ailments ranking.
- `tests/format.test.ts` — `formatDateTime` unit tests.

## Group 3 — Automation (done)

- **Pre-build gate:** a `prebuild` npm script runs `vitest run` automatically
  before every `npm run build`; a failing test blocks the build.
- **Save hook:** `.kiro/hooks/test-on-save.json` (PostFileSave on `*.ts`/`*.tsx`)
  runs `npm test` on save for fast feedback while editing.

## Group 4 — Server Action tests (done)

- `tests/actions.test.ts` — covers the create actions for agents, ailments,
  therapies, and appointments: both validation-failure branches (returns error
  state) and success paths (mutates the DB, then redirects).
- `next/cache` and `next/navigation` are mocked; the `redirect` mock throws a
  `NEXT_REDIRECT:<url>` sentinel so the success path is assertable.
- 24 tests across 5 files.

## Group 5 — Future (not yet)

- Component/route tests with a React testing library + jsdom.
- Wire `npm test` into CI once a remote/CI provider is set up.

## Notes / decisions

- **Isolated DB:** tests use a temp file via `DATABASE_PATH`, relying on the
  existing env hook in `src/db/index.ts` — no production data touched.
- **Serial execution:** a single SQLite file is shared per worker, so
  `fileParallelism: false` keeps tests deterministic.
- This phase was added during a replan; it lives on branch `replan/testing`.
