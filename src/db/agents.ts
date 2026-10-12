import { db } from "./index";
import type { Agent } from "./types";

export interface AgentInput {
  name: string;
  model: string;
  handler?: string | null;
  bio?: string | null;
}

export function listAgents(): Agent[] {
  return db
    .prepare("SELECT * FROM agents ORDER BY name COLLATE NOCASE")
    .all() as Agent[];
}

export function getAgent(id: number): Agent | undefined {
  return db.prepare("SELECT * FROM agents WHERE id = ?").get(id) as
    | Agent
    | undefined;
}

export function createAgent(input: AgentInput): number {
  const result = db
    .prepare(
      "INSERT INTO agents (name, model, handler, bio) VALUES (?, ?, ?, ?)",
    )
    .run(
      input.name,
      input.model,
      input.handler ?? null,
      input.bio ?? null,
    );
  return Number(result.lastInsertRowid);
}

export function updateAgent(id: number, input: AgentInput): boolean {
  const result = db
    .prepare(
      "UPDATE agents SET name = ?, model = ?, handler = ?, bio = ? WHERE id = ?",
    )
    .run(
      input.name,
      input.model,
      input.handler ?? null,
      input.bio ?? null,
      id,
    );
  return result.changes > 0;
}
