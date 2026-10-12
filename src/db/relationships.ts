import { db } from "./index";
import type { Agent, Ailment, Therapy } from "./types";

/* ---- Agent <-> Ailment ---- */

/** Attach an ailment to an agent. Idempotent (no-op if already linked). */
export function attachAilmentToAgent(
  agentId: number,
  ailmentId: number,
): void {
  db.prepare(
    "INSERT OR IGNORE INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)",
  ).run(agentId, ailmentId);
}

export function removeAilmentFromAgent(
  agentId: number,
  ailmentId: number,
): void {
  db.prepare(
    "DELETE FROM agent_ailments WHERE agent_id = ? AND ailment_id = ?",
  ).run(agentId, ailmentId);
}

export function listAilmentsForAgent(agentId: number): Ailment[] {
  return db
    .prepare(
      `SELECT a.* FROM ailments a
       JOIN agent_ailments aa ON aa.ailment_id = a.id
       WHERE aa.agent_id = ?
       ORDER BY a.name COLLATE NOCASE`,
    )
    .all(agentId) as Ailment[];
}

export function listAgentsForAilment(ailmentId: number): Agent[] {
  return db
    .prepare(
      `SELECT ag.* FROM agents ag
       JOIN agent_ailments aa ON aa.agent_id = ag.id
       WHERE aa.ailment_id = ?
       ORDER BY ag.name COLLATE NOCASE`,
    )
    .all(ailmentId) as Agent[];
}

/* ---- Therapy <-> Ailment ---- */

/** Associate a therapy with an ailment. Idempotent (no-op if already linked). */
export function associateTherapyAilment(
  therapyId: number,
  ailmentId: number,
): void {
  db.prepare(
    "INSERT OR IGNORE INTO therapy_ailments (therapy_id, ailment_id) VALUES (?, ?)",
  ).run(therapyId, ailmentId);
}

export function dissociateTherapyAilment(
  therapyId: number,
  ailmentId: number,
): void {
  db.prepare(
    "DELETE FROM therapy_ailments WHERE therapy_id = ? AND ailment_id = ?",
  ).run(therapyId, ailmentId);
}

export function listAilmentsForTherapy(therapyId: number): Ailment[] {
  return db
    .prepare(
      `SELECT a.* FROM ailments a
       JOIN therapy_ailments ta ON ta.ailment_id = a.id
       WHERE ta.therapy_id = ?
       ORDER BY a.name COLLATE NOCASE`,
    )
    .all(therapyId) as Ailment[];
}

export function listTherapiesForAilment(ailmentId: number): Therapy[] {
  return db
    .prepare(
      `SELECT t.* FROM therapies t
       JOIN therapy_ailments ta ON ta.therapy_id = t.id
       WHERE ta.ailment_id = ?
       ORDER BY t.name COLLATE NOCASE`,
    )
    .all(ailmentId) as Therapy[];
}
