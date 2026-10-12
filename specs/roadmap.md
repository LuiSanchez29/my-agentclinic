# Roadmap

High-level implementation order, in **very small phases**. Each phase should be
independently completable and leave the app in a working state. Build one
feature end to end before expanding.

## Phase 0 — Scaffold

- Initialize the Next.js (App Router) + TypeScript project.
- Confirm the dev server runs and renders a placeholder home page.
- Set up basic project structure and formatting.

## Phase 1 — Data layer

- Add SQLite and a lightweight access layer.
- Define the core schema: `agents`, `ailments`, `therapies`, `appointments`.
- Seed a small amount of sample data for demos.

## Phase 2 — Agents (one feature, end to end)

- List agents (patients) on a page backed by the database.
- View a single agent's detail.
- Create / edit an agent.

## Phase 3 — Ailments & therapies

- Attach ailments to agents.
- List available therapies and associate them with ailments.

## Phase 4 — Appointments

- Book an appointment between an agent and clinic staff.
- List and manage upcoming appointments.

## Phase 5 — Dashboard

- A single dashboard view for agents and staff pulling together ailments,
  therapies, and appointments for easy access.

## Phase 6 — Polish

- Make it attractive and consistent across modern browsers.
- Tidy empty states, loading states, and navigation.

---

**Guiding rule:** prefer the smallest change that leaves the app working and
demonstrable. Finish and verify a phase before starting the next.
