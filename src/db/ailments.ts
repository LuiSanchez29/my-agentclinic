import { db } from "./index";
import type { Ailment, Severity } from "./types";

export interface AilmentInput {
  name: string;
  description?: string | null;
  severity: Severity;
}

export function listAilments(): Ailment[] {
  return db
    .prepare("SELECT * FROM ailments ORDER BY name COLLATE NOCASE")
    .all() as Ailment[];
}

export function getAilment(id: number): Ailment | undefined {
  return db.prepare("SELECT * FROM ailments WHERE id = ?").get(id) as
    | Ailment
    | undefined;
}

export function createAilment(input: AilmentInput): number {
  const result = db
    .prepare(
      "INSERT INTO ailments (name, description, severity) VALUES (?, ?, ?)",
    )
    .run(input.name, input.description ?? null, input.severity);
  return Number(result.lastInsertRowid);
}

export function updateAilment(id: number, input: AilmentInput): boolean {
  const result = db
    .prepare(
      "UPDATE ailments SET name = ?, description = ?, severity = ? WHERE id = ?",
    )
    .run(input.name, input.description ?? null, input.severity, id);
  return result.changes > 0;
}
