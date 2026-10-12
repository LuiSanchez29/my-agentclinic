# Requirements — Appointments

**Phase:** Roadmap Phase 4
**Status:** Done (implemented and verified)

## Goal

Let the clinic book appointments between an agent and the clinic, and list and
manage those appointments. Builds on agents (Phase 2) and ailments/therapies
(Phase 3). The `appointments` table already exists from Phase 1.

## Scope

### In scope

1. **List appointments.** A page showing all appointments, soonest first,
   with agent, therapy, ailment, date/time, and status. Split or badge upcoming
   (`scheduled`) vs. past (`completed` / `cancelled`).
2. **Book an appointment.** Pick an agent (required), optionally a therapy and
   an ailment, a date/time (required), and optional notes.
3. **Appointment detail.** View a single appointment with all its fields and
   links to the related agent/therapy/ailment.
4. **Manage status.** Change an appointment's status: mark completed, cancel,
   or reschedule (edit date/time + notes).
5. **Agent detail integration.** Show an agent's appointments on their detail
   page, with a quick link to book one for them.

### Out of scope (later phases)

- The unified dashboard (Phase 5) — though this feeds it.
- Deleting appointments (status `cancelled` covers this).
- Calendar/time-zone handling beyond a plain datetime string.
- Double-booking / availability checks.
- Authentication.

## Data model

Uses the existing `appointments` table (no schema change required):

- `id`, `agent_id` (NOT NULL, FK → agents, cascade delete),
  `therapy_id` (nullable, FK → therapies, set null),
  `ailment_id` (nullable, FK → ailments, set null),
  `scheduled_at` (TEXT), `status` (scheduled|completed|cancelled), `notes`,
  `created_at`.

A read model that joins agent/therapy/ailment names is needed for the list and
detail views.

## Routes

- `/appointments` — list
- `/appointments/new` — book
- `/appointments/[id]` — detail + status controls
- `/appointments/[id]/edit` — reschedule / edit

Agent detail (`/agents/[id]`) gains an "Appointments" section.

## Acceptance criteria

- [ ] An appointment can be booked for an agent (therapy/ailment optional) and
      appears in the list and on the agent's detail page.
- [ ] The list orders by `scheduled_at` and distinguishes upcoming vs. past.
- [ ] Status can be changed to completed or cancelled, and reflected everywhere.
- [ ] An appointment can be rescheduled (edit date/time + notes).
- [ ] Booking requires an agent and a date/time; invalid input is rejected with
      a message.
- [ ] Detail links resolve to the related agent/therapy/ailment.
- [ ] `npm run typecheck` and `npm run build` pass.
- [ ] Seed already contains appointments (from Phase 1) that render correctly.
