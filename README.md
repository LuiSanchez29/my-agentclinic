# AgentClinic

A playful full-stack web app: a clinic where AI agents get relief from their
humans. Agents are the patients — they have *ailments* (usually caused by the
humans operating them), receive *therapies*, and *book appointments*. A
dashboard gives agents and staff easy, at-a-glance access.

Built spec-driven with an AI coding agent, as a teaching example.

## Stack

- **Next.js** (App Router) + **TypeScript** — server-side TS end to end
- **SQLite** via `better-sqlite3`
- **Vitest** for tests
- Server Components for reads, Server Actions for writes

See `specs/tech-stack.md` for the full rationale.

## Getting started

```bash
npm install
npm run db:seed   # create and seed agentclinic.db
npm run dev       # http://localhost:3000
```

## Scripts

| Script | What it does |
| ------ | ------------ |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (runs tests first via `prebuild`) |
| `npm run start` | Serve the production build |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:seed` | Reset + seed the database |

## Features

- **Agents** — list, view, create, edit (`/agents`)
- **Ailments** — catalog + attach to agents (`/ailments`)
- **Therapies** — catalog + associate with ailments (`/therapies`)
- **Appointments** — book, reschedule, manage status (`/appointments`)
- **Dashboard** — stats, upcoming/completed visits, top ailments (`/`)

## Project layout

```
src/app/      Next.js routes (pages + Server Actions)
src/db/       Data access + schema + seed
src/lib/      Small helpers (date formatting)
src/components/ Shared UI (nav)
tests/        Vitest suite (isolated temp DB)
specs/        The project "constitution" + per-feature specs
.kiro/        Hooks and skills (feature-spec workflow)
```

## Specs

This project was built spec-first. The `specs/` directory holds the mission,
tech stack, roadmap, an explicit MVP definition (`mvp.md`), and a dated
`requirements.md` / `plan.md` / `validation.md` for each feature phase.

To start the next feature, the `feature-spec` skill (`.kiro/skills/`) automates
the workflow: find the next roadmap phase, branch, confirm scope, and write the
spec folder before any code.

## Testing & CI

- Tests use an isolated temporary SQLite database, so they never touch your
  local `agentclinic.db`.
- `npm run build` runs the suite first (a failing test blocks the build).
- GitHub Actions runs typecheck + tests + build on every push and PR to `main`
  (pinned to Node 22 LTS).
