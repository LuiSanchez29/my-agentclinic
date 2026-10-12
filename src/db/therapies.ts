import { db } from "./index";
import type { Therapy } from "./types";

export interface TherapyInput {
  name: string;
  description?: string | null;
  duration_min: number;
}

export function listTherapies(): Therapy[] {
  return db
    .prepare("SELECT * FROM therapies ORDER BY name COLLATE NOCASE")
    .all() as Therapy[];
}

export function getTherapy(id: number): Therapy | undefined {
  return db.prepare("SELECT * FROM therapies WHERE id = ?").get(id) as
    | Therapy
    | undefined;
}

export function createTherapy(input: TherapyInput): number {
  const result = db
    .prepare(
      "INSERT INTO therapies (name, description, duration_min) VALUES (?, ?, ?)",
    )
    .run(input.name, input.description ?? null, input.duration_min);
  return Number(result.lastInsertRowid);
}

export function updateTherapy(id: number, input: TherapyInput): boolean {
  const result = db
    .prepare(
      "UPDATE therapies SET name = ?, description = ?, duration_min = ? WHERE id = ?",
    )
    .run(input.name, input.description ?? null, input.duration_min, id);
  return result.changes > 0;
}
