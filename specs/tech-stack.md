# Tech Stack

AgentClinic uses **server-side TypeScript** end to end. The stack is chosen to
be popular, reliable, and productive — a site that is easy to stand up and easy
to teach from.

## Recommended framework: Next.js

We use **Next.js** (App Router) as the full-stack framework.

Why Next.js:

- **Popular and reliable** — the most widely used full-stack TypeScript web
  framework, with strong documentation and a large community (Mary's ask).
- **Server-side TypeScript** — Server Components, Server Actions, and Route
  Handlers let us write backend logic in TypeScript alongside the UI.
- **Dashboard in one stack** — the agent/staff dashboard, pages, and API all
  live in a single project, no separate client/server split to maintain.
- **Modern browsers** — produces a fast, attractive site that works well in any
  modern browser (Steve's ask).

## Database: SQLite

We use **SQLite** as the datastore.

Why SQLite:

- Zero-setup, file-based — ideal for local development, course exercises, and
  booth demos that must stand up fast.
- Reliable and well understood; the whole database is a single file.
- Easily upgraded to a hosted database later without changing the app's shape.

## Summary

| Concern        | Choice                          |
| -------------- | ------------------------------- |
| Language       | TypeScript (server + client)    |
| Framework      | Next.js (App Router)            |
| UI             | React (via Next.js)             |
| Database       | SQLite                          |
| Target runtime | Node.js + modern browsers       |

## Testing & CI (added in replan)

- **Test runner:** Vitest. Tests live in `tests/` and use an isolated temp
  SQLite file (via `DATABASE_PATH`) so they never touch `agentclinic.db`.
- **Automation:** a `prebuild` script runs the suite before every build; a
  `PostFileSave` Kiro hook runs it on `.ts`/`.tsx` saves.
- **CI:** GitHub Actions (`.github/workflows/ci.yml`) runs install → native
  rebuild → typecheck → test → build on every push and PR to `main`. Pinned to
  **Node 22 LTS** — newer Node has a native-addon regression that segfaults
  `better-sqlite3` under Vitest workers.

## Known gaps / future

- No linter or formatter (ESLint/Prettier) configured yet — worth adding for a
  teaching codebase.
- No ORM — direct SQL is intentional for clarity, but Drizzle/Kysely could be
  layered in later.
- No authentication or distinct "staff" entity yet (see `mvp.md`).

## Principles

- **One language, one stack.** TypeScript everywhere; Next.js for both server
  and UI.
- **Minimal setup.** The app should run locally with a clone, install, and a
  single dev command.
- **Boring where it counts.** Prefer popular, well-documented tools over novel
  ones so the project stays reliable and easy to teach.
