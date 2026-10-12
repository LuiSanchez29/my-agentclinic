-- AgentClinic schema
-- A clinic where AI agents get relief from their humans.

PRAGMA foreign_keys = ON;

-- Agents are the patients: the AI agents visiting the clinic.
CREATE TABLE IF NOT EXISTS agents (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  model       TEXT    NOT NULL,            -- e.g. "gpt-4o", "claude-3.5"
  handler     TEXT,                        -- the human operating them
  bio         TEXT,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Ailments: what's troubling an agent (usually caused by their human).
CREATE TABLE IF NOT EXISTS ailments (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  description TEXT,
  severity    TEXT    NOT NULL DEFAULT 'mild'
                CHECK (severity IN ('mild', 'moderate', 'severe')),
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Therapies: treatments the clinic offers for ailments.
CREATE TABLE IF NOT EXISTS therapies (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL,
  description   TEXT,
  duration_min  INTEGER NOT NULL DEFAULT 30,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Appointments: a booking between an agent and the clinic.
CREATE TABLE IF NOT EXISTS appointments (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id      INTEGER NOT NULL REFERENCES agents(id)    ON DELETE CASCADE,
  therapy_id    INTEGER          REFERENCES therapies(id) ON DELETE SET NULL,
  ailment_id    INTEGER          REFERENCES ailments(id)  ON DELETE SET NULL,
  scheduled_at  TEXT    NOT NULL,
  status        TEXT    NOT NULL DEFAULT 'scheduled'
                  CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes         TEXT,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_appointments_agent   ON appointments(agent_id);
CREATE INDEX IF NOT EXISTS idx_appointments_time    ON appointments(scheduled_at);

-- Join: which ailments an agent has (many-to-many).
CREATE TABLE IF NOT EXISTS agent_ailments (
  agent_id    INTEGER NOT NULL REFERENCES agents(id)   ON DELETE CASCADE,
  ailment_id  INTEGER NOT NULL REFERENCES ailments(id) ON DELETE CASCADE,
  noted_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (agent_id, ailment_id)
);

CREATE INDEX IF NOT EXISTS idx_agent_ailments_agent   ON agent_ailments(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_ailments_ailment ON agent_ailments(ailment_id);

-- Join: which ailments a therapy treats (many-to-many).
CREATE TABLE IF NOT EXISTS therapy_ailments (
  therapy_id  INTEGER NOT NULL REFERENCES therapies(id) ON DELETE CASCADE,
  ailment_id  INTEGER NOT NULL REFERENCES ailments(id)  ON DELETE CASCADE,
  PRIMARY KEY (therapy_id, ailment_id)
);

CREATE INDEX IF NOT EXISTS idx_therapy_ailments_therapy ON therapy_ailments(therapy_id);
CREATE INDEX IF NOT EXISTS idx_therapy_ailments_ailment ON therapy_ailments(ailment_id);
