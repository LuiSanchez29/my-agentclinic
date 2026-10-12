import { db } from "./index";
import type { Appointment, AppointmentStatus } from "./types";

export interface AppointmentWithRefs extends Appointment {
  agent_name: string;
  therapy_name: string | null;
  ailment_name: string | null;
}

export interface AppointmentInput {
  agent_id: number;
  therapy_id?: number | null;
  ailment_id?: number | null;
  scheduled_at: string;
  status: AppointmentStatus;
  notes?: string | null;
}

const WITH_REFS = `
  SELECT ap.*,
         ag.name AS agent_name,
         t.name  AS therapy_name,
         al.name AS ailment_name
  FROM appointments ap
  JOIN agents ag       ON ag.id = ap.agent_id
  LEFT JOIN therapies t ON t.id = ap.therapy_id
  LEFT JOIN ailments al ON al.id = ap.ailment_id
`;

export function listAppointments(): AppointmentWithRefs[] {
  return db
    .prepare(`${WITH_REFS} ORDER BY ap.scheduled_at ASC`)
    .all() as AppointmentWithRefs[];
}

export function listAppointmentsForAgent(
  agentId: number,
): AppointmentWithRefs[] {
  return db
    .prepare(`${WITH_REFS} WHERE ap.agent_id = ? ORDER BY ap.scheduled_at ASC`)
    .all(agentId) as AppointmentWithRefs[];
}

export function getAppointment(id: number): Appointment | undefined {
  return db.prepare("SELECT * FROM appointments WHERE id = ?").get(id) as
    | Appointment
    | undefined;
}

export function getAppointmentWithRefs(
  id: number,
): AppointmentWithRefs | undefined {
  return db.prepare(`${WITH_REFS} WHERE ap.id = ?`).get(id) as
    | AppointmentWithRefs
    | undefined;
}

export function createAppointment(input: AppointmentInput): number {
  const result = db
    .prepare(
      `INSERT INTO appointments
         (agent_id, therapy_id, ailment_id, scheduled_at, status, notes)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.agent_id,
      input.therapy_id ?? null,
      input.ailment_id ?? null,
      input.scheduled_at,
      input.status,
      input.notes ?? null,
    );
  return Number(result.lastInsertRowid);
}

export function updateAppointment(
  id: number,
  input: AppointmentInput,
): boolean {
  const result = db
    .prepare(
      `UPDATE appointments
         SET agent_id = ?, therapy_id = ?, ailment_id = ?,
             scheduled_at = ?, status = ?, notes = ?
       WHERE id = ?`,
    )
    .run(
      input.agent_id,
      input.therapy_id ?? null,
      input.ailment_id ?? null,
      input.scheduled_at,
      input.status,
      input.notes ?? null,
      id,
    );
  return result.changes > 0;
}

export function setAppointmentStatus(
  id: number,
  status: AppointmentStatus,
): boolean {
  const result = db
    .prepare("UPDATE appointments SET status = ? WHERE id = ?")
    .run(status, id);
  return result.changes > 0;
}
