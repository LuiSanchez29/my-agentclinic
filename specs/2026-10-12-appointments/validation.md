# Validation — Appointments

**Phase:** Roadmap Phase 4

## Build & types

- [ ] `npm run typecheck` exits 0.
- [ ] `npm run build` exits 0.
- [ ] Route table lists `/appointments`, `/appointments/new`,
      `/appointments/[id]`, `/appointments/[id]/edit`.

## Data layer (via tsx)

- [ ] `listAppointments()` returns seeded rows with agent/therapy/ailment names.
- [ ] `createAppointment(...)` inserts and returns a new id.
- [ ] `setAppointmentStatus(id, 'completed')` updates status.
- [ ] `updateAppointment(...)` changes scheduled_at + notes.
- [ ] `listAppointmentsForAgent(agentId)` returns that agent's appointments.

## Pages (dev server + curl)

- [ ] `GET /appointments` renders seeded appointments (agent names, statuses).
- [ ] `GET /appointments/[id]` renders refs and status controls.
- [ ] `GET /agents/[id]` shows an Appointments section.
- [ ] Nav includes an Appointments link.
- [ ] Missing id (`/appointments/999`) returns HTTP 404.

## Cleanup

- [ ] DB reset to the clean seed after verification.
- [ ] No stray test rows.
