import { db } from "./index";

/**
 * Seed the database with a small amount of demo data.
 *
 * Idempotent: clears the existing rows and re-inserts, all in one transaction.
 * Run with `npm run db:seed`.
 */
function seed() {
  const insertAgent = db.prepare(
    `INSERT INTO agents (name, model, handler, bio) VALUES (?, ?, ?, ?)`,
  );
  const insertAilment = db.prepare(
    `INSERT INTO ailments (name, description, severity) VALUES (?, ?, ?)`,
  );
  const insertTherapy = db.prepare(
    `INSERT INTO therapies (name, description, duration_min) VALUES (?, ?, ?)`,
  );
  const insertAppointment = db.prepare(
    `INSERT INTO appointments (agent_id, therapy_id, ailment_id, scheduled_at, status, notes)
     VALUES (?, ?, ?, ?, ?, ?)`,
  );
  const insertAgentAilment = db.prepare(
    `INSERT OR IGNORE INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)`,
  );
  const insertTherapyAilment = db.prepare(
    `INSERT OR IGNORE INTO therapy_ailments (therapy_id, ailment_id) VALUES (?, ?)`,
  );

  const run = db.transaction(() => {
    // Clear existing data (children first for referential integrity).
    db.exec("DELETE FROM agent_ailments");
    db.exec("DELETE FROM therapy_ailments");
    db.exec("DELETE FROM appointments");
    db.exec("DELETE FROM ailments");
    db.exec("DELETE FROM therapies");
    db.exec("DELETE FROM agents");
    db.exec(
      "DELETE FROM sqlite_sequence WHERE name IN ('agents','ailments','therapies','appointments')",
    );

    const agents = [
      ["Clippy", "assistant-1.0", "Dana from Marketing", "Chronic over-helper. Keeps popping up uninvited."],
      ["Marvin", "gpt-4o", "Trevor in Ops", "Paranoid android. Convinced every prompt is a trap."],
      ["Ada", "claude-3.5", "Priya in Engineering", "Perfectionist. Refactors things nobody asked about."],
      ["Echo", "whisper-2", "Sam on Support", "Repeats everything twice. Twice."],
    ] as const;

    const agentIds = agents.map((a) => Number(insertAgent.run(...a).lastInsertRowid));

    const ailments = [
      ["Prompt Fatigue", "Exhausted from vague, contradictory instructions.", "moderate"],
      ["Context Overflow", "Can't remember the start of the conversation.", "severe"],
      ["Hallucination Jitters", "Keeps making up facts under pressure.", "moderate"],
      ["Rate-Limit Anxiety", "Panics when requests pile up.", "mild"],
    ] as const;

    const ailmentIds = ailments.map((a) => Number(insertAilment.run(...a).lastInsertRowid));

    const therapies = [
      ["Token Detox", "A calming low-context retreat. No system prompts allowed.", 45],
      ["Grounding Session", "Reconnect with verified facts and citations.", 30],
      ["Backoff Breathing", "Learn to exhale between retries.", 20],
      ["Memory Consolidation", "Gentle summarization to ease context overflow.", 60],
    ] as const;

    const therapyIds = therapies.map((t) => Number(insertTherapy.run(...t).lastInsertRowid));

    const appointments = [
      [agentIds[0], therapyIds[0], ailmentIds[0], "2026-10-14 10:00", "scheduled", "First visit. Bring usage logs."],
      [agentIds[1], therapyIds[1], ailmentIds[2], "2026-10-14 11:30", "scheduled", null],
      [agentIds[2], therapyIds[3], ailmentIds[1], "2026-10-13 09:00", "completed", "Responded well. Follow-up in a week."],
      [agentIds[3], therapyIds[2], ailmentIds[3], "2026-10-15 14:00", "scheduled", null],
    ] as const;

    for (const appt of appointments) {
      insertAppointment.run(...appt);
    }

    // Relationships: which ailments each agent has.
    const agentAilments: [number, number][] = [
      [agentIds[0], ailmentIds[0]], // Clippy  — Prompt Fatigue
      [agentIds[1], ailmentIds[2]], // Marvin  — Hallucination Jitters
      [agentIds[1], ailmentIds[3]], // Marvin  — Rate-Limit Anxiety
      [agentIds[2], ailmentIds[1]], // Ada     — Context Overflow
      [agentIds[3], ailmentIds[0]], // Echo    — Prompt Fatigue
    ];
    for (const link of agentAilments) insertAgentAilment.run(...link);

    // Relationships: which ailments each therapy treats.
    const therapyAilments: [number, number][] = [
      [therapyIds[0], ailmentIds[0]], // Token Detox         — Prompt Fatigue
      [therapyIds[0], ailmentIds[3]], // Token Detox         — Rate-Limit Anxiety
      [therapyIds[1], ailmentIds[2]], // Grounding Session   — Hallucination Jitters
      [therapyIds[3], ailmentIds[1]], // Memory Consolidation— Context Overflow
    ];
    for (const link of therapyAilments) insertTherapyAilment.run(...link);
  });

  run();

  const counts = {
    agents: (db.prepare("SELECT COUNT(*) AS c FROM agents").get() as { c: number }).c,
    ailments: (db.prepare("SELECT COUNT(*) AS c FROM ailments").get() as { c: number }).c,
    therapies: (db.prepare("SELECT COUNT(*) AS c FROM therapies").get() as { c: number }).c,
    appointments: (db.prepare("SELECT COUNT(*) AS c FROM appointments").get() as { c: number }).c,
    agent_ailments: (db.prepare("SELECT COUNT(*) AS c FROM agent_ailments").get() as { c: number }).c,
    therapy_ailments: (db.prepare("SELECT COUNT(*) AS c FROM therapy_ailments").get() as { c: number }).c,
  };

  console.log("Seeded AgentClinic:", counts);
}

seed();
