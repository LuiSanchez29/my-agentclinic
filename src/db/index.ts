import Database from "better-sqlite3";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Location of the SQLite file and schema. The DB lives at the project root.
const DB_PATH = process.env.DATABASE_PATH ?? join(process.cwd(), "agentclinic.db");
const SCHEMA_PATH = join(process.cwd(), "src", "db", "schema.sql");

// Reuse a single connection across Next.js hot reloads in development to avoid
// opening a new handle on every request.
const globalForDb = globalThis as unknown as {
  __agentclinicDb?: Database.Database;
};

function createConnection(): Database.Database {
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  // Apply schema. Every statement uses IF NOT EXISTS, so this is idempotent.
  const schema = readFileSync(SCHEMA_PATH, "utf8");
  db.exec(schema);
  return db;
}

export const db: Database.Database =
  globalForDb.__agentclinicDb ?? createConnection();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__agentclinicDb = db;
}
