import { db } from "./index";
import type { AppointmentWithRefs } from "./appointments";
import type { Ailment } from "./types";

export interface Stats {
  agents: number;
  ailments: number;
  therapies: number;
  appointments: number;
  scheduled: number;
  completed: number;
  cancelled: number;
}

export interface TopAilment extends Ailment {
  agent_count: number;
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

function count(sql: string, ...params: unknown[]): number {
  return (db.prepare(sql).get(...params) as { c: number }).c;
}

export function getStats(): Stats {
  return {
    agents: count("SELECT COUNT(*) AS c FROM agents"),
    ailments: count("SELECT COUNT(*) AS c FROM ailments"),
    therapies: count("SELECT COUNT(*) AS c FROM therapies"),
    appointments: count("SELECT COUNT(*) AS c FROM appointments"),
    scheduled: count(
      "SELECT COUNT(*) AS c FROM appointments WHERE status = 'scheduled'",
    ),
    completed: count(
      "SELECT COUNT(*) AS c FROM appointments WHERE status = 'completed'",
    ),
    cancelled: count(
      "SELECT COUNT(*) AS c FROM appointments WHERE status = 'cancelled'",
    ),
  };
}

export function getUpcomingAppointments(limit = 5): AppointmentWithRefs[] {
  return db
    .prepare(
      `${WITH_REFS} WHERE ap.status = 'scheduled'
       ORDER BY ap.scheduled_at ASC LIMIT ?`,
    )
    .all(limit) as AppointmentWithRefs[];
}

export function getRecentCompleted(limit = 5): AppointmentWithRefs[] {
  return db
    .prepare(
      `${WITH_REFS} WHERE ap.status = 'completed'
       ORDER BY ap.scheduled_at DESC LIMIT ?`,
    )
    .all(limit) as AppointmentWithRefs[];
}

export function getTopAilments(limit = 5): TopAilment[] {
  return db
    .prepare(
      `SELECT a.*, COUNT(aa.agent_id) AS agent_count
       FROM ailments a
       LEFT JOIN agent_ailments aa ON aa.ailment_id = a.id
       GROUP BY a.id
       ORDER BY agent_count DESC, a.name COLLATE NOCASE
       LIMIT ?`,
    )
    .all(limit) as TopAilment[];
}
