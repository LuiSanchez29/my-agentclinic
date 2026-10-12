// Row types mirroring the SQLite schema in schema.sql.

export type Severity = "mild" | "moderate" | "severe";
export type AppointmentStatus = "scheduled" | "completed" | "cancelled";

export interface Agent {
  id: number;
  name: string;
  model: string;
  handler: string | null;
  bio: string | null;
  created_at: string;
}

export interface Ailment {
  id: number;
  name: string;
  description: string | null;
  severity: Severity;
  created_at: string;
}

export interface Therapy {
  id: number;
  name: string;
  description: string | null;
  duration_min: number;
  created_at: string;
}

export interface Appointment {
  id: number;
  agent_id: number;
  therapy_id: number | null;
  ailment_id: number | null;
  scheduled_at: string;
  status: AppointmentStatus;
  notes: string | null;
  created_at: string;
}

export interface AgentAilment {
  agent_id: number;
  ailment_id: number;
  noted_at: string;
}

export interface TherapyAilment {
  therapy_id: number;
  ailment_id: number;
}
